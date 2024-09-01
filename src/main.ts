import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Config } from './lib/config';
import { VERSION_NEUTRAL, VersioningType } from '@nestjs/common';
import { ValidatorPipe } from './lib/common/pipes/validatior.pipe';
import { HttpExceptions } from './lib/common/exceptions/http.exception';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix("api")
  
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
    defaultVersion: [VERSION_NEUTRAL, '1']
  })

  app.useGlobalPipes(ValidatorPipe());
  
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new HttpExceptions(httpAdapterHost));
  

  await app.listen(Config.PORT || 3000, Config.HOST || 'localhost');
  console.log(`Server is running on ${Config.HOST}:${Config.PORT}`);
}
bootstrap();
