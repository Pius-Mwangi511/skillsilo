import { MessageService } from "src/message/message.service";
import { ChatGateway } from "./chat.gateway";
import { PrismaService } from "src/prisma/prisma.service";
import { Module } from "@nestjs/common";

@Module({
    providers: [ChatGateway, MessageService, PrismaService],
  })
  export class ChatModule {}
  