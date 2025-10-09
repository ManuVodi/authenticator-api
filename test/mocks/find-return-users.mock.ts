import { FindReturnUserDTO } from "src/modules/user/dtos/find-return-user.dto";
import { findUser } from "./find-return-user.mock";

export const findUsers: FindReturnUserDTO[] = [
    {...findUser},
    { 
        id: 2, 
        email: 'email2@email.com', 
        nome_usuario: 'gui' 
    }
];