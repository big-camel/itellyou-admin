import React from 'react';
import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, useIntl, useSelector } from 'umi';
import logo from '../assets/logo.svg';
import logoFull from '../assets/logo-full.svg';
import styles from './UserLayout.less';

const UserLayout = (props) => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { formatMessage } = useIntl();
  const { breadcrumb } = getMenuData(routes);

  const setings = useSelector((state) => state.settings);
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    title: setings.title,
    menu: setings.menu,
    ...props,
  });
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
              </Link>
            </div>
          </div>
          {children}
        </div>
        <DefaultFooter
          links={[
            {
              key: 'itellyou',
              title: <img height={24} src={logoFull} alt="ITELLYOU" />,
              href: 'https://www.aomao.com',
              blankTarget: true,
            },
          ]}
          copyright="2020 四川西维尔科技有限公司"
        />
      </div>
    </HelmetProvider>
  );
};

export default UserLayout;
