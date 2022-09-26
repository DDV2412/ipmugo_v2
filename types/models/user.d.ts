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
import { journal } from "./journal";
import Interest = journal.Interest;
import Article = journal.Article;
import Journal = journal.Journal;

export namespace user {
  export interface User
    extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    id: CreationOptional<string>;
    salutation?: string;
    username: string;
    name: string;
    photoProfile: string;
    email: string;
    password: string;
    googleScholar?: string;
    scopusId?: string;
    orcid?: string;
    biograph?: string;
    affiliation?: string;
    verified?: string;
    Interests: NonAttribute<Interest[]>;
  }

  export interface UserInterst
    extends Model<
      InferAttributes<UserInterst>,
      InferCreationAttributes<UserInterst>
    > {
    id: CreationOptional<string>;
    user_id: ForeignKey<User["id"]>;
    interest_id: ForeignKey<Interest["id"]>;
  }

  export interface Bookmark
    extends Model<
      InferAttributes<Bookmark>,
      InferCreationAttributes<Bookmark>
    > {
    id: CreationOptional<string>;
    user_id: ForeignKey<User["id"]>;
    article_id: ForeignKey<Article["id"]>;
  }

  export interface ScholarProfile
    extends Model<
      InferAttributes<ScholarProfile>,
      InferCreationAttributes<ScholarProfile>
    > {
    id: CreationOptional<string>;
    user_id: ForeignKey<User["id"]>;
    document_count: number;
    h_index: number;
    i10_index: number;
  }

  export interface ScholarStatistic
    extends Model<
      InferAttributes<ScholarStatistic>,
      InferCreationAttributes<ScholarStatistic>
    > {
    id: CreationOptional<string>;
    scholar_profile_id: ForeignKey<ScholarProfile["id"]>;
    count: number;
    year: number;
  }

  export interface ScholarCOAuthor
    extends Model<
      InferAttributes<ScholarCOAuthor>,
      InferCreationAttributes<ScholarCOAuthor>
    > {
    id: CreationOptional<string>;
    scholar_profile_id: ForeignKey<ScholarProfile["id"]>;
    name: string;
    email?: string;
    affiliation?: string;
  }

  export interface AuthorATArticle
    extends Model<
      InferAttributes<AuthorATArticle>,
      InferCreationAttributes<AuthorATArticle>
    > {
    id: CreationOptional<string>;
    userId: ForeignKey<User["id"]>;
    articleId: ForeignKey<Article["id"]>;
  }

  export interface EditorInJournal
    extends Model<
      InferAttributes<EditorInJournal>,
      InferCreationAttributes<EditorInJournal>
    > {
    id: CreationOptional<string>;
    userId: ForeignKey<User["id"]>;
    journalId: ForeignKey<Journal["id"]>;
  }
}
