import { IsNotEmpty, IsString } from "class-validator";

export class SignInAuthDTO {
    @IsString({message: 'O campo nome_usuario deve ser do tipo string'})
    @IsNotEmpty({message: 'O campo nome_usuario deve ser preenchido'})
    nome_usuario: string;

    @IsString({message: 'O campo senha deve ser do tipo string'})
    @IsNotEmpty({message: 'O campo senha deve ser preenchido'})
    senha: string;
}