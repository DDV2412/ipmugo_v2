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

export namespace author {
  export interface Author
    extends Model<InferAttributes<Author>, InferCreationAttributes<Author>> {
    id: CreationOptional<string>;
    article_id: string;
    firstname: string;
    lastname: string;
    email: string;
    affiliation: string;
    orcid?: string;
  }
}
