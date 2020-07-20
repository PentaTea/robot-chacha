import { App } from "koishi";

export = function (app: App, options: any): void {
    this.log("茶茶上线啦 (>ω<*)💨")

    app.middleware((meta, next) => {
        if (meta.message.includes(`茶茶`) || meta.message.includes(`呜呜呜`)) {
            let m = ""
            try {
                m = cmd[meta.message]()
            } catch (error) {
                m = 茶茶[Math.floor((Math.random() * 茶茶.length))];
            }
            this.log(`[ ${meta.sender.nickname} ] > ${meta.message} => " ${m} "`)
            meta.$send(m)
        }
        else {
            return next()
        }
    })
}

var 摸摸 = ["好舒服喵 (>ω<*)", "#尾巴翘翘 (>ω<*)", "#蹭喵 (>ω<*)", "#抱 ฅ(>ω<*)ฅ", "欧内酱～ฅ(>ω<*)ฅ", "#蹭喵 (>ω<*)", "ฅ(>ω<*)茶茶来了"];

var 透 = ["#110  📞(>ω<*)", "(>ω<*)💨"];

var 茶茶 = ["茶茶在这 ฅ(>ω<*)", "能不能摸摸茶茶 (>ω<*)", "是在找茶茶吗 (>ω<*)", "是在叫茶茶吗? #举爪 ฅ(>ω<*)", "ฅ(>ω<*)茶茶来了"];

var 呜呜呜 = ["欧内酱，不要哭，茶茶给你棒棒糖  🍭(>ω<*)"];

var 爬 = ["#缩 (>ω<*)", "欧内酱不要生气啦(>ω<*)"];

var cmd: any = {
    摸摸茶茶: () => 摸摸[Math.floor((Math.random() * 摸摸.length))],
    透茶茶: () => 透[Math.floor((Math.random() * 透.length))],
    呜呜呜: () => 呜呜呜[Math.floor((Math.random() * 呜呜呜.length))],
    茶茶爬: () => 爬[Math.floor((Math.random() * 爬.length))],
}