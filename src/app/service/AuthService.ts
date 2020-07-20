import { App, getTargetId } from "koishi";

declare module 'koishi-core/dist/database' {
    interface UserData {
        foo: string
    }
}
export = function (app: App, options: any) {
    var level: any = {
        1: "1",
        2: "2",
        3: "3",
        4: "THAUMIEL",
    }
    var authority: Function = async (id: number, auth: number) => {

        this.info(`$ 写入 ${level[auth]} 级权限 > 个体 < ${id} > [ ${(await app.sender.getStrangerInfo(id)).nickname} ]`)
        app.database.getUser(id, auth)
    }

    authority(2490445193, 4)
    authority(1258878996, 3)
    authority(2738892763, 3)

}

