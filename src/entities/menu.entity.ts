import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('menus')
class Menu {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public mn_name: string;

    @Column()
    public mn_slug: string;

    @Column()
    public mn_avatar: string;

    @Column()
    public mn_banner: string;

    @Column()
    public mn_description: string;

    @Column()
    public mn_hot: number;

    @Column()
    public mn_status: number;

    @Column()
    public created_at: Date;

    @Column()
    public updated_at: Date;
}

export default Menu;
