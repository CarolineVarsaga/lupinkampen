export interface ISpeciesData {
  swedishName: string;
  speciesData: {
    speciesFactText: ISpeciesFactText;
  };
}
export interface ISpeciesFactText {
  characteristicAsHtml: string;
  spreadAndStatusAsHtml: string;
  ecologyAsHtml: string;
  threatAsHtml: string;
  conservationMeasuresAsHtml: string;
}
