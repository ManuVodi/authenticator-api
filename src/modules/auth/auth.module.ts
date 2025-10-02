import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { SignInAuthUseCase } from "./use-cases/sign-in-auth.use-case";
import { CreateTokenAuthUseCase } from "./use-cases/create-token.use-case";
import { UserModule } from "../user/user.module";
import { AuthGuard } from "./use-cases/auth.guard";
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>('SECRET_KEY'),
                signOptions: { expiresIn: '1m' },
            }),
        }),
        forwardRef(() => UserModule)
    ],
    controllers: [
        AuthController
    ],
    providers: [
        SignInAuthUseCase,
        CreateTokenAuthUseCase,
        AuthGuard
    ],
    exports: [
        AuthGuard,
        JwtModule
    ]
})

export class AuthModule {}