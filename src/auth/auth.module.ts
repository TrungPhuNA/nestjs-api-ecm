import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from "../frontend/user/user.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";
import { AuthController } from './auth.controller';
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { JwtStrategy } from "./jwt.strategy";
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [
        UserModule,
        // User,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy, ConfigService],
    controllers: [AuthController]
})
export class AuthModule {}
