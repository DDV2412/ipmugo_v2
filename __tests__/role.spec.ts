import RoleController from "../controller/role";

let mockRoleUC = {
  allRoles: jest.fn().mockReturnValue({
    id: "e5a33e97-6c7c-4d69-8fc5-800d4442a461",
    role_name: "admin",
  }),
  roleByName: jest.fn().mockReturnValue({
    id: "e5a33e97-6c7c-4d69-8fc5-800d4442a461",
    role_name: "admin",
  }),
  createRole: jest.fn().mockReturnValue({
    id: "e5a33e97-6c7c-4d69-8fc5-800d4442a461",
    role_name: "admin",
  }),
  updateRole: jest.fn().mockReturnValue({
    id: "e5a33e97-6c7c-4d69-8fc5-800d4442a461",
    role_name: "manager",
  }),

  deleteRole: jest.fn().mockReturnValue(null),
};

const mockRequest = (body: {}, query: {}, params: {}, use_case: {}) => {
  return {
    body: body,
    query: query,
    params: params,
    ...use_case,
  };
};

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);

  return res;
};

describe("Role controller testing", () => {
  test("Get roles", async () => {
    let req: any = mockRequest(
      {},
      {},
      {},
      {
        RoleUC: mockRoleUC,
      }
    );
    let res = mockResponse();
    await RoleController.allRoles(req, res, jest.fn());

    expect(mockRoleUC.allRoles).toBeCalledWith();
    expect(res.status).toBeCalledWith(200);
  });
  test("Get role by name", async () => {
    let req: any = mockRequest(
      {},
      {},
      {
        roleName: "admin",
      },
      {
        RoleUC: mockRoleUC,
      }
    );
    let res = mockResponse();
    await RoleController.roleByName(req, res, jest.fn());

    expect(mockRoleUC.roleByName).toBeCalledWith(req.params["roleName"]);
    expect(res.status).toBeCalledWith(200);
  });
  test("Create new role", async () => {
    let req: any = mockRequest(
      {
        role_name: "admin",
      },
      {},
      {},
      {
        RoleUC: mockRoleUC,
      }
    );
    let res = mockResponse();
    await RoleController.createRole(req, res, jest.fn());

    expect(mockRoleUC.createRole).toBeCalledWith(req.body);
    expect(res.status).toBeCalledWith(201);
  });
  test("Update role", async () => {
    let req: any = mockRequest(
      {
        role_name: "manager",
      },
      {},
      {
        roleName: "admin",
      },
      {
        RoleUC: mockRoleUC,
      }
    );
    let res = mockResponse();
    await RoleController.updateRole(req, res, jest.fn());

    let role = {
      id: "e5a33e97-6c7c-4d69-8fc5-800d4442a461",
      role_name: "admin",
    };

    expect(mockRoleUC.updateRole);
    expect(res.status).toBeCalledWith(200);
  });
  test("Delete role", async () => {
    let req: any = mockRequest(
      {},
      {},
      {
        roleName: "admin",
      },
      {
        RoleUC: mockRoleUC,
      }
    );
    let res = mockResponse();
    await RoleController.deleteRole(req, res, jest.fn());

    expect(mockRoleUC.deleteRole);
    expect(res.status).toBeCalledWith(200);
  });
});
