import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, Min } from 'class-validator';
import { EnumOrder } from '../enums/order.enum';

export class PaginationMeta {
  readonly page: number;
  readonly take: number;
  readonly total: number;
  readonly totalPage: number;
  readonly hasNextPage: boolean;
  readonly hasPrevPage: boolean;

  constructor({ params, total }: { params: PaginationParams; total: number }) {
    this.total = total;
    this.page = params.page;
    this.take = params.take;
    this.totalPage = Math.ceil(this.total / this.take);
    this.hasNextPage = this.page < this.totalPage;
    this.hasPrevPage = this.page > 1;
  }
}

export class PaginationParams {
  @ApiPropertyOptional({ minimum: 1, default: 10 })
  @Min(1)
  @IsInt()
  @Type(() => Number)
  readonly take: number = 10;

  @ApiPropertyOptional({ minimum: 1, default: 1 })
  @Min(1)
  @IsInt()
  @Type(() => Number)
  readonly page: number = 10;

  @ApiPropertyOptional({ default: EnumOrder.DESC, enum: EnumOrder })
  @IsEnum(EnumOrder)
  order: EnumOrder;

  get skip(): number {
    return (this.page - 1) * this.page;
  }
}

export abstract class Paginated<T> {
  data: T[];
  meta: PaginationMeta;
  constructor(data: T[], meta: PaginationMeta) {
    this.data = data;
    this.meta = meta;
  }
}
