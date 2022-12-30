import GitHubIcon from '@mui/icons-material/GitHub';
import {
  Container,
  CssBaseline,
  Divider,
  Drawer,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

import { RouterConfigs } from './RouterConfig';
const drawerWidth = 320;
const DrawerPaper = styled(Drawer)(({ theme }) => {
  return {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  };
});
export default function Dashboard(): ReactElement {
  return (
    <div style={{ display: 'flex' }}>
      <CssBaseline />
      <DrawerPaper variant='permanent'>
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
                disableRipple={true}
                href={'https://github.com/clh161/devkits'}
                target={'_blank'}
              >
                <GitHubIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
        <Divider />
        <List component='nav'>
          {RouterConfigs.filter((config) => !config.isHidden).map((config) => {
            switch (config.isHidden) {
              case true:
                return null;
              case false:
                return (
                  <ListItem disablePadding key={config.path}>
                    <ListItemButton href={config.path}>
                      <ListItemIcon>{config.icon}</ListItemIcon>
                      <ListItemText primary={config.title} />
                    </ListItemButton>
                  </ListItem>
                );
            }
          })}
        </List>
      </DrawerPaper>
      <main
        style={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Container
          maxWidth='lg'
          style={{
            paddingTop: 4,
            paddingBottom: 4,
          }}
        >
          <Outlet />
        </Container>
      </main>
    </div>
  );
}
