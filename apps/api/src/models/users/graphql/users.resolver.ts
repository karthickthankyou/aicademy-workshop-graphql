import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { UsersService } from './users.service'
import { AuthOutput, LoginInput, User } from './entity/user.entity'
import { FindManyUserArgs, FindUniqueUserArgs } from './dtos/find.args'
import {
  RegisterWithCredentialsInput,
  RegisterWithProviderInput,
} from './dtos/create-user.input'
import { UpdateUserInput } from './dtos/update-user.input'
import { checkRowLevelPermission } from 'src/common/auth/util'
import { GetUserType } from 'src/common/types'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation(() => AuthOutput)
  registerWithProvider(
    @Args('registerWithProviderInput') args: RegisterWithProviderInput,
  ) {
    return this.usersService.registerWithProvider(args)
  }

  @Mutation(() => AuthOutput)
  async registerWithCredentials(
    @Args('registerWithCredentialsInput')
    args: RegisterWithCredentialsInput,
  ) {
    return this.usersService.registerWithCredentials(args)
  }

  @Mutation(() => AuthOutput)
  async login(
    @Args('loginInput')
    args: LoginInput,
  ) {
    return this.usersService.login(args)
  }

  @AllowAuthenticated('admin')
  @Query(() => [User], { name: 'users' })
  findAll(@Args() args: FindManyUserArgs) {
    return this.usersService.findAll(args)
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args() args: FindUniqueUserArgs) {
    return this.usersService.findOne(args)
  }

  @AllowAuthenticated()
  @Mutation(() => User)
  async updateUser(
    @Args('updateUserInput') args: UpdateUserInput,
    @GetUser() user: GetUserType,
  ) {
    const userData = await this.prisma.user.findUnique({
      where: { uid: args.uid },
    })
    checkRowLevelPermission(user, userData.uid)
    return this.usersService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => User)
  async removeUser(
    @Args() args: FindUniqueUserArgs,
    @GetUser() user: GetUserType,
  ) {
    const userData = await this.prisma.user.findUnique(args)
    checkRowLevelPermission(user, userData.uid)
    return this.usersService.remove(args)
  }

  @ResolveField(() => String, { nullable: true })
  async email(@Parent() parent: User) {
    const credentials = await this.prisma.credentials.findUnique({
      where: { uid: parent.uid },
    })
    return credentials?.email
  }
}
