import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql'
import { AuthProviderType, User as UserType } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

registerEnumType(AuthProviderType, {
  name: 'AuthProviderType',
})

@ObjectType()
export class User implements RestrictProperties<User, UserType> {
  uid: string
  createdAt: Date
  updatedAt: Date
  @Field({ nullable: true })
  image: string
  @Field({ nullable: true })
  name: string
}

@ObjectType()
export class AuthOutput {
  user: User
  token: string
}

@InputType()
export class LoginInput {
  email: string
  password: string
}
