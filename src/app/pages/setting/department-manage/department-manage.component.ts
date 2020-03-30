import {Component, OnInit} from '@angular/core';
import {VDeptResp} from '../../../helpers/vo/resp/v-dept-resp';
import {VMenuResp} from '../../../helpers/vo/resp/v-menu-resp';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {VDeptReq} from '../../../helpers/vo/req/v-dept-req';
import {DepartmentService} from './department.service';
import {UIHelper} from '../../../helpers/ui-helper';
import {UiTableHelper} from '../../../helpers/ui-table-helper';
import {Utils} from '../../../helpers/utils';
import {JwtKvEnum} from '../../../helpers/enum/jwt-kv-enum';

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
              private uiHelper: UIHelper, public uiTableHelper: UiTableHelper,
              private utils: Utils) { }

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
    this.departmentService.getAll(this.utils.getJwtTokenClaim(JwtKvEnum.EnterpriseId))
      .ok(data => {
        this.listData = data;
        this.cutEmptyChildrenToNull(this.listData);
        this.uiHelper.setSelectTreeLeaf(this.listData);
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
    this.departmentService.getAll(this.utils.getJwtTokenClaim(JwtKvEnum.EnterpriseId))
      .ok(data => {
        this.selectDeptList = data;
        // this.cutEmptyChildrenToNull(this.selectDeptList);
        this.uiHelper.setSelectTreeLeaf(this.selectDeptList);
        console.log(this.selectDeptList);
      })
      .fail(error => {
        console.log(error.msg);
      })
      .final(b => {
      });
  }

  /**
   * 显示编辑修改对话框。
   * @param id 部门id。
   */
  showEditModal(id: string): void {
    this.addOrEdit = 2;
    this.isShowAddOrEditModal = true;
    this.departmentService.getById(id)
      .ok(data => {
        this.deptInfo = data;
        this.addOrEditForm.patchValue({
          name: this.deptInfo.name,
          parentDept: null,
          sort: this.deptInfo.sort
        });

        this.departmentService.getAll(this.utils.getJwtTokenClaim(JwtKvEnum.EnterpriseId))
          .ok(data1 => {
            this.selectedDeptKey = this.deptInfo.parentKey;
            this.selectedDeptId = this.deptInfo.parentId;
            this.selectDeptList = data1;
          });
      })
      .fail(error => {
        this.uiHelper.msgTipError('获取详情失败');
      })
      .final(b => {});
  }

  /**
   * 删除部门。
   * @param id 部门id
   * @param deptName 部门名称
   */
  del(id: string, deptName: string): void {
    this.uiHelper.modalDel(`确定要删除部门[${deptName}]吗？`).ok(() => {
      this.departmentService.del(id)
        .ok(data => {
          if (data === true) {
            this.uiHelper.msgTipSuccess(`已成功删除部门${deptName}`);
            setTimeout(() => {
              this.getDeptList();
            }, 200);
          } else {
            this.uiHelper.msgTipError(`删除部门${deptName}失败`);
          }
        })
        .fail(error => {
          this.uiHelper.msgTipError(error.msg);
        });
    });
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
      parentId: this.selectedDeptId,
      sort: this.addOrEditForm.value.sort
    };
    this.departmentService.saveOrUpdate(par)
      .ok(data => {
        this.uiHelper.msgTipSuccess(this.addOrEdit === 1 ? '新增成功' : '修改成功');
        this.isShowAddOrEditModal = false;
        this.reInit();
        setTimeout(() => {
          this.getDeptList();
        }, 200);
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
    if ($event) {
      this.getSelectTreeIdByKey(this.selectDeptList);
    } else {
      this.selectedDeptId = null;
    }
  }

  /**
   * TreeSelect，选择树，选定后根据key，获取节点对象中包含的id。通用
   * @param dataList 整棵树数据列表。
   */
  getSelectTreeIdByKey(dataList: VDeptResp[]): void {
    if (dataList && dataList.length > 0) {
      dataList.forEach((item) => {
        console.log(this.selectedDeptKey);
        if (item.key === this.selectedDeptKey) {
          this.selectedDeptId = item.id;
        } else {
          if (item.children && item.children.length > 0) {
            this.getSelectTreeIdByKey(item.children);
          }
        }
      });
    }
  }

}
