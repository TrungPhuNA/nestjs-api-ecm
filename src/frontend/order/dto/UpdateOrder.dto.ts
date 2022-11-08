import { IsNotEmpty, IsNumber, IsString } from "class-validator";

class UpdateOrderDto {
    @IsNumber()
    @IsNotEmpty()
    od_transaction_id:  number | 0;

    @IsNumber()
    @IsNotEmpty()
    od_product_id:  number | 0;

    @IsString()
    @IsNotEmpty()
    od_discount_type:  string | 'percent';

    @IsNumber()
    @IsNotEmpty()
    od_discount_value:  number | 0;

    @IsNumber()
    @IsNotEmpty()
    od_qty:  number | 0;

    @IsNumber()
    @IsNotEmpty()
    od_price:  number | 0;

    @IsNumber()
    @IsNotEmpty()
    od_total_price:  number | 0;

}

export default UpdateOrderDto;
