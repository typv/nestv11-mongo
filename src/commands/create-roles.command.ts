import chalk from 'chalk';
import { Command, CommandRunner, Option } from 'nest-commander';
import { commandConstants } from './command.constant';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/models';
import { Model } from 'mongoose';
import { Role, RoleDocument } from 'src/models/role.model';
import { masterDateRoles } from 'src/master-data';

@Command({
  name: commandConstants.createRoles,
  description: 'Create all system roles',
  arguments: '[]',
})
export class CreateRolesCommand extends CommandRunner {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
  ) {
    super();
  }

  async run(): Promise<void> {
    const existingRoles = await this.roleModel.find({}, { code: 1, _id: 0 });
    const existingCodes = new Set(existingRoles.map(r => r.code));
    const rolesToInsert = masterDateRoles.filter(
      role => !existingCodes.has(role.code)
    );
    if (rolesToInsert.length === 0) {
      console.log(chalk.blue('All required roles already exist. Skipping.'));
      return;
    }

    try {
      await this.roleModel.insertMany(rolesToInsert, { ordered: false });

      console.log(chalk.green('Create roles successfully.'));
    } catch (err) {
      console.log(chalk.red('CreateRolesCommand Error: '), err);
    }
  }

  @Option({
    flags: '-s, --shell <shell>',
  })
  parseShell(val: string) {
    return val;
  }
}
