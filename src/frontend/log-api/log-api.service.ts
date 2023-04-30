import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import LogApi from "../../entities/log_api.entity";

@Injectable()
export class LogApiService {
    @InjectRepository(LogApi)
    private logApiRepository: Repository<LogApi>
    async store(formData: any)
    {
        console.log('---------- data: ', formData);
        formData.created_at = new Date();
        console.log('---------- data: ', formData);
        const newData = await this.logApiRepository.create(formData);
        return await this.logApiRepository.save(newData);
    }
}
