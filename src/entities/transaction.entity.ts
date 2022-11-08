import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transactions')
class Transaction {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public t_note: string;

    @Column()
    public t_user_id: number;

    @Column()
    public t_total_money: number;

    @Column()
    public t_total_discount: number;
}

export default Transaction;
