import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { AbstractHttpAdapter, HttpAdapterHost } from "@nestjs/core";

@Catch(HttpException)
export class FilerExecptionHttp implements ExceptionFilter {

  private httpAdapter: AbstractHttpAdapter
  constructor(private adpterHost: HttpAdapterHost) {
    this.httpAdapter = this.adpterHost.httpAdapter
  }

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const { status, body } = exception instanceof HttpException
      ? {
        status: exception.getStatus(),
        body: exception.getResponse()
      }
      : {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        body: {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          timestamp: new Date().toISOString(),
          messege: exception.message,
          path: request.path
        }
      }

    this.httpAdapter.reply(response, body, status)
  }

}