/* eslint-disable */
import styles from './dialog.css'
import React, { PropTypes } from 'react'

export default class GiftDialog extends React.Component {
    constructor(props) {
        super(props)
        this._handleConfirm = this.handleConfirm.bind(this)
        this._handleCancel = this.handleCancel.bind(this)
        this._handleSure = this.handleSure.bind(this)
    }

    handleCancel() {
      this.props.handleCancel()
    }

    handleConfirm() {
        this.props.handleConfirm()
    }

    handleSure() {
        this.props.handleSure()
    }

    getDialog() {
        let header,footer,children
        header = this.props.title
        // 对话框中间的内容
        children =
            <div className={styles.content} style={{height:'115px'}}>
                <div className={styles.fontMiddle}>{this.props.msg}</div>
            </div>
        // 对话框底部按钮
        if(this.props.type == 'confirm') {
          footer =
            <div className={styles.footer}>
              <div className={styles.confirmBtn} onClick={this._handleConfirm}>确定</div>
              <div className={styles.cancelBtn} onClick={this._handleCancel}>取消</div>
            </div>
        }else if(this.props.type == 'sure') {
          footer =
            <div className={styles.footer}>
              <div className={styles.confirmBtn} onClick={this._handleSure}>确定</div>
            </div>
        }

        return(
            <div>
                <div className={styles.mask}/>
                <div className={styles.contentArea}>
                    <div className={styles.header}>
                      <span style={{float: 'left', 'paddingLeft': '14px'}}>{header}</span>
                      <i className={styles.closeBtn} onClick={this._handleCancel}></i>
                    </div>
                    <div>
                        {children}
                    </div>
                    {footer}
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.props.DialogShow && this.getDialog()}
            </div>
        )
    }
}

GiftDialog.propTypes = {
    DialogShow: PropTypes.bool,
    title: PropTypes.string,
    msg: PropTypes.string,
    type: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    handleConfirm: PropTypes.func,
    handleCancel: PropTypes.func,
    handleSure: PropTypes.func
}
