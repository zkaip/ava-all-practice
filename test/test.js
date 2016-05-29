import test from 'ava'

test('foo', t => {
  t.pass()
})

test('bar', async t => {
  const bar = Promise.resolve('bar')
  t.is(await bar, 'bar')
})

// 断言计划
test('asset plan pass01',t => {
  t.plan(1)
  return Promise.resolve(3).then(n => {
    t.is(n, 3)
  })
})

test('asset plan fail01',t => {
  t.plan(2)
  for (let i = 0; i < 3; i++) {
    t.true(t < 3)
  }
})

// 运行指定命令
// test.only('will be run', t => {
//   t.pass()
// })

// 跳过测试
test.skip('will not be run', t => {
  t.fail()
})

// 测试占位
test.todo('will think about writing this later')

// Before After 钩子
test.before(t => {
  console.log('Before all')
  t.pass()
})

test.before(t => {
  console.log('Before all After before')
  t.pass()
})

test.after('cleanup', t => {
  console.log('After all')
  t.pass()
})

test(t => {
  const a = /foo/;
  const b = 'bar';
  const c = 'baz';
  t.truthy(a.test(b) || b === c);
});

const express = require("express")
  , request = require("supertest-as-promised")

// 因为测试是并发执行的，所以最好是为每个测试建立一个新的服务器实例，
// 如果所有测试都引用同一个实例，那实例可能会被不同的测试改变状态。
// 这可以在test.beforeEach和t.context里完成，或者简单的工厂方法
function makeApp() {
  const app = express()
  app.post('/signup', signupHandler)
  return app
}

// 将你的服务器注入到测试超类中，主要的点是用 promise 或 async/await 语法来代替测试超类的end方法
test('signup:Success', async t => {
  t.plan(2)
  const res = await request(makeApp())
      .post('/signup')
      .send({email: 'ava@rocks.com', password: '123123'})

  t.is(res.status, 200)
  t.is(res.body.email, 'ava@rocks.com')
})