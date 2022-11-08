import {
    Controller,
    UseInterceptors,
    StreamableFile,
    UploadedFile, Post, Res
} from "@nestjs/common";
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import LocalFilesInterceptor from "../common/helpers/localFiles.interceptor";
import { ApiTags } from "@nestjs/swagger";

@Controller('upload')
@ApiTags('Upload')
export class UploadController {
    @Post('file')
    @UseInterceptors(LocalFilesInterceptor({
        fieldName: 'file',
        path: '/images'
    }))
    uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Res({ passthrough: true }) response: Response
    ) {
        const stream = createReadStream(join(process.cwd(), file.path));
        response.set({
            'Content-Disposition': `inline; filename="${file.filename}"`,
            'Content-Type': file.mimetype
        })
        return new StreamableFile(stream);
    }
}
