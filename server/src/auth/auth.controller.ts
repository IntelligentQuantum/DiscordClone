import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

import { AuthService } from './auth.service';
import { AccountDocument } from './schemas/account.schema';

@Controller('auth')
export class AuthController
{
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    public async register(@Body() registerDto: RegisterDto): Promise<AccountDocument>
    {
        return this.authService.register(registerDto);
    }

    @Post('login')
    public async login(@Body() loginDto: LoginDto, @Res() response: Response)
    {
        return this.authService.login(loginDto, response);
    }
}
