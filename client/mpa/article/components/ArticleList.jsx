import './../index.scss';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';

const myTheme = createMuiTheme({
    palette: {
        primary: { main: '#fbd208' }
    }
});

const styles = theme => ({
    articleList: {
        position: 'absolute',
        top: '4rem',
        width: '100%',
        padding: 0
    },
    itemText: {
        fontSize: '1.2rem'
    }
});

class ArticleList extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        const {
            articleList, classes,
            handleToggle, checked,
            totalPage, perPageAmount,
            requestDeleteArticle
        } = this.props;

        return (
            <List className={classes.articleList}>
                {
                    articleList.map((item, index) =>
                        <div key={index}>
                            <ListItem dense
                                button
                                onClick={handleToggle(index)}>

                                <Checkbox tabIndex={index}
                                    checked={checked.indexOf(index) !== -1}
                                    disableRipple />

                                <ListItemText className={classes.itemText}
                                    primary={item.title} />

                                <ListItemSecondaryAction>
                                    <a href={`/mpa/article-detail?_id=${item['_id']}`}>
                                        <IconButton aria-label="detail">
                                            <i className="goto-btn icon-13751-detail" />
                                        </IconButton>
                                    </a>

                                    <IconButton aria-label="delete"
                                        onClick={requestDeleteArticle(item['_id'])}>
                                        <i className="goto-btn icon-13751-delete" />
                                    </IconButton>
                                </ListItemSecondaryAction>

                            </ListItem>
                            <Divider />
                        </div>
                    )
                }

                {
                    (totalPage > perPageAmount) &&
                        <ul className="page-ctrler">
                            <li className="ctrler-item">
                                <Button variant="outlined"
                                    disabled>上一页</Button>
                            </li>
                            <li className="ctrler-item">
                                <span>第 <b>1</b> 页</span>
                            </li>
                            <li className="ctrler-item">
                                <TextField id="tgt-page"
                                    placeholder="总共1000页"
                                    margin="dense"
                                    variant="outlined" />
                                <i className="goto-btn icon-13751-goto" />
                            </li>
                            <li className="ctrler-item">
                                <Button variant="outlined">下一页</Button>
                            </li>
                        </ul>
                }
            </List>
        )
    }
}

export default withStyles(styles)(ArticleList);
