import chalk from 'chalk';
import { Command, CommandRunner, Option } from 'nest-commander';
import { commandConstants } from '../command.constant';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Permission, PermissionDocument } from 'src/data-access/models';
import { masterDatePermissions } from 'src/master-data/permissions';

@Command({
  name: commandConstants.seedPermissions,
  description: 'Create all permissions',
  arguments: '[]',
})
export class PermissionSeederCommand extends CommandRunner {
  constructor(
    @InjectModel(Permission.name) private PermissionModel: Model<PermissionDocument>,
  ) {
    super();
  }

  async run(): Promise<void> {
    const existingPermissions = await this.PermissionModel.find({}, { code: 1, _id: 0 });
    const existingCodes = new Set(existingPermissions.map(r => r.code));
    const permissionToInsert = masterDatePermissions.filter(
      role => !existingCodes.has(role.code)
    );
    if (!permissionToInsert.length) {
      console.log(chalk.blue('All required permissions already exist. Skipping.'));
      return;
    }

    try {
      await this.PermissionModel.insertMany(permissionToInsert, { ordered: false });

      console.log(chalk.green('Create permissions successfully.'));
    } catch (err) {
      console.log(chalk.red('PermissionSeederCommand Error: '), err);
    }
  }

  @Option({
    flags: '-s, --shell <shell>',
  })
  parseShell(val: string) {
    return val;
  }
}
