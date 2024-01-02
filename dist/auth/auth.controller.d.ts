import { RegisterDto } from 'src/user/dtos/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<{
        email: string;
        name: string;
        token: string;
    }>;
    register(dto: RegisterDto): Promise<void>;
}
