import { IsNotEmpty, IsNumber, IsString } from "class-validator";

class UpdateVoteDto {
    @IsNotEmpty()
    v_content: string;

    @IsNotEmpty()
    @IsNumber()
    v_number: number | 0;

    @IsNotEmpty()
    @IsNumber()
    v_product_id: number | 0;

    v_user_id?: number | 0;
    v_status?: number | 1;

    updated_at?: Date = new Date();
}

export default UpdateVoteDto;
