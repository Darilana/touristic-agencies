import type { AppProps /*, AppContext */ } from 'next/app';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import {
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from '@material-ui/core';
import ContactsIcon from '@material-ui/icons/Contacts';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  iconButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  content: {
    minHeight: 'calc(100vh - 120px)',
  },
  footer: {
    borderTop: '1px solid #E7E7E7',
    textAlign: 'center',
    padding: '20px',
    height: '100px',
    width: '100%',
    flexShrink: 0,
  },
}));

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.iconButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Travel admin
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </div>
        <div>
          <Component {...pageProps} />
        </div>
      </div>
      <div className={classes.footer}>
        <Box display="flex" flexDirection="column">
          <Box display="flex" alignItems="center" justifyContent="center">
            <ContactsIcon className={classes.iconButton} />
            <Typography variant="h6">Контакти:</Typography>
          </Box>
          <Typography>travel_admin@gmail.com</Typography>
          <Typography>+38(063)111-11-11</Typography>
          <Typography>Україна, м.Харків, проспект Науки 2</Typography>
        </Box>
      </div>
    </div>
  );
};

export default MyApp;
