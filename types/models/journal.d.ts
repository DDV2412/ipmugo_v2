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

    createArticle: HasManyCreateAssociationMixin<Article>;
  }

  export interface Article
    extends Model<InferAttributes<Article>, InferCreationAttributes<Article>> {
    id: CreationOptional<string>;
    journal_id: ForeignKey<Journal["id"]>;
    identifier: string;
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
    oai_update: string;
    createdAt?: CreationOptional<Date>;
    updatedAt?: CreationOptional<Date>;
    authors?: Author;

    getJournal: BelongsToGetAssociationMixin<Journal>;
    createAuthor: HasManyCreateAssociationMixin<Author>;
    addAuthor: HasManyAddAssociationsMixin<Author, string>;
  }

  export interface Interest
    extends Model<
      InferAttributes<Interest>,
      InferCreationAttributes<Interest>
    > {
    id: CreationOptional<string>;
    name: string;
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

    getArticle: BelongsToGetAssociationMixin<Article>;
  }
}
