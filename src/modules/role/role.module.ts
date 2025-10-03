import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleDAModule } from 'src/repositories';

@Module({
  imports: [
    RoleDAModule,
  ],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
