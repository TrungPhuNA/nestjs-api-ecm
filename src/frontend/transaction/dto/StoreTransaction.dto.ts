import { IsNotEmpty, IsNumber, IsString } from "class-validator";

class StoreTransactionDto {

    @IsString()
    @IsNotEmpty()
    t_note: string;

    @IsString()
    @IsNotEmpty()
    t_name: string;

    @IsString()
    @IsNotEmpty()
    t_phone: string;

    @IsNumber()
    @IsNotEmpty()
    t_total_money:  number | 0;

    @IsNumber()
    @IsNotEmpty()
    t_user_id:  number | 0;

    @IsNumber()
    @IsNotEmpty()
    t_total_discount:  number | 0;

    created_at?: Date = new Date();
    updated_at?: Date = new Date();
}

export default StoreTransactionDto;
