import { UseGuards, UseInterceptors } from '@nestjs/common';
import { Resolver, Mutation, Args, Context, Int } from '@nestjs/graphql';
import { AttachmentsService } from 'src/attachments/attachments.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Attachment } from '../models/attachment.model';
import { GraphQLUpload, FileUpload } from 'graphql-upload-ts';


@Resolver(() => Attachment)
@UseGuards(AuthGuard)
export class AttachmentResolver {
  constructor(private readonly attachmentService: AttachmentsService) {}

  // Mutation untuk mengupload file dan menyimpan ke tabel attachments
  @Mutation(returns => Attachment)
  async uploadFile(
    @Args('taskId',  { type: () => Int }) taskId: number,
    @Args('file', { type: () => GraphQLUpload }) file: FileUpload,
    @Context() context: any
  ): Promise<Attachment> {

    if (!file) {
      throw new Error('No file uploaded');
    }

    const { createReadStream, filename, mimetype } = file as any;
    console.log(mimetype, "<<mimetype");
    const readStream = createReadStream();
    console.log(readStream, "<<Stream");
    
    if (!['image/jpeg', 'image/png'].includes(mimetype)) {
        throw new Error('Invalid file type. Only JPEG and PNG are allowed.');
    }

    // Proses upload ke penyimpanan
    const filePath = await this.attachmentService.uploadToCloudinary(
      readStream,
      filename,
    );
    console.log(filePath, "<<filePath");
    
    // Menyimpan data file di tabel attachments
    const attachment = await this.attachmentService.create(taskId, filePath);
    
    return attachment;
  }
}
