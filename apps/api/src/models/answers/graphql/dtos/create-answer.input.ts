import { InputType, PickType } from '@nestjs/graphql'
import { Answer } from '../entity/answer.entity'

@InputType()
export class CreateAnswerInput extends PickType(
  Answer,
  ['answer', 'explanation', 'questionId'],
  InputType,
) {}
