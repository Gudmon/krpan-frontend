import { CloudinaryImage } from "@cloudinary/url-gen/assets/CloudinaryImage";


export interface KrpanTrailerOverview {
    id: number;
    name: string;
    loadCapacity: string;
    loadingLength: string;
    loadingLengthWithExtension: string;
    weight: string
    imageUrl: string  
    image: CloudinaryImage;
}