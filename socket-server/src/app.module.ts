import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { socketGateway } from './socket.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, socketGateway],
})
export class AppModule {}
