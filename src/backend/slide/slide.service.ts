import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import SlideEntity from "../../entities/slide.entity";
import CreateSlideDto from "./dto/CreateSlide.dto";
import UpdateSlideDto from "./dto/UpdateSlide.dto";

@Injectable()
export class SlideService {
    @InjectRepository(SlideEntity)
    private slideRepository: Repository<SlideEntity>

    async getLists(paging: any, filters: any)
    {
        let condition: any = {};
        if (filters.status) condition.s_status = filters.status;

        return await this.slideRepository.findAndCount({
            where: condition,
            take: paging.page_size,
            skip: (paging.page - 1) * paging.page_size
        });
    }

    async store(createSlideDto: CreateSlideDto)
    {
        const newData = await this.slideRepository.create(createSlideDto);
        return await this.slideRepository.save(newData);
    }

    async show(id: number)
    {
        return await this.slideRepository.findOne({
            where: {
                id: id
            }
        });
    }

    async update(id: number, updateSlideDto: UpdateSlideDto)
    {
        await this.slideRepository.update(id, updateSlideDto);
        return await this.show(id);
    }
}
