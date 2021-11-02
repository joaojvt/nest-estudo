import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { FilerExecptionHttp } from './common/filters/filter-exception-http.filter';
import { TransformNestResponseIntercepetor } from './core/http/transform-nest-response.interceptor';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    }, {
      provide: APP_FILTER,
      useClass: FilerExecptionHttp
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformNestResponseIntercepetor
    }
  ],
})
export class AppModule { }