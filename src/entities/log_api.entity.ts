import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('logs_api')
class LogApi {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public method: string;

    @Column()
    public logs_response: string;

    @Column()
    public path: string;

    @Column()
    public status: number;

    @Column()
    public created_at: Date;

    @Column()
    public updated_at: Date;
}

export default LogApi;
