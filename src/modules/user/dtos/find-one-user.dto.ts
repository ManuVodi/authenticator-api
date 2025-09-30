import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from "class-validator";

export class FindOneUserDTO {
    @ValidateIf((o) => !o.email)
    @IsNumber({}, {message: 'O campo id deve ser do tipo number'})
    @IsNotEmpty()
    id?: number;

    @ValidateIf((o) => !o.id)
    @IsEmail({}, {message: 'O campo email deve ser no formato de email'})
    @IsNotEmpty()
    email?: string;

    @IsString({message: 'O campo nome_suario deve ser do tipo string'})
    @IsOptional()
    nome_usuario?: string;
}