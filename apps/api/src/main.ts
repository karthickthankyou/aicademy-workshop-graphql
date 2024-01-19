import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { add } from '@foundation/sample-lib'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  console.log('Using the library function: ', add(4, 7))
  app.enableCors()

  const config = new DocumentBuilder()
    .setTitle('Foundation | Karthick Ragavendran')
    .setDescription(
      `Looking for the graphql api?
      <br/>
Go to <a href="/graphql" target="_blank">/graphql</a>.
Or,
You might also need to use the <a target="_blank" href="http://studio.apollographql.com/sandbox/explorer?endpoint=http://localhost:3000/graphql&document=query users{users{uid  }}
">Apollo explorer</a> for a greater experience.

      `,
    )
    .setVersion('0.1')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/', app, document)

  await app.listen(3000)
}
bootstrap()
