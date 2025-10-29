import { DeleteResult } from "typeorm";
import { UserEntityRepository } from "../../src/modules/user/models/user.repository";
import { DisableUserUseCase } from "../../src/modules/user/use-cases/disable-user.use-case"
import { BadRequestException, HttpException } from "@nestjs/common";

describe('DisableUserUseCase', () => {
    let disableUserUseCase: DisableUserUseCase;
    let userRepository: jest.Mocked<UserEntityRepository>;

    beforeEach(() => {
        userRepository = {
            disable: jest.fn()
        } as any

        disableUserUseCase = new DisableUserUseCase(userRepository)
    })

    it('deve desabilitar usuário ativo', async () => {
        userRepository.disable.mockResolvedValue({affected: 1} as DeleteResult)

        // Como minha função no use case está com um retorno VOID, testar seu retorno é 'inútil'
        // é necessário testar o comportamento da função ou seja, o que deve acontecer com a função bem sucedida
        // ESPERO que a minha função DISABLE funcione e finalize (SE RESOLVA) SEM o LANÇAMENTO de um ERRO
        await expect(disableUserUseCase.disable(1)).resolves.not.toThrow()
        expect(userRepository.disable).toHaveBeenCalledWith(1)
    })

    it('deve lançar um erro por usuário já estar desabilitado', async () => {
        userRepository.disable.mockResolvedValue({affected: 0} as DeleteResult)

        await expect(disableUserUseCase.disable(1)).rejects.toThrow(BadRequestException)
        expect(userRepository.disable).toHaveBeenCalledWith(1)
    })

    it('deve lançar um erro caso o repositório não consiga executar a função', async () => {
        const erro = new Error('Não foi possível desabilitar o usuário')
        userRepository.disable.mockRejectedValue(erro)

        await expect(disableUserUseCase.disable(1)).rejects.toThrow(HttpException)
        expect(userRepository.disable).toHaveBeenCalledWith(1)
    })
})