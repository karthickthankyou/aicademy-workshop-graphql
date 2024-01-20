import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { AnswersService } from './answers.service'
import { Answer } from './entity/answer.entity'
import { FindManyAnswerArgs, FindUniqueAnswerArgs } from './dtos/find.args'
import { CreateAnswerInput } from './dtos/create-answer.input'
import { UpdateAnswerInput } from './dtos/update-answer.input'
import { checkRowLevelPermission } from 'src/common/auth/util'
import { GetUserType } from 'src/common/types'
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { Question } from 'src/models/questions/graphql/entity/question.entity'

@Resolver(() => Answer)
export class AnswersResolver {
  constructor(
    private readonly answersService: AnswersService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated('admin')
  @Mutation(() => Answer)
  createAnswer(@Args('createAnswerInput') args: CreateAnswerInput) {
    return this.answersService.create(args)
  }

  @Query(() => [Answer], { name: 'answers' })
  findAll(@Args() args: FindManyAnswerArgs) {
    return this.answersService.findAll(args)
  }

  @Query(() => Answer, { name: 'answer' })
  findOne(@Args() args: FindUniqueAnswerArgs) {
    return this.answersService.findOne(args)
  }

  @AllowAuthenticated('admin')
  @Mutation(() => Answer)
  async updateAnswer(@Args('updateAnswerInput') args: UpdateAnswerInput) {
    return this.answersService.update(args)
  }

  @AllowAuthenticated('admin')
  @Mutation(() => Answer)
  async removeAnswer(@Args() args: FindUniqueAnswerArgs) {
    return this.answersService.remove(args)
  }

  @ResolveField(() => Question)
  question(@Parent() parent: Answer) {
    return this.prisma.question.findUnique({ where: { id: parent.questionId } })
  }
}
