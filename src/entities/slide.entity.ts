import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('slides')
class Slide {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public s_title: string;

    @Column()
    public s_description: string;

    @Column()
    public s_link: string;

    @Column()
    public s_text: string;

    @Column()
    public s_banner: string;

    @Column()
    public s_sort: number;

    @Column()
    public s_status: number;
}

export default Slide;
