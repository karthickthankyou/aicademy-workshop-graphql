import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { QuestionsService } from './questions.service'
import { Question } from './entity/question.entity'
import { FindManyQuestionArgs, FindUniqueQuestionArgs } from './dtos/find.args'
import { CreateQuestionInput } from './dtos/create-question.input'
import { UpdateQuestionInput } from './dtos/update-question.input'
import { AllowAuthenticated } from 'src/common/auth/auth.decorator'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { Answer } from 'src/models/answers/graphql/entity/answer.entity'
import { Chapter } from 'src/models/chapters/graphql/entity/chapter.entity'
import { TestQuestion } from 'src/models/test-questions/graphql/entity/test-question.entity'

@Resolver(() => Question)
export class QuestionsResolver {
  constructor(
    private readonly questionsService: QuestionsService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated('admin')
  @Mutation(() => Question)
  createQuestion(@Args('createQuestionInput') args: CreateQuestionInput) {
    return this.questionsService.create(args)
  }

  @Query(() => [Question], { name: 'questions' })
  findAll(@Args() args: FindManyQuestionArgs) {
    return this.questionsService.findAll(args)
  }

  @Query(() => Question, { name: 'question' })
  findOne(@Args() args: FindUniqueQuestionArgs) {
    return this.questionsService.findOne(args)
  }

  @AllowAuthenticated('admin')
  @Mutation(() => Question)
  async updateQuestion(@Args('updateQuestionInput') args: UpdateQuestionInput) {
    return this.questionsService.update(args)
  }

  @AllowAuthenticated('admin')
  @Mutation(() => Question)
  async removeQuestion(@Args() args: FindUniqueQuestionArgs) {
    return this.questionsService.remove(args)
  }

  @ResolveField(() => Answer)
  answer(@Parent() parent: Question) {
    return this.prisma.answer.findUnique({ where: { questionId: parent.id } })
  }

  @ResolveField(() => Chapter)
  chapter(@Parent() parent: Question) {
    return this.prisma.chapter.findUnique({ where: { id: parent.chapterId } })
  }

  @ResolveField(() => [TestQuestion])
  testQuestions(@Parent() parent: Question) {
    return this.prisma.testQuestion.findMany({
      where: { questionId: parent.id },
    })
  }
}
