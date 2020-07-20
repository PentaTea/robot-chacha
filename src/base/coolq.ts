const log = require("@base/console").Log
const info = require("@base/console").Info
export default class coolq {
    constructor() {

    }
    log(m: any) {
        log(m, this.constructor.name)
    }
    info(m: any) {
        info(m, this.constructor.name)
    }
}