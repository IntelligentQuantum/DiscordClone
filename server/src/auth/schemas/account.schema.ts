import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AccountDocument = Account & Document;

@Schema({ timestamps: true })
export class Account
{
    @Prop({ type: String, unique: true })
    email: string;

    @Prop({ type: String, required: true })
    username: string;

    @Prop({ type: String, required: true })
    password: string;

    @Prop({ type: String })
    refreshToken: String
}

export const AccountSchema = SchemaFactory.createForClass(Account);
