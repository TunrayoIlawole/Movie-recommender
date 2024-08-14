import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Pieces from '@pieces.app/pieces-os-client';
import os from 'os';


async function configurePiecesClient(): Promise<void> {
  const port = 1000;

  const configuration = new Pieces.Configuration({
    basePath: `http://localhost:${port}`
  })

  const apiInstance = new Pieces.WellKnownApi(configuration);

  try {
    const data = await apiInstance.getWellKnownHealth();
    console.log(data); 
  } catch(error) {
    console.error(`Error getting health data: ${error}`);
  }
}

async function bootstrap() {
  await configurePiecesClient();

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
