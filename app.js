const net = require('net');

const server = new net.Server()

const port = process.argv[2]
if(!port) {
    if(!port) console.error('Please enter port, for example: port-listener 5000')
    process.exit(1)
}


server.on('connection' , connection => {
    const ip = connection.remoteAddress.substr(7)
    const port = connection.remotePort
    
    console.log('[INFO]' , `New connection from ${ip}:${port}`)

    connection.on('data' , bufData => {
        const data = bufData.toString()
        console.log(`[DATA] : ${ip} -> ${bufData.byteLength} bytes`)
        console.log(data)
    })
    
    connection.on('close' , () => {
        console.log('[INFO]' , `Disconnected  ${ip == "" ? '127.0.0.1' : ip}`)
    })
})



try {
    server.listen(port , () => {
        const interfaces = require('os').networkInterfaces()['Wi-Fi']
        const locaIP = interfaces.find(interface => interface.family === 'IPv4').address
        console.log(`Server Listening at ${locaIP}:${port}`)
    } )
} catch (error) {
    console.log(error.message)
}