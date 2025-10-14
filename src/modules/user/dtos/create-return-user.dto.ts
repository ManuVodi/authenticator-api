import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateReturnUserDTO {
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsString({message: 'O campo nome_usuario deve ser do tipo string'})
    @IsNotEmpty({message: 'O campo nome_usuario deve ser preenchido'})
    nome_usuario: string;

    @IsEmail({}, {message: 'O campo email deve ser no formato de email'})
    @IsNotEmpty({message: 'O campo email deve ser preenchido'})
    email: string;
}