var socket = new WebSocket("ws://chat-3ekb.onrender.com/ws");

let connect = cb => {
    console.log("Connecting");

    socket.onopen = () => {
        console.log("Successfully Connected");
    }

    socket.onmessage = msg => {
        console.log(msg)
        cb(msg)
    }

    socket.onclose = e => {
        console.log("Socket Closed Connection: ", e)
    }

    socket.onerror = err => {
        console.log("Socket error ", err)
    }
}

let sendMsg = msg => {
    console.log("sending msg: ", msg);
    socket.send(msg);
}


export {connect, sendMsg}
