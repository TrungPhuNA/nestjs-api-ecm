import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Category from "./category.entity";
import Order from "./order.entity";

@Entity('products')
class Product {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public pro_name: string;

    @Column()
    public pro_slug: string;

    @Column()
    public pro_avatar: string;

    @Column()
    public pro_description: string;

    @Column()
    public pro_content: string;

    @Column()
    public pro_price: number;

    @Column()
    public pro_category_id: number;

    @Column()
    pro_discount_type: string

    @Column()
    pro_discount_value: number | 0

    @Column()
    public pro_number: number;

    @Column()
    public pro_active: number;

    @Column()
    public pro_sale: number;

    @Column()
    public created_at: Date;

    @Column()
    public updated_at: Date;

    @ManyToOne(() => Category, (category) => category.products)
    @JoinColumn({ name: "pro_category_id", referencedColumnName: "id"})
    category: Category

    @ManyToOne(() => Order, (order) => order.products)
    @JoinColumn({ name: "id", referencedColumnName: "od_product_id"})
    order: Order
}

export default Product;
