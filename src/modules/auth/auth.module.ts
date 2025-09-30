import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { FindOneUserUseCase } from "../user/use-cases/find-one-user.use-case";
import { AuthController } from "./auth.controller";
import { SignInAuthUseCase } from "./use-cases/sign-in-auth.use-case";
import { CreateTokenAuthUseCase } from "./use-cases/create-token.use-case";
import { UserModule } from "../user/user.module";

@Module({
    imports: [
        JwtModule.register({
            secret: 'teste',
            signOptions: {expiresIn: '5m'}
        }),
        UserModule
    ],
    controllers: [
        AuthController
    ],
    providers: [
        SignInAuthUseCase,
        CreateTokenAuthUseCase
    ],
    exports: [

    ]
})

export class AuthModule {}