import { IsNotEmpty, IsNumber, IsString } from "class-validator";

class UpdateArticleDto {
    @IsString()
    @IsNotEmpty()
    a_name: string;

    a_slug: string;
    a_avatar: string;

    @IsNotEmpty()
    a_description: string;

    @IsNotEmpty()
    @IsNumber()
    a_menu_id: number | 0;

    @IsNotEmpty()
    @IsNumber()
    a_active: number | 0;

    @IsString()
    @IsNotEmpty()
    a_content: string;

    a_hot: number | 0;
}

export default UpdateArticleDto;
