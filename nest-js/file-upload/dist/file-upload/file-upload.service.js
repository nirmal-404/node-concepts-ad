"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const cloudinary_1 = require("cloudinary");
const fs = require("fs");
let FileUploadService = class FileUploadService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
        cloudinary_1.v2.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    }
    async uploadFile(file) {
        try {
            const uploadResult = await this.uploadToCloudinary(file.path);
            const newlySavedFile = await this.prisma.file.create({
                data: {
                    filename: file.originalname,
                    publicId: uploadResult.public_id,
                    url: uploadResult.secure_url,
                },
            });
            fs.unlinkSync(file.path);
            return newlySavedFile;
        }
        catch (error) {
            if (file.path && fs.existsSync(file.path)) {
                fs.unlinkSync(file.path);
            }
            throw new common_1.InternalServerErrorException('File upload failed! Please try again after some time');
        }
    }
    uploadToCloudinary(filePath) {
        return new Promise((resolve, reject) => {
            cloudinary_1.v2.uploader.upload(filePath, (error, result) => {
                if (error)
                    reject(error);
                resolve(result);
            });
        });
    }
    async deleteFile(fileId) {
        try {
            const file = await this.prisma.file.findUnique({
                where: {
                    id: fileId,
                },
            });
            if (!file) {
                throw new Error('File not found! Please try with a different file ID');
            }
            await cloudinary_1.v2.uploader.destroy(file.publicId);
            await this.prisma.file.delete({
                where: { id: fileId },
            });
            return {
                message: 'File deleted successfully',
            };
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('File deletion failed! Please try again after some time');
        }
    }
};
exports.FileUploadService = FileUploadService;
exports.FileUploadService = FileUploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FileUploadService);
//# sourceMappingURL=file-upload.service.js.map