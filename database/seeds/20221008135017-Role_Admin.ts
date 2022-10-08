import { CreationAttributes, QueryInterface } from "sequelize";
import User from "../../models/user";
import Role from "../../models/role";
import UserRole from "../../models/user_role";
import { user } from "../../types/models/user";
import UserType = user.User;
import RoleType = user.Role;
import UsrRoleType = user.UserRole;
import { hashSync } from "bcryptjs";

export = {
  up: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      const AdminObject: CreationAttributes<UserType>[] = [
        {
          id: "9f385ea6-3414-4b48-994b-cb5db0808521",
          username: "DDV2412",
          name: "Dian Dwi Vaputra",
          email: "dhyanputra24@gmail.com",
          password: hashSync("DDV241297#", 12),
        },
      ];
      const RoleObject: CreationAttributes<RoleType>[] = [
        {
          id: "5f7087f2-ee2c-4fd8-844e-3c7578d6bd1b",
          role_name: "admin",
        },
        {
          role_name: "manager",
        },
        {
          role_name: "editor",
        },
        {
          role_name: "reviewer",
        },
        {
          role_name: "reader",
        },
      ];

      const UserRoleObject: CreationAttributes<UsrRoleType>[] = [
        {
          user_id: "9f385ea6-3414-4b48-994b-cb5db0808521",
          role_id: "5f7087f2-ee2c-4fd8-844e-3c7578d6bd1b",
        },
      ];

      await User.bulkCreate<UserType>(AdminObject, {
        validate: true,
        individualHooks: true,
        transaction,
      });

      await Role.bulkCreate<RoleType>(RoleObject, {
        validate: true,
        individualHooks: true,
        transaction,
      });

      await UserRole.bulkCreate<UsrRoleType>(UserRoleObject, {
        validate: true,
        individualHooks: true,
        transaction,
      });
    });
  },

  down: async (queryInterface: QueryInterface): Promise<void> => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkDelete(User.tableName, {}, {});
      await queryInterface.bulkDelete(Role.tableName, {}, {});
      await queryInterface.bulkDelete(UserRole.tableName, {}, {});
    });
  },
};
