#!/usr/bin/env node
const net = require('net');
const program = require('commander');

// const program = new commander.Command()





program
    .option("-p, --port <port>", "Port to listen on", parseInt)
    .option("-e, --encoding <fmt>", "Encoding (\"utf8\" is default)")
    .parse(process.argv)
// .version    (package.version)
// .description(package.description)

const server = new net.Server()


const { port, encoding } = program.opts()
if (!port) {
    console.log(program.helpInformation())
    // console.error('Please enter port, for example: port-listener 5000')
    process.exit(1)
}


server.on('connection', connection => {
    const ip = connection.remoteAddress.substr(7)
    const port = connection.remotePort

    console.log('\x1b[36m%s\x1b[0m', '[INFO]', `New connection from ${ip}:${port}`)

    connection.on('data', bufData => {
        const data = bufData.toString(encoding || 'utf-8')
        console.log('\x1b[32m%s\x1b[0m', '[DATA]', `: ${ip} -> ${bufData.byteLength} bytes`)
        console.log(data)
    })

    connection.on('close', () => {
        console.log('\x1b[36m%s\x1b[0m', '[INFO]', `Disconnected  ${ip == "" ? '127.0.0.1' : ip}`)
    })
})



try {
    server.listen(port, () => {
        const interfaces = require('os').networkInterfaces()['Wi-Fi']
        const locaIP = interfaces.find(interface => interface.family === 'IPv4').address
        console.log(`Server Listening at ${locaIP}:${port}`)
    })
} catch (error) {
    console.log(error.name)
}







