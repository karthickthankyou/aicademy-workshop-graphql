import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { StudentsService } from './students.service'
import { Student } from './entity/student.entity'
import { FindManyStudentArgs, FindUniqueStudentArgs } from './dtos/find.args'
import { CreateStudentInput } from './dtos/create-student.input'
import { UpdateStudentInput } from './dtos/update-student.input'
import { checkRowLevelPermission } from 'src/common/auth/util'
import { GetUserType } from 'src/common/types'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { Test } from 'src/models/tests/graphql/entity/test.entity'

@Resolver(() => Student)
export class StudentsResolver {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => Student)
  createStudent(
    @Args('createStudentInput') args: CreateStudentInput,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, args.uid)
    return this.studentsService.create(args)
  }

  @AllowAuthenticated('admin')
  @Query(() => [Student], { name: 'students' })
  findAll(@Args() args: FindManyStudentArgs) {
    return this.studentsService.findAll(args)
  }

  @Query(() => Student, { name: 'student' })
  findOne(@Args() args: FindUniqueStudentArgs) {
    return this.studentsService.findOne(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Student)
  async updateStudent(
    @Args('updateStudentInput') args: UpdateStudentInput,
    @GetUser() user: GetUserType,
  ) {
    const student = await this.prisma.student.findUnique({
      where: { uid: args.uid },
    })
    checkRowLevelPermission(user, student.uid)
    return this.studentsService.update(args)
  }

  @AllowAuthenticated()
  @Mutation(() => Student)
  async removeStudent(
    @Args() args: FindUniqueStudentArgs,
    @GetUser() user: GetUserType,
  ) {
    const student = await this.prisma.student.findUnique(args)
    checkRowLevelPermission(user, student.uid)
    return this.studentsService.remove(args)
  }

  @ResolveField(() => [Test])
  courses(@Parent() parent: Student) {
    return this.prisma.test.findMany({ where: { studentUid: parent.uid } })
  }
}
