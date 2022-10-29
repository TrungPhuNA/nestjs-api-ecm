import { IsNotEmpty, IsNumber, IsString } from "class-validator";

class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    c_name: string;

    c_slug: string;
    c_avatar: string;
    c_banner: string;

    @IsNotEmpty()
    c_description: string;

    c_hot: number | 0;

    @IsNotEmpty()
    @IsNumber()
    c_status: number;
}

export default CreateCategoryDto;
