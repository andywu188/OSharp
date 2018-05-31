import { Component, OnInit, AfterViewInit, Injector, } from '@angular/core';
import { GridComponentBase } from '@shared/osharp/services/kendoui.service';

@Component({
  selector: 'admin-identity-user-role',
  template: `<div id="grid-box"></div>`
})
export class UserRoleComponent extends GridComponentBase implements OnInit, AfterViewInit {

  constructor(injector: Injector) {
    super(injector);
    this.moduleName = "userrole";
  }

  ngOnInit() {
    super.InitBase();
  }

  ngAfterViewInit() {
    super.ViewInitBase();
  }

  protected GetModel() {
    return {
      id: "Id",
      fields: {
        UserId: { type: "number", editable: false },
        RoleId: { type: "number", editable: false },
        UserName: { type: "string", validation: { required: true } },
        RoleName: { type: "string", validation: { required: true } },
        IsLocked: { type: "boolean" },
        CreatedTime: { type: "date", editable: false }
      }
    };
  }
  protected GetGridColumns(): kendo.ui.GridColumn[] {
    return [
      {
        field: "UserId",
        title: "用户",
        width: 150,
        template: "#=UserId#.#=UserName#"
      },
      {
        field: "RoleId",
        title: "角色",
        width: 150,
        template: "#=RoleId#.#=RoleName#"
      },
      {
        field: "IsLocked",
        title: "锁定",
        width: 95,
        template: d => this.kendoui.Boolean(d.IsLocked),
        editor: (container, options) => this.kendoui.BooleanEditor(container, options)
      },
      {
        field: "CreatedTime",
        title: "注册时间",
        width: 115,
        format: "{0:yy-MM-dd HH:mm}"
      }
    ];
  }

  protected GetGridOptions(dataSource: kendo.data.DataSource): kendo.ui.GridOptions {
    let options = super.GetGridOptions(dataSource);
    options.toolbar.splice(0, 1);
    return options;
  }

  protected GetDataSourceOptions(): kendo.data.DataSourceOptions {
    let options = super.GetDataSourceOptions();
    delete options.transport.destroy;
    return options;
  }

}