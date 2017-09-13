/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))  //返回的是一个函数
}


function f0(action) {
    console.log('f0')
}
function f1(next) { // logger
  return action => {
    console.log('f1')
    next()
  }
}
function f2(next) {  //thunk
  return action => {//可以获取next，闭包，可以获取action，函数
    console.log('f2')
    console.log('action',action)
    next()
  }
}
function f3(next) {
  return action => {}
}

// reduce函数说明，参数是函数，函数形参为a，b。a接收数组的第一个值，b为第二个值。计算结果后赋值给累计的a
// b为下一个数组的值


// 两个函数复合的情况
var dispatch = [f2,f1].reduce((a, b) => (...args) => a(b(...args)))(f0)
dispatch(111)

c = (...args) => f2(f1(...args))   // ( c )(f0)  //f2(f1(f0))

function c(...args) { //f2里面的参数是实参，这个实参是一个函数，实参函数可以接收外面的参数
  return f2(function f1(...args) {

  })
}


// 三个函数复合的情况
var dispatch = [f3,f2,f1].reduce((a, b) => (...args) => a(b(...args)))(f0)
dispatch(111)

a = (...args) => f3(f2(...args))
b = f1
compose = (...args) => a(f1(...args))
dispatch = compose(f0)   // f1(f0)   f3(f2(f1(f0)))

function c(...args) { //f2里面的参数是实参，这个实参是一个函数，实参函数可以接收外面的参数
  return f2(function f1(...args) {

  })
}

//
[0,1,2].reduce((a,b)=>a+b)
