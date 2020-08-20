import React, { FC, memo, CSSProperties, useState, useEffect } from 'react';
import { withRouter } from 'umi';
import { RouteComponentProps } from 'react-router';
import { Menu } from 'antd';
import classNames from 'classnames';

import './style.less';
import { iconConfig } from '@/utils/icon';

import { Route } from '@/typing';

const { SubMenu } = Menu;

interface SidebarType extends RouteComponentProps {
  collapsed: boolean;
  sidebarStyle: CSSProperties;
  route: Route;
}

type MenuKeyType = string[];

const Sidebar: FC<SidebarType> = props => {
  const { route } = props;

  const [currentKey, setCurrentKey] = useState<MenuKeyType>(['/dashboard']);
  const [openKeys, setOpenkeys] = useState<MenuKeyType>([]);

  useEffect(() => {
    setCurrentKey([props.location.pathname]);
  }, [props.location.pathname]);

  useEffect(() => {
    const key = getOpenKeys(route, props.location.pathname);
    setOpenkeys([key]);
  }, []);

  // console.log(props);

  const getOpenKeys = (route: Route, path: string) => {
    const routes = route.routes;
    let key = '';
    if (routes) {
      for (const item of routes) {
        if (item.path === path) {
          key = route.path || '';
          break;
        }
        if (item.routes && !key) {
          key = getOpenKeys(item, path);
        }
      }
    }
    return key;
  };

  const routeList =
    route.routes &&
    route.routes.map((route: Route) => {
      return Object.assign(route, {
        iconComponent: route.icon && iconConfig[route.icon],
      });
    });

  const handleClick = (e: any) => {
    setCurrentKey(e.key);
    const key = getOpenKeys(route, e.key);
    setOpenkeys([key]);
  };

  const onOpenChange = (openkeys: any) => {
    setOpenkeys(openkeys);
  };

  return (
    <aside
      className={classNames('s1-sidebar', 's1-sidebar-fixed')}
      style={props.sidebarStyle}
    >
      <Menu
        mode="inline"
        theme="dark"
        selectedKeys={currentKey}
        openKeys={openKeys}
        inlineCollapsed={props.collapsed}
        onClick={handleClick}
        onOpenChange={onOpenChange}
      >
        {routeList &&
          routeList.map(menu => {
            if (menu.redirect) {
              return null;
            }
            if (menu.routes) {
              return (
                <SubMenu
                  key={menu.path}
                  icon={<menu.iconComponent />}
                  title={menu.name}
                >
                  {menu.routes.map(menuChild => (
                    <Menu.Item
                      key={menuChild.path}
                      icon={
                        menuChild.iconComponent && <menuChild.iconComponent />
                      }
                      onClick={() =>
                        menuChild.path && props.history.push(menuChild.path)
                      }
                    >
                      {menuChild.name}
                    </Menu.Item>
                  ))}
                </SubMenu>
              );
            } else {
              return (
                <Menu.Item
                  key={menu.path}
                  icon={<menu.iconComponent />}
                  onClick={() => menu.path && props.history.push(menu.path)}
                >
                  {menu.name}
                </Menu.Item>
              );
            }
          })}
      </Menu>
    </aside>
  );
};

export default withRouter(Sidebar);
