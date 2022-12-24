import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Product from "./product.entity";

@Entity('categories')
class Category {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public c_name: string;

    @Column()
    public c_slug: string;

    @Column()
    public c_avatar: string;

    @Column()
    public c_banner: string;

    @Column()
    c_description: string;

    @Column()
    c_hot: number;

    @Column()
    c_status: number;

    @OneToMany(() => Product, (product) => product.category)
    @JoinColumn({ name: "id", referencedColumnName: "pro_category_id"})
    products: Product[]

    @Column()
    public created_at: Date;

    @Column()
    public updated_at: Date;
}

export default Category;
