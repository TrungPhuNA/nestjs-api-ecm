import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { ArticleModule } from './article/article.module';
import { MenuModule } from './menu/menu.module';
import { TransactionModule } from './transaction/transaction.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { SlideModule } from './slide/slide.module';

@Module({
  imports: [ProductModule, CategoryModule, ArticleModule, MenuModule, TransactionModule, OrderModule, UserModule, SlideModule]
})
export class BackendModule {}
