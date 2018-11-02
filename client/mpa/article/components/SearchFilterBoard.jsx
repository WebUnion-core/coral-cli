import './../index.scss';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const myTheme = createMuiTheme({
    palette: {
        primary: { main: '#fbd208' }
    }
});

const styles = theme => ({});

class SearchFilterBoard extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            articleTitle: '',
            publistDate: (new Date()).toISOString().substr(0, 10)
        };
    }

    // 修改搜索框的输入内容
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    }

    render () {
        const { articleTitle, publistDate } = this.state;
        const { displayStatus } = this.props;
        return (
            <ul className={displayStatus ? 'search-filter-board' : 'hide'}>
                <li className="filter-board-item">
                    <TextField id="article-name"
                        label="标题"
                        value={articleTitle}
                        onChange={this.handleChange('articleTitle')}
                        InputLabelProps={{
                            shrink: true
                        }}
                        fullWidth
                        margin="dense" />
                </li>
                <li className="filter-board-item">
                    <TextField id="publist-date"
                        label="发布时间"
                        type="date"
                        value={publistDate}
                        onChange={this.handleChange('publistDate')}
                        InputLabelProps={{
                            shrink: true
                        }}
                        fullWidth
                        margin="dense" />
                </li>
            </ul>
        )
    }
}

export default withStyles(styles)(SearchFilterBoard);
