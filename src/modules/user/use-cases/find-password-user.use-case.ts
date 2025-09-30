import { HttpException, Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "../models/user.interface";

@Injectable()
export class FindPasswordUserUseCase {
    constructor(
        @Inject('IUserRepository')
        private userRepository: IUserRepository
    ){}

    async findPassword(id: number): Promise<{senha: string}> {
        try{
            return await this.userRepository.findPassword(id)
        }
        catch(error){
            throw new HttpException(error.message ?? 'Não foi possível buscar a senha do usuário', error.status ?? 500)
        }
    }
}