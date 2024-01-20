import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { CoursesService } from './courses.service'
import { Course } from './entity/course.entity'
import { FindManyCourseArgs, FindUniqueCourseArgs } from './dtos/find.args'
import { CreateCourseInput } from './dtos/create-course.input'
import { UpdateCourseInput } from './dtos/update-course.input'
import { AllowAuthenticated } from 'src/common/auth/auth.decorator'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { Chapter } from 'src/models/chapters/graphql/entity/chapter.entity'
import { Admin } from 'src/models/admins/graphql/entity/admin.entity'
import { Test } from 'src/models/tests/graphql/entity/test.entity'

@Resolver(() => Course)
export class CoursesResolver {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated('admin')
  @Mutation(() => Course)
  createCourse(@Args('createCourseInput') args: CreateCourseInput) {
    return this.coursesService.create(args)
  }

  @Query(() => [Course], { name: 'courses' })
  findAll(@Args() args: FindManyCourseArgs) {
    return this.coursesService.findAll(args)
  }

  @Query(() => Course, { name: 'course' })
  findOne(@Args() args: FindUniqueCourseArgs) {
    return this.coursesService.findOne(args)
  }

  @AllowAuthenticated('admin')
  @Mutation(() => Course)
  async updateCourse(@Args('updateCourseInput') args: UpdateCourseInput) {
    return this.coursesService.update(args)
  }

  @AllowAuthenticated('admin')
  @Mutation(() => Course)
  async removeCourse(@Args() args: FindUniqueCourseArgs) {
    return this.coursesService.remove(args)
  }

  @ResolveField(() => [Chapter])
  chapters(@Parent() course: Course) {
    return this.prisma.chapter.findMany({ where: { courseId: course.id } })
  }

  @AllowAuthenticated('admin')
  @ResolveField(() => [Test])
  tests(@Parent() course: Course) {
    return this.prisma.test.findMany({ where: { courseId: course.id } })
  }

  @ResolveField(() => Admin)
  admin(@Parent() course: Course) {
    return this.prisma.admin.findUnique({ where: { uid: course.adminUid } })
  }
}
