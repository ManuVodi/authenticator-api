import { DeleteResult, UpdateResult } from "typeorm";
import { CreateUserDTO } from "../dtos/create-user.dto";
import { FindAllUsersDTO } from "../dtos/find-all-users.dto";
import { UserEntity } from "./user.entity";
import { ResetPasswordUserDTO } from "../dtos/reset-password-user.dto";
import { FindOneUserDTO } from "../dtos/find-one-user.dto";
import { FindReturnUserDTO } from "../dtos/find-return-user.dto";
import { CreateReturnUserDTO } from "../dtos/create-return-user.dto";

export interface IUserRepository {
    create(createUser: CreateUserDTO): Promise<CreateReturnUserDTO>;
    findAll(params: FindAllUsersDTO): Promise<FindReturnUserDTO[]>;
    findOne(findOneUser: FindOneUserDTO): Promise<FindReturnUserDTO | null>;
    findPassword(id: number): Promise<{senha: string}>;
    disable(id: number): Promise<DeleteResult>;
    able(id: number): Promise<UpdateResult>;
    resetPassword(resetPasswordUser: ResetPasswordUserDTO): Promise<UpdateResult>
    delete(id: number): Promise<DeleteResult>
}