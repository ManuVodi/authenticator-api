import { Body, Controller, Inject, Post } from "@nestjs/common";
import { SignInAuthUseCase } from "./use-cases/sign-in-auth.use-case";
import { SignInAuthDTO } from "./dtos/sign-in-auth.dto";

@Controller('auth')
export class AuthController {
    constructor(
        @Inject(SignInAuthUseCase)
        private signInAuthUseCase: SignInAuthUseCase
    ){}

    @Post()
    async signIn(@Body() signInAuth: SignInAuthDTO): Promise<{acessToken: string}>{
        return await this.signInAuthUseCase.signIn(signInAuth)
    }
}