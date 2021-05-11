// @flow strict

import type { Node } from 'react';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import {
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import CodeIcon from '@material-ui/icons/Code';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GitHubIcon from '@material-ui/icons/GitHub';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import HttpIcon from '@material-ui/icons/Http';
import TextFieldsIcon from '@material-ui/icons/TextFields';

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
        classes={{
          paper: classes.drawerPaper,
        }}
        variant="permanent"
      >
        <Toolbar>
          <Grid alignItems={'center'} container justify={'space-between'}>
            <Grid item xs={6}>
              <Typography color="inherit" component="h1" noWrap variant="h6">
                <Link href="/" underline={'none'}>
                  Devkits
                </Link>
              </Typography>
            </Grid>
            <Grid alignItems={'flex-end'} container item xs={1}>
              <IconButton
                aria-label="Github Repository"
                href={'https://github.com/clh161/devkits'}
                target={'_blank'}
              >
                <GitHubIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
        <Divider />
        <List aria-label="main mailbox folders" component="nav">
          <ListItem component="a" href="/html-encoding">
            <ListItemIcon>
              <CodeIcon />
            </ListItemIcon>
            <ListItemText primary="HTML Encoder" />
          </ListItem>
          <ListItem component="a" href="/url-encoding">
            <ListItemIcon>
              <HttpIcon />
            </ListItemIcon>
            <ListItemText primary="URL Encoder" />
          </ListItem>
          <ListItem component="a" href="/unix-timestamp-converter">
            <ListItemIcon>
              <AccessTimeIcon />
            </ListItemIcon>
            <ListItemText primary="Unix Timestamp Converter" />
          </ListItem>
          <ListItem component="a" href="/case-type-converter">
            <ListItemIcon>
              <TextFieldsIcon />
            </ListItemIcon>
            <ListItemText primary="Case Type Converter" />
          </ListItem>
          <ListItem component="a" href={'/csv-editor'}>
            <ListItemIcon>
              <ViewComfyIcon />
            </ListItemIcon>
            <ListItemText primary="CSV Editor" />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <Container className={classes.container} maxWidth="lg">
          {props.children}
        </Container>
      </main>
    </div>
  );
}
