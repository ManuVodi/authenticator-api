import { BadRequestException, HttpException, Inject, Injectable, InternalServerErrorException } from "@nestjs/common";
import { IUserRepository } from "../models/user.interface";

@Injectable()
export class DeleteUserUseCase {
    constructor(
        @Inject('IUserRepository')
        private userRepository: IUserRepository
    ){}

    async delete(id: number): Promise<void> {
        try {
            const deletedUser = await this.userRepository.delete(id)
            if(!deletedUser.affected){
                throw new BadRequestException('Nenhum usuário foi deletado')
            }
        }
        catch(error){
            throw new HttpException(error.message ?? 'Não foi possível deletar o usuário', error.status ?? 500)
        }
    }
}