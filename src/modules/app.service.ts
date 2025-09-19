import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { BaseService } from './base.service';

@Injectable()
export class AppService extends BaseService {
  constructor(private readonly userService: UserService) {
    super();
  }

  getHello(): string {
    return 'Hello World!';
  }
}
