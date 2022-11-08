import { IsNotEmpty, IsNumber, IsString } from "class-validator";

class CreateTransactionDto {
    @IsString()
    @IsNotEmpty()
    note: string;

    @IsNumber()
    @IsNotEmpty()
    total_price:  number | 0;

    @IsNotEmpty()
    products : object
}

export default CreateTransactionDto;
