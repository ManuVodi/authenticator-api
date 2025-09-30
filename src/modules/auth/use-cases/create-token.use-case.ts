import { HttpException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TokenAuthDTO } from "../dtos/token-auth.dto";

@Injectable()
export class CreateTokenAuthUseCase {
    constructor(
        private jwtService: JwtService
    ){}

    async createToken(tokenAuth: TokenAuthDTO): Promise<{acessToken: string}>{
        try{
            const token = this.jwtService.sign({ ...tokenAuth })
            return {acessToken: token}
        }
        catch(error){
            throw new HttpException(error.message ?? 'Não foi possível gerar o token', error.status ?? 500)
        }
    }
}