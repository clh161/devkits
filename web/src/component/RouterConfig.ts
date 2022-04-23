import { ReactElement } from 'react';
type BaseConfig = {
  path: string;
  component: ReactElement;
  title: string;
  description: string;
  keywords: Array<string>;
};

export type RouterConfig =
  | ({
      isHidden: true;
    } & BaseConfig)
  | ({
      isHidden: false;
      icon: ReactElement;
    } & BaseConfig);
