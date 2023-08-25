import {
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  ValidationPipe,
  UnprocessableEntityException,
} from '@nestjs/common';
import { log } from 'console';

@Injectable()
export class ValidateInputPipe extends ValidationPipe {
  public async transform(value, metadata: ArgumentMetadata) {
    try {
      return await super.transform(value, metadata);
    } catch (e) {        
        let message = e.response.message;        
        if (e instanceof BadRequestException) {
            throw new UnprocessableEntityException(message);
        }
    }
  }

  private handleError(errors) {
    console.log(errors);
    
    return errors.map((error) => error.constraints);
  }
}
