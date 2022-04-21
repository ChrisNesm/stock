import * as React from 'react';
import MuiGridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { makeStyles } from '@material-ui/core/styles';
import {  ImageListItemBar, ImageList, ImageListItem , ListSubheader, Chip, ListItemText } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import {
    linkToRecord,
    NumberField,
    useListContext,
    DatagridProps,
    Identifier,
    Button,
} from 'react-admin';
import { Link } from 'react-router-dom';
import { staticfilesURL } from '../constants/apiURL';

const useStyles = makeStyles(theme => ({
    gridList: {
        margin: 0,
    },
    tileBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.4) 70%,rgba(0,0,0,0) 100%)',
    },
    placeholder: {
        backgroundColor: theme.palette.grey[300],
        height: '100%',
    },
    price: {
        display: 'inline',
        fontSize: '1em',
    },
    link: {
        color: '#fff',
    },
}));

const getColsForWidth = (width) => {
    if (width === 'xs') return 2;
    if (width === 'sm') return 3;
    if (width === 'md') return 3;
    if (width === 'lg') return 5;
    return 6;
};

const times = (nbChildren, fn) =>
    Array.from({ length: nbChildren }, (_, key) => fn(key));

const LoadingGridList = (props) => {
    const { width, nbItems = 20 } = props;
    const classes = useStyles();
    return (
        <MuiGridList
            cellHeight={180}
            cols={getColsForWidth(width)}
            className={classes.gridList}
        >
            {' '}
            {times(nbItems, key => (
                <GridListTile key={key}>
                    <div className={classes.placeholder} />
                </GridListTile>
            ))}
        </MuiGridList>
    );
};

const LoadedGridList = (props) => {
    const { width } = props;
    const { ids, data, basePath, resource } = useListContext();
    const classes = useStyles();
    console.log(data)
    if (!ids || !data) return null;
    return (
        <MuiGridList
            // cellHeight={props}
            cols={getColsForWidth(width)-1}
            className={classes.gridList}
            spacing={20}
        >
            {ids.map((id, index) => (
                <GridListTile
                    component={Link}
                    key={index}
                    to={ props.to && props.to(data[id].id)}
                    
                >
                    {
                        (data && data[id].img) ?  <img 
                            src={`${staticfilesURL}/${data[id].img}`} 
                            style={{
                                height: '100%',
                            }} /> : <div style={{
                            height: '100%',
                            backgroundColor: 'gray',
                        }} /> 
                    }
                   
                    <GridListTileBar
                        className={classes.tileBar}
                        title={props.getTitle && props.getTitle(data[id])}
                        subtitle={props.getSubtitle && props.getSubtitle(data[id])}
                        actionIcon={props.getActionIcon && props.getActionIcon(data[id])}
                    />
    
                </GridListTile>
            ))}
        </MuiGridList>
   
    );
};


const GridList = (props) => {
    const { width } = props;
    const { loaded } = useListContext();
    return loaded ? (
        <LoadedGridList width={width} {...props} />
    ) : (
        <LoadingGridList width={width} />
    );
};

export default withWidth()(GridList);
