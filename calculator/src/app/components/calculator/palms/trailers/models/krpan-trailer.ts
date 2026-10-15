import { CloudinaryImage } from "@cloudinary/url-gen/assets/CloudinaryImage";
import { KrpanCrane } from "../../cranes/models/krpan-crane";
import { KrpanCraneOverview } from "../../cranes/models/krpan-crane-overview";

export interface KrpanTrailer {
    id: number;
    name: string;
    description: string;
    price: number | string;
    loadCapacity: string;
    centralBeams: string;
    loadingLength: string;
    loadingLengthWithExtension: string;
    totalLength: string,
    totalLengthWithExtension: string,
    totalWidth: string,
    weight: string;
    frameSteeringCylinders: string;
    drawbarAngle: string;
    krpanCrane: KrpanCraneOverview[];
    selectedCrane?: KrpanCrane;
    
    imageUrls?: string[];
    images: CloudinaryImage[];
    videoUrls?: string[];
}