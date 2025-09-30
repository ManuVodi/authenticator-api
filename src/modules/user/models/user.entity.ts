import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'nome_usuario', type: 'varying character'})
    nome_usuario: string;

    @Column({name: 'email', type: 'varying character'})
    email: string;

    @Column({name: 'senha', type: 'varying character'})
    senha: string;

    @DeleteDateColumn({name: 'deleted_date', type: 'date', default: null})
    deleted_date?: Date;
}