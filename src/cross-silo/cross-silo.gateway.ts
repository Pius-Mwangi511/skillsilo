import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from 'socket.io';


@WebSocketGateway({ cors: true })
export class CrossSiloGateway {
  @WebSocketServer()
  server: Server;

  sendNewRequest(request: any) {
    this.server.emit('newCrossSiloRequest', request);
  }

  sendReply(reply: any) {
    this.server.emit('crossSiloReply', reply);
  }
}
