export interface ISpeciesData {
  redlistInfo: IRedlistInfo[];
  speciesFactText: ISpeciesFactText;
  taxonRelatedInformation: ITaxonRelatedInformation;
  natureConservation: INatureConservation;
  landscapeTypes: ILandscapeType[];
  biotopes: IBiotope[];
  substrateInformation: ISubstrateInformation[];
  ecologicalGroups: IEcologicalGroup[];
}

export interface IRedlistInfo {
  period: IPeriod;
  category: string | null;
  criterion: string | null;
  criterionText: string | null;
}

export interface IPeriod {
  id: string;
  name: string;
  description: string;
  current: boolean;
}

export interface ISpeciesFactText {
  characteristic: string;
  characteristicAsHtml: string;
  spreadAndStatus: string;
  spreadAndStatusAsHtml: string;
  ecology: string;
  ecologyAsHtml: string;
  threat: string;
  threatAsHtml: string;
  conservationMeasures: string;
  conservationMeasuresAsHtml: string;
}

export interface ITaxonRelatedInformation {
  swedishPresence: string;
  immigrationHistory: string;
}

export interface INatureConservation {
  protectedByWorkProtectionConstitution: string | null;
  protectedBirds: string | null;
}

export interface ILandscapeType {
  id: number;
  name: string;
  status: string;
}

export interface IBiotope {
  id: number;
  name: string;
  significance: string;
}

export interface ISubstrateInformation {
  id: number;
  name: string;
  significance: string;
  use: string;
}

export interface IEcologicalGroup {
  id: number;
  name: string;
  active: boolean;
}
