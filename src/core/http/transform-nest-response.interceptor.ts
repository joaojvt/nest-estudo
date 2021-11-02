import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { NestResponse } from './nest-reponse';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';

@Injectable()
export class TransformNestResponseIntercepetor implements NestInterceptor {

  private httpAdapter: AbstractHttpAdapter;

  constructor(adapterHost: HttpAdapterHost) {
    this.httpAdapter = adapterHost.httpAdapter;
  }

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    return next.handle()
      .pipe(
        map((controllerResponse: NestResponse) => {
          if (controllerResponse instanceof NestResponse) {
            const cxt = context.switchToHttp()
            const response = cxt.getResponse()
            console.log(controllerResponse)
            const { headers, status, body } = controllerResponse

            const headersNames = Object.getOwnPropertyNames(headers)

            headersNames.forEach(name => {
              const value = headers[name]
              this.httpAdapter.setHeader(response, name, value)
            })

            this.httpAdapter.status(response, status)
            return body
          }
          return controllerResponse
        })
      )
  }
}