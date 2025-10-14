import { UserEntity } from "src/modules/user/models/user.entity";
import { createDTOMock } from "./create-dto.mock";

export const user: UserEntity = {
      id: 1,
      email: createDTOMock.email,
      senha: createDTOMock.senha,
      nome_usuario: createDTOMock.nome_usuario,
    };