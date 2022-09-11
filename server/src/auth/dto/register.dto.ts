import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto
{
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    password: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    passwordConfirm: string;
}
