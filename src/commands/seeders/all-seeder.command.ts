import chalk from 'chalk';
import { Command, CommandRunner, Option } from 'nest-commander';
import { commandConstants } from '../command.constant';
import { RoleSeederCommand } from 'src/commands/seeders/role-seeder.command';
import { PermissionSeederCommand } from 'src/commands/seeders/permission-seeder.command';

@Command({
  name: commandConstants.seedAll,
  description: 'Call all seeders',
  arguments: '[]',
})
export class AllSeederCommand extends CommandRunner {
  constructor(
    private readonly roleSeeder: RoleSeederCommand,
    private readonly PermissionSeeder: PermissionSeederCommand,
  ) {
    super();
  }

  async run(): Promise<void> {
    console.log(chalk.bold.magenta('========================================'));
    console.log(chalk.bold.magenta('         STARTING ALL SEEDERS           '));
    console.log(chalk.bold.magenta('========================================'));

    try {
      console.log(chalk.blue('\nRunning Role Seeder...'));
      await this.roleSeeder.run();

      console.log(chalk.blue('\nRunning Permission Seeder...'));
      await this.PermissionSeeder.run();

    } catch (error) {
      console.error(chalk.bold.red('\n❌ SEEDING FAILED! Stopping process.'));
      console.error(chalk.red(error.message));
      process.exit(1);
    }

    console.log(chalk.bold.green('\n✅ ALL SEEDERS COMPLETED SUCCESSFULLY!'));
  }

  @Option({
    flags: '-s, --shell <shell>',
  })
  parseShell(val: string) {
    return val;
  }
}
