import { HttpException, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { IUserRepository } from "../models/user.interface";
import { FindAllUsersDTO } from "../dtos/find-all-users.dto";
import { UserEntity } from "../models/user.entity";
import { FindReturnUserDTO } from "../dtos/find-return-user.dto";

@Injectable()
export class FindAllUsersCase {
    constructor(
        @Inject('IUserRepository')
        private userRepository: IUserRepository
    ){}
    
    async findAll(params: FindAllUsersDTO): Promise<FindReturnUserDTO[]> {
        try{
            return await this.userRepository.findAll(params)
        }
        catch(error){
            throw new HttpException(error.message ?? 'Não foi possível buscar os usuários', error.status ?? 500)
        }
    }

}