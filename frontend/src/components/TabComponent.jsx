import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useMediaQuery } from '@material-ui/core';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box pt={3} minHeight="400px"  >
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonForce(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position='relative' style={{width: isSmall? '100vw' : '90vw'}} color="default" {...props.appbarProps} >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
          {...props.TabsProps}
        >
          {
             props.tabs && props.tabs.map((tab, index) => (
              <Tab key={index}  {...a11yProps(index)} {...tab} />
            ))
          }
        </Tabs>
      </AppBar>
      {
         props.panels && props.panels.map((panel, index)=> (
          <TabPanel key={index} value={value} index={index} style={{width: isSmall? '100vw' : '90vw'}}  >
            {panel}
          </TabPanel>
        ))
      }
    </div>
  );
}