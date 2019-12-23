/**
 * 部门响应对象。
 */
export interface VDeptResp {
  id?: string;
  title: string; // 部门名称
  name?: string; // 部门名称
  sort?: number;
  key: string;
  isLeaf?: boolean;
  parentId?: string;
  parentKey?: string;
  parentName?: string;
  parent?: VDeptResp;
  children?: VDeptResp[];
  level?: number;
  expand?: boolean;
}
