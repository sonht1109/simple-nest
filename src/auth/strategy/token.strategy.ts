import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class TokenStategy extends PassportStrategy(Strategy) {}
