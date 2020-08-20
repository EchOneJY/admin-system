export interface UserType {
  id: number;
  name: string;
  nickName: string;
  phone: number;
  age: number;
  address: string;
  isMale: boolean;
  email: string;
  createTime: number;
  avatar: string;
}

export type PaginationType = {
  showSizeChanger: boolean;
  showQuickJumper: boolean;
  current: 1;
  total: 0;
  pageSize: 10;
};
