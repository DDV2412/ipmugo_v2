class CitationUC {
  Citation: any;
  constructor(Citation: any) {
    this.Citation = Citation;
  }

  citationExport = async (doi: string) => {
    return await this.Citation.citationExport(doi);
  };
  citationFormater = async (options: Record<string, string>) => {
    return await this.Citation.citationFormater(options);
  };
}

export default CitationUC;
