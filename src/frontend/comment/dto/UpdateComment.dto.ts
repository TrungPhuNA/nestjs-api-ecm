import { IsNotEmpty, IsNumber, IsString } from "class-validator";

class UpdateCommentDto {
    @IsNotEmpty()
    c_name: string;

    @IsNotEmpty()
    @IsNumber()
    v_number: number | 0;

    @IsNotEmpty()
    @IsNumber()
    c_product_id: number | 0;

    @IsString()
    @IsNotEmpty()
    c_content: string;

    c_user_id?: number | 0;
}

export default UpdateCommentDto;
