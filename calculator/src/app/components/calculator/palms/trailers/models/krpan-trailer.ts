import { KrpanCrane } from "../../cranes/models/krpan-crane";
import { KrpanCraneOverview } from "../../cranes/models/krpan-crane-overview";

export interface KrpanTrailer {
    id: number;
    name: string;
    description: string;
    price: string;
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
    imgUrls: string[];
    imgUrl: string;
    videoIds?: string[];
}