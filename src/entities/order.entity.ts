import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders')
class Order {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public od_transaction_id: number;

    @Column()
    public od_product_id: number;

    @Column()
    public od_discount_type: string;

    @Column()
    public od_discount_value: number;

    @Column()
    public od_qty: number;

    @Column()
    public od_price: number;

    @Column()
    public od_total_price: number;
}

export default Order;
