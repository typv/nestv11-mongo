import { APP_DEFAULTS } from 'src/common/constants';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';
import { CustomPaginateOptions } from 'src/common/types/app.type';
import { SelectQueryBuilder } from 'typeorm';

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

  protected responseSuccess(): SuccessResponseDto {
    return { success: true };
  }
}
