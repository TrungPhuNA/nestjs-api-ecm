import { Inject, Injectable, Logger } from "@nestjs/common";
import { Repository } from "typeorm";
import TransactionEntity from "../../entities/transaction.entity";
import { ProductService } from "../../frontend/product/product.service";
import { OrderService } from "../../frontend/order/order.service";
import { ServiceCore } from "../../curl/serviceCore";

@Injectable()
export class TransactionService {

    private transactionRepository: Repository<TransactionEntity>

    private logger = new Logger('TransactionService');

    constructor(
        private productService: ProductService,
        private orderService: OrderService,
        @Inject(ServiceCore) private readonly serviceCore: ServiceCore,
    ) {
    }

    async getListsTransaction(paging: any, filters: any)
    {
        let condition: any = {};

        if (filters.status)
            condition.t_status = filters.status;

        if (filters.user_id)
            condition.t_user_id = filters.user_id;

        let order: any = { id: "DESC"};

        console.log('------------- filters: ', filters);
        return await this.transactionRepository.findAndCount({
            where: condition,
            order: order,
            relations: {
                orders : {
                    products: true
                }
            },
            take: paging.page_size,
            skip: (paging.page - 1) * paging.page_size
        });
    }
}
