import { IsIn, IsOptional } from 'class-validator'
import { Prisma } from '@prisma/client'
import { BaseQueryDto } from 'src/common/dtos/common.dto'

export class StudentQueryDto extends BaseQueryDto {
  @IsOptional()
  @IsIn(Object.values(Prisma.StudentScalarFieldEnum))
  sortBy?: string

  @IsOptional()
  @IsIn(Object.values(Prisma.StudentScalarFieldEnum))
  searchBy?: string
}
