import { HttpException } from "@nestjs/common";
import { UserEntityRepository } from "../../src/modules/user/models/user.repository";
import { FindOneUserUseCase } from "../../src/modules/user/use-cases/find-one-user.use-case"
import { findUser } from "../mocks/find-return-user.mock";

describe('FindOneUserUseCase', () => {
    let findOneUserUseCase: FindOneUserUseCase;
    let userRepository: jest.Mocked<UserEntityRepository>;

    beforeEach(() => {
        userRepository = {
            findOne: jest.fn() 
        } as any

        findOneUserUseCase = new FindOneUserUseCase(userRepository)
    })

    
    // should show one specific user by id
    it('deve trazer o usuário por id', async  () => {
        userRepository.findOne.mockResolvedValue(findUser)
        const result = await findOneUserUseCase.findOne({id: 1})
        
        expect(userRepository.findOne).toHaveBeenCalledWith({id: 1})
        expect(result).toEqual(findUser)
    })
    
    // should show one specific user by email
    it('deve trazer o usuário por email', async () => {
        userRepository.findOne.mockResolvedValue(findUser)
        const result = await findOneUserUseCase.findOne({email: 'teste@email.com'})
        
        expect(userRepository.findOne).toHaveBeenCalledWith({email: 'teste@email.com'})
        expect(result).toEqual(findUser)
    })
    
    // should show one specific user by nome_usuario
    it('deve trazer o usuário por nome_usuario', async () => {
        userRepository.findOne.mockResolvedValue(findUser)
        const result = await findOneUserUseCase.findOne({nome_usuario: 'manu'})
        
        expect(userRepository.findOne).toHaveBeenCalledWith({nome_usuario: 'manu'})
        expect(result).toEqual(findUser)
    })
    
    // should show a null result
    it('deve trazer um resultado nulo', async () => {
        userRepository.findOne.mockResolvedValue(null)
        const result = await findOneUserUseCase.findOne({id: 999})
        
        expect(userRepository.findOne).toHaveBeenCalledWith({id: 999})
        expect(result).toEqual(null)
    })
    
    // should throw a new error if repository couldn't execute the function
    it('deve lançar um erro caso o repositório não consiga executar a função', async () => {
        const error = new Error('Não foi possível buscar o usuário')
        userRepository.findOne.mockRejectedValue(error)

        await expect(findOneUserUseCase.findOne({id: 1})).rejects.toThrow(HttpException)
        expect(userRepository.findOne).toHaveBeenCalledWith({id: 1})
    })
})