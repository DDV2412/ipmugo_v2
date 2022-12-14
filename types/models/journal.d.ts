import { User } from "./user";
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
    created_at?: CreationOptional<Date>;
    updated_at?: CreationOptional<Date>;
    articles?: Article;
    users?: User;
    Interests: NonAttribute<Interest[]>;
    ScopusMetric: NonAttribute<ScopusMetric>;
  }

  export interface Article
    extends Model<InferAttributes<Article>, InferCreationAttributes<Article>> {
    id: CreationOptional<string>;
    journal_id: ForeignKey<Journal["id"]> | uuid;
    identifier: string;
    publish_date: string;
    topic: string;
    title: string;
    abstract: string;
    format: string;
    publish_year: string;
    resources: string;
    pages: string;
    doi: string;
    publish_language: string;
    file: string;
    article_parsing: string;
    keywords: string;
    date_modify?: string;
    created_at?: CreationOptional<Date>;
    updated_at?: CreationOptional<Date>;
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
    created_at?: CreationOptional<Date>;
    updated_at?: CreationOptional<Date>;
    Journals: NonAttribute<Journal[]>;
    Articles: NonAttribute<Article[]>;
  }

  export interface JournalInterest
    extends Model<
      InferAttributes<JournalInterest>,
      InferCreationAttributes<JournalInterest>
    > {
    id: CreationOptional<string>;
    journal_id: ForeignKey<Journal["id"]> | uuid;
    interest_id: ForeignKey<Interest["id"]> | uuid;
  }

  export interface ArticleInterest
    extends Model<
      InferAttributes<ArticleInterest>,
      InferCreationAttributes<ArticleInterest>
    > {
    id: CreationOptional<string>;
    article_id: ForeignKey<Article["id"]> | uuid;
    interest_id: ForeignKey<Interest["id"]> | uuid;
  }

  export interface Author
    extends Model<InferAttributes<Author>, InferCreationAttributes<Author>> {
    id: CreationOptional<string>;
    article_id: ForeignKey<Article["id"]> | uuid;
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
    article_id: ForeignKey<Article["id"]> | uuid;
    count: number;
    source: string;
  }

  export interface ScopusMetric
    extends Model<
      InferAttributes<ScopusMetric>,
      InferCreationAttributes<ScopusMetric>
    > {
    id: CreationOptional<string>;
    journal_id: ForeignKey<Journal["id"]> | uuid;
    sjr: number;
    snip: number;
    citeScore: number;
    year: number;
    trackScore: number;
    trackYear: number;
  }
}
