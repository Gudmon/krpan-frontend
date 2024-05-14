import { PalmsCrane } from "../../cranes/models/palms-crane";
import { PalmsCraneOverview } from "../../cranes/models/palms-crane-overview";

export interface PalmsTrailer {
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
    crane: PalmsCraneOverview[];
    selectedCrane?: PalmsCrane;
    imgUrls: string[];
    imgUrl: string;
    videoIds?: string[];
}