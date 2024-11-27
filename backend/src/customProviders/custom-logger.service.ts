import { LoggerService } from "./logger.service";

export class CustomLoggerService extends LoggerService{
    log(message: string) {
        console.log(`custom log message:${message}`)
    }
}