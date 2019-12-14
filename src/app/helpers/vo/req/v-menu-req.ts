export interface VMenuReq {
  title: string;
  link: string;
  icon: string;
  sort: number;
  isShow: boolean;
  perms: string;
  type: number;
  id?: string;
  clientId?: string;
  parentId?: string;
}
