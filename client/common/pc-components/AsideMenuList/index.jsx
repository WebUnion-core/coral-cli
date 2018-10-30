import './style.scss';
import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const myTheme = createMuiTheme({
    palette: {
        primary: { main: '#fbd208' },
        secondary: { main: '#11cb5f' }
    }
});

const styles = theme => ({
    active: {
        backgroundColor: '#eac925'
    }
});

class AsideMenuList extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        const { classes, menuList, activeIndex } = this.props;

        return (
            <MuiThemeProvider theme={myTheme}>
                <ul className="aside-menu">
                    <figure className="head-figure">
                        <img className="logo"
                            src={'https://raw.githubusercontent.com/WebUnion-core/tadpole/v1.8.0/asset/img/logo1.png'} />
                    </figure>
                    <List className="menu-list" component="nav">
                        {
                            menuList.map((item, index) =>
                                <li className={`menu-item ${parseInt(activeIndex, 10) === index ? classes.active : ''}`}
                                    key={index}>
                                    <ListItem button
                                        href={item.link}
                                        component="a">
                                        <ListItemText primary={item.text} />
                                    </ListItem>
                                    <Divider />
                                </li>
                            )
                        }
                    </List>
                    <figure className="head-figure bottom">
                        <p className="text">©WebUnion</p>
                        <p className="text">Date: 2018-10-29 17:52</p>
                        <p className="text">Github: <a href="https://github.com/WebUnion-core/tadpole">https://github.com/WebUnion-core/tadpole</a></p>
                    </figure>
                </ul>
            </MuiThemeProvider>
        )
    }
}

export default withStyles(styles)(AsideMenuList);
