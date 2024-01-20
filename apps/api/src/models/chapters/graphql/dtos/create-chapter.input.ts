import { InputType, OmitType, PickType } from '@nestjs/graphql'
import { Chapter } from '../entity/chapter.entity'

@InputType()
export class CreateChapterInput extends OmitType(
  Chapter,
  ['id', 'createdAt', 'updatedAt'],
  InputType,
) {}
