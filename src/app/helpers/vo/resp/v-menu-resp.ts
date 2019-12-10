export interface VMenuResp {
  children?: VMenuResp[];
  link: string;
  icon: string;
  perms: string;
  id: number;
  sort: number;
  title: string;
  type: number;
  key: number;
  parentId: string;
  parent?: VMenuResp;
  level?: number;
  expand?: boolean;
}
