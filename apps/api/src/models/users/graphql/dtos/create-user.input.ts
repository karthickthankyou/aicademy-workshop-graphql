import { Field, InputType, PickType } from '@nestjs/graphql'
import { User } from '../entity/user.entity'
import { AuthProviderType } from '@prisma/client'

@InputType()
export class RegisterWithProviderInput extends PickType(
  User,
  ['name', 'uid', 'image'],
  InputType,
) {
  @Field(() => AuthProviderType)
  type: AuthProviderType
}

@InputType()
export class RegisterWithCredentialsInput extends PickType(
  User,
  ['name', 'image'],
  InputType,
) {
  email: string
  password: string
}
