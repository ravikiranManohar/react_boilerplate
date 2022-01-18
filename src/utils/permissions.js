import { NetworkCall } from "../networkcall";

const Permissions = {
  get_user_permission_data: async () => {
    let project_level_permissions = await NetworkCall(
      "https://arangodbservice.dev.ainqaplatform.in/api/read_documents",
      "POST",
      JSON.stringify({
        db_name: sessionStorage.dbname,
        entity: "IDM_Person",
        filter: `IDM_Person.email=='${sessionStorage.email}'`,
        return_fields: "IDM_Person",
      }),
      {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    );
    return project_level_permissions?.data?.result?.[0] ?? false;
  },
  get_user_role_permision: async () => {
    let screen_level_permissions = await NetworkCall(
      "https://arangodbservice.dev.ainqaplatform.in/api/read_documents",
      "POST",
      JSON.stringify({
        db_name: sessionStorage.dbname,
        entity: "IDM_PermissionRoleMapping",
        filter: `IDM_PermissionRoleMapping.role_id=='${sessionStorage.role_id}'`,
        return_fields: "IDM_PermissionRoleMapping",
      }),
      {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    );
    return screen_level_permissions?.data?.result?.[0] ?? [];
  },
  casbianRouteImplementation : async (allPermissionList) => {
    let pageJson = allPermissionList?.repo_mapping;
    sessionStorage.setItem('permissionData',btoa(JSON.stringify(pageJson)))
    let Arr = [];
    let Pages =
      Object.keys(pageJson)?.filter(
        (v) => v && (pageJson[v]?.permission.read || pageJson[v]?.permission.write)
      );
    let data = Pages?.filter((v) => {
      Arr.push(pageJson[v]?.routes ?? "");
    });
    const permission = {
      "admin": {
        access: Arr,
      },
    };
    sessionStorage.setItem("role_name", "admin");
    sessionStorage.setItem("role_data", btoa(JSON.stringify(permission)));
  }
};

export default Permissions;
