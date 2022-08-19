import Box from '@mui/material/Box';
import MuiTab from '@mui/material/Tab';
import MuiTabs from '@mui/material/Tabs';
import React from 'react';
import { useNavigate } from 'react-router-dom';


const TabPanel = (props) => {
  const { children, value, currentValue, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== currentValue}
      id={`tabpanel-${currentValue}`}
      aria-labelledby={`simple-tab-${currentValue}`}
      {...other}
    >
      {children}
    </div>
  );
}

export const Tabs = ({ labels, values, children, tab }) => {
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    navigate('../' + newValue);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <MuiTabs value={tab} onChange={handleChange}>
          {values.map((value, i) => <MuiTab label={labels[i]} value={value} key={value}/>)}
        </MuiTabs>
      </Box>
      {children.map((children, i) =>
        <TabPanel value={values[i]} currentValue={tab} key={values[i]}>
          {children}
        </TabPanel>
      )}
    </Box>
  );
}