import { InputType, PickType } from '@nestjs/graphql'
import { TestQuestion } from '../entity/test-question.entity'

@InputType()
export class CreateTestQuestionInput extends PickType(
  TestQuestion,
  ['studentAnswer', 'testId', 'questionId'],
  InputType,
) {}
