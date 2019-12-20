export interface VMenuResp {
  id: string;
  link: string;
  icon: string;
  perms: string;
  sort: number;
  show: boolean;
  title: string;
  type: number;
  key: string;
  isLeaf?: boolean;
  parentId?: string;
  parent?: VMenuResp;
  children?: VMenuResp[];
  level?: number;
  expand?: boolean;
}
