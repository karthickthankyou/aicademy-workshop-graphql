import { OmitType, PickType } from '@nestjs/swagger'
import { UserEntity } from '../entity/user.entity'

export class RegisterWithCredentialsInput extends PickType(UserEntity, [
  'name',
  'image',
]) {
  email: string
  password: string
}
