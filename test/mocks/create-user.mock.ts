import { UserEntity } from "src/modules/user/models/user.entity";
import { dto } from "./create-dto.mock";

export const createUser: UserEntity = {
      id: 1,
      email: dto.email,
      senha: dto.senha,
      nome_usuario: dto.nome_usuario,
    };