import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import { MessageService } from '../message/message.service'
  
  @WebSocketGateway({ cors: true })
  export class ChatGateway {
    @WebSocketServer()
    server: Server;
  
    constructor(private messageService: MessageService) {}
  
    @SubscribeMessage('joinSilo')
    handleJoin(
      @MessageBody() siloId: string,
      @ConnectedSocket() client: Socket,
    ) {
      client.join(siloId);
    }
  
    @SubscribeMessage('sendMessage')
    async handleMessage(
      @MessageBody()
      data: { siloId: string; userId: string; content: string },
    ) {
      const message = await this.messageService.create(
        data.siloId,
        data.userId,
        data.content,
      );
  
      this.server.to(data.siloId).emit('newMessage', message);
    }
  }
  