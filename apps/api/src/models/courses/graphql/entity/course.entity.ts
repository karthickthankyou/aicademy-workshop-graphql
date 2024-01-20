import { Field, ObjectType } from '@nestjs/graphql'
import { Course as CourseType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Course implements RestrictProperties<Course, CourseType> {
  id: number
  createdAt: Date
  updatedAt: Date
  title: string
  @Field({ nullable: true })
  description: string
  @Field({ nullable: true })
  image: string
  published: boolean
  adminUid: string
  // Todo Add below to make optional fields optional.
  // @Field({ nullable: true })
}
