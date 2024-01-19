import { OmitType, PartialType } from '@nestjs/swagger'
import { User } from '@prisma/client'
import { UserEntity } from '../entity/user.entity'

export class UpdateUser extends PartialType(
  OmitType(UserEntity, ['createdAt', 'updatedAt']),
) {
  uid: User['uid']
}
