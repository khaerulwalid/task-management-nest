import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Attachment } from 'src/entities/attachments.entity';
import { Repository } from 'typeorm';
import { v2 as cloudinary } from 'cloudinary';
import '../config/cloudinary.config'; 

@Injectable()
export class AttachmentsService {
    constructor(
        @InjectRepository(Attachment)
        private readonly attachmentRepository: Repository<Attachment>,
    ) {}

    async create(taskId: number, filePath: string): Promise<Attachment> {
        const attachment = this.attachmentRepository.create({
          task_id: taskId,
          file_path: filePath,
        });
        return this.attachmentRepository.save(attachment);
    }

    async uploadToCloudinary(createReadStream: () => NodeJS.ReadableStream, filename: string): Promise<string> {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: 'auto', public_id: `attachments/${filename}` },
            (error, result) => {
              if (error) return reject(error);
              resolve(result?.secure_url || '');
            },
          );
    
          createReadStream().pipe(stream);
        });
    }
}
