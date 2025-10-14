import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../src/modules/user/user.controller';
import { CreateUserUseCase } from '../src/modules/user/use-cases/create-user.use-case';
import { FindAllUsersCase } from '../src/modules/user/use-cases/find-all-users.use-case';
import { FindOneUserUseCase } from '../src/modules/user/use-cases/find-one-user.use-case';
import { DisableUserUseCase } from '../src/modules/user/use-cases/disable-user.use-case';
import { AbleUserUseCase } from '../src/modules/user/use-cases/able-user.use-case';
import { ResetPasswordUserUseCase } from '../src/modules/user/use-cases/reset-password-user.use-case';
import { DeleteUserUseCase } from '../src/modules/user/use-cases/delete-user.use-case';
import { AuthGuard } from '../src/modules/auth/use-cases/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { createDTOMock } from './mocks/create-dto.mock';
import { user } from './mocks/user.mock';
import { findUsers } from './mocks/find-return-users.mock';
import { findUser } from './mocks/find-return-user.mock';
import { resetPasswordUser } from './mocks/reset-password-user.mock';
import { createReturnDTOMock } from './mocks/create-return-user.mock';

describe('UserController', () => {
  // variáveis para armazenar as funções (com seus tipos) do módulo
  let controller: UserController;
  let createUserUseCase: CreateUserUseCase;
  let findAllUsersCase: FindAllUsersCase;
  let findOneUserUseCase: FindOneUserUseCase;
  let disableUserUseCase: DisableUserUseCase;
  let ableUserUseCase: AbleUserUseCase;
  let resetPasswordUserUseCase: ResetPasswordUserUseCase;
  let deleteUserUseCase: DeleteUserUseCase;

  // função executada antes de todas as outras 
  beforeEach(async () => {
    // constrói um módulo de teste com base no verdadeiro
  const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: CreateUserUseCase,
          useValue: {
            // define que a função declarada acima (CreateUserUseCase) retornará um dado mockado do tipo CREATEUSER
            create: jest.fn().mockResolvedValue(createReturnDTOMock),
          }
        },
        { 
            provide: FindAllUsersCase, 
            useValue: {
              // define que a função declarada acima (FindUsersUseCase) retornará um dado mockado do tipo FINDUSERS
              findAll: jest.fn().mockResolvedValue(findUsers),
          } 
        },
        { 
            provide: FindOneUserUseCase, 
            useValue: {
              // define que a função declarada acima (FindUserUseCase) retornará um dado mockado do tipo FINDUSER
              findOne: jest.fn().mockResolvedValue(findUser),
          } 
        },
        { 
            provide: DisableUserUseCase, 
            useValue: {
              disable: jest.fn().mockResolvedValue(undefined)
            } 
        },
        { 
            provide: AbleUserUseCase, 
            useValue: {
              able: jest.fn().mockResolvedValue(undefined)
            } 
        },
        { 
            provide: ResetPasswordUserUseCase, 
            useValue: {
              resetPassword: jest.fn().mockResolvedValue(undefined)
            } 
        },
        { 
            provide: DeleteUserUseCase, 
            useValue: {
              delete: jest.fn().mockResolvedValue(undefined)
            } 
        },
        { 
            provide: JwtService, 
            useValue: { 
              verifyAsync: jest.fn().mockResolvedValue({ id: 1, nome_usuario: 'manu' }) 
            } 
        },
        { 
            provide: AuthGuard, 
            useClass: AuthGuard, 
        },
      ],
    }).compile();

    // define para cada variável a função que tem dentro do módulo
    controller = module.get<UserController>(UserController);
    createUserUseCase = module.get<CreateUserUseCase>(CreateUserUseCase);
    findAllUsersCase = module.get<FindAllUsersCase>(FindAllUsersCase);
    findOneUserUseCase = module.get<FindOneUserUseCase>(FindOneUserUseCase);
    disableUserUseCase = module.get<DisableUserUseCase>(DisableUserUseCase);
    ableUserUseCase = module.get<AbleUserUseCase>(AbleUserUseCase);
    resetPasswordUserUseCase = module.get<ResetPasswordUserUseCase>(ResetPasswordUserUseCase);
    deleteUserUseCase = module.get<DeleteUserUseCase>(DeleteUserUseCase)
  });

  // teste para validar se foi criado o controller
  it('deve ser definido', () => {
    // EXPECTATIVA que o CONTROLLER. seja CRIADO/DEFINIDO
    expect(controller).toBeDefined();
  });

  // teste para validar a função CREATE do controller
  it('deve criar um usuário', async () => {

    // simula um RESULTADO (retorno/consulta do banco de dados) com um tipo DTO
    const result = await controller.create(createDTOMock);

    // EXPECTATIVA que o RESULTADO seja IGUAL ao tipo CREATEUSER
    expect(result).toEqual(createReturnDTOMock);

    // EXPECTATIVA que a função CREATE seja CHAMADA com o parâmetro DTO
    expect(createUserUseCase.create).toHaveBeenCalledWith(createDTOMock);
  });

  // teste para validar a função FIND ALL do controller SEM FILTRO
  it('deve trazer todos usuários sem filtro', async () => {
    const result = await controller.findAll()

    expect(result).toEqual(findUsers)
    expect(findAllUsersCase.findAll).toHaveBeenCalledWith({email: undefined, nome_usuario: undefined})
  })

  // teste para validar a função FIND ALL do controller COM FILTRO
  it('deve trazer todos usuários com filtro', async () => {

    // simula um RESULTADO (retorno/consulta do banco de dados) com o filtro de email ='GMAIL' e nome_usuario = UNDEFINED 
    const result = await controller.findAll('gmail', undefined)

    // EXPECTATIVA que o RESULTADO seja IGUAL ao tipo FINDUSERS
    expect(result).toEqual(findUsers)

    // EXPECTATIVA que a função FIND ALL seja CHAMADA com o parâmetro EMAIL com valor 'GMAIL' e NOME_USUARIO com valor UNDEFINED
    expect(findAllUsersCase.findAll).toHaveBeenCalledWith({email: 'gmail', nome_usuario: undefined})
  })

  // teste para validar a função FIND ONE do controller por ID
  it('deve trazer apenas um usuário por id', async () => {

    // simula um RESULTADO (retorno/consulta do banco de dados) com filtro de id = 1
    const result = await controller.findOne(1)

    // EXPECTATIVA que o RESULTADO seja IGUAL ao tipo FINDUSER
    expect(result).toEqual(findUser)

    // EXPECTATIVA que a função FIND ONE seja CHAMADA com o parâmetro ID com valor 1
    expect(findOneUserUseCase.findOne).toHaveBeenCalledWith({id: 1})
  })

  // teste para validar a função DISABLE do controller por ID
  it('deve desabilitar o usuário', async () => {

    // simula uma consulta do banco de dados com filtro de id = 1
    await controller.disable(1)

    // EXPECTATIVA que a função DISABLE seja CHAMADA com o parâmetro ID com valor 1
    expect(disableUserUseCase.disable).toHaveBeenCalledWith(1)
  })

  // teste para validar a função ABLE do controller por ID
  it('deve habilitar o usuário', async () => {
    await controller.able(1)
    expect(ableUserUseCase.able).toHaveBeenCalledWith(1)
    })

    // teste para validar a função RESET PASSWORD 
    it('deve mudar a senha do usuário', async () => {

      // simula um RESULTADO (retorno/consulta do banco de dados) com o tipo RESET PASSWORDUSER
      const result = await controller.resetPassword(resetPasswordUser)

      // EXPECTATIVA que o RESULTADO seja IGUAL a UNDEFINED
      expect(result).toEqual(undefined)

      // EXPECTATIVA que a função RESETPASSWORD seja CHAMADA com o parâmetro RESET PASSWORDUSER
      expect(resetPasswordUserUseCase.resetPassword).toHaveBeenCalledWith(resetPasswordUser)
    })

    // teste para validar a função DELETE
    it('deve deletar o usuário', async () => {   
      const result = await controller.delete(1)

      expect(result).toEqual(undefined)
      expect(deleteUserUseCase.delete).toHaveBeenCalledWith(1)
    })

});
