## redux中间件函数签名
 { dispatch, getState }) => next => action => {

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

## applyMiddleware函数签名
(...middlewares)=>(createStore)=>(reducer, preloadedState, enhancer)=>{
    return{
           ...store,
           dispatch
          }
}

## compose函数签名
export default function compose(...funcs) {
  return funcs.reduce((a, b) => (...args) => a(b(...args)))  //返回的是一个函数
}

## 创建一个store
## 增强的createStore,相当于enhancer(createStore)
 finalCreateStore = compose(
    applyMiddleware(thunk),
    applyMiddleware(logger),
 )(createStore)
 const store = finalCreateStore(rootReducer, initialState)

 或者 const store = applyMiddleware(thunk, logger)(rootReducer, initialState)