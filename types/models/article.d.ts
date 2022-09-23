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

export namespace article {
  export interface Article
    extends Model<InferAttributes<Article>, InferCreationAttributes<Article>> {
    id: CreationOptional<string>;
    journal_id: ForeignKey<string>;
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
    authors: NonAttribute<Author[]>;

    getJournal: BelongsToGetAssociationMixin<Journal>;
  }
}
