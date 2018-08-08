import './style.scss';
import React from 'react';
import { Link } from 'react-router-dom';

/*
 * props选项
 * 1. list => tab列表
 */
export default class TabsFooter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0
        }
    }

    clickTab(event, item, index) {
        const { clickHandle = () => {} } = this.props;
        this.setState({
            activeIndex: index
        });
        clickHandle(event, item);
    }

    render() {
        const { list, defaultIndex } = this.props,
            { activeIndex } = this.state;

        return (
            <ul className="tabs-footer-list flex-center">
                {
                    list.map((item, index) => {
                        const ifActive = item.link
                            ? (typeof defaultIndex === 'number' && index === defaultIndex)
                            : (index === activeIndex);

                        return (
                            item.link
                                ?
                                (<Link key={ index }
                                    to={ item.link }
                                    style={{ width: `${ 100 / list.length }%` }} >
                                    <li onClick={ (e) => this.clickTab(e, item, index) }
                                        className={ `item ${ ifActive ? 'active' : '' }` } >
                                        <p className="row"><i className={ `icon ${ item.icon }${ ifActive ? '-active' : '' }` }></i></p>
                                        <p className="row"><span className="text">{ item.name }</span></p>
                                    </li>
                                </Link>)
                                :
                                (<li key={ index }
                                    onClick={ (e) => this.clickTab(e, item, index) }
                                    className={ `item ${ ifActive ? 'active' : '' }` }
                                    style={{ width: `${ 100 / list.length }%` }}>
                                    <p className="row"><i className={ `icon ${ item.icon }${ ifActive ? '-active' : '' }` }></i></p>
                                    <p className="row"><span className="text">{ item.name }</span></p>
                                </li>)
                        )
                    })
                }
            </ul>
        )
    }
}
