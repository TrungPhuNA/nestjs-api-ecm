import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
    public pro_number: number;

    @Column()
    public pro_active: number;

    @Column()
    public pro_sale: number;
}

export default Product;
