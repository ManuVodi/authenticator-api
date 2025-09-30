import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from "@nestjs/common";
import { CreateUserDTO } from "./dtos/create-user.dto";
import { FindAllUsersDTO } from "./dtos/find-all-users.dto";
import { ResetPasswordUserDTO } from "./dtos/reset-password-user.dto";
import { UserEntity } from "./models/user.entity";
import { AbleUserUseCase } from "./use-cases/able-user.use-case";
import { CreateUserUseCase } from "./use-cases/create-user.use-case";
import { DeleteUserUseCase } from "./use-cases/delete-user.use-case";
import { DisableUserUseCase } from "./use-cases/disable-user.use-case";
import { FindAllUsersCase } from "./use-cases/find-all-users.use-case";
import { FindOneUserUseCase } from "./use-cases/find-one-user.use-case";
import { ResetPasswordUserUseCase } from "./use-cases/reset-password-user.use-case";
import { FindReturnUserDTO } from "./dtos/find-return-user.dto";

@Controller('user')
export class UserController {
    constructor(
        @Inject(CreateUserUseCase)
        private createUserUseCase: CreateUserUseCase,
        @Inject(FindAllUsersCase)
        private findAllUsersCase: FindAllUsersCase,
        @Inject(FindOneUserUseCase)
        private findOneUserUseCase: FindOneUserUseCase,
        @Inject(DisableUserUseCase)
        private disableUserUseCase: DisableUserUseCase,
        @Inject(AbleUserUseCase)
        private ableUserUseCase: AbleUserUseCase,
        @Inject(ResetPasswordUserUseCase)
        private resetPasswordUserUseCase: ResetPasswordUserUseCase,
        @Inject(DeleteUserUseCase)
        private deleteUserUseCase: DeleteUserUseCase
    ){}

    @Post()
    async create(@Body() createUser: CreateUserDTO): Promise<UserEntity> {
        return await this.createUserUseCase.create(createUser)
    }

    @Get()
    async findAll(
        @Query('email') email?: string, 
        @Query('nome_usuario') nome_usuario?: string
    ): Promise<FindReturnUserDTO[]> {
        const params = new FindAllUsersDTO()
        params.email = email;
        params.nome_usuario = nome_usuario
        return await this.findAllUsersCase.findAll(params)
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<FindReturnUserDTO | null> {
        return await this.findOneUserUseCase.findOne({id})
    }

    @Patch('disable/:id')
    async disable(@Param('id') id: number): Promise<void>{
        return await this.disableUserUseCase.disable(id)
    }

    @Patch('able/:id')
    async able(@Param('id') id: number): Promise<void>{
        return await this.ableUserUseCase.able(id)
    }

    @Patch('reset-password')
    async resetPassword(@Body() resetPasswordUser: ResetPasswordUserDTO): Promise<void> {
        return await this.resetPasswordUserUseCase.resetPassword(resetPasswordUser)
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        return this.deleteUserUseCase.delete(id)
    }
}