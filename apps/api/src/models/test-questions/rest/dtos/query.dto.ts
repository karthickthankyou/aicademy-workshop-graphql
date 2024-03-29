import { IsIn, IsOptional } from 'class-validator'
import { Prisma } from '@prisma/client'
import { BaseQueryDto } from 'src/common/dtos/common.dto'

export class TestQuestionQueryDto extends BaseQueryDto {
  @IsOptional()
  @IsIn(Object.values(Prisma.TestQuestionScalarFieldEnum))
  sortBy?: string

  @IsOptional()
  @IsIn(Object.values(Prisma.TestQuestionScalarFieldEnum))
  searchBy?: string
}
