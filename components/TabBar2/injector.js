import React from 'react';
import { RouterContext } from '@virtuous/react-conductor/Router';

export default Component => () => (
  <RouterContext>
    {({ pattern }) => (
      <Component routePattern={pattern} />
    )}
  </RouterContext>
);
