import './style.scss';
import React from 'react';
import { Link } from 'react-router-dom';

export const TabItem = ({
    data,
    width,
    itemIndex, defaultIndex, activeIndex,
    clickListener
}) => {
    const { link, icon, name } = data;
    const ifActive = link
        ? (typeof defaultIndex === 'number' && itemIndex === defaultIndex)
        : (itemIndex === activeIndex);

    if (link) {
        return (
            <Link to={ link } style={{ width }} >
                <li onClick={ (e) => clickListener(e, data, itemIndex) }
                    className={ `item ${ifActive ? 'active' : ''}` } >
                    <p className="row">
                        <i className={
                            `icon ${icon}${ifActive ? '-active' : ''}`
                        } />
                    </p>
                    <p className="row">
                        <span className="text">{ name }</span>
                    </p>
                </li>
            </Link>
        )
    }

    return (
        <li onClick={ (e) => clickListener(e, data, itemIndex) }
            className={ `item ${ifActive ? 'active' : ''}` }
            style={{ width }}>
            <p className="row">
                <i className={ `icon ${icon}${ifActive ? '-active' : ''}` } />
            </p>
            <p className="row">
                <span className="text">{ name }</span>
            </p>
        </li>
    )
}

/**
 * 说明: 底部tab列表
 * props选项:
 * 1. list -> tab列表
 * 2. defaultIndex -> 默认选项
 */
export default class TabsFooter extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            activeIndex: 0
        }
    }

    clickTab = (event, item, index) => {
        const { clickHandle = () => {} } = this.props;
        this.setState({
            activeIndex: index
        });
        clickHandle(event, item);
    }

    render () {
        const { list, defaultIndex } = this.props;
        const { activeIndex } = this.state;
        const itemWidth = `${ 100 / list.length }%`;

        return (
            <ul className="tabs-footer-list">
                {
                    list.map((item, index) => {
                        const tabItemProps = {
                            data: item,
                            width: itemWidth,
                            itemIndex: index,
                            defaultIndex,
                            activeIndex,
                            clickListener: this.clickTab
                        };
                        return <TabItem key={ index } { ...tabItemProps } />
                    })
                }
            </ul>
        )
    }
}
