import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { TestsService } from './tests.service'
import { Test } from './entity/test.entity'
import { FindManyTestArgs, FindUniqueTestArgs } from './dtos/find.args'
import { CreateTestInput } from './dtos/create-test.input'
import { UpdateTestInput } from './dtos/update-test.input'
import { checkRowLevelPermission } from 'src/common/auth/util'
import { GetUserType } from 'src/common/types'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { Question } from 'src/models/questions/graphql/entity/question.entity'
import { TestQuestion } from 'src/models/test-questions/graphql/entity/test-question.entity'
import { Course } from 'src/models/courses/graphql/entity/course.entity'
import { Student } from 'src/models/students/graphql/entity/student.entity'

@Resolver(() => Test)
export class TestsResolver {
  constructor(
    private readonly testsService: TestsService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => Test)
  createTest(
    @Args('createTestInput') args: CreateTestInput,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, args.studentUid)
    return this.testsService.create(args)
  }

  @Query(() => [Test], { name: 'tests' })
  findAll(@Args() args: FindManyTestArgs) {
    return this.testsService.findAll(args)
  }

  @Query(() => Test, { name: 'test' })
  findOne(@Args() args: FindUniqueTestArgs) {
    return this.testsService.findOne(args)
  }

  @AllowAuthenticated('admin')
  @Mutation(() => Test)
  async updateTest(
    @Args('updateTestInput') args: UpdateTestInput,
    @GetUser() user: GetUserType,
  ) {
    const test = await this.prisma.test.findUnique({ where: { id: args.id } })
    checkRowLevelPermission(user, test.studentUid)
    return this.testsService.update(args)
  }

  @AllowAuthenticated('admin')
  @Mutation(() => Test)
  async removeTest(
    @Args() args: FindUniqueTestArgs,
    @GetUser() user: GetUserType,
  ) {
    const test = await this.prisma.test.findUnique(args)
    checkRowLevelPermission(user, test.studentUid)
    return this.testsService.remove(args)
  }

  @ResolveField(() => [Question])
  questions(@Parent() parent: Test) {
    return this.prisma.question.findMany({
      where: { testQuestions: { some: { testId: parent.id } } },
    })
  }

  @ResolveField(() => [TestQuestion])
  results(@Parent() parent: Test) {
    return this.prisma.testQuestion.findMany({
      where: { testId: parent.id },
    })
  }

  @ResolveField(() => Course)
  course(@Parent() parent: Test) {
    return this.prisma.course.findUnique({
      where: { id: parent.courseId },
    })
  }

  @ResolveField(() => Student)
  student(@Parent() parent: Test) {
    return this.prisma.student.findUnique({
      where: { uid: parent.studentUid },
    })
  }
}
