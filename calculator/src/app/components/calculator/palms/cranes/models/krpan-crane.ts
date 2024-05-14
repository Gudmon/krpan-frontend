import { KrpanTrailer } from "../../trailers/models/krpan-trailer";
import { KrpanTrailerOverview } from "../../trailers/models/krpan-trailer-overview";

export interface KrpanCrane {
    id: number;
    name: string;
    description: string;
    price: string;
    series: string;
    maxReach: string;
    liftAtFullReach240Bar: string;
    liftAtFullReach215Bar: string;
    liftAtFullReach190Bar: string;
    liftAtFourMeters240Bar: string;
    liftAtFourMeters215Bar: string;
    liftAtFourMeters190Bar: string;
    brutLiftingTorque240Bar: string;
    brutLiftingTorque215Bar: string;
    brutLiftingTorque190Bar: string;
    telescopeLength: string;
    slewingCylinder: string;
    slewingTorque: string;
    workingPressure: string;
    rotatorMaximumLoad: string;
    craneWeight: string;
    pillarSlewingAngle: string;
    recommendedOilFlow: string;
    trailer: KrpanTrailerOverview[];
    selectedTrailer?: KrpanTrailer;
    imgUrls: string[];
    imgUrl: string;
    videoIds?: string[];
}