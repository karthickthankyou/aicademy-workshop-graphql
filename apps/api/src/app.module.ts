import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { MAX_AGE } from './common/util'
import { UsersModule } from './models/users/users.module'
import { PrismaModule } from './common/prisma/prisma.module'
import { AdminsModule } from './models/admins/admins.module'
import { StudentsModule } from './models/students/students.module'
import { CoursesModule } from './models/courses/courses.module'
import { ChaptersModule } from './models/chapters/chapters.module'
import { QuestionsModule } from './models/questions/questions.module'
import { AnswersModule } from './models/answers/answers.module'
import { TestsModule } from './models/tests/tests.module'
import { TestQuestionsModule } from './models/test-questions/test-questions.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      fieldResolverEnhancers: ['guards'],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
      introspection: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: MAX_AGE },
    }),

    PrismaModule,

    UsersModule,
    AdminsModule,
    StudentsModule,
    CoursesModule,
    ChaptersModule,
    QuestionsModule,
    AnswersModule,
    TestsModule,
    TestQuestionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
