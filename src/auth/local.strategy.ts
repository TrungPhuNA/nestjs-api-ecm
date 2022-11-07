import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ExtractJwt } from "passport-jwt";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        // super();
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_ACCESS_SECRET,
        });
    }

    async validate(username: string, password: string): Promise<any> {
        console.log('------------ validate: ', username);
        // check nếu username là email =>>  validate

        const user = await this.authService.validateUser(username, password);

        if (!user) {
            console.log('---------- FAIL');
            throw new UnauthorizedException();
        }

        return user;
    }
}
