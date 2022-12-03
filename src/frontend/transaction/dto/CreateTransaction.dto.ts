import { IsNotEmpty, IsNumber, IsString } from "class-validator";

class CreateTransactionDto {
    @IsString()
    @IsNotEmpty()
    note: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsNumber()
    @IsNotEmpty()
    total_price:  number | 0;

    @IsNotEmpty()
    products : object
}

export default CreateTransactionDto;
