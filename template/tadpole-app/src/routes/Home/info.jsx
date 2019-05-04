import './style.scss';
import React from 'react';
import PropTypes from 'prop-types';

// UI
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

// 附加样式
const styles = theme => ({});

class HomeInfo extends React.Component {
    constructor(props) {
        super(props);
        super(props);
        this.state = {
            theme: 'Day',
        };
    }

    componentWillMount() {
        const { theme } = this.props['Home'];
        this.setState({
            theme,
        });
    }

    handleChange = event => {
        this.props.setTheme(event.target.value);
        this.setState({
            theme: event.target.value,
        });
    }

    render() {
        const { theme } = this.props['Home'];
        const { classes } = this.props;

        return (
            <div className={`home-container ${theme.toLowerCase()}`}>
                <footer className="content">
                    <FormControl
                        component="fieldset"
                        className="fieldset"
                    >
                        <FormLabel
                            component="legend"
                            className="legend"
                        >Select theme</FormLabel>
                        <RadioGroup
                            aria-label="Select theme"
                            name="theme"
                            className="theme-group"
                            value={theme}
                            onChange={this.handleChange}
                        >
                            <FormControlLabel
                                value="Night"
                                className="label"
                                control={<Radio />}
                                label="Night"
                            />
                            <FormControlLabel
                                value="Day"
                                className="label"
                                control={<Radio />}
                                label="Day"
                            />
                        </RadioGroup>
                    </FormControl>
                </footer>
            </div>
        )
    }
}

export default withStyles(styles)(HomeInfo);
