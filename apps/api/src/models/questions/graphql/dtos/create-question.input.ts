import { InputType, OmitType, PickType } from '@nestjs/graphql'
import { Question } from '../entity/question.entity'

@InputType()
export class CreateQuestionInput extends OmitType(
  Question,
  ['id', 'createdAt', 'updatedAt'],
  InputType,
) {}
