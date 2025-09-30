import { BadRequestException, HttpException, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { IUserRepository } from "../models/user.interface";

@Injectable()
export class DisableUserUseCase {
    constructor(
        @Inject('IUserRepository')
        private userRepository: IUserRepository
    ){}

    async disable(id: number): Promise<void> {
        try {
            const disabledUser = await this.userRepository.disable(id)
            if(disabledUser.affected == 0){
                throw new BadRequestException('Nenhum usuário foi desabilitado')
            }
        }
        catch(error){
            throw new HttpException(error.message ?? 'Não foi possível desabilitar o usuário', error.status ?? 500)
        }
    }

}