import { BadRequestException, HttpException, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { IUserRepository } from "../models/user.interface";

@Injectable()
export class AbleUserUseCase {
    constructor(
        @Inject('IUserRepository')
        private userRepository: IUserRepository
    ){}

    async able(id: number): Promise<void> {
        try {
            const abledUser = await this.userRepository.able(id)
            if(abledUser.affected == 0){
                throw new BadRequestException('Nenhum usuário foi habilitado')
            }
        }
        catch(error){
            if(error instanceof BadRequestException) throw error
            throw new HttpException(error.message ?? 'Não foi possível habilitar o usuário', error.status ?? 500)
        }
    }

}