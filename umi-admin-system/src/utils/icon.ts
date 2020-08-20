import {
  DashboardOutlined,
  FormOutlined,
  WarningOutlined,
  SmileOutlined,
  TeamOutlined,
  FireOutlined,
  MessageOutlined,
  StarOutlined,
  BarChartOutlined,
  UserOutlined,
} from '@ant-design/icons';

export type IconKey =
  | 'dashboard'
  | 'smile'
  | 'editor'
  | 'error'
  | 'team'
  | 'fire'
  | 'message'
  | 'star'
  | 'chart'
  | 'user';

export const iconConfig = {
  dashboard: DashboardOutlined,
  smile: SmileOutlined,
  editor: FormOutlined,
  error: WarningOutlined,
  team: TeamOutlined,
  fire: FireOutlined,
  message: MessageOutlined,
  star: StarOutlined,
  chart: BarChartOutlined,
  user: UserOutlined,
};
