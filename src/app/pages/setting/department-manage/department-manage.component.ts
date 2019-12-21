import {Component, OnInit} from '@angular/core';
import {VDeptResp} from '../../../helpers/vo/resp/v-dept-resp';
import {VMenuResp} from '../../../helpers/vo/resp/v-menu-resp';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {VDeptReq} from '../../../helpers/vo/req/v-dept-req';
import {DepartmentService} from './department.service';
import {UIHelper} from '../../../helpers/ui-helper';
import {UiTableHelper} from '../../../helpers/ui-table-helper';

@Component({
  selector: 'app-department-manage',
  templateUrl: './department-manage.component.html',
  styleUrls: ['./department-manage.component.less']
})
export class DepartmentManageComponent implements OnInit {

  // 列表
  isTableLoading = false;
  isRefreshList = false;
  listData: VDeptResp[] = [];
  listOfExpandedData: { [key: string]: VMenuResp[] } = {};

  // 详情
  deptInfo: VDeptResp;

  // 新增编辑对话
  isShowAddOrEditModal = false;
  addOrEdit = 1; // 1-新增；2-修改
  addOrEditOkLoading = false;
  addOrEditForm: FormGroup;
  selectDeptList: VDeptResp[] = []; // 上级部门选择列表数据
  selectedDeptKey: string; // 选定的上级部门的key
  selectedDeptId: string; // 选定的上级部门的id

  constructor(private fb: FormBuilder, private departmentService: DepartmentService,
              private uiHelper: UIHelper, private uiTableHelper: UiTableHelper) { }

  ngOnInit() {
    this.addOrEditForm = this.fb.group({
      name: [null, [Validators.required]],
      parentDept: [null, null],
      sort: [null, [Validators.required]]
    });

    this.getDeptList();
  }

  /**
   * 获取部门列表数据。
   */
  getDeptList(): void {
    this.isTableLoading = true;
    this.isRefreshList = true;
    this.departmentService.getAll()
      .ok(data => {
        this.listData = data;
        this.cutEmptyChildrenToNull(this.listData);
        this.listData.forEach((val) => {
          this.listOfExpandedData[val.key] = this.uiTableHelper.convertTreeToList(val);
        });
      })
      .fail(error => {
        console.log(error.msg);
      })
      .final(b => {
        this.isTableLoading = false;
        this.isRefreshList = false;
      });
  }

  /**
   * 递归列表，把子节点为空的对象设置为 null。
   * @param listData 树形列表数据。
   */
  cutEmptyChildrenToNull(listData: VDeptResp[]) {
    listData.every((val, index, Array) => {
      if (!val.children || val.children.length === 0) {
        val.children = null;
      } else {
        this.cutEmptyChildrenToNull(val.children);
      }
      return true;
    });
  }

  /**
   * 重新初始化一些数据。
   */
  reInit(): void {
    this.addOrEditForm.reset();
    this.selectedDeptKey = null;
    this.selectDeptList = [];
  }

  /**
   * 显示新增对话框。
   */
  showAddModal(): void {
    this.addOrEdit = 1;
    this.isShowAddOrEditModal = true;
  }

  /**
   * 显示编辑修改对话框。
   * @param id 部门id。
   */
  showEditModal(id: string): void {
    this.addOrEdit = 2;
    this.isShowAddOrEditModal = true;
  }

  /**
   * 删除部门。
   * @param id 部门id
   * @param deptName 部门名称
   */
  showDelModal(id: string, deptName: string): void {
  }

  /**
   * 提交新增或者修改部门。
   */
  addOrEditHandleOk(): void {
    for (const i in this.addOrEditForm.controls) {
      this.addOrEditForm.controls[i].markAsDirty();
      this.addOrEditForm.controls[i].updateValueAndValidity();
    }

    this.addOrEditOkLoading = true;
    const par: VDeptReq = {
      id: this.addOrEdit === 1 ? null : this.deptInfo.id,
      name: this.addOrEditForm.value.name,
      parentId: this.uiHelper.getSelectTreeIdByKey(this.selectDeptList, this.selectedDeptKey),
      sort: this.addOrEditForm.value.sort
    };
    this.departmentService.saveOrUpdate(par)
      .ok(data => {
        this.uiHelper.msgTipSuccess(this.addOrEdit === 1 ? '新增成功' : '修改成功');
        this.isShowAddOrEditModal = false;
        this.reInit();
      })
      .fail(error => {
        this.uiHelper.msgTipError(error.msg);
      })
      .final(b => {
        this.addOrEditOkLoading = false;
      });
  }

  /**
   * 取消新增或者修改。
   */
  addOrEditHandleCancel(): void {
    this.isShowAddOrEditModal = false;
    this.reInit();
  }

  /**
   * 新增编辑，选择上级菜单回调。
   * @param $event 选择的key
   */
  selectParentDeptOnChange($event: string): void {
    console.log($event);
  }

  /**
   * 根据selected key获取id。
   * @param key 部门id
   */
  /*getSelectMenuIdByKey(deptList: VDeptResp[]): string {
    if (deptList && deptList.length > 0) {
      deptList.every((item) => {
        if (item.key === this.selectedDeptKey) {
          this.selectedDeptId = item.id;
          return false;
        } else {
          if (item.children && item.children.length > 0) {
            this.getSelectMenuIdByKey(item.children);
          }
        }
        return true;
      });
    }
    return this.selectedDeptId;
  }*/

}
