const log = require("@base/console").Log
const info = require("@base/console").Info
import { App } from "koishi";

class Service {
    constructor(name: string, cb: (app: App, options: any) => any, options: Object) {
        this.name = name;
        this.cb = cb;
        this.options = options;
        this.log("喵~")
    }
    name: string
    cb: Function
    start(app: any) {
        this.cb(app, this.options)
    }
    options: Object
    log(m: any) {
        log(m, this.name)
    }
    info(m: any) {
        info(m, this.name)
    }

}

export function createService(name: string, options: Object): Service {
    return new Service(name, require("./" + name), options)
}