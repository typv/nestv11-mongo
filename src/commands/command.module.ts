import { Module } from '@nestjs/common';
import { CreateAdminCommand } from './create-admin.command';
import { CreateAdminQuestions } from './questions/create-admin.questions';

@Module({
  imports: [
    // TypeOrmModule.forRoot(dataSourceOptions), TypeOrmModule.forFeature([User])
  ],
  providers: [CreateAdminCommand, CreateAdminQuestions],
  exports: [],
})
export class CommandModule {}
