const Chalk = require('chalk');
const DateFormat = require('dateformat');
const randomColor = require("randomcolor");
const Convert = require('ansi-to-html');
const convert = new Convert();


var logLine: string[] = []
function record(msg: string) {
    logLine.push(msg)
}

function From(from: string | null): string {
    return from ? Chalk.hex(randomColor({
        seed: from + "10",
        hue: "random",
        format: "hex",
        luminosity: 'dark',
    }))(`[ ${from} ]`) : ""
}

exports.Log = (message: any, from?: string) => {
    const timeStamp = DateFormat(new Date(), "HH:mm:ss");

    if (typeof message === "string") {
        let out;
        out = `${Chalk.hex('#a9a9a9')(timeStamp)} ${From(from)} ${Chalk.hex('#3CB371')(message)}`;
        record(convert.toHtml(out) + "<br />\r\n");
        console.log(out);
    } else {
        console.log(Chalk.hex('#a9a9a9')(timeStamp), From(from), message);
    }

}

exports.Info = (message: any, from?: string) => {
    const timeStamp = DateFormat(new Date(), "HH:mm:ss");
    if (typeof message === "string") {
        let out;
        out = `${Chalk.hex('#a9a9a9')(timeStamp)} ${From(from)} ${Chalk.cyan(message)}`
        record(convert.toHtml(out) + "<br />");
        console.log(out);
    } else {
        console.log(Chalk.hex('#a9a9a9')(timeStamp), From(from), message);
    }

}
