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
    verified?: date;
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
    user_id: ForeignKey<User["id"]> | uuid;
    interest_id: ForeignKey<Interest["id"]> | uuid;
  }

  export interface Bookmark
    extends Model<
      InferAttributes<Bookmark>,
      InferCreationAttributes<Bookmark>
    > {
    id: CreationOptional<string>;
    user_id: ForeignKey<User["id"]> | uuid;
    article_id: ForeignKey<Article["id"]> | uuid;
    created_at?: CreationOptional<Date>;
    updated_at?: CreationOptional<Date>;
  }

  export interface ScholarProfile
    extends Model<
      InferAttributes<ScholarProfile>,
      InferCreationAttributes<ScholarProfile>
    > {
    id: CreationOptional<string>;
    user_id: ForeignKey<User["id"]> | uuid;
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
    scholar_profile_id: ForeignKey<ScholarProfile["id"]> | uuid;
    count: number;
    year: number;
  }

  export interface ScholarCOAuthor
    extends Model<
      InferAttributes<ScholarCOAuthor>,
      InferCreationAttributes<ScholarCOAuthor>
    > {
    id: CreationOptional<string>;
    scholar_profile_id: ForeignKey<ScholarProfile["id"]> | uuid;
    name: string;
    affiliation?: string;
  }

  export interface AuthorATArticle
    extends Model<
      InferAttributes<AuthorATArticle>,
      InferCreationAttributes<AuthorATArticle>
    > {
    id: CreationOptional<string>;
    author_id: ForeignKey<User["id"]> | uuid;
    article_id: ForeignKey<Article["id"]> | uuid;
  }

  export interface EditorInJournal
    extends Model<
      InferAttributes<EditorInJournal>,
      InferCreationAttributes<EditorInJournal>
    > {
    id: CreationOptional<string>;
    editor_id: ForeignKey<User["id"]> | uuid;
    journal_id: ForeignKey<Journal["id"]> | uuid;
  }

  export interface Role
    extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
    id: CreationOptional<string>;
    role_name: string | any;
  }

  export interface ResetToken
    extends Model<
      InferAttributes<ResetToken>,
      InferCreationAttributes<ResetToken>
    > {
    id: CreationOptional<string>;
    email: string;
    expired: date;
    reset_token: string;
  }

  export interface UserRole
    extends Model<
      InferAttributes<UserRole>,
      InferCreationAttributes<UserRole>
    > {
    id: CreationOptional<string>;
    user_id: ForeignKey<User["id"]> | uuid;
    role_id: ForeignKey<Role["id"]> | uuid;
  }

  export interface Contact
    extends Model<InferAttributes<Contact>, InferCreationAttributes<Contact>> {
    id: CreationAttributes<string>;
    name: string;
    email: string;
    subject: string;
    message: text;
    created_at?: CreationOptional<Date>;
    updated_at?: CreationOptional<Date>;
  }

  export interface Subscription
    extends Model<
      InferAttributes<Subscription>,
      InferCreationAttributes<Subscription>
    > {
    id: CreationAttributes<string>;
    name: string;
    email: string;
    country: string;
    city: string;
    phone: string;
    created_at?: CreationOptional<Date>;
    updated_at?: CreationOptional<Date>;
  }
}
