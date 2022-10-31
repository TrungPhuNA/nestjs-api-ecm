import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('articles')
class Article {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public a_name: string;

    @Column()
    public a_slug: string;

    @Column()
    public a_avatar: string;

    @Column()
    public a_description: string;

    @Column()
    public a_content: string;

    @Column()
    public a_menu_id: number;

    @Column()
    public a_hot: number;

    @Column()
    public a_view: number;

    @Column()
    public a_active: number;
}

export default Article;
