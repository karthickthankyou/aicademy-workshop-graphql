import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { AdminsService } from './admins.service'
import { Admin } from './entity/admin.entity'
import { FindManyAdminArgs, FindUniqueAdminArgs } from './dtos/find.args'
import { CreateAdminInput } from './dtos/create-admin.input'
import { UpdateAdminInput } from './dtos/update-admin.input'
import { AllowAuthenticated } from 'src/common/auth/auth.decorator'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { Course } from 'src/models/courses/graphql/entity/course.entity'

@AllowAuthenticated('admin')
@Resolver(() => Admin)
export class AdminsResolver {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => Admin)
  createAdmin(@Args('createAdminInput') args: CreateAdminInput) {
    return this.adminsService.create(args)
  }

  @Query(() => [Admin], { name: 'admins' })
  findAll(@Args() args: FindManyAdminArgs) {
    return this.adminsService.findAll(args)
  }

  @Query(() => Admin, { name: 'admin' })
  findOne(@Args() args: FindUniqueAdminArgs) {
    return this.adminsService.findOne(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Admin)
  async updateAdmin(@Args('updateAdminInput') args: UpdateAdminInput) {
    return this.adminsService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Admin)
  async removeAdmin(@Args() args: FindUniqueAdminArgs) {
    return this.adminsService.remove(args)
  }

  @ResolveField(() => [Course])
  courses(@Parent() parent: Admin) {
    return this.prisma.course.findMany({ where: { adminUid: parent.uid } })
  }
}
