import { MockedApp } from 'koishi-test-utils'

// 创建一个无服务端的 App 实例
const app = new MockedApp()

// 创建一个 QQ 号为 123 的私聊会话
const session = app.createSession('user', 123)

// 还是刚刚那个例子
app.middleware(({ message, $send }, next) => {
    if (message === '天王盖地虎') return $send('宝塔镇河妖')
    return next()
})

test('example', async () => {
    // 将 foo 发送给机器人将会获得 bar 的回复
    await session.shouldHaveReply('天王盖地虎', '宝塔镇河妖')

    // 将 foo 发送给机器人将会获得某些回复
    await session.shouldHaveReply('天王盖地虎')

    // 将 foo 发送给机器人后将会获得与快照一致的回复
    await session.shouldMatchSnapshot('天王盖地虎')

    // 将 foo 发送给机器人将不会获得任何回复
    await session.shouldHaveNoReply('宫廷玉液酒')
})