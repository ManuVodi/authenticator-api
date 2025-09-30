import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class FindReturnUserDTO {
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsString()
    @IsNotEmpty()
    nome_usuario: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}