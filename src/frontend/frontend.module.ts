import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { TransactionModule } from './transaction/transaction.module';
import { OrderModule } from './order/order.module';
import { ArticleModule } from './article/article.module';
import { MenuModule } from './menu/menu.module';
import { VoteModule } from './vote/vote.module';
import { CommentModule } from './comment/comment.module';
import { LogApiModule } from './log-api/log-api.module';

@Module({
  imports: [ProductModule, CategoryModule, UserModule, TransactionModule, OrderModule, ArticleModule, MenuModule, VoteModule, CommentModule, LogApiModule]
})
export class FrontendModule {}
