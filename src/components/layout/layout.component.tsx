import { FC, ReactNode } from 'react';
import classes from './layout.module.css';

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => (
  <main className={classes.main}>{children}</main>
);

export default Layout;
