import { InputType, OmitType, PickType } from '@nestjs/graphql'
import { Course } from '../entity/course.entity'

@InputType()
export class CreateCourseInput extends OmitType(
  Course,
  ['id', 'createdAt', 'updatedAt'],
  InputType,
) {}
