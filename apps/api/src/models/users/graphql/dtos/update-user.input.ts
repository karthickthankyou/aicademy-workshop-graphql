import { InputType, OmitType, PartialType } from '@nestjs/graphql'
import { User as UserType } from '@prisma/client'
import { User } from '../entity/user.entity'

@InputType()
export class UpdateUserInput extends PartialType(
  OmitType(User, ['createdAt', 'updatedAt']),
) {
  uid: UserType['uid']
}
