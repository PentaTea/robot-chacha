import { App } from "koishi";

export = function (app: App, options: any) {
    let command = commandFactory(this, app)

    command('喵喵喵 <message>', ({ meta }: any, message: string) => {
        meta.$send(message + "喵喵喵")
    }, "")

}


function commandFactory(service: any, app: any) {
    function command(command: string, callback: Function) {
        app.command(command)
            .action(({ meta }: any, message: any) => {
                this.log(`$Hit: [ ${String(command.match(/^.*?(?=<.*?>)/gm)).trim()} ] > ${message}`)
                callback({ meta }, message)
            })
    }
    return command.bind(service)
}