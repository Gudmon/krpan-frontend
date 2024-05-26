import { KrpanTrailer } from "../../trailers/models/krpan-trailer";
import { KrpanTrailerOverview } from "../../trailers/models/krpan-trailer-overview";

export interface KrpanCrane {
    id: number;
    name: string;
    description: string;
    price: string;
    maxReach: string;
    maxReachWithGrabOpen: string;
    netLiftingTorque: string;
    brutLiftingTorque: string;
    liftCapacityAtFourMeters: string;
    liftCapacityAtMaxReach: string;
    weight: string;
    slewTorque: string;
    slewingAngle: string;
    systemPressure: string;
    oilQuantityInTank: string;
    slewCylinders: string;
    telescopicStages: string;
    krpanTrailer: KrpanTrailerOverview[];
    selectedTrailer?: KrpanTrailer;
    imgUrls: string[];
    imgUrl: string;
    videoIds?: string[];
}