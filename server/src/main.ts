import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap()
{
    const logger: Logger = new Logger('Bootstrap');
    const app = await NestFactory.create(AppModule, { cors: { origin: 'http://localhost:3000', credentials: true } });
    const port: number = +process.env.PORT || 4001;

    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());

    await app.listen(port);
    logger.log(`Application listening on port ${port}`);
}

bootstrap();
