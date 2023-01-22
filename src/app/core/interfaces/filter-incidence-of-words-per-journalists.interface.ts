import { EIteractionType } from "../enums/iteraction-type.enum";

export interface IFilterIncidenceOfWordsPerJournalists {
  journalistId: number;
  iteractionType: EIteractionType;
  localityId: number;
}
