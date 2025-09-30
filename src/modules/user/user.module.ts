import { Module } from "@nestjs/common";
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

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity])
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
        FindPasswordUserUseCase
    ]
})

export class UserModule {}