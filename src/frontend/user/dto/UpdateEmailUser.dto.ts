import { IsNotEmpty, IsNumber, IsString } from "class-validator";

class UpdateEmailUserDto {
    @IsString()
    @IsNotEmpty()
    email: string;
}

export default UpdateEmailUserDto;
