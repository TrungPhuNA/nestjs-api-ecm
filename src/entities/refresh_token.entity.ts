import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('refresh_tokens')
class RefreshToken {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public user_id: number;

    @Column()
    public is_revoked: boolean;

    @Column()
    public expires: Date;

    @Column()
    public refresh_token: string;

    @Column()
    public code: string;
}

export default RefreshToken;
