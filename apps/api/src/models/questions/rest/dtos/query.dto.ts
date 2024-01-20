import { IsIn, IsOptional } from 'class-validator'
import { Prisma } from '@prisma/client'
import { BaseQueryDto } from 'src/common/dtos/common.dto'

export class QuestionQueryDto extends BaseQueryDto {
  @IsOptional()
  @IsIn(Object.values(Prisma.QuestionScalarFieldEnum))
  sortBy?: string

  @IsOptional()
  @IsIn(Object.values(Prisma.QuestionScalarFieldEnum))
  searchBy?: string
}
