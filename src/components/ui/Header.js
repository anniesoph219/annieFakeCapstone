import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles } from "@material-ui/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import logo from "../../_Logo.png";

//Toolbar lays content horizontally, instead of vertically
//AppBar has a default position of "fixed";

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

//The syntax below is slightly different from the documentation,
//because it gives us access to the styles

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "2em",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1.25em",
    },
  },
  logo: {
    height: "8em",
    [theme.breakpoints.down("sm")]: {
      height: "7em",
    },
    [theme.breakpoints.down("xs")]: {
      height: "5.5em",
    },
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  tabContainer: {
    marginLeft: "auto",
    color: "#fff100",
  },
  tab: {
    fontFamily: "Fascinate",
    fontSize: "1.5rem",
    fontWeight: 700,
    //minWidth: 10, //This squeezes tabs together with a bit of space between
    //marginLeft: "25px", //Want to maintain constant spacing
  },
  /*
  button: {
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "25px",
    //You can also specify fontFamily and fontSize, textTransform and height
  },
  */
  menu: {
    backgroundColor: theme.palette.common.pink,
    color: "#fff100",
    borderRadius: "0",
  },
  menuItem: {
    ...theme.typography.tab,
  },
  drawerIcon: {
    height: "50px",
    width: "50px",
  },
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent",
    },
    color: "#fff100",
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const theme = useTheme(); //media queries
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down("sm")); //media queries

  const [openDrawer, setOpenDrawer] = useState(false);
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const handleMenuClick = (e, i) => {
    setAnchorEl(null);
    setOpenMenu(false);
    setSelectedIndex(1);
  };

  const menuOptions = [
    { name: "Create Meal", link: "/createmeal" },
    { name: "Browse Meal Outings", link: "/browse" },
    { name: "Host Meal Outing", link: "/host" },
  ];

  useEffect(() => {
    if (window.location.pathname === "/" && value !== 0) {
      setValue(0);
    } else if (window.location.pathname === "/createmeal" && value !== 1) {
      setValue(1);
    } else if (window.location.pathname === "/login" && value !== 2) {
      setValue(2);
    } else if (window.location.pathname === "/signup" && value !== 3) {
      setValue(3);
    }
    switch (window.location.pathname) {
      case "/": {
        if (value !== 0) {
          setValue(0);
        }
        break;
      }
      case "/createmeal": {
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(0);
        }
        break;
      }
      case "/browse": {
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(1);
        }
        break;
      }
      case "/host": {
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(2);
        }
        break;
      }
      case "/login": {
        if (value !== 2) {
          setValue(2);
        }
        break;
      }
      case "/signup": {
        if (value !== 3) {
          setValue(3);
        }
        break;
      }
      default:
        break;
    }
  }, [value]);

  const tabs = (
    <React.Fragment>
      <Tabs
        value={value}
        onChange={handleChange}
        className={classes.tabContainer}
        indicatorColor="secondary"
      >
        <Tab className={classes.tab} component={Link} to="/" label="Home" />
        <Tab
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup={anchorEl ? "true" : undefined}
          onMouseOver={(event) => handleClick(event)}
          className={classes.tab}
          component={Link}
          to="/createmeal"
          label="Create Meal"
        />
        <Tab
          className={classes.tab}
          component={Link}
          to="/login"
          label="Login"
        />
        <Tab
          className={classes.tab}
          component={Link}
          to="/signup"
          label="SignUp"
        />
      </Tabs>
      {/* <Button
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              Holder
           </Button>*/}
      <Menu
        id="simple-menu"
        classes={{ paper: classes.menu }}
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        elevation={0}
      >
        {menuOptions.map((option, i) => (
          <MenuItem
            key={option}
            component={Link}
            to={option.link}
            classes={{ root: classes.menuItem }}
            onClick={(event) => {
              handleMenuClick(event, i);
              setValue(1);
            }}
            selected={i === selectedIndex && value === 1}
          >
            {option.name}
          </MenuItem>
        ))}

        {/*
              <MenuItem
                classes={{ root: classes.menuItem }}
                onClick={() => {
                  handleClose();
                  setValue(1);
                }}
                component={Link}
                to="/createmeal"
              >
                Create Meal
              </MenuItem>
              <MenuItem
                classes={{ root: classes.menuItem }}
                onClick={() => {
                  handleClose();
                  setValue(1);
                }}
                component={Link}
                to="/browse"
              >
                Browse Meal Outings
              </MenuItem>
              <MenuItem
                classes={{ root: classes.menuItem }}
                onClick={() => {
                  handleClose();
                  setValue(1);
                }}
                component={Link}
                to="/host"
              >
                Host Meal Outing
              </MenuItem> 
              */}
      </Menu>
    </React.Fragment>
  );

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOopen={() => setOpenDrawer(true)}
      >
        Example Drawer
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position="fixed" color="primary">
          <Toolbar disableGutters>
            <Button
              component={Link}
              to="/"
              className={classes.logoContainer}
              onClick={() => setValue(0)}
              disableRipple
            >
              <img src={logo} alt="app logo" className={classes.logo} />
            </Button>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
}
