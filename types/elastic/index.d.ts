export namespace Elastic {
  export interface SearchBody {
    query: {
      match: {
        name?: string;
        title?: string;
        abstract?: string;
        issn?: string;
        e_issn?: string;
        description?: string;
        publish_date?: string;
        topic?: string;
        doi?: string;
        keywords?: string[];
        subject?: string[];
        firstname?: string;
        lastname?: string;
      };
    };
  }
}
