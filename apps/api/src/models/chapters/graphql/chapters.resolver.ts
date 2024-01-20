import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { ChaptersService } from './chapters.service'
import { Chapter } from './entity/chapter.entity'
import { FindManyChapterArgs, FindUniqueChapterArgs } from './dtos/find.args'
import { CreateChapterInput } from './dtos/create-chapter.input'
import { UpdateChapterInput } from './dtos/update-chapter.input'
import { AllowAuthenticated } from 'src/common/auth/auth.decorator'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { Question } from 'src/models/questions/graphql/entity/question.entity'
import { Course } from 'src/models/courses/graphql/entity/course.entity'

@Resolver(() => Chapter)
export class ChaptersResolver {
  constructor(
    private readonly chaptersService: ChaptersService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated('admin')
  @Mutation(() => Chapter)
  createChapter(@Args('createChapterInput') args: CreateChapterInput) {
    return this.chaptersService.create(args)
  }

  @Query(() => [Chapter], { name: 'chapters' })
  findAll(@Args() args: FindManyChapterArgs) {
    return this.chaptersService.findAll(args)
  }

  @Query(() => Chapter, { name: 'chapter' })
  findOne(@Args() args: FindUniqueChapterArgs) {
    return this.chaptersService.findOne(args)
  }

  @AllowAuthenticated('admin')
  @Mutation(() => Chapter)
  async updateChapter(@Args('updateChapterInput') args: UpdateChapterInput) {
    return this.chaptersService.update(args)
  }

  @AllowAuthenticated('admin')
  @Mutation(() => Chapter)
  async removeChapter(@Args() args: FindUniqueChapterArgs) {
    return this.chaptersService.remove(args)
  }

  @ResolveField(() => [Question])
  questions(@Parent() parent: Chapter) {
    return this.prisma.question.findMany({ where: { chapterId: parent.id } })
  }

  @ResolveField(() => Course)
  course(@Parent() parent: Chapter) {
    return this.prisma.course.findUnique({ where: { id: parent.courseId } })
  }
}
