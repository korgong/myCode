import React, { PropTypes } from 'react'
import { Link } from 'react-router'

export default class WeiboList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this._view = this.view.bind(this)
    }

    view() {
        this.props.push({pathname:"/view"})
    }

    componentDidMount() {
        console.log('componentDidMount____weiboList.js')
        this.props.getWeiboList()
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps____weiboList.js')
    }

    render() {
        let {weiboList} = this.props
        let weiboContent = weiboList.map((item)=>{
            let id = `wbID${item.id}`
            return <div className="wb-item">
                <div className="wb-item-hd">
                    <div className="wb-item-avatar">
                        <img/>
                    </div>
                    <div className="wb-item-user-info">
                        <div className="wb-item-user-name">{item.username}</div>
                        <div className="wb-item-user-time">
                            <span>{item.time}</span>
                            <span>{item.source}</span>
                        </div>
                    </div>
                    <a className="wb-item-more" id={id} href="javascript:;"></a>
                </div>
                <div className="wb-item-details">
                    <p className="wb-default-txt" onClick={this._view}>
                        <Link to="/view">{item.content}</Link>
                    </p>
                </div>
                <div className="wb-item-footer">
                    <a className="wb-btn-like" href="javascript:;">
                        <i></i>
                        <span>{item.count}</span>
                    </a>
                </div>
            </div>
        })

        return (
            <div>
                {weiboContent}
            </div>
        )
    }
}
