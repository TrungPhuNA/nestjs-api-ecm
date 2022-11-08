import { IsNotEmpty, IsNumber, IsString } from "class-validator";

class StoreTransactionDto {

    @IsString()
    @IsNotEmpty()
    t_note: string;

    @IsNumber()
    @IsNotEmpty()
    t_total_money:  number | 0;

    @IsNumber()
    @IsNotEmpty()
    t_user_id:  number | 0;

    @IsNumber()
    @IsNotEmpty()
    t_total_discount:  number | 0;
}

export default StoreTransactionDto;
