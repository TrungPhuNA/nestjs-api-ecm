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
    public pro_price: number;

    @Column()
    public pro_category_id: number;
}

export default Product;
