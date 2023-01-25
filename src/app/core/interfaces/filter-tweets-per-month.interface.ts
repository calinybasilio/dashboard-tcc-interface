import { ELocalities } from "../enums/localities.enum";

export interface IFilterTweetsPerMonth {
  journalistId: number;
  localityId: ELocalities;
}
