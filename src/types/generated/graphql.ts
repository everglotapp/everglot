import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * A point in time as described by the [ISO
   * 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
   */
  Datetime: any;
  /** A universally unique identifier as defined by [RFC 4122](https://tools.ietf.org/html/rfc4122). */
  UUID: any;
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: any;
  /** A JavaScript object encoded in the JSON format as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID'];
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** Reads and enables pagination through a set of `LanguageSkillLevel`. */
  languageSkillLevels?: Maybe<LanguageSkillLevelsConnection>;
  /** Reads and enables pagination through a set of `Language`. */
  languages?: Maybe<LanguagesConnection>;
  /** Reads and enables pagination through a set of `Pgmigration`. */
  pgmigrations?: Maybe<PgmigrationsConnection>;
  /** Reads and enables pagination through a set of `UserLanguage`. */
  userLanguages?: Maybe<UserLanguagesConnection>;
  /** Reads and enables pagination through a set of `UserSession`. */
  userSessions?: Maybe<UserSessionsConnection>;
  /** Reads and enables pagination through a set of `User`. */
  users?: Maybe<UsersConnection>;
  languageSkillLevel?: Maybe<LanguageSkillLevel>;
  language?: Maybe<Language>;
  languageByAlpha2?: Maybe<Language>;
  languageByEnglishName?: Maybe<Language>;
  pgmigration?: Maybe<Pgmigration>;
  userLanguage?: Maybe<UserLanguage>;
  userSession?: Maybe<UserSession>;
  user?: Maybe<User>;
  userByEmail?: Maybe<User>;
  userByUuid?: Maybe<User>;
  /** Reads a single `LanguageSkillLevel` using its globally unique `ID`. */
  languageSkillLevelByNodeId?: Maybe<LanguageSkillLevel>;
  /** Reads a single `Language` using its globally unique `ID`. */
  languageByNodeId?: Maybe<Language>;
  /** Reads a single `Pgmigration` using its globally unique `ID`. */
  pgmigrationByNodeId?: Maybe<Pgmigration>;
  /** Reads a single `UserLanguage` using its globally unique `ID`. */
  userLanguageByNodeId?: Maybe<UserLanguage>;
  /** Reads a single `UserSession` using its globally unique `ID`. */
  userSessionByNodeId?: Maybe<UserSession>;
  /** Reads a single `User` using its globally unique `ID`. */
  userByNodeId?: Maybe<User>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryLanguageSkillLevelsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<LanguageSkillLevelsOrderBy>>;
  condition?: Maybe<LanguageSkillLevelCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryLanguagesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<LanguagesOrderBy>>;
  condition?: Maybe<LanguageCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryPgmigrationsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PgmigrationsOrderBy>>;
  condition?: Maybe<PgmigrationCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUserLanguagesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UserLanguagesOrderBy>>;
  condition?: Maybe<UserLanguageCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUserSessionsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UserSessionsOrderBy>>;
  condition?: Maybe<UserSessionCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUsersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryLanguageSkillLevelArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryLanguageArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryLanguageByAlpha2Args = {
  alpha2: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryLanguageByEnglishNameArgs = {
  englishName: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPgmigrationArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserLanguageArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserSessionArgs = {
  sid: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserByEmailArgs = {
  email: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserByUuidArgs = {
  uuid: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryLanguageSkillLevelByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryLanguageByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPgmigrationByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserLanguageByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserSessionByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserByNodeIdArgs = {
  nodeId: Scalars['ID'];
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
};

/** A connection to a list of `LanguageSkillLevel` values. */
export type LanguageSkillLevelsConnection = {
  __typename?: 'LanguageSkillLevelsConnection';
  /** A list of `LanguageSkillLevel` objects. */
  nodes: Array<Maybe<LanguageSkillLevel>>;
  /** A list of edges which contains the `LanguageSkillLevel` and cursor to aid in pagination. */
  edges: Array<LanguageSkillLevelsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `LanguageSkillLevel` you could get from the connection. */
  totalCount: Scalars['Int'];
};

export type LanguageSkillLevel = Node & {
  __typename?: 'LanguageSkillLevel';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  /** Reads and enables pagination through a set of `UserLanguage`. */
  userLanguages: UserLanguagesConnection;
};


export type LanguageSkillLevelUserLanguagesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UserLanguagesOrderBy>>;
  condition?: Maybe<UserLanguageCondition>;
};

/** A connection to a list of `UserLanguage` values. */
export type UserLanguagesConnection = {
  __typename?: 'UserLanguagesConnection';
  /** A list of `UserLanguage` objects. */
  nodes: Array<Maybe<UserLanguage>>;
  /** A list of edges which contains the `UserLanguage` and cursor to aid in pagination. */
  edges: Array<UserLanguagesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `UserLanguage` you could get from the connection. */
  totalCount: Scalars['Int'];
};

export type UserLanguage = Node & {
  __typename?: 'UserLanguage';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  userId: Scalars['Int'];
  languageId: Scalars['Int'];
  languageSkillLevelId?: Maybe<Scalars['Int']>;
  native: Scalars['Boolean'];
  createdAt: Scalars['Datetime'];
  /** Reads a single `User` that is related to this `UserLanguage`. */
  user?: Maybe<User>;
  /** Reads a single `Language` that is related to this `UserLanguage`. */
  language?: Maybe<Language>;
  /** Reads a single `LanguageSkillLevel` that is related to this `UserLanguage`. */
  languageSkillLevel?: Maybe<LanguageSkillLevel>;
};


export type User = Node & {
  __typename?: 'User';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  username?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  unconfirmedEmail?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  bio: Scalars['String'];
  lastActiveAt: Scalars['Datetime'];
  createdAt: Scalars['Datetime'];
  passwordHash: Scalars['String'];
  uuid: Scalars['UUID'];
  /** Reads and enables pagination through a set of `UserLanguage`. */
  userLanguages: UserLanguagesConnection;
};


export type UserUserLanguagesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UserLanguagesOrderBy>>;
  condition?: Maybe<UserLanguageCondition>;
};



/** Methods to use when ordering `UserLanguage`. */
export enum UserLanguagesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC',
  LanguageIdAsc = 'LANGUAGE_ID_ASC',
  LanguageIdDesc = 'LANGUAGE_ID_DESC',
  LanguageSkillLevelIdAsc = 'LANGUAGE_SKILL_LEVEL_ID_ASC',
  LanguageSkillLevelIdDesc = 'LANGUAGE_SKILL_LEVEL_ID_DESC',
  NativeAsc = 'NATIVE_ASC',
  NativeDesc = 'NATIVE_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/**
 * A condition to be used against `UserLanguage` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type UserLanguageCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `languageId` field. */
  languageId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `languageSkillLevelId` field. */
  languageSkillLevelId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `native` field. */
  native?: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
};

export type Language = Node & {
  __typename?: 'Language';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  /** ISO 3166-1 alpha-2 standardized code */
  alpha2: Scalars['String'];
  englishName: Scalars['String'];
  createdAt: Scalars['Datetime'];
  /** Reads and enables pagination through a set of `UserLanguage`. */
  userLanguages: UserLanguagesConnection;
};


export type LanguageUserLanguagesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UserLanguagesOrderBy>>;
  condition?: Maybe<UserLanguageCondition>;
};

/** A `UserLanguage` edge in the connection. */
export type UserLanguagesEdge = {
  __typename?: 'UserLanguagesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `UserLanguage` at the end of the edge. */
  node?: Maybe<UserLanguage>;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']>;
};

/** A `LanguageSkillLevel` edge in the connection. */
export type LanguageSkillLevelsEdge = {
  __typename?: 'LanguageSkillLevelsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `LanguageSkillLevel` at the end of the edge. */
  node?: Maybe<LanguageSkillLevel>;
};

/** Methods to use when ordering `LanguageSkillLevel`. */
export enum LanguageSkillLevelsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/**
 * A condition to be used against `LanguageSkillLevel` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type LanguageSkillLevelCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<Scalars['String']>;
};

/** A connection to a list of `Language` values. */
export type LanguagesConnection = {
  __typename?: 'LanguagesConnection';
  /** A list of `Language` objects. */
  nodes: Array<Maybe<Language>>;
  /** A list of edges which contains the `Language` and cursor to aid in pagination. */
  edges: Array<LanguagesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Language` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Language` edge in the connection. */
export type LanguagesEdge = {
  __typename?: 'LanguagesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Language` at the end of the edge. */
  node?: Maybe<Language>;
};

/** Methods to use when ordering `Language`. */
export enum LanguagesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Alpha2Asc = 'ALPHA2_ASC',
  Alpha2Desc = 'ALPHA2_DESC',
  EnglishNameAsc = 'ENGLISH_NAME_ASC',
  EnglishNameDesc = 'ENGLISH_NAME_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/**
 * A condition to be used against `Language` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type LanguageCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `alpha2` field. */
  alpha2?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `englishName` field. */
  englishName?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `Pgmigration` values. */
export type PgmigrationsConnection = {
  __typename?: 'PgmigrationsConnection';
  /** A list of `Pgmigration` objects. */
  nodes: Array<Maybe<Pgmigration>>;
  /** A list of edges which contains the `Pgmigration` and cursor to aid in pagination. */
  edges: Array<PgmigrationsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Pgmigration` you could get from the connection. */
  totalCount: Scalars['Int'];
};

export type Pgmigration = Node & {
  __typename?: 'Pgmigration';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  name: Scalars['String'];
  runOn: Scalars['Datetime'];
};

/** A `Pgmigration` edge in the connection. */
export type PgmigrationsEdge = {
  __typename?: 'PgmigrationsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Pgmigration` at the end of the edge. */
  node?: Maybe<Pgmigration>;
};

/** Methods to use when ordering `Pgmigration`. */
export enum PgmigrationsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  RunOnAsc = 'RUN_ON_ASC',
  RunOnDesc = 'RUN_ON_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/**
 * A condition to be used against `Pgmigration` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type PgmigrationCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `runOn` field. */
  runOn?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `UserSession` values. */
export type UserSessionsConnection = {
  __typename?: 'UserSessionsConnection';
  /** A list of `UserSession` objects. */
  nodes: Array<Maybe<UserSession>>;
  /** A list of edges which contains the `UserSession` and cursor to aid in pagination. */
  edges: Array<UserSessionsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `UserSession` you could get from the connection. */
  totalCount: Scalars['Int'];
};

export type UserSession = Node & {
  __typename?: 'UserSession';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  sid: Scalars['String'];
  sess: Scalars['JSON'];
  expire: Scalars['Datetime'];
};


/** A `UserSession` edge in the connection. */
export type UserSessionsEdge = {
  __typename?: 'UserSessionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `UserSession` at the end of the edge. */
  node?: Maybe<UserSession>;
};

/** Methods to use when ordering `UserSession`. */
export enum UserSessionsOrderBy {
  Natural = 'NATURAL',
  SidAsc = 'SID_ASC',
  SidDesc = 'SID_DESC',
  SessAsc = 'SESS_ASC',
  SessDesc = 'SESS_DESC',
  ExpireAsc = 'EXPIRE_ASC',
  ExpireDesc = 'EXPIRE_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/**
 * A condition to be used against `UserSession` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type UserSessionCondition = {
  /** Checks for equality with the object’s `sid` field. */
  sid?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `sess` field. */
  sess?: Maybe<Scalars['JSON']>;
  /** Checks for equality with the object’s `expire` field. */
  expire?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `User` values. */
export type UsersConnection = {
  __typename?: 'UsersConnection';
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** A list of edges which contains the `User` and cursor to aid in pagination. */
  edges: Array<UsersEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection. */
export type UsersEdge = {
  __typename?: 'UsersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
};

/** Methods to use when ordering `User`. */
export enum UsersOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UsernameAsc = 'USERNAME_ASC',
  UsernameDesc = 'USERNAME_DESC',
  EmailAsc = 'EMAIL_ASC',
  EmailDesc = 'EMAIL_DESC',
  UnconfirmedEmailAsc = 'UNCONFIRMED_EMAIL_ASC',
  UnconfirmedEmailDesc = 'UNCONFIRMED_EMAIL_DESC',
  GenderAsc = 'GENDER_ASC',
  GenderDesc = 'GENDER_DESC',
  BioAsc = 'BIO_ASC',
  BioDesc = 'BIO_DESC',
  LastActiveAtAsc = 'LAST_ACTIVE_AT_ASC',
  LastActiveAtDesc = 'LAST_ACTIVE_AT_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PasswordHashAsc = 'PASSWORD_HASH_ASC',
  PasswordHashDesc = 'PASSWORD_HASH_DESC',
  UuidAsc = 'UUID_ASC',
  UuidDesc = 'UUID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** A condition to be used against `User` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type UserCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `username` field. */
  username?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `email` field. */
  email?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `unconfirmedEmail` field. */
  unconfirmedEmail?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `gender` field. */
  gender?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `bio` field. */
  bio?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `lastActiveAt` field. */
  lastActiveAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `passwordHash` field. */
  passwordHash?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `uuid` field. */
  uuid?: Maybe<Scalars['UUID']>;
};

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a single `LanguageSkillLevel`. */
  createLanguageSkillLevel?: Maybe<CreateLanguageSkillLevelPayload>;
  /** Creates a single `Language`. */
  createLanguage?: Maybe<CreateLanguagePayload>;
  /** Creates a single `Pgmigration`. */
  createPgmigration?: Maybe<CreatePgmigrationPayload>;
  /** Creates a single `UserLanguage`. */
  createUserLanguage?: Maybe<CreateUserLanguagePayload>;
  /** Creates a single `UserSession`. */
  createUserSession?: Maybe<CreateUserSessionPayload>;
  /** Creates a single `User`. */
  createUser?: Maybe<CreateUserPayload>;
  /** Updates a single `LanguageSkillLevel` using its globally unique id and a patch. */
  updateLanguageSkillLevelByNodeId?: Maybe<UpdateLanguageSkillLevelPayload>;
  /** Updates a single `LanguageSkillLevel` using a unique key and a patch. */
  updateLanguageSkillLevel?: Maybe<UpdateLanguageSkillLevelPayload>;
  /** Updates a single `Language` using its globally unique id and a patch. */
  updateLanguageByNodeId?: Maybe<UpdateLanguagePayload>;
  /** Updates a single `Language` using a unique key and a patch. */
  updateLanguage?: Maybe<UpdateLanguagePayload>;
  /** Updates a single `Language` using a unique key and a patch. */
  updateLanguageByAlpha2?: Maybe<UpdateLanguagePayload>;
  /** Updates a single `Language` using a unique key and a patch. */
  updateLanguageByEnglishName?: Maybe<UpdateLanguagePayload>;
  /** Updates a single `Pgmigration` using its globally unique id and a patch. */
  updatePgmigrationByNodeId?: Maybe<UpdatePgmigrationPayload>;
  /** Updates a single `Pgmigration` using a unique key and a patch. */
  updatePgmigration?: Maybe<UpdatePgmigrationPayload>;
  /** Updates a single `UserLanguage` using its globally unique id and a patch. */
  updateUserLanguageByNodeId?: Maybe<UpdateUserLanguagePayload>;
  /** Updates a single `UserLanguage` using a unique key and a patch. */
  updateUserLanguage?: Maybe<UpdateUserLanguagePayload>;
  /** Updates a single `UserSession` using its globally unique id and a patch. */
  updateUserSessionByNodeId?: Maybe<UpdateUserSessionPayload>;
  /** Updates a single `UserSession` using a unique key and a patch. */
  updateUserSession?: Maybe<UpdateUserSessionPayload>;
  /** Updates a single `User` using its globally unique id and a patch. */
  updateUserByNodeId?: Maybe<UpdateUserPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUser?: Maybe<UpdateUserPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUserByEmail?: Maybe<UpdateUserPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUserByUuid?: Maybe<UpdateUserPayload>;
  /** Deletes a single `LanguageSkillLevel` using its globally unique id. */
  deleteLanguageSkillLevelByNodeId?: Maybe<DeleteLanguageSkillLevelPayload>;
  /** Deletes a single `LanguageSkillLevel` using a unique key. */
  deleteLanguageSkillLevel?: Maybe<DeleteLanguageSkillLevelPayload>;
  /** Deletes a single `Language` using its globally unique id. */
  deleteLanguageByNodeId?: Maybe<DeleteLanguagePayload>;
  /** Deletes a single `Language` using a unique key. */
  deleteLanguage?: Maybe<DeleteLanguagePayload>;
  /** Deletes a single `Language` using a unique key. */
  deleteLanguageByAlpha2?: Maybe<DeleteLanguagePayload>;
  /** Deletes a single `Language` using a unique key. */
  deleteLanguageByEnglishName?: Maybe<DeleteLanguagePayload>;
  /** Deletes a single `Pgmigration` using its globally unique id. */
  deletePgmigrationByNodeId?: Maybe<DeletePgmigrationPayload>;
  /** Deletes a single `Pgmigration` using a unique key. */
  deletePgmigration?: Maybe<DeletePgmigrationPayload>;
  /** Deletes a single `UserLanguage` using its globally unique id. */
  deleteUserLanguageByNodeId?: Maybe<DeleteUserLanguagePayload>;
  /** Deletes a single `UserLanguage` using a unique key. */
  deleteUserLanguage?: Maybe<DeleteUserLanguagePayload>;
  /** Deletes a single `UserSession` using its globally unique id. */
  deleteUserSessionByNodeId?: Maybe<DeleteUserSessionPayload>;
  /** Deletes a single `UserSession` using a unique key. */
  deleteUserSession?: Maybe<DeleteUserSessionPayload>;
  /** Deletes a single `User` using its globally unique id. */
  deleteUserByNodeId?: Maybe<DeleteUserPayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUser?: Maybe<DeleteUserPayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUserByEmail?: Maybe<DeleteUserPayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUserByUuid?: Maybe<DeleteUserPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateLanguageSkillLevelArgs = {
  input: CreateLanguageSkillLevelInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateLanguageArgs = {
  input: CreateLanguageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePgmigrationArgs = {
  input: CreatePgmigrationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserLanguageArgs = {
  input: CreateUserLanguageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserSessionArgs = {
  input: CreateUserSessionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateLanguageSkillLevelByNodeIdArgs = {
  input: UpdateLanguageSkillLevelByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateLanguageSkillLevelArgs = {
  input: UpdateLanguageSkillLevelInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateLanguageByNodeIdArgs = {
  input: UpdateLanguageByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateLanguageArgs = {
  input: UpdateLanguageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateLanguageByAlpha2Args = {
  input: UpdateLanguageByAlpha2Input;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateLanguageByEnglishNameArgs = {
  input: UpdateLanguageByEnglishNameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePgmigrationByNodeIdArgs = {
  input: UpdatePgmigrationByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePgmigrationArgs = {
  input: UpdatePgmigrationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserLanguageByNodeIdArgs = {
  input: UpdateUserLanguageByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserLanguageArgs = {
  input: UpdateUserLanguageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserSessionByNodeIdArgs = {
  input: UpdateUserSessionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserSessionArgs = {
  input: UpdateUserSessionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserByNodeIdArgs = {
  input: UpdateUserByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserByEmailArgs = {
  input: UpdateUserByEmailInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserByUuidArgs = {
  input: UpdateUserByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteLanguageSkillLevelByNodeIdArgs = {
  input: DeleteLanguageSkillLevelByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteLanguageSkillLevelArgs = {
  input: DeleteLanguageSkillLevelInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteLanguageByNodeIdArgs = {
  input: DeleteLanguageByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteLanguageArgs = {
  input: DeleteLanguageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteLanguageByAlpha2Args = {
  input: DeleteLanguageByAlpha2Input;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteLanguageByEnglishNameArgs = {
  input: DeleteLanguageByEnglishNameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePgmigrationByNodeIdArgs = {
  input: DeletePgmigrationByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePgmigrationArgs = {
  input: DeletePgmigrationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserLanguageByNodeIdArgs = {
  input: DeleteUserLanguageByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserLanguageArgs = {
  input: DeleteUserLanguageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserSessionByNodeIdArgs = {
  input: DeleteUserSessionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserSessionArgs = {
  input: DeleteUserSessionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserByNodeIdArgs = {
  input: DeleteUserByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserByEmailArgs = {
  input: DeleteUserByEmailInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserByUuidArgs = {
  input: DeleteUserByUuidInput;
};

/** The output of our create `LanguageSkillLevel` mutation. */
export type CreateLanguageSkillLevelPayload = {
  __typename?: 'CreateLanguageSkillLevelPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `LanguageSkillLevel` that was created by this mutation. */
  languageSkillLevel?: Maybe<LanguageSkillLevel>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `LanguageSkillLevel`. May be used by Relay 1. */
  languageSkillLevelEdge?: Maybe<LanguageSkillLevelsEdge>;
};


/** The output of our create `LanguageSkillLevel` mutation. */
export type CreateLanguageSkillLevelPayloadLanguageSkillLevelEdgeArgs = {
  orderBy?: Maybe<Array<LanguageSkillLevelsOrderBy>>;
};

/** All input for the create `LanguageSkillLevel` mutation. */
export type CreateLanguageSkillLevelInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `LanguageSkillLevel` to be created by this mutation. */
  languageSkillLevel: LanguageSkillLevelInput;
};

/** An input for mutations affecting `LanguageSkillLevel` */
export type LanguageSkillLevelInput = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** The output of our create `Language` mutation. */
export type CreateLanguagePayload = {
  __typename?: 'CreateLanguagePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Language` that was created by this mutation. */
  language?: Maybe<Language>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Language`. May be used by Relay 1. */
  languageEdge?: Maybe<LanguagesEdge>;
};


/** The output of our create `Language` mutation. */
export type CreateLanguagePayloadLanguageEdgeArgs = {
  orderBy?: Maybe<Array<LanguagesOrderBy>>;
};

/** All input for the create `Language` mutation. */
export type CreateLanguageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Language` to be created by this mutation. */
  language: LanguageInput;
};

/** An input for mutations affecting `Language` */
export type LanguageInput = {
  id?: Maybe<Scalars['Int']>;
  /** ISO 3166-1 alpha-2 standardized code */
  alpha2: Scalars['String'];
  englishName: Scalars['String'];
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** The output of our create `Pgmigration` mutation. */
export type CreatePgmigrationPayload = {
  __typename?: 'CreatePgmigrationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Pgmigration` that was created by this mutation. */
  pgmigration?: Maybe<Pgmigration>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Pgmigration`. May be used by Relay 1. */
  pgmigrationEdge?: Maybe<PgmigrationsEdge>;
};


/** The output of our create `Pgmigration` mutation. */
export type CreatePgmigrationPayloadPgmigrationEdgeArgs = {
  orderBy?: Maybe<Array<PgmigrationsOrderBy>>;
};

/** All input for the create `Pgmigration` mutation. */
export type CreatePgmigrationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Pgmigration` to be created by this mutation. */
  pgmigration: PgmigrationInput;
};

/** An input for mutations affecting `Pgmigration` */
export type PgmigrationInput = {
  id?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  runOn: Scalars['Datetime'];
};

/** The output of our create `UserLanguage` mutation. */
export type CreateUserLanguagePayload = {
  __typename?: 'CreateUserLanguagePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserLanguage` that was created by this mutation. */
  userLanguage?: Maybe<UserLanguage>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `UserLanguage`. */
  user?: Maybe<User>;
  /** Reads a single `Language` that is related to this `UserLanguage`. */
  language?: Maybe<Language>;
  /** Reads a single `LanguageSkillLevel` that is related to this `UserLanguage`. */
  languageSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `UserLanguage`. May be used by Relay 1. */
  userLanguageEdge?: Maybe<UserLanguagesEdge>;
};


/** The output of our create `UserLanguage` mutation. */
export type CreateUserLanguagePayloadUserLanguageEdgeArgs = {
  orderBy?: Maybe<Array<UserLanguagesOrderBy>>;
};

/** All input for the create `UserLanguage` mutation. */
export type CreateUserLanguageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserLanguage` to be created by this mutation. */
  userLanguage: UserLanguageInput;
};

/** An input for mutations affecting `UserLanguage` */
export type UserLanguageInput = {
  id?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['Int']>;
  languageId?: Maybe<Scalars['Int']>;
  languageSkillLevelId?: Maybe<Scalars['Int']>;
  native?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** The output of our create `UserSession` mutation. */
export type CreateUserSessionPayload = {
  __typename?: 'CreateUserSessionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserSession` that was created by this mutation. */
  userSession?: Maybe<UserSession>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `UserSession`. May be used by Relay 1. */
  userSessionEdge?: Maybe<UserSessionsEdge>;
};


/** The output of our create `UserSession` mutation. */
export type CreateUserSessionPayloadUserSessionEdgeArgs = {
  orderBy?: Maybe<Array<UserSessionsOrderBy>>;
};

/** All input for the create `UserSession` mutation. */
export type CreateUserSessionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserSession` to be created by this mutation. */
  userSession: UserSessionInput;
};

/** An input for mutations affecting `UserSession` */
export type UserSessionInput = {
  sid: Scalars['String'];
  sess: Scalars['JSON'];
  expire: Scalars['Datetime'];
};

/** The output of our create `User` mutation. */
export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `User` that was created by this mutation. */
  user?: Maybe<User>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our create `User` mutation. */
export type CreateUserPayloadUserEdgeArgs = {
  orderBy?: Maybe<Array<UsersOrderBy>>;
};

/** All input for the create `User` mutation. */
export type CreateUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `User` to be created by this mutation. */
  user: UserInput;
};

/** An input for mutations affecting `User` */
export type UserInput = {
  id?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  unconfirmedEmail?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  lastActiveAt?: Maybe<Scalars['Datetime']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  passwordHash: Scalars['String'];
  uuid: Scalars['UUID'];
};

/** The output of our update `LanguageSkillLevel` mutation. */
export type UpdateLanguageSkillLevelPayload = {
  __typename?: 'UpdateLanguageSkillLevelPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `LanguageSkillLevel` that was updated by this mutation. */
  languageSkillLevel?: Maybe<LanguageSkillLevel>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `LanguageSkillLevel`. May be used by Relay 1. */
  languageSkillLevelEdge?: Maybe<LanguageSkillLevelsEdge>;
};


/** The output of our update `LanguageSkillLevel` mutation. */
export type UpdateLanguageSkillLevelPayloadLanguageSkillLevelEdgeArgs = {
  orderBy?: Maybe<Array<LanguageSkillLevelsOrderBy>>;
};

/** All input for the `updateLanguageSkillLevelByNodeId` mutation. */
export type UpdateLanguageSkillLevelByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `LanguageSkillLevel` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `LanguageSkillLevel` being updated. */
  patch: LanguageSkillLevelPatch;
};

/** Represents an update to a `LanguageSkillLevel`. Fields that are set will be updated. */
export type LanguageSkillLevelPatch = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** All input for the `updateLanguageSkillLevel` mutation. */
export type UpdateLanguageSkillLevelInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `LanguageSkillLevel` being updated. */
  patch: LanguageSkillLevelPatch;
  id: Scalars['Int'];
};

/** The output of our update `Language` mutation. */
export type UpdateLanguagePayload = {
  __typename?: 'UpdateLanguagePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Language` that was updated by this mutation. */
  language?: Maybe<Language>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Language`. May be used by Relay 1. */
  languageEdge?: Maybe<LanguagesEdge>;
};


/** The output of our update `Language` mutation. */
export type UpdateLanguagePayloadLanguageEdgeArgs = {
  orderBy?: Maybe<Array<LanguagesOrderBy>>;
};

/** All input for the `updateLanguageByNodeId` mutation. */
export type UpdateLanguageByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Language` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Language` being updated. */
  patch: LanguagePatch;
};

/** Represents an update to a `Language`. Fields that are set will be updated. */
export type LanguagePatch = {
  id?: Maybe<Scalars['Int']>;
  /** ISO 3166-1 alpha-2 standardized code */
  alpha2?: Maybe<Scalars['String']>;
  englishName?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** All input for the `updateLanguage` mutation. */
export type UpdateLanguageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Language` being updated. */
  patch: LanguagePatch;
  id: Scalars['Int'];
};

/** All input for the `updateLanguageByAlpha2` mutation. */
export type UpdateLanguageByAlpha2Input = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Language` being updated. */
  patch: LanguagePatch;
  /** ISO 3166-1 alpha-2 standardized code */
  alpha2: Scalars['String'];
};

/** All input for the `updateLanguageByEnglishName` mutation. */
export type UpdateLanguageByEnglishNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Language` being updated. */
  patch: LanguagePatch;
  englishName: Scalars['String'];
};

/** The output of our update `Pgmigration` mutation. */
export type UpdatePgmigrationPayload = {
  __typename?: 'UpdatePgmigrationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Pgmigration` that was updated by this mutation. */
  pgmigration?: Maybe<Pgmigration>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Pgmigration`. May be used by Relay 1. */
  pgmigrationEdge?: Maybe<PgmigrationsEdge>;
};


/** The output of our update `Pgmigration` mutation. */
export type UpdatePgmigrationPayloadPgmigrationEdgeArgs = {
  orderBy?: Maybe<Array<PgmigrationsOrderBy>>;
};

/** All input for the `updatePgmigrationByNodeId` mutation. */
export type UpdatePgmigrationByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Pgmigration` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Pgmigration` being updated. */
  patch: PgmigrationPatch;
};

/** Represents an update to a `Pgmigration`. Fields that are set will be updated. */
export type PgmigrationPatch = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  runOn?: Maybe<Scalars['Datetime']>;
};

/** All input for the `updatePgmigration` mutation. */
export type UpdatePgmigrationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Pgmigration` being updated. */
  patch: PgmigrationPatch;
  id: Scalars['Int'];
};

/** The output of our update `UserLanguage` mutation. */
export type UpdateUserLanguagePayload = {
  __typename?: 'UpdateUserLanguagePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserLanguage` that was updated by this mutation. */
  userLanguage?: Maybe<UserLanguage>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `UserLanguage`. */
  user?: Maybe<User>;
  /** Reads a single `Language` that is related to this `UserLanguage`. */
  language?: Maybe<Language>;
  /** Reads a single `LanguageSkillLevel` that is related to this `UserLanguage`. */
  languageSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `UserLanguage`. May be used by Relay 1. */
  userLanguageEdge?: Maybe<UserLanguagesEdge>;
};


/** The output of our update `UserLanguage` mutation. */
export type UpdateUserLanguagePayloadUserLanguageEdgeArgs = {
  orderBy?: Maybe<Array<UserLanguagesOrderBy>>;
};

/** All input for the `updateUserLanguageByNodeId` mutation. */
export type UpdateUserLanguageByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `UserLanguage` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `UserLanguage` being updated. */
  patch: UserLanguagePatch;
};

/** Represents an update to a `UserLanguage`. Fields that are set will be updated. */
export type UserLanguagePatch = {
  id?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['Int']>;
  languageId?: Maybe<Scalars['Int']>;
  languageSkillLevelId?: Maybe<Scalars['Int']>;
  native?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** All input for the `updateUserLanguage` mutation. */
export type UpdateUserLanguageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `UserLanguage` being updated. */
  patch: UserLanguagePatch;
  id: Scalars['Int'];
};

/** The output of our update `UserSession` mutation. */
export type UpdateUserSessionPayload = {
  __typename?: 'UpdateUserSessionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserSession` that was updated by this mutation. */
  userSession?: Maybe<UserSession>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `UserSession`. May be used by Relay 1. */
  userSessionEdge?: Maybe<UserSessionsEdge>;
};


/** The output of our update `UserSession` mutation. */
export type UpdateUserSessionPayloadUserSessionEdgeArgs = {
  orderBy?: Maybe<Array<UserSessionsOrderBy>>;
};

/** All input for the `updateUserSessionByNodeId` mutation. */
export type UpdateUserSessionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `UserSession` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `UserSession` being updated. */
  patch: UserSessionPatch;
};

/** Represents an update to a `UserSession`. Fields that are set will be updated. */
export type UserSessionPatch = {
  sid?: Maybe<Scalars['String']>;
  sess?: Maybe<Scalars['JSON']>;
  expire?: Maybe<Scalars['Datetime']>;
};

/** All input for the `updateUserSession` mutation. */
export type UpdateUserSessionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `UserSession` being updated. */
  patch: UserSessionPatch;
  sid: Scalars['String'];
};

/** The output of our update `User` mutation. */
export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `User` that was updated by this mutation. */
  user?: Maybe<User>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our update `User` mutation. */
export type UpdateUserPayloadUserEdgeArgs = {
  orderBy?: Maybe<Array<UsersOrderBy>>;
};

/** All input for the `updateUserByNodeId` mutation. */
export type UpdateUserByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `User` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch;
};

/** Represents an update to a `User`. Fields that are set will be updated. */
export type UserPatch = {
  id?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  unconfirmedEmail?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  lastActiveAt?: Maybe<Scalars['Datetime']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  passwordHash?: Maybe<Scalars['String']>;
  uuid?: Maybe<Scalars['UUID']>;
};

/** All input for the `updateUser` mutation. */
export type UpdateUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch;
  id: Scalars['Int'];
};

/** All input for the `updateUserByEmail` mutation. */
export type UpdateUserByEmailInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch;
  email: Scalars['String'];
};

/** All input for the `updateUserByUuid` mutation. */
export type UpdateUserByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch;
  uuid: Scalars['UUID'];
};

/** The output of our delete `LanguageSkillLevel` mutation. */
export type DeleteLanguageSkillLevelPayload = {
  __typename?: 'DeleteLanguageSkillLevelPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `LanguageSkillLevel` that was deleted by this mutation. */
  languageSkillLevel?: Maybe<LanguageSkillLevel>;
  deletedLanguageSkillLevelNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `LanguageSkillLevel`. May be used by Relay 1. */
  languageSkillLevelEdge?: Maybe<LanguageSkillLevelsEdge>;
};


/** The output of our delete `LanguageSkillLevel` mutation. */
export type DeleteLanguageSkillLevelPayloadLanguageSkillLevelEdgeArgs = {
  orderBy?: Maybe<Array<LanguageSkillLevelsOrderBy>>;
};

/** All input for the `deleteLanguageSkillLevelByNodeId` mutation. */
export type DeleteLanguageSkillLevelByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `LanguageSkillLevel` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteLanguageSkillLevel` mutation. */
export type DeleteLanguageSkillLevelInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `Language` mutation. */
export type DeleteLanguagePayload = {
  __typename?: 'DeleteLanguagePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Language` that was deleted by this mutation. */
  language?: Maybe<Language>;
  deletedLanguageNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Language`. May be used by Relay 1. */
  languageEdge?: Maybe<LanguagesEdge>;
};


/** The output of our delete `Language` mutation. */
export type DeleteLanguagePayloadLanguageEdgeArgs = {
  orderBy?: Maybe<Array<LanguagesOrderBy>>;
};

/** All input for the `deleteLanguageByNodeId` mutation. */
export type DeleteLanguageByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Language` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteLanguage` mutation. */
export type DeleteLanguageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** All input for the `deleteLanguageByAlpha2` mutation. */
export type DeleteLanguageByAlpha2Input = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** ISO 3166-1 alpha-2 standardized code */
  alpha2: Scalars['String'];
};

/** All input for the `deleteLanguageByEnglishName` mutation. */
export type DeleteLanguageByEnglishNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  englishName: Scalars['String'];
};

/** The output of our delete `Pgmigration` mutation. */
export type DeletePgmigrationPayload = {
  __typename?: 'DeletePgmigrationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Pgmigration` that was deleted by this mutation. */
  pgmigration?: Maybe<Pgmigration>;
  deletedPgmigrationNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Pgmigration`. May be used by Relay 1. */
  pgmigrationEdge?: Maybe<PgmigrationsEdge>;
};


/** The output of our delete `Pgmigration` mutation. */
export type DeletePgmigrationPayloadPgmigrationEdgeArgs = {
  orderBy?: Maybe<Array<PgmigrationsOrderBy>>;
};

/** All input for the `deletePgmigrationByNodeId` mutation. */
export type DeletePgmigrationByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Pgmigration` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePgmigration` mutation. */
export type DeletePgmigrationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `UserLanguage` mutation. */
export type DeleteUserLanguagePayload = {
  __typename?: 'DeleteUserLanguagePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserLanguage` that was deleted by this mutation. */
  userLanguage?: Maybe<UserLanguage>;
  deletedUserLanguageNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `UserLanguage`. */
  user?: Maybe<User>;
  /** Reads a single `Language` that is related to this `UserLanguage`. */
  language?: Maybe<Language>;
  /** Reads a single `LanguageSkillLevel` that is related to this `UserLanguage`. */
  languageSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `UserLanguage`. May be used by Relay 1. */
  userLanguageEdge?: Maybe<UserLanguagesEdge>;
};


/** The output of our delete `UserLanguage` mutation. */
export type DeleteUserLanguagePayloadUserLanguageEdgeArgs = {
  orderBy?: Maybe<Array<UserLanguagesOrderBy>>;
};

/** All input for the `deleteUserLanguageByNodeId` mutation. */
export type DeleteUserLanguageByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `UserLanguage` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteUserLanguage` mutation. */
export type DeleteUserLanguageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `UserSession` mutation. */
export type DeleteUserSessionPayload = {
  __typename?: 'DeleteUserSessionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserSession` that was deleted by this mutation. */
  userSession?: Maybe<UserSession>;
  deletedUserSessionNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `UserSession`. May be used by Relay 1. */
  userSessionEdge?: Maybe<UserSessionsEdge>;
};


/** The output of our delete `UserSession` mutation. */
export type DeleteUserSessionPayloadUserSessionEdgeArgs = {
  orderBy?: Maybe<Array<UserSessionsOrderBy>>;
};

/** All input for the `deleteUserSessionByNodeId` mutation. */
export type DeleteUserSessionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `UserSession` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteUserSession` mutation. */
export type DeleteUserSessionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  sid: Scalars['String'];
};

/** The output of our delete `User` mutation. */
export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `User` that was deleted by this mutation. */
  user?: Maybe<User>;
  deletedUserNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our delete `User` mutation. */
export type DeleteUserPayloadUserEdgeArgs = {
  orderBy?: Maybe<Array<UsersOrderBy>>;
};

/** All input for the `deleteUserByNodeId` mutation. */
export type DeleteUserByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `User` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteUser` mutation. */
export type DeleteUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** All input for the `deleteUserByEmail` mutation. */
export type DeleteUserByEmailInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  email: Scalars['String'];
};

/** All input for the `deleteUserByUuid` mutation. */
export type DeleteUserByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
};

export type LanguageCodeMappingsQueryVariables = Exact<{ [key: string]: never; }>;


export type LanguageCodeMappingsQuery = (
  { __typename?: 'Query' }
  & { languages?: Maybe<(
    { __typename?: 'LanguagesConnection' }
    & { nodes: Array<Maybe<(
      { __typename?: 'Language' }
      & Pick<Language, 'alpha2' | 'englishName'>
    )>> }
  )> }
);


export const LanguageCodeMappings = gql`
    query LanguageCodeMappings {
  languages {
    nodes {
      alpha2
      englishName
    }
  }
}
    `;