import { createReturnDTOMock } from "../../test/mocks/create-return-user.mock";
import { UserEntityRepository } from "../../src/modules/user/models/user.repository";
import { CreateUserUseCase } from "../../src/modules/user/use-cases/create-user.use-case";
import { FindOneUserUseCase } from "../../src/modules/user/use-cases/find-one-user.use-case";
import { createDTOMock } from "../../test/mocks/create-dto.mock";
import { HttpException } from "@nestjs/common";
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

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('deve criar um usuário com usuário e email inexistentes', async () => {
        // Simula que a função FIND ONE retorna NULL (não foi encontrado usuário cadastrado com o mesmo email ou nome_usuario passados)
        // Simula que a função CREATE retorna USER (usuário criado no repository)
        // Armazena o RESULTADO (retorno) da função CREATE passando como parametro o CREATE DTO MOCK
        findOneUseCase.findOne.mockResolvedValue(null)
        userRepository.create.mockResolvedValue(createReturnDTOMock)
        const result = await createUseCase.create(createDTOMock)

        // ESPERO que a função CREATE do REPOSITORY seja chamada com a ESPERA de um OBJETO CONTENDO {email, nome_usuario}
        expect(userRepository.create).toHaveBeenCalledWith(
            expect.objectContaining({
                email: createDTOMock.email,
                nome_usuario: createDTOMock.nome_usuario,
                // verifica se a string passada realmente é uma hash
                senha: expect.stringMatching(/^\$2[aby]\$\d{2}\$.{53}$/)
            })
        )

        // Pega o parametro mockado de index 0 passado na função create do repository
        // Verifica se a senha hasheada passada para o repositorio é a mesma senha que a enviada pelo use case
        const [teste] = userRepository.create.mock.calls[0]
        const senhaCorreta = await bcrypt.compare(createDTOMock.senha, teste.senha) 
        expect(senhaCorreta).toBe(true)

        // ESPERO que o RESULTADO (da função CREATE USE CASE) seja IGUAL ao CREATE RETURN DTO MOCK
        expect(result).toEqual(createReturnDTOMock)
    })

    it('deve lançar um erro pela falha de criação do usuário no repositório', async () => {
        findOneUseCase.findOne.mockResolvedValue(null)

        userRepository.create.mockResolvedValue(null)

        await expect(createUseCase.create(createDTOMock)).rejects.toThrow(HttpException)
    })

    it('deve lançar um erro de usuário já existente', async () => {
        // Simula que a função FIND ONE terá um retorno:
        // Primeira chamada da função com RETORNO nulo (no use case, verifica primeiro se o email já existe)
        // Segunda chamada da função com RETORNO do objeto (no use case, verifica por segundo se o nome_usuario já existe)
        findOneUseCase.findOne
        .mockResolvedValueOnce(null)    
        .mockResolvedValue({
            id: 1,
            email: 'teste@gmail.com',
            nome_usuario: 'manu'
        })

        // Simula que a função CREATE retorna null (usuário não criado no repository pois foi encontrado um com nome_usuario existente)
        userRepository.create.mockResolvedValue(null)

        // ESPERO que a função CREATE receba o OBJETO e REJEITA a requisição com um erro específico (REJECTS), LANÇANDO um erro HTTP EXCEPTION
        await expect(createUseCase.create({
            nome_usuario: 'manu',
            email: 'a@email.com',
            senha: 'teste123'
        })).rejects.toThrow(HttpException)
        expect(findOneUseCase.findOne).toHaveBeenCalledTimes(2)
    })

    it('deve lançar um erro de email já existente', async () => {
        // Simula que a função FIND ONE retorna FIND USER (foi encontrado usuário cadastrado com o mesmo email passado)
        // Simula que a função CREATE retorna null (usuário não criado no repository)
        findOneUseCase.findOne.mockResolvedValueOnce({
            id: 1,
            email: 'teste@gmail.com',
            nome_usuario: 'manu'
        }) 
        userRepository.create.mockResolvedValue(null)

        // ESPERA que a função CREATE receba o OBJETO e espera um erro específico (REJECTS), LANÇANDO um erro HTTPEXCEPTION
        await expect(createUseCase.create({
            nome_usuario: 'gui',
            email: 'teste@email.com',
            senha: 'teste123'
        })).rejects.toThrow(HttpException)
    })

})