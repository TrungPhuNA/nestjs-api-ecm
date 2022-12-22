import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

    @OneToMany(() => Product, (product) => product.order)
    @JoinColumn({ name: "id", referencedColumnName: "od_product_id"})
    products: Product[]

    @ManyToOne(() => Transaction, (transaction) => transaction.orders)
    @JoinColumn({ name: "od_transaction_id", referencedColumnName: "id"})
    transaction: Transaction
}

export default Order;
