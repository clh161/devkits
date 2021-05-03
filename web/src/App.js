// @flow

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import type { Node } from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import CodeIcon from '@material-ui/icons/Code';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

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
  children: Node,
};

export default function Dashboard(props: Props): Node {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar>
          <Typography component="h1" variant="h6" color="inherit" noWrap>
            Devkits
          </Typography>
        </Toolbar>
        <Divider />
        <List component="nav" aria-label="main mailbox folders">
          <ListItem component="a" href={'/html-encoding'}>
            <ListItemIcon>
              <CodeIcon />
            </ListItemIcon>
            <ListItemText primary="HTML Encoder" />
          </ListItem>
          <ListItem component="a" href={'/unix-timestamp-converter'}>
            <ListItemIcon>
              <AccessTimeIcon />
            </ListItemIcon>
            <ListItemText primary="Unix Timestamp Converter" />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          {props.children}
        </Container>
      </main>
    </div>
  );
}
