import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./models/user.entity";
import { CreateUserUseCase } from "./use-cases/create-user.use-case";
import { UserEntityRepository } from "./models/user.repository";
import { UserController } from "./user.controller";
import { FindAllUsersCase } from "./use-cases/find-all-users.use-case";
import { DisableUserUseCase } from "./use-cases/disable-user.use-case";
import { FindOneUserUseCase } from "./use-cases/find-one-user.use-case";
import { AbleUserUseCase } from "./use-cases/able-user.use-case";
import { ResetPasswordUserUseCase } from "./use-cases/reset-password-user.use-case";
import { DeleteUserUseCase } from "./use-cases/delete-user.use-case";
import { FindPasswordUserUseCase } from "./use-cases/find-password-user.use-case";
import { AuthModule } from "../auth/auth.module";
import { AuthGuard } from "../auth/use-cases/auth.guard";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        forwardRef(() => AuthModule)
    ],
    controllers: [
        UserController
    ],
    providers: [
        CreateUserUseCase,
        FindAllUsersCase,
        FindOneUserUseCase,
        FindPasswordUserUseCase,
        DisableUserUseCase,
        AbleUserUseCase,
        ResetPasswordUserUseCase,
        DeleteUserUseCase,
        {
            provide: 'IUserRepository',
            useClass: UserEntityRepository
        }
    ],
    exports: [
        FindOneUserUseCase,
        FindPasswordUserUseCase,
    ]
})

export class UserModule {}