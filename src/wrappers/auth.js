import React from 'react';
import { useAccess, Redirect } from 'umi';
import { getAuthorityFromRouter } from '@/utils/utils';

export default ({ children, route, location: { pathname } }) => {
  const authorized = getAuthorityFromRouter(route.routes, pathname || '/') || {
    authority: undefined,
  };
  const access = useAccess();
  if (!access.adminLogin) {
    return <Redirect to="/login" />;
  }
  if (!authorized || authorized.unaccessible) {
    return <Redirect to="/403" />;
  }
  return children;
};
