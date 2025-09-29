import chalk from 'chalk';
import { Command, CommandRunner, Option } from 'nest-commander';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Permission, PermissionDocument, Role, RoleDocument } from 'src/models';
import { rolePermissionsMapping } from 'src/master-data/role-permission-map';
import { commandConstants } from '../command.constant';
import { RoleCode } from 'src/common/enums';

@Command({
  name: commandConstants.seedRolePermissionMap,
  description: 'Maps permissions codes to existing roles in the database.',
  arguments: '[]',
})
export class RolePermissionMapSeederCommand extends CommandRunner {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    @InjectModel(Permission.name) private permissionModel: Model<PermissionDocument>,
  ) {
    super();
  }

  async run(): Promise<void> {
    console.log(chalk.yellow('Starting role-permission mapping...'));

    try {
      // Get all RoleCodes that need to be mapped from the master data
      const roleCodesToMap = Object.keys(rolePermissionsMapping) as RoleCode[];
      let updatedCount = 0;

      // Iterate over each Role Code in the mapping
      for (const roleCode of roleCodesToMap) {
        const permissionsForRole = rolePermissionsMapping[roleCode];

        // Perform the Mongoose update
        const result = await this.roleModel.updateOne(
          { code: roleCode },
          {
            // $set overwrites the old permissions array with the new one
            permissions: permissionsForRole
          },
          {
            upsert: false
          }
        );

        if (result.matchedCount === 0) {
          console.warn(chalk.yellow(`  ⚠️ Warning: Role '${roleCode}' not found. Skipping mapping.`));
        } else if (result.modifiedCount > 0) {
          updatedCount++;
          console.log(chalk.cyan(`  ✓ Role '${roleCode}' mapped with ${permissionsForRole.length} permissions.`));
        } else {
          // Role found, but the permissions array was identical (no modification needed)
          console.log(chalk.gray(`  - Role '${roleCode}' permissions already up to date. Skipping.`));
        }
      }

      console.log(chalk.green(`\n✅ Role-Permission mapping completed. Total ${updatedCount} roles updated.`));

    } catch (err) {
      console.error(chalk.red('RolePermissionMapSeederCommand Error: '), err);
      // Throw the error to signal a CLI failure
      throw err;
    }
  }

  @Option({
    flags: '-s, --shell <shell>',
  })
  parseShell(val: string) {
    return val;
  }
}