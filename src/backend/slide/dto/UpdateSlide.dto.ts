import { IsNotEmpty, IsNumber, IsString } from "class-validator";

class UpdateSlideDto {
    @IsString()
    @IsNotEmpty()
    s_title: string;

    s_description: string;
    s_link: string;
    s_banner: string;

    @IsNotEmpty()
    s_text: string;

    @IsNotEmpty()
    @IsNumber()
    s_sort: number | 0;

    @IsNotEmpty()
    @IsNumber()
    s_status: number | 0;
}

export default UpdateSlideDto;
