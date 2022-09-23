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
  }

  export interface Article
    extends Model<InferAttributes<Article>, InferCreationAttributes<Article>> {
    id: CreationOptional<string>;
    journal_id: ForeignKey<Journal["id"]>;
    identifier?: string;
    publish_date: string;
    topic: string;
    title: string;
    abstract: string;
    format: string;
    year: string;
    info: string;
    pages: string;
    doi: string;
    language: string;
    file: string;
    article_parsing: string;
    keywords: string;
    oai_update?: string;
    createdAt?: CreationOptional<Date>;
    updatedAt?: CreationOptional<Date>;
    authors?: Author;
    Interests: NonAttribute<Interest[]>;
  }

  export interface Interest
    extends Model<
      InferAttributes<Interest>,
      InferCreationAttributes<Interest>
    > {
    id: CreationOptional<string>;
    name: string;
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
    email: string;
    affiliation: string;
    orcid?: string;
  }
}
