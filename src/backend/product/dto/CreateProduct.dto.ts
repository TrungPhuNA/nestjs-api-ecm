import { IsNotEmpty, IsNumber, IsString } from "class-validator";

class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    pro_name: string;

    pro_slug: string;
    pro_avatar: string;

    @IsNotEmpty()
    pro_description: string;

    pro_price: number | 0;

    @IsNotEmpty()
    @IsNumber()
    pro_category_id: number | 0;

    pro_number: number | 0;

    @IsNotEmpty()
    @IsString()
    pro_discount_type: string

    @IsNotEmpty()
    @IsString()
    pro_discount_value: number | 0

    @IsNotEmpty()
    @IsNumber()
    pro_active: number | 0;

    pro_content: string;
    pro_hot: number | 0;
}

export default CreateProductDto;
