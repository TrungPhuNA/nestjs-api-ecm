import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import MenuEntity from "../../entities/menu.entity";
import CreateMenuDto from "./dto/CreateMenu.dto";
import UpdateMenuDto from "./dto/UpdateMenu.dto";
import { toSlug } from "../../common/helpers/Function";

@Injectable()
export class MenuService {
    @InjectRepository(MenuEntity)
    private menuRepository: Repository<MenuEntity>

    async getListsMenus(paging: any, filters: any)
    {
        let condition: any = {};
        if (filters.hot) condition.mn_hot = filters.hot;
        if (filters.status) condition.mn_status = filters.status;

        return await this.menuRepository.findAndCount({
            where: condition,
            take: paging.page_size,
            skip: (paging.page - 1) * paging.page_size
        });
    }

    async store(menuDto: CreateMenuDto)
    {
        menuDto.mn_slug = toSlug(menuDto.mn_name);
        const newData = await this.menuRepository.create(menuDto);
        return await this.menuRepository.save(newData);
    }

    async show(id: number)
    {
        return await this.menuRepository.findOne({
            where: {
                id: id
            }
        });
    }

    async update(id: number, menuDto: UpdateMenuDto)
    {
        menuDto.mn_slug = toSlug(menuDto.mn_name);
        await this.menuRepository.update(id, menuDto);
        return await this.show(id);
    }
}
