import { App } from "koishi";
export = function (app: App, options: any): void {
    let times = 0 // 复读次数
    let message = '' // 当前消息
    app.prependMiddleware((meta: any, next: any) => {

        if (meta.message === message) {
            times += 1
            if (times === 1) return next(() => meta.$send(message))
        } else {
            times = 0
            message = meta.message
            return next()
        }
    })
}