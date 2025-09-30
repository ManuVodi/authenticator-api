import { IsEmail, IsOptional, IsString } from "class-validator";

export class FindAllUsersDTO {
    @IsString({message: 'O campo nome_usuario deve ser do tipo string'})
    @IsOptional()
    nome_usuario?: string;

    @IsEmail({}, {message: 'O campo email deve ser no formato de email'})
    @IsOptional()
    email?: string;
}