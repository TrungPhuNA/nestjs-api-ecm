import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Product from "./product.entity";
import Order from "./order.entity";

@Entity('transactions')
class Transaction {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public t_note: string;

    @Column()
    public t_name: string;

    @Column()
    public t_phone: string;

    @Column()
    public t_user_id: number;

    @Column()
    public t_total_money: number;

    @Column()
    public t_total_discount: number;

    @Column()
    public t_status: number;

    @Column()
    public created_at: Date;

    @OneToMany(() => Order, (order) => order.transaction)
    @JoinColumn({ name: "id", referencedColumnName: "od_transaction_id"})
    orders: Order[]
}

export default Transaction;
