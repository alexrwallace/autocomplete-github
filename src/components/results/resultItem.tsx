import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PriorityHighRoundedIcon from '@material-ui/icons/PriorityHighRounded';
import CloseRounded from '@material-ui/icons/CloseRounded';
import Help from '@material-ui/icons/Help';
import { Chip, Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    inline: {
      display: 'inline',
    },
    red:{
        color: 'white',
        backgroundColor: 'red'
    },
    green:{
        color: 'white',
        backgroundColor: 'green'
    },
    grey:{
        color: 'white',
        backgroundColor: 'grey'
    }
  }));

export interface ResultItemProps {
    result?: any,
  }

export const ResultItem: React.FunctionComponent<ResultItemProps> = ({
    result = null,
}) => {
    const classes = useStyles();
    const OPEN = 'open'
    const CLOSED = 'closed'

    if(!result) return null;

    const renderStatus = () => {
        switch (result.state) {
            case CLOSED:
                return <Avatar variant="square" className={classes.red}>   
                            <CloseRounded />
                        </Avatar>
                
            case OPEN:
                return <Avatar variant="square" className={classes.green}>   
                        <PriorityHighRoundedIcon />
                    </Avatar>
            default:
                return <Avatar variant="square" className={classes.grey}>   
                        <Help />
                    </Avatar>
          }
    }

    const renderLabels = () => {
        return result.labels.map((label) => {
        const style = {
                borderColor: `#${label.color}`,
                borderWidth: '2px'
            }
            return <Chip size="small" label={label.name} style={style} variant="outlined" />
        })
    }

    return <ListItem alignItems="flex-start">
            <ListItemAvatar>
                {renderStatus()}
            </ListItemAvatar>
            <ListItemText
                primary={result.title}
                secondary={
                <React.Fragment>
                    {result.body}
                    <Divider />
                    {renderLabels()}
                </React.Fragment>
                }
                
            />
            </ListItem>
}