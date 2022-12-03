import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
    public created_at: Date;
}

export default Transaction;
