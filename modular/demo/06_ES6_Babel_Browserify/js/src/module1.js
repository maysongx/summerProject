//常规暴露：暴露模块方式一：分别暴露
export function foo() {
  console.log('module1 foo()')
}

export function bar() {
  console.log('module1 bar()')
}

export const DATA_ARR = [1, 3, 5, 1]