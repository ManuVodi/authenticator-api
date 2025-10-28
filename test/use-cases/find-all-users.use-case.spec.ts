import { findUser } from "../../test/mocks/find-return-user.mock";
import { UserEntityRepository } from "../../src/modules/user/models/user.repository";
import { FindAllUsersCase } from "../../src/modules/user/use-cases/find-all-users.use-case"
import { findUsers } from "../../test/mocks/find-return-users.mock";
import { HttpException } from "@nestjs/common";

describe('FindAllUserUseCase', () => {
    let findAllUsersCase: FindAllUsersCase;
    let userRepository: jest.Mocked<UserEntityRepository>;

    beforeEach(() => {
        userRepository = {
            findAll: jest.fn()
        } as any

        findAllUsersCase = new FindAllUsersCase(userRepository)
    })

    it('deve trazer todos os usuários sem filtro', async () => {
        userRepository.findAll.mockResolvedValue(findUsers)
        const result = await findAllUsersCase.findAll(null)

        expect(userRepository.findAll).toHaveBeenCalledWith(null)
        expect(result).toEqual(findUsers)
    })
    
    it('deve trazer todos os usuários com filtro por nome_usuario', async () => {
        userRepository.findAll.mockResolvedValue([{
            id: 1,
            nome_usuario: 'manu',
            email: 'teste@email.com'
        }])
        const result = await findAllUsersCase.findAll({nome_usuario: 'manu'})

        expect(userRepository.findAll).toHaveBeenCalledWith({nome_usuario: 'manu'})
        expect(result).toEqual([{
            id: 1,
            nome_usuario: 'manu',
            email: 'teste@email.com'
        }])
    })

    it('deve trazer todos os usuários com filtro por email', async () => {
        userRepository.findAll.mockResolvedValue([{
            id: 1,
            nome_usuario: 'manu',
            email: 'teste@email.com'
        }])
        const result = await findAllUsersCase.findAll({email: 'teste@email.com'})

        expect(userRepository.findAll).toHaveBeenCalledWith({email: 'teste@email.com'})
        expect(result).toEqual([{
            id: 1,
            nome_usuario: 'manu',
            email: 'teste@email.com'
        }])
    })

    it('deve trazer um resultado vazio', async () => {
        userRepository.findAll.mockResolvedValue([])
        const result = await findAllUsersCase.findAll({email: 'a@a.com'})

        expect(userRepository.findAll).toHaveBeenCalledWith({email: 'a@a.com'})
        expect(result).toEqual([])
    })

    it('deve lançar um erro caso o repositório não consiga executar a função', async () => {
        const error = new Error('Não foi possível buscar os usuários')
        userRepository.findAll.mockRejectedValue(error)

        await expect(findAllUsersCase.findAll(null)).rejects.toThrow(HttpException)
        expect(userRepository.findAll).toHaveBeenCalledWith(null)
    })
})