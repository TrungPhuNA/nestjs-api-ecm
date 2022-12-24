import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('votes')
class Vote {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public v_content: string;

    @Column()
    public v_user_id: number;

    @Column()
    public v_product_id: number;

    @Column()
    public v_number: number;

    @Column()
    public v_status: number;

    @Column()
    public created_at: Date;

    @Column()
    public updated_at: Date;
}

export default Vote;
