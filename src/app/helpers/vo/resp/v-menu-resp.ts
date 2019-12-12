export interface VMenuResp {
  id: string;
  link: string;
  icon: string;
  perms: string;
  sort: number;
  title: string;
  type: number;
  key: number;
  isLeaf?: boolean;
  parentId?: string;
  parent?: VMenuResp;
  children?: VMenuResp[];
  level?: number;
  expand?: boolean;
}
