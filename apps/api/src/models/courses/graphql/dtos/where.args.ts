import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import {
  BoolFilter,
  DateTimeFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input'
import { AdminRelationFilter } from 'src/models/admins/graphql/dtos/where.args'
import { ChapterListRelationFilter } from 'src/models/chapters/graphql/dtos/where.args'
import { TestListRelationFilter } from 'src/models/tests/graphql/dtos/where.args'

@InputType()
export class CourseWhereUniqueInput {
  id: number
}

@InputType()
export class CourseWhereInputStrict
  implements
    RestrictProperties<CourseWhereInputStrict, Prisma.CourseWhereInput>
{
  id: IntFilter
  createdAt: DateTimeFilter
  updatedAt: DateTimeFilter
  title: StringFilter
  description: StringFilter
  image: StringFilter
  published: BoolFilter
  adminUid: StringFilter
  chapters: ChapterListRelationFilter
  admin: AdminRelationFilter
  tests: TestListRelationFilter
  // Todo: Add the below field decorator only to the $Enums types.
  // @Field(() => $Enums.x)

  AND: CourseWhereInput[]
  OR: CourseWhereInput[]
  NOT: CourseWhereInput[]
}

@InputType()
export class CourseWhereInput extends PartialType(CourseWhereInputStrict) {}

@InputType()
export class CourseListRelationFilter {
  every?: CourseWhereInput
  some?: CourseWhereInput
  none?: CourseWhereInput
}

@InputType()
export class CourseRelationFilter {
  is?: CourseWhereInput
  isNot?: CourseWhereInput
}
