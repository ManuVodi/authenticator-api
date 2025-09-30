import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ResetPasswordUserDTO {
    @IsEmail({}, {message: 'O campo email deve ser no formato de email'})
    @IsNotEmpty({message: 'O campo email deve ser preenchido'})
    email: string;

    @IsString({message: 'O campo senha_antiga deve ser do tipo string'})
    @IsNotEmpty({message: 'O campo senha_antiga deve ser preenchido'})
    senha_antiga: string;

    @IsString({message: 'O campo senha deve ser do tipo string'})
    @IsNotEmpty({message: 'O campo senha deve ser preenchido'})
    senha: string;
}