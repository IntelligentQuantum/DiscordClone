import { BadRequestException, ConflictException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { Response, Request } from 'express';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

import { Account, AccountDocument } from './schemas/account.schema';

@Injectable()
export class AuthService
{
    constructor(@InjectModel(Account.name) private accountModel: Model<AccountDocument>) {}

    public async register(registerDto: RegisterDto): Promise<AccountDocument>
    {
        const { email, username, password, passwordConfirm } = registerDto;

        const emailExists = await this.accountModel.findOne({ email: email.toLowerCase() });
        if (emailExists)
        {
            throw new ConflictException('Email address already exists');
        }

        const usernameExists = await this.accountModel.findOne({ username: username.toLowerCase() });
        if (usernameExists)
        {
            throw new ConflictException('Username already exists');
        }

        if (passwordConfirm !== password)
        {
            throw new BadRequestException('Password does not match');
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAccount = new this.accountModel({ email: email.toLowerCase(), username: username.toLowerCase(), password: hashedPassword });
        return newAccount.save();
    }

    public async login(loginDto: LoginDto, response: Response)
    {
        const { email, password } = loginDto;

        const account: AccountDocument = await this.accountModel.findOne({ email: email.toLowerCase() });

        if (account && (await bcrypt.compare(password, account.password)))
        {
            const accessToken: string = sign({ id: account.id }, process.env.JWT_ACCESS_KEY, { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN });
            const refreshToken: string = sign({ id: account.id }, process.env.JWT_REFRESH_KEY, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN });

            account.refreshToken = refreshToken;
            await account.save();

            response.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });

            return response.status(HttpStatus.OK).json({ accessToken });
        }

        throw new UnauthorizedException('Please check your login credentials');
    }

    public async logout(request: Request, response: Response)
    {
        const refreshToken: string = request.cookies['jwt'];
        if (!refreshToken)
        {
            throw new UnauthorizedException('You are not logged in! Please log in to get access.');
        }

        const account = await this.accountModel.findOne({ refreshToken });
        if (!account)
        {
            response.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
            return response.status(HttpStatus.NO_CONTENT).json({ message: 'You are already logged out' });
        }

        account.refreshToken = '';
        await account.save();

        response.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
        return response.status(HttpStatus.NO_CONTENT).json({ message: 'You are already logged out' });
    }

    public async refresh(request: Request)
    {
        const refreshToken: string = request.cookies['jwt'];
        if (!refreshToken)
        {
            throw new UnauthorizedException('You are not logged in! Please log in to get access.');
        }

        const account = await this.accountModel.findOne({ refreshToken });
        if (!account)
        {
            throw new UnauthorizedException('Invalid Token. Please log in again!');
        }

        verify(refreshToken, process.env.JWT_REFRESH_KEY, (error, decoded) =>
        {
            if (error || account.id !== decoded.id)
            {
                throw new UnauthorizedException('Invalid Token. Please log in again!');
            }

            const accessToken: string = sign({ id: account.id }, process.env.JWT_ACCESS_KEY, { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN });

            return({ accessToken });
        });
    }
}
