import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import GiftDialog from './dialog/dialog.js'

export default class WeiboList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            DialogShow:false,
            checkedItems:[]
        }
        this._view = this.view.bind(this)
        this._handleConfirm = this.handleConfirm.bind(this)
        this._handleCancel = this.handleCancel.bind(this)
        this._clickItem = this.clickItem.bind(this)
        this._clickClassMate = this.clickClassMate.bind(this)
    }


    // 先判断学生所在的班级是否已勾选
    // 如果已经勾选，就把这个班级取出来，修改这个班级的数据
    // 如果没有勾选，返回一个学生为空的班级，把这个班级加入勾选的班级数组里面
    // 如果班级学生为空，从勾选数组去掉这个班级，如果没有勾选，班级里面学生为空就不处理
    clickClassMate(classItem, classmate) {
        let isClassClicked
        let classItemId = classItem.id
        let checkedItems = this.state.checkedItems
        let result = checkedItems.filter(ite=>ite.id === classItemId)
        if(result.length ===1) {
            isClassClicked = true
        }
        if(isClassClicked) { // 之前已经勾选这个班级
            let classItemStem = result[0]
            let classInfo = classItemStem.classmates
            let arr = classInfo.filter(info=>{
                return info.id !== classmate.id
            })
            if(arr.length === classInfo.length) {
                arr.push(classmate)
            }
            // 重新组装班级信息
            // 已经勾选的班级学生为空
            if(arr.length === 0) {
                checkedItems = checkedItems.filter(checkedItem=>checkedItem.id !== classItemId)
            }else {
                classItem.classmates = arr
                checkedItems = checkedItems.filter(checkedItem=>checkedItem.id !== classItemId)
                checkedItems.push(classItem)
            }
        }else { // 之前没有勾选这个班级
            classItem.classmates = []
            classItem.classmates.push(classmate)
            checkedItems.push(classItem)
        }
        this.setState({checkedItems:checkedItems})
    }

    // 使用数组过滤相同项，过滤后数组长度相同，
    // 则过滤的为不同项，应该加入这个数组
    clickItem(item) {
        let arr = this.state.checkedItems
        let result = arr.filter(ite=>ite.id !== item.id)
        if(arr.length === result.length) {
            result.push(item)
        }
        this.setState({
            checkedItems:result
        })
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
        this.props.getGrade()
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps____weiboList.js')
    }

    weiboListDom (weiboList) {
        return weiboList.map(item=>{
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
    }

    isClassSelect(item) {
        let classSelect = false
        let itemId = item.id
        let result = this.state.checkedItems.filter(classItem=>classItem.id === itemId)
        if(result.length === 1) {
            classSelect = true
        }
        return classSelect
    }

    isClassmateSelect(classmate) {
        let classmateSelect = false
        let classmateId = classmate.id
        let checkedItems = this.state.checkedItems
        for(let classInfo of checkedItems) {
            classInfo = classInfo.classmates
            for(let classmateInfo of classInfo) {
                if(classmateInfo.id === classmateId) {
                    classmateSelect = true
                }
            }
            if(classmateSelect) {
                break
            }
        }
        return classmateSelect
    }

    // 这个grade是props上的数据，只读，不能修改
    // 如果修改了这里的item，那么重新渲染的时候，item就会有变化，而这里item是不能变的
    // 需要变化的只是this.state.checkedItems,来判断这个item是否被选中
    gradeDom(grade) {
        return grade.map(item => {
            let classSelect = this.isClassSelect(item)
            let copyItem = $.extend(true,{},item)
            return <div className="grade">
                <div className="classInfo">
                    {/*班级的信息*/}
                    <div>
                        <input type="checkbox" checked={classSelect}
                               onClick={()=>this._clickItem(item)}/>
                        <span>班级名称:{item.className}</span>
                    </div>
                    {item.classmates.map(classmate=>{
                        // 每一条学生的信息
                        let classmateSelect = this.isClassmateSelect(classmate)
                        return <div>
                            <input type="checkbox" checked={classmateSelect}
                                   onClick={()=>this._clickClassMate(copyItem, classmate)}/>
                            <span>学生名字:{classmate.personName}</span>
                        </div>
                    })}
                    <br/>
                    <br/>
                </div>
            </div>
        })
    }

    render() {
        let {weiboList, grade} = this.props
        // map函数中如果既没有使用箭头函数，也没有传入thisArg,那么this = undefined
        let weiboContent = this.weiboListDom(weiboList)
        let gradeContent = this.gradeDom(grade)
        console.log('this.state.checkedItems', this.state.checkedItems)

        return (
            <div>
                {weiboContent}
                <GiftDialog DialogShow={this.state.DialogShow}
                            title={'对话框标题'}
                            ref='dialog'
                            msg={'对话框内容'}
                            type='confirm'
                            width='800'
                            height='500'
                            handleConfirm={this._handleConfirm}
                            handleCancel={this._handleCancel}>
                    {gradeContent}
                </GiftDialog>
            </div>
        )
    }
}
