import { HttpException, Inject, Injectable } from "@nestjs/common";
import { FindOneUserDTO } from "../dtos/find-one-user.dto";
import { UserEntity } from "../models/user.entity";
import { IUserRepository } from "../models/user.interface";
import { FindReturnUserDTO } from "../dtos/find-return-user.dto";

@Injectable()
export class FindOneUserUseCase {
    constructor(
        @Inject('IUserRepository')
        private userRepository: IUserRepository
    ){}

    async findOne(findOneUser: FindOneUserDTO): Promise<FindReturnUserDTO | null> {
        try{
            return await this.userRepository.findOne(findOneUser)
        }
        catch(error){
            throw new HttpException(error.message ?? 'Não foi possível buscar o usuário', error.status ?? 500)
        }
    }
}
