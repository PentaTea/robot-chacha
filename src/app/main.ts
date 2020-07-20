import { App, AppConfig, startAll } from "koishi";
import coolq from "@base/coolq"

export class APP extends coolq {
    app: App
    Service: Array<any>
    constructor(option: AppConfig, Service: Array<any>) {
        super()
        this.app = new App(option)
        this.Service = Service;
        startAll()
        this.info("start")
        this.info(this.app.options.selfId + " 开始侦听...")
        Service.forEach((Service) => {
            Service.start(this.app)
        })
    }
}