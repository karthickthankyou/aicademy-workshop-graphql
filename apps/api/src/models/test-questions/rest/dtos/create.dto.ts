import { OmitType, PickType } from '@nestjs/swagger'
import { TestQuestionEntity } from '../entity/test-question.entity'

export class CreateTestQuestion extends PickType(TestQuestionEntity, [
  'studentAnswer',
  'testId',
  'questionId',
]) {}
