import { Injectable } from "@nestjs/common";
import { IUserRepository } from "./user.interface";
import { CreateUserDTO } from "../dtos/create-user.dto";
import { UserEntity } from "./user.entity";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { FindAllUsersDTO } from "../dtos/find-all-users.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ResetPasswordUserDTO } from "../dtos/reset-password-user.dto";
import { FindOneUserDTO } from "../dtos/find-one-user.dto";

@Injectable()
export class UserEntityRepository implements IUserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private userEntity: Repository<UserEntity>
    ){}

    async create(createUser: CreateUserDTO): Promise<UserEntity> {
        const createdUser = await this.userEntity.save(createUser)        
        delete createdUser.senha 
        delete createdUser.deleted_date
        return createdUser
    }

    async findAll(params: FindAllUsersDTO): Promise<UserEntity[]> {
        const query = this.userEntity
            .createQueryBuilder('user_entity')
            .select([
                "user_entity.id",
                "user_entity.nome_usuario",
                "user_entity.email"
            ])
        
        if(params.email){
            query.andWhere("email LIKE :email", {email: `%${params.email}%`})
        }
        if(params.nome_usuario){
            query.andWhere("nome_usuario LIKE :nome_usuario", {nome_usuario: `%${params.nome_usuario}%`})
        }

        return await query.getMany()
    }

    async findOne(findOneUser: FindOneUserDTO): Promise<UserEntity | null> {
        const query = this.userEntity
            .createQueryBuilder('user_entity')
            .select([
                "user_entity.id",
                "user_entity.nome_usuario",
                "user_entity.email"
            ])
            
        if(findOneUser.id){
            query.andWhere("id = :id", {id: findOneUser.id})
        }
        if(findOneUser.email){
            query.andWhere("email = :email", {email: findOneUser.email})
        }
        if(findOneUser.nome_usuario){
            query.andWhere("nome_usuario = :nome_usuario", {nome_usuario: findOneUser.nome_usuario})
        }

        return await query.getOne()
    }

    async findPassword(id: number): Promise<{senha: string}> {
        return await this.userEntity
            .createQueryBuilder('user_entity')
            .select([
                "user_entity.senha"
            ])
            .where("id = :id", {id})
            .getOne()
    }

    async disable(id: number): Promise<DeleteResult> {
        return await this.userEntity
            .createQueryBuilder()
            .softDelete()
            .where("id = :id", {id})
            .execute()
    }

    async able(id: number): Promise<UpdateResult> {
        return await this.userEntity
            .createQueryBuilder()
            .restore()
            .where("id = :id", {id})
            .execute()
    }

    async resetPassword(resetPasswordUser: ResetPasswordUserDTO): Promise<UpdateResult> {
        return await this.userEntity
            .createQueryBuilder()
            .update()
            .set({
                senha: resetPasswordUser.senha
            })
            .where("email = :email", {email: resetPasswordUser.email})
            .execute()
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.userEntity
            .createQueryBuilder()
            .delete()
            .where("id = :id", {id})
            .execute()
    }
}