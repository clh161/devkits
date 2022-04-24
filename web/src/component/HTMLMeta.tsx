import React, { ReactElement } from 'react';
import { Helmet } from 'react-helmet';
import { RouterConfig } from './RouterConfig';
type Props = {
  pageConfig: RouterConfig;
};
export default function HTMLMeta({ pageConfig }: Props): ReactElement {
  const { title, description, keywords } = pageConfig;
  return (
    <Helmet>
      <title>{title}</title>
      <meta content={description} name='description' />
      <meta content={keywords.join(', ')} name='keywords' />
    </Helmet>
  );
}
