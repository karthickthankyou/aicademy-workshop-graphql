import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from '@prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { TestOrderByRelationAggregateInput } from 'src/models/tests/graphql/dtos/order-by.args'
import { UserOrderByWithRelationInput } from 'src/models/users/graphql/dtos/order-by.args'

@InputType()
export class StudentOrderByWithRelationInputStrict
  implements
    RestrictProperties<
      StudentOrderByWithRelationInputStrict,
      Prisma.StudentOrderByWithRelationInput
    >
{
  @Field(() => Prisma.SortOrder)
  uid: Prisma.SortOrder
  user: UserOrderByWithRelationInput
  tests: TestOrderByRelationAggregateInput
}

@InputType()
export class StudentOrderByWithRelationInput extends PartialType(
  StudentOrderByWithRelationInputStrict,
) {}

@InputType()
export class StudentOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder
}
