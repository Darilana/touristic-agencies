import { NestFactory } from '@nestjs/core';
import { RenderModule, RenderService } from 'nest-next';
import Next from 'next';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const dev = process.env.NODE_ENV !== 'production';
  const app = Next({ dev });

  await app.prepare();

  const server = await NestFactory.create(AppModule);
  server.useGlobalPipes(new ValidationPipe());
  const renderService = server.get(RenderService);
  renderService.setErrorHandler(async (err, req, res) => {
    res.send(err.response);
  })
  const config = new DocumentBuilder()
    .setTitle('Touristic agencies catalogue')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(server, config);
  SwaggerModule.setup('api', server, document);

  const renderer = server.get(RenderModule);
  renderer.register(server, app);

  await server.listen(3000);
}
bootstrap();
