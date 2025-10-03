import chalk from 'chalk';
import { Command, CommandRunner, InquirerService, Option } from 'nest-commander';
import { commandConstants, questionConstants } from './command.constant';
import { HashUtil } from '../common/utilities/hash.util';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/data-access/models';
import { Model } from 'mongoose';
import { Role, RoleDocument } from 'src/data-access/models/role.model';
import { RoleCode, UserType } from 'src/common/enums';

@Command({
  name: commandConstants.createAdmin,
  description: 'Create a system admin',
  arguments: '[email] [password]',
})
export class CreateAdminCommand extends CommandRunner {
  constructor(
    private readonly inquirer: InquirerService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
  ) {
    super();
  }

  async run(): Promise<void> {
    const answers = await this.inquirer.prompt<{
      email: string;
      password: string;
    }>(questionConstants.createAdmin, undefined);
    const email = answers.email.trim();
    const pass = answers.password.trim();

    const adminRole = await this.roleModel.findOne({ code: RoleCode.Admin });
    if (!adminRole) {
      console.log(chalk.green('CreateAdminCommand Error: Admin role not found.'));
      throw new Error();
    }

    const hasAccount = await this.userModel.findOne({ email: email });
    if (hasAccount) {
      console.log(chalk.red('CreateAdminCommand Error: Email already exist.'));
      return;
    }

    // Password hashing
    const passwordHash = await HashUtil.hashData(pass);
    try {
      const filterData = {
        email: email,
        password: passwordHash,
        isActive: true,
        emailVerified: true,
        role: adminRole._id,
        userType: UserType.Admin,
      };
      await this.userModel.create(filterData);
      console.log(chalk.green('Create admin successfully.'));
    } catch (err) {
      console.log(chalk.red('CreateAdminCommand Error: '), err);
    }
  }

  @Option({
    flags: '-s, --shell <shell>',
  })
  parseShell(val: string) {
    return val;
  }
}
