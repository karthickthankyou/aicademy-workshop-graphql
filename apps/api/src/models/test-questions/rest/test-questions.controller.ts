import { Controller, Get, Param, Query } from '@nestjs/common'

import { PrismaService } from 'src/common/prisma/prisma.service'
import { ApiTags } from '@nestjs/swagger'
import { TestQuestionQueryDto } from './dtos/query.dto'
import { ApiOkResponse } from '@nestjs/swagger'
import { TestQuestionEntity } from './entity/test-question.entity'
import { AllowAuthenticated } from 'src/common/auth/auth.decorator'

@ApiTags('test-questions')
@Controller('test-questions')
export class TestQuestionsController {
  constructor(private readonly prisma: PrismaService) {}

  @AllowAuthenticated('admin')
  @ApiOkResponse({ type: [TestQuestionEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: TestQuestionQueryDto) {
    return this.prisma.testQuestion.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    })
  }

  @AllowAuthenticated('admin')
  @ApiOkResponse({ type: TestQuestionEntity })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.prisma.testQuestion.findUnique({ where: { id } })
  }
}
