import { HttpException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { FindOneUserUseCase } from "src/modules/user/use-cases/find-one-user.use-case";
import { FindPasswordUserUseCase } from "src/modules/user/use-cases/find-password-user.use-case";
import { SignInAuthDTO } from "../dtos/sign-in-auth.dto";
import { TokenAuthDTO } from "../dtos/token-auth.dto";
import { CreateTokenAuthUseCase } from "./create-token.use-case";

@Injectable()
export class SignInAuthUseCase {
    constructor(
        @Inject(FindOneUserUseCase)
        private findOneUserUseCase: FindOneUserUseCase,
        @Inject(FindPasswordUserUseCase)
        private findPasswordUserUseCase: FindPasswordUserUseCase,
        @Inject(CreateTokenAuthUseCase)
        private createTokenAuthUseCase: CreateTokenAuthUseCase
    ){}

    async signIn(signInAuth: SignInAuthDTO): Promise<{acessToken: string}> {
        try {
            const foundUserByUserName = await this.findOneUserUseCase.findOne({nome_usuario: signInAuth.nome_usuario})
            if(foundUserByUserName){
                const userPassword = await this.findPasswordUserUseCase.findPassword(foundUserByUserName.id)
                const validPassword = await bcrypt.compare(signInAuth.senha, userPassword.senha)
                if(validPassword){
                    const userAuth = new TokenAuthDTO()
                    userAuth.id = foundUserByUserName.id
                    userAuth.nome_usuario = foundUserByUserName.nome_usuario
                    const generatedToken = this.createTokenAuthUseCase.createToken(userAuth)
                    return generatedToken
                }
            }
            throw new UnauthorizedException('Nome de usuário ou senha incorretos')
        }
        catch(error){
            throw new HttpException(error.message ?? 'Não foi possível realizar o login', error.status ?? 500)
        }
    }
}