import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface TreeNodeInterface {
  key: number;
  name: string;
  age?: number;
  level?: number;
  expand?: boolean;
  address?: string;
  children?: TreeNodeInterface[];
  parent?: TreeNodeInterface;
}

@Component({
  selector: 'app-menu-manage',
  templateUrl: './menu-manage.component.html',
  styleUrls: ['./menu-manage.component.less']
})
export class MenuManageComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  // ===新增对话框相关
  isShowAdd = false;
  isAddOkLoading = false;
  addMenuForm: FormGroup;
  radioValue = 'A';
  radioType: boolean;

  mapOfExpandedData: { [key: string]: TreeNodeInterface[] } = {};

  listOfMapData: TreeNodeInterface[] = [
    {
      key: 1,
      name: 'John Brown sr.',
      age: 60,
      address: 'New York No. 1 Lake Park',
      children: [
        {
          key: 11,
          name: 'John Brown',
          age: 42,
          address: 'New York No. 2 Lake Park'
        },
        {
          key: 12,
          name: 'John Brown jr.',
          age: 30,
          address: 'New York No. 3 Lake Park',
          children: [
            {
              key: 121,
              name: 'Jimmy Brown',
              age: 16,
              address: 'New York No. 3 Lake Park'
            }
          ]
        },
        {
          key: 13,
          name: 'Jim Green sr.',
          age: 72,
          address: 'London No. 1 Lake Park',
          children: [
            {
              key: 131,
              name: 'Jim Green',
              age: 42,
              address: 'London No. 2 Lake Park',
              children: [
                {
                  key: 1311,
                  name: 'Jim Green jr.',
                  age: 25,
                  address: 'London No. 3 Lake Park'
                },
                {
                  key: 1312,
                  name: 'Jimmy Green sr.',
                  age: 18,
                  address: 'London No. 4 Lake Park'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      key: 2,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];

  /*=======新增菜单对话的菜单类型选择=======*/
  expandKeys = ['100', '1001'];
  value  = '一级菜单';
  nodes = [
    {
      title: 'parent 1',
      key: '100',
      children: [
        {
          title: 'parent 1-0',
          key: '1001',
          children: [
            { title: 'leaf 1-0-0', key: '10010', isLeaf: true },
            { title: 'leaf 1-0-1', key: '10011', isLeaf: true }
          ]
        },
        {
          title: 'parent 1-1',
          key: '1002',
          children: [{ title: 'leaf 1-1-0', key: '10020', isLeaf: true }]
        }
      ]
    }
  ];
  onChange($event: string): void {
    console.log($event);
  }

  ngOnInit() {
    this.listOfMapData.forEach(item => {
      this.mapOfExpandedData[item.key] = this.convertTreeToList(item);
    });

    // 新增对话框
    this.addMenuForm = this.fb.group({
      menuName: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      phoneNumberPrefix: ['+86'],
      phoneNumber: [null, [Validators.required]],
      desc: [null, [Validators.required]],
    });
    setTimeout(() => {
      this.value = '1001';
    }, 1000);
  }

  /**
   * 显示新增对话框
   */
  showModal(): void {
    this.isShowAdd = true;
  }

  /**
   * 新增对话框确定提交
   */
  handleOk(): void {
    this.isAddOkLoading = true;
    setTimeout(() => {
      this.isShowAdd = false;
      this.isAddOkLoading = false;
    }, 3000);
  }

  /**
   * 取消新增对话框
   */
  handleCancel(): void {
    this.isShowAdd = false;
    this.resetAddDialog();
  }

  selectAddMenuType(b: boolean) {
    if (this.radioValue === 'A') {
      this.radioType = false;
    } else {
      this.radioType = true;
    }
  }

  resetAddDialog() {
    this.addMenuForm.reset();
    this.radioValue = 'A';
  }

  collapse(array: TreeNodeInterface[], data: TreeNodeInterface, $event: boolean): void {
    if ($event === false) {
      if (data.children) {
        data.children.forEach(d => {
          const target = array.find(a => a.key === d.key)!;
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  convertTreeToList(root: TreeNodeInterface): TreeNodeInterface[] {
    const stack: TreeNodeInterface[] = [];
    const array: TreeNodeInterface[] = [];
    const hashMap = {};
    stack.push({ ...root, level: 0, expand: false });

    while (stack.length !== 0) {
      const node = stack.pop()!;
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({ ...node.children[i], level: node.level! + 1, expand: false, parent: node });
        }
      }
    }

    return array;
  }

  visitNode(node: TreeNodeInterface, hashMap: { [key: string]: boolean }, array: TreeNodeInterface[]): void {
    if (!hashMap[node.key]) {
      hashMap[node.key] = true;
      array.push(node);
    }
  }

}
