import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Product from "./product.entity";
import User from "./user.entity";
import Comment from "./comment.entity";

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

    @ManyToOne(() => Product, (product) => product.votes)
    @JoinColumn({ name: "v_product_id", referencedColumnName: "id"})
    product: Product

    @ManyToOne(() => User, (user) => user.votes)
    @JoinColumn({ name: "v_user_id", referencedColumnName: "id"})
    user: User

    @OneToMany(() => Comment, (comment) => comment.vote)
    @JoinColumn({ name: "id", referencedColumnName: "c_vote_id"})
    comments: Comment[]
}

export default Vote;
