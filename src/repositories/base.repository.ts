import mongoose, { Aggregate, FilterQuery, Model, Query, UpdateQuery } from 'mongoose';
import { BaseDocument } from 'src/models/base.model';
import { QueryOptions } from 'winston';
import { APP_DEFAULTS } from 'src/common/constants';
import { PaginationResponseDto } from 'src/common/dto';

interface FacetResult<T> {
  data: T[];
  pagination: [{ total: number }];
}

export abstract class BaseRepository<T, D extends BaseDocument<T>> {
  protected model: Model<D>;
  protected constructor(model: Model<D>) {
    this.model = model;
  }

  async findById(id: string): Promise<D> {
    const _id = new mongoose.Types.ObjectId(id);
    return this.model.findById(_id).exec();
  }

  async findOne(filter: FilterQuery<D>, options?: QueryOptions): Promise<D | null> {
    return this.model.findOne(filter, null, options).exec();
  }

  async find(filter: FilterQuery<D>, options?: QueryOptions): Promise<D[]> {
    return this.model.find(filter, null, options).exec();
  }

  async updateById(id: string, update: UpdateQuery<D>): Promise<D | null> {
    return this.model
      .findByIdAndUpdate(id, update, { new: true })
      .exec();
  }

  public getModel(): Model<D> {
    return this.model;
  }

  async paginate<T>(
    queryBuilder: Query<T[], T>,
    page: number = APP_DEFAULTS.PAGINATION.PAGE_DEFAULT,
    pageSize: number = APP_DEFAULTS.PAGINATION.LIMIT_DEFAULT,
  ): Promise<PaginationResponseDto<T>> {

    const p = Math.max(1, Number(page));
    const ps = Math.max(1, Number(pageSize));
    const skip = (p - 1) * ps;

    const countQuery = queryBuilder.clone();

    const totalItems = await countQuery.countDocuments();

    const items = await queryBuilder
      .skip(skip)
      .limit(ps)
      .exec();

    const totalPages = Math.ceil(totalItems / ps);

    return {
      data: items,
      pagination: {
        total: totalItems,
        pageSize: ps,
        totalPages,
        page: p,
      },
    };
  }

  async aggregatePaginate<T>(
    aggregationBuilder: Aggregate<T[]>,
    page: number = APP_DEFAULTS.PAGINATION.PAGE_DEFAULT,
    pageSize: number = APP_DEFAULTS.PAGINATION.LIMIT_DEFAULT,
  ): Promise<PaginationResponseDto<T>> {
    const p = Math.max(1, Number(page));
    const ps = Math.max(1, Number(pageSize));
    const skip = (p - 1) * ps;

    const paginatedResults = await aggregationBuilder.facet({
      data: [
        { $skip: skip },
        { $limit: ps }
      ],
      pagination: [
        { $count: 'total' }
      ]
    }).exec() as FacetResult<T>[];

    const totalItems = paginatedResults[0].pagination.length > 0
      ? paginatedResults[0].pagination[0].total
      : 0;

    const items = paginatedResults[0].data;
    const totalPages = Math.ceil(totalItems / ps);

    return {
      data: items,
      pagination: {
        total: totalItems,
        pageSize: ps,
        totalPages,
        page: p,
      },
    };
  }
}