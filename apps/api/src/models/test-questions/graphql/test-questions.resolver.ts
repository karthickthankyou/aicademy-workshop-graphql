import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql'
import { TestQuestionsService } from './test-questions.service'
import { TestQuestion } from './entity/test-question.entity'
import {
  FindManyTestQuestionArgs,
  FindUniqueTestQuestionArgs,
} from './dtos/find.args'
import { AllowAuthenticated } from 'src/common/auth/auth.decorator'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { Question } from 'src/models/questions/graphql/entity/question.entity'
import { Test } from 'src/models/tests/graphql/entity/test.entity'

@Resolver(() => TestQuestion)
export class TestQuestionsResolver {
  constructor(
    private readonly testQuestionsService: TestQuestionsService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated('admin')
  @Query(() => [TestQuestion], { name: 'testQuestions' })
  findAll(@Args() args: FindManyTestQuestionArgs) {
    return this.testQuestionsService.findAll(args)
  }

  @AllowAuthenticated('admin')
  @Query(() => TestQuestion, { name: 'testQuestion' })
  findOne(@Args() args: FindUniqueTestQuestionArgs) {
    return this.testQuestionsService.findOne(args)
  }

  @ResolveField(() => Question)
  question(@Parent() parent: TestQuestion) {
    return this.prisma.question.findUnique({
      where: { id: parent.questionId },
    })
  }

  @ResolveField(() => Test)
  test(@Parent() parent: TestQuestion) {
    return this.prisma.test.findUnique({
      where: { id: parent.testId },
    })
  }
}
