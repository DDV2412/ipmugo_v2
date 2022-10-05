import {
  Sequelize,
  ModelDefined,
  Association,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  HasManyGetAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyAddAssociationsMixin,
  NonAttribute,
  CreationAttributes,
  BelongsToGetAssociationMixin,
  ModelAttributes,
  AssociationOptions,
  HasOneGetAssociationMixin,
  HasManySetAssociationsMixin,
  ForeignKey,
  BelongsToCreateAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToManySetAssociationsMixin,
  HasOneSetAssociationMixin,
} from "sequelize";

export namespace journal {
  export interface Journal
    extends Model<InferAttributes<Journal>, InferCreationAttributes<Journal>> {
    id: CreationOptional<string>;
    name: string;
    abbreviation: string;
    publisher: string;
    thumbnail: string;
    cover: string;
    issn: string;
    e_issn: string;
    description: string;
    base_url: string;
    createdAt?: CreationOptional<Date>;
    updatedAt?: CreationOptional<Date>;
    articles?: Article;
    Interests: NonAttribute<Interest[]>;
    ScopusMetric: NonAttribute<ScopusMetric>;
  }

  export interface Article
    extends Model<InferAttributes<Article>, InferCreationAttributes<Article>> {
    id: CreationOptional<string>;
    journal_id: ForeignKey<Journal["id"]>;
    identifier: string;
    publishDate: string;
    topic: string;
    title: string;
    abstract: string;
    format: string;
    year: string;
    resources: string;
    pages: string;
    doi: string;
    language: string;
    file: string;
    articleParsing: string;
    keywords: string;
    dateModify?: string;
    createdAt?: CreationOptional<Date>;
    updatedAt?: CreationOptional<Date>;
    Authors?: NonAttribute<Author[]>;
    Interests: NonAttribute<Interest[]>;
    Citations: NonAttribute<Citation[]>;
  }

  export interface Interest
    extends Model<
      InferAttributes<Interest>,
      InferCreationAttributes<Interest>
    > {
    id: CreationOptional<string>;
    name: string;
    createdAt?: CreationOptional<Date>;
    updatedAt?: CreationOptional<Date>;
    Journals: NonAttribute<Journal[]>;
    Articles: NonAttribute<Article[]>;
  }

  export interface JournalInterest
    extends Model<
      InferAttributes<JournalInterest>,
      InferCreationAttributes<JournalInterest>
    > {
    id: CreationOptional<string>;
    journal_id: ForeignKey<Journal["id"]>;
    interest_id: ForeignKey<Interest["id"]>;
  }

  export interface ArticleInterest
    extends Model<
      InferAttributes<ArticleInterest>,
      InferCreationAttributes<ArticleInterest>
    > {
    id: CreationOptional<string>;
    article_id: ForeignKey<Article["id"]>;
    interest_id: ForeignKey<Interest["id"]>;
  }

  export interface Author
    extends Model<InferAttributes<Author>, InferCreationAttributes<Author>> {
    id: CreationOptional<string>;
    article_id: ForeignKey<Article["id"]>;
    firstname: string;
    lastname: string;
    email?: string;
    affiliation?: string;
    orcid?: string;
  }

  export interface Citation
    extends Model<
      InferAttributes<Citation>,
      InferCreationAttributes<Citation>
    > {
    id: CreationOptional<string>;
    article_id: ForeignKey<Article["id"]>;
    count: number;
    source: string;
  }

  export interface ScopusMetric
    extends Model<
      InferAttributes<ScopusMetric>,
      InferCreationAttributes<ScopusMetric>
    > {
    id: CreationOptional<string>;
    journal_id: ForeignKey<Journal["id"]>;
    sjr: number;
    snip: number;
    citeScore: number;
    year: number;
    trackScore: number;
    trackYear: number;
  }
}
