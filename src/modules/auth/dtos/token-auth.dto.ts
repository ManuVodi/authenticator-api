import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class TokenAuthDTO {
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsString()
    @IsNotEmpty()
    nome_usuario: string;
}