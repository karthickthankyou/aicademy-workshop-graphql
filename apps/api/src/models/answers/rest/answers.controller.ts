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
import { CreateAnswer } from './dtos/create.dto'
import { AnswerQueryDto } from './dtos/query.dto'
import { UpdateAnswer } from './dtos/update.dto'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger'
import { AnswerEntity } from './entity/answer.entity'
import { AllowAuthenticated } from 'src/common/auth/auth.decorator'

@ApiTags('answers')
@Controller('answers')
export class AnswersController {
  constructor(private readonly prisma: PrismaService) {}

  @AllowAuthenticated('admin')
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: AnswerEntity })
  @Post()
  create(@Body() createAnswerDto: CreateAnswer) {
    return this.prisma.answer.create({ data: createAnswerDto })
  }

  @ApiOkResponse({ type: [AnswerEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: AnswerQueryDto) {
    return this.prisma.answer.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    })
  }

  @ApiOkResponse({ type: AnswerEntity })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.prisma.answer.findUnique({ where: { id } })
  }

  @ApiOkResponse({ type: AnswerEntity })
  @ApiBearerAuth()
  @AllowAuthenticated('admin')
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateAnswerDto: UpdateAnswer) {
    return this.prisma.answer.update({
      where: { id },
      data: updateAnswerDto,
    })
  }

  @ApiBearerAuth()
  @AllowAuthenticated('admin')
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.prisma.answer.delete({ where: { id } })
  }
}
