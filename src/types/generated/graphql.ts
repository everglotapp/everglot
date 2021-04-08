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
  /** Reads and enables pagination through a set of `GroupUser`. */
  groupUsers?: Maybe<GroupUsersConnection>;
  /** Reads and enables pagination through a set of `Group`. */
  groups?: Maybe<GroupsConnection>;
  /** Reads and enables pagination through a set of `LanguageSkillLevel`. */
  languageSkillLevels?: Maybe<LanguageSkillLevelsConnection>;
  /** Reads and enables pagination through a set of `Language`. */
  languages?: Maybe<LanguagesConnection>;
  /** Reads and enables pagination through a set of `Message`. */
  messages?: Maybe<MessagesConnection>;
  /** Reads and enables pagination through a set of `UserLanguage`. */
  userLanguages?: Maybe<UserLanguagesConnection>;
  /** Reads and enables pagination through a set of `UserSession`. */
  userSessions?: Maybe<UserSessionsConnection>;
  /** Reads and enables pagination through a set of `User`. */
  users?: Maybe<UsersConnection>;
  groupUser?: Maybe<GroupUser>;
  group?: Maybe<Group>;
  groupByUuid?: Maybe<Group>;
  languageSkillLevel?: Maybe<LanguageSkillLevel>;
  language?: Maybe<Language>;
  languageByAlpha2?: Maybe<Language>;
  languageByEnglishName?: Maybe<Language>;
  message?: Maybe<Message>;
  messageByUuid?: Maybe<Message>;
  userLanguage?: Maybe<UserLanguage>;
  userSession?: Maybe<UserSession>;
  user?: Maybe<User>;
  userByEmail?: Maybe<User>;
  userByUuid?: Maybe<User>;
  currentUser?: Maybe<User>;
  currentUserId?: Maybe<Scalars['Int']>;
  groupIsGlobal?: Maybe<Scalars['Boolean']>;
  userIsInGroup?: Maybe<Scalars['Boolean']>;
  /** Reads and enables pagination through a set of `User`. */
  usersWithoutLearnerGroup?: Maybe<UsersConnection>;
  /** Reads and enables pagination through a set of `User`. */
  usersWithoutNativeGroup?: Maybe<UsersConnection>;
  /** Reads a single `GroupUser` using its globally unique `ID`. */
  groupUserByNodeId?: Maybe<GroupUser>;
  /** Reads a single `Group` using its globally unique `ID`. */
  groupByNodeId?: Maybe<Group>;
  /** Reads a single `LanguageSkillLevel` using its globally unique `ID`. */
  languageSkillLevelByNodeId?: Maybe<LanguageSkillLevel>;
  /** Reads a single `Language` using its globally unique `ID`. */
  languageByNodeId?: Maybe<Language>;
  /** Reads a single `Message` using its globally unique `ID`. */
  messageByNodeId?: Maybe<Message>;
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
export type QueryGroupUsersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<GroupUsersOrderBy>>;
  condition?: Maybe<GroupUserCondition>;
  filter?: Maybe<GroupUserFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGroupsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<GroupsOrderBy>>;
  condition?: Maybe<GroupCondition>;
  filter?: Maybe<GroupFilter>;
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
  filter?: Maybe<LanguageSkillLevelFilter>;
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
  filter?: Maybe<LanguageFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryMessagesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MessagesOrderBy>>;
  condition?: Maybe<MessageCondition>;
  filter?: Maybe<MessageFilter>;
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
  filter?: Maybe<UserLanguageFilter>;
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
  filter?: Maybe<UserSessionFilter>;
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
  filter?: Maybe<UserFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGroupUserArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGroupArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGroupByUuidArgs = {
  uuid: Scalars['UUID'];
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
export type QueryMessageArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMessageByUuidArgs = {
  uuid: Scalars['UUID'];
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
export type QueryGroupIsGlobalArgs = {
  gid: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserIsInGroupArgs = {
  gid: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUsersWithoutLearnerGroupArgs = {
  lid?: Maybe<Scalars['Int']>;
  lsklid?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  filter?: Maybe<UserFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUsersWithoutNativeGroupArgs = {
  lid?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  filter?: Maybe<UserFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGroupUserByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGroupByNodeIdArgs = {
  nodeId: Scalars['ID'];
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
export type QueryMessageByNodeIdArgs = {
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

/** A connection to a list of `GroupUser` values. */
export type GroupUsersConnection = {
  __typename?: 'GroupUsersConnection';
  /** A list of `GroupUser` objects. */
  nodes: Array<Maybe<GroupUser>>;
  /** A list of edges which contains the `GroupUser` and cursor to aid in pagination. */
  edges: Array<GroupUsersEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `GroupUser` you could get from the connection. */
  totalCount: Scalars['Int'];
};

export type GroupUser = Node & {
  __typename?: 'GroupUser';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  userId: Scalars['Int'];
  groupId: Scalars['Int'];
  userType: UserType;
  joinedOn: Scalars['Datetime'];
  lastActive?: Maybe<Scalars['Datetime']>;
  /** Reads a single `User` that is related to this `GroupUser`. */
  user?: Maybe<User>;
  /** Reads a single `Group` that is related to this `GroupUser`. */
  group?: Maybe<Group>;
};

export enum UserType {
  Learner = 'LEARNER',
  Native = 'NATIVE',
  Global = 'GLOBAL'
}


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
  passwordHash?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
  avatarUrl?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['Int']>;
  googleId?: Maybe<Scalars['String']>;
  /** Reads a single `Language` that is related to this `User`. */
  languageByLocale?: Maybe<Language>;
  /** Reads and enables pagination through a set of `UserLanguage`. */
  userLanguages: UserLanguagesConnection;
  /** Reads and enables pagination through a set of `GroupUser`. */
  groupUsers: GroupUsersConnection;
  /** Reads and enables pagination through a set of `Message`. */
  messagesBySenderId: MessagesConnection;
  /** Reads and enables pagination through a set of `Message`. */
  messagesByRecipientId: MessagesConnection;
  /** Reads and enables pagination through a set of `Language`. */
  languagesByUserLanguageUserIdAndLanguageId: UserLanguagesByUserLanguageUserIdAndLanguageIdManyToManyConnection;
  /** Reads and enables pagination through a set of `LanguageSkillLevel`. */
  languageSkillLevelsByUserLanguageUserIdAndLanguageSkillLevelId: UserLanguageSkillLevelsByUserLanguageUserIdAndLanguageSkillLevelIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Group`. */
  groupsByGroupUserUserIdAndGroupId: UserGroupsByGroupUserUserIdAndGroupIdManyToManyConnection;
  /** Reads and enables pagination through a set of `User`. */
  usersByMessageSenderIdAndRecipientId: UserUsersByMessageSenderIdAndRecipientIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Group`. */
  groupsByMessageSenderIdAndRecipientGroupId: UserGroupsByMessageSenderIdAndRecipientGroupIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Message`. */
  messagesByMessageSenderIdAndParentMessageId: UserMessagesByMessageSenderIdAndParentMessageIdManyToManyConnection;
  /** Reads and enables pagination through a set of `User`. */
  usersByMessageRecipientIdAndSenderId: UserUsersByMessageRecipientIdAndSenderIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Group`. */
  groupsByMessageRecipientIdAndRecipientGroupId: UserGroupsByMessageRecipientIdAndRecipientGroupIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Message`. */
  messagesByMessageRecipientIdAndParentMessageId: UserMessagesByMessageRecipientIdAndParentMessageIdManyToManyConnection;
};


export type UserUserLanguagesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UserLanguagesOrderBy>>;
  condition?: Maybe<UserLanguageCondition>;
  filter?: Maybe<UserLanguageFilter>;
};


export type UserGroupUsersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<GroupUsersOrderBy>>;
  condition?: Maybe<GroupUserCondition>;
  filter?: Maybe<GroupUserFilter>;
};


export type UserMessagesBySenderIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MessagesOrderBy>>;
  condition?: Maybe<MessageCondition>;
  filter?: Maybe<MessageFilter>;
};


export type UserMessagesByRecipientIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MessagesOrderBy>>;
  condition?: Maybe<MessageCondition>;
  filter?: Maybe<MessageFilter>;
};


export type UserLanguagesByUserLanguageUserIdAndLanguageIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<LanguagesOrderBy>>;
  condition?: Maybe<LanguageCondition>;
  filter?: Maybe<LanguageFilter>;
};


export type UserLanguageSkillLevelsByUserLanguageUserIdAndLanguageSkillLevelIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<LanguageSkillLevelsOrderBy>>;
  condition?: Maybe<LanguageSkillLevelCondition>;
  filter?: Maybe<LanguageSkillLevelFilter>;
};


export type UserGroupsByGroupUserUserIdAndGroupIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<GroupsOrderBy>>;
  condition?: Maybe<GroupCondition>;
  filter?: Maybe<GroupFilter>;
};


export type UserUsersByMessageSenderIdAndRecipientIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
  filter?: Maybe<UserFilter>;
};


export type UserGroupsByMessageSenderIdAndRecipientGroupIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<GroupsOrderBy>>;
  condition?: Maybe<GroupCondition>;
  filter?: Maybe<GroupFilter>;
};


export type UserMessagesByMessageSenderIdAndParentMessageIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MessagesOrderBy>>;
  condition?: Maybe<MessageCondition>;
  filter?: Maybe<MessageFilter>;
};


export type UserUsersByMessageRecipientIdAndSenderIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
  filter?: Maybe<UserFilter>;
};


export type UserGroupsByMessageRecipientIdAndRecipientGroupIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<GroupsOrderBy>>;
  condition?: Maybe<GroupCondition>;
  filter?: Maybe<GroupFilter>;
};


export type UserMessagesByMessageRecipientIdAndParentMessageIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MessagesOrderBy>>;
  condition?: Maybe<MessageCondition>;
  filter?: Maybe<MessageFilter>;
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
  /** Reads and enables pagination through a set of `User`. */
  usersByLocale: UsersConnection;
  /** Reads and enables pagination through a set of `UserLanguage`. */
  userLanguages: UserLanguagesConnection;
  /** Reads and enables pagination through a set of `Group`. */
  groups: GroupsConnection;
  /** Reads and enables pagination through a set of `User`. */
  usersByUserLanguageLanguageIdAndUserId: LanguageUsersByUserLanguageLanguageIdAndUserIdManyToManyConnection;
  /** Reads and enables pagination through a set of `LanguageSkillLevel`. */
  languageSkillLevelsByUserLanguageLanguageIdAndLanguageSkillLevelId: LanguageLanguageSkillLevelsByUserLanguageLanguageIdAndLanguageSkillLevelIdManyToManyConnection;
  /** Reads and enables pagination through a set of `LanguageSkillLevel`. */
  languageSkillLevelsByGroupLanguageIdAndLanguageSkillLevelId: LanguageLanguageSkillLevelsByGroupLanguageIdAndLanguageSkillLevelIdManyToManyConnection;
};


export type LanguageUsersByLocaleArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
  filter?: Maybe<UserFilter>;
};


export type LanguageUserLanguagesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UserLanguagesOrderBy>>;
  condition?: Maybe<UserLanguageCondition>;
  filter?: Maybe<UserLanguageFilter>;
};


export type LanguageGroupsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<GroupsOrderBy>>;
  condition?: Maybe<GroupCondition>;
  filter?: Maybe<GroupFilter>;
};


export type LanguageUsersByUserLanguageLanguageIdAndUserIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
  filter?: Maybe<UserFilter>;
};


export type LanguageLanguageSkillLevelsByUserLanguageLanguageIdAndLanguageSkillLevelIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<LanguageSkillLevelsOrderBy>>;
  condition?: Maybe<LanguageSkillLevelCondition>;
  filter?: Maybe<LanguageSkillLevelFilter>;
};


export type LanguageLanguageSkillLevelsByGroupLanguageIdAndLanguageSkillLevelIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<LanguageSkillLevelsOrderBy>>;
  condition?: Maybe<LanguageSkillLevelCondition>;
  filter?: Maybe<LanguageSkillLevelFilter>;
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
  AvatarUrlAsc = 'AVATAR_URL_ASC',
  AvatarUrlDesc = 'AVATAR_URL_DESC',
  LocaleAsc = 'LOCALE_ASC',
  LocaleDesc = 'LOCALE_DESC',
  GoogleIdAsc = 'GOOGLE_ID_ASC',
  GoogleIdDesc = 'GOOGLE_ID_DESC',
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
  /** Checks for equality with the object’s `avatarUrl` field. */
  avatarUrl?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `locale` field. */
  locale?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `googleId` field. */
  googleId?: Maybe<Scalars['String']>;
};

/** A filter to be used against `User` object types. All fields are combined with a logical ‘and.’ */
export type UserFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `username` field. */
  username?: Maybe<StringFilter>;
  /** Filter by the object’s `email` field. */
  email?: Maybe<StringFilter>;
  /** Filter by the object’s `unconfirmedEmail` field. */
  unconfirmedEmail?: Maybe<StringFilter>;
  /** Filter by the object’s `gender` field. */
  gender?: Maybe<StringFilter>;
  /** Filter by the object’s `bio` field. */
  bio?: Maybe<StringFilter>;
  /** Filter by the object’s `lastActiveAt` field. */
  lastActiveAt?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `passwordHash` field. */
  passwordHash?: Maybe<StringFilter>;
  /** Filter by the object’s `uuid` field. */
  uuid?: Maybe<UuidFilter>;
  /** Filter by the object’s `avatarUrl` field. */
  avatarUrl?: Maybe<StringFilter>;
  /** Filter by the object’s `locale` field. */
  locale?: Maybe<IntFilter>;
  /** Filter by the object’s `googleId` field. */
  googleId?: Maybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<UserFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<UserFilter>>;
  /** Negates the expression. */
  not?: Maybe<UserFilter>;
};

/** A filter to be used against Int fields. All fields are combined with a logical ‘and.’ */
export type IntFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['Int']>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['Int']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['Int']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['Int']>;
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['Int']>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['Int']>>;
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['Int']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['Int']>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['Int']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['Int']>;
};

/** A filter to be used against String fields. All fields are combined with a logical ‘and.’ */
export type StringFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['String']>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['String']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['String']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['String']>;
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['String']>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['String']>>;
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['String']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['String']>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['String']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['String']>;
  /** Contains the specified string (case-sensitive). */
  includes?: Maybe<Scalars['String']>;
  /** Does not contain the specified string (case-sensitive). */
  notIncludes?: Maybe<Scalars['String']>;
  /** Contains the specified string (case-insensitive). */
  includesInsensitive?: Maybe<Scalars['String']>;
  /** Does not contain the specified string (case-insensitive). */
  notIncludesInsensitive?: Maybe<Scalars['String']>;
  /** Starts with the specified string (case-sensitive). */
  startsWith?: Maybe<Scalars['String']>;
  /** Does not start with the specified string (case-sensitive). */
  notStartsWith?: Maybe<Scalars['String']>;
  /** Starts with the specified string (case-insensitive). */
  startsWithInsensitive?: Maybe<Scalars['String']>;
  /** Does not start with the specified string (case-insensitive). */
  notStartsWithInsensitive?: Maybe<Scalars['String']>;
  /** Ends with the specified string (case-sensitive). */
  endsWith?: Maybe<Scalars['String']>;
  /** Does not end with the specified string (case-sensitive). */
  notEndsWith?: Maybe<Scalars['String']>;
  /** Ends with the specified string (case-insensitive). */
  endsWithInsensitive?: Maybe<Scalars['String']>;
  /** Does not end with the specified string (case-insensitive). */
  notEndsWithInsensitive?: Maybe<Scalars['String']>;
  /** Matches the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  like?: Maybe<Scalars['String']>;
  /** Does not match the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLike?: Maybe<Scalars['String']>;
  /** Matches the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  likeInsensitive?: Maybe<Scalars['String']>;
  /** Does not match the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLikeInsensitive?: Maybe<Scalars['String']>;
  /** Equal to the specified value (case-insensitive). */
  equalToInsensitive?: Maybe<Scalars['String']>;
  /** Not equal to the specified value (case-insensitive). */
  notEqualToInsensitive?: Maybe<Scalars['String']>;
  /** Not equal to the specified value, treating null like an ordinary value (case-insensitive). */
  distinctFromInsensitive?: Maybe<Scalars['String']>;
  /** Equal to the specified value, treating null like an ordinary value (case-insensitive). */
  notDistinctFromInsensitive?: Maybe<Scalars['String']>;
  /** Included in the specified list (case-insensitive). */
  inInsensitive?: Maybe<Array<Scalars['String']>>;
  /** Not included in the specified list (case-insensitive). */
  notInInsensitive?: Maybe<Array<Scalars['String']>>;
  /** Less than the specified value (case-insensitive). */
  lessThanInsensitive?: Maybe<Scalars['String']>;
  /** Less than or equal to the specified value (case-insensitive). */
  lessThanOrEqualToInsensitive?: Maybe<Scalars['String']>;
  /** Greater than the specified value (case-insensitive). */
  greaterThanInsensitive?: Maybe<Scalars['String']>;
  /** Greater than or equal to the specified value (case-insensitive). */
  greaterThanOrEqualToInsensitive?: Maybe<Scalars['String']>;
};

/** A filter to be used against Datetime fields. All fields are combined with a logical ‘and.’ */
export type DatetimeFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['Datetime']>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['Datetime']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['Datetime']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['Datetime']>;
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['Datetime']>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['Datetime']>>;
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['Datetime']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['Datetime']>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['Datetime']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against UUID fields. All fields are combined with a logical ‘and.’ */
export type UuidFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['UUID']>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['UUID']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['UUID']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['UUID']>;
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['UUID']>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['UUID']>>;
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['UUID']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['UUID']>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['UUID']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['UUID']>;
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

export type LanguageSkillLevel = Node & {
  __typename?: 'LanguageSkillLevel';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  /** Reads and enables pagination through a set of `UserLanguage`. */
  userLanguages: UserLanguagesConnection;
  /** Reads and enables pagination through a set of `Group`. */
  groups: GroupsConnection;
  /** Reads and enables pagination through a set of `User`. */
  usersByUserLanguageLanguageSkillLevelIdAndUserId: LanguageSkillLevelUsersByUserLanguageLanguageSkillLevelIdAndUserIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Language`. */
  languagesByUserLanguageLanguageSkillLevelIdAndLanguageId: LanguageSkillLevelLanguagesByUserLanguageLanguageSkillLevelIdAndLanguageIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Language`. */
  languagesByGroupLanguageSkillLevelIdAndLanguageId: LanguageSkillLevelLanguagesByGroupLanguageSkillLevelIdAndLanguageIdManyToManyConnection;
};


export type LanguageSkillLevelUserLanguagesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UserLanguagesOrderBy>>;
  condition?: Maybe<UserLanguageCondition>;
  filter?: Maybe<UserLanguageFilter>;
};


export type LanguageSkillLevelGroupsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<GroupsOrderBy>>;
  condition?: Maybe<GroupCondition>;
  filter?: Maybe<GroupFilter>;
};


export type LanguageSkillLevelUsersByUserLanguageLanguageSkillLevelIdAndUserIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
  filter?: Maybe<UserFilter>;
};


export type LanguageSkillLevelLanguagesByUserLanguageLanguageSkillLevelIdAndLanguageIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<LanguagesOrderBy>>;
  condition?: Maybe<LanguageCondition>;
  filter?: Maybe<LanguageFilter>;
};


export type LanguageSkillLevelLanguagesByGroupLanguageSkillLevelIdAndLanguageIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<LanguagesOrderBy>>;
  condition?: Maybe<LanguageCondition>;
  filter?: Maybe<LanguageFilter>;
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

/** A filter to be used against `UserLanguage` object types. All fields are combined with a logical ‘and.’ */
export type UserLanguageFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `userId` field. */
  userId?: Maybe<IntFilter>;
  /** Filter by the object’s `languageId` field. */
  languageId?: Maybe<IntFilter>;
  /** Filter by the object’s `languageSkillLevelId` field. */
  languageSkillLevelId?: Maybe<IntFilter>;
  /** Filter by the object’s `native` field. */
  native?: Maybe<BooleanFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<UserLanguageFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<UserLanguageFilter>>;
  /** Negates the expression. */
  not?: Maybe<UserLanguageFilter>;
};

/** A filter to be used against Boolean fields. All fields are combined with a logical ‘and.’ */
export type BooleanFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['Boolean']>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['Boolean']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['Boolean']>;
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['Boolean']>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['Boolean']>>;
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['Boolean']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['Boolean']>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['Boolean']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['Boolean']>;
};

/** A connection to a list of `Group` values. */
export type GroupsConnection = {
  __typename?: 'GroupsConnection';
  /** A list of `Group` objects. */
  nodes: Array<Maybe<Group>>;
  /** A list of edges which contains the `Group` and cursor to aid in pagination. */
  edges: Array<GroupsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Group` you could get from the connection. */
  totalCount: Scalars['Int'];
};

export type Group = Node & {
  __typename?: 'Group';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  groupName?: Maybe<Scalars['String']>;
  global: Scalars['Boolean'];
  languageId: Scalars['Int'];
  languageSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['Datetime'];
  uuid: Scalars['UUID'];
  /** Reads a single `Language` that is related to this `Group`. */
  language?: Maybe<Language>;
  /** Reads a single `LanguageSkillLevel` that is related to this `Group`. */
  languageSkillLevel?: Maybe<LanguageSkillLevel>;
  /** Reads and enables pagination through a set of `GroupUser`. */
  groupUsers: GroupUsersConnection;
  /** Reads and enables pagination through a set of `Message`. */
  messagesByRecipientGroupId: MessagesConnection;
  /** Reads and enables pagination through a set of `User`. */
  usersByGroupUserGroupIdAndUserId: GroupUsersByGroupUserGroupIdAndUserIdManyToManyConnection;
  /** Reads and enables pagination through a set of `User`. */
  usersByMessageRecipientGroupIdAndSenderId: GroupUsersByMessageRecipientGroupIdAndSenderIdManyToManyConnection;
  /** Reads and enables pagination through a set of `User`. */
  usersByMessageRecipientGroupIdAndRecipientId: GroupUsersByMessageRecipientGroupIdAndRecipientIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Message`. */
  messagesByMessageRecipientGroupIdAndParentMessageId: GroupMessagesByMessageRecipientGroupIdAndParentMessageIdManyToManyConnection;
};


export type GroupGroupUsersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<GroupUsersOrderBy>>;
  condition?: Maybe<GroupUserCondition>;
  filter?: Maybe<GroupUserFilter>;
};


export type GroupMessagesByRecipientGroupIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MessagesOrderBy>>;
  condition?: Maybe<MessageCondition>;
  filter?: Maybe<MessageFilter>;
};


export type GroupUsersByGroupUserGroupIdAndUserIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
  filter?: Maybe<UserFilter>;
};


export type GroupUsersByMessageRecipientGroupIdAndSenderIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
  filter?: Maybe<UserFilter>;
};


export type GroupUsersByMessageRecipientGroupIdAndRecipientIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
  filter?: Maybe<UserFilter>;
};


export type GroupMessagesByMessageRecipientGroupIdAndParentMessageIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MessagesOrderBy>>;
  condition?: Maybe<MessageCondition>;
  filter?: Maybe<MessageFilter>;
};

/** Methods to use when ordering `GroupUser`. */
export enum GroupUsersOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC',
  GroupIdAsc = 'GROUP_ID_ASC',
  GroupIdDesc = 'GROUP_ID_DESC',
  UserTypeAsc = 'USER_TYPE_ASC',
  UserTypeDesc = 'USER_TYPE_DESC',
  JoinedOnAsc = 'JOINED_ON_ASC',
  JoinedOnDesc = 'JOINED_ON_DESC',
  LastActiveAsc = 'LAST_ACTIVE_ASC',
  LastActiveDesc = 'LAST_ACTIVE_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/**
 * A condition to be used against `GroupUser` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type GroupUserCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `groupId` field. */
  groupId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `userType` field. */
  userType?: Maybe<UserType>;
  /** Checks for equality with the object’s `joinedOn` field. */
  joinedOn?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `lastActive` field. */
  lastActive?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `GroupUser` object types. All fields are combined with a logical ‘and.’ */
export type GroupUserFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `userId` field. */
  userId?: Maybe<IntFilter>;
  /** Filter by the object’s `groupId` field. */
  groupId?: Maybe<IntFilter>;
  /** Filter by the object’s `userType` field. */
  userType?: Maybe<UserTypeFilter>;
  /** Filter by the object’s `joinedOn` field. */
  joinedOn?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `lastActive` field. */
  lastActive?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<GroupUserFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<GroupUserFilter>>;
  /** Negates the expression. */
  not?: Maybe<GroupUserFilter>;
};

/** A filter to be used against UserType fields. All fields are combined with a logical ‘and.’ */
export type UserTypeFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<UserType>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<UserType>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<UserType>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<UserType>;
  /** Included in the specified list. */
  in?: Maybe<Array<UserType>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<UserType>>;
  /** Less than the specified value. */
  lessThan?: Maybe<UserType>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<UserType>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<UserType>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<UserType>;
};

/** A connection to a list of `Message` values. */
export type MessagesConnection = {
  __typename?: 'MessagesConnection';
  /** A list of `Message` objects. */
  nodes: Array<Maybe<Message>>;
  /** A list of edges which contains the `Message` and cursor to aid in pagination. */
  edges: Array<MessagesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Message` you could get from the connection. */
  totalCount: Scalars['Int'];
};

export type Message = Node & {
  __typename?: 'Message';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  uuid: Scalars['UUID'];
  senderId?: Maybe<Scalars['Int']>;
  recipientId?: Maybe<Scalars['Int']>;
  recipientGroupId?: Maybe<Scalars['Int']>;
  body: Scalars['String'];
  parentMessageId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['Datetime'];
  /** Reads a single `User` that is related to this `Message`. */
  sender?: Maybe<User>;
  /** Reads a single `User` that is related to this `Message`. */
  recipient?: Maybe<User>;
  /** Reads a single `Group` that is related to this `Message`. */
  recipientGroup?: Maybe<Group>;
  /** Reads a single `Message` that is related to this `Message`. */
  parentMessage?: Maybe<Message>;
  /** Reads and enables pagination through a set of `Message`. */
  messagesByParentMessageId: MessagesConnection;
  /** Reads and enables pagination through a set of `User`. */
  usersByMessageParentMessageIdAndSenderId: MessageUsersByMessageParentMessageIdAndSenderIdManyToManyConnection;
  /** Reads and enables pagination through a set of `User`. */
  usersByMessageParentMessageIdAndRecipientId: MessageUsersByMessageParentMessageIdAndRecipientIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Group`. */
  groupsByMessageParentMessageIdAndRecipientGroupId: MessageGroupsByMessageParentMessageIdAndRecipientGroupIdManyToManyConnection;
};


export type MessageMessagesByParentMessageIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MessagesOrderBy>>;
  condition?: Maybe<MessageCondition>;
  filter?: Maybe<MessageFilter>;
};


export type MessageUsersByMessageParentMessageIdAndSenderIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
  filter?: Maybe<UserFilter>;
};


export type MessageUsersByMessageParentMessageIdAndRecipientIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
  filter?: Maybe<UserFilter>;
};


export type MessageGroupsByMessageParentMessageIdAndRecipientGroupIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<GroupsOrderBy>>;
  condition?: Maybe<GroupCondition>;
  filter?: Maybe<GroupFilter>;
};

/** Methods to use when ordering `Message`. */
export enum MessagesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UuidAsc = 'UUID_ASC',
  UuidDesc = 'UUID_DESC',
  SenderIdAsc = 'SENDER_ID_ASC',
  SenderIdDesc = 'SENDER_ID_DESC',
  RecipientIdAsc = 'RECIPIENT_ID_ASC',
  RecipientIdDesc = 'RECIPIENT_ID_DESC',
  RecipientGroupIdAsc = 'RECIPIENT_GROUP_ID_ASC',
  RecipientGroupIdDesc = 'RECIPIENT_GROUP_ID_DESC',
  BodyAsc = 'BODY_ASC',
  BodyDesc = 'BODY_DESC',
  ParentMessageIdAsc = 'PARENT_MESSAGE_ID_ASC',
  ParentMessageIdDesc = 'PARENT_MESSAGE_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** A condition to be used against `Message` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type MessageCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `uuid` field. */
  uuid?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `senderId` field. */
  senderId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `recipientId` field. */
  recipientId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `recipientGroupId` field. */
  recipientGroupId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `body` field. */
  body?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `parentMessageId` field. */
  parentMessageId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `Message` object types. All fields are combined with a logical ‘and.’ */
export type MessageFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `uuid` field. */
  uuid?: Maybe<UuidFilter>;
  /** Filter by the object’s `senderId` field. */
  senderId?: Maybe<IntFilter>;
  /** Filter by the object’s `recipientId` field. */
  recipientId?: Maybe<IntFilter>;
  /** Filter by the object’s `recipientGroupId` field. */
  recipientGroupId?: Maybe<IntFilter>;
  /** Filter by the object’s `body` field. */
  body?: Maybe<StringFilter>;
  /** Filter by the object’s `parentMessageId` field. */
  parentMessageId?: Maybe<IntFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<MessageFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<MessageFilter>>;
  /** Negates the expression. */
  not?: Maybe<MessageFilter>;
};

/** A connection to a list of `User` values, with data from `Message`. */
export type MessageUsersByMessageParentMessageIdAndSenderIdManyToManyConnection = {
  __typename?: 'MessageUsersByMessageParentMessageIdAndSenderIdManyToManyConnection';
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** A list of edges which contains the `User`, info from the `Message`, and the cursor to aid in pagination. */
  edges: Array<MessageUsersByMessageParentMessageIdAndSenderIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection, with data from `Message`. */
export type MessageUsersByMessageParentMessageIdAndSenderIdManyToManyEdge = {
  __typename?: 'MessageUsersByMessageParentMessageIdAndSenderIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
  /** Reads and enables pagination through a set of `Message`. */
  messagesBySenderId: MessagesConnection;
};


/** A `User` edge in the connection, with data from `Message`. */
export type MessageUsersByMessageParentMessageIdAndSenderIdManyToManyEdgeMessagesBySenderIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MessagesOrderBy>>;
  condition?: Maybe<MessageCondition>;
  filter?: Maybe<MessageFilter>;
};

/** A connection to a list of `User` values, with data from `Message`. */
export type MessageUsersByMessageParentMessageIdAndRecipientIdManyToManyConnection = {
  __typename?: 'MessageUsersByMessageParentMessageIdAndRecipientIdManyToManyConnection';
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** A list of edges which contains the `User`, info from the `Message`, and the cursor to aid in pagination. */
  edges: Array<MessageUsersByMessageParentMessageIdAndRecipientIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection, with data from `Message`. */
export type MessageUsersByMessageParentMessageIdAndRecipientIdManyToManyEdge = {
  __typename?: 'MessageUsersByMessageParentMessageIdAndRecipientIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
  /** Reads and enables pagination through a set of `Message`. */
  messagesByRecipientId: MessagesConnection;
};


/** A `User` edge in the connection, with data from `Message`. */
export type MessageUsersByMessageParentMessageIdAndRecipientIdManyToManyEdgeMessagesByRecipientIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MessagesOrderBy>>;
  condition?: Maybe<MessageCondition>;
  filter?: Maybe<MessageFilter>;
};

/** A connection to a list of `Group` values, with data from `Message`. */
export type MessageGroupsByMessageParentMessageIdAndRecipientGroupIdManyToManyConnection = {
  __typename?: 'MessageGroupsByMessageParentMessageIdAndRecipientGroupIdManyToManyConnection';
  /** A list of `Group` objects. */
  nodes: Array<Maybe<Group>>;
  /** A list of edges which contains the `Group`, info from the `Message`, and the cursor to aid in pagination. */
  edges: Array<MessageGroupsByMessageParentMessageIdAndRecipientGroupIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Group` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Group` edge in the connection, with data from `Message`. */
export type MessageGroupsByMessageParentMessageIdAndRecipientGroupIdManyToManyEdge = {
  __typename?: 'MessageGroupsByMessageParentMessageIdAndRecipientGroupIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Group` at the end of the edge. */
  node?: Maybe<Group>;
  /** Reads and enables pagination through a set of `Message`. */
  messagesByRecipientGroupId: MessagesConnection;
};


/** A `Group` edge in the connection, with data from `Message`. */
export type MessageGroupsByMessageParentMessageIdAndRecipientGroupIdManyToManyEdgeMessagesByRecipientGroupIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MessagesOrderBy>>;
  condition?: Maybe<MessageCondition>;
  filter?: Maybe<MessageFilter>;
};

/** Methods to use when ordering `Group`. */
export enum GroupsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  GroupNameAsc = 'GROUP_NAME_ASC',
  GroupNameDesc = 'GROUP_NAME_DESC',
  GlobalAsc = 'GLOBAL_ASC',
  GlobalDesc = 'GLOBAL_DESC',
  LanguageIdAsc = 'LANGUAGE_ID_ASC',
  LanguageIdDesc = 'LANGUAGE_ID_DESC',
  LanguageSkillLevelIdAsc = 'LANGUAGE_SKILL_LEVEL_ID_ASC',
  LanguageSkillLevelIdDesc = 'LANGUAGE_SKILL_LEVEL_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UuidAsc = 'UUID_ASC',
  UuidDesc = 'UUID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** A condition to be used against `Group` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type GroupCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `groupName` field. */
  groupName?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `global` field. */
  global?: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `languageId` field. */
  languageId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `languageSkillLevelId` field. */
  languageSkillLevelId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `uuid` field. */
  uuid?: Maybe<Scalars['UUID']>;
};

/** A filter to be used against `Group` object types. All fields are combined with a logical ‘and.’ */
export type GroupFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `groupName` field. */
  groupName?: Maybe<StringFilter>;
  /** Filter by the object’s `global` field. */
  global?: Maybe<BooleanFilter>;
  /** Filter by the object’s `languageId` field. */
  languageId?: Maybe<IntFilter>;
  /** Filter by the object’s `languageSkillLevelId` field. */
  languageSkillLevelId?: Maybe<IntFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `uuid` field. */
  uuid?: Maybe<UuidFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<GroupFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<GroupFilter>>;
  /** Negates the expression. */
  not?: Maybe<GroupFilter>;
};

/** A `Message` edge in the connection. */
export type MessagesEdge = {
  __typename?: 'MessagesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Message` at the end of the edge. */
  node?: Maybe<Message>;
};

/** A connection to a list of `User` values, with data from `GroupUser`. */
export type GroupUsersByGroupUserGroupIdAndUserIdManyToManyConnection = {
  __typename?: 'GroupUsersByGroupUserGroupIdAndUserIdManyToManyConnection';
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** A list of edges which contains the `User`, info from the `GroupUser`, and the cursor to aid in pagination. */
  edges: Array<GroupUsersByGroupUserGroupIdAndUserIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection, with data from `GroupUser`. */
export type GroupUsersByGroupUserGroupIdAndUserIdManyToManyEdge = {
  __typename?: 'GroupUsersByGroupUserGroupIdAndUserIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
  /** Reads and enables pagination through a set of `GroupUser`. */
  groupUsers: GroupUsersConnection;
};


/** A `User` edge in the connection, with data from `GroupUser`. */
export type GroupUsersByGroupUserGroupIdAndUserIdManyToManyEdgeGroupUsersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<GroupUsersOrderBy>>;
  condition?: Maybe<GroupUserCondition>;
  filter?: Maybe<GroupUserFilter>;
};

/** A connection to a list of `User` values, with data from `Message`. */
export type GroupUsersByMessageRecipientGroupIdAndSenderIdManyToManyConnection = {
  __typename?: 'GroupUsersByMessageRecipientGroupIdAndSenderIdManyToManyConnection';
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** A list of edges which contains the `User`, info from the `Message`, and the cursor to aid in pagination. */
  edges: Array<GroupUsersByMessageRecipientGroupIdAndSenderIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection, with data from `Message`. */
export type GroupUsersByMessageRecipientGroupIdAndSenderIdManyToManyEdge = {
  __typename?: 'GroupUsersByMessageRecipientGroupIdAndSenderIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
  /** Reads and enables pagination through a set of `Message`. */
  messagesBySenderId: MessagesConnection;
};


/** A `User` edge in the connection, with data from `Message`. */
export type GroupUsersByMessageRecipientGroupIdAndSenderIdManyToManyEdgeMessagesBySenderIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MessagesOrderBy>>;
  condition?: Maybe<MessageCondition>;
  filter?: Maybe<MessageFilter>;
};

/** A connection to a list of `User` values, with data from `Message`. */
export type GroupUsersByMessageRecipientGroupIdAndRecipientIdManyToManyConnection = {
  __typename?: 'GroupUsersByMessageRecipientGroupIdAndRecipientIdManyToManyConnection';
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** A list of edges which contains the `User`, info from the `Message`, and the cursor to aid in pagination. */
  edges: Array<GroupUsersByMessageRecipientGroupIdAndRecipientIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection, with data from `Message`. */
export type GroupUsersByMessageRecipientGroupIdAndRecipientIdManyToManyEdge = {
  __typename?: 'GroupUsersByMessageRecipientGroupIdAndRecipientIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
  /** Reads and enables pagination through a set of `Message`. */
  messagesByRecipientId: MessagesConnection;
};


/** A `User` edge in the connection, with data from `Message`. */
export type GroupUsersByMessageRecipientGroupIdAndRecipientIdManyToManyEdgeMessagesByRecipientIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MessagesOrderBy>>;
  condition?: Maybe<MessageCondition>;
  filter?: Maybe<MessageFilter>;
};

/** A connection to a list of `Message` values, with data from `Message`. */
export type GroupMessagesByMessageRecipientGroupIdAndParentMessageIdManyToManyConnection = {
  __typename?: 'GroupMessagesByMessageRecipientGroupIdAndParentMessageIdManyToManyConnection';
  /** A list of `Message` objects. */
  nodes: Array<Maybe<Message>>;
  /** A list of edges which contains the `Message`, info from the `Message`, and the cursor to aid in pagination. */
  edges: Array<GroupMessagesByMessageRecipientGroupIdAndParentMessageIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Message` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Message` edge in the connection, with data from `Message`. */
export type GroupMessagesByMessageRecipientGroupIdAndParentMessageIdManyToManyEdge = {
  __typename?: 'GroupMessagesByMessageRecipientGroupIdAndParentMessageIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Message` at the end of the edge. */
  node?: Maybe<Message>;
  /** Reads and enables pagination through a set of `Message`. */
  messagesByParentMessageId: MessagesConnection;
};


/** A `Message` edge in the connection, with data from `Message`. */
export type GroupMessagesByMessageRecipientGroupIdAndParentMessageIdManyToManyEdgeMessagesByParentMessageIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MessagesOrderBy>>;
  condition?: Maybe<MessageCondition>;
  filter?: Maybe<MessageFilter>;
};

/** A `Group` edge in the connection. */
export type GroupsEdge = {
  __typename?: 'GroupsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Group` at the end of the edge. */
  node?: Maybe<Group>;
};

/** A connection to a list of `User` values, with data from `UserLanguage`. */
export type LanguageSkillLevelUsersByUserLanguageLanguageSkillLevelIdAndUserIdManyToManyConnection = {
  __typename?: 'LanguageSkillLevelUsersByUserLanguageLanguageSkillLevelIdAndUserIdManyToManyConnection';
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** A list of edges which contains the `User`, info from the `UserLanguage`, and the cursor to aid in pagination. */
  edges: Array<LanguageSkillLevelUsersByUserLanguageLanguageSkillLevelIdAndUserIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection, with data from `UserLanguage`. */
export type LanguageSkillLevelUsersByUserLanguageLanguageSkillLevelIdAndUserIdManyToManyEdge = {
  __typename?: 'LanguageSkillLevelUsersByUserLanguageLanguageSkillLevelIdAndUserIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
  /** Reads and enables pagination through a set of `UserLanguage`. */
  userLanguages: UserLanguagesConnection;
};


/** A `User` edge in the connection, with data from `UserLanguage`. */
export type LanguageSkillLevelUsersByUserLanguageLanguageSkillLevelIdAndUserIdManyToManyEdgeUserLanguagesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UserLanguagesOrderBy>>;
  condition?: Maybe<UserLanguageCondition>;
  filter?: Maybe<UserLanguageFilter>;
};

/** A connection to a list of `Language` values, with data from `UserLanguage`. */
export type LanguageSkillLevelLanguagesByUserLanguageLanguageSkillLevelIdAndLanguageIdManyToManyConnection = {
  __typename?: 'LanguageSkillLevelLanguagesByUserLanguageLanguageSkillLevelIdAndLanguageIdManyToManyConnection';
  /** A list of `Language` objects. */
  nodes: Array<Maybe<Language>>;
  /** A list of edges which contains the `Language`, info from the `UserLanguage`, and the cursor to aid in pagination. */
  edges: Array<LanguageSkillLevelLanguagesByUserLanguageLanguageSkillLevelIdAndLanguageIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Language` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Language` edge in the connection, with data from `UserLanguage`. */
export type LanguageSkillLevelLanguagesByUserLanguageLanguageSkillLevelIdAndLanguageIdManyToManyEdge = {
  __typename?: 'LanguageSkillLevelLanguagesByUserLanguageLanguageSkillLevelIdAndLanguageIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Language` at the end of the edge. */
  node?: Maybe<Language>;
  /** Reads and enables pagination through a set of `UserLanguage`. */
  userLanguages: UserLanguagesConnection;
};


/** A `Language` edge in the connection, with data from `UserLanguage`. */
export type LanguageSkillLevelLanguagesByUserLanguageLanguageSkillLevelIdAndLanguageIdManyToManyEdgeUserLanguagesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UserLanguagesOrderBy>>;
  condition?: Maybe<UserLanguageCondition>;
  filter?: Maybe<UserLanguageFilter>;
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

/** A filter to be used against `Language` object types. All fields are combined with a logical ‘and.’ */
export type LanguageFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `alpha2` field. */
  alpha2?: Maybe<StringFilter>;
  /** Filter by the object’s `englishName` field. */
  englishName?: Maybe<StringFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<LanguageFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<LanguageFilter>>;
  /** Negates the expression. */
  not?: Maybe<LanguageFilter>;
};

/** A connection to a list of `Language` values, with data from `Group`. */
export type LanguageSkillLevelLanguagesByGroupLanguageSkillLevelIdAndLanguageIdManyToManyConnection = {
  __typename?: 'LanguageSkillLevelLanguagesByGroupLanguageSkillLevelIdAndLanguageIdManyToManyConnection';
  /** A list of `Language` objects. */
  nodes: Array<Maybe<Language>>;
  /** A list of edges which contains the `Language`, info from the `Group`, and the cursor to aid in pagination. */
  edges: Array<LanguageSkillLevelLanguagesByGroupLanguageSkillLevelIdAndLanguageIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Language` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Language` edge in the connection, with data from `Group`. */
export type LanguageSkillLevelLanguagesByGroupLanguageSkillLevelIdAndLanguageIdManyToManyEdge = {
  __typename?: 'LanguageSkillLevelLanguagesByGroupLanguageSkillLevelIdAndLanguageIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Language` at the end of the edge. */
  node?: Maybe<Language>;
  /** Reads and enables pagination through a set of `Group`. */
  groups: GroupsConnection;
};


/** A `Language` edge in the connection, with data from `Group`. */
export type LanguageSkillLevelLanguagesByGroupLanguageSkillLevelIdAndLanguageIdManyToManyEdgeGroupsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<GroupsOrderBy>>;
  condition?: Maybe<GroupCondition>;
  filter?: Maybe<GroupFilter>;
};

/** A `UserLanguage` edge in the connection. */
export type UserLanguagesEdge = {
  __typename?: 'UserLanguagesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `UserLanguage` at the end of the edge. */
  node?: Maybe<UserLanguage>;
};

/** A connection to a list of `User` values, with data from `UserLanguage`. */
export type LanguageUsersByUserLanguageLanguageIdAndUserIdManyToManyConnection = {
  __typename?: 'LanguageUsersByUserLanguageLanguageIdAndUserIdManyToManyConnection';
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** A list of edges which contains the `User`, info from the `UserLanguage`, and the cursor to aid in pagination. */
  edges: Array<LanguageUsersByUserLanguageLanguageIdAndUserIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection, with data from `UserLanguage`. */
export type LanguageUsersByUserLanguageLanguageIdAndUserIdManyToManyEdge = {
  __typename?: 'LanguageUsersByUserLanguageLanguageIdAndUserIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
  /** Reads and enables pagination through a set of `UserLanguage`. */
  userLanguages: UserLanguagesConnection;
};


/** A `User` edge in the connection, with data from `UserLanguage`. */
export type LanguageUsersByUserLanguageLanguageIdAndUserIdManyToManyEdgeUserLanguagesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UserLanguagesOrderBy>>;
  condition?: Maybe<UserLanguageCondition>;
  filter?: Maybe<UserLanguageFilter>;
};

/** A connection to a list of `LanguageSkillLevel` values, with data from `UserLanguage`. */
export type LanguageLanguageSkillLevelsByUserLanguageLanguageIdAndLanguageSkillLevelIdManyToManyConnection = {
  __typename?: 'LanguageLanguageSkillLevelsByUserLanguageLanguageIdAndLanguageSkillLevelIdManyToManyConnection';
  /** A list of `LanguageSkillLevel` objects. */
  nodes: Array<Maybe<LanguageSkillLevel>>;
  /** A list of edges which contains the `LanguageSkillLevel`, info from the `UserLanguage`, and the cursor to aid in pagination. */
  edges: Array<LanguageLanguageSkillLevelsByUserLanguageLanguageIdAndLanguageSkillLevelIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `LanguageSkillLevel` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `LanguageSkillLevel` edge in the connection, with data from `UserLanguage`. */
export type LanguageLanguageSkillLevelsByUserLanguageLanguageIdAndLanguageSkillLevelIdManyToManyEdge = {
  __typename?: 'LanguageLanguageSkillLevelsByUserLanguageLanguageIdAndLanguageSkillLevelIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `LanguageSkillLevel` at the end of the edge. */
  node?: Maybe<LanguageSkillLevel>;
  /** Reads and enables pagination through a set of `UserLanguage`. */
  userLanguages: UserLanguagesConnection;
};


/** A `LanguageSkillLevel` edge in the connection, with data from `UserLanguage`. */
export type LanguageLanguageSkillLevelsByUserLanguageLanguageIdAndLanguageSkillLevelIdManyToManyEdgeUserLanguagesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UserLanguagesOrderBy>>;
  condition?: Maybe<UserLanguageCondition>;
  filter?: Maybe<UserLanguageFilter>;
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

/** A filter to be used against `LanguageSkillLevel` object types. All fields are combined with a logical ‘and.’ */
export type LanguageSkillLevelFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<LanguageSkillLevelFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<LanguageSkillLevelFilter>>;
  /** Negates the expression. */
  not?: Maybe<LanguageSkillLevelFilter>;
};

/** A connection to a list of `LanguageSkillLevel` values, with data from `Group`. */
export type LanguageLanguageSkillLevelsByGroupLanguageIdAndLanguageSkillLevelIdManyToManyConnection = {
  __typename?: 'LanguageLanguageSkillLevelsByGroupLanguageIdAndLanguageSkillLevelIdManyToManyConnection';
  /** A list of `LanguageSkillLevel` objects. */
  nodes: Array<Maybe<LanguageSkillLevel>>;
  /** A list of edges which contains the `LanguageSkillLevel`, info from the `Group`, and the cursor to aid in pagination. */
  edges: Array<LanguageLanguageSkillLevelsByGroupLanguageIdAndLanguageSkillLevelIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `LanguageSkillLevel` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `LanguageSkillLevel` edge in the connection, with data from `Group`. */
export type LanguageLanguageSkillLevelsByGroupLanguageIdAndLanguageSkillLevelIdManyToManyEdge = {
  __typename?: 'LanguageLanguageSkillLevelsByGroupLanguageIdAndLanguageSkillLevelIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `LanguageSkillLevel` at the end of the edge. */
  node?: Maybe<LanguageSkillLevel>;
  /** Reads and enables pagination through a set of `Group`. */
  groups: GroupsConnection;
};


/** A `LanguageSkillLevel` edge in the connection, with data from `Group`. */
export type LanguageLanguageSkillLevelsByGroupLanguageIdAndLanguageSkillLevelIdManyToManyEdgeGroupsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<GroupsOrderBy>>;
  condition?: Maybe<GroupCondition>;
  filter?: Maybe<GroupFilter>;
};

/** A connection to a list of `Language` values, with data from `UserLanguage`. */
export type UserLanguagesByUserLanguageUserIdAndLanguageIdManyToManyConnection = {
  __typename?: 'UserLanguagesByUserLanguageUserIdAndLanguageIdManyToManyConnection';
  /** A list of `Language` objects. */
  nodes: Array<Maybe<Language>>;
  /** A list of edges which contains the `Language`, info from the `UserLanguage`, and the cursor to aid in pagination. */
  edges: Array<UserLanguagesByUserLanguageUserIdAndLanguageIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Language` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Language` edge in the connection, with data from `UserLanguage`. */
export type UserLanguagesByUserLanguageUserIdAndLanguageIdManyToManyEdge = {
  __typename?: 'UserLanguagesByUserLanguageUserIdAndLanguageIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Language` at the end of the edge. */
  node?: Maybe<Language>;
  /** Reads and enables pagination through a set of `UserLanguage`. */
  userLanguages: UserLanguagesConnection;
};


/** A `Language` edge in the connection, with data from `UserLanguage`. */
export type UserLanguagesByUserLanguageUserIdAndLanguageIdManyToManyEdgeUserLanguagesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UserLanguagesOrderBy>>;
  condition?: Maybe<UserLanguageCondition>;
  filter?: Maybe<UserLanguageFilter>;
};

/** A connection to a list of `LanguageSkillLevel` values, with data from `UserLanguage`. */
export type UserLanguageSkillLevelsByUserLanguageUserIdAndLanguageSkillLevelIdManyToManyConnection = {
  __typename?: 'UserLanguageSkillLevelsByUserLanguageUserIdAndLanguageSkillLevelIdManyToManyConnection';
  /** A list of `LanguageSkillLevel` objects. */
  nodes: Array<Maybe<LanguageSkillLevel>>;
  /** A list of edges which contains the `LanguageSkillLevel`, info from the `UserLanguage`, and the cursor to aid in pagination. */
  edges: Array<UserLanguageSkillLevelsByUserLanguageUserIdAndLanguageSkillLevelIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `LanguageSkillLevel` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `LanguageSkillLevel` edge in the connection, with data from `UserLanguage`. */
export type UserLanguageSkillLevelsByUserLanguageUserIdAndLanguageSkillLevelIdManyToManyEdge = {
  __typename?: 'UserLanguageSkillLevelsByUserLanguageUserIdAndLanguageSkillLevelIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `LanguageSkillLevel` at the end of the edge. */
  node?: Maybe<LanguageSkillLevel>;
  /** Reads and enables pagination through a set of `UserLanguage`. */
  userLanguages: UserLanguagesConnection;
};


/** A `LanguageSkillLevel` edge in the connection, with data from `UserLanguage`. */
export type UserLanguageSkillLevelsByUserLanguageUserIdAndLanguageSkillLevelIdManyToManyEdgeUserLanguagesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UserLanguagesOrderBy>>;
  condition?: Maybe<UserLanguageCondition>;
  filter?: Maybe<UserLanguageFilter>;
};

/** A connection to a list of `Group` values, with data from `GroupUser`. */
export type UserGroupsByGroupUserUserIdAndGroupIdManyToManyConnection = {
  __typename?: 'UserGroupsByGroupUserUserIdAndGroupIdManyToManyConnection';
  /** A list of `Group` objects. */
  nodes: Array<Maybe<Group>>;
  /** A list of edges which contains the `Group`, info from the `GroupUser`, and the cursor to aid in pagination. */
  edges: Array<UserGroupsByGroupUserUserIdAndGroupIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Group` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Group` edge in the connection, with data from `GroupUser`. */
export type UserGroupsByGroupUserUserIdAndGroupIdManyToManyEdge = {
  __typename?: 'UserGroupsByGroupUserUserIdAndGroupIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Group` at the end of the edge. */
  node?: Maybe<Group>;
  /** Reads and enables pagination through a set of `GroupUser`. */
  groupUsers: GroupUsersConnection;
};


/** A `Group` edge in the connection, with data from `GroupUser`. */
export type UserGroupsByGroupUserUserIdAndGroupIdManyToManyEdgeGroupUsersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<GroupUsersOrderBy>>;
  condition?: Maybe<GroupUserCondition>;
  filter?: Maybe<GroupUserFilter>;
};

/** A connection to a list of `User` values, with data from `Message`. */
export type UserUsersByMessageSenderIdAndRecipientIdManyToManyConnection = {
  __typename?: 'UserUsersByMessageSenderIdAndRecipientIdManyToManyConnection';
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** A list of edges which contains the `User`, info from the `Message`, and the cursor to aid in pagination. */
  edges: Array<UserUsersByMessageSenderIdAndRecipientIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection, with data from `Message`. */
export type UserUsersByMessageSenderIdAndRecipientIdManyToManyEdge = {
  __typename?: 'UserUsersByMessageSenderIdAndRecipientIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
  /** Reads and enables pagination through a set of `Message`. */
  messagesByRecipientId: MessagesConnection;
};


/** A `User` edge in the connection, with data from `Message`. */
export type UserUsersByMessageSenderIdAndRecipientIdManyToManyEdgeMessagesByRecipientIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MessagesOrderBy>>;
  condition?: Maybe<MessageCondition>;
  filter?: Maybe<MessageFilter>;
};

/** A connection to a list of `Group` values, with data from `Message`. */
export type UserGroupsByMessageSenderIdAndRecipientGroupIdManyToManyConnection = {
  __typename?: 'UserGroupsByMessageSenderIdAndRecipientGroupIdManyToManyConnection';
  /** A list of `Group` objects. */
  nodes: Array<Maybe<Group>>;
  /** A list of edges which contains the `Group`, info from the `Message`, and the cursor to aid in pagination. */
  edges: Array<UserGroupsByMessageSenderIdAndRecipientGroupIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Group` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Group` edge in the connection, with data from `Message`. */
export type UserGroupsByMessageSenderIdAndRecipientGroupIdManyToManyEdge = {
  __typename?: 'UserGroupsByMessageSenderIdAndRecipientGroupIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Group` at the end of the edge. */
  node?: Maybe<Group>;
  /** Reads and enables pagination through a set of `Message`. */
  messagesByRecipientGroupId: MessagesConnection;
};


/** A `Group` edge in the connection, with data from `Message`. */
export type UserGroupsByMessageSenderIdAndRecipientGroupIdManyToManyEdgeMessagesByRecipientGroupIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MessagesOrderBy>>;
  condition?: Maybe<MessageCondition>;
  filter?: Maybe<MessageFilter>;
};

/** A connection to a list of `Message` values, with data from `Message`. */
export type UserMessagesByMessageSenderIdAndParentMessageIdManyToManyConnection = {
  __typename?: 'UserMessagesByMessageSenderIdAndParentMessageIdManyToManyConnection';
  /** A list of `Message` objects. */
  nodes: Array<Maybe<Message>>;
  /** A list of edges which contains the `Message`, info from the `Message`, and the cursor to aid in pagination. */
  edges: Array<UserMessagesByMessageSenderIdAndParentMessageIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Message` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Message` edge in the connection, with data from `Message`. */
export type UserMessagesByMessageSenderIdAndParentMessageIdManyToManyEdge = {
  __typename?: 'UserMessagesByMessageSenderIdAndParentMessageIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Message` at the end of the edge. */
  node?: Maybe<Message>;
  /** Reads and enables pagination through a set of `Message`. */
  messagesByParentMessageId: MessagesConnection;
};


/** A `Message` edge in the connection, with data from `Message`. */
export type UserMessagesByMessageSenderIdAndParentMessageIdManyToManyEdgeMessagesByParentMessageIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MessagesOrderBy>>;
  condition?: Maybe<MessageCondition>;
  filter?: Maybe<MessageFilter>;
};

/** A connection to a list of `User` values, with data from `Message`. */
export type UserUsersByMessageRecipientIdAndSenderIdManyToManyConnection = {
  __typename?: 'UserUsersByMessageRecipientIdAndSenderIdManyToManyConnection';
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** A list of edges which contains the `User`, info from the `Message`, and the cursor to aid in pagination. */
  edges: Array<UserUsersByMessageRecipientIdAndSenderIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection, with data from `Message`. */
export type UserUsersByMessageRecipientIdAndSenderIdManyToManyEdge = {
  __typename?: 'UserUsersByMessageRecipientIdAndSenderIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
  /** Reads and enables pagination through a set of `Message`. */
  messagesBySenderId: MessagesConnection;
};


/** A `User` edge in the connection, with data from `Message`. */
export type UserUsersByMessageRecipientIdAndSenderIdManyToManyEdgeMessagesBySenderIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MessagesOrderBy>>;
  condition?: Maybe<MessageCondition>;
  filter?: Maybe<MessageFilter>;
};

/** A connection to a list of `Group` values, with data from `Message`. */
export type UserGroupsByMessageRecipientIdAndRecipientGroupIdManyToManyConnection = {
  __typename?: 'UserGroupsByMessageRecipientIdAndRecipientGroupIdManyToManyConnection';
  /** A list of `Group` objects. */
  nodes: Array<Maybe<Group>>;
  /** A list of edges which contains the `Group`, info from the `Message`, and the cursor to aid in pagination. */
  edges: Array<UserGroupsByMessageRecipientIdAndRecipientGroupIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Group` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Group` edge in the connection, with data from `Message`. */
export type UserGroupsByMessageRecipientIdAndRecipientGroupIdManyToManyEdge = {
  __typename?: 'UserGroupsByMessageRecipientIdAndRecipientGroupIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Group` at the end of the edge. */
  node?: Maybe<Group>;
  /** Reads and enables pagination through a set of `Message`. */
  messagesByRecipientGroupId: MessagesConnection;
};


/** A `Group` edge in the connection, with data from `Message`. */
export type UserGroupsByMessageRecipientIdAndRecipientGroupIdManyToManyEdgeMessagesByRecipientGroupIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MessagesOrderBy>>;
  condition?: Maybe<MessageCondition>;
  filter?: Maybe<MessageFilter>;
};

/** A connection to a list of `Message` values, with data from `Message`. */
export type UserMessagesByMessageRecipientIdAndParentMessageIdManyToManyConnection = {
  __typename?: 'UserMessagesByMessageRecipientIdAndParentMessageIdManyToManyConnection';
  /** A list of `Message` objects. */
  nodes: Array<Maybe<Message>>;
  /** A list of edges which contains the `Message`, info from the `Message`, and the cursor to aid in pagination. */
  edges: Array<UserMessagesByMessageRecipientIdAndParentMessageIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Message` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Message` edge in the connection, with data from `Message`. */
export type UserMessagesByMessageRecipientIdAndParentMessageIdManyToManyEdge = {
  __typename?: 'UserMessagesByMessageRecipientIdAndParentMessageIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Message` at the end of the edge. */
  node?: Maybe<Message>;
  /** Reads and enables pagination through a set of `Message`. */
  messagesByParentMessageId: MessagesConnection;
};


/** A `Message` edge in the connection, with data from `Message`. */
export type UserMessagesByMessageRecipientIdAndParentMessageIdManyToManyEdgeMessagesByParentMessageIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MessagesOrderBy>>;
  condition?: Maybe<MessageCondition>;
  filter?: Maybe<MessageFilter>;
};

/** A `GroupUser` edge in the connection. */
export type GroupUsersEdge = {
  __typename?: 'GroupUsersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `GroupUser` at the end of the edge. */
  node?: Maybe<GroupUser>;
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

/** A `LanguageSkillLevel` edge in the connection. */
export type LanguageSkillLevelsEdge = {
  __typename?: 'LanguageSkillLevelsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `LanguageSkillLevel` at the end of the edge. */
  node?: Maybe<LanguageSkillLevel>;
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

/** A filter to be used against `UserSession` object types. All fields are combined with a logical ‘and.’ */
export type UserSessionFilter = {
  /** Filter by the object’s `sid` field. */
  sid?: Maybe<StringFilter>;
  /** Filter by the object’s `expire` field. */
  expire?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<UserSessionFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<UserSessionFilter>>;
  /** Negates the expression. */
  not?: Maybe<UserSessionFilter>;
};

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a single `GroupUser`. */
  createGroupUser?: Maybe<CreateGroupUserPayload>;
  /** Creates a single `Group`. */
  createGroup?: Maybe<CreateGroupPayload>;
  /** Creates a single `LanguageSkillLevel`. */
  createLanguageSkillLevel?: Maybe<CreateLanguageSkillLevelPayload>;
  /** Creates a single `Language`. */
  createLanguage?: Maybe<CreateLanguagePayload>;
  /** Creates a single `Message`. */
  createMessage?: Maybe<CreateMessagePayload>;
  /** Creates a single `UserLanguage`. */
  createUserLanguage?: Maybe<CreateUserLanguagePayload>;
  /** Creates a single `UserSession`. */
  createUserSession?: Maybe<CreateUserSessionPayload>;
  /** Creates a single `User`. */
  createUser?: Maybe<CreateUserPayload>;
  /** Updates a single `GroupUser` using its globally unique id and a patch. */
  updateGroupUserByNodeId?: Maybe<UpdateGroupUserPayload>;
  /** Updates a single `GroupUser` using a unique key and a patch. */
  updateGroupUser?: Maybe<UpdateGroupUserPayload>;
  /** Updates a single `Group` using its globally unique id and a patch. */
  updateGroupByNodeId?: Maybe<UpdateGroupPayload>;
  /** Updates a single `Group` using a unique key and a patch. */
  updateGroup?: Maybe<UpdateGroupPayload>;
  /** Updates a single `Group` using a unique key and a patch. */
  updateGroupByUuid?: Maybe<UpdateGroupPayload>;
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
  /** Updates a single `Message` using its globally unique id and a patch. */
  updateMessageByNodeId?: Maybe<UpdateMessagePayload>;
  /** Updates a single `Message` using a unique key and a patch. */
  updateMessage?: Maybe<UpdateMessagePayload>;
  /** Updates a single `Message` using a unique key and a patch. */
  updateMessageByUuid?: Maybe<UpdateMessagePayload>;
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
  /** Deletes a single `GroupUser` using its globally unique id. */
  deleteGroupUserByNodeId?: Maybe<DeleteGroupUserPayload>;
  /** Deletes a single `GroupUser` using a unique key. */
  deleteGroupUser?: Maybe<DeleteGroupUserPayload>;
  /** Deletes a single `Group` using its globally unique id. */
  deleteGroupByNodeId?: Maybe<DeleteGroupPayload>;
  /** Deletes a single `Group` using a unique key. */
  deleteGroup?: Maybe<DeleteGroupPayload>;
  /** Deletes a single `Group` using a unique key. */
  deleteGroupByUuid?: Maybe<DeleteGroupPayload>;
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
  /** Deletes a single `Message` using its globally unique id. */
  deleteMessageByNodeId?: Maybe<DeleteMessagePayload>;
  /** Deletes a single `Message` using a unique key. */
  deleteMessage?: Maybe<DeleteMessagePayload>;
  /** Deletes a single `Message` using a unique key. */
  deleteMessageByUuid?: Maybe<DeleteMessagePayload>;
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
  joinGlobalGroup?: Maybe<JoinGlobalGroupPayload>;
  registerUserActivity?: Maybe<RegisterUserActivityPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateGroupUserArgs = {
  input: CreateGroupUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateGroupArgs = {
  input: CreateGroupInput;
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
export type MutationCreateMessageArgs = {
  input: CreateMessageInput;
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
export type MutationUpdateGroupUserByNodeIdArgs = {
  input: UpdateGroupUserByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateGroupUserArgs = {
  input: UpdateGroupUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateGroupByNodeIdArgs = {
  input: UpdateGroupByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateGroupArgs = {
  input: UpdateGroupInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateGroupByUuidArgs = {
  input: UpdateGroupByUuidInput;
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
export type MutationUpdateMessageByNodeIdArgs = {
  input: UpdateMessageByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMessageArgs = {
  input: UpdateMessageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMessageByUuidArgs = {
  input: UpdateMessageByUuidInput;
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
export type MutationDeleteGroupUserByNodeIdArgs = {
  input: DeleteGroupUserByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteGroupUserArgs = {
  input: DeleteGroupUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteGroupByNodeIdArgs = {
  input: DeleteGroupByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteGroupArgs = {
  input: DeleteGroupInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteGroupByUuidArgs = {
  input: DeleteGroupByUuidInput;
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
export type MutationDeleteMessageByNodeIdArgs = {
  input: DeleteMessageByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMessageArgs = {
  input: DeleteMessageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMessageByUuidArgs = {
  input: DeleteMessageByUuidInput;
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


/** The root mutation type which contains root level fields which mutate data. */
export type MutationJoinGlobalGroupArgs = {
  input: JoinGlobalGroupInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationRegisterUserActivityArgs = {
  input: RegisterUserActivityInput;
};

/** The output of our create `GroupUser` mutation. */
export type CreateGroupUserPayload = {
  __typename?: 'CreateGroupUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `GroupUser` that was created by this mutation. */
  groupUser?: Maybe<GroupUser>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `GroupUser`. */
  user?: Maybe<User>;
  /** Reads a single `Group` that is related to this `GroupUser`. */
  group?: Maybe<Group>;
  /** An edge for our `GroupUser`. May be used by Relay 1. */
  groupUserEdge?: Maybe<GroupUsersEdge>;
};


/** The output of our create `GroupUser` mutation. */
export type CreateGroupUserPayloadGroupUserEdgeArgs = {
  orderBy?: Maybe<Array<GroupUsersOrderBy>>;
};

/** All input for the create `GroupUser` mutation. */
export type CreateGroupUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `GroupUser` to be created by this mutation. */
  groupUser: GroupUserInput;
};

/** An input for mutations affecting `GroupUser` */
export type GroupUserInput = {
  id?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['Int']>;
  groupId?: Maybe<Scalars['Int']>;
  userType: UserType;
  joinedOn?: Maybe<Scalars['Datetime']>;
  lastActive?: Maybe<Scalars['Datetime']>;
};

/** The output of our create `Group` mutation. */
export type CreateGroupPayload = {
  __typename?: 'CreateGroupPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Group` that was created by this mutation. */
  group?: Maybe<Group>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Language` that is related to this `Group`. */
  language?: Maybe<Language>;
  /** Reads a single `LanguageSkillLevel` that is related to this `Group`. */
  languageSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `Group`. May be used by Relay 1. */
  groupEdge?: Maybe<GroupsEdge>;
};


/** The output of our create `Group` mutation. */
export type CreateGroupPayloadGroupEdgeArgs = {
  orderBy?: Maybe<Array<GroupsOrderBy>>;
};

/** All input for the create `Group` mutation. */
export type CreateGroupInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Group` to be created by this mutation. */
  group: GroupInput;
};

/** An input for mutations affecting `Group` */
export type GroupInput = {
  id?: Maybe<Scalars['Int']>;
  groupName?: Maybe<Scalars['String']>;
  global?: Maybe<Scalars['Boolean']>;
  languageId?: Maybe<Scalars['Int']>;
  languageSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  uuid: Scalars['UUID'];
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

/** The output of our create `Message` mutation. */
export type CreateMessagePayload = {
  __typename?: 'CreateMessagePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Message` that was created by this mutation. */
  message?: Maybe<Message>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `Message`. */
  sender?: Maybe<User>;
  /** Reads a single `User` that is related to this `Message`. */
  recipient?: Maybe<User>;
  /** Reads a single `Group` that is related to this `Message`. */
  recipientGroup?: Maybe<Group>;
  /** Reads a single `Message` that is related to this `Message`. */
  parentMessage?: Maybe<Message>;
  /** An edge for our `Message`. May be used by Relay 1. */
  messageEdge?: Maybe<MessagesEdge>;
};


/** The output of our create `Message` mutation. */
export type CreateMessagePayloadMessageEdgeArgs = {
  orderBy?: Maybe<Array<MessagesOrderBy>>;
};

/** All input for the create `Message` mutation. */
export type CreateMessageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Message` to be created by this mutation. */
  message: MessageInput;
};

/** An input for mutations affecting `Message` */
export type MessageInput = {
  id?: Maybe<Scalars['Int']>;
  uuid: Scalars['UUID'];
  senderId?: Maybe<Scalars['Int']>;
  recipientId?: Maybe<Scalars['Int']>;
  recipientGroupId?: Maybe<Scalars['Int']>;
  body: Scalars['String'];
  parentMessageId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
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
  /** Reads a single `Language` that is related to this `User`. */
  languageByLocale?: Maybe<Language>;
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
  passwordHash?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
  avatarUrl?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['Int']>;
  googleId?: Maybe<Scalars['String']>;
};

/** The output of our update `GroupUser` mutation. */
export type UpdateGroupUserPayload = {
  __typename?: 'UpdateGroupUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `GroupUser` that was updated by this mutation. */
  groupUser?: Maybe<GroupUser>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `GroupUser`. */
  user?: Maybe<User>;
  /** Reads a single `Group` that is related to this `GroupUser`. */
  group?: Maybe<Group>;
  /** An edge for our `GroupUser`. May be used by Relay 1. */
  groupUserEdge?: Maybe<GroupUsersEdge>;
};


/** The output of our update `GroupUser` mutation. */
export type UpdateGroupUserPayloadGroupUserEdgeArgs = {
  orderBy?: Maybe<Array<GroupUsersOrderBy>>;
};

/** All input for the `updateGroupUserByNodeId` mutation. */
export type UpdateGroupUserByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `GroupUser` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `GroupUser` being updated. */
  patch: GroupUserPatch;
};

/** Represents an update to a `GroupUser`. Fields that are set will be updated. */
export type GroupUserPatch = {
  id?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['Int']>;
  groupId?: Maybe<Scalars['Int']>;
  userType?: Maybe<UserType>;
  joinedOn?: Maybe<Scalars['Datetime']>;
  lastActive?: Maybe<Scalars['Datetime']>;
};

/** All input for the `updateGroupUser` mutation. */
export type UpdateGroupUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `GroupUser` being updated. */
  patch: GroupUserPatch;
  id: Scalars['Int'];
};

/** The output of our update `Group` mutation. */
export type UpdateGroupPayload = {
  __typename?: 'UpdateGroupPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Group` that was updated by this mutation. */
  group?: Maybe<Group>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Language` that is related to this `Group`. */
  language?: Maybe<Language>;
  /** Reads a single `LanguageSkillLevel` that is related to this `Group`. */
  languageSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `Group`. May be used by Relay 1. */
  groupEdge?: Maybe<GroupsEdge>;
};


/** The output of our update `Group` mutation. */
export type UpdateGroupPayloadGroupEdgeArgs = {
  orderBy?: Maybe<Array<GroupsOrderBy>>;
};

/** All input for the `updateGroupByNodeId` mutation. */
export type UpdateGroupByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Group` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Group` being updated. */
  patch: GroupPatch;
};

/** Represents an update to a `Group`. Fields that are set will be updated. */
export type GroupPatch = {
  id?: Maybe<Scalars['Int']>;
  groupName?: Maybe<Scalars['String']>;
  global?: Maybe<Scalars['Boolean']>;
  languageId?: Maybe<Scalars['Int']>;
  languageSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  uuid?: Maybe<Scalars['UUID']>;
};

/** All input for the `updateGroup` mutation. */
export type UpdateGroupInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Group` being updated. */
  patch: GroupPatch;
  id: Scalars['Int'];
};

/** All input for the `updateGroupByUuid` mutation. */
export type UpdateGroupByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Group` being updated. */
  patch: GroupPatch;
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

/** The output of our update `Message` mutation. */
export type UpdateMessagePayload = {
  __typename?: 'UpdateMessagePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Message` that was updated by this mutation. */
  message?: Maybe<Message>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `Message`. */
  sender?: Maybe<User>;
  /** Reads a single `User` that is related to this `Message`. */
  recipient?: Maybe<User>;
  /** Reads a single `Group` that is related to this `Message`. */
  recipientGroup?: Maybe<Group>;
  /** Reads a single `Message` that is related to this `Message`. */
  parentMessage?: Maybe<Message>;
  /** An edge for our `Message`. May be used by Relay 1. */
  messageEdge?: Maybe<MessagesEdge>;
};


/** The output of our update `Message` mutation. */
export type UpdateMessagePayloadMessageEdgeArgs = {
  orderBy?: Maybe<Array<MessagesOrderBy>>;
};

/** All input for the `updateMessageByNodeId` mutation. */
export type UpdateMessageByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Message` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Message` being updated. */
  patch: MessagePatch;
};

/** Represents an update to a `Message`. Fields that are set will be updated. */
export type MessagePatch = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  senderId?: Maybe<Scalars['Int']>;
  recipientId?: Maybe<Scalars['Int']>;
  recipientGroupId?: Maybe<Scalars['Int']>;
  body?: Maybe<Scalars['String']>;
  parentMessageId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** All input for the `updateMessage` mutation. */
export type UpdateMessageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Message` being updated. */
  patch: MessagePatch;
  id: Scalars['Int'];
};

/** All input for the `updateMessageByUuid` mutation. */
export type UpdateMessageByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Message` being updated. */
  patch: MessagePatch;
  uuid: Scalars['UUID'];
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
  /** Reads a single `Language` that is related to this `User`. */
  languageByLocale?: Maybe<Language>;
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
  avatarUrl?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['Int']>;
  googleId?: Maybe<Scalars['String']>;
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

/** The output of our delete `GroupUser` mutation. */
export type DeleteGroupUserPayload = {
  __typename?: 'DeleteGroupUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `GroupUser` that was deleted by this mutation. */
  groupUser?: Maybe<GroupUser>;
  deletedGroupUserNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `GroupUser`. */
  user?: Maybe<User>;
  /** Reads a single `Group` that is related to this `GroupUser`. */
  group?: Maybe<Group>;
  /** An edge for our `GroupUser`. May be used by Relay 1. */
  groupUserEdge?: Maybe<GroupUsersEdge>;
};


/** The output of our delete `GroupUser` mutation. */
export type DeleteGroupUserPayloadGroupUserEdgeArgs = {
  orderBy?: Maybe<Array<GroupUsersOrderBy>>;
};

/** All input for the `deleteGroupUserByNodeId` mutation. */
export type DeleteGroupUserByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `GroupUser` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteGroupUser` mutation. */
export type DeleteGroupUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `Group` mutation. */
export type DeleteGroupPayload = {
  __typename?: 'DeleteGroupPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Group` that was deleted by this mutation. */
  group?: Maybe<Group>;
  deletedGroupNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Language` that is related to this `Group`. */
  language?: Maybe<Language>;
  /** Reads a single `LanguageSkillLevel` that is related to this `Group`. */
  languageSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `Group`. May be used by Relay 1. */
  groupEdge?: Maybe<GroupsEdge>;
};


/** The output of our delete `Group` mutation. */
export type DeleteGroupPayloadGroupEdgeArgs = {
  orderBy?: Maybe<Array<GroupsOrderBy>>;
};

/** All input for the `deleteGroupByNodeId` mutation. */
export type DeleteGroupByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Group` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteGroup` mutation. */
export type DeleteGroupInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** All input for the `deleteGroupByUuid` mutation. */
export type DeleteGroupByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
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

/** The output of our delete `Message` mutation. */
export type DeleteMessagePayload = {
  __typename?: 'DeleteMessagePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Message` that was deleted by this mutation. */
  message?: Maybe<Message>;
  deletedMessageNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `Message`. */
  sender?: Maybe<User>;
  /** Reads a single `User` that is related to this `Message`. */
  recipient?: Maybe<User>;
  /** Reads a single `Group` that is related to this `Message`. */
  recipientGroup?: Maybe<Group>;
  /** Reads a single `Message` that is related to this `Message`. */
  parentMessage?: Maybe<Message>;
  /** An edge for our `Message`. May be used by Relay 1. */
  messageEdge?: Maybe<MessagesEdge>;
};


/** The output of our delete `Message` mutation. */
export type DeleteMessagePayloadMessageEdgeArgs = {
  orderBy?: Maybe<Array<MessagesOrderBy>>;
};

/** All input for the `deleteMessageByNodeId` mutation. */
export type DeleteMessageByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Message` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteMessage` mutation. */
export type DeleteMessageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** All input for the `deleteMessageByUuid` mutation. */
export type DeleteMessageByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
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
  /** Reads a single `Language` that is related to this `User`. */
  languageByLocale?: Maybe<Language>;
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

/** The output of our `joinGlobalGroup` mutation. */
export type JoinGlobalGroupPayload = {
  __typename?: 'JoinGlobalGroupPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  groupUser?: Maybe<GroupUser>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `GroupUser`. */
  user?: Maybe<User>;
  /** Reads a single `Group` that is related to this `GroupUser`. */
  group?: Maybe<Group>;
  /** An edge for our `GroupUser`. May be used by Relay 1. */
  groupUserEdge?: Maybe<GroupUsersEdge>;
};


/** The output of our `joinGlobalGroup` mutation. */
export type JoinGlobalGroupPayloadGroupUserEdgeArgs = {
  orderBy?: Maybe<Array<GroupUsersOrderBy>>;
};

/** All input for the `joinGlobalGroup` mutation. */
export type JoinGlobalGroupInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  groupUuid: Scalars['UUID'];
};

/** The output of our `registerUserActivity` mutation. */
export type RegisterUserActivityPayload = {
  __typename?: 'RegisterUserActivityPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  datetime?: Maybe<Scalars['Datetime']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `registerUserActivity` mutation. */
export type RegisterUserActivityInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['Int']>;
};

export type AllGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllGroupsQuery = (
  { __typename?: 'Query' }
  & { groups?: Maybe<(
    { __typename?: 'GroupsConnection' }
    & { nodes: Array<Maybe<(
      { __typename?: 'Group' }
      & Pick<Group, 'uuid' | 'groupName' | 'global'>
      & { language?: Maybe<(
        { __typename?: 'Language' }
        & Pick<Language, 'alpha2' | 'englishName'>
      )>, languageSkillLevel?: Maybe<(
        { __typename?: 'LanguageSkillLevel' }
        & Pick<LanguageSkillLevel, 'name'>
      )>, groupUsers: (
        { __typename?: 'GroupUsersConnection' }
        & Pick<GroupUsersConnection, 'totalCount'>
      ) }
    )>> }
  )> }
);

export type ChatUserQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ChatUserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'uuid' | 'avatarUrl'>
  )> }
);

export type CreateGroupMutationVariables = Exact<{
  global: Scalars['Boolean'];
  groupName: Scalars['String'];
  languageId: Scalars['Int'];
  languageSkillLevelId: Scalars['Int'];
  uuid: Scalars['UUID'];
}>;


export type CreateGroupMutation = (
  { __typename?: 'Mutation' }
  & { createGroup?: Maybe<(
    { __typename?: 'CreateGroupPayload' }
    & { group?: Maybe<(
      { __typename?: 'Group' }
      & Pick<Group, 'id'>
    )> }
  )> }
);

export type CreateMessageMutationVariables = Exact<{
  parentMessageId?: Maybe<Scalars['Int']>;
  recipientGroupId?: Maybe<Scalars['Int']>;
  recipientId?: Maybe<Scalars['Int']>;
  senderId?: Maybe<Scalars['Int']>;
  uuid: Scalars['UUID'];
  body: Scalars['String'];
}>;


export type CreateMessageMutation = (
  { __typename?: 'Mutation' }
  & { createMessage?: Maybe<(
    { __typename?: 'CreateMessagePayload' }
    & { sender?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'uuid'>
    )>, message?: Maybe<(
      { __typename?: 'Message' }
      & Pick<Message, 'id' | 'uuid' | 'createdAt'>
    )> }
  )> }
);

export type CreateUserMutationVariables = Exact<{
  email: Scalars['String'];
  gender: Scalars['String'];
  passwordHash: Scalars['String'];
  username: Scalars['String'];
  uuid: Scalars['UUID'];
  avatarUrl: Scalars['String'];
  locale?: Maybe<Scalars['Int']>;
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser?: Maybe<(
    { __typename?: 'CreateUserPayload' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )> }
  )> }
);

export type CreateUserLanguageMutationVariables = Exact<{
  languageId: Scalars['Int'];
  languageSkillLevelId?: Maybe<Scalars['Int']>;
  native: Scalars['Boolean'];
  userId: Scalars['Int'];
}>;


export type CreateUserLanguageMutation = (
  { __typename?: 'Mutation' }
  & { createUserLanguage?: Maybe<(
    { __typename?: 'CreateUserLanguagePayload' }
    & { userLanguage?: Maybe<(
      { __typename?: 'UserLanguage' }
      & Pick<UserLanguage, 'id'>
    )> }
  )> }
);

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'bio' | 'email' | 'gender' | 'username' | 'uuid' | 'avatarUrl'>
    & { userLanguages: (
      { __typename?: 'UserLanguagesConnection' }
      & Pick<UserLanguagesConnection, 'totalCount'>
    ), languageByLocale?: Maybe<(
      { __typename?: 'Language' }
      & Pick<Language, 'alpha2'>
    )> }
  )> }
);

export type GroupChatQueryVariables = Exact<{
  groupUuid: Scalars['UUID'];
}>;


export type GroupChatQuery = (
  { __typename?: 'Query' }
  & { groupByUuid?: Maybe<(
    { __typename?: 'Group' }
    & Pick<Group, 'groupName'>
    & { language?: Maybe<(
      { __typename?: 'Language' }
      & Pick<Language, 'englishName'>
    )>, languageSkillLevel?: Maybe<(
      { __typename?: 'LanguageSkillLevel' }
      & Pick<LanguageSkillLevel, 'name'>
    )>, usersByGroupUserGroupIdAndUserId: (
      { __typename?: 'GroupUsersByGroupUserGroupIdAndUserIdManyToManyConnection' }
      & { nodes: Array<Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'bio' | 'avatarUrl' | 'uuid' | 'username' | 'lastActiveAt'>
        & { userLanguages: (
          { __typename?: 'UserLanguagesConnection' }
          & { nodes: Array<Maybe<(
            { __typename?: 'UserLanguage' }
            & { language?: Maybe<(
              { __typename?: 'Language' }
              & Pick<Language, 'englishName'>
            )> }
          )>> }
        ), groupUsers: (
          { __typename?: 'GroupUsersConnection' }
          & { nodes: Array<Maybe<(
            { __typename?: 'GroupUser' }
            & Pick<GroupUser, 'userType'>
            & { group?: Maybe<(
              { __typename?: 'Group' }
              & Pick<Group, 'uuid'>
              & { language?: Maybe<(
                { __typename?: 'Language' }
                & Pick<Language, 'englishName'>
              )>, languageSkillLevel?: Maybe<(
                { __typename?: 'LanguageSkillLevel' }
                & Pick<LanguageSkillLevel, 'name'>
              )> }
            )> }
          )>> }
        ) }
      )>> }
    ) }
  )> }
);

export type GroupChatMessagesQueryVariables = Exact<{
  groupUuid: Scalars['UUID'];
}>;


export type GroupChatMessagesQuery = (
  { __typename?: 'Query' }
  & { groupByUuid?: Maybe<(
    { __typename?: 'Group' }
    & { messagesByRecipientGroupId: (
      { __typename?: 'MessagesConnection' }
      & { nodes: Array<Maybe<(
        { __typename?: 'Message' }
        & Pick<Message, 'body' | 'createdAt' | 'uuid'>
        & { sender?: Maybe<(
          { __typename?: 'User' }
          & Pick<User, 'uuid'>
        )> }
      )>> }
    ) }
  )> }
);

export type GroupIdByUuidQueryVariables = Exact<{
  uuid: Scalars['UUID'];
}>;


export type GroupIdByUuidQuery = (
  { __typename?: 'Query' }
  & { groupByUuid?: Maybe<(
    { __typename?: 'Group' }
    & Pick<Group, 'id'>
  )> }
);

export type JoinGlobalGroupMutationVariables = Exact<{
  groupUuid: Scalars['UUID'];
}>;


export type JoinGlobalGroupMutation = (
  { __typename?: 'Mutation' }
  & { joinGlobalGroup?: Maybe<(
    { __typename?: 'JoinGlobalGroupPayload' }
    & { groupUser?: Maybe<(
      { __typename?: 'GroupUser' }
      & { group?: Maybe<(
        { __typename?: 'Group' }
        & Pick<Group, 'uuid'>
      )>, user?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'uuid'>
      )> }
    )> }
  )> }
);

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

export type LanguageIdByAlpha2QueryVariables = Exact<{
  alpha2: Scalars['String'];
}>;


export type LanguageIdByAlpha2Query = (
  { __typename?: 'Query' }
  & { languageByAlpha2?: Maybe<(
    { __typename?: 'Language' }
    & Pick<Language, 'id'>
  )> }
);

export type UserHasCompletedProfileQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UserHasCompletedProfileQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'username'>
    & { userLanguages: (
      { __typename?: 'UserLanguagesConnection' }
      & Pick<UserLanguagesConnection, 'totalCount'>
    ) }
  )> }
);

export type UserLanguageInfoQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UserLanguageInfoQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
    & { userLanguages: (
      { __typename?: 'UserLanguagesConnection' }
      & { nodes: Array<Maybe<(
        { __typename?: 'UserLanguage' }
        & Pick<UserLanguage, 'languageId' | 'languageSkillLevelId' | 'native'>
      )>> }
    ) }
  )> }
);


export const AllGroups = gql`
    query AllGroups {
  groups {
    nodes {
      uuid
      groupName
      global
      language {
        alpha2
        englishName
      }
      languageSkillLevel {
        name
      }
      groupUsers {
        totalCount
      }
    }
  }
}
    `;
export const ChatUser = gql`
    query ChatUser($id: Int!) {
  user(id: $id) {
    id
    username
    uuid
    avatarUrl
  }
}
    `;
export const CreateGroup = gql`
    mutation CreateGroup($global: Boolean!, $groupName: String!, $languageId: Int!, $languageSkillLevelId: Int!, $uuid: UUID!) {
  createGroup(
    input: {group: {global: $global, groupName: $groupName, languageId: $languageId, languageSkillLevelId: $languageSkillLevelId, uuid: $uuid}}
  ) {
    group {
      id
    }
  }
}
    `;
export const CreateMessage = gql`
    mutation CreateMessage($parentMessageId: Int, $recipientGroupId: Int, $recipientId: Int, $senderId: Int, $uuid: UUID!, $body: String!) {
  createMessage(
    input: {message: {body: $body, parentMessageId: $parentMessageId, uuid: $uuid, senderId: $senderId, recipientGroupId: $recipientGroupId, recipientId: $recipientId}}
  ) {
    sender {
      uuid
    }
    message {
      id
      uuid
      createdAt
    }
  }
}
    `;
export const CreateUser = gql`
    mutation CreateUser($email: String!, $gender: String!, $passwordHash: String!, $username: String!, $uuid: UUID!, $avatarUrl: String!, $locale: Int) {
  createUser(
    input: {user: {email: $email, gender: $gender, passwordHash: $passwordHash, username: $username, uuid: $uuid, avatarUrl: $avatarUrl, locale: $locale}}
  ) {
    user {
      id
    }
  }
}
    `;
export const CreateUserLanguage = gql`
    mutation CreateUserLanguage($languageId: Int!, $languageSkillLevelId: Int, $native: Boolean!, $userId: Int!) {
  createUserLanguage(
    input: {userLanguage: {languageId: $languageId, languageSkillLevelId: $languageSkillLevelId, native: $native, userId: $userId}}
  ) {
    userLanguage {
      id
    }
  }
}
    `;
export const CurrentUser = gql`
    query CurrentUser {
  currentUser {
    bio
    email
    gender
    username
    uuid
    avatarUrl
    userLanguages {
      totalCount
    }
    languageByLocale {
      alpha2
    }
  }
}
    `;
export const GroupChat = gql`
    query GroupChat($groupUuid: UUID!) {
  groupByUuid(uuid: $groupUuid) {
    groupName
    language {
      englishName
    }
    languageSkillLevel {
      name
    }
    usersByGroupUserGroupIdAndUserId {
      nodes {
        bio
        avatarUrl
        uuid
        username
        lastActiveAt
        userLanguages {
          nodes {
            language {
              englishName
            }
          }
        }
        groupUsers {
          nodes {
            userType
            group {
              uuid
              language {
                englishName
              }
              languageSkillLevel {
                name
              }
            }
          }
        }
      }
    }
  }
}
    `;
export const GroupChatMessages = gql`
    query GroupChatMessages($groupUuid: UUID!) {
  groupByUuid(uuid: $groupUuid) {
    messagesByRecipientGroupId(orderBy: CREATED_AT_ASC, last: 1000) {
      nodes {
        body
        createdAt
        sender {
          uuid
        }
        uuid
      }
    }
  }
}
    `;
export const GroupIdByUuid = gql`
    query GroupIdByUuid($uuid: UUID!) {
  groupByUuid(uuid: $uuid) {
    id
  }
}
    `;
export const JoinGlobalGroup = gql`
    mutation JoinGlobalGroup($groupUuid: UUID!) {
  joinGlobalGroup(input: {groupUuid: $groupUuid}) {
    groupUser {
      group {
        uuid
      }
      user {
        uuid
      }
    }
  }
}
    `;
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
export const LanguageIdByAlpha2 = gql`
    query LanguageIdByAlpha2($alpha2: String!) {
  languageByAlpha2(alpha2: $alpha2) {
    id
  }
}
    `;
export const UserHasCompletedProfile = gql`
    query UserHasCompletedProfile($id: Int!) {
  user(id: $id) {
    username
    userLanguages {
      totalCount
    }
  }
}
    `;
export const UserLanguageInfo = gql`
    query UserLanguageInfo($id: Int!) {
  user(id: $id) {
    id
    userLanguages {
      nodes {
        languageId
        languageSkillLevelId
        native
      }
    }
  }
}
    `;