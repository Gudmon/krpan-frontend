import { KrpanCrane } from "../../cranes/models/krpan-crane";
import { KrpanCraneOverview } from "../../cranes/models/krpan-crane-overview";

export interface KrpanTrailer {
    id: number;
    name: string;
    description: string;
    price: string;
    beamType: string;
    loadingAreaCross: string;
    loadingAreaLength: string;
    frame: string;
    frameExtensionLength: string;
    grossWeight: string;
    curbWeight: string;
    totalLength: string;
    widthWithStandardWheels: string;
    standardWheelSize: string;
    maxCraneSize: string;
    drawbarControlCylinders: string;
    crane: KrpanCraneOverview[];
    selectedCrane?: KrpanCrane;
    imgUrls: string[];
    imgUrl: string;
    videoIds?: string[];
}