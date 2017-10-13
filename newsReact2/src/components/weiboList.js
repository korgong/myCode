import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import GiftDialog from './dialog/dialog.js'

export default class WeiboList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            DialogShow:false
        }
        this._view = this.view.bind(this)
        this._handleConfirm = this.handleConfirm.bind(this)
        this._handleCancel = this.handleCancel.bind(this)
    }

    handleConfirm() {
        this.setState({
            DialogShow: false,
        })
    }

    handleCancel() {
        this.setState({
            DialogShow: false
        })
    }

    view() {
        this.setState({
            DialogShow: true
        })
        // this.props.push("/view/1")
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
                       {item.content}
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
                <GiftDialog
                    DialogShow={this.state.DialogShow}
                    title={'对话框标题'}
                    ref='dialog'
                    msg={'对话框内容'}
                    type='confirm'
                    width='400'
                    height='200'
                    handleConfirm={this._handleConfirm}
                    handleCancel={this._handleCancel}/>
            </div>
        )
    }
}
