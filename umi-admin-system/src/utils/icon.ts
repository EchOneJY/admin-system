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
  | 'chart';

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
};
