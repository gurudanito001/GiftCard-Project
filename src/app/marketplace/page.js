"use client";

import * as React from 'react';
import PublicLayout from "@/components/publicLayout";
import EnhancedTable from "@/components/table";
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import styles from '../auth/auth.module.css';

const TableHeadArray = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'User',
  },
  {
    id: 'giftCard',
    numeric: false,
    disablePadding: false,
    label: 'GiftCard',
  },
  {
    id: 'value',
    numeric: true,
    disablePadding: false,
    label: 'Value in $',
  },
  {
    id: 'offerPrice',
    numeric: true,
    disablePadding: false,
    label: 'Offer Price in ₦',
  },
  {
    id: 'actions',
    numeric: false,
    disablePadding: false,
    label: 'Actions',
  },
];


const MarketPlace = () =>{
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return(
    <PublicLayout>
      <section className="container-fluid my-5">
        <div className="row">
          <div className="col col-md-10 offset-md-1 col-lg-8 offset-lg-2">
            <header>
              <h2 className={styles.pageTitle} style={{textAlign: "left"}}>MarketPlace</h2>
            </header>
            
            <Box sx={{ width: '100%', bgcolor: 'background.paper'}} className="my-4">
              <Tabs className='d-flex' value={value} onChange={handleChange} centered>
                <Tab label="Buy" />
                <Tab className='me-auto' label="Sell" />
              </Tabs>
            </Box>
            <EnhancedTable tableHeadObject={TableHeadArray} />
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

export default MarketPlace;