import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';

@Module(
{
    imports:
    [
        ConfigModule.forRoot(),
        ThrottlerModule.forRoot({ ttl: 60, limit: 10 }),
        MongooseModule.forRoot(process.env.MONGO_URI),
        AuthModule
    ]
})
export class AppModule {}
