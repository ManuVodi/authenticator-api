import { createReturnDTOMock } from "../../test/mocks/create-return-user.mock";
import { UserEntityRepository } from "../../src/modules/user/models/user.repository";
import { CreateUserUseCase } from "../../src/modules/user/use-cases/create-user.use-case";
import { FindOneUserUseCase } from "../../src/modules/user/use-cases/find-one-user.use-case";
import { createDTOMock } from "../../test/mocks/create-dto.mock";
import { user } from "../../test/mocks/user.mock";
import * as bcrypt from 'bcrypt';


describe('CreateUserUseCase', () => {
    let createUseCase: CreateUserUseCase;
    let findOneUseCase: jest.Mocked<FindOneUserUseCase>;
    let userRepository: jest.Mocked<UserEntityRepository>;

    beforeEach(() => {
        userRepository = {
            create: jest.fn()
        } as any;

        findOneUseCase = {
            findOne: jest.fn()
        } as any

        createUseCase = new CreateUserUseCase(userRepository, findOneUseCase)
    })

    it('deve criar um usuário com usuário e email inexistentes', async () => {
        findOneUseCase.findOne.mockResolvedValue(null)
        userRepository.create.mockResolvedValue(user)
        const result = await createUseCase.create(createDTOMock)
        
        expect(userRepository.create).toHaveBeenCalledWith(
            expect.objectContaining({
                email: createDTOMock.email,
                nome_usuario: createDTOMock.nome_usuario
            })
        )
        expect(result).toEqual(createReturnDTOMock)
    })

    it('deve lançar um erro de usuário já existente', async () => {

    })

    it('deve lançar um erro de email já existente', async () => {

    })

    it('deve lançar um erro de senha criptografada diferente da enviada pelo usuário', async () => {

    })

    it('deve lançar um erro inesperado', async () => {

    })

})