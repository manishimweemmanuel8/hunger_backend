import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    // console.log(file);
    return new Promise((resolve, reject) => {
      console.log("hello bbb");

      const upload = v2.uploader.upload_stream((error, result) => {

        if (error) {
          return reject(error)
        };
        console.log("hello");

        resolve(result);
      });
      toStream(file.buffer).pipe(upload);
    });
  }
}
