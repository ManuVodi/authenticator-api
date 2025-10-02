import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'sqlite',
        database: 'authentication.sb',
        entities: [__dirname + '/**/*.entity{.ts,.js}'], 
        synchronize: true,
        // dropSchema: true
      }),
      ConfigModule.forRoot({
        isGlobal: true,
      }),
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
