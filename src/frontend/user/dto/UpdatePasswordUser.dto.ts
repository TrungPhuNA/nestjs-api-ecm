import { IsNotEmpty, IsNumber, IsString } from "class-validator";

class UpdatePasswordUserDto {
    @IsString()
    @IsNotEmpty()
    password_old: string;

    @IsString()
    @IsNotEmpty()
    password_new: string;

    @IsString()
    @IsNotEmpty()
    password_confirm: string;
}

export default UpdatePasswordUserDto;
