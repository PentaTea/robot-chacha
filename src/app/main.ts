import { App as APP, AppConfig, startAll } from "koishi";
import coolq from "@base/coolq"

export class App extends coolq {
    app: APP
    Service: Array<any>
    constructor(option: AppConfig, Service: Array<any>) {
        super()
        this.app = new APP(option)
        this.Service = Service;
        startAll()
        this.info("start")
        this.info(this.app.options.selfId + " 开始侦听...")
        Service.forEach((Service) => {
            Service.start(this.app)
        })
    }
}