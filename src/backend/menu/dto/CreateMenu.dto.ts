import { IsNotEmpty, IsNumber, IsString } from "class-validator";

class CreateMenuDto {
    @IsString()
    @IsNotEmpty()
    mn_name: string;

    mn_slug: string;
    mn_avatar: string;

    @IsNotEmpty()
    mn_description: string;

    @IsNotEmpty()
    @IsNumber()
    mn_hot: number | 0;

    @IsNotEmpty()
    @IsNumber()
    mn_status: number | 0;
}

export default CreateMenuDto;
