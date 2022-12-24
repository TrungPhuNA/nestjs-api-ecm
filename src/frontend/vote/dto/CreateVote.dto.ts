import { IsNotEmpty, IsNumber, IsString } from "class-validator";

class CreateVoteDto {

    @IsNotEmpty()
    v_content: string;

    @IsNotEmpty()
    @IsNumber()
    v_number: number | 0;

    @IsNotEmpty()
    @IsNumber()
    v_product_id: number | 0;

    @IsString()
    @IsNotEmpty()
    a_content: string;

    v_user_id?: number | 0;
    v_status?: number | 1;
}

export default CreateVoteDto;
