import { SelectQueryBuilder } from 'typeorm';
import { PaginationMeta, PaginationParams } from './dtos/pagination.dto';

declare module 'typeorm' {
  interface SelectQueryBuilder<Entity> {
    paginate(
      this: SelectQueryBuilder<Entity>,
      params: PaginationParams,
    ): Promise<[Entity[], PaginationMeta]>;
  }
}

SelectQueryBuilder.prototype.paginate = async function <Entity>(
  this: SelectQueryBuilder<Entity>,
  params: PaginationParams,
): Promise<[Entity[], PaginationMeta]> {
  const [data, total] = await this.skip(params.skip)
    .take(params.take)
    .getManyAndCount();

  return [data, new PaginationMeta({ params, total })];
};
