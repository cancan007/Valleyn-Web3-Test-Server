/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configuration } from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if(configuration().NODE_ENV === "development"){
    app.enableCors({
      origin:["http://localhost:3000"],
      allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept'
    })
  } else if(configuration().NODE_ENV === "production"){
    app.enableCors(/*{
      origin: '*',
      allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  }*/); // protection
  }
  await app.listen(3002);
}
bootstrap();
