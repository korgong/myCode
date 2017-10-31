### redux中间件函数签名
function() {} 或者 ()=>{} 这样的函数形式，为一层。中间件的函数签名有三层

```
({ dispatch, getState }) => next => action => {

     // redux-thunk中action的代码
     if (typeof action === 'function') {
       return action(dispatch, getState, extraArgument);
     }
     return next(action);

     //redux-logger中action的伪代码
     console.log('before dispatch','action',action,'state',getState())
     returnedValue = next(action)
     console.log('after dispatch','action',action,'state',getState())
     return returnedValue;
 }
```

### 使用redux-thunk的一个例子

```
function fetchPosts(reddit) {
   return ({dispatch}) => {
     return fetch(`https://www.reddit.com/r/${reddit}.json`)
       .then(response => response.json())
       .then(json => dispatch(receivePosts(reddit, json)))  //获取到数据
   }
 }
```

### applyMiddleware函数签名

```
(...middlewares)=>(createStore)=>(reducer, preloadedState, enhancer)=>{
    const store = createStore(reducer, preloadedState, enhancer)
    let dispatch = store.dispatch
    let chain = []

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    //接受middlewareAPI,中间件函数变为两层为：next => action => {}
    chain = middlewares.map(middleware => middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch)   //compose组合中间件函数，接受store.dispatch变为一层：action => {}

    return {
      ...store,
      dispatch
    }
}
```

### compose函数签名

```
export default function compose(...funcs) {
  return funcs.reduce((a, b) => (...args) => a(b(...args)))  //返回的是一个函数
}
```


### 创建一个store
增强的createStore,相当于enhancer(createStore)

```
const store = applyMiddleware(thunk, logger)(createStore)(rootReducer, initialState)
```

 ### 总结
 - applyMiddleware是一个有三层的函数签名，(...middlewares)=>(createStore)=>(reducer, preloadedState, enhancer)=>{}
 它的第一个参数是中间件参数列表，用于增强store的dispatch的功能。第二个参数和第二个参数分别是createStore，rootReducer
 和initialState,用于创建一个store。之前提到，applyMiddleware的第一个参数是中间件列表，用于增强store的dispatch功能。
 先举一个简单的例子。当我们要更改store中的数据时，先派发一个action，根据action中的type去匹配对应的reducer，更改节点的
 值，如果我们想要获得数据改变前后的值，我们可以在dispatch前后做改进。dispatch前可以获得action的type和payload。然后改变
 数据，数据改变后我们又从store中获取改变后的数据。这样我们就能获得数据改变的记录。

 - 那么applyMiddleware的工作原理又是怎样的呢？applyMiddleware先是创建了一个普通的store。然后获取中间件数组，使用map方法取出
 每个中间件进行加工。中间件的函数签名也是三层，第一个函数是store的api，包括dispatch, getState。第二个参数是next表示下一个
 中间件，第三个参数是action，表示派发的action。如果是redux-thunk,那么里面的action就表示一个函数。刚才讲到，我们使用数组的
 map方法传递给每个中间件store的api。这样就形成了一个新的中间件数组，每个中间的函数签名为next和action。

 - applyMiddleware中使用compose方法，compose的参数是一个数组，它的核心代码就是每次取出数组的前两项a,b，返回一个函数，函数体
 里面b获得参数执行后把结果作为参数传给a。我们现在的中间件参数是两层，next和action。经过这个方法后所有的中间件就被组合为
 一个函数了。最后一个函数获得外层的参数store的dispatch方法。这样这个函数就只有一层。这个函数并不会执行，而是传给外面的
 函数a，作为其参数。这样我们就可以先执行a里面的方法，然后再调用b。就像这样，形成了一个中间件链。派发action的时候，数据
 会层层过滤，最后达到我们想要的结果。