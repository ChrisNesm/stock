import React from 'react';
import { Link, ChipField, linkToRecord, useRecordContext } from 'react-admin';
import { Chip } from '@material-ui/core';

export default ({getText, label, link, wrapperOnly, linkStyle}) => {
  
    const record = useRecordContext()
    console.log("record", record)
    return (
      <>
      {label}
      <Link to={link} style={linkStyle}>
        {
          wrapperOnly ? getText(record) : (
            
            <Chip 
              label={
                  <span style={{display: 'flex', alignItems: 'center', alignContent: 'center', verticalAlign: 'center'}} >
                  {getText ? getText(record) : '...' }
                </span>
              }
              className="link-user-name"  />
          )
        }
    </Link>
      
      </>
    )
}