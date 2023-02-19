import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Vote from "./vote.entity";

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

    @ManyToOne(() => Vote, (vote) => vote.comments)
    @JoinColumn({ name: "c_vote_id", referencedColumnName: "id"})
    vote: Vote
}

export default Comment;
