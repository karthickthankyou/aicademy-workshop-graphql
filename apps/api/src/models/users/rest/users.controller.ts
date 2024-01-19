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
import { RegisterWithCredentialsInput } from './dtos/create.dto'
import { UserQueryDto } from './dtos/query.dto'
import { UpdateUser } from './dtos/update.dto'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger'
import { AuthOutput, LoginInput, UserEntity } from './entity/user.entity'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { GetUserType } from 'src/common/types'
import { checkRowLevelPermission } from 'src/common/auth/util'
import { UsersService } from '../graphql/users.service'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UsersService,
  ) {}

  @ApiCreatedResponse({ type: AuthOutput })
  @Post()
  create(@Body() registerWithCredentialsInput: RegisterWithCredentialsInput) {
    return this.userService.registerWithCredentials(
      registerWithCredentialsInput,
    )
  }

  @ApiCreatedResponse({ type: AuthOutput })
  @Post('login')
  login(@Body() loginInput: LoginInput) {
    return this.userService.login(loginInput)
  }

  @ApiOkResponse({ type: [UserEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: UserQueryDto) {
    return this.prisma.user.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    })
  }

  @ApiOkResponse({ type: UserEntity })
  @Get(':uid')
  findOne(@Param('uid') uid: string) {
    return this.prisma.user.findUnique({ where: { uid } })
  }

  @ApiOkResponse({ type: UserEntity })
  @ApiBearerAuth()
  @AllowAuthenticated()
  @Patch(':uid')
  async update(
    @Param('uid') uid: string,
    @Body() updateUserDto: UpdateUser,
    @GetUser() user: GetUserType,
  ) {
    const userData = await this.prisma.user.findUnique({ where: { uid } })
    checkRowLevelPermission(user, userData.uid)
    return this.prisma.user.update({
      where: { uid },
      data: updateUserDto,
    })
  }

  @ApiBearerAuth()
  @AllowAuthenticated()
  @Delete(':uid')
  async remove(@Param('uid') uid: string, @GetUser() user: GetUserType) {
    const userData = await this.prisma.user.findUnique({ where: { uid } })
    checkRowLevelPermission(user, userData.uid)
    return this.prisma.user.delete({ where: { uid } })
  }
}
