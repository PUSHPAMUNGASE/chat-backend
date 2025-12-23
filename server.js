import express from "express";
import {createServer} from "http";
import {Server} from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());
const httpServer  =createServer(app);


//WebSocket Server
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    }
});

io.on("connection",(socket)=>{
    console.log(`User connected: ${socket.id}`);

    socket.on("send_message",(data)=>{
        io.emit("receive_message", data);

    });

    socket.on("disconnect",()=>{
        console.log(`User disconnected: ${socket.id}`); 
    });
});


httpServer.listen(4000,()=>{
    console.log("Server is running on port 4000") ;
})

