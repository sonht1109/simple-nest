import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseToIntPipe implements PipeTransform {
  transform(value: any): number {
    const transformValue = +value;
    if (isNaN(transformValue)) {
      throw new BadRequestException('Param must be a number');
    }
    return transformValue;
  }
}
