import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SearchTab from './Search/SearchTab';
import Button from "@mui/material/Button";
import ResultsTab from './Search/ResultsTab';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};



export default function TwoTabs({handleButtonClick, results}) {
  const [value, setValue] = React.useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' , backgroundColor:"#6E6E6E"}}>
        <Tabs value={value} onChange={handleChange} textColor="secondary" >
          <Tab label="Búsqueda" />
          <Tab label="Resultados" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <SearchTab handleButtonClick={handleButtonClick}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ResultsTab results={results}/>
      </TabPanel>
    </Box>
  );
}