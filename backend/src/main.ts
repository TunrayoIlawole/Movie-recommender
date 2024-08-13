import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Pieces from '@pieces.app/pieces-os-client';
import os from 'os';


async function bootstrap() {
  let port = 1000;

  const configuration = new Pieces.Configuration({
    basePath: `http://localhost:${port}`
  })

  const apiInstance = new Pieces.WellKnownApi(configuration)

  apiInstance.getWellKnownHealth().then((data: string) => {
    console.log(data) // ok
  }).catch((error: unknown) => console.error(error));

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

}
bootstrap();
