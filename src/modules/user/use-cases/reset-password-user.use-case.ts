import { BadRequestException, HttpException, Inject, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { ResetPasswordUserDTO } from "../dtos/reset-password-user.dto";
import { IUserRepository } from "../models/user.interface";
import { FindOneUserUseCase } from "./find-one-user.use-case";
import { FindPasswordUserUseCase } from "./find-password-user.use-case";

@Injectable()
export class ResetPasswordUserUseCase {
    constructor(
        @Inject('IUserRepository')
        private userRepository: IUserRepository,
        @Inject(FindOneUserUseCase)
        private findOneUserUseCase: FindOneUserUseCase,
        @Inject(FindPasswordUserUseCase)
        private findPasswordUserUseCase: FindPasswordUserUseCase
    ){}

    async resetPassword(resetPasswordUser: ResetPasswordUserDTO): Promise<void>{
        try{
            const foundUser = await this.findOneUserUseCase.findOne({email: resetPasswordUser.email})
            const userPassword = await this.findPasswordUserUseCase.findPassword(foundUser.id)
            if(foundUser){
                if(resetPasswordUser.senha == resetPasswordUser.senha_antiga){
                    throw new BadRequestException('A nova senha deve ser diferente da senha antiga')
                }
                const sameOldPassword = await bcrypt.compare(resetPasswordUser.senha_antiga, userPassword.senha)
                if(sameOldPassword){
                    const salt = 12
                    const cryptoUser = {
                        ...resetPasswordUser,
                        senha: await bcrypt.hash(resetPasswordUser.senha, salt)
                    }
                    await this.userRepository.resetPassword(cryptoUser)
                }
            }
        }
        catch(error){
            if(error instanceof BadRequestException) throw error
            throw new HttpException(error.message ?? 'Não foi possível alterar a senha do usuário', error.status ?? 500)
        }
    }
}