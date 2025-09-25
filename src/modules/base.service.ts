import { APP_DEFAULTS } from 'src/common/constants';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import { CustomPaginateOptions } from 'src/common/types/app.type';
import { SelectQueryBuilder } from 'typeorm';
import { Aggregate, Query } from 'mongoose';
import { PaginationOptions } from 'stream-chat';
import { PaginationMetadataResponseDto, PaginationQueryDto, PaginationResponseDto } from 'src/common/dto';

interface FacetResult<T> {
  data: T[];
  pagination: [{ total: number }];
}

export class BaseService {
  async customPaginate<T>(
    queryBuilder: SelectQueryBuilder<T>,
    page: number = APP_DEFAULTS.PAGINATION.PAGE_DEFAULT,
    pageSize: number = APP_DEFAULTS.PAGINATION.LIMIT_DEFAULT,
    options: CustomPaginateOptions = { raw: false },
  ) {
    page = +page;
    pageSize = +pageSize;
    const start = (page - 1) * pageSize;
    const totalItemsQueryBuilder = queryBuilder.clone();

    let items: any[];
    let totalItems: number;

    if (options.raw) {
      if (start > 0) queryBuilder.offset(start);
      if (pageSize > 0) queryBuilder.limit(pageSize);
    } else {
      if (start > 0) queryBuilder.skip(start);
      if (pageSize > 0) queryBuilder.take(pageSize);
    }

    if (options.raw) {
      [items, totalItems] = await Promise.all([
        queryBuilder.getRawMany(),
        (await totalItemsQueryBuilder.getRawMany()).length,
      ]);
    } else {
      [items, totalItems] = await queryBuilder.getManyAndCount();
    }

    const totalPages = pageSize > 0 ? Math.ceil(totalItems / pageSize) : 1;
    return {
      data: items,
      pagination: {
        total: totalItems,
        pageSize,
        totalPages,
        page,
      },
    };
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


  protected responseSuccess(): SuccessResponseDto {
    return { success: true };
  }
}
