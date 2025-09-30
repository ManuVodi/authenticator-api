import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dirname } from 'path';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'sqlite',
        database: 'authentication.sb',
        entities: [__dirname + '/**/*.entity{.ts,.js}'], 
        synchronize: true,
        // dropSchema: true
      }),
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
