import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('comments')
class Comment {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public c_name: string;

    @Column()
    public c_content: string;

    @Column()
    public c_product_id: number;

    @Column()
    public c_user_id: number;

    @Column()
    public created_at: Date;

    @Column()
    public updated_at: Date;
}

export default Comment;
