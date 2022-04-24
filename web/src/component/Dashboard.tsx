import {
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import React, { ReactElement } from 'react';
import { CONFIGS } from './Router';
const drawerWidth = 320;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  fixedHeight: {
    height: 240,
  },
}));
type Props = {
  children: ReactElement;
};
export default function Dashboard(props: Props): ReactElement {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        classes={{
          paper: classes.drawerPaper,
        }}
        variant='permanent'
      >
        <Toolbar>
          <Grid
            alignItems={'center'}
            container
            justifyContent={'space-between'}
          >
            <Grid item xs={6}>
              <Typography color='inherit' component='h1' noWrap variant='h6'>
                <Link href='/' underline={'none'}>
                  Devkits
                </Link>
              </Typography>
            </Grid>
            <Grid alignItems={'flex-end'} container item xs={1}>
              <IconButton
                aria-label='Github Repository'
                href={'https://github.com/clh161/devkits'}
                target={'_blank'}
              >
                <GitHubIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
        <Divider />
        <List aria-label='main mailbox folders' component='nav'>
          {CONFIGS.filter((config) => !config.isHidden).map((config) => {
            switch (config.isHidden) {
              case true:
                return null;
              case false:
                return (
                  <ListItem component='a' href={config.path} key={config.path}>
                    <ListItemIcon>{config.icon}</ListItemIcon>
                    <ListItemText primary={config.title} />
                  </ListItem>
                );
            }
          })}
        </List>
      </Drawer>
      <main className={classes.content}>
        <Container className={classes.container} maxWidth='lg'>
          {props.children}
        </Container>
      </main>
    </div>
  );
}
