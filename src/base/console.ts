const Chalk = require('chalk');
const DateFormat = require('dateformat');
const randomColor = require("randomcolor");
let NodeMonkey = require("node-monkey")
NodeMonkey()

function From(from: string | null) {
    return from ? Chalk.hex(randomColor({
        seed: from + "10",
        hue: "random",
        format: "hex",
        luminosity: 'dark',
    }))(`[ ${from} ]`) : ""
}

exports.Log = (message: any, from: string | null) => {
    const timeStamp = DateFormat(new Date(), "HH:mm:ss");
    if (typeof message === "string") {
        console.log(Chalk.hex('#a9a9a9')(timeStamp), From(from), Chalk.hex('#3CB371')(message));
    } else {
        console.log(Chalk.hex('#a9a9a9')(timeStamp), From(from), message);
    }

}

exports.Info = (message: any, from: string | null) => {
    const timeStamp = DateFormat(new Date(), "HH:mm:ss");
    if (typeof message === "string") {
        console.log(Chalk.hex('#a9a9a9')(timeStamp), From(from), Chalk.cyan(message));
    } else {
        console.log(Chalk.hex('#a9a9a9')(timeStamp), From(from), message);
    }

}
