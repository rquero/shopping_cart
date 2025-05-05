import type ILoginDto from '../interfaces/login_dto'
import type IRegisterDto from '../interfaces/register_dto'

export default abstract class AuthRepositoryInterface {
  abstract login(credencial: ILoginDto): Promise<unknown>
  abstract register(register: IRegisterDto): Promise<unknown>
  abstract logout(): Promise<void>
}
