import { FileUploadService } from './file-upload.service';
export declare class FileUploadController {
    private readonly fileUploaderService;
    constructor(fileUploaderService: FileUploadService);
    uploadFile(file: Express.Multer.File): Promise<{
        id: string;
        filename: string;
        publicId: string;
        url: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteFile(id: string): Promise<{
        message: string;
    }>;
}
