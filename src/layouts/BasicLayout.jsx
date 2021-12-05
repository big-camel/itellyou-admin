/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import React from 'react';
import { Link, useIntl, useSelector, useAccess } from 'umi';
import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
import logo from '@/assets/logo.svg';
import logoFull from '@/assets/logo-full.svg';
import RightContent from '@/components/GlobalHeader/RightContent';
import BlankLayout from './BlankLayout';

const defaultFooterDom = (
  <DefaultFooter
    copyright="2020 四川西维尔科技有限公司"
    links={[
      {
        key: 'itellyou',
        title: <img height={24} src={logoFull} alt="四川西维尔科技有限公司" />,
        href: 'https://www.aomao.com',
        blankTarget: true,
      },
    ]}
  />
);

export default ({ children, ...props }) => {
  const { formatMessage } = useIntl();

  const settings = useSelector((state) => state.settings);

  const access = useAccess();

  const menuDataRender = (menuList) =>
    menuList.map((item) => {
      const localItem = { ...item, children: item.children ? menuDataRender(item.children) : [] };
      let hasAccess = false;
      if (Array.isArray(item.access)) {
        for (let i = 0; i < item.access.length; i += 1) {
          if (access[item.access[i]]) {
            hasAccess = true;
            break;
          }
        }
      } else if (item.access === undefined || access[item.access] === true) {
        hasAccess = true;
      }

      if (hasAccess) return localItem;
      return undefined;
    });

  return (
    <BlankLayout>
      <ProLayout
        logo={logo}
        formatMessage={formatMessage}
        menuHeaderRender={(logoDom, titleDom) => (
          <Link to="/">
            {logoDom}
            {titleDom}
          </Link>
        )}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
            return defaultDom;
          }

          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        breadcrumbRender={(routers = []) => [
          {
            path: '/',
            breadcrumbName: formatMessage({
              id: 'menu.home',
            }),
          },
          ...routers,
        ]}
        itemRender={(route, params, routes, paths) => {
          const first = routes.indexOf(route) === 0;
          return first ? (
            <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          );
        }}
        footerRender={() => defaultFooterDom}
        menuDataRender={menuDataRender}
        rightContentRender={() => <RightContent />}
        {...props}
        {...settings}
      >
        {children}
      </ProLayout>
    </BlankLayout>
  );
};
