import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Product from "./product.entity";
import Category from "./category.entity";
import Transaction from "./transaction.entity";

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

    @Column()
    public created_at: Date;

    @Column()
    public updated_at: Date;

    @OneToOne(() => Product, (product) => product.order)
    @JoinColumn({ name: "od_product_id", referencedColumnName: "id"})
    // @JoinColumn({ name: "id", referencedColumnName: "od_product_id"})
    product: Product

    @ManyToOne(() => Transaction, (transaction) => transaction.orders)
    @JoinColumn({ name: "od_transaction_id", referencedColumnName: "id"})
    transaction: Transaction
}

export default Order;
