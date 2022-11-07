import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Unique(["email"])
@Unique(["username"])
@Unique(["phone"])
@Entity('users')
class User {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public username: string;

    @Column()
    public email: string;

    @Column()
    public password: string;

    @Column()
    public phone: string;

    @Column()
    public address: string;

    @Column()
    public avatar: number;

    @Column()
    public refresh_token: string;
}

export default User;
