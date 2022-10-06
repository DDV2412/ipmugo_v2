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
    photo_profile?: string;
    email: string;
    password: string;
    google_scholar?: string;
    scopus_id?: string;
    orcid?: string;
    biograph?: string;
    affiliation?: string;
    verified?: string;
    created_at?: CreationOptional<Date>;
    updated_at?: CreationOptional<Date>;
    Interests: NonAttribute<Interest[]>;
    Roles: NonAttribute<Role[]>;
    Articles: NonAttribute<Article[]>;
    Journals: NonAttribute<Journal[]>;
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
    created_at?: CreationOptional<Date>;
    updated_at?: CreationOptional<Date>;
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
    author_id: ForeignKey<User["id"]>;
    article_id: ForeignKey<Article["id"]>;
  }

  export interface EditorInJournal
    extends Model<
      InferAttributes<EditorInJournal>,
      InferCreationAttributes<EditorInJournal>
    > {
    id: CreationOptional<string>;
    editor_id: ForeignKey<User["id"]>;
    journal_id: ForeignKey<Journal["id"]>;
  }

  export interface Role
    extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
    id: CreationOptional<string>;
    role_name: string;
  }

  export interface UserRole
    extends Model<
      InferAttributes<UserRole>,
      InferCreationAttributes<UserRole>
    > {
    id: CreationOptional<string>;
    user_id: ForeignKey<User["id"]>;
    role_id: ForeignKey<Role["id"]>;
  }
}
