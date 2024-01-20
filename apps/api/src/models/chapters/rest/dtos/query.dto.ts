import { IsIn, IsOptional } from 'class-validator'
import { Prisma } from '@prisma/client'
import { BaseQueryDto } from 'src/common/dtos/common.dto'

export class ChapterQueryDto extends BaseQueryDto {
  @IsOptional()
  @IsIn(Object.values(Prisma.ChapterScalarFieldEnum))
  sortBy?: string

  @IsOptional()
  @IsIn(Object.values(Prisma.ChapterScalarFieldEnum))
  searchBy?: string
}
