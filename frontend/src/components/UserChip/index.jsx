import React from 'react';
import { Link, ChipField, linkToRecord, useRecordContext } from 'react-admin';
import { Chip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import './index.css'

export default ({getText, activeLink}) => {
  
    const record = useRecordContext()
    return (
      <>
      <Link to={activeLink && linkToRecord('/users', record.id, 'show')} >
        <Chip 
        label={
            <span style={{display: 'flex', alignItems: 'center', alignContent: 'center', verticalAlign: 'center'}} >
            {getText ? getText(record) : record.email }
          </span>
        }
        className="link-user-name"  />
    </Link>
      
      </>
    )
}