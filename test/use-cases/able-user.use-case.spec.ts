import { UpdateResult } from "typeorm";
import { UserEntityRepository } from "../../src/modules/user/models/user.repository";
import { AbleUserUseCase } from "../../src/modules/user/use-cases/able-user.use-case"
import { BadRequestException, HttpException } from "@nestjs/common";

describe('AbleUserUseCase', () => {
    let ableUserUseCase: AbleUserUseCase;
    let userRepository: jest.Mocked<UserEntityRepository>;

    beforeEach(() => {
        userRepository = {
            able: jest.fn()
        } as any

        ableUserUseCase = new AbleUserUseCase(userRepository)
    })

    it('deve habilitar um usuário desabilitado', async () => {
        userRepository.able.mockResolvedValue({affected: 1} as UpdateResult)

        await expect(ableUserUseCase.able(1)).resolves.not.toThrow(HttpException)
        expect(userRepository.able).toHaveBeenCalledWith(1)
    })

    it('deve lançar um erro de usuário já habilitado', async () => {
        userRepository.able.mockResolvedValue({affected: 0} as UpdateResult)

        await expect(ableUserUseCase.able(1)).rejects.toThrow(BadRequestException)
        expect(userRepository.able).toHaveBeenCalledWith(1)
    })

    it('deve lançar um erro caso o repositório não consiga executar a função', async () => {
        const error = new Error('Não foi possível habilitar o usuário')
        userRepository.able.mockRejectedValue(error)

        await expect(ableUserUseCase.able(1)).rejects.toThrow(HttpException)
        expect(userRepository.able).toHaveBeenCalledWith(1)
    })
})