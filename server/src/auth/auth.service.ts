import { BadRequestException, ConflictException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Response } from 'express';

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
            throw new ConflictException('Email address already exists');

        const usernameExists = await this.accountModel.findOne({ username: username.toLowerCase() });
        if (usernameExists)
            throw new ConflictException('Username already exists');

        if (passwordConfirm !== password)
            throw new BadRequestException('Password does not match');

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
            const accessToken: string = sign({ id: account.id }, process.env.JWT_ACCESS_KEY, { expiresIn: '30s' });
            const refreshToken: string = sign({ id: account.id }, process.env.JWT_REFRESH_KEY, { expiresIn: '1d' });

            account.refreshToken = refreshToken;
            await account.save();

            response.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });

            return response.status(HttpStatus.OK).json({ accessToken });
        }

        throw new UnauthorizedException('Please check your login credentials');
    }
}
