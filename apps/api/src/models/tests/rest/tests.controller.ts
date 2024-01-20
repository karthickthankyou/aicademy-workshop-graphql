import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common'

import { PrismaService } from 'src/common/prisma/prisma.service'
import { ApiTags } from '@nestjs/swagger'
import { CreateTest } from './dtos/create.dto'
import { TestQueryDto } from './dtos/query.dto'
import { UpdateTest } from './dtos/update.dto'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger'
import { TestEntity } from './entity/test.entity'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { GetUserType } from 'src/common/types'
import { checkRowLevelPermission } from 'src/common/auth/util'

@ApiTags('tests')
@Controller('tests')
export class TestsController {
  constructor(private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: TestEntity })
  @Post()
  create(@Body() createTestDto: CreateTest, @GetUser() user: GetUserType) {
    checkRowLevelPermission(user, createTestDto.studentUid)
    return this.prisma.test.create({ data: createTestDto })
  }

  @ApiOkResponse({ type: [TestEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: TestQueryDto) {
    return this.prisma.test.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    })
  }

  @ApiOkResponse({ type: TestEntity })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.prisma.test.findUnique({ where: { id } })
  }

  @ApiOkResponse({ type: TestEntity })
  @ApiBearerAuth()
  @AllowAuthenticated()
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTestDto: UpdateTest,
    @GetUser() user: GetUserType,
  ) {
    const test = await this.prisma.test.findUnique({ where: { id } })
    checkRowLevelPermission(user, test.studentUid)
    return this.prisma.test.update({
      where: { id },
      data: updateTestDto,
    })
  }

  @ApiBearerAuth()
  @AllowAuthenticated()
  @Delete(':id')
  async remove(@Param('id') id: number, @GetUser() user: GetUserType) {
    const test = await this.prisma.test.findUnique({ where: { id } })
    checkRowLevelPermission(user, test.studentUid)
    return this.prisma.test.delete({ where: { id } })
  }
}
