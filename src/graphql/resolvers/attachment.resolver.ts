import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Context, Int } from '@nestjs/graphql';
import { AttachmentsService } from 'src/attachments/attachments.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Attachment } from '../models/attachment.model';
import * as GraphQLUpload from "graphql-upload/GraphQLUpload.js"
import * as Upload from "graphql-upload/Upload.js"

@Resolver(() => Attachment)
@UseGuards(AuthGuard)
export class AttachmentResolver {
  constructor(private readonly attachmentService: AttachmentsService) {}

  // Mutation untuk mengupload file dan menyimpan ke tabel attachments
  @Mutation(returns => Attachment)
  async uploadFile(
    @Args('taskId',  { type: () => Int }) taskId: number,
    @Args('file', { type: () => GraphQLUpload }) file: Upload,
    @Context() context: any
  ): Promise<Attachment> {
    console.log("<<Masuk Upload File");
    console.log(file, "<<File");
    
    
    const userId = context.req.user.id; // Mendapatkan ID pengguna dari konteks
    if (!file) {
      throw new Error('No file uploaded');
    }

    const { createReadStream, filename, mimetype } = file as any;
    console.log(mimetype, "<<mimetype");
    
    // if (!['image/jpeg', 'image/png'].includes(mimetype)) {
    //     throw new Error('Invalid file type. Only JPEG and PNG are allowed.');
    // }

    // Proses upload ke penyimpanan
    const filePath = await this.attachmentService.uploadToCloudinary(
      createReadStream(),
      filename,
    );

    // Menyimpan data file di tabel attachments
    const attachment = await this.attachmentService.create(taskId, filePath);
    
    // Mengembalikan attachment yang baru diupload
    return attachment;
  }
}
