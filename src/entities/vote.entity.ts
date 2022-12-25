import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Category from "./category.entity";
import Product from "./product.entity";

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
}

export default Vote;
