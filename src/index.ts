console.log("coolq");
import 'module-alias/register'

import { App } from "@app/main";
import 'koishi-database-mysql'
import { createService } from "@app/service/service"
import coolq from "@base/coolq"

export class Main extends coolq {
    constructor() {
        super()

        this.log("创建依赖服务");
        var Service = []

        Service.push(createService("ConsoleService", { user: 2490445193 }))

        Service.push(createService("茶茶Service", { group: 2430413 }))

        Service.push(createService("AuthService"))

        //Service.push(createService("送子观音Service"))

        this.log("依赖注入并启动 App 服务");

        const koishi = new App({
            nickname: "茶茶",
            logLevel: 3,
            type: "http",
            port: 6700,
            server: "http://localhost:5700",
            selfId: 1993713026,
            token: "YMCA",
            quickOperationTimeout: 200,
            database: {
                mysql: {
                    host: '127.0.0.1',
                    port: 3306,
                    user: 'coolq',
                    password: 'zjp11679841',
                    database: 'coolq',
                },
            },
        }, Service)

        koishi.app.plugin(
            require('koishi-plugin-common'), {
            repeater: {
                repeat: (repeated: any, times: any) => !repeated && times >= 2 && Math.random() < 0.3,
                repeatCheck: (repeated: any, times: any) => times >= 3 && Math.random() < 0.2,
                repeatCheckText: '不许重复复读！',
                interruptCheck: (repeated: any, times: any) => repeated && times >= 3 && Math.random() < 0.2,
                interruptCheckText: (userId: any) => `[CQ:at,qq=${userId}] 在？为什么打断复读？`,
            },
            authorizeGroup: {
                2430413: 2,
                895722928: 2,
                1070505359: 2
            },
        }
        )



    }
}

console.log("初始化 main 服务...");
new Main();

// var nodejieba = require("nodejieba");

// console.log(nodejieba.cut("摸摸茶茶"));
// console.log(nodejieba.cut("透茶茶"));
// console.log(nodejieba.cut("茶茶爬"));
