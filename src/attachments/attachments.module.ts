import { Module } from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attachment } from 'src/entities/attachments.entity';
import { AttachmentResolver } from 'src/graphql/resolvers/attachment.resolver';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attachment]),
    JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: { expiresIn: '4h' },
          }),
    }), // Menambahkan repository ke dalam module
  ],
  providers: [AttachmentsService, AttachmentResolver],
  exports: [AttachmentsService],
})
export class AttachmentsModule {}
