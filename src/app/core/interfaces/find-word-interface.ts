import { ELocalities } from "../enums/localities.enum";

export interface IFindWord {
    localityId: ELocalities;
    limit: number;
    offset: number;
}