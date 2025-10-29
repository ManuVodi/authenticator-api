import { BadRequestException, HttpException, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from "../dtos/create-user.dto";
import { IUserRepository } from "../models/user.interface";
import { FindOneUserUseCase } from "./find-one-user.use-case";
import { CreateReturnUserDTO } from "../dtos/create-return-user.dto";

@Injectable()
export class CreateUserUseCase {
    constructor(
        @Inject('IUserRepository')
        private userRepository: IUserRepository,
        @Inject(FindOneUserUseCase)
        private findOneUserUseCase: FindOneUserUseCase
    ){}

    async create(createUser: CreateUserDTO): Promise<CreateReturnUserDTO>{
        try {
            const foundUserByEmail = await this.findOneUserUseCase.findOne({email: createUser.email})
            const foundUserByUserName = await this.findOneUserUseCase.findOne({nome_usuario: createUser.nome_usuario})
            if(foundUserByEmail) throw new BadRequestException('Email já cadastrado')
            if(foundUserByUserName) throw new BadRequestException('Nome de usuário já cadastrado')
            const salt = 12;
            const cryptoUser = {
                ...createUser, 
                senha: await bcrypt.hash(createUser.senha, salt)
            }
            const createdUser = await this.userRepository.create(cryptoUser)
            const user = new CreateReturnUserDTO()
            user.id = createdUser.id
            user.nome_usuario = createdUser.nome_usuario
            user.email = createdUser.email
            return user
        }
        catch(error){
            if(error instanceof BadRequestException) throw error
            throw new HttpException(error.message ?? 'Não foi possível cadastrar o usuário', error.status ?? 500)
        }
    }
}