import { App, extendUser, Meta } from "koishi";
declare module 'koishi-core/dist/database' {
    interface UserData {
        family: {}
    }
}

var GroupMemberListCache: any = {};

var cooling: any = {}

export = function (app: App, options: any) {

    app.middleware((meta, next) => {
        switch (meta.message) {
            case '我要儿子':
                addFamily(meta, "儿子", "爸爸", "花香浮动，月华如水，庆添嗣之喜呢! (>ω<*)ฅ")
                break;
            case '我要爸爸':
                addFamily(meta, "爸爸", "儿子", "前半生儿子是父亲的影子，后半生父亲是儿子的影子。(>ω<*)")
                break;
            case '我要老婆':
                addFamily(meta, "老婆", "老婆", "看此日桃花灼灼，宜室宜家；卜他年瓜瓞绵绵，尔昌尔炽。(>ω<*)")
                break;
            case '儿子出来':
                callFamily(meta, "儿子")
                break;
            case '爸爸出来':
                callFamily(meta, "爸爸")
                break;
            case '老婆出来':
                callFamily(meta, "老婆")
                break;
            default:
                if (meta.message === '断绝关系' || meta.message === '解除关系') {
                    delFamily(meta)
                }
                return next()
        }

    })

    var addFamily = async (meta: Meta<"message">, relation: string, relationBack: string, m: string) => {
        cooling[meta.$group.id] = cooling[meta.$group.id] || {}
        cooling[meta.$group.id][meta.sender.userId] = cooling[meta.$group.id][meta.sender.userId] || 0
        let t = Number(new Date().getTime()) - cooling[meta.$group.id][meta.sender.userId]
        if (60000 - t > 0) return meta.$send(`正在冷却中哦 : ${(60 - t / 1000).toFixed(2)} 秒`)
        //获取Family信息
        let requesterFamily = await (await app.database.getUser(meta.sender.userId)).family as any || {}
        //this.log(await (await app.database.getUser(meta.sender.userId)))
        //检查null
        requesterFamily[meta.$group.id] = requesterFamily[meta.$group.id] || {}
        requesterFamily[meta.$group.id][relation + "Id"] = requesterFamily[meta.$group.id][relation + "Id"] || 0
        requesterFamily[meta.$group.id][relation + "Cont"] = requesterFamily[meta.$group.id][relation + "Cont"] || 0
        //检查重复申请关系
        if (requesterFamily[meta.$group.id][relation + "Id"]) return meta.$send(`你已经有${relation}了呢! 可以输入"${relation}出来"找到你的${relation}呢!`)
        //摇号
        GroupMemberListCache[meta.$group.id] = GroupMemberListCache[meta.$group.id] || await app.sender.getGroupMemberList(meta.$group.id)
        let GroupMemberList = GroupMemberListCache[meta.$group.id]
        do {
            if (!GroupMemberList) return meta.$send(`茶茶没有帮你找到空闲的${relation}呢, 请等有人断绝关系之后再试试吧!`)
            var target = GroupMemberList.splice(Math.floor((Math.random() * GroupMemberList.length)), 1)[0]
            if (!target) return meta.$send(`茶茶没有帮你找到空闲的${relation}呢, 请等有人断绝关系之后再试试吧!`)
            var targetFamily = (await app.database.getUser(target.userId, ["family"])).family as any || {}
            targetFamily[meta.$group.id] = targetFamily[meta.$group.id] || {}
        } while (targetFamily[meta.$group.id][relationBack + "Id"] || target.userId === meta.sender.userId || target.userId === meta.selfId);//检查重复关系,检查自身
        //检查null
        targetFamily[meta.$group.id][relationBack + "Id"] = targetFamily[meta.$group.id][relationBack + "Id"] || 0
        targetFamily[meta.$group.id][relationBack + "Cont"] = targetFamily[meta.$group.id][relationBack + "Cont"] || 0
        //开始写入数据库
        this.log(`${meta.sender.nickname}.${relation} => ${target.nickname}`)
        requesterFamily[meta.$group.id][relation + "Id"] = target.userId
        requesterFamily[meta.$group.id][relation + "Cont"]++
        targetFamily[meta.$group.id][relationBack + "Id"] = meta.sender.userId
        targetFamily[meta.$group.id][relationBack + "Cont"]++
        // this.log(requesterFamily[meta.$group.id])
        // this.log(targetFamily[meta.$group.id])
        let family: any = {}
        family[meta.$group.id] = {}
        family[meta.$group.id][relation + "Id"] = 0
        family[meta.$group.id][relation + "Cont"] = 0
        family[meta.$group.id][relationBack + "Id"] = 0
        family[meta.$group.id][relationBack + "Cont"] = 0
        extendUser(() => ({
            family: family
        }))
        app.database.setUser(meta.sender.userId, { family: requesterFamily })
        app.database.setUser(target.userId, { family: targetFamily })
        meta.$send(`收到惹! (>ω<*)  呐，茶茶送给${meta.sender.nickname}一个${relation}:\n[CQ:at,qq=${target.userId}] \n年龄${target.age}，${sex[target.sex]}\n${m}
        `)
        cooling[meta.$group.id][meta.sender.userId] = Number(new Date().getTime())
    }
    var callFamily = async (meta: Meta<"message">, relation: string) => {
        try {
            let requesterFamily = await (await app.database.getUser(meta.sender.userId, ["family"])).family as any || {}
            let targetId = requesterFamily[meta.$group.id][relation + "Id"]
            if (!targetId) throw new Error(`没有找到${relation}`)
            meta.$send(`${relation}出来! [CQ:at,qq=${targetId}]`)
        } catch (error) {
            meta.$send(`你还没有${relation}哦, 快输入"我要${relation}"来领取一只!`)
        }

    }

    var delFamily = async (meta: Meta<"message">) => {
        app.database.setUser(meta.sender.userId, { family: {} })
        meta.$send(`茶茶已经帮你解除了所有关系哦 (>ω<*)`)

    }




    var sex: any = {
        "male": "是男孩子哦",
        "female": "是女孩子呢",
        "unknown": "性别未知鸭"
    }




}

