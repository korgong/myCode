import React, { PropTypes } from 'react'
import { Link } from 'react-router'

export default class View extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content:'detail'
        }
        this.change = this.change.bind(this)
    }

    change() {
        this.setState({content:'详情'})
    }

    componentDidMount() {
        console.log('componentDidMount____view.js')
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps____view.js',nextProps)
    }

    render() {
        return (
            <div onClick={this.change}>{this.state.content}</div>
        )
    }
}
