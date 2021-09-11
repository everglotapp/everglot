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
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: any;
  /**
   * A point in time as described by the [ISO
   * 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
   */
  Datetime: any;
  /** A JavaScript object encoded in the JSON format as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** A universally unique identifier as defined by [RFC 4122](https://tools.ietf.org/html/rfc4122). */
  UUID: any;
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

export type ChineseGuessCharacterQuestion = Node & {
  __typename?: 'ChineseGuessCharacterQuestion';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  uuid: Scalars['UUID'];
  character: Scalars['String'];
  hint: Scalars['String'];
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['Datetime'];
  /** Reads a single `LanguageSkillLevel` that is related to this `ChineseGuessCharacterQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
};

/**
 * A condition to be used against `ChineseGuessCharacterQuestion` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type ChineseGuessCharacterQuestionCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `uuid` field. */
  uuid?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `character` field. */
  character?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `hint` field. */
  hint?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `ChineseGuessCharacterQuestion` object types. All fields are combined with a logical ‘and.’ */
export type ChineseGuessCharacterQuestionFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `uuid` field. */
  uuid?: Maybe<UuidFilter>;
  /** Filter by the object’s `character` field. */
  character?: Maybe<StringFilter>;
  /** Filter by the object’s `hint` field. */
  hint?: Maybe<StringFilter>;
  /** Filter by the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<IntFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<ChineseGuessCharacterQuestionFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<ChineseGuessCharacterQuestionFilter>>;
  /** Negates the expression. */
  not?: Maybe<ChineseGuessCharacterQuestionFilter>;
};

/** An input for mutations affecting `ChineseGuessCharacterQuestion` */
export type ChineseGuessCharacterQuestionInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  character: Scalars['String'];
  hint: Scalars['String'];
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** Represents an update to a `ChineseGuessCharacterQuestion`. Fields that are set will be updated. */
export type ChineseGuessCharacterQuestionPatch = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  character?: Maybe<Scalars['String']>;
  hint?: Maybe<Scalars['String']>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `ChineseGuessCharacterQuestion` values. */
export type ChineseGuessCharacterQuestionsConnection = {
  __typename?: 'ChineseGuessCharacterQuestionsConnection';
  /** A list of `ChineseGuessCharacterQuestion` objects. */
  nodes: Array<Maybe<ChineseGuessCharacterQuestion>>;
  /** A list of edges which contains the `ChineseGuessCharacterQuestion` and cursor to aid in pagination. */
  edges: Array<ChineseGuessCharacterQuestionsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ChineseGuessCharacterQuestion` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `ChineseGuessCharacterQuestion` edge in the connection. */
export type ChineseGuessCharacterQuestionsEdge = {
  __typename?: 'ChineseGuessCharacterQuestionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `ChineseGuessCharacterQuestion` at the end of the edge. */
  node?: Maybe<ChineseGuessCharacterQuestion>;
};

/** Methods to use when ordering `ChineseGuessCharacterQuestion`. */
export enum ChineseGuessCharacterQuestionsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UuidAsc = 'UUID_ASC',
  UuidDesc = 'UUID_DESC',
  CharacterAsc = 'CHARACTER_ASC',
  CharacterDesc = 'CHARACTER_DESC',
  HintAsc = 'HINT_ASC',
  HintDesc = 'HINT_DESC',
  RecommendedSkillLevelIdAsc = 'RECOMMENDED_SKILL_LEVEL_ID_ASC',
  RecommendedSkillLevelIdDesc = 'RECOMMENDED_SKILL_LEVEL_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type ChineseRandomQuestion = Node & {
  __typename?: 'ChineseRandomQuestion';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  uuid: Scalars['UUID'];
  question: Scalars['String'];
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['Datetime'];
  /** Reads a single `LanguageSkillLevel` that is related to this `ChineseRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
};

/**
 * A condition to be used against `ChineseRandomQuestion` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type ChineseRandomQuestionCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `uuid` field. */
  uuid?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `question` field. */
  question?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `ChineseRandomQuestion` object types. All fields are combined with a logical ‘and.’ */
export type ChineseRandomQuestionFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `uuid` field. */
  uuid?: Maybe<UuidFilter>;
  /** Filter by the object’s `question` field. */
  question?: Maybe<StringFilter>;
  /** Filter by the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<IntFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<ChineseRandomQuestionFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<ChineseRandomQuestionFilter>>;
  /** Negates the expression. */
  not?: Maybe<ChineseRandomQuestionFilter>;
};

/** An input for mutations affecting `ChineseRandomQuestion` */
export type ChineseRandomQuestionInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  question: Scalars['String'];
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** Represents an update to a `ChineseRandomQuestion`. Fields that are set will be updated. */
export type ChineseRandomQuestionPatch = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  question?: Maybe<Scalars['String']>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `ChineseRandomQuestion` values. */
export type ChineseRandomQuestionsConnection = {
  __typename?: 'ChineseRandomQuestionsConnection';
  /** A list of `ChineseRandomQuestion` objects. */
  nodes: Array<Maybe<ChineseRandomQuestion>>;
  /** A list of edges which contains the `ChineseRandomQuestion` and cursor to aid in pagination. */
  edges: Array<ChineseRandomQuestionsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ChineseRandomQuestion` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `ChineseRandomQuestion` edge in the connection. */
export type ChineseRandomQuestionsEdge = {
  __typename?: 'ChineseRandomQuestionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `ChineseRandomQuestion` at the end of the edge. */
  node?: Maybe<ChineseRandomQuestion>;
};

/** Methods to use when ordering `ChineseRandomQuestion`. */
export enum ChineseRandomQuestionsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UuidAsc = 'UUID_ASC',
  UuidDesc = 'UUID_DESC',
  QuestionAsc = 'QUESTION_ASC',
  QuestionDesc = 'QUESTION_DESC',
  RecommendedSkillLevelIdAsc = 'RECOMMENDED_SKILL_LEVEL_ID_ASC',
  RecommendedSkillLevelIdDesc = 'RECOMMENDED_SKILL_LEVEL_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type ChineseWouldYouRatherQuestion = Node & {
  __typename?: 'ChineseWouldYouRatherQuestion';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  uuid: Scalars['UUID'];
  question: Scalars['String'];
  answers: Array<Maybe<Scalars['String']>>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['Datetime'];
  /** Reads a single `LanguageSkillLevel` that is related to this `ChineseWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
};

/**
 * A condition to be used against `ChineseWouldYouRatherQuestion` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type ChineseWouldYouRatherQuestionCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `uuid` field. */
  uuid?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `question` field. */
  question?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `answers` field. */
  answers?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Checks for equality with the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `ChineseWouldYouRatherQuestion` object types. All fields are combined with a logical ‘and.’ */
export type ChineseWouldYouRatherQuestionFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `uuid` field. */
  uuid?: Maybe<UuidFilter>;
  /** Filter by the object’s `question` field. */
  question?: Maybe<StringFilter>;
  /** Filter by the object’s `answers` field. */
  answers?: Maybe<StringListFilter>;
  /** Filter by the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<IntFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<ChineseWouldYouRatherQuestionFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<ChineseWouldYouRatherQuestionFilter>>;
  /** Negates the expression. */
  not?: Maybe<ChineseWouldYouRatherQuestionFilter>;
};

/** An input for mutations affecting `ChineseWouldYouRatherQuestion` */
export type ChineseWouldYouRatherQuestionInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  question: Scalars['String'];
  answers: Array<Maybe<Scalars['String']>>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** Represents an update to a `ChineseWouldYouRatherQuestion`. Fields that are set will be updated. */
export type ChineseWouldYouRatherQuestionPatch = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  question?: Maybe<Scalars['String']>;
  answers?: Maybe<Array<Maybe<Scalars['String']>>>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `ChineseWouldYouRatherQuestion` values. */
export type ChineseWouldYouRatherQuestionsConnection = {
  __typename?: 'ChineseWouldYouRatherQuestionsConnection';
  /** A list of `ChineseWouldYouRatherQuestion` objects. */
  nodes: Array<Maybe<ChineseWouldYouRatherQuestion>>;
  /** A list of edges which contains the `ChineseWouldYouRatherQuestion` and cursor to aid in pagination. */
  edges: Array<ChineseWouldYouRatherQuestionsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ChineseWouldYouRatherQuestion` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `ChineseWouldYouRatherQuestion` edge in the connection. */
export type ChineseWouldYouRatherQuestionsEdge = {
  __typename?: 'ChineseWouldYouRatherQuestionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `ChineseWouldYouRatherQuestion` at the end of the edge. */
  node?: Maybe<ChineseWouldYouRatherQuestion>;
};

/** Methods to use when ordering `ChineseWouldYouRatherQuestion`. */
export enum ChineseWouldYouRatherQuestionsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UuidAsc = 'UUID_ASC',
  UuidDesc = 'UUID_DESC',
  QuestionAsc = 'QUESTION_ASC',
  QuestionDesc = 'QUESTION_DESC',
  AnswersAsc = 'ANSWERS_ASC',
  AnswersDesc = 'ANSWERS_DESC',
  RecommendedSkillLevelIdAsc = 'RECOMMENDED_SKILL_LEVEL_ID_ASC',
  RecommendedSkillLevelIdDesc = 'RECOMMENDED_SKILL_LEVEL_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** All input for the create `ChineseGuessCharacterQuestion` mutation. */
export type CreateChineseGuessCharacterQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ChineseGuessCharacterQuestion` to be created by this mutation. */
  chineseGuessCharacterQuestion: ChineseGuessCharacterQuestionInput;
};

/** The output of our create `ChineseGuessCharacterQuestion` mutation. */
export type CreateChineseGuessCharacterQuestionPayload = {
  __typename?: 'CreateChineseGuessCharacterQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ChineseGuessCharacterQuestion` that was created by this mutation. */
  chineseGuessCharacterQuestion?: Maybe<ChineseGuessCharacterQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `ChineseGuessCharacterQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `ChineseGuessCharacterQuestion`. May be used by Relay 1. */
  chineseGuessCharacterQuestionEdge?: Maybe<ChineseGuessCharacterQuestionsEdge>;
};


/** The output of our create `ChineseGuessCharacterQuestion` mutation. */
export type CreateChineseGuessCharacterQuestionPayloadChineseGuessCharacterQuestionEdgeArgs = {
  orderBy?: Maybe<Array<ChineseGuessCharacterQuestionsOrderBy>>;
};

/** All input for the create `ChineseRandomQuestion` mutation. */
export type CreateChineseRandomQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ChineseRandomQuestion` to be created by this mutation. */
  chineseRandomQuestion: ChineseRandomQuestionInput;
};

/** The output of our create `ChineseRandomQuestion` mutation. */
export type CreateChineseRandomQuestionPayload = {
  __typename?: 'CreateChineseRandomQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ChineseRandomQuestion` that was created by this mutation. */
  chineseRandomQuestion?: Maybe<ChineseRandomQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `ChineseRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `ChineseRandomQuestion`. May be used by Relay 1. */
  chineseRandomQuestionEdge?: Maybe<ChineseRandomQuestionsEdge>;
};


/** The output of our create `ChineseRandomQuestion` mutation. */
export type CreateChineseRandomQuestionPayloadChineseRandomQuestionEdgeArgs = {
  orderBy?: Maybe<Array<ChineseRandomQuestionsOrderBy>>;
};

/** All input for the create `ChineseWouldYouRatherQuestion` mutation. */
export type CreateChineseWouldYouRatherQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ChineseWouldYouRatherQuestion` to be created by this mutation. */
  chineseWouldYouRatherQuestion: ChineseWouldYouRatherQuestionInput;
};

/** The output of our create `ChineseWouldYouRatherQuestion` mutation. */
export type CreateChineseWouldYouRatherQuestionPayload = {
  __typename?: 'CreateChineseWouldYouRatherQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ChineseWouldYouRatherQuestion` that was created by this mutation. */
  chineseWouldYouRatherQuestion?: Maybe<ChineseWouldYouRatherQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `ChineseWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `ChineseWouldYouRatherQuestion`. May be used by Relay 1. */
  chineseWouldYouRatherQuestionEdge?: Maybe<ChineseWouldYouRatherQuestionsEdge>;
};


/** The output of our create `ChineseWouldYouRatherQuestion` mutation. */
export type CreateChineseWouldYouRatherQuestionPayloadChineseWouldYouRatherQuestionEdgeArgs = {
  orderBy?: Maybe<Array<ChineseWouldYouRatherQuestionsOrderBy>>;
};

/** All input for the create `EnglishRandomQuestion` mutation. */
export type CreateEnglishRandomQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EnglishRandomQuestion` to be created by this mutation. */
  englishRandomQuestion: EnglishRandomQuestionInput;
};

/** The output of our create `EnglishRandomQuestion` mutation. */
export type CreateEnglishRandomQuestionPayload = {
  __typename?: 'CreateEnglishRandomQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EnglishRandomQuestion` that was created by this mutation. */
  englishRandomQuestion?: Maybe<EnglishRandomQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `EnglishRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `EnglishRandomQuestion`. May be used by Relay 1. */
  englishRandomQuestionEdge?: Maybe<EnglishRandomQuestionsEdge>;
};


/** The output of our create `EnglishRandomQuestion` mutation. */
export type CreateEnglishRandomQuestionPayloadEnglishRandomQuestionEdgeArgs = {
  orderBy?: Maybe<Array<EnglishRandomQuestionsOrderBy>>;
};

/** All input for the create `EnglishWord` mutation. */
export type CreateEnglishWordInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EnglishWord` to be created by this mutation. */
  englishWord: EnglishWordInput;
};

/** The output of our create `EnglishWord` mutation. */
export type CreateEnglishWordPayload = {
  __typename?: 'CreateEnglishWordPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EnglishWord` that was created by this mutation. */
  englishWord?: Maybe<EnglishWord>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `EnglishWord`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `EnglishWord`. May be used by Relay 1. */
  englishWordEdge?: Maybe<EnglishWordsEdge>;
};


/** The output of our create `EnglishWord` mutation. */
export type CreateEnglishWordPayloadEnglishWordEdgeArgs = {
  orderBy?: Maybe<Array<EnglishWordsOrderBy>>;
};

/** All input for the create `EnglishWouldYouRatherQuestion` mutation. */
export type CreateEnglishWouldYouRatherQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EnglishWouldYouRatherQuestion` to be created by this mutation. */
  englishWouldYouRatherQuestion: EnglishWouldYouRatherQuestionInput;
};

/** The output of our create `EnglishWouldYouRatherQuestion` mutation. */
export type CreateEnglishWouldYouRatherQuestionPayload = {
  __typename?: 'CreateEnglishWouldYouRatherQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EnglishWouldYouRatherQuestion` that was created by this mutation. */
  englishWouldYouRatherQuestion?: Maybe<EnglishWouldYouRatherQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `EnglishWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `EnglishWouldYouRatherQuestion`. May be used by Relay 1. */
  englishWouldYouRatherQuestionEdge?: Maybe<EnglishWouldYouRatherQuestionsEdge>;
};


/** The output of our create `EnglishWouldYouRatherQuestion` mutation. */
export type CreateEnglishWouldYouRatherQuestionPayloadEnglishWouldYouRatherQuestionEdgeArgs = {
  orderBy?: Maybe<Array<EnglishWouldYouRatherQuestionsOrderBy>>;
};

/** All input for the create `FrenchRandomQuestion` mutation. */
export type CreateFrenchRandomQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `FrenchRandomQuestion` to be created by this mutation. */
  frenchRandomQuestion: FrenchRandomQuestionInput;
};

/** The output of our create `FrenchRandomQuestion` mutation. */
export type CreateFrenchRandomQuestionPayload = {
  __typename?: 'CreateFrenchRandomQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `FrenchRandomQuestion` that was created by this mutation. */
  frenchRandomQuestion?: Maybe<FrenchRandomQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `FrenchRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `FrenchRandomQuestion`. May be used by Relay 1. */
  frenchRandomQuestionEdge?: Maybe<FrenchRandomQuestionsEdge>;
};


/** The output of our create `FrenchRandomQuestion` mutation. */
export type CreateFrenchRandomQuestionPayloadFrenchRandomQuestionEdgeArgs = {
  orderBy?: Maybe<Array<FrenchRandomQuestionsOrderBy>>;
};

/** All input for the create `FrenchWord` mutation. */
export type CreateFrenchWordInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `FrenchWord` to be created by this mutation. */
  frenchWord: FrenchWordInput;
};

/** The output of our create `FrenchWord` mutation. */
export type CreateFrenchWordPayload = {
  __typename?: 'CreateFrenchWordPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `FrenchWord` that was created by this mutation. */
  frenchWord?: Maybe<FrenchWord>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `FrenchWord`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `FrenchWord`. May be used by Relay 1. */
  frenchWordEdge?: Maybe<FrenchWordsEdge>;
};


/** The output of our create `FrenchWord` mutation. */
export type CreateFrenchWordPayloadFrenchWordEdgeArgs = {
  orderBy?: Maybe<Array<FrenchWordsOrderBy>>;
};

/** All input for the create `FrenchWouldYouRatherQuestion` mutation. */
export type CreateFrenchWouldYouRatherQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `FrenchWouldYouRatherQuestion` to be created by this mutation. */
  frenchWouldYouRatherQuestion: FrenchWouldYouRatherQuestionInput;
};

/** The output of our create `FrenchWouldYouRatherQuestion` mutation. */
export type CreateFrenchWouldYouRatherQuestionPayload = {
  __typename?: 'CreateFrenchWouldYouRatherQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `FrenchWouldYouRatherQuestion` that was created by this mutation. */
  frenchWouldYouRatherQuestion?: Maybe<FrenchWouldYouRatherQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `FrenchWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `FrenchWouldYouRatherQuestion`. May be used by Relay 1. */
  frenchWouldYouRatherQuestionEdge?: Maybe<FrenchWouldYouRatherQuestionsEdge>;
};


/** The output of our create `FrenchWouldYouRatherQuestion` mutation. */
export type CreateFrenchWouldYouRatherQuestionPayloadFrenchWouldYouRatherQuestionEdgeArgs = {
  orderBy?: Maybe<Array<FrenchWouldYouRatherQuestionsOrderBy>>;
};

/** All input for the create `GermanRandomQuestion` mutation. */
export type CreateGermanRandomQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `GermanRandomQuestion` to be created by this mutation. */
  germanRandomQuestion: GermanRandomQuestionInput;
};

/** The output of our create `GermanRandomQuestion` mutation. */
export type CreateGermanRandomQuestionPayload = {
  __typename?: 'CreateGermanRandomQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `GermanRandomQuestion` that was created by this mutation. */
  germanRandomQuestion?: Maybe<GermanRandomQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `GermanRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `GermanRandomQuestion`. May be used by Relay 1. */
  germanRandomQuestionEdge?: Maybe<GermanRandomQuestionsEdge>;
};


/** The output of our create `GermanRandomQuestion` mutation. */
export type CreateGermanRandomQuestionPayloadGermanRandomQuestionEdgeArgs = {
  orderBy?: Maybe<Array<GermanRandomQuestionsOrderBy>>;
};

/** All input for the create `GermanWord` mutation. */
export type CreateGermanWordInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `GermanWord` to be created by this mutation. */
  germanWord: GermanWordInput;
};

/** The output of our create `GermanWord` mutation. */
export type CreateGermanWordPayload = {
  __typename?: 'CreateGermanWordPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `GermanWord` that was created by this mutation. */
  germanWord?: Maybe<GermanWord>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `GermanWord`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `GermanWord`. May be used by Relay 1. */
  germanWordEdge?: Maybe<GermanWordsEdge>;
};


/** The output of our create `GermanWord` mutation. */
export type CreateGermanWordPayloadGermanWordEdgeArgs = {
  orderBy?: Maybe<Array<GermanWordsOrderBy>>;
};

/** All input for the create `GermanWouldYouRatherQuestion` mutation. */
export type CreateGermanWouldYouRatherQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `GermanWouldYouRatherQuestion` to be created by this mutation. */
  germanWouldYouRatherQuestion: GermanWouldYouRatherQuestionInput;
};

/** The output of our create `GermanWouldYouRatherQuestion` mutation. */
export type CreateGermanWouldYouRatherQuestionPayload = {
  __typename?: 'CreateGermanWouldYouRatherQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `GermanWouldYouRatherQuestion` that was created by this mutation. */
  germanWouldYouRatherQuestion?: Maybe<GermanWouldYouRatherQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `GermanWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `GermanWouldYouRatherQuestion`. May be used by Relay 1. */
  germanWouldYouRatherQuestionEdge?: Maybe<GermanWouldYouRatherQuestionsEdge>;
};


/** The output of our create `GermanWouldYouRatherQuestion` mutation. */
export type CreateGermanWouldYouRatherQuestionPayloadGermanWouldYouRatherQuestionEdgeArgs = {
  orderBy?: Maybe<Array<GermanWouldYouRatherQuestionsOrderBy>>;
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

/** All input for the create `InviteToken` mutation. */
export type CreateInviteTokenInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `InviteToken` to be created by this mutation. */
  inviteToken: InviteTokenInput;
};

/** The output of our create `InviteToken` mutation. */
export type CreateInviteTokenPayload = {
  __typename?: 'CreateInviteTokenPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `InviteToken` that was created by this mutation. */
  inviteToken?: Maybe<InviteToken>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `InviteToken`. */
  user?: Maybe<User>;
  /** An edge for our `InviteToken`. May be used by Relay 1. */
  inviteTokenEdge?: Maybe<InviteTokensEdge>;
};


/** The output of our create `InviteToken` mutation. */
export type CreateInviteTokenPayloadInviteTokenEdgeArgs = {
  orderBy?: Maybe<Array<InviteTokensOrderBy>>;
};

/** All input for the create `ItalianRandomQuestion` mutation. */
export type CreateItalianRandomQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ItalianRandomQuestion` to be created by this mutation. */
  italianRandomQuestion: ItalianRandomQuestionInput;
};

/** The output of our create `ItalianRandomQuestion` mutation. */
export type CreateItalianRandomQuestionPayload = {
  __typename?: 'CreateItalianRandomQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ItalianRandomQuestion` that was created by this mutation. */
  italianRandomQuestion?: Maybe<ItalianRandomQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `ItalianRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `ItalianRandomQuestion`. May be used by Relay 1. */
  italianRandomQuestionEdge?: Maybe<ItalianRandomQuestionsEdge>;
};


/** The output of our create `ItalianRandomQuestion` mutation. */
export type CreateItalianRandomQuestionPayloadItalianRandomQuestionEdgeArgs = {
  orderBy?: Maybe<Array<ItalianRandomQuestionsOrderBy>>;
};

/** All input for the create `ItalianWord` mutation. */
export type CreateItalianWordInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ItalianWord` to be created by this mutation. */
  italianWord: ItalianWordInput;
};

/** The output of our create `ItalianWord` mutation. */
export type CreateItalianWordPayload = {
  __typename?: 'CreateItalianWordPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ItalianWord` that was created by this mutation. */
  italianWord?: Maybe<ItalianWord>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `ItalianWord`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `ItalianWord`. May be used by Relay 1. */
  italianWordEdge?: Maybe<ItalianWordsEdge>;
};


/** The output of our create `ItalianWord` mutation. */
export type CreateItalianWordPayloadItalianWordEdgeArgs = {
  orderBy?: Maybe<Array<ItalianWordsOrderBy>>;
};

/** All input for the create `ItalianWouldYouRatherQuestion` mutation. */
export type CreateItalianWouldYouRatherQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ItalianWouldYouRatherQuestion` to be created by this mutation. */
  italianWouldYouRatherQuestion: ItalianWouldYouRatherQuestionInput;
};

/** The output of our create `ItalianWouldYouRatherQuestion` mutation. */
export type CreateItalianWouldYouRatherQuestionPayload = {
  __typename?: 'CreateItalianWouldYouRatherQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ItalianWouldYouRatherQuestion` that was created by this mutation. */
  italianWouldYouRatherQuestion?: Maybe<ItalianWouldYouRatherQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `ItalianWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `ItalianWouldYouRatherQuestion`. May be used by Relay 1. */
  italianWouldYouRatherQuestionEdge?: Maybe<ItalianWouldYouRatherQuestionsEdge>;
};


/** The output of our create `ItalianWouldYouRatherQuestion` mutation. */
export type CreateItalianWouldYouRatherQuestionPayloadItalianWouldYouRatherQuestionEdgeArgs = {
  orderBy?: Maybe<Array<ItalianWouldYouRatherQuestionsOrderBy>>;
};

/** All input for the create `JapaneseRandomQuestion` mutation. */
export type CreateJapaneseRandomQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `JapaneseRandomQuestion` to be created by this mutation. */
  japaneseRandomQuestion: JapaneseRandomQuestionInput;
};

/** The output of our create `JapaneseRandomQuestion` mutation. */
export type CreateJapaneseRandomQuestionPayload = {
  __typename?: 'CreateJapaneseRandomQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `JapaneseRandomQuestion` that was created by this mutation. */
  japaneseRandomQuestion?: Maybe<JapaneseRandomQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `JapaneseRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `JapaneseRandomQuestion`. May be used by Relay 1. */
  japaneseRandomQuestionEdge?: Maybe<JapaneseRandomQuestionsEdge>;
};


/** The output of our create `JapaneseRandomQuestion` mutation. */
export type CreateJapaneseRandomQuestionPayloadJapaneseRandomQuestionEdgeArgs = {
  orderBy?: Maybe<Array<JapaneseRandomQuestionsOrderBy>>;
};

/** All input for the create `JapaneseWouldYouRatherQuestion` mutation. */
export type CreateJapaneseWouldYouRatherQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `JapaneseWouldYouRatherQuestion` to be created by this mutation. */
  japaneseWouldYouRatherQuestion: JapaneseWouldYouRatherQuestionInput;
};

/** The output of our create `JapaneseWouldYouRatherQuestion` mutation. */
export type CreateJapaneseWouldYouRatherQuestionPayload = {
  __typename?: 'CreateJapaneseWouldYouRatherQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `JapaneseWouldYouRatherQuestion` that was created by this mutation. */
  japaneseWouldYouRatherQuestion?: Maybe<JapaneseWouldYouRatherQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `JapaneseWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `JapaneseWouldYouRatherQuestion`. May be used by Relay 1. */
  japaneseWouldYouRatherQuestionEdge?: Maybe<JapaneseWouldYouRatherQuestionsEdge>;
};


/** The output of our create `JapaneseWouldYouRatherQuestion` mutation. */
export type CreateJapaneseWouldYouRatherQuestionPayloadJapaneseWouldYouRatherQuestionEdgeArgs = {
  orderBy?: Maybe<Array<JapaneseWouldYouRatherQuestionsOrderBy>>;
};

/** All input for the create `KoreanRandomQuestion` mutation. */
export type CreateKoreanRandomQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `KoreanRandomQuestion` to be created by this mutation. */
  koreanRandomQuestion: KoreanRandomQuestionInput;
};

/** The output of our create `KoreanRandomQuestion` mutation. */
export type CreateKoreanRandomQuestionPayload = {
  __typename?: 'CreateKoreanRandomQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `KoreanRandomQuestion` that was created by this mutation. */
  koreanRandomQuestion?: Maybe<KoreanRandomQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `KoreanRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `KoreanRandomQuestion`. May be used by Relay 1. */
  koreanRandomQuestionEdge?: Maybe<KoreanRandomQuestionsEdge>;
};


/** The output of our create `KoreanRandomQuestion` mutation. */
export type CreateKoreanRandomQuestionPayloadKoreanRandomQuestionEdgeArgs = {
  orderBy?: Maybe<Array<KoreanRandomQuestionsOrderBy>>;
};

/** All input for the create `KoreanWouldYouRatherQuestion` mutation. */
export type CreateKoreanWouldYouRatherQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `KoreanWouldYouRatherQuestion` to be created by this mutation. */
  koreanWouldYouRatherQuestion: KoreanWouldYouRatherQuestionInput;
};

/** The output of our create `KoreanWouldYouRatherQuestion` mutation. */
export type CreateKoreanWouldYouRatherQuestionPayload = {
  __typename?: 'CreateKoreanWouldYouRatherQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `KoreanWouldYouRatherQuestion` that was created by this mutation. */
  koreanWouldYouRatherQuestion?: Maybe<KoreanWouldYouRatherQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `KoreanWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `KoreanWouldYouRatherQuestion`. May be used by Relay 1. */
  koreanWouldYouRatherQuestionEdge?: Maybe<KoreanWouldYouRatherQuestionsEdge>;
};


/** The output of our create `KoreanWouldYouRatherQuestion` mutation. */
export type CreateKoreanWouldYouRatherQuestionPayloadKoreanWouldYouRatherQuestionEdgeArgs = {
  orderBy?: Maybe<Array<KoreanWouldYouRatherQuestionsOrderBy>>;
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

/** All input for the create `MessagePreview` mutation. */
export type CreateMessagePreviewInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MessagePreview` to be created by this mutation. */
  messagePreview: MessagePreviewInput;
};

/** The output of our create `MessagePreview` mutation. */
export type CreateMessagePreviewPayload = {
  __typename?: 'CreateMessagePreviewPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MessagePreview` that was created by this mutation. */
  messagePreview?: Maybe<MessagePreview>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Message` that is related to this `MessagePreview`. */
  message?: Maybe<Message>;
  /** An edge for our `MessagePreview`. May be used by Relay 1. */
  messagePreviewEdge?: Maybe<MessagePreviewsEdge>;
};


/** The output of our create `MessagePreview` mutation. */
export type CreateMessagePreviewPayloadMessagePreviewEdgeArgs = {
  orderBy?: Maybe<Array<MessagePreviewsOrderBy>>;
};

/** All input for the create `NotificationChannel` mutation. */
export type CreateNotificationChannelInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `NotificationChannel` to be created by this mutation. */
  notificationChannel: NotificationChannelInput;
};

/** The output of our create `NotificationChannel` mutation. */
export type CreateNotificationChannelPayload = {
  __typename?: 'CreateNotificationChannelPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `NotificationChannel` that was created by this mutation. */
  notificationChannel?: Maybe<NotificationChannel>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `NotificationChannel`. May be used by Relay 1. */
  notificationChannelEdge?: Maybe<NotificationChannelsEdge>;
};


/** The output of our create `NotificationChannel` mutation. */
export type CreateNotificationChannelPayloadNotificationChannelEdgeArgs = {
  orderBy?: Maybe<Array<NotificationChannelsOrderBy>>;
};

/** All input for the create `Notification` mutation. */
export type CreateNotificationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Notification` to be created by this mutation. */
  notification: NotificationInput;
};

/** The output of our create `Notification` mutation. */
export type CreateNotificationPayload = {
  __typename?: 'CreateNotificationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Notification` that was created by this mutation. */
  notification?: Maybe<Notification>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `Notification`. */
  recipient?: Maybe<User>;
  /** Reads a single `NotificationChannel` that is related to this `Notification`. */
  channel?: Maybe<NotificationChannel>;
  /** Reads a single `Group` that is related to this `Notification`. */
  recipientGroup?: Maybe<Group>;
  /** An edge for our `Notification`. May be used by Relay 1. */
  notificationEdge?: Maybe<NotificationsEdge>;
};


/** The output of our create `Notification` mutation. */
export type CreateNotificationPayloadNotificationEdgeArgs = {
  orderBy?: Maybe<Array<NotificationsOrderBy>>;
};

/** All input for the create `PortugueseRandomQuestion` mutation. */
export type CreatePortugueseRandomQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `PortugueseRandomQuestion` to be created by this mutation. */
  portugueseRandomQuestion: PortugueseRandomQuestionInput;
};

/** The output of our create `PortugueseRandomQuestion` mutation. */
export type CreatePortugueseRandomQuestionPayload = {
  __typename?: 'CreatePortugueseRandomQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `PortugueseRandomQuestion` that was created by this mutation. */
  portugueseRandomQuestion?: Maybe<PortugueseRandomQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `PortugueseRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `PortugueseRandomQuestion`. May be used by Relay 1. */
  portugueseRandomQuestionEdge?: Maybe<PortugueseRandomQuestionsEdge>;
};


/** The output of our create `PortugueseRandomQuestion` mutation. */
export type CreatePortugueseRandomQuestionPayloadPortugueseRandomQuestionEdgeArgs = {
  orderBy?: Maybe<Array<PortugueseRandomQuestionsOrderBy>>;
};

/** All input for the create `PortugueseWord` mutation. */
export type CreatePortugueseWordInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `PortugueseWord` to be created by this mutation. */
  portugueseWord: PortugueseWordInput;
};

/** The output of our create `PortugueseWord` mutation. */
export type CreatePortugueseWordPayload = {
  __typename?: 'CreatePortugueseWordPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `PortugueseWord` that was created by this mutation. */
  portugueseWord?: Maybe<PortugueseWord>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `PortugueseWord`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `PortugueseWord`. May be used by Relay 1. */
  portugueseWordEdge?: Maybe<PortugueseWordsEdge>;
};


/** The output of our create `PortugueseWord` mutation. */
export type CreatePortugueseWordPayloadPortugueseWordEdgeArgs = {
  orderBy?: Maybe<Array<PortugueseWordsOrderBy>>;
};

/** All input for the create `PortugueseWouldYouRatherQuestion` mutation. */
export type CreatePortugueseWouldYouRatherQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `PortugueseWouldYouRatherQuestion` to be created by this mutation. */
  portugueseWouldYouRatherQuestion: PortugueseWouldYouRatherQuestionInput;
};

/** The output of our create `PortugueseWouldYouRatherQuestion` mutation. */
export type CreatePortugueseWouldYouRatherQuestionPayload = {
  __typename?: 'CreatePortugueseWouldYouRatherQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `PortugueseWouldYouRatherQuestion` that was created by this mutation. */
  portugueseWouldYouRatherQuestion?: Maybe<PortugueseWouldYouRatherQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `PortugueseWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `PortugueseWouldYouRatherQuestion`. May be used by Relay 1. */
  portugueseWouldYouRatherQuestionEdge?: Maybe<PortugueseWouldYouRatherQuestionsEdge>;
};


/** The output of our create `PortugueseWouldYouRatherQuestion` mutation. */
export type CreatePortugueseWouldYouRatherQuestionPayloadPortugueseWouldYouRatherQuestionEdgeArgs = {
  orderBy?: Maybe<Array<PortugueseWouldYouRatherQuestionsOrderBy>>;
};

/** All input for the create `Post` mutation. */
export type CreatePostInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Post` to be created by this mutation. */
  post: PostInput;
};

/** All input for the create `PostLike` mutation. */
export type CreatePostLikeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `PostLike` to be created by this mutation. */
  postLike: PostLikeInput;
};

/** The output of our create `PostLike` mutation. */
export type CreatePostLikePayload = {
  __typename?: 'CreatePostLikePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `PostLike` that was created by this mutation. */
  postLike?: Maybe<PostLike>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `PostLike`. */
  user?: Maybe<User>;
  /** Reads a single `Post` that is related to this `PostLike`. */
  post?: Maybe<Post>;
  /** An edge for our `PostLike`. May be used by Relay 1. */
  postLikeEdge?: Maybe<PostLikesEdge>;
};


/** The output of our create `PostLike` mutation. */
export type CreatePostLikePayloadPostLikeEdgeArgs = {
  orderBy?: Maybe<Array<PostLikesOrderBy>>;
};

/** The output of our create `Post` mutation. */
export type CreatePostPayload = {
  __typename?: 'CreatePostPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Post` that was created by this mutation. */
  post?: Maybe<Post>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `Post`. */
  author?: Maybe<User>;
  /** Reads a single `Post` that is related to this `Post`. */
  parentPost?: Maybe<Post>;
  /** Reads a single `Language` that is related to this `Post`. */
  language?: Maybe<Language>;
  /** Reads a single `Prompt` that is related to this `Post`. */
  prompt?: Maybe<Prompt>;
  /** An edge for our `Post`. May be used by Relay 1. */
  postEdge?: Maybe<PostsEdge>;
};


/** The output of our create `Post` mutation. */
export type CreatePostPayloadPostEdgeArgs = {
  orderBy?: Maybe<Array<PostsOrderBy>>;
};

/** All input for the create `PostRecording` mutation. */
export type CreatePostRecordingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `PostRecording` to be created by this mutation. */
  postRecording: PostRecordingInput;
};

/** The output of our create `PostRecording` mutation. */
export type CreatePostRecordingPayload = {
  __typename?: 'CreatePostRecordingPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `PostRecording` that was created by this mutation. */
  postRecording?: Maybe<PostRecording>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `PostRecording`. */
  user?: Maybe<User>;
  /** Reads a single `Post` that is related to this `PostRecording`. */
  post?: Maybe<Post>;
  /** An edge for our `PostRecording`. May be used by Relay 1. */
  postRecordingEdge?: Maybe<PostRecordingsEdge>;
};


/** The output of our create `PostRecording` mutation. */
export type CreatePostRecordingPayloadPostRecordingEdgeArgs = {
  orderBy?: Maybe<Array<PostRecordingsOrderBy>>;
};

/** All input for the create `Prompt` mutation. */
export type CreatePromptInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Prompt` to be created by this mutation. */
  prompt: PromptInput;
};

/** The output of our create `Prompt` mutation. */
export type CreatePromptPayload = {
  __typename?: 'CreatePromptPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Prompt` that was created by this mutation. */
  prompt?: Maybe<Prompt>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Language` that is related to this `Prompt`. */
  language?: Maybe<Language>;
  /** Reads a single `LanguageSkillLevel` that is related to this `Prompt`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `Prompt`. May be used by Relay 1. */
  promptEdge?: Maybe<PromptsEdge>;
};


/** The output of our create `Prompt` mutation. */
export type CreatePromptPayloadPromptEdgeArgs = {
  orderBy?: Maybe<Array<PromptsOrderBy>>;
};

/** All input for the create `RussianRandomQuestion` mutation. */
export type CreateRussianRandomQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `RussianRandomQuestion` to be created by this mutation. */
  russianRandomQuestion: RussianRandomQuestionInput;
};

/** The output of our create `RussianRandomQuestion` mutation. */
export type CreateRussianRandomQuestionPayload = {
  __typename?: 'CreateRussianRandomQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `RussianRandomQuestion` that was created by this mutation. */
  russianRandomQuestion?: Maybe<RussianRandomQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `RussianRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `RussianRandomQuestion`. May be used by Relay 1. */
  russianRandomQuestionEdge?: Maybe<RussianRandomQuestionsEdge>;
};


/** The output of our create `RussianRandomQuestion` mutation. */
export type CreateRussianRandomQuestionPayloadRussianRandomQuestionEdgeArgs = {
  orderBy?: Maybe<Array<RussianRandomQuestionsOrderBy>>;
};

/** All input for the create `RussianWord` mutation. */
export type CreateRussianWordInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `RussianWord` to be created by this mutation. */
  russianWord: RussianWordInput;
};

/** The output of our create `RussianWord` mutation. */
export type CreateRussianWordPayload = {
  __typename?: 'CreateRussianWordPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `RussianWord` that was created by this mutation. */
  russianWord?: Maybe<RussianWord>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `RussianWord`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `RussianWord`. May be used by Relay 1. */
  russianWordEdge?: Maybe<RussianWordsEdge>;
};


/** The output of our create `RussianWord` mutation. */
export type CreateRussianWordPayloadRussianWordEdgeArgs = {
  orderBy?: Maybe<Array<RussianWordsOrderBy>>;
};

/** All input for the create `RussianWouldYouRatherQuestion` mutation. */
export type CreateRussianWouldYouRatherQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `RussianWouldYouRatherQuestion` to be created by this mutation. */
  russianWouldYouRatherQuestion: RussianWouldYouRatherQuestionInput;
};

/** The output of our create `RussianWouldYouRatherQuestion` mutation. */
export type CreateRussianWouldYouRatherQuestionPayload = {
  __typename?: 'CreateRussianWouldYouRatherQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `RussianWouldYouRatherQuestion` that was created by this mutation. */
  russianWouldYouRatherQuestion?: Maybe<RussianWouldYouRatherQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `RussianWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `RussianWouldYouRatherQuestion`. May be used by Relay 1. */
  russianWouldYouRatherQuestionEdge?: Maybe<RussianWouldYouRatherQuestionsEdge>;
};


/** The output of our create `RussianWouldYouRatherQuestion` mutation. */
export type CreateRussianWouldYouRatherQuestionPayloadRussianWouldYouRatherQuestionEdgeArgs = {
  orderBy?: Maybe<Array<RussianWouldYouRatherQuestionsOrderBy>>;
};

/** All input for the create `SpanishRandomQuestion` mutation. */
export type CreateSpanishRandomQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SpanishRandomQuestion` to be created by this mutation. */
  spanishRandomQuestion: SpanishRandomQuestionInput;
};

/** The output of our create `SpanishRandomQuestion` mutation. */
export type CreateSpanishRandomQuestionPayload = {
  __typename?: 'CreateSpanishRandomQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SpanishRandomQuestion` that was created by this mutation. */
  spanishRandomQuestion?: Maybe<SpanishRandomQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `SpanishRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `SpanishRandomQuestion`. May be used by Relay 1. */
  spanishRandomQuestionEdge?: Maybe<SpanishRandomQuestionsEdge>;
};


/** The output of our create `SpanishRandomQuestion` mutation. */
export type CreateSpanishRandomQuestionPayloadSpanishRandomQuestionEdgeArgs = {
  orderBy?: Maybe<Array<SpanishRandomQuestionsOrderBy>>;
};

/** All input for the create `SpanishWord` mutation. */
export type CreateSpanishWordInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SpanishWord` to be created by this mutation. */
  spanishWord: SpanishWordInput;
};

/** The output of our create `SpanishWord` mutation. */
export type CreateSpanishWordPayload = {
  __typename?: 'CreateSpanishWordPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SpanishWord` that was created by this mutation. */
  spanishWord?: Maybe<SpanishWord>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `SpanishWord`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `SpanishWord`. May be used by Relay 1. */
  spanishWordEdge?: Maybe<SpanishWordsEdge>;
};


/** The output of our create `SpanishWord` mutation. */
export type CreateSpanishWordPayloadSpanishWordEdgeArgs = {
  orderBy?: Maybe<Array<SpanishWordsOrderBy>>;
};

/** All input for the create `SpanishWouldYouRatherQuestion` mutation. */
export type CreateSpanishWouldYouRatherQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SpanishWouldYouRatherQuestion` to be created by this mutation. */
  spanishWouldYouRatherQuestion: SpanishWouldYouRatherQuestionInput;
};

/** The output of our create `SpanishWouldYouRatherQuestion` mutation. */
export type CreateSpanishWouldYouRatherQuestionPayload = {
  __typename?: 'CreateSpanishWouldYouRatherQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SpanishWouldYouRatherQuestion` that was created by this mutation. */
  spanishWouldYouRatherQuestion?: Maybe<SpanishWouldYouRatherQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `SpanishWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `SpanishWouldYouRatherQuestion`. May be used by Relay 1. */
  spanishWouldYouRatherQuestionEdge?: Maybe<SpanishWouldYouRatherQuestionsEdge>;
};


/** The output of our create `SpanishWouldYouRatherQuestion` mutation. */
export type CreateSpanishWouldYouRatherQuestionPayloadSpanishWouldYouRatherQuestionEdgeArgs = {
  orderBy?: Maybe<Array<SpanishWouldYouRatherQuestionsOrderBy>>;
};

/** All input for the create `UserDevice` mutation. */
export type CreateUserDeviceInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserDevice` to be created by this mutation. */
  userDevice: UserDeviceInput;
};

/** The output of our create `UserDevice` mutation. */
export type CreateUserDevicePayload = {
  __typename?: 'CreateUserDevicePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserDevice` that was created by this mutation. */
  userDevice?: Maybe<UserDevice>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `UserDevice`. */
  user?: Maybe<User>;
  /** An edge for our `UserDevice`. May be used by Relay 1. */
  userDeviceEdge?: Maybe<UserDevicesEdge>;
};


/** The output of our create `UserDevice` mutation. */
export type CreateUserDevicePayloadUserDeviceEdgeArgs = {
  orderBy?: Maybe<Array<UserDevicesOrderBy>>;
};

/** All input for the create `UserFollower` mutation. */
export type CreateUserFollowerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserFollower` to be created by this mutation. */
  userFollower: UserFollowerInput;
};

/** The output of our create `UserFollower` mutation. */
export type CreateUserFollowerPayload = {
  __typename?: 'CreateUserFollowerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserFollower` that was created by this mutation. */
  userFollower?: Maybe<UserFollower>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `UserFollower`. */
  user?: Maybe<User>;
  /** Reads a single `User` that is related to this `UserFollower`. */
  follower?: Maybe<User>;
  /** An edge for our `UserFollower`. May be used by Relay 1. */
  userFollowerEdge?: Maybe<UserFollowersEdge>;
};


/** The output of our create `UserFollower` mutation. */
export type CreateUserFollowerPayloadUserFollowerEdgeArgs = {
  orderBy?: Maybe<Array<UserFollowersOrderBy>>;
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
  /** Reads a single `InviteToken` that is related to this `User`. */
  signedUpWithToken?: Maybe<InviteToken>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our create `User` mutation. */
export type CreateUserPayloadUserEdgeArgs = {
  orderBy?: Maybe<Array<UsersOrderBy>>;
};

/** All input for the create `UserPreference` mutation. */
export type CreateUserPreferenceInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserPreference` to be created by this mutation. */
  userPreference: UserPreferenceInput;
};

/** The output of our create `UserPreference` mutation. */
export type CreateUserPreferencePayload = {
  __typename?: 'CreateUserPreferencePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserPreference` that was created by this mutation. */
  userPreference?: Maybe<UserPreference>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `UserPreference`. */
  user?: Maybe<User>;
  /** Reads a single `Language` that is related to this `UserPreference`. */
  feedLanguage?: Maybe<Language>;
  /** An edge for our `UserPreference`. May be used by Relay 1. */
  userPreferenceEdge?: Maybe<UserPreferencesEdge>;
};


/** The output of our create `UserPreference` mutation. */
export type CreateUserPreferencePayloadUserPreferenceEdgeArgs = {
  orderBy?: Maybe<Array<UserPreferencesOrderBy>>;
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

/** All input for the `deleteChineseGuessCharacterQuestionByNodeId` mutation. */
export type DeleteChineseGuessCharacterQuestionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `ChineseGuessCharacterQuestion` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteChineseGuessCharacterQuestionByUuid` mutation. */
export type DeleteChineseGuessCharacterQuestionByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
};

/** All input for the `deleteChineseGuessCharacterQuestion` mutation. */
export type DeleteChineseGuessCharacterQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `ChineseGuessCharacterQuestion` mutation. */
export type DeleteChineseGuessCharacterQuestionPayload = {
  __typename?: 'DeleteChineseGuessCharacterQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ChineseGuessCharacterQuestion` that was deleted by this mutation. */
  chineseGuessCharacterQuestion?: Maybe<ChineseGuessCharacterQuestion>;
  deletedGuessCharacterQuestionsZhNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `ChineseGuessCharacterQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `ChineseGuessCharacterQuestion`. May be used by Relay 1. */
  chineseGuessCharacterQuestionEdge?: Maybe<ChineseGuessCharacterQuestionsEdge>;
};


/** The output of our delete `ChineseGuessCharacterQuestion` mutation. */
export type DeleteChineseGuessCharacterQuestionPayloadChineseGuessCharacterQuestionEdgeArgs = {
  orderBy?: Maybe<Array<ChineseGuessCharacterQuestionsOrderBy>>;
};

/** All input for the `deleteChineseRandomQuestionByNodeId` mutation. */
export type DeleteChineseRandomQuestionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `ChineseRandomQuestion` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteChineseRandomQuestionByUuid` mutation. */
export type DeleteChineseRandomQuestionByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
};

/** All input for the `deleteChineseRandomQuestion` mutation. */
export type DeleteChineseRandomQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `ChineseRandomQuestion` mutation. */
export type DeleteChineseRandomQuestionPayload = {
  __typename?: 'DeleteChineseRandomQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ChineseRandomQuestion` that was deleted by this mutation. */
  chineseRandomQuestion?: Maybe<ChineseRandomQuestion>;
  deletedRandomQuestionsZhNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `ChineseRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `ChineseRandomQuestion`. May be used by Relay 1. */
  chineseRandomQuestionEdge?: Maybe<ChineseRandomQuestionsEdge>;
};


/** The output of our delete `ChineseRandomQuestion` mutation. */
export type DeleteChineseRandomQuestionPayloadChineseRandomQuestionEdgeArgs = {
  orderBy?: Maybe<Array<ChineseRandomQuestionsOrderBy>>;
};

/** All input for the `deleteChineseWouldYouRatherQuestionByNodeId` mutation. */
export type DeleteChineseWouldYouRatherQuestionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `ChineseWouldYouRatherQuestion` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteChineseWouldYouRatherQuestionByUuid` mutation. */
export type DeleteChineseWouldYouRatherQuestionByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
};

/** All input for the `deleteChineseWouldYouRatherQuestion` mutation. */
export type DeleteChineseWouldYouRatherQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `ChineseWouldYouRatherQuestion` mutation. */
export type DeleteChineseWouldYouRatherQuestionPayload = {
  __typename?: 'DeleteChineseWouldYouRatherQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ChineseWouldYouRatherQuestion` that was deleted by this mutation. */
  chineseWouldYouRatherQuestion?: Maybe<ChineseWouldYouRatherQuestion>;
  deletedWouldYouRatherQuestionsZhNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `ChineseWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `ChineseWouldYouRatherQuestion`. May be used by Relay 1. */
  chineseWouldYouRatherQuestionEdge?: Maybe<ChineseWouldYouRatherQuestionsEdge>;
};


/** The output of our delete `ChineseWouldYouRatherQuestion` mutation. */
export type DeleteChineseWouldYouRatherQuestionPayloadChineseWouldYouRatherQuestionEdgeArgs = {
  orderBy?: Maybe<Array<ChineseWouldYouRatherQuestionsOrderBy>>;
};

/** All input for the `deleteEnglishRandomQuestionByNodeId` mutation. */
export type DeleteEnglishRandomQuestionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `EnglishRandomQuestion` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteEnglishRandomQuestionByUuid` mutation. */
export type DeleteEnglishRandomQuestionByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
};

/** All input for the `deleteEnglishRandomQuestion` mutation. */
export type DeleteEnglishRandomQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `EnglishRandomQuestion` mutation. */
export type DeleteEnglishRandomQuestionPayload = {
  __typename?: 'DeleteEnglishRandomQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EnglishRandomQuestion` that was deleted by this mutation. */
  englishRandomQuestion?: Maybe<EnglishRandomQuestion>;
  deletedRandomQuestionsEnNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `EnglishRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `EnglishRandomQuestion`. May be used by Relay 1. */
  englishRandomQuestionEdge?: Maybe<EnglishRandomQuestionsEdge>;
};


/** The output of our delete `EnglishRandomQuestion` mutation. */
export type DeleteEnglishRandomQuestionPayloadEnglishRandomQuestionEdgeArgs = {
  orderBy?: Maybe<Array<EnglishRandomQuestionsOrderBy>>;
};

/** All input for the `deleteEnglishWordByNodeId` mutation. */
export type DeleteEnglishWordByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `EnglishWord` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteEnglishWordByUuid` mutation. */
export type DeleteEnglishWordByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
};

/** All input for the `deleteEnglishWord` mutation. */
export type DeleteEnglishWordInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `EnglishWord` mutation. */
export type DeleteEnglishWordPayload = {
  __typename?: 'DeleteEnglishWordPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EnglishWord` that was deleted by this mutation. */
  englishWord?: Maybe<EnglishWord>;
  deletedWordsEnNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `EnglishWord`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `EnglishWord`. May be used by Relay 1. */
  englishWordEdge?: Maybe<EnglishWordsEdge>;
};


/** The output of our delete `EnglishWord` mutation. */
export type DeleteEnglishWordPayloadEnglishWordEdgeArgs = {
  orderBy?: Maybe<Array<EnglishWordsOrderBy>>;
};

/** All input for the `deleteEnglishWouldYouRatherQuestionByNodeId` mutation. */
export type DeleteEnglishWouldYouRatherQuestionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `EnglishWouldYouRatherQuestion` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteEnglishWouldYouRatherQuestionByUuid` mutation. */
export type DeleteEnglishWouldYouRatherQuestionByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
};

/** All input for the `deleteEnglishWouldYouRatherQuestion` mutation. */
export type DeleteEnglishWouldYouRatherQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `EnglishWouldYouRatherQuestion` mutation. */
export type DeleteEnglishWouldYouRatherQuestionPayload = {
  __typename?: 'DeleteEnglishWouldYouRatherQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EnglishWouldYouRatherQuestion` that was deleted by this mutation. */
  englishWouldYouRatherQuestion?: Maybe<EnglishWouldYouRatherQuestion>;
  deletedWouldYouRatherQuestionsEnNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `EnglishWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `EnglishWouldYouRatherQuestion`. May be used by Relay 1. */
  englishWouldYouRatherQuestionEdge?: Maybe<EnglishWouldYouRatherQuestionsEdge>;
};


/** The output of our delete `EnglishWouldYouRatherQuestion` mutation. */
export type DeleteEnglishWouldYouRatherQuestionPayloadEnglishWouldYouRatherQuestionEdgeArgs = {
  orderBy?: Maybe<Array<EnglishWouldYouRatherQuestionsOrderBy>>;
};

/** All input for the `deleteFrenchRandomQuestionByNodeId` mutation. */
export type DeleteFrenchRandomQuestionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `FrenchRandomQuestion` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteFrenchRandomQuestionByUuid` mutation. */
export type DeleteFrenchRandomQuestionByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
};

/** All input for the `deleteFrenchRandomQuestion` mutation. */
export type DeleteFrenchRandomQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `FrenchRandomQuestion` mutation. */
export type DeleteFrenchRandomQuestionPayload = {
  __typename?: 'DeleteFrenchRandomQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `FrenchRandomQuestion` that was deleted by this mutation. */
  frenchRandomQuestion?: Maybe<FrenchRandomQuestion>;
  deletedRandomQuestionsFrNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `FrenchRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `FrenchRandomQuestion`. May be used by Relay 1. */
  frenchRandomQuestionEdge?: Maybe<FrenchRandomQuestionsEdge>;
};


/** The output of our delete `FrenchRandomQuestion` mutation. */
export type DeleteFrenchRandomQuestionPayloadFrenchRandomQuestionEdgeArgs = {
  orderBy?: Maybe<Array<FrenchRandomQuestionsOrderBy>>;
};

/** All input for the `deleteFrenchWordByNodeId` mutation. */
export type DeleteFrenchWordByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `FrenchWord` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteFrenchWordByUuid` mutation. */
export type DeleteFrenchWordByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
};

/** All input for the `deleteFrenchWord` mutation. */
export type DeleteFrenchWordInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `FrenchWord` mutation. */
export type DeleteFrenchWordPayload = {
  __typename?: 'DeleteFrenchWordPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `FrenchWord` that was deleted by this mutation. */
  frenchWord?: Maybe<FrenchWord>;
  deletedWordsFrNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `FrenchWord`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `FrenchWord`. May be used by Relay 1. */
  frenchWordEdge?: Maybe<FrenchWordsEdge>;
};


/** The output of our delete `FrenchWord` mutation. */
export type DeleteFrenchWordPayloadFrenchWordEdgeArgs = {
  orderBy?: Maybe<Array<FrenchWordsOrderBy>>;
};

/** All input for the `deleteFrenchWouldYouRatherQuestionByNodeId` mutation. */
export type DeleteFrenchWouldYouRatherQuestionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `FrenchWouldYouRatherQuestion` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteFrenchWouldYouRatherQuestionByUuid` mutation. */
export type DeleteFrenchWouldYouRatherQuestionByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
};

/** All input for the `deleteFrenchWouldYouRatherQuestion` mutation. */
export type DeleteFrenchWouldYouRatherQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `FrenchWouldYouRatherQuestion` mutation. */
export type DeleteFrenchWouldYouRatherQuestionPayload = {
  __typename?: 'DeleteFrenchWouldYouRatherQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `FrenchWouldYouRatherQuestion` that was deleted by this mutation. */
  frenchWouldYouRatherQuestion?: Maybe<FrenchWouldYouRatherQuestion>;
  deletedWouldYouRatherQuestionsFrNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `FrenchWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `FrenchWouldYouRatherQuestion`. May be used by Relay 1. */
  frenchWouldYouRatherQuestionEdge?: Maybe<FrenchWouldYouRatherQuestionsEdge>;
};


/** The output of our delete `FrenchWouldYouRatherQuestion` mutation. */
export type DeleteFrenchWouldYouRatherQuestionPayloadFrenchWouldYouRatherQuestionEdgeArgs = {
  orderBy?: Maybe<Array<FrenchWouldYouRatherQuestionsOrderBy>>;
};

/** All input for the `deleteGermanRandomQuestionByNodeId` mutation. */
export type DeleteGermanRandomQuestionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `GermanRandomQuestion` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteGermanRandomQuestionByUuid` mutation. */
export type DeleteGermanRandomQuestionByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
};

/** All input for the `deleteGermanRandomQuestion` mutation. */
export type DeleteGermanRandomQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `GermanRandomQuestion` mutation. */
export type DeleteGermanRandomQuestionPayload = {
  __typename?: 'DeleteGermanRandomQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `GermanRandomQuestion` that was deleted by this mutation. */
  germanRandomQuestion?: Maybe<GermanRandomQuestion>;
  deletedRandomQuestionsDeNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `GermanRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `GermanRandomQuestion`. May be used by Relay 1. */
  germanRandomQuestionEdge?: Maybe<GermanRandomQuestionsEdge>;
};


/** The output of our delete `GermanRandomQuestion` mutation. */
export type DeleteGermanRandomQuestionPayloadGermanRandomQuestionEdgeArgs = {
  orderBy?: Maybe<Array<GermanRandomQuestionsOrderBy>>;
};

/** All input for the `deleteGermanWordByNodeId` mutation. */
export type DeleteGermanWordByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `GermanWord` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteGermanWordByUuid` mutation. */
export type DeleteGermanWordByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
};

/** All input for the `deleteGermanWord` mutation. */
export type DeleteGermanWordInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `GermanWord` mutation. */
export type DeleteGermanWordPayload = {
  __typename?: 'DeleteGermanWordPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `GermanWord` that was deleted by this mutation. */
  germanWord?: Maybe<GermanWord>;
  deletedWordsDeNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `GermanWord`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `GermanWord`. May be used by Relay 1. */
  germanWordEdge?: Maybe<GermanWordsEdge>;
};


/** The output of our delete `GermanWord` mutation. */
export type DeleteGermanWordPayloadGermanWordEdgeArgs = {
  orderBy?: Maybe<Array<GermanWordsOrderBy>>;
};

/** All input for the `deleteGermanWouldYouRatherQuestionByNodeId` mutation. */
export type DeleteGermanWouldYouRatherQuestionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `GermanWouldYouRatherQuestion` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteGermanWouldYouRatherQuestionByUuid` mutation. */
export type DeleteGermanWouldYouRatherQuestionByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
};

/** All input for the `deleteGermanWouldYouRatherQuestion` mutation. */
export type DeleteGermanWouldYouRatherQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `GermanWouldYouRatherQuestion` mutation. */
export type DeleteGermanWouldYouRatherQuestionPayload = {
  __typename?: 'DeleteGermanWouldYouRatherQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `GermanWouldYouRatherQuestion` that was deleted by this mutation. */
  germanWouldYouRatherQuestion?: Maybe<GermanWouldYouRatherQuestion>;
  deletedWouldYouRatherQuestionsDeNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `GermanWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `GermanWouldYouRatherQuestion`. May be used by Relay 1. */
  germanWouldYouRatherQuestionEdge?: Maybe<GermanWouldYouRatherQuestionsEdge>;
};


/** The output of our delete `GermanWouldYouRatherQuestion` mutation. */
export type DeleteGermanWouldYouRatherQuestionPayloadGermanWouldYouRatherQuestionEdgeArgs = {
  orderBy?: Maybe<Array<GermanWouldYouRatherQuestionsOrderBy>>;
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

/** All input for the `deleteGroupByUuid` mutation. */
export type DeleteGroupByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
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

/** All input for the `deleteInviteTokenByNodeId` mutation. */
export type DeleteInviteTokenByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `InviteToken` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteInviteToken` mutation. */
export type DeleteInviteTokenInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `InviteToken` mutation. */
export type DeleteInviteTokenPayload = {
  __typename?: 'DeleteInviteTokenPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `InviteToken` that was deleted by this mutation. */
  inviteToken?: Maybe<InviteToken>;
  deletedInviteTokenNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `InviteToken`. */
  user?: Maybe<User>;
  /** An edge for our `InviteToken`. May be used by Relay 1. */
  inviteTokenEdge?: Maybe<InviteTokensEdge>;
};


/** The output of our delete `InviteToken` mutation. */
export type DeleteInviteTokenPayloadInviteTokenEdgeArgs = {
  orderBy?: Maybe<Array<InviteTokensOrderBy>>;
};

/** All input for the `deleteItalianRandomQuestionByNodeId` mutation. */
export type DeleteItalianRandomQuestionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `ItalianRandomQuestion` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteItalianRandomQuestionByUuid` mutation. */
export type DeleteItalianRandomQuestionByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
};

/** All input for the `deleteItalianRandomQuestion` mutation. */
export type DeleteItalianRandomQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `ItalianRandomQuestion` mutation. */
export type DeleteItalianRandomQuestionPayload = {
  __typename?: 'DeleteItalianRandomQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ItalianRandomQuestion` that was deleted by this mutation. */
  italianRandomQuestion?: Maybe<ItalianRandomQuestion>;
  deletedRandomQuestionsItNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `ItalianRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `ItalianRandomQuestion`. May be used by Relay 1. */
  italianRandomQuestionEdge?: Maybe<ItalianRandomQuestionsEdge>;
};


/** The output of our delete `ItalianRandomQuestion` mutation. */
export type DeleteItalianRandomQuestionPayloadItalianRandomQuestionEdgeArgs = {
  orderBy?: Maybe<Array<ItalianRandomQuestionsOrderBy>>;
};

/** All input for the `deleteItalianWordByNodeId` mutation. */
export type DeleteItalianWordByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `ItalianWord` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteItalianWordByUuid` mutation. */
export type DeleteItalianWordByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
};

/** All input for the `deleteItalianWord` mutation. */
export type DeleteItalianWordInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `ItalianWord` mutation. */
export type DeleteItalianWordPayload = {
  __typename?: 'DeleteItalianWordPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ItalianWord` that was deleted by this mutation. */
  italianWord?: Maybe<ItalianWord>;
  deletedWordsItNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `ItalianWord`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `ItalianWord`. May be used by Relay 1. */
  italianWordEdge?: Maybe<ItalianWordsEdge>;
};


/** The output of our delete `ItalianWord` mutation. */
export type DeleteItalianWordPayloadItalianWordEdgeArgs = {
  orderBy?: Maybe<Array<ItalianWordsOrderBy>>;
};

/** All input for the `deleteItalianWouldYouRatherQuestionByNodeId` mutation. */
export type DeleteItalianWouldYouRatherQuestionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `ItalianWouldYouRatherQuestion` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteItalianWouldYouRatherQuestionByUuid` mutation. */
export type DeleteItalianWouldYouRatherQuestionByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
};

/** All input for the `deleteItalianWouldYouRatherQuestion` mutation. */
export type DeleteItalianWouldYouRatherQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `ItalianWouldYouRatherQuestion` mutation. */
export type DeleteItalianWouldYouRatherQuestionPayload = {
  __typename?: 'DeleteItalianWouldYouRatherQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ItalianWouldYouRatherQuestion` that was deleted by this mutation. */
  italianWouldYouRatherQuestion?: Maybe<ItalianWouldYouRatherQuestion>;
  deletedWouldYouRatherQuestionsItNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `ItalianWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `ItalianWouldYouRatherQuestion`. May be used by Relay 1. */
  italianWouldYouRatherQuestionEdge?: Maybe<ItalianWouldYouRatherQuestionsEdge>;
};


/** The output of our delete `ItalianWouldYouRatherQuestion` mutation. */
export type DeleteItalianWouldYouRatherQuestionPayloadItalianWouldYouRatherQuestionEdgeArgs = {
  orderBy?: Maybe<Array<ItalianWouldYouRatherQuestionsOrderBy>>;
};

/** All input for the `deleteJapaneseRandomQuestionByNodeId` mutation. */
export type DeleteJapaneseRandomQuestionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `JapaneseRandomQuestion` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteJapaneseRandomQuestionByUuid` mutation. */
export type DeleteJapaneseRandomQuestionByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
};

/** All input for the `deleteJapaneseRandomQuestion` mutation. */
export type DeleteJapaneseRandomQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `JapaneseRandomQuestion` mutation. */
export type DeleteJapaneseRandomQuestionPayload = {
  __typename?: 'DeleteJapaneseRandomQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `JapaneseRandomQuestion` that was deleted by this mutation. */
  japaneseRandomQuestion?: Maybe<JapaneseRandomQuestion>;
  deletedRandomQuestionsJaNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `JapaneseRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `JapaneseRandomQuestion`. May be used by Relay 1. */
  japaneseRandomQuestionEdge?: Maybe<JapaneseRandomQuestionsEdge>;
};


/** The output of our delete `JapaneseRandomQuestion` mutation. */
export type DeleteJapaneseRandomQuestionPayloadJapaneseRandomQuestionEdgeArgs = {
  orderBy?: Maybe<Array<JapaneseRandomQuestionsOrderBy>>;
};

/** All input for the `deleteJapaneseWouldYouRatherQuestionByNodeId` mutation. */
export type DeleteJapaneseWouldYouRatherQuestionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `JapaneseWouldYouRatherQuestion` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteJapaneseWouldYouRatherQuestionByUuid` mutation. */
export type DeleteJapaneseWouldYouRatherQuestionByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
};

/** All input for the `deleteJapaneseWouldYouRatherQuestion` mutation. */
export type DeleteJapaneseWouldYouRatherQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `JapaneseWouldYouRatherQuestion` mutation. */
export type DeleteJapaneseWouldYouRatherQuestionPayload = {
  __typename?: 'DeleteJapaneseWouldYouRatherQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `JapaneseWouldYouRatherQuestion` that was deleted by this mutation. */
  japaneseWouldYouRatherQuestion?: Maybe<JapaneseWouldYouRatherQuestion>;
  deletedWouldYouRatherQuestionsJaNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `JapaneseWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `JapaneseWouldYouRatherQuestion`. May be used by Relay 1. */
  japaneseWouldYouRatherQuestionEdge?: Maybe<JapaneseWouldYouRatherQuestionsEdge>;
};


/** The output of our delete `JapaneseWouldYouRatherQuestion` mutation. */
export type DeleteJapaneseWouldYouRatherQuestionPayloadJapaneseWouldYouRatherQuestionEdgeArgs = {
  orderBy?: Maybe<Array<JapaneseWouldYouRatherQuestionsOrderBy>>;
};

/** All input for the `deleteKoreanRandomQuestionByNodeId` mutation. */
export type DeleteKoreanRandomQuestionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `KoreanRandomQuestion` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteKoreanRandomQuestionByUuid` mutation. */
export type DeleteKoreanRandomQuestionByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
};

/** All input for the `deleteKoreanRandomQuestion` mutation. */
export type DeleteKoreanRandomQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `KoreanRandomQuestion` mutation. */
export type DeleteKoreanRandomQuestionPayload = {
  __typename?: 'DeleteKoreanRandomQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `KoreanRandomQuestion` that was deleted by this mutation. */
  koreanRandomQuestion?: Maybe<KoreanRandomQuestion>;
  deletedRandomQuestionsKoNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `KoreanRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `KoreanRandomQuestion`. May be used by Relay 1. */
  koreanRandomQuestionEdge?: Maybe<KoreanRandomQuestionsEdge>;
};


/** The output of our delete `KoreanRandomQuestion` mutation. */
export type DeleteKoreanRandomQuestionPayloadKoreanRandomQuestionEdgeArgs = {
  orderBy?: Maybe<Array<KoreanRandomQuestionsOrderBy>>;
};

/** All input for the `deleteKoreanWouldYouRatherQuestionByNodeId` mutation. */
export type DeleteKoreanWouldYouRatherQuestionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `KoreanWouldYouRatherQuestion` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteKoreanWouldYouRatherQuestionByUuid` mutation. */
export type DeleteKoreanWouldYouRatherQuestionByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
};

/** All input for the `deleteKoreanWouldYouRatherQuestion` mutation. */
export type DeleteKoreanWouldYouRatherQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `KoreanWouldYouRatherQuestion` mutation. */
export type DeleteKoreanWouldYouRatherQuestionPayload = {
  __typename?: 'DeleteKoreanWouldYouRatherQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `KoreanWouldYouRatherQuestion` that was deleted by this mutation. */
  koreanWouldYouRatherQuestion?: Maybe<KoreanWouldYouRatherQuestion>;
  deletedWouldYouRatherQuestionsKoNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `KoreanWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `KoreanWouldYouRatherQuestion`. May be used by Relay 1. */
  koreanWouldYouRatherQuestionEdge?: Maybe<KoreanWouldYouRatherQuestionsEdge>;
};


/** The output of our delete `KoreanWouldYouRatherQuestion` mutation. */
export type DeleteKoreanWouldYouRatherQuestionPayloadKoreanWouldYouRatherQuestionEdgeArgs = {
  orderBy?: Maybe<Array<KoreanWouldYouRatherQuestionsOrderBy>>;
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

/** All input for the `deleteMessageByUuid` mutation. */
export type DeleteMessageByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
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

/** All input for the `deleteMessagePreviewByNodeId` mutation. */
export type DeleteMessagePreviewByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `MessagePreview` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteMessagePreviewByUuid` mutation. */
export type DeleteMessagePreviewByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
};

/** All input for the `deleteMessagePreview` mutation. */
export type DeleteMessagePreviewInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `MessagePreview` mutation. */
export type DeleteMessagePreviewPayload = {
  __typename?: 'DeleteMessagePreviewPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MessagePreview` that was deleted by this mutation. */
  messagePreview?: Maybe<MessagePreview>;
  deletedMessagePreviewNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Message` that is related to this `MessagePreview`. */
  message?: Maybe<Message>;
  /** An edge for our `MessagePreview`. May be used by Relay 1. */
  messagePreviewEdge?: Maybe<MessagePreviewsEdge>;
};


/** The output of our delete `MessagePreview` mutation. */
export type DeleteMessagePreviewPayloadMessagePreviewEdgeArgs = {
  orderBy?: Maybe<Array<MessagePreviewsOrderBy>>;
};

/** All input for the `deleteNotificationByNodeId` mutation. */
export type DeleteNotificationByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Notification` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteNotificationByUuid` mutation. */
export type DeleteNotificationByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
};

/** All input for the `deleteNotificationChannelByName` mutation. */
export type DeleteNotificationChannelByNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

/** All input for the `deleteNotificationChannelByNodeId` mutation. */
export type DeleteNotificationChannelByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `NotificationChannel` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteNotificationChannelByUuid` mutation. */
export type DeleteNotificationChannelByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
};

/** All input for the `deleteNotificationChannel` mutation. */
export type DeleteNotificationChannelInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `NotificationChannel` mutation. */
export type DeleteNotificationChannelPayload = {
  __typename?: 'DeleteNotificationChannelPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `NotificationChannel` that was deleted by this mutation. */
  notificationChannel?: Maybe<NotificationChannel>;
  deletedNotificationChannelNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `NotificationChannel`. May be used by Relay 1. */
  notificationChannelEdge?: Maybe<NotificationChannelsEdge>;
};


/** The output of our delete `NotificationChannel` mutation. */
export type DeleteNotificationChannelPayloadNotificationChannelEdgeArgs = {
  orderBy?: Maybe<Array<NotificationChannelsOrderBy>>;
};

/** All input for the `deleteNotification` mutation. */
export type DeleteNotificationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `Notification` mutation. */
export type DeleteNotificationPayload = {
  __typename?: 'DeleteNotificationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Notification` that was deleted by this mutation. */
  notification?: Maybe<Notification>;
  deletedNotificationNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `Notification`. */
  recipient?: Maybe<User>;
  /** Reads a single `NotificationChannel` that is related to this `Notification`. */
  channel?: Maybe<NotificationChannel>;
  /** Reads a single `Group` that is related to this `Notification`. */
  recipientGroup?: Maybe<Group>;
  /** An edge for our `Notification`. May be used by Relay 1. */
  notificationEdge?: Maybe<NotificationsEdge>;
};


/** The output of our delete `Notification` mutation. */
export type DeleteNotificationPayloadNotificationEdgeArgs = {
  orderBy?: Maybe<Array<NotificationsOrderBy>>;
};

/** All input for the `deletePortugueseRandomQuestionByNodeId` mutation. */
export type DeletePortugueseRandomQuestionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PortugueseRandomQuestion` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePortugueseRandomQuestionByUuid` mutation. */
export type DeletePortugueseRandomQuestionByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
};

/** All input for the `deletePortugueseRandomQuestion` mutation. */
export type DeletePortugueseRandomQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `PortugueseRandomQuestion` mutation. */
export type DeletePortugueseRandomQuestionPayload = {
  __typename?: 'DeletePortugueseRandomQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `PortugueseRandomQuestion` that was deleted by this mutation. */
  portugueseRandomQuestion?: Maybe<PortugueseRandomQuestion>;
  deletedRandomQuestionsPtNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `PortugueseRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `PortugueseRandomQuestion`. May be used by Relay 1. */
  portugueseRandomQuestionEdge?: Maybe<PortugueseRandomQuestionsEdge>;
};


/** The output of our delete `PortugueseRandomQuestion` mutation. */
export type DeletePortugueseRandomQuestionPayloadPortugueseRandomQuestionEdgeArgs = {
  orderBy?: Maybe<Array<PortugueseRandomQuestionsOrderBy>>;
};

/** All input for the `deletePortugueseWordByNodeId` mutation. */
export type DeletePortugueseWordByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PortugueseWord` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePortugueseWordByUuid` mutation. */
export type DeletePortugueseWordByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
};

/** All input for the `deletePortugueseWord` mutation. */
export type DeletePortugueseWordInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `PortugueseWord` mutation. */
export type DeletePortugueseWordPayload = {
  __typename?: 'DeletePortugueseWordPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `PortugueseWord` that was deleted by this mutation. */
  portugueseWord?: Maybe<PortugueseWord>;
  deletedWordsPtNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `PortugueseWord`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `PortugueseWord`. May be used by Relay 1. */
  portugueseWordEdge?: Maybe<PortugueseWordsEdge>;
};


/** The output of our delete `PortugueseWord` mutation. */
export type DeletePortugueseWordPayloadPortugueseWordEdgeArgs = {
  orderBy?: Maybe<Array<PortugueseWordsOrderBy>>;
};

/** All input for the `deletePortugueseWouldYouRatherQuestionByNodeId` mutation. */
export type DeletePortugueseWouldYouRatherQuestionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PortugueseWouldYouRatherQuestion` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePortugueseWouldYouRatherQuestionByUuid` mutation. */
export type DeletePortugueseWouldYouRatherQuestionByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
};

/** All input for the `deletePortugueseWouldYouRatherQuestion` mutation. */
export type DeletePortugueseWouldYouRatherQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `PortugueseWouldYouRatherQuestion` mutation. */
export type DeletePortugueseWouldYouRatherQuestionPayload = {
  __typename?: 'DeletePortugueseWouldYouRatherQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `PortugueseWouldYouRatherQuestion` that was deleted by this mutation. */
  portugueseWouldYouRatherQuestion?: Maybe<PortugueseWouldYouRatherQuestion>;
  deletedWouldYouRatherQuestionsPtNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `PortugueseWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `PortugueseWouldYouRatherQuestion`. May be used by Relay 1. */
  portugueseWouldYouRatherQuestionEdge?: Maybe<PortugueseWouldYouRatherQuestionsEdge>;
};


/** The output of our delete `PortugueseWouldYouRatherQuestion` mutation. */
export type DeletePortugueseWouldYouRatherQuestionPayloadPortugueseWouldYouRatherQuestionEdgeArgs = {
  orderBy?: Maybe<Array<PortugueseWouldYouRatherQuestionsOrderBy>>;
};

/** All input for the `deletePostByNodeId` mutation. */
export type DeletePostByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Post` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePostByUuid` mutation. */
export type DeletePostByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
};

/** All input for the `deletePost` mutation. */
export type DeletePostInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** All input for the `deletePostLikeByNodeId` mutation. */
export type DeletePostLikeByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PostLike` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePostLike` mutation. */
export type DeletePostLikeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `PostLike` mutation. */
export type DeletePostLikePayload = {
  __typename?: 'DeletePostLikePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `PostLike` that was deleted by this mutation. */
  postLike?: Maybe<PostLike>;
  deletedPostLikeNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `PostLike`. */
  user?: Maybe<User>;
  /** Reads a single `Post` that is related to this `PostLike`. */
  post?: Maybe<Post>;
  /** An edge for our `PostLike`. May be used by Relay 1. */
  postLikeEdge?: Maybe<PostLikesEdge>;
};


/** The output of our delete `PostLike` mutation. */
export type DeletePostLikePayloadPostLikeEdgeArgs = {
  orderBy?: Maybe<Array<PostLikesOrderBy>>;
};

/** The output of our delete `Post` mutation. */
export type DeletePostPayload = {
  __typename?: 'DeletePostPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Post` that was deleted by this mutation. */
  post?: Maybe<Post>;
  deletedPostNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `Post`. */
  author?: Maybe<User>;
  /** Reads a single `Post` that is related to this `Post`. */
  parentPost?: Maybe<Post>;
  /** Reads a single `Language` that is related to this `Post`. */
  language?: Maybe<Language>;
  /** Reads a single `Prompt` that is related to this `Post`. */
  prompt?: Maybe<Prompt>;
  /** An edge for our `Post`. May be used by Relay 1. */
  postEdge?: Maybe<PostsEdge>;
};


/** The output of our delete `Post` mutation. */
export type DeletePostPayloadPostEdgeArgs = {
  orderBy?: Maybe<Array<PostsOrderBy>>;
};

/** All input for the `deletePostRecordingByNodeId` mutation. */
export type DeletePostRecordingByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PostRecording` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePostRecordingByUuid` mutation. */
export type DeletePostRecordingByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
};

/** All input for the `deletePostRecording` mutation. */
export type DeletePostRecordingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `PostRecording` mutation. */
export type DeletePostRecordingPayload = {
  __typename?: 'DeletePostRecordingPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `PostRecording` that was deleted by this mutation. */
  postRecording?: Maybe<PostRecording>;
  deletedPostRecordingNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `PostRecording`. */
  user?: Maybe<User>;
  /** Reads a single `Post` that is related to this `PostRecording`. */
  post?: Maybe<Post>;
  /** An edge for our `PostRecording`. May be used by Relay 1. */
  postRecordingEdge?: Maybe<PostRecordingsEdge>;
};


/** The output of our delete `PostRecording` mutation. */
export type DeletePostRecordingPayloadPostRecordingEdgeArgs = {
  orderBy?: Maybe<Array<PostRecordingsOrderBy>>;
};

/** All input for the `deletePromptByNodeId` mutation. */
export type DeletePromptByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Prompt` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deletePromptByUuid` mutation. */
export type DeletePromptByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
};

/** All input for the `deletePrompt` mutation. */
export type DeletePromptInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `Prompt` mutation. */
export type DeletePromptPayload = {
  __typename?: 'DeletePromptPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Prompt` that was deleted by this mutation. */
  prompt?: Maybe<Prompt>;
  deletedPromptNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Language` that is related to this `Prompt`. */
  language?: Maybe<Language>;
  /** Reads a single `LanguageSkillLevel` that is related to this `Prompt`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `Prompt`. May be used by Relay 1. */
  promptEdge?: Maybe<PromptsEdge>;
};


/** The output of our delete `Prompt` mutation. */
export type DeletePromptPayloadPromptEdgeArgs = {
  orderBy?: Maybe<Array<PromptsOrderBy>>;
};

/** All input for the `deleteRussianRandomQuestionByNodeId` mutation. */
export type DeleteRussianRandomQuestionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `RussianRandomQuestion` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteRussianRandomQuestionByUuid` mutation. */
export type DeleteRussianRandomQuestionByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
};

/** All input for the `deleteRussianRandomQuestion` mutation. */
export type DeleteRussianRandomQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `RussianRandomQuestion` mutation. */
export type DeleteRussianRandomQuestionPayload = {
  __typename?: 'DeleteRussianRandomQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `RussianRandomQuestion` that was deleted by this mutation. */
  russianRandomQuestion?: Maybe<RussianRandomQuestion>;
  deletedRandomQuestionsRuNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `RussianRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `RussianRandomQuestion`. May be used by Relay 1. */
  russianRandomQuestionEdge?: Maybe<RussianRandomQuestionsEdge>;
};


/** The output of our delete `RussianRandomQuestion` mutation. */
export type DeleteRussianRandomQuestionPayloadRussianRandomQuestionEdgeArgs = {
  orderBy?: Maybe<Array<RussianRandomQuestionsOrderBy>>;
};

/** All input for the `deleteRussianWordByNodeId` mutation. */
export type DeleteRussianWordByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `RussianWord` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteRussianWordByUuid` mutation. */
export type DeleteRussianWordByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
};

/** All input for the `deleteRussianWord` mutation. */
export type DeleteRussianWordInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `RussianWord` mutation. */
export type DeleteRussianWordPayload = {
  __typename?: 'DeleteRussianWordPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `RussianWord` that was deleted by this mutation. */
  russianWord?: Maybe<RussianWord>;
  deletedWordsRuNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `RussianWord`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `RussianWord`. May be used by Relay 1. */
  russianWordEdge?: Maybe<RussianWordsEdge>;
};


/** The output of our delete `RussianWord` mutation. */
export type DeleteRussianWordPayloadRussianWordEdgeArgs = {
  orderBy?: Maybe<Array<RussianWordsOrderBy>>;
};

/** All input for the `deleteRussianWouldYouRatherQuestionByNodeId` mutation. */
export type DeleteRussianWouldYouRatherQuestionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `RussianWouldYouRatherQuestion` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteRussianWouldYouRatherQuestionByUuid` mutation. */
export type DeleteRussianWouldYouRatherQuestionByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
};

/** All input for the `deleteRussianWouldYouRatherQuestion` mutation. */
export type DeleteRussianWouldYouRatherQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `RussianWouldYouRatherQuestion` mutation. */
export type DeleteRussianWouldYouRatherQuestionPayload = {
  __typename?: 'DeleteRussianWouldYouRatherQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `RussianWouldYouRatherQuestion` that was deleted by this mutation. */
  russianWouldYouRatherQuestion?: Maybe<RussianWouldYouRatherQuestion>;
  deletedWouldYouRatherQuestionsRuNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `RussianWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `RussianWouldYouRatherQuestion`. May be used by Relay 1. */
  russianWouldYouRatherQuestionEdge?: Maybe<RussianWouldYouRatherQuestionsEdge>;
};


/** The output of our delete `RussianWouldYouRatherQuestion` mutation. */
export type DeleteRussianWouldYouRatherQuestionPayloadRussianWouldYouRatherQuestionEdgeArgs = {
  orderBy?: Maybe<Array<RussianWouldYouRatherQuestionsOrderBy>>;
};

/** All input for the `deleteSpanishRandomQuestionByNodeId` mutation. */
export type DeleteSpanishRandomQuestionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `SpanishRandomQuestion` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteSpanishRandomQuestionByUuid` mutation. */
export type DeleteSpanishRandomQuestionByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
};

/** All input for the `deleteSpanishRandomQuestion` mutation. */
export type DeleteSpanishRandomQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `SpanishRandomQuestion` mutation. */
export type DeleteSpanishRandomQuestionPayload = {
  __typename?: 'DeleteSpanishRandomQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SpanishRandomQuestion` that was deleted by this mutation. */
  spanishRandomQuestion?: Maybe<SpanishRandomQuestion>;
  deletedRandomQuestionsENodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `SpanishRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `SpanishRandomQuestion`. May be used by Relay 1. */
  spanishRandomQuestionEdge?: Maybe<SpanishRandomQuestionsEdge>;
};


/** The output of our delete `SpanishRandomQuestion` mutation. */
export type DeleteSpanishRandomQuestionPayloadSpanishRandomQuestionEdgeArgs = {
  orderBy?: Maybe<Array<SpanishRandomQuestionsOrderBy>>;
};

/** All input for the `deleteSpanishWordByNodeId` mutation. */
export type DeleteSpanishWordByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `SpanishWord` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteSpanishWordByUuid` mutation. */
export type DeleteSpanishWordByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
};

/** All input for the `deleteSpanishWord` mutation. */
export type DeleteSpanishWordInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `SpanishWord` mutation. */
export type DeleteSpanishWordPayload = {
  __typename?: 'DeleteSpanishWordPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SpanishWord` that was deleted by this mutation. */
  spanishWord?: Maybe<SpanishWord>;
  deletedWordsENodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `SpanishWord`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `SpanishWord`. May be used by Relay 1. */
  spanishWordEdge?: Maybe<SpanishWordsEdge>;
};


/** The output of our delete `SpanishWord` mutation. */
export type DeleteSpanishWordPayloadSpanishWordEdgeArgs = {
  orderBy?: Maybe<Array<SpanishWordsOrderBy>>;
};

/** All input for the `deleteSpanishWouldYouRatherQuestionByNodeId` mutation. */
export type DeleteSpanishWouldYouRatherQuestionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `SpanishWouldYouRatherQuestion` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteSpanishWouldYouRatherQuestionByUuid` mutation. */
export type DeleteSpanishWouldYouRatherQuestionByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
};

/** All input for the `deleteSpanishWouldYouRatherQuestion` mutation. */
export type DeleteSpanishWouldYouRatherQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `SpanishWouldYouRatherQuestion` mutation. */
export type DeleteSpanishWouldYouRatherQuestionPayload = {
  __typename?: 'DeleteSpanishWouldYouRatherQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SpanishWouldYouRatherQuestion` that was deleted by this mutation. */
  spanishWouldYouRatherQuestion?: Maybe<SpanishWouldYouRatherQuestion>;
  deletedWouldYouRatherQuestionsENodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `SpanishWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `SpanishWouldYouRatherQuestion`. May be used by Relay 1. */
  spanishWouldYouRatherQuestionEdge?: Maybe<SpanishWouldYouRatherQuestionsEdge>;
};


/** The output of our delete `SpanishWouldYouRatherQuestion` mutation. */
export type DeleteSpanishWouldYouRatherQuestionPayloadSpanishWouldYouRatherQuestionEdgeArgs = {
  orderBy?: Maybe<Array<SpanishWouldYouRatherQuestionsOrderBy>>;
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

/** All input for the `deleteUserByEmailUnsubscribeToken` mutation. */
export type DeleteUserByEmailUnsubscribeTokenInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  emailUnsubscribeToken: Scalars['String'];
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

/** All input for the `deleteUserByUsername` mutation. */
export type DeleteUserByUsernameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  username: Scalars['String'];
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

/** All input for the `deleteUserDeviceByFcmToken` mutation. */
export type DeleteUserDeviceByFcmTokenInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  fcmToken: Scalars['String'];
};

/** All input for the `deleteUserDeviceByNodeId` mutation. */
export type DeleteUserDeviceByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `UserDevice` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteUserDeviceByUuid` mutation. */
export type DeleteUserDeviceByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
};

/** All input for the `deleteUserDevice` mutation. */
export type DeleteUserDeviceInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `UserDevice` mutation. */
export type DeleteUserDevicePayload = {
  __typename?: 'DeleteUserDevicePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserDevice` that was deleted by this mutation. */
  userDevice?: Maybe<UserDevice>;
  deletedUserDeviceNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `UserDevice`. */
  user?: Maybe<User>;
  /** An edge for our `UserDevice`. May be used by Relay 1. */
  userDeviceEdge?: Maybe<UserDevicesEdge>;
};


/** The output of our delete `UserDevice` mutation. */
export type DeleteUserDevicePayloadUserDeviceEdgeArgs = {
  orderBy?: Maybe<Array<UserDevicesOrderBy>>;
};

/** All input for the `deleteUserFollowerByNodeId` mutation. */
export type DeleteUserFollowerByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `UserFollower` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteUserFollower` mutation. */
export type DeleteUserFollowerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `UserFollower` mutation. */
export type DeleteUserFollowerPayload = {
  __typename?: 'DeleteUserFollowerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserFollower` that was deleted by this mutation. */
  userFollower?: Maybe<UserFollower>;
  deletedUserFollowerNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `UserFollower`. */
  user?: Maybe<User>;
  /** Reads a single `User` that is related to this `UserFollower`. */
  follower?: Maybe<User>;
  /** An edge for our `UserFollower`. May be used by Relay 1. */
  userFollowerEdge?: Maybe<UserFollowersEdge>;
};


/** The output of our delete `UserFollower` mutation. */
export type DeleteUserFollowerPayloadUserFollowerEdgeArgs = {
  orderBy?: Maybe<Array<UserFollowersOrderBy>>;
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
  /** Reads a single `InviteToken` that is related to this `User`. */
  signedUpWithToken?: Maybe<InviteToken>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our delete `User` mutation. */
export type DeleteUserPayloadUserEdgeArgs = {
  orderBy?: Maybe<Array<UsersOrderBy>>;
};

/** All input for the `deleteUserPreferenceByNodeId` mutation. */
export type DeleteUserPreferenceByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `UserPreference` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteUserPreferenceByUserId` mutation. */
export type DeleteUserPreferenceByUserIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  userId: Scalars['Int'];
};

/** All input for the `deleteUserPreference` mutation. */
export type DeleteUserPreferenceInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `UserPreference` mutation. */
export type DeleteUserPreferencePayload = {
  __typename?: 'DeleteUserPreferencePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserPreference` that was deleted by this mutation. */
  userPreference?: Maybe<UserPreference>;
  deletedUserPreferenceNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `UserPreference`. */
  user?: Maybe<User>;
  /** Reads a single `Language` that is related to this `UserPreference`. */
  feedLanguage?: Maybe<Language>;
  /** An edge for our `UserPreference`. May be used by Relay 1. */
  userPreferenceEdge?: Maybe<UserPreferencesEdge>;
};


/** The output of our delete `UserPreference` mutation. */
export type DeleteUserPreferencePayloadUserPreferenceEdgeArgs = {
  orderBy?: Maybe<Array<UserPreferencesOrderBy>>;
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

export type EnglishRandomQuestion = Node & {
  __typename?: 'EnglishRandomQuestion';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  uuid: Scalars['UUID'];
  question: Scalars['String'];
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['Datetime'];
  /** Reads a single `LanguageSkillLevel` that is related to this `EnglishRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
};

/**
 * A condition to be used against `EnglishRandomQuestion` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type EnglishRandomQuestionCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `uuid` field. */
  uuid?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `question` field. */
  question?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `EnglishRandomQuestion` object types. All fields are combined with a logical ‘and.’ */
export type EnglishRandomQuestionFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `uuid` field. */
  uuid?: Maybe<UuidFilter>;
  /** Filter by the object’s `question` field. */
  question?: Maybe<StringFilter>;
  /** Filter by the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<IntFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<EnglishRandomQuestionFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<EnglishRandomQuestionFilter>>;
  /** Negates the expression. */
  not?: Maybe<EnglishRandomQuestionFilter>;
};

/** An input for mutations affecting `EnglishRandomQuestion` */
export type EnglishRandomQuestionInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  question: Scalars['String'];
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** Represents an update to a `EnglishRandomQuestion`. Fields that are set will be updated. */
export type EnglishRandomQuestionPatch = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  question?: Maybe<Scalars['String']>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `EnglishRandomQuestion` values. */
export type EnglishRandomQuestionsConnection = {
  __typename?: 'EnglishRandomQuestionsConnection';
  /** A list of `EnglishRandomQuestion` objects. */
  nodes: Array<Maybe<EnglishRandomQuestion>>;
  /** A list of edges which contains the `EnglishRandomQuestion` and cursor to aid in pagination. */
  edges: Array<EnglishRandomQuestionsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `EnglishRandomQuestion` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `EnglishRandomQuestion` edge in the connection. */
export type EnglishRandomQuestionsEdge = {
  __typename?: 'EnglishRandomQuestionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `EnglishRandomQuestion` at the end of the edge. */
  node?: Maybe<EnglishRandomQuestion>;
};

/** Methods to use when ordering `EnglishRandomQuestion`. */
export enum EnglishRandomQuestionsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UuidAsc = 'UUID_ASC',
  UuidDesc = 'UUID_DESC',
  QuestionAsc = 'QUESTION_ASC',
  QuestionDesc = 'QUESTION_DESC',
  RecommendedSkillLevelIdAsc = 'RECOMMENDED_SKILL_LEVEL_ID_ASC',
  RecommendedSkillLevelIdDesc = 'RECOMMENDED_SKILL_LEVEL_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type EnglishWord = Node & {
  __typename?: 'EnglishWord';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  uuid: Scalars['UUID'];
  word: Scalars['String'];
  /** Ranges from 0 to 1 (higher is more frequent) */
  frequency: Scalars['Float'];
  length?: Maybe<Scalars['Int']>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['Datetime'];
  /** Reads a single `LanguageSkillLevel` that is related to this `EnglishWord`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
};

/**
 * A condition to be used against `EnglishWord` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type EnglishWordCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `uuid` field. */
  uuid?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `word` field. */
  word?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `frequency` field. */
  frequency?: Maybe<Scalars['Float']>;
  /** Checks for equality with the object’s `length` field. */
  length?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `EnglishWord` object types. All fields are combined with a logical ‘and.’ */
export type EnglishWordFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `uuid` field. */
  uuid?: Maybe<UuidFilter>;
  /** Filter by the object’s `word` field. */
  word?: Maybe<StringFilter>;
  /** Filter by the object’s `frequency` field. */
  frequency?: Maybe<FloatFilter>;
  /** Filter by the object’s `length` field. */
  length?: Maybe<IntFilter>;
  /** Filter by the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<IntFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<EnglishWordFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<EnglishWordFilter>>;
  /** Negates the expression. */
  not?: Maybe<EnglishWordFilter>;
};

/** An input for mutations affecting `EnglishWord` */
export type EnglishWordInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  word: Scalars['String'];
  /** Ranges from 0 to 1 (higher is more frequent) */
  frequency: Scalars['Float'];
  length?: Maybe<Scalars['Int']>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** Represents an update to a `EnglishWord`. Fields that are set will be updated. */
export type EnglishWordPatch = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  word?: Maybe<Scalars['String']>;
  /** Ranges from 0 to 1 (higher is more frequent) */
  frequency?: Maybe<Scalars['Float']>;
  length?: Maybe<Scalars['Int']>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `EnglishWord` values. */
export type EnglishWordsConnection = {
  __typename?: 'EnglishWordsConnection';
  /** A list of `EnglishWord` objects. */
  nodes: Array<Maybe<EnglishWord>>;
  /** A list of edges which contains the `EnglishWord` and cursor to aid in pagination. */
  edges: Array<EnglishWordsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `EnglishWord` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `EnglishWord` edge in the connection. */
export type EnglishWordsEdge = {
  __typename?: 'EnglishWordsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `EnglishWord` at the end of the edge. */
  node?: Maybe<EnglishWord>;
};

/** Methods to use when ordering `EnglishWord`. */
export enum EnglishWordsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UuidAsc = 'UUID_ASC',
  UuidDesc = 'UUID_DESC',
  WordAsc = 'WORD_ASC',
  WordDesc = 'WORD_DESC',
  FrequencyAsc = 'FREQUENCY_ASC',
  FrequencyDesc = 'FREQUENCY_DESC',
  LengthAsc = 'LENGTH_ASC',
  LengthDesc = 'LENGTH_DESC',
  RecommendedSkillLevelIdAsc = 'RECOMMENDED_SKILL_LEVEL_ID_ASC',
  RecommendedSkillLevelIdDesc = 'RECOMMENDED_SKILL_LEVEL_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type EnglishWouldYouRatherQuestion = Node & {
  __typename?: 'EnglishWouldYouRatherQuestion';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  uuid: Scalars['UUID'];
  question: Scalars['String'];
  answers: Array<Maybe<Scalars['String']>>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['Datetime'];
  /** Reads a single `LanguageSkillLevel` that is related to this `EnglishWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
};

/**
 * A condition to be used against `EnglishWouldYouRatherQuestion` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type EnglishWouldYouRatherQuestionCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `uuid` field. */
  uuid?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `question` field. */
  question?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `answers` field. */
  answers?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Checks for equality with the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `EnglishWouldYouRatherQuestion` object types. All fields are combined with a logical ‘and.’ */
export type EnglishWouldYouRatherQuestionFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `uuid` field. */
  uuid?: Maybe<UuidFilter>;
  /** Filter by the object’s `question` field. */
  question?: Maybe<StringFilter>;
  /** Filter by the object’s `answers` field. */
  answers?: Maybe<StringListFilter>;
  /** Filter by the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<IntFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<EnglishWouldYouRatherQuestionFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<EnglishWouldYouRatherQuestionFilter>>;
  /** Negates the expression. */
  not?: Maybe<EnglishWouldYouRatherQuestionFilter>;
};

/** An input for mutations affecting `EnglishWouldYouRatherQuestion` */
export type EnglishWouldYouRatherQuestionInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  question: Scalars['String'];
  answers: Array<Maybe<Scalars['String']>>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** Represents an update to a `EnglishWouldYouRatherQuestion`. Fields that are set will be updated. */
export type EnglishWouldYouRatherQuestionPatch = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  question?: Maybe<Scalars['String']>;
  answers?: Maybe<Array<Maybe<Scalars['String']>>>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `EnglishWouldYouRatherQuestion` values. */
export type EnglishWouldYouRatherQuestionsConnection = {
  __typename?: 'EnglishWouldYouRatherQuestionsConnection';
  /** A list of `EnglishWouldYouRatherQuestion` objects. */
  nodes: Array<Maybe<EnglishWouldYouRatherQuestion>>;
  /** A list of edges which contains the `EnglishWouldYouRatherQuestion` and cursor to aid in pagination. */
  edges: Array<EnglishWouldYouRatherQuestionsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `EnglishWouldYouRatherQuestion` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `EnglishWouldYouRatherQuestion` edge in the connection. */
export type EnglishWouldYouRatherQuestionsEdge = {
  __typename?: 'EnglishWouldYouRatherQuestionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `EnglishWouldYouRatherQuestion` at the end of the edge. */
  node?: Maybe<EnglishWouldYouRatherQuestion>;
};

/** Methods to use when ordering `EnglishWouldYouRatherQuestion`. */
export enum EnglishWouldYouRatherQuestionsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UuidAsc = 'UUID_ASC',
  UuidDesc = 'UUID_DESC',
  QuestionAsc = 'QUESTION_ASC',
  QuestionDesc = 'QUESTION_DESC',
  AnswersAsc = 'ANSWERS_ASC',
  AnswersDesc = 'ANSWERS_DESC',
  RecommendedSkillLevelIdAsc = 'RECOMMENDED_SKILL_LEVEL_ID_ASC',
  RecommendedSkillLevelIdDesc = 'RECOMMENDED_SKILL_LEVEL_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** A filter to be used against Float fields. All fields are combined with a logical ‘and.’ */
export type FloatFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['Float']>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['Float']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['Float']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['Float']>;
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['Float']>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['Float']>>;
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['Float']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['Float']>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['Float']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['Float']>;
};

export type FrenchRandomQuestion = Node & {
  __typename?: 'FrenchRandomQuestion';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  uuid: Scalars['UUID'];
  question: Scalars['String'];
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['Datetime'];
  /** Reads a single `LanguageSkillLevel` that is related to this `FrenchRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
};

/**
 * A condition to be used against `FrenchRandomQuestion` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type FrenchRandomQuestionCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `uuid` field. */
  uuid?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `question` field. */
  question?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `FrenchRandomQuestion` object types. All fields are combined with a logical ‘and.’ */
export type FrenchRandomQuestionFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `uuid` field. */
  uuid?: Maybe<UuidFilter>;
  /** Filter by the object’s `question` field. */
  question?: Maybe<StringFilter>;
  /** Filter by the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<IntFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<FrenchRandomQuestionFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<FrenchRandomQuestionFilter>>;
  /** Negates the expression. */
  not?: Maybe<FrenchRandomQuestionFilter>;
};

/** An input for mutations affecting `FrenchRandomQuestion` */
export type FrenchRandomQuestionInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  question: Scalars['String'];
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** Represents an update to a `FrenchRandomQuestion`. Fields that are set will be updated. */
export type FrenchRandomQuestionPatch = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  question?: Maybe<Scalars['String']>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `FrenchRandomQuestion` values. */
export type FrenchRandomQuestionsConnection = {
  __typename?: 'FrenchRandomQuestionsConnection';
  /** A list of `FrenchRandomQuestion` objects. */
  nodes: Array<Maybe<FrenchRandomQuestion>>;
  /** A list of edges which contains the `FrenchRandomQuestion` and cursor to aid in pagination. */
  edges: Array<FrenchRandomQuestionsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `FrenchRandomQuestion` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `FrenchRandomQuestion` edge in the connection. */
export type FrenchRandomQuestionsEdge = {
  __typename?: 'FrenchRandomQuestionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `FrenchRandomQuestion` at the end of the edge. */
  node?: Maybe<FrenchRandomQuestion>;
};

/** Methods to use when ordering `FrenchRandomQuestion`. */
export enum FrenchRandomQuestionsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UuidAsc = 'UUID_ASC',
  UuidDesc = 'UUID_DESC',
  QuestionAsc = 'QUESTION_ASC',
  QuestionDesc = 'QUESTION_DESC',
  RecommendedSkillLevelIdAsc = 'RECOMMENDED_SKILL_LEVEL_ID_ASC',
  RecommendedSkillLevelIdDesc = 'RECOMMENDED_SKILL_LEVEL_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type FrenchWord = Node & {
  __typename?: 'FrenchWord';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  uuid: Scalars['UUID'];
  word: Scalars['String'];
  /** Ranges from 0 to 1 (higher is more frequent) */
  frequency: Scalars['Float'];
  length?: Maybe<Scalars['Int']>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['Datetime'];
  /** Reads a single `LanguageSkillLevel` that is related to this `FrenchWord`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
};

/**
 * A condition to be used against `FrenchWord` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type FrenchWordCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `uuid` field. */
  uuid?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `word` field. */
  word?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `frequency` field. */
  frequency?: Maybe<Scalars['Float']>;
  /** Checks for equality with the object’s `length` field. */
  length?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `FrenchWord` object types. All fields are combined with a logical ‘and.’ */
export type FrenchWordFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `uuid` field. */
  uuid?: Maybe<UuidFilter>;
  /** Filter by the object’s `word` field. */
  word?: Maybe<StringFilter>;
  /** Filter by the object’s `frequency` field. */
  frequency?: Maybe<FloatFilter>;
  /** Filter by the object’s `length` field. */
  length?: Maybe<IntFilter>;
  /** Filter by the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<IntFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<FrenchWordFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<FrenchWordFilter>>;
  /** Negates the expression. */
  not?: Maybe<FrenchWordFilter>;
};

/** An input for mutations affecting `FrenchWord` */
export type FrenchWordInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  word: Scalars['String'];
  /** Ranges from 0 to 1 (higher is more frequent) */
  frequency: Scalars['Float'];
  length?: Maybe<Scalars['Int']>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** Represents an update to a `FrenchWord`. Fields that are set will be updated. */
export type FrenchWordPatch = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  word?: Maybe<Scalars['String']>;
  /** Ranges from 0 to 1 (higher is more frequent) */
  frequency?: Maybe<Scalars['Float']>;
  length?: Maybe<Scalars['Int']>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `FrenchWord` values. */
export type FrenchWordsConnection = {
  __typename?: 'FrenchWordsConnection';
  /** A list of `FrenchWord` objects. */
  nodes: Array<Maybe<FrenchWord>>;
  /** A list of edges which contains the `FrenchWord` and cursor to aid in pagination. */
  edges: Array<FrenchWordsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `FrenchWord` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `FrenchWord` edge in the connection. */
export type FrenchWordsEdge = {
  __typename?: 'FrenchWordsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `FrenchWord` at the end of the edge. */
  node?: Maybe<FrenchWord>;
};

/** Methods to use when ordering `FrenchWord`. */
export enum FrenchWordsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UuidAsc = 'UUID_ASC',
  UuidDesc = 'UUID_DESC',
  WordAsc = 'WORD_ASC',
  WordDesc = 'WORD_DESC',
  FrequencyAsc = 'FREQUENCY_ASC',
  FrequencyDesc = 'FREQUENCY_DESC',
  LengthAsc = 'LENGTH_ASC',
  LengthDesc = 'LENGTH_DESC',
  RecommendedSkillLevelIdAsc = 'RECOMMENDED_SKILL_LEVEL_ID_ASC',
  RecommendedSkillLevelIdDesc = 'RECOMMENDED_SKILL_LEVEL_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type FrenchWouldYouRatherQuestion = Node & {
  __typename?: 'FrenchWouldYouRatherQuestion';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  uuid: Scalars['UUID'];
  question: Scalars['String'];
  answers: Array<Maybe<Scalars['String']>>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['Datetime'];
  /** Reads a single `LanguageSkillLevel` that is related to this `FrenchWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
};

/**
 * A condition to be used against `FrenchWouldYouRatherQuestion` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type FrenchWouldYouRatherQuestionCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `uuid` field. */
  uuid?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `question` field. */
  question?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `answers` field. */
  answers?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Checks for equality with the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `FrenchWouldYouRatherQuestion` object types. All fields are combined with a logical ‘and.’ */
export type FrenchWouldYouRatherQuestionFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `uuid` field. */
  uuid?: Maybe<UuidFilter>;
  /** Filter by the object’s `question` field. */
  question?: Maybe<StringFilter>;
  /** Filter by the object’s `answers` field. */
  answers?: Maybe<StringListFilter>;
  /** Filter by the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<IntFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<FrenchWouldYouRatherQuestionFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<FrenchWouldYouRatherQuestionFilter>>;
  /** Negates the expression. */
  not?: Maybe<FrenchWouldYouRatherQuestionFilter>;
};

/** An input for mutations affecting `FrenchWouldYouRatherQuestion` */
export type FrenchWouldYouRatherQuestionInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  question: Scalars['String'];
  answers: Array<Maybe<Scalars['String']>>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** Represents an update to a `FrenchWouldYouRatherQuestion`. Fields that are set will be updated. */
export type FrenchWouldYouRatherQuestionPatch = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  question?: Maybe<Scalars['String']>;
  answers?: Maybe<Array<Maybe<Scalars['String']>>>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `FrenchWouldYouRatherQuestion` values. */
export type FrenchWouldYouRatherQuestionsConnection = {
  __typename?: 'FrenchWouldYouRatherQuestionsConnection';
  /** A list of `FrenchWouldYouRatherQuestion` objects. */
  nodes: Array<Maybe<FrenchWouldYouRatherQuestion>>;
  /** A list of edges which contains the `FrenchWouldYouRatherQuestion` and cursor to aid in pagination. */
  edges: Array<FrenchWouldYouRatherQuestionsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `FrenchWouldYouRatherQuestion` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `FrenchWouldYouRatherQuestion` edge in the connection. */
export type FrenchWouldYouRatherQuestionsEdge = {
  __typename?: 'FrenchWouldYouRatherQuestionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `FrenchWouldYouRatherQuestion` at the end of the edge. */
  node?: Maybe<FrenchWouldYouRatherQuestion>;
};

/** Methods to use when ordering `FrenchWouldYouRatherQuestion`. */
export enum FrenchWouldYouRatherQuestionsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UuidAsc = 'UUID_ASC',
  UuidDesc = 'UUID_DESC',
  QuestionAsc = 'QUESTION_ASC',
  QuestionDesc = 'QUESTION_DESC',
  AnswersAsc = 'ANSWERS_ASC',
  AnswersDesc = 'ANSWERS_DESC',
  RecommendedSkillLevelIdAsc = 'RECOMMENDED_SKILL_LEVEL_ID_ASC',
  RecommendedSkillLevelIdDesc = 'RECOMMENDED_SKILL_LEVEL_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type GermanRandomQuestion = Node & {
  __typename?: 'GermanRandomQuestion';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  uuid: Scalars['UUID'];
  question: Scalars['String'];
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['Datetime'];
  /** Reads a single `LanguageSkillLevel` that is related to this `GermanRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
};

/**
 * A condition to be used against `GermanRandomQuestion` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type GermanRandomQuestionCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `uuid` field. */
  uuid?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `question` field. */
  question?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `GermanRandomQuestion` object types. All fields are combined with a logical ‘and.’ */
export type GermanRandomQuestionFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `uuid` field. */
  uuid?: Maybe<UuidFilter>;
  /** Filter by the object’s `question` field. */
  question?: Maybe<StringFilter>;
  /** Filter by the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<IntFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<GermanRandomQuestionFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<GermanRandomQuestionFilter>>;
  /** Negates the expression. */
  not?: Maybe<GermanRandomQuestionFilter>;
};

/** An input for mutations affecting `GermanRandomQuestion` */
export type GermanRandomQuestionInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  question: Scalars['String'];
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** Represents an update to a `GermanRandomQuestion`. Fields that are set will be updated. */
export type GermanRandomQuestionPatch = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  question?: Maybe<Scalars['String']>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `GermanRandomQuestion` values. */
export type GermanRandomQuestionsConnection = {
  __typename?: 'GermanRandomQuestionsConnection';
  /** A list of `GermanRandomQuestion` objects. */
  nodes: Array<Maybe<GermanRandomQuestion>>;
  /** A list of edges which contains the `GermanRandomQuestion` and cursor to aid in pagination. */
  edges: Array<GermanRandomQuestionsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `GermanRandomQuestion` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `GermanRandomQuestion` edge in the connection. */
export type GermanRandomQuestionsEdge = {
  __typename?: 'GermanRandomQuestionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `GermanRandomQuestion` at the end of the edge. */
  node?: Maybe<GermanRandomQuestion>;
};

/** Methods to use when ordering `GermanRandomQuestion`. */
export enum GermanRandomQuestionsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UuidAsc = 'UUID_ASC',
  UuidDesc = 'UUID_DESC',
  QuestionAsc = 'QUESTION_ASC',
  QuestionDesc = 'QUESTION_DESC',
  RecommendedSkillLevelIdAsc = 'RECOMMENDED_SKILL_LEVEL_ID_ASC',
  RecommendedSkillLevelIdDesc = 'RECOMMENDED_SKILL_LEVEL_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type GermanWord = Node & {
  __typename?: 'GermanWord';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  uuid: Scalars['UUID'];
  word: Scalars['String'];
  /** Ranges from 0 to 1 (higher is more frequent) */
  frequency: Scalars['Float'];
  length?: Maybe<Scalars['Int']>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['Datetime'];
  /** Reads a single `LanguageSkillLevel` that is related to this `GermanWord`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
};

/**
 * A condition to be used against `GermanWord` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type GermanWordCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `uuid` field. */
  uuid?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `word` field. */
  word?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `frequency` field. */
  frequency?: Maybe<Scalars['Float']>;
  /** Checks for equality with the object’s `length` field. */
  length?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `GermanWord` object types. All fields are combined with a logical ‘and.’ */
export type GermanWordFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `uuid` field. */
  uuid?: Maybe<UuidFilter>;
  /** Filter by the object’s `word` field. */
  word?: Maybe<StringFilter>;
  /** Filter by the object’s `frequency` field. */
  frequency?: Maybe<FloatFilter>;
  /** Filter by the object’s `length` field. */
  length?: Maybe<IntFilter>;
  /** Filter by the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<IntFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<GermanWordFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<GermanWordFilter>>;
  /** Negates the expression. */
  not?: Maybe<GermanWordFilter>;
};

/** An input for mutations affecting `GermanWord` */
export type GermanWordInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  word: Scalars['String'];
  /** Ranges from 0 to 1 (higher is more frequent) */
  frequency: Scalars['Float'];
  length?: Maybe<Scalars['Int']>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** Represents an update to a `GermanWord`. Fields that are set will be updated. */
export type GermanWordPatch = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  word?: Maybe<Scalars['String']>;
  /** Ranges from 0 to 1 (higher is more frequent) */
  frequency?: Maybe<Scalars['Float']>;
  length?: Maybe<Scalars['Int']>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `GermanWord` values. */
export type GermanWordsConnection = {
  __typename?: 'GermanWordsConnection';
  /** A list of `GermanWord` objects. */
  nodes: Array<Maybe<GermanWord>>;
  /** A list of edges which contains the `GermanWord` and cursor to aid in pagination. */
  edges: Array<GermanWordsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `GermanWord` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `GermanWord` edge in the connection. */
export type GermanWordsEdge = {
  __typename?: 'GermanWordsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `GermanWord` at the end of the edge. */
  node?: Maybe<GermanWord>;
};

/** Methods to use when ordering `GermanWord`. */
export enum GermanWordsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UuidAsc = 'UUID_ASC',
  UuidDesc = 'UUID_DESC',
  WordAsc = 'WORD_ASC',
  WordDesc = 'WORD_DESC',
  FrequencyAsc = 'FREQUENCY_ASC',
  FrequencyDesc = 'FREQUENCY_DESC',
  LengthAsc = 'LENGTH_ASC',
  LengthDesc = 'LENGTH_DESC',
  RecommendedSkillLevelIdAsc = 'RECOMMENDED_SKILL_LEVEL_ID_ASC',
  RecommendedSkillLevelIdDesc = 'RECOMMENDED_SKILL_LEVEL_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type GermanWouldYouRatherQuestion = Node & {
  __typename?: 'GermanWouldYouRatherQuestion';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  uuid: Scalars['UUID'];
  question: Scalars['String'];
  answers: Array<Maybe<Scalars['String']>>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['Datetime'];
  /** Reads a single `LanguageSkillLevel` that is related to this `GermanWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
};

/**
 * A condition to be used against `GermanWouldYouRatherQuestion` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type GermanWouldYouRatherQuestionCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `uuid` field. */
  uuid?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `question` field. */
  question?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `answers` field. */
  answers?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Checks for equality with the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `GermanWouldYouRatherQuestion` object types. All fields are combined with a logical ‘and.’ */
export type GermanWouldYouRatherQuestionFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `uuid` field. */
  uuid?: Maybe<UuidFilter>;
  /** Filter by the object’s `question` field. */
  question?: Maybe<StringFilter>;
  /** Filter by the object’s `answers` field. */
  answers?: Maybe<StringListFilter>;
  /** Filter by the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<IntFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<GermanWouldYouRatherQuestionFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<GermanWouldYouRatherQuestionFilter>>;
  /** Negates the expression. */
  not?: Maybe<GermanWouldYouRatherQuestionFilter>;
};

/** An input for mutations affecting `GermanWouldYouRatherQuestion` */
export type GermanWouldYouRatherQuestionInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  question: Scalars['String'];
  answers: Array<Maybe<Scalars['String']>>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** Represents an update to a `GermanWouldYouRatherQuestion`. Fields that are set will be updated. */
export type GermanWouldYouRatherQuestionPatch = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  question?: Maybe<Scalars['String']>;
  answers?: Maybe<Array<Maybe<Scalars['String']>>>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `GermanWouldYouRatherQuestion` values. */
export type GermanWouldYouRatherQuestionsConnection = {
  __typename?: 'GermanWouldYouRatherQuestionsConnection';
  /** A list of `GermanWouldYouRatherQuestion` objects. */
  nodes: Array<Maybe<GermanWouldYouRatherQuestion>>;
  /** A list of edges which contains the `GermanWouldYouRatherQuestion` and cursor to aid in pagination. */
  edges: Array<GermanWouldYouRatherQuestionsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `GermanWouldYouRatherQuestion` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `GermanWouldYouRatherQuestion` edge in the connection. */
export type GermanWouldYouRatherQuestionsEdge = {
  __typename?: 'GermanWouldYouRatherQuestionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `GermanWouldYouRatherQuestion` at the end of the edge. */
  node?: Maybe<GermanWouldYouRatherQuestion>;
};

/** Methods to use when ordering `GermanWouldYouRatherQuestion`. */
export enum GermanWouldYouRatherQuestionsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UuidAsc = 'UUID_ASC',
  UuidDesc = 'UUID_DESC',
  QuestionAsc = 'QUESTION_ASC',
  QuestionDesc = 'QUESTION_DESC',
  AnswersAsc = 'ANSWERS_ASC',
  AnswersDesc = 'ANSWERS_DESC',
  RecommendedSkillLevelIdAsc = 'RECOMMENDED_SKILL_LEVEL_ID_ASC',
  RecommendedSkillLevelIdDesc = 'RECOMMENDED_SKILL_LEVEL_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

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
  /** Reads and enables pagination through a set of `Notification`. */
  notificationsByRecipientGroupId: NotificationsConnection;
  /** Reads and enables pagination through a set of `User`. */
  usersByGroupUserGroupIdAndUserId: GroupUsersByGroupUserGroupIdAndUserIdManyToManyConnection;
  /** Reads and enables pagination through a set of `User`. */
  usersByMessageRecipientGroupIdAndSenderId: GroupUsersByMessageRecipientGroupIdAndSenderIdManyToManyConnection;
  /** Reads and enables pagination through a set of `User`. */
  usersByMessageRecipientGroupIdAndRecipientId: GroupUsersByMessageRecipientGroupIdAndRecipientIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Message`. */
  messagesByMessageRecipientGroupIdAndParentMessageId: GroupMessagesByMessageRecipientGroupIdAndParentMessageIdManyToManyConnection;
  /** Reads and enables pagination through a set of `User`. */
  usersByNotificationRecipientGroupIdAndRecipientId: GroupUsersByNotificationRecipientGroupIdAndRecipientIdManyToManyConnection;
  /** Reads and enables pagination through a set of `NotificationChannel`. */
  notificationChannelsByNotificationRecipientGroupIdAndChannelId: GroupNotificationChannelsByNotificationRecipientGroupIdAndChannelIdManyToManyConnection;
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


export type GroupNotificationsByRecipientGroupIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<NotificationsOrderBy>>;
  condition?: Maybe<NotificationCondition>;
  filter?: Maybe<NotificationFilter>;
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


export type GroupUsersByNotificationRecipientGroupIdAndRecipientIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
  filter?: Maybe<UserFilter>;
};


export type GroupNotificationChannelsByNotificationRecipientGroupIdAndChannelIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<NotificationChannelsOrderBy>>;
  condition?: Maybe<NotificationChannelCondition>;
  filter?: Maybe<NotificationChannelFilter>;
};

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

/** An input for mutations affecting `Group` */
export type GroupInput = {
  id?: Maybe<Scalars['Int']>;
  groupName?: Maybe<Scalars['String']>;
  global?: Maybe<Scalars['Boolean']>;
  languageId?: Maybe<Scalars['Int']>;
  languageSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  uuid?: Maybe<Scalars['UUID']>;
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

/** A connection to a list of `NotificationChannel` values, with data from `Notification`. */
export type GroupNotificationChannelsByNotificationRecipientGroupIdAndChannelIdManyToManyConnection = {
  __typename?: 'GroupNotificationChannelsByNotificationRecipientGroupIdAndChannelIdManyToManyConnection';
  /** A list of `NotificationChannel` objects. */
  nodes: Array<Maybe<NotificationChannel>>;
  /** A list of edges which contains the `NotificationChannel`, info from the `Notification`, and the cursor to aid in pagination. */
  edges: Array<GroupNotificationChannelsByNotificationRecipientGroupIdAndChannelIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `NotificationChannel` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `NotificationChannel` edge in the connection, with data from `Notification`. */
export type GroupNotificationChannelsByNotificationRecipientGroupIdAndChannelIdManyToManyEdge = {
  __typename?: 'GroupNotificationChannelsByNotificationRecipientGroupIdAndChannelIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `NotificationChannel` at the end of the edge. */
  node?: Maybe<NotificationChannel>;
  /** Reads and enables pagination through a set of `Notification`. */
  notificationsByChannelId: NotificationsConnection;
};


/** A `NotificationChannel` edge in the connection, with data from `Notification`. */
export type GroupNotificationChannelsByNotificationRecipientGroupIdAndChannelIdManyToManyEdgeNotificationsByChannelIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<NotificationsOrderBy>>;
  condition?: Maybe<NotificationCondition>;
  filter?: Maybe<NotificationFilter>;
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

/** An input for mutations affecting `GroupUser` */
export type GroupUserInput = {
  id?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['Int']>;
  groupId?: Maybe<Scalars['Int']>;
  userType: UserType;
  joinedOn?: Maybe<Scalars['Datetime']>;
  lastActive?: Maybe<Scalars['Datetime']>;
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

/** A connection to a list of `User` values, with data from `Notification`. */
export type GroupUsersByNotificationRecipientGroupIdAndRecipientIdManyToManyConnection = {
  __typename?: 'GroupUsersByNotificationRecipientGroupIdAndRecipientIdManyToManyConnection';
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** A list of edges which contains the `User`, info from the `Notification`, and the cursor to aid in pagination. */
  edges: Array<GroupUsersByNotificationRecipientGroupIdAndRecipientIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection, with data from `Notification`. */
export type GroupUsersByNotificationRecipientGroupIdAndRecipientIdManyToManyEdge = {
  __typename?: 'GroupUsersByNotificationRecipientGroupIdAndRecipientIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
  /** Reads and enables pagination through a set of `Notification`. */
  notificationsByRecipientId: NotificationsConnection;
};


/** A `User` edge in the connection, with data from `Notification`. */
export type GroupUsersByNotificationRecipientGroupIdAndRecipientIdManyToManyEdgeNotificationsByRecipientIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<NotificationsOrderBy>>;
  condition?: Maybe<NotificationCondition>;
  filter?: Maybe<NotificationFilter>;
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

/** A `GroupUser` edge in the connection. */
export type GroupUsersEdge = {
  __typename?: 'GroupUsersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `GroupUser` at the end of the edge. */
  node?: Maybe<GroupUser>;
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

/** A `Group` edge in the connection. */
export type GroupsEdge = {
  __typename?: 'GroupsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Group` at the end of the edge. */
  node?: Maybe<Group>;
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

export type InviteToken = Node & {
  __typename?: 'InviteToken';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  userId?: Maybe<Scalars['Int']>;
  inviteToken: Scalars['String'];
  createdAt: Scalars['Datetime'];
  description?: Maybe<Scalars['String']>;
  /** Reads a single `User` that is related to this `InviteToken`. */
  user?: Maybe<User>;
  /** Reads and enables pagination through a set of `User`. */
  usersBySignedUpWithTokenId: UsersConnection;
  /** Reads and enables pagination through a set of `Language`. */
  languagesByUserSignedUpWithTokenIdAndLocale: InviteTokenLanguagesByUserSignedUpWithTokenIdAndLocaleManyToManyConnection;
};


export type InviteTokenUsersBySignedUpWithTokenIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
  filter?: Maybe<UserFilter>;
};


export type InviteTokenLanguagesByUserSignedUpWithTokenIdAndLocaleArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<LanguagesOrderBy>>;
  condition?: Maybe<LanguageCondition>;
  filter?: Maybe<LanguageFilter>;
};

/**
 * A condition to be used against `InviteToken` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type InviteTokenCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `inviteToken` field. */
  inviteToken?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `description` field. */
  description?: Maybe<Scalars['String']>;
};

/** A filter to be used against `InviteToken` object types. All fields are combined with a logical ‘and.’ */
export type InviteTokenFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `userId` field. */
  userId?: Maybe<IntFilter>;
  /** Filter by the object’s `inviteToken` field. */
  inviteToken?: Maybe<StringFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `description` field. */
  description?: Maybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<InviteTokenFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<InviteTokenFilter>>;
  /** Negates the expression. */
  not?: Maybe<InviteTokenFilter>;
};

/** An input for mutations affecting `InviteToken` */
export type InviteTokenInput = {
  id?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['Int']>;
  inviteToken?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  description?: Maybe<Scalars['String']>;
};

/** A connection to a list of `Language` values, with data from `User`. */
export type InviteTokenLanguagesByUserSignedUpWithTokenIdAndLocaleManyToManyConnection = {
  __typename?: 'InviteTokenLanguagesByUserSignedUpWithTokenIdAndLocaleManyToManyConnection';
  /** A list of `Language` objects. */
  nodes: Array<Maybe<Language>>;
  /** A list of edges which contains the `Language`, info from the `User`, and the cursor to aid in pagination. */
  edges: Array<InviteTokenLanguagesByUserSignedUpWithTokenIdAndLocaleManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Language` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Language` edge in the connection, with data from `User`. */
export type InviteTokenLanguagesByUserSignedUpWithTokenIdAndLocaleManyToManyEdge = {
  __typename?: 'InviteTokenLanguagesByUserSignedUpWithTokenIdAndLocaleManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Language` at the end of the edge. */
  node?: Maybe<Language>;
  /** Reads and enables pagination through a set of `User`. */
  usersByLocale: UsersConnection;
};


/** A `Language` edge in the connection, with data from `User`. */
export type InviteTokenLanguagesByUserSignedUpWithTokenIdAndLocaleManyToManyEdgeUsersByLocaleArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
  filter?: Maybe<UserFilter>;
};

/** Represents an update to a `InviteToken`. Fields that are set will be updated. */
export type InviteTokenPatch = {
  id?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['Int']>;
  inviteToken?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  description?: Maybe<Scalars['String']>;
};

/** A connection to a list of `InviteToken` values. */
export type InviteTokensConnection = {
  __typename?: 'InviteTokensConnection';
  /** A list of `InviteToken` objects. */
  nodes: Array<Maybe<InviteToken>>;
  /** A list of edges which contains the `InviteToken` and cursor to aid in pagination. */
  edges: Array<InviteTokensEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `InviteToken` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `InviteToken` edge in the connection. */
export type InviteTokensEdge = {
  __typename?: 'InviteTokensEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `InviteToken` at the end of the edge. */
  node?: Maybe<InviteToken>;
};

/** Methods to use when ordering `InviteToken`. */
export enum InviteTokensOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC',
  InviteTokenAsc = 'INVITE_TOKEN_ASC',
  InviteTokenDesc = 'INVITE_TOKEN_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type ItalianRandomQuestion = Node & {
  __typename?: 'ItalianRandomQuestion';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  uuid: Scalars['UUID'];
  question: Scalars['String'];
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['Datetime'];
  /** Reads a single `LanguageSkillLevel` that is related to this `ItalianRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
};

/**
 * A condition to be used against `ItalianRandomQuestion` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type ItalianRandomQuestionCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `uuid` field. */
  uuid?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `question` field. */
  question?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `ItalianRandomQuestion` object types. All fields are combined with a logical ‘and.’ */
export type ItalianRandomQuestionFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `uuid` field. */
  uuid?: Maybe<UuidFilter>;
  /** Filter by the object’s `question` field. */
  question?: Maybe<StringFilter>;
  /** Filter by the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<IntFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<ItalianRandomQuestionFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<ItalianRandomQuestionFilter>>;
  /** Negates the expression. */
  not?: Maybe<ItalianRandomQuestionFilter>;
};

/** An input for mutations affecting `ItalianRandomQuestion` */
export type ItalianRandomQuestionInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  question: Scalars['String'];
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** Represents an update to a `ItalianRandomQuestion`. Fields that are set will be updated. */
export type ItalianRandomQuestionPatch = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  question?: Maybe<Scalars['String']>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `ItalianRandomQuestion` values. */
export type ItalianRandomQuestionsConnection = {
  __typename?: 'ItalianRandomQuestionsConnection';
  /** A list of `ItalianRandomQuestion` objects. */
  nodes: Array<Maybe<ItalianRandomQuestion>>;
  /** A list of edges which contains the `ItalianRandomQuestion` and cursor to aid in pagination. */
  edges: Array<ItalianRandomQuestionsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ItalianRandomQuestion` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `ItalianRandomQuestion` edge in the connection. */
export type ItalianRandomQuestionsEdge = {
  __typename?: 'ItalianRandomQuestionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `ItalianRandomQuestion` at the end of the edge. */
  node?: Maybe<ItalianRandomQuestion>;
};

/** Methods to use when ordering `ItalianRandomQuestion`. */
export enum ItalianRandomQuestionsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UuidAsc = 'UUID_ASC',
  UuidDesc = 'UUID_DESC',
  QuestionAsc = 'QUESTION_ASC',
  QuestionDesc = 'QUESTION_DESC',
  RecommendedSkillLevelIdAsc = 'RECOMMENDED_SKILL_LEVEL_ID_ASC',
  RecommendedSkillLevelIdDesc = 'RECOMMENDED_SKILL_LEVEL_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type ItalianWord = Node & {
  __typename?: 'ItalianWord';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  uuid: Scalars['UUID'];
  word: Scalars['String'];
  /** Ranges from 0 to 1 (higher is more frequent) */
  frequency: Scalars['Float'];
  length?: Maybe<Scalars['Int']>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['Datetime'];
  /** Reads a single `LanguageSkillLevel` that is related to this `ItalianWord`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
};

/**
 * A condition to be used against `ItalianWord` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type ItalianWordCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `uuid` field. */
  uuid?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `word` field. */
  word?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `frequency` field. */
  frequency?: Maybe<Scalars['Float']>;
  /** Checks for equality with the object’s `length` field. */
  length?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `ItalianWord` object types. All fields are combined with a logical ‘and.’ */
export type ItalianWordFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `uuid` field. */
  uuid?: Maybe<UuidFilter>;
  /** Filter by the object’s `word` field. */
  word?: Maybe<StringFilter>;
  /** Filter by the object’s `frequency` field. */
  frequency?: Maybe<FloatFilter>;
  /** Filter by the object’s `length` field. */
  length?: Maybe<IntFilter>;
  /** Filter by the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<IntFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<ItalianWordFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<ItalianWordFilter>>;
  /** Negates the expression. */
  not?: Maybe<ItalianWordFilter>;
};

/** An input for mutations affecting `ItalianWord` */
export type ItalianWordInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  word: Scalars['String'];
  /** Ranges from 0 to 1 (higher is more frequent) */
  frequency: Scalars['Float'];
  length?: Maybe<Scalars['Int']>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** Represents an update to a `ItalianWord`. Fields that are set will be updated. */
export type ItalianWordPatch = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  word?: Maybe<Scalars['String']>;
  /** Ranges from 0 to 1 (higher is more frequent) */
  frequency?: Maybe<Scalars['Float']>;
  length?: Maybe<Scalars['Int']>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `ItalianWord` values. */
export type ItalianWordsConnection = {
  __typename?: 'ItalianWordsConnection';
  /** A list of `ItalianWord` objects. */
  nodes: Array<Maybe<ItalianWord>>;
  /** A list of edges which contains the `ItalianWord` and cursor to aid in pagination. */
  edges: Array<ItalianWordsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ItalianWord` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `ItalianWord` edge in the connection. */
export type ItalianWordsEdge = {
  __typename?: 'ItalianWordsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `ItalianWord` at the end of the edge. */
  node?: Maybe<ItalianWord>;
};

/** Methods to use when ordering `ItalianWord`. */
export enum ItalianWordsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UuidAsc = 'UUID_ASC',
  UuidDesc = 'UUID_DESC',
  WordAsc = 'WORD_ASC',
  WordDesc = 'WORD_DESC',
  FrequencyAsc = 'FREQUENCY_ASC',
  FrequencyDesc = 'FREQUENCY_DESC',
  LengthAsc = 'LENGTH_ASC',
  LengthDesc = 'LENGTH_DESC',
  RecommendedSkillLevelIdAsc = 'RECOMMENDED_SKILL_LEVEL_ID_ASC',
  RecommendedSkillLevelIdDesc = 'RECOMMENDED_SKILL_LEVEL_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type ItalianWouldYouRatherQuestion = Node & {
  __typename?: 'ItalianWouldYouRatherQuestion';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  uuid: Scalars['UUID'];
  question: Scalars['String'];
  answers: Array<Maybe<Scalars['String']>>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['Datetime'];
  /** Reads a single `LanguageSkillLevel` that is related to this `ItalianWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
};

/**
 * A condition to be used against `ItalianWouldYouRatherQuestion` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type ItalianWouldYouRatherQuestionCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `uuid` field. */
  uuid?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `question` field. */
  question?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `answers` field. */
  answers?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Checks for equality with the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `ItalianWouldYouRatherQuestion` object types. All fields are combined with a logical ‘and.’ */
export type ItalianWouldYouRatherQuestionFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `uuid` field. */
  uuid?: Maybe<UuidFilter>;
  /** Filter by the object’s `question` field. */
  question?: Maybe<StringFilter>;
  /** Filter by the object’s `answers` field. */
  answers?: Maybe<StringListFilter>;
  /** Filter by the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<IntFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<ItalianWouldYouRatherQuestionFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<ItalianWouldYouRatherQuestionFilter>>;
  /** Negates the expression. */
  not?: Maybe<ItalianWouldYouRatherQuestionFilter>;
};

/** An input for mutations affecting `ItalianWouldYouRatherQuestion` */
export type ItalianWouldYouRatherQuestionInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  question: Scalars['String'];
  answers: Array<Maybe<Scalars['String']>>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** Represents an update to a `ItalianWouldYouRatherQuestion`. Fields that are set will be updated. */
export type ItalianWouldYouRatherQuestionPatch = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  question?: Maybe<Scalars['String']>;
  answers?: Maybe<Array<Maybe<Scalars['String']>>>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `ItalianWouldYouRatherQuestion` values. */
export type ItalianWouldYouRatherQuestionsConnection = {
  __typename?: 'ItalianWouldYouRatherQuestionsConnection';
  /** A list of `ItalianWouldYouRatherQuestion` objects. */
  nodes: Array<Maybe<ItalianWouldYouRatherQuestion>>;
  /** A list of edges which contains the `ItalianWouldYouRatherQuestion` and cursor to aid in pagination. */
  edges: Array<ItalianWouldYouRatherQuestionsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ItalianWouldYouRatherQuestion` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `ItalianWouldYouRatherQuestion` edge in the connection. */
export type ItalianWouldYouRatherQuestionsEdge = {
  __typename?: 'ItalianWouldYouRatherQuestionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `ItalianWouldYouRatherQuestion` at the end of the edge. */
  node?: Maybe<ItalianWouldYouRatherQuestion>;
};

/** Methods to use when ordering `ItalianWouldYouRatherQuestion`. */
export enum ItalianWouldYouRatherQuestionsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UuidAsc = 'UUID_ASC',
  UuidDesc = 'UUID_DESC',
  QuestionAsc = 'QUESTION_ASC',
  QuestionDesc = 'QUESTION_DESC',
  AnswersAsc = 'ANSWERS_ASC',
  AnswersDesc = 'ANSWERS_DESC',
  RecommendedSkillLevelIdAsc = 'RECOMMENDED_SKILL_LEVEL_ID_ASC',
  RecommendedSkillLevelIdDesc = 'RECOMMENDED_SKILL_LEVEL_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type JapaneseRandomQuestion = Node & {
  __typename?: 'JapaneseRandomQuestion';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  uuid: Scalars['UUID'];
  question: Scalars['String'];
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['Datetime'];
  /** Reads a single `LanguageSkillLevel` that is related to this `JapaneseRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
};

/**
 * A condition to be used against `JapaneseRandomQuestion` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type JapaneseRandomQuestionCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `uuid` field. */
  uuid?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `question` field. */
  question?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `JapaneseRandomQuestion` object types. All fields are combined with a logical ‘and.’ */
export type JapaneseRandomQuestionFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `uuid` field. */
  uuid?: Maybe<UuidFilter>;
  /** Filter by the object’s `question` field. */
  question?: Maybe<StringFilter>;
  /** Filter by the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<IntFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<JapaneseRandomQuestionFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<JapaneseRandomQuestionFilter>>;
  /** Negates the expression. */
  not?: Maybe<JapaneseRandomQuestionFilter>;
};

/** An input for mutations affecting `JapaneseRandomQuestion` */
export type JapaneseRandomQuestionInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  question: Scalars['String'];
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** Represents an update to a `JapaneseRandomQuestion`. Fields that are set will be updated. */
export type JapaneseRandomQuestionPatch = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  question?: Maybe<Scalars['String']>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `JapaneseRandomQuestion` values. */
export type JapaneseRandomQuestionsConnection = {
  __typename?: 'JapaneseRandomQuestionsConnection';
  /** A list of `JapaneseRandomQuestion` objects. */
  nodes: Array<Maybe<JapaneseRandomQuestion>>;
  /** A list of edges which contains the `JapaneseRandomQuestion` and cursor to aid in pagination. */
  edges: Array<JapaneseRandomQuestionsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `JapaneseRandomQuestion` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `JapaneseRandomQuestion` edge in the connection. */
export type JapaneseRandomQuestionsEdge = {
  __typename?: 'JapaneseRandomQuestionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `JapaneseRandomQuestion` at the end of the edge. */
  node?: Maybe<JapaneseRandomQuestion>;
};

/** Methods to use when ordering `JapaneseRandomQuestion`. */
export enum JapaneseRandomQuestionsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UuidAsc = 'UUID_ASC',
  UuidDesc = 'UUID_DESC',
  QuestionAsc = 'QUESTION_ASC',
  QuestionDesc = 'QUESTION_DESC',
  RecommendedSkillLevelIdAsc = 'RECOMMENDED_SKILL_LEVEL_ID_ASC',
  RecommendedSkillLevelIdDesc = 'RECOMMENDED_SKILL_LEVEL_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type JapaneseWouldYouRatherQuestion = Node & {
  __typename?: 'JapaneseWouldYouRatherQuestion';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  uuid: Scalars['UUID'];
  question: Scalars['String'];
  answers: Array<Maybe<Scalars['String']>>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['Datetime'];
  /** Reads a single `LanguageSkillLevel` that is related to this `JapaneseWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
};

/**
 * A condition to be used against `JapaneseWouldYouRatherQuestion` object types.
 * All fields are tested for equality and combined with a logical ‘and.’
 */
export type JapaneseWouldYouRatherQuestionCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `uuid` field. */
  uuid?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `question` field. */
  question?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `answers` field. */
  answers?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Checks for equality with the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `JapaneseWouldYouRatherQuestion` object types. All fields are combined with a logical ‘and.’ */
export type JapaneseWouldYouRatherQuestionFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `uuid` field. */
  uuid?: Maybe<UuidFilter>;
  /** Filter by the object’s `question` field. */
  question?: Maybe<StringFilter>;
  /** Filter by the object’s `answers` field. */
  answers?: Maybe<StringListFilter>;
  /** Filter by the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<IntFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<JapaneseWouldYouRatherQuestionFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<JapaneseWouldYouRatherQuestionFilter>>;
  /** Negates the expression. */
  not?: Maybe<JapaneseWouldYouRatherQuestionFilter>;
};

/** An input for mutations affecting `JapaneseWouldYouRatherQuestion` */
export type JapaneseWouldYouRatherQuestionInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  question: Scalars['String'];
  answers: Array<Maybe<Scalars['String']>>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** Represents an update to a `JapaneseWouldYouRatherQuestion`. Fields that are set will be updated. */
export type JapaneseWouldYouRatherQuestionPatch = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  question?: Maybe<Scalars['String']>;
  answers?: Maybe<Array<Maybe<Scalars['String']>>>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `JapaneseWouldYouRatherQuestion` values. */
export type JapaneseWouldYouRatherQuestionsConnection = {
  __typename?: 'JapaneseWouldYouRatherQuestionsConnection';
  /** A list of `JapaneseWouldYouRatherQuestion` objects. */
  nodes: Array<Maybe<JapaneseWouldYouRatherQuestion>>;
  /** A list of edges which contains the `JapaneseWouldYouRatherQuestion` and cursor to aid in pagination. */
  edges: Array<JapaneseWouldYouRatherQuestionsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `JapaneseWouldYouRatherQuestion` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `JapaneseWouldYouRatherQuestion` edge in the connection. */
export type JapaneseWouldYouRatherQuestionsEdge = {
  __typename?: 'JapaneseWouldYouRatherQuestionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `JapaneseWouldYouRatherQuestion` at the end of the edge. */
  node?: Maybe<JapaneseWouldYouRatherQuestion>;
};

/** Methods to use when ordering `JapaneseWouldYouRatherQuestion`. */
export enum JapaneseWouldYouRatherQuestionsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UuidAsc = 'UUID_ASC',
  UuidDesc = 'UUID_DESC',
  QuestionAsc = 'QUESTION_ASC',
  QuestionDesc = 'QUESTION_DESC',
  AnswersAsc = 'ANSWERS_ASC',
  AnswersDesc = 'ANSWERS_DESC',
  RecommendedSkillLevelIdAsc = 'RECOMMENDED_SKILL_LEVEL_ID_ASC',
  RecommendedSkillLevelIdDesc = 'RECOMMENDED_SKILL_LEVEL_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** All input for the `joinGlobalGroup` mutation. */
export type JoinGlobalGroupInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  groupUuid: Scalars['UUID'];
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

export type KoreanRandomQuestion = Node & {
  __typename?: 'KoreanRandomQuestion';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  uuid: Scalars['UUID'];
  question: Scalars['String'];
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['Datetime'];
  /** Reads a single `LanguageSkillLevel` that is related to this `KoreanRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
};

/**
 * A condition to be used against `KoreanRandomQuestion` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type KoreanRandomQuestionCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `uuid` field. */
  uuid?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `question` field. */
  question?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `KoreanRandomQuestion` object types. All fields are combined with a logical ‘and.’ */
export type KoreanRandomQuestionFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `uuid` field. */
  uuid?: Maybe<UuidFilter>;
  /** Filter by the object’s `question` field. */
  question?: Maybe<StringFilter>;
  /** Filter by the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<IntFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<KoreanRandomQuestionFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<KoreanRandomQuestionFilter>>;
  /** Negates the expression. */
  not?: Maybe<KoreanRandomQuestionFilter>;
};

/** An input for mutations affecting `KoreanRandomQuestion` */
export type KoreanRandomQuestionInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  question: Scalars['String'];
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** Represents an update to a `KoreanRandomQuestion`. Fields that are set will be updated. */
export type KoreanRandomQuestionPatch = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  question?: Maybe<Scalars['String']>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `KoreanRandomQuestion` values. */
export type KoreanRandomQuestionsConnection = {
  __typename?: 'KoreanRandomQuestionsConnection';
  /** A list of `KoreanRandomQuestion` objects. */
  nodes: Array<Maybe<KoreanRandomQuestion>>;
  /** A list of edges which contains the `KoreanRandomQuestion` and cursor to aid in pagination. */
  edges: Array<KoreanRandomQuestionsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `KoreanRandomQuestion` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `KoreanRandomQuestion` edge in the connection. */
export type KoreanRandomQuestionsEdge = {
  __typename?: 'KoreanRandomQuestionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `KoreanRandomQuestion` at the end of the edge. */
  node?: Maybe<KoreanRandomQuestion>;
};

/** Methods to use when ordering `KoreanRandomQuestion`. */
export enum KoreanRandomQuestionsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UuidAsc = 'UUID_ASC',
  UuidDesc = 'UUID_DESC',
  QuestionAsc = 'QUESTION_ASC',
  QuestionDesc = 'QUESTION_DESC',
  RecommendedSkillLevelIdAsc = 'RECOMMENDED_SKILL_LEVEL_ID_ASC',
  RecommendedSkillLevelIdDesc = 'RECOMMENDED_SKILL_LEVEL_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type KoreanWouldYouRatherQuestion = Node & {
  __typename?: 'KoreanWouldYouRatherQuestion';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  uuid: Scalars['UUID'];
  question: Scalars['String'];
  answers: Array<Maybe<Scalars['String']>>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['Datetime'];
  /** Reads a single `LanguageSkillLevel` that is related to this `KoreanWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
};

/**
 * A condition to be used against `KoreanWouldYouRatherQuestion` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type KoreanWouldYouRatherQuestionCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `uuid` field. */
  uuid?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `question` field. */
  question?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `answers` field. */
  answers?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Checks for equality with the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `KoreanWouldYouRatherQuestion` object types. All fields are combined with a logical ‘and.’ */
export type KoreanWouldYouRatherQuestionFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `uuid` field. */
  uuid?: Maybe<UuidFilter>;
  /** Filter by the object’s `question` field. */
  question?: Maybe<StringFilter>;
  /** Filter by the object’s `answers` field. */
  answers?: Maybe<StringListFilter>;
  /** Filter by the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<IntFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<KoreanWouldYouRatherQuestionFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<KoreanWouldYouRatherQuestionFilter>>;
  /** Negates the expression. */
  not?: Maybe<KoreanWouldYouRatherQuestionFilter>;
};

/** An input for mutations affecting `KoreanWouldYouRatherQuestion` */
export type KoreanWouldYouRatherQuestionInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  question: Scalars['String'];
  answers: Array<Maybe<Scalars['String']>>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** Represents an update to a `KoreanWouldYouRatherQuestion`. Fields that are set will be updated. */
export type KoreanWouldYouRatherQuestionPatch = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  question?: Maybe<Scalars['String']>;
  answers?: Maybe<Array<Maybe<Scalars['String']>>>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `KoreanWouldYouRatherQuestion` values. */
export type KoreanWouldYouRatherQuestionsConnection = {
  __typename?: 'KoreanWouldYouRatherQuestionsConnection';
  /** A list of `KoreanWouldYouRatherQuestion` objects. */
  nodes: Array<Maybe<KoreanWouldYouRatherQuestion>>;
  /** A list of edges which contains the `KoreanWouldYouRatherQuestion` and cursor to aid in pagination. */
  edges: Array<KoreanWouldYouRatherQuestionsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `KoreanWouldYouRatherQuestion` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `KoreanWouldYouRatherQuestion` edge in the connection. */
export type KoreanWouldYouRatherQuestionsEdge = {
  __typename?: 'KoreanWouldYouRatherQuestionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `KoreanWouldYouRatherQuestion` at the end of the edge. */
  node?: Maybe<KoreanWouldYouRatherQuestion>;
};

/** Methods to use when ordering `KoreanWouldYouRatherQuestion`. */
export enum KoreanWouldYouRatherQuestionsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UuidAsc = 'UUID_ASC',
  UuidDesc = 'UUID_DESC',
  QuestionAsc = 'QUESTION_ASC',
  QuestionDesc = 'QUESTION_DESC',
  AnswersAsc = 'ANSWERS_ASC',
  AnswersDesc = 'ANSWERS_DESC',
  RecommendedSkillLevelIdAsc = 'RECOMMENDED_SKILL_LEVEL_ID_ASC',
  RecommendedSkillLevelIdDesc = 'RECOMMENDED_SKILL_LEVEL_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

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
  /** Reads and enables pagination through a set of `Post`. */
  posts: PostsConnection;
  /** Reads and enables pagination through a set of `Prompt`. */
  prompts: PromptsConnection;
  /** Reads and enables pagination through a set of `UserPreference`. */
  userPreferencesByFeedLanguageId: UserPreferencesConnection;
  /** Reads and enables pagination through a set of `InviteToken`. */
  inviteTokensByUserLocaleAndSignedUpWithTokenId: LanguageInviteTokensByUserLocaleAndSignedUpWithTokenIdManyToManyConnection;
  /** Reads and enables pagination through a set of `User`. */
  usersByUserLanguageLanguageIdAndUserId: LanguageUsersByUserLanguageLanguageIdAndUserIdManyToManyConnection;
  /** Reads and enables pagination through a set of `LanguageSkillLevel`. */
  languageSkillLevelsByUserLanguageLanguageIdAndLanguageSkillLevelId: LanguageLanguageSkillLevelsByUserLanguageLanguageIdAndLanguageSkillLevelIdManyToManyConnection;
  /** Reads and enables pagination through a set of `LanguageSkillLevel`. */
  languageSkillLevelsByGroupLanguageIdAndLanguageSkillLevelId: LanguageLanguageSkillLevelsByGroupLanguageIdAndLanguageSkillLevelIdManyToManyConnection;
  /** Reads and enables pagination through a set of `User`. */
  usersByPostLanguageIdAndAuthorId: LanguageUsersByPostLanguageIdAndAuthorIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Post`. */
  postsByPostLanguageIdAndParentPostId: LanguagePostsByPostLanguageIdAndParentPostIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Prompt`. */
  promptsByPostLanguageIdAndPromptId: LanguagePromptsByPostLanguageIdAndPromptIdManyToManyConnection;
  /** Reads and enables pagination through a set of `LanguageSkillLevel`. */
  languageSkillLevelsByPromptLanguageIdAndRecommendedSkillLevelId: LanguageLanguageSkillLevelsByPromptLanguageIdAndRecommendedSkillLevelIdManyToManyConnection;
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


export type LanguagePostsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PostsOrderBy>>;
  condition?: Maybe<PostCondition>;
  filter?: Maybe<PostFilter>;
};


export type LanguagePromptsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PromptsOrderBy>>;
  condition?: Maybe<PromptCondition>;
  filter?: Maybe<PromptFilter>;
};


export type LanguageUserPreferencesByFeedLanguageIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UserPreferencesOrderBy>>;
  condition?: Maybe<UserPreferenceCondition>;
  filter?: Maybe<UserPreferenceFilter>;
};


export type LanguageInviteTokensByUserLocaleAndSignedUpWithTokenIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<InviteTokensOrderBy>>;
  condition?: Maybe<InviteTokenCondition>;
  filter?: Maybe<InviteTokenFilter>;
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


export type LanguageUsersByPostLanguageIdAndAuthorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
  filter?: Maybe<UserFilter>;
};


export type LanguagePostsByPostLanguageIdAndParentPostIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PostsOrderBy>>;
  condition?: Maybe<PostCondition>;
  filter?: Maybe<PostFilter>;
};


export type LanguagePromptsByPostLanguageIdAndPromptIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PromptsOrderBy>>;
  condition?: Maybe<PromptCondition>;
  filter?: Maybe<PromptFilter>;
};


export type LanguageLanguageSkillLevelsByPromptLanguageIdAndRecommendedSkillLevelIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<LanguageSkillLevelsOrderBy>>;
  condition?: Maybe<LanguageSkillLevelCondition>;
  filter?: Maybe<LanguageSkillLevelFilter>;
};

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

/** An input for mutations affecting `Language` */
export type LanguageInput = {
  id?: Maybe<Scalars['Int']>;
  /** ISO 3166-1 alpha-2 standardized code */
  alpha2: Scalars['String'];
  englishName: Scalars['String'];
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `InviteToken` values, with data from `User`. */
export type LanguageInviteTokensByUserLocaleAndSignedUpWithTokenIdManyToManyConnection = {
  __typename?: 'LanguageInviteTokensByUserLocaleAndSignedUpWithTokenIdManyToManyConnection';
  /** A list of `InviteToken` objects. */
  nodes: Array<Maybe<InviteToken>>;
  /** A list of edges which contains the `InviteToken`, info from the `User`, and the cursor to aid in pagination. */
  edges: Array<LanguageInviteTokensByUserLocaleAndSignedUpWithTokenIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `InviteToken` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `InviteToken` edge in the connection, with data from `User`. */
export type LanguageInviteTokensByUserLocaleAndSignedUpWithTokenIdManyToManyEdge = {
  __typename?: 'LanguageInviteTokensByUserLocaleAndSignedUpWithTokenIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `InviteToken` at the end of the edge. */
  node?: Maybe<InviteToken>;
  /** Reads and enables pagination through a set of `User`. */
  usersBySignedUpWithTokenId: UsersConnection;
};


/** A `InviteToken` edge in the connection, with data from `User`. */
export type LanguageInviteTokensByUserLocaleAndSignedUpWithTokenIdManyToManyEdgeUsersBySignedUpWithTokenIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
  filter?: Maybe<UserFilter>;
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

/** A connection to a list of `LanguageSkillLevel` values, with data from `Prompt`. */
export type LanguageLanguageSkillLevelsByPromptLanguageIdAndRecommendedSkillLevelIdManyToManyConnection = {
  __typename?: 'LanguageLanguageSkillLevelsByPromptLanguageIdAndRecommendedSkillLevelIdManyToManyConnection';
  /** A list of `LanguageSkillLevel` objects. */
  nodes: Array<Maybe<LanguageSkillLevel>>;
  /** A list of edges which contains the `LanguageSkillLevel`, info from the `Prompt`, and the cursor to aid in pagination. */
  edges: Array<LanguageLanguageSkillLevelsByPromptLanguageIdAndRecommendedSkillLevelIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `LanguageSkillLevel` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `LanguageSkillLevel` edge in the connection, with data from `Prompt`. */
export type LanguageLanguageSkillLevelsByPromptLanguageIdAndRecommendedSkillLevelIdManyToManyEdge = {
  __typename?: 'LanguageLanguageSkillLevelsByPromptLanguageIdAndRecommendedSkillLevelIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `LanguageSkillLevel` at the end of the edge. */
  node?: Maybe<LanguageSkillLevel>;
  /** Reads and enables pagination through a set of `Prompt`. */
  promptsByRecommendedSkillLevelId: PromptsConnection;
};


/** A `LanguageSkillLevel` edge in the connection, with data from `Prompt`. */
export type LanguageLanguageSkillLevelsByPromptLanguageIdAndRecommendedSkillLevelIdManyToManyEdgePromptsByRecommendedSkillLevelIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PromptsOrderBy>>;
  condition?: Maybe<PromptCondition>;
  filter?: Maybe<PromptFilter>;
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

/** Represents an update to a `Language`. Fields that are set will be updated. */
export type LanguagePatch = {
  id?: Maybe<Scalars['Int']>;
  /** ISO 3166-1 alpha-2 standardized code */
  alpha2?: Maybe<Scalars['String']>;
  englishName?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `Post` values, with data from `Post`. */
export type LanguagePostsByPostLanguageIdAndParentPostIdManyToManyConnection = {
  __typename?: 'LanguagePostsByPostLanguageIdAndParentPostIdManyToManyConnection';
  /** A list of `Post` objects. */
  nodes: Array<Maybe<Post>>;
  /** A list of edges which contains the `Post`, info from the `Post`, and the cursor to aid in pagination. */
  edges: Array<LanguagePostsByPostLanguageIdAndParentPostIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Post` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Post` edge in the connection, with data from `Post`. */
export type LanguagePostsByPostLanguageIdAndParentPostIdManyToManyEdge = {
  __typename?: 'LanguagePostsByPostLanguageIdAndParentPostIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Post` at the end of the edge. */
  node?: Maybe<Post>;
  /** Reads and enables pagination through a set of `Post`. */
  replies: PostsConnection;
};


/** A `Post` edge in the connection, with data from `Post`. */
export type LanguagePostsByPostLanguageIdAndParentPostIdManyToManyEdgeRepliesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PostsOrderBy>>;
  condition?: Maybe<PostCondition>;
  filter?: Maybe<PostFilter>;
};

/** A connection to a list of `Prompt` values, with data from `Post`. */
export type LanguagePromptsByPostLanguageIdAndPromptIdManyToManyConnection = {
  __typename?: 'LanguagePromptsByPostLanguageIdAndPromptIdManyToManyConnection';
  /** A list of `Prompt` objects. */
  nodes: Array<Maybe<Prompt>>;
  /** A list of edges which contains the `Prompt`, info from the `Post`, and the cursor to aid in pagination. */
  edges: Array<LanguagePromptsByPostLanguageIdAndPromptIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Prompt` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Prompt` edge in the connection, with data from `Post`. */
export type LanguagePromptsByPostLanguageIdAndPromptIdManyToManyEdge = {
  __typename?: 'LanguagePromptsByPostLanguageIdAndPromptIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Prompt` at the end of the edge. */
  node?: Maybe<Prompt>;
  /** Reads and enables pagination through a set of `Post`. */
  posts: PostsConnection;
};


/** A `Prompt` edge in the connection, with data from `Post`. */
export type LanguagePromptsByPostLanguageIdAndPromptIdManyToManyEdgePostsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PostsOrderBy>>;
  condition?: Maybe<PostCondition>;
  filter?: Maybe<PostFilter>;
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
  /** Reads and enables pagination through a set of `EnglishWord`. */
  englishWordsByRecommendedSkillLevelId: EnglishWordsConnection;
  /** Reads and enables pagination through a set of `GermanWord`. */
  germanWordsByRecommendedSkillLevelId: GermanWordsConnection;
  /** Reads and enables pagination through a set of `EnglishRandomQuestion`. */
  englishRandomQuestionsByRecommendedSkillLevelId: EnglishRandomQuestionsConnection;
  /** Reads and enables pagination through a set of `GermanRandomQuestion`. */
  germanRandomQuestionsByRecommendedSkillLevelId: GermanRandomQuestionsConnection;
  /** Reads and enables pagination through a set of `EnglishWouldYouRatherQuestion`. */
  englishWouldYouRatherQuestionsByRecommendedSkillLevelId: EnglishWouldYouRatherQuestionsConnection;
  /** Reads and enables pagination through a set of `GermanWouldYouRatherQuestion`. */
  germanWouldYouRatherQuestionsByRecommendedSkillLevelId: GermanWouldYouRatherQuestionsConnection;
  /** Reads and enables pagination through a set of `ChineseRandomQuestion`. */
  chineseRandomQuestionsByRecommendedSkillLevelId: ChineseRandomQuestionsConnection;
  /** Reads and enables pagination through a set of `ChineseWouldYouRatherQuestion`. */
  chineseWouldYouRatherQuestionsByRecommendedSkillLevelId: ChineseWouldYouRatherQuestionsConnection;
  /** Reads and enables pagination through a set of `ChineseGuessCharacterQuestion`. */
  chineseGuessCharacterQuestionsByRecommendedSkillLevelId: ChineseGuessCharacterQuestionsConnection;
  /** Reads and enables pagination through a set of `Prompt`. */
  promptsByRecommendedSkillLevelId: PromptsConnection;
  /** Reads and enables pagination through a set of `ItalianRandomQuestion`. */
  italianRandomQuestionsByRecommendedSkillLevelId: ItalianRandomQuestionsConnection;
  /** Reads and enables pagination through a set of `ItalianWouldYouRatherQuestion`. */
  italianWouldYouRatherQuestionsByRecommendedSkillLevelId: ItalianWouldYouRatherQuestionsConnection;
  /** Reads and enables pagination through a set of `ItalianWord`. */
  italianWordsByRecommendedSkillLevelId: ItalianWordsConnection;
  /** Reads and enables pagination through a set of `PortugueseRandomQuestion`. */
  portugueseRandomQuestionsByRecommendedSkillLevelId: PortugueseRandomQuestionsConnection;
  /** Reads and enables pagination through a set of `PortugueseWouldYouRatherQuestion`. */
  portugueseWouldYouRatherQuestionsByRecommendedSkillLevelId: PortugueseWouldYouRatherQuestionsConnection;
  /** Reads and enables pagination through a set of `PortugueseWord`. */
  portugueseWordsByRecommendedSkillLevelId: PortugueseWordsConnection;
  /** Reads and enables pagination through a set of `SpanishRandomQuestion`. */
  spanishRandomQuestionsByRecommendedSkillLevelId: SpanishRandomQuestionsConnection;
  /** Reads and enables pagination through a set of `SpanishWouldYouRatherQuestion`. */
  spanishWouldYouRatherQuestionsByRecommendedSkillLevelId: SpanishWouldYouRatherQuestionsConnection;
  /** Reads and enables pagination through a set of `SpanishWord`. */
  spanishWordsByRecommendedSkillLevelId: SpanishWordsConnection;
  /** Reads and enables pagination through a set of `RussianRandomQuestion`. */
  russianRandomQuestionsByRecommendedSkillLevelId: RussianRandomQuestionsConnection;
  /** Reads and enables pagination through a set of `RussianWouldYouRatherQuestion`. */
  russianWouldYouRatherQuestionsByRecommendedSkillLevelId: RussianWouldYouRatherQuestionsConnection;
  /** Reads and enables pagination through a set of `RussianWord`. */
  russianWordsByRecommendedSkillLevelId: RussianWordsConnection;
  /** Reads and enables pagination through a set of `FrenchRandomQuestion`. */
  frenchRandomQuestionsByRecommendedSkillLevelId: FrenchRandomQuestionsConnection;
  /** Reads and enables pagination through a set of `FrenchWouldYouRatherQuestion`. */
  frenchWouldYouRatherQuestionsByRecommendedSkillLevelId: FrenchWouldYouRatherQuestionsConnection;
  /** Reads and enables pagination through a set of `FrenchWord`. */
  frenchWordsByRecommendedSkillLevelId: FrenchWordsConnection;
  /** Reads and enables pagination through a set of `KoreanRandomQuestion`. */
  koreanRandomQuestionsByRecommendedSkillLevelId: KoreanRandomQuestionsConnection;
  /** Reads and enables pagination through a set of `KoreanWouldYouRatherQuestion`. */
  koreanWouldYouRatherQuestionsByRecommendedSkillLevelId: KoreanWouldYouRatherQuestionsConnection;
  /** Reads and enables pagination through a set of `JapaneseRandomQuestion`. */
  japaneseRandomQuestionsByRecommendedSkillLevelId: JapaneseRandomQuestionsConnection;
  /** Reads and enables pagination through a set of `JapaneseWouldYouRatherQuestion`. */
  japaneseWouldYouRatherQuestionsByRecommendedSkillLevelId: JapaneseWouldYouRatherQuestionsConnection;
  /** Reads and enables pagination through a set of `User`. */
  usersByUserLanguageLanguageSkillLevelIdAndUserId: LanguageSkillLevelUsersByUserLanguageLanguageSkillLevelIdAndUserIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Language`. */
  languagesByUserLanguageLanguageSkillLevelIdAndLanguageId: LanguageSkillLevelLanguagesByUserLanguageLanguageSkillLevelIdAndLanguageIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Language`. */
  languagesByGroupLanguageSkillLevelIdAndLanguageId: LanguageSkillLevelLanguagesByGroupLanguageSkillLevelIdAndLanguageIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Language`. */
  languagesByPromptRecommendedSkillLevelIdAndLanguageId: LanguageSkillLevelLanguagesByPromptRecommendedSkillLevelIdAndLanguageIdManyToManyConnection;
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


export type LanguageSkillLevelEnglishWordsByRecommendedSkillLevelIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<EnglishWordsOrderBy>>;
  condition?: Maybe<EnglishWordCondition>;
  filter?: Maybe<EnglishWordFilter>;
};


export type LanguageSkillLevelGermanWordsByRecommendedSkillLevelIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<GermanWordsOrderBy>>;
  condition?: Maybe<GermanWordCondition>;
  filter?: Maybe<GermanWordFilter>;
};


export type LanguageSkillLevelEnglishRandomQuestionsByRecommendedSkillLevelIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<EnglishRandomQuestionsOrderBy>>;
  condition?: Maybe<EnglishRandomQuestionCondition>;
  filter?: Maybe<EnglishRandomQuestionFilter>;
};


export type LanguageSkillLevelGermanRandomQuestionsByRecommendedSkillLevelIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<GermanRandomQuestionsOrderBy>>;
  condition?: Maybe<GermanRandomQuestionCondition>;
  filter?: Maybe<GermanRandomQuestionFilter>;
};


export type LanguageSkillLevelEnglishWouldYouRatherQuestionsByRecommendedSkillLevelIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<EnglishWouldYouRatherQuestionsOrderBy>>;
  condition?: Maybe<EnglishWouldYouRatherQuestionCondition>;
  filter?: Maybe<EnglishWouldYouRatherQuestionFilter>;
};


export type LanguageSkillLevelGermanWouldYouRatherQuestionsByRecommendedSkillLevelIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<GermanWouldYouRatherQuestionsOrderBy>>;
  condition?: Maybe<GermanWouldYouRatherQuestionCondition>;
  filter?: Maybe<GermanWouldYouRatherQuestionFilter>;
};


export type LanguageSkillLevelChineseRandomQuestionsByRecommendedSkillLevelIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ChineseRandomQuestionsOrderBy>>;
  condition?: Maybe<ChineseRandomQuestionCondition>;
  filter?: Maybe<ChineseRandomQuestionFilter>;
};


export type LanguageSkillLevelChineseWouldYouRatherQuestionsByRecommendedSkillLevelIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ChineseWouldYouRatherQuestionsOrderBy>>;
  condition?: Maybe<ChineseWouldYouRatherQuestionCondition>;
  filter?: Maybe<ChineseWouldYouRatherQuestionFilter>;
};


export type LanguageSkillLevelChineseGuessCharacterQuestionsByRecommendedSkillLevelIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ChineseGuessCharacterQuestionsOrderBy>>;
  condition?: Maybe<ChineseGuessCharacterQuestionCondition>;
  filter?: Maybe<ChineseGuessCharacterQuestionFilter>;
};


export type LanguageSkillLevelPromptsByRecommendedSkillLevelIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PromptsOrderBy>>;
  condition?: Maybe<PromptCondition>;
  filter?: Maybe<PromptFilter>;
};


export type LanguageSkillLevelItalianRandomQuestionsByRecommendedSkillLevelIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ItalianRandomQuestionsOrderBy>>;
  condition?: Maybe<ItalianRandomQuestionCondition>;
  filter?: Maybe<ItalianRandomQuestionFilter>;
};


export type LanguageSkillLevelItalianWouldYouRatherQuestionsByRecommendedSkillLevelIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ItalianWouldYouRatherQuestionsOrderBy>>;
  condition?: Maybe<ItalianWouldYouRatherQuestionCondition>;
  filter?: Maybe<ItalianWouldYouRatherQuestionFilter>;
};


export type LanguageSkillLevelItalianWordsByRecommendedSkillLevelIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ItalianWordsOrderBy>>;
  condition?: Maybe<ItalianWordCondition>;
  filter?: Maybe<ItalianWordFilter>;
};


export type LanguageSkillLevelPortugueseRandomQuestionsByRecommendedSkillLevelIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PortugueseRandomQuestionsOrderBy>>;
  condition?: Maybe<PortugueseRandomQuestionCondition>;
  filter?: Maybe<PortugueseRandomQuestionFilter>;
};


export type LanguageSkillLevelPortugueseWouldYouRatherQuestionsByRecommendedSkillLevelIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PortugueseWouldYouRatherQuestionsOrderBy>>;
  condition?: Maybe<PortugueseWouldYouRatherQuestionCondition>;
  filter?: Maybe<PortugueseWouldYouRatherQuestionFilter>;
};


export type LanguageSkillLevelPortugueseWordsByRecommendedSkillLevelIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PortugueseWordsOrderBy>>;
  condition?: Maybe<PortugueseWordCondition>;
  filter?: Maybe<PortugueseWordFilter>;
};


export type LanguageSkillLevelSpanishRandomQuestionsByRecommendedSkillLevelIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<SpanishRandomQuestionsOrderBy>>;
  condition?: Maybe<SpanishRandomQuestionCondition>;
  filter?: Maybe<SpanishRandomQuestionFilter>;
};


export type LanguageSkillLevelSpanishWouldYouRatherQuestionsByRecommendedSkillLevelIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<SpanishWouldYouRatherQuestionsOrderBy>>;
  condition?: Maybe<SpanishWouldYouRatherQuestionCondition>;
  filter?: Maybe<SpanishWouldYouRatherQuestionFilter>;
};


export type LanguageSkillLevelSpanishWordsByRecommendedSkillLevelIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<SpanishWordsOrderBy>>;
  condition?: Maybe<SpanishWordCondition>;
  filter?: Maybe<SpanishWordFilter>;
};


export type LanguageSkillLevelRussianRandomQuestionsByRecommendedSkillLevelIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<RussianRandomQuestionsOrderBy>>;
  condition?: Maybe<RussianRandomQuestionCondition>;
  filter?: Maybe<RussianRandomQuestionFilter>;
};


export type LanguageSkillLevelRussianWouldYouRatherQuestionsByRecommendedSkillLevelIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<RussianWouldYouRatherQuestionsOrderBy>>;
  condition?: Maybe<RussianWouldYouRatherQuestionCondition>;
  filter?: Maybe<RussianWouldYouRatherQuestionFilter>;
};


export type LanguageSkillLevelRussianWordsByRecommendedSkillLevelIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<RussianWordsOrderBy>>;
  condition?: Maybe<RussianWordCondition>;
  filter?: Maybe<RussianWordFilter>;
};


export type LanguageSkillLevelFrenchRandomQuestionsByRecommendedSkillLevelIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<FrenchRandomQuestionsOrderBy>>;
  condition?: Maybe<FrenchRandomQuestionCondition>;
  filter?: Maybe<FrenchRandomQuestionFilter>;
};


export type LanguageSkillLevelFrenchWouldYouRatherQuestionsByRecommendedSkillLevelIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<FrenchWouldYouRatherQuestionsOrderBy>>;
  condition?: Maybe<FrenchWouldYouRatherQuestionCondition>;
  filter?: Maybe<FrenchWouldYouRatherQuestionFilter>;
};


export type LanguageSkillLevelFrenchWordsByRecommendedSkillLevelIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<FrenchWordsOrderBy>>;
  condition?: Maybe<FrenchWordCondition>;
  filter?: Maybe<FrenchWordFilter>;
};


export type LanguageSkillLevelKoreanRandomQuestionsByRecommendedSkillLevelIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<KoreanRandomQuestionsOrderBy>>;
  condition?: Maybe<KoreanRandomQuestionCondition>;
  filter?: Maybe<KoreanRandomQuestionFilter>;
};


export type LanguageSkillLevelKoreanWouldYouRatherQuestionsByRecommendedSkillLevelIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<KoreanWouldYouRatherQuestionsOrderBy>>;
  condition?: Maybe<KoreanWouldYouRatherQuestionCondition>;
  filter?: Maybe<KoreanWouldYouRatherQuestionFilter>;
};


export type LanguageSkillLevelJapaneseRandomQuestionsByRecommendedSkillLevelIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<JapaneseRandomQuestionsOrderBy>>;
  condition?: Maybe<JapaneseRandomQuestionCondition>;
  filter?: Maybe<JapaneseRandomQuestionFilter>;
};


export type LanguageSkillLevelJapaneseWouldYouRatherQuestionsByRecommendedSkillLevelIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<JapaneseWouldYouRatherQuestionsOrderBy>>;
  condition?: Maybe<JapaneseWouldYouRatherQuestionCondition>;
  filter?: Maybe<JapaneseWouldYouRatherQuestionFilter>;
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


export type LanguageSkillLevelLanguagesByPromptRecommendedSkillLevelIdAndLanguageIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<LanguagesOrderBy>>;
  condition?: Maybe<LanguageCondition>;
  filter?: Maybe<LanguageFilter>;
};

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

/** An input for mutations affecting `LanguageSkillLevel` */
export type LanguageSkillLevelInput = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
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

/** A connection to a list of `Language` values, with data from `Prompt`. */
export type LanguageSkillLevelLanguagesByPromptRecommendedSkillLevelIdAndLanguageIdManyToManyConnection = {
  __typename?: 'LanguageSkillLevelLanguagesByPromptRecommendedSkillLevelIdAndLanguageIdManyToManyConnection';
  /** A list of `Language` objects. */
  nodes: Array<Maybe<Language>>;
  /** A list of edges which contains the `Language`, info from the `Prompt`, and the cursor to aid in pagination. */
  edges: Array<LanguageSkillLevelLanguagesByPromptRecommendedSkillLevelIdAndLanguageIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Language` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Language` edge in the connection, with data from `Prompt`. */
export type LanguageSkillLevelLanguagesByPromptRecommendedSkillLevelIdAndLanguageIdManyToManyEdge = {
  __typename?: 'LanguageSkillLevelLanguagesByPromptRecommendedSkillLevelIdAndLanguageIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Language` at the end of the edge. */
  node?: Maybe<Language>;
  /** Reads and enables pagination through a set of `Prompt`. */
  prompts: PromptsConnection;
};


/** A `Language` edge in the connection, with data from `Prompt`. */
export type LanguageSkillLevelLanguagesByPromptRecommendedSkillLevelIdAndLanguageIdManyToManyEdgePromptsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PromptsOrderBy>>;
  condition?: Maybe<PromptCondition>;
  filter?: Maybe<PromptFilter>;
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

/** Represents an update to a `LanguageSkillLevel`. Fields that are set will be updated. */
export type LanguageSkillLevelPatch = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
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

/** A connection to a list of `User` values, with data from `Post`. */
export type LanguageUsersByPostLanguageIdAndAuthorIdManyToManyConnection = {
  __typename?: 'LanguageUsersByPostLanguageIdAndAuthorIdManyToManyConnection';
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** A list of edges which contains the `User`, info from the `Post`, and the cursor to aid in pagination. */
  edges: Array<LanguageUsersByPostLanguageIdAndAuthorIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection, with data from `Post`. */
export type LanguageUsersByPostLanguageIdAndAuthorIdManyToManyEdge = {
  __typename?: 'LanguageUsersByPostLanguageIdAndAuthorIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
  /** Reads and enables pagination through a set of `Post`. */
  authoredPosts: PostsConnection;
};


/** A `User` edge in the connection, with data from `Post`. */
export type LanguageUsersByPostLanguageIdAndAuthorIdManyToManyEdgeAuthoredPostsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PostsOrderBy>>;
  condition?: Maybe<PostCondition>;
  filter?: Maybe<PostFilter>;
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
  /** Reads and enables pagination through a set of `MessagePreview`. */
  messagePreviews: MessagePreviewsConnection;
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


export type MessageMessagePreviewsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MessagePreviewsOrderBy>>;
  condition?: Maybe<MessagePreviewCondition>;
  filter?: Maybe<MessagePreviewFilter>;
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

/** An input for mutations affecting `Message` */
export type MessageInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  senderId?: Maybe<Scalars['Int']>;
  recipientId?: Maybe<Scalars['Int']>;
  recipientGroupId?: Maybe<Scalars['Int']>;
  body: Scalars['String'];
  parentMessageId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
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

export type MessagePreview = Node & {
  __typename?: 'MessagePreview';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  uuid: Scalars['UUID'];
  /** Basename without extension */
  filename: Scalars['String'];
  /** Extension without leading dot */
  extension?: Maybe<Scalars['String']>;
  messageId: Scalars['Int'];
  createdAt: Scalars['Datetime'];
  /** Reads a single `Message` that is related to this `MessagePreview`. */
  message?: Maybe<Message>;
};

/**
 * A condition to be used against `MessagePreview` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type MessagePreviewCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `uuid` field. */
  uuid?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `filename` field. */
  filename?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `extension` field. */
  extension?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `messageId` field. */
  messageId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `MessagePreview` object types. All fields are combined with a logical ‘and.’ */
export type MessagePreviewFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `uuid` field. */
  uuid?: Maybe<UuidFilter>;
  /** Filter by the object’s `filename` field. */
  filename?: Maybe<StringFilter>;
  /** Filter by the object’s `extension` field. */
  extension?: Maybe<StringFilter>;
  /** Filter by the object’s `messageId` field. */
  messageId?: Maybe<IntFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<MessagePreviewFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<MessagePreviewFilter>>;
  /** Negates the expression. */
  not?: Maybe<MessagePreviewFilter>;
};

/** An input for mutations affecting `MessagePreview` */
export type MessagePreviewInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  /** Basename without extension */
  filename: Scalars['String'];
  /** Extension without leading dot */
  extension?: Maybe<Scalars['String']>;
  messageId: Scalars['Int'];
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** Represents an update to a `MessagePreview`. Fields that are set will be updated. */
export type MessagePreviewPatch = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  /** Basename without extension */
  filename?: Maybe<Scalars['String']>;
  /** Extension without leading dot */
  extension?: Maybe<Scalars['String']>;
  messageId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `MessagePreview` values. */
export type MessagePreviewsConnection = {
  __typename?: 'MessagePreviewsConnection';
  /** A list of `MessagePreview` objects. */
  nodes: Array<Maybe<MessagePreview>>;
  /** A list of edges which contains the `MessagePreview` and cursor to aid in pagination. */
  edges: Array<MessagePreviewsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `MessagePreview` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `MessagePreview` edge in the connection. */
export type MessagePreviewsEdge = {
  __typename?: 'MessagePreviewsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `MessagePreview` at the end of the edge. */
  node?: Maybe<MessagePreview>;
};

/** Methods to use when ordering `MessagePreview`. */
export enum MessagePreviewsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UuidAsc = 'UUID_ASC',
  UuidDesc = 'UUID_DESC',
  FilenameAsc = 'FILENAME_ASC',
  FilenameDesc = 'FILENAME_DESC',
  ExtensionAsc = 'EXTENSION_ASC',
  ExtensionDesc = 'EXTENSION_DESC',
  MessageIdAsc = 'MESSAGE_ID_ASC',
  MessageIdDesc = 'MESSAGE_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

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

/** A `Message` edge in the connection. */
export type MessagesEdge = {
  __typename?: 'MessagesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Message` at the end of the edge. */
  node?: Maybe<Message>;
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

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a single `GroupUser`. */
  createGroupUser?: Maybe<CreateGroupUserPayload>;
  /** Creates a single `Group`. */
  createGroup?: Maybe<CreateGroupPayload>;
  /** Creates a single `ChineseGuessCharacterQuestion`. */
  createChineseGuessCharacterQuestion?: Maybe<CreateChineseGuessCharacterQuestionPayload>;
  /** Creates a single `InviteToken`. */
  createInviteToken?: Maybe<CreateInviteTokenPayload>;
  /** Creates a single `LanguageSkillLevel`. */
  createLanguageSkillLevel?: Maybe<CreateLanguageSkillLevelPayload>;
  /** Creates a single `Language`. */
  createLanguage?: Maybe<CreateLanguagePayload>;
  /** Creates a single `MessagePreview`. */
  createMessagePreview?: Maybe<CreateMessagePreviewPayload>;
  /** Creates a single `Message`. */
  createMessage?: Maybe<CreateMessagePayload>;
  /** Creates a single `NotificationChannel`. */
  createNotificationChannel?: Maybe<CreateNotificationChannelPayload>;
  /** Creates a single `Notification`. */
  createNotification?: Maybe<CreateNotificationPayload>;
  /** Creates a single `PostLike`. */
  createPostLike?: Maybe<CreatePostLikePayload>;
  /** Creates a single `PostRecording`. */
  createPostRecording?: Maybe<CreatePostRecordingPayload>;
  /** Creates a single `Post`. */
  createPost?: Maybe<CreatePostPayload>;
  /** Creates a single `Prompt`. */
  createPrompt?: Maybe<CreatePromptPayload>;
  /** Creates a single `GermanRandomQuestion`. */
  createGermanRandomQuestion?: Maybe<CreateGermanRandomQuestionPayload>;
  /** Creates a single `EnglishRandomQuestion`. */
  createEnglishRandomQuestion?: Maybe<CreateEnglishRandomQuestionPayload>;
  /** Creates a single `SpanishRandomQuestion`. */
  createSpanishRandomQuestion?: Maybe<CreateSpanishRandomQuestionPayload>;
  /** Creates a single `FrenchRandomQuestion`. */
  createFrenchRandomQuestion?: Maybe<CreateFrenchRandomQuestionPayload>;
  /** Creates a single `ItalianRandomQuestion`. */
  createItalianRandomQuestion?: Maybe<CreateItalianRandomQuestionPayload>;
  /** Creates a single `JapaneseRandomQuestion`. */
  createJapaneseRandomQuestion?: Maybe<CreateJapaneseRandomQuestionPayload>;
  /** Creates a single `KoreanRandomQuestion`. */
  createKoreanRandomQuestion?: Maybe<CreateKoreanRandomQuestionPayload>;
  /** Creates a single `PortugueseRandomQuestion`. */
  createPortugueseRandomQuestion?: Maybe<CreatePortugueseRandomQuestionPayload>;
  /** Creates a single `RussianRandomQuestion`. */
  createRussianRandomQuestion?: Maybe<CreateRussianRandomQuestionPayload>;
  /** Creates a single `ChineseRandomQuestion`. */
  createChineseRandomQuestion?: Maybe<CreateChineseRandomQuestionPayload>;
  /** Creates a single `UserDevice`. */
  createUserDevice?: Maybe<CreateUserDevicePayload>;
  /** Creates a single `UserFollower`. */
  createUserFollower?: Maybe<CreateUserFollowerPayload>;
  /** Creates a single `UserLanguage`. */
  createUserLanguage?: Maybe<CreateUserLanguagePayload>;
  /** Creates a single `UserPreference`. */
  createUserPreference?: Maybe<CreateUserPreferencePayload>;
  /** Creates a single `UserSession`. */
  createUserSession?: Maybe<CreateUserSessionPayload>;
  /** Creates a single `User`. */
  createUser?: Maybe<CreateUserPayload>;
  /** Creates a single `GermanWord`. */
  createGermanWord?: Maybe<CreateGermanWordPayload>;
  /** Creates a single `EnglishWord`. */
  createEnglishWord?: Maybe<CreateEnglishWordPayload>;
  /** Creates a single `SpanishWord`. */
  createSpanishWord?: Maybe<CreateSpanishWordPayload>;
  /** Creates a single `FrenchWord`. */
  createFrenchWord?: Maybe<CreateFrenchWordPayload>;
  /** Creates a single `ItalianWord`. */
  createItalianWord?: Maybe<CreateItalianWordPayload>;
  /** Creates a single `PortugueseWord`. */
  createPortugueseWord?: Maybe<CreatePortugueseWordPayload>;
  /** Creates a single `RussianWord`. */
  createRussianWord?: Maybe<CreateRussianWordPayload>;
  /** Creates a single `GermanWouldYouRatherQuestion`. */
  createGermanWouldYouRatherQuestion?: Maybe<CreateGermanWouldYouRatherQuestionPayload>;
  /** Creates a single `EnglishWouldYouRatherQuestion`. */
  createEnglishWouldYouRatherQuestion?: Maybe<CreateEnglishWouldYouRatherQuestionPayload>;
  /** Creates a single `SpanishWouldYouRatherQuestion`. */
  createSpanishWouldYouRatherQuestion?: Maybe<CreateSpanishWouldYouRatherQuestionPayload>;
  /** Creates a single `FrenchWouldYouRatherQuestion`. */
  createFrenchWouldYouRatherQuestion?: Maybe<CreateFrenchWouldYouRatherQuestionPayload>;
  /** Creates a single `ItalianWouldYouRatherQuestion`. */
  createItalianWouldYouRatherQuestion?: Maybe<CreateItalianWouldYouRatherQuestionPayload>;
  /** Creates a single `JapaneseWouldYouRatherQuestion`. */
  createJapaneseWouldYouRatherQuestion?: Maybe<CreateJapaneseWouldYouRatherQuestionPayload>;
  /** Creates a single `KoreanWouldYouRatherQuestion`. */
  createKoreanWouldYouRatherQuestion?: Maybe<CreateKoreanWouldYouRatherQuestionPayload>;
  /** Creates a single `PortugueseWouldYouRatherQuestion`. */
  createPortugueseWouldYouRatherQuestion?: Maybe<CreatePortugueseWouldYouRatherQuestionPayload>;
  /** Creates a single `RussianWouldYouRatherQuestion`. */
  createRussianWouldYouRatherQuestion?: Maybe<CreateRussianWouldYouRatherQuestionPayload>;
  /** Creates a single `ChineseWouldYouRatherQuestion`. */
  createChineseWouldYouRatherQuestion?: Maybe<CreateChineseWouldYouRatherQuestionPayload>;
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
  /** Updates a single `ChineseGuessCharacterQuestion` using its globally unique id and a patch. */
  updateChineseGuessCharacterQuestionByNodeId?: Maybe<UpdateChineseGuessCharacterQuestionPayload>;
  /** Updates a single `ChineseGuessCharacterQuestion` using a unique key and a patch. */
  updateChineseGuessCharacterQuestion?: Maybe<UpdateChineseGuessCharacterQuestionPayload>;
  /** Updates a single `ChineseGuessCharacterQuestion` using a unique key and a patch. */
  updateChineseGuessCharacterQuestionByUuid?: Maybe<UpdateChineseGuessCharacterQuestionPayload>;
  /** Updates a single `InviteToken` using its globally unique id and a patch. */
  updateInviteTokenByNodeId?: Maybe<UpdateInviteTokenPayload>;
  /** Updates a single `InviteToken` using a unique key and a patch. */
  updateInviteToken?: Maybe<UpdateInviteTokenPayload>;
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
  /** Updates a single `MessagePreview` using its globally unique id and a patch. */
  updateMessagePreviewByNodeId?: Maybe<UpdateMessagePreviewPayload>;
  /** Updates a single `MessagePreview` using a unique key and a patch. */
  updateMessagePreview?: Maybe<UpdateMessagePreviewPayload>;
  /** Updates a single `MessagePreview` using a unique key and a patch. */
  updateMessagePreviewByUuid?: Maybe<UpdateMessagePreviewPayload>;
  /** Updates a single `Message` using its globally unique id and a patch. */
  updateMessageByNodeId?: Maybe<UpdateMessagePayload>;
  /** Updates a single `Message` using a unique key and a patch. */
  updateMessage?: Maybe<UpdateMessagePayload>;
  /** Updates a single `Message` using a unique key and a patch. */
  updateMessageByUuid?: Maybe<UpdateMessagePayload>;
  /** Updates a single `NotificationChannel` using its globally unique id and a patch. */
  updateNotificationChannelByNodeId?: Maybe<UpdateNotificationChannelPayload>;
  /** Updates a single `NotificationChannel` using a unique key and a patch. */
  updateNotificationChannel?: Maybe<UpdateNotificationChannelPayload>;
  /** Updates a single `NotificationChannel` using a unique key and a patch. */
  updateNotificationChannelByUuid?: Maybe<UpdateNotificationChannelPayload>;
  /** Updates a single `NotificationChannel` using a unique key and a patch. */
  updateNotificationChannelByName?: Maybe<UpdateNotificationChannelPayload>;
  /** Updates a single `Notification` using its globally unique id and a patch. */
  updateNotificationByNodeId?: Maybe<UpdateNotificationPayload>;
  /** Updates a single `Notification` using a unique key and a patch. */
  updateNotification?: Maybe<UpdateNotificationPayload>;
  /** Updates a single `Notification` using a unique key and a patch. */
  updateNotificationByUuid?: Maybe<UpdateNotificationPayload>;
  /** Updates a single `PostLike` using its globally unique id and a patch. */
  updatePostLikeByNodeId?: Maybe<UpdatePostLikePayload>;
  /** Updates a single `PostLike` using a unique key and a patch. */
  updatePostLike?: Maybe<UpdatePostLikePayload>;
  /** Updates a single `PostRecording` using its globally unique id and a patch. */
  updatePostRecordingByNodeId?: Maybe<UpdatePostRecordingPayload>;
  /** Updates a single `PostRecording` using a unique key and a patch. */
  updatePostRecording?: Maybe<UpdatePostRecordingPayload>;
  /** Updates a single `PostRecording` using a unique key and a patch. */
  updatePostRecordingByUuid?: Maybe<UpdatePostRecordingPayload>;
  /** Updates a single `Post` using its globally unique id and a patch. */
  updatePostByNodeId?: Maybe<UpdatePostPayload>;
  /** Updates a single `Post` using a unique key and a patch. */
  updatePost?: Maybe<UpdatePostPayload>;
  /** Updates a single `Post` using a unique key and a patch. */
  updatePostByUuid?: Maybe<UpdatePostPayload>;
  /** Updates a single `Prompt` using its globally unique id and a patch. */
  updatePromptByNodeId?: Maybe<UpdatePromptPayload>;
  /** Updates a single `Prompt` using a unique key and a patch. */
  updatePrompt?: Maybe<UpdatePromptPayload>;
  /** Updates a single `Prompt` using a unique key and a patch. */
  updatePromptByUuid?: Maybe<UpdatePromptPayload>;
  /** Updates a single `GermanRandomQuestion` using its globally unique id and a patch. */
  updateGermanRandomQuestionByNodeId?: Maybe<UpdateGermanRandomQuestionPayload>;
  /** Updates a single `GermanRandomQuestion` using a unique key and a patch. */
  updateGermanRandomQuestion?: Maybe<UpdateGermanRandomQuestionPayload>;
  /** Updates a single `GermanRandomQuestion` using a unique key and a patch. */
  updateGermanRandomQuestionByUuid?: Maybe<UpdateGermanRandomQuestionPayload>;
  /** Updates a single `EnglishRandomQuestion` using its globally unique id and a patch. */
  updateEnglishRandomQuestionByNodeId?: Maybe<UpdateEnglishRandomQuestionPayload>;
  /** Updates a single `EnglishRandomQuestion` using a unique key and a patch. */
  updateEnglishRandomQuestion?: Maybe<UpdateEnglishRandomQuestionPayload>;
  /** Updates a single `EnglishRandomQuestion` using a unique key and a patch. */
  updateEnglishRandomQuestionByUuid?: Maybe<UpdateEnglishRandomQuestionPayload>;
  /** Updates a single `SpanishRandomQuestion` using its globally unique id and a patch. */
  updateSpanishRandomQuestionByNodeId?: Maybe<UpdateSpanishRandomQuestionPayload>;
  /** Updates a single `SpanishRandomQuestion` using a unique key and a patch. */
  updateSpanishRandomQuestion?: Maybe<UpdateSpanishRandomQuestionPayload>;
  /** Updates a single `SpanishRandomQuestion` using a unique key and a patch. */
  updateSpanishRandomQuestionByUuid?: Maybe<UpdateSpanishRandomQuestionPayload>;
  /** Updates a single `FrenchRandomQuestion` using its globally unique id and a patch. */
  updateFrenchRandomQuestionByNodeId?: Maybe<UpdateFrenchRandomQuestionPayload>;
  /** Updates a single `FrenchRandomQuestion` using a unique key and a patch. */
  updateFrenchRandomQuestion?: Maybe<UpdateFrenchRandomQuestionPayload>;
  /** Updates a single `FrenchRandomQuestion` using a unique key and a patch. */
  updateFrenchRandomQuestionByUuid?: Maybe<UpdateFrenchRandomQuestionPayload>;
  /** Updates a single `ItalianRandomQuestion` using its globally unique id and a patch. */
  updateItalianRandomQuestionByNodeId?: Maybe<UpdateItalianRandomQuestionPayload>;
  /** Updates a single `ItalianRandomQuestion` using a unique key and a patch. */
  updateItalianRandomQuestion?: Maybe<UpdateItalianRandomQuestionPayload>;
  /** Updates a single `ItalianRandomQuestion` using a unique key and a patch. */
  updateItalianRandomQuestionByUuid?: Maybe<UpdateItalianRandomQuestionPayload>;
  /** Updates a single `JapaneseRandomQuestion` using its globally unique id and a patch. */
  updateJapaneseRandomQuestionByNodeId?: Maybe<UpdateJapaneseRandomQuestionPayload>;
  /** Updates a single `JapaneseRandomQuestion` using a unique key and a patch. */
  updateJapaneseRandomQuestion?: Maybe<UpdateJapaneseRandomQuestionPayload>;
  /** Updates a single `JapaneseRandomQuestion` using a unique key and a patch. */
  updateJapaneseRandomQuestionByUuid?: Maybe<UpdateJapaneseRandomQuestionPayload>;
  /** Updates a single `KoreanRandomQuestion` using its globally unique id and a patch. */
  updateKoreanRandomQuestionByNodeId?: Maybe<UpdateKoreanRandomQuestionPayload>;
  /** Updates a single `KoreanRandomQuestion` using a unique key and a patch. */
  updateKoreanRandomQuestion?: Maybe<UpdateKoreanRandomQuestionPayload>;
  /** Updates a single `KoreanRandomQuestion` using a unique key and a patch. */
  updateKoreanRandomQuestionByUuid?: Maybe<UpdateKoreanRandomQuestionPayload>;
  /** Updates a single `PortugueseRandomQuestion` using its globally unique id and a patch. */
  updatePortugueseRandomQuestionByNodeId?: Maybe<UpdatePortugueseRandomQuestionPayload>;
  /** Updates a single `PortugueseRandomQuestion` using a unique key and a patch. */
  updatePortugueseRandomQuestion?: Maybe<UpdatePortugueseRandomQuestionPayload>;
  /** Updates a single `PortugueseRandomQuestion` using a unique key and a patch. */
  updatePortugueseRandomQuestionByUuid?: Maybe<UpdatePortugueseRandomQuestionPayload>;
  /** Updates a single `RussianRandomQuestion` using its globally unique id and a patch. */
  updateRussianRandomQuestionByNodeId?: Maybe<UpdateRussianRandomQuestionPayload>;
  /** Updates a single `RussianRandomQuestion` using a unique key and a patch. */
  updateRussianRandomQuestion?: Maybe<UpdateRussianRandomQuestionPayload>;
  /** Updates a single `RussianRandomQuestion` using a unique key and a patch. */
  updateRussianRandomQuestionByUuid?: Maybe<UpdateRussianRandomQuestionPayload>;
  /** Updates a single `ChineseRandomQuestion` using its globally unique id and a patch. */
  updateChineseRandomQuestionByNodeId?: Maybe<UpdateChineseRandomQuestionPayload>;
  /** Updates a single `ChineseRandomQuestion` using a unique key and a patch. */
  updateChineseRandomQuestion?: Maybe<UpdateChineseRandomQuestionPayload>;
  /** Updates a single `ChineseRandomQuestion` using a unique key and a patch. */
  updateChineseRandomQuestionByUuid?: Maybe<UpdateChineseRandomQuestionPayload>;
  /** Updates a single `UserDevice` using its globally unique id and a patch. */
  updateUserDeviceByNodeId?: Maybe<UpdateUserDevicePayload>;
  /** Updates a single `UserDevice` using a unique key and a patch. */
  updateUserDevice?: Maybe<UpdateUserDevicePayload>;
  /** Updates a single `UserDevice` using a unique key and a patch. */
  updateUserDeviceByUuid?: Maybe<UpdateUserDevicePayload>;
  /** Updates a single `UserDevice` using a unique key and a patch. */
  updateUserDeviceByFcmToken?: Maybe<UpdateUserDevicePayload>;
  /** Updates a single `UserFollower` using its globally unique id and a patch. */
  updateUserFollowerByNodeId?: Maybe<UpdateUserFollowerPayload>;
  /** Updates a single `UserFollower` using a unique key and a patch. */
  updateUserFollower?: Maybe<UpdateUserFollowerPayload>;
  /** Updates a single `UserLanguage` using its globally unique id and a patch. */
  updateUserLanguageByNodeId?: Maybe<UpdateUserLanguagePayload>;
  /** Updates a single `UserLanguage` using a unique key and a patch. */
  updateUserLanguage?: Maybe<UpdateUserLanguagePayload>;
  /** Updates a single `UserPreference` using its globally unique id and a patch. */
  updateUserPreferenceByNodeId?: Maybe<UpdateUserPreferencePayload>;
  /** Updates a single `UserPreference` using a unique key and a patch. */
  updateUserPreference?: Maybe<UpdateUserPreferencePayload>;
  /** Updates a single `UserPreference` using a unique key and a patch. */
  updateUserPreferenceByUserId?: Maybe<UpdateUserPreferencePayload>;
  /** Updates a single `UserSession` using its globally unique id and a patch. */
  updateUserSessionByNodeId?: Maybe<UpdateUserSessionPayload>;
  /** Updates a single `UserSession` using a unique key and a patch. */
  updateUserSession?: Maybe<UpdateUserSessionPayload>;
  /** Updates a single `User` using its globally unique id and a patch. */
  updateUserByNodeId?: Maybe<UpdateUserPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUser?: Maybe<UpdateUserPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUserByUsername?: Maybe<UpdateUserPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUserByEmail?: Maybe<UpdateUserPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUserByUuid?: Maybe<UpdateUserPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUserByEmailUnsubscribeToken?: Maybe<UpdateUserPayload>;
  /** Updates a single `GermanWord` using its globally unique id and a patch. */
  updateGermanWordByNodeId?: Maybe<UpdateGermanWordPayload>;
  /** Updates a single `GermanWord` using a unique key and a patch. */
  updateGermanWord?: Maybe<UpdateGermanWordPayload>;
  /** Updates a single `GermanWord` using a unique key and a patch. */
  updateGermanWordByUuid?: Maybe<UpdateGermanWordPayload>;
  /** Updates a single `EnglishWord` using its globally unique id and a patch. */
  updateEnglishWordByNodeId?: Maybe<UpdateEnglishWordPayload>;
  /** Updates a single `EnglishWord` using a unique key and a patch. */
  updateEnglishWord?: Maybe<UpdateEnglishWordPayload>;
  /** Updates a single `EnglishWord` using a unique key and a patch. */
  updateEnglishWordByUuid?: Maybe<UpdateEnglishWordPayload>;
  /** Updates a single `SpanishWord` using its globally unique id and a patch. */
  updateSpanishWordByNodeId?: Maybe<UpdateSpanishWordPayload>;
  /** Updates a single `SpanishWord` using a unique key and a patch. */
  updateSpanishWord?: Maybe<UpdateSpanishWordPayload>;
  /** Updates a single `SpanishWord` using a unique key and a patch. */
  updateSpanishWordByUuid?: Maybe<UpdateSpanishWordPayload>;
  /** Updates a single `FrenchWord` using its globally unique id and a patch. */
  updateFrenchWordByNodeId?: Maybe<UpdateFrenchWordPayload>;
  /** Updates a single `FrenchWord` using a unique key and a patch. */
  updateFrenchWord?: Maybe<UpdateFrenchWordPayload>;
  /** Updates a single `FrenchWord` using a unique key and a patch. */
  updateFrenchWordByUuid?: Maybe<UpdateFrenchWordPayload>;
  /** Updates a single `ItalianWord` using its globally unique id and a patch. */
  updateItalianWordByNodeId?: Maybe<UpdateItalianWordPayload>;
  /** Updates a single `ItalianWord` using a unique key and a patch. */
  updateItalianWord?: Maybe<UpdateItalianWordPayload>;
  /** Updates a single `ItalianWord` using a unique key and a patch. */
  updateItalianWordByUuid?: Maybe<UpdateItalianWordPayload>;
  /** Updates a single `PortugueseWord` using its globally unique id and a patch. */
  updatePortugueseWordByNodeId?: Maybe<UpdatePortugueseWordPayload>;
  /** Updates a single `PortugueseWord` using a unique key and a patch. */
  updatePortugueseWord?: Maybe<UpdatePortugueseWordPayload>;
  /** Updates a single `PortugueseWord` using a unique key and a patch. */
  updatePortugueseWordByUuid?: Maybe<UpdatePortugueseWordPayload>;
  /** Updates a single `RussianWord` using its globally unique id and a patch. */
  updateRussianWordByNodeId?: Maybe<UpdateRussianWordPayload>;
  /** Updates a single `RussianWord` using a unique key and a patch. */
  updateRussianWord?: Maybe<UpdateRussianWordPayload>;
  /** Updates a single `RussianWord` using a unique key and a patch. */
  updateRussianWordByUuid?: Maybe<UpdateRussianWordPayload>;
  /** Updates a single `GermanWouldYouRatherQuestion` using its globally unique id and a patch. */
  updateGermanWouldYouRatherQuestionByNodeId?: Maybe<UpdateGermanWouldYouRatherQuestionPayload>;
  /** Updates a single `GermanWouldYouRatherQuestion` using a unique key and a patch. */
  updateGermanWouldYouRatherQuestion?: Maybe<UpdateGermanWouldYouRatherQuestionPayload>;
  /** Updates a single `GermanWouldYouRatherQuestion` using a unique key and a patch. */
  updateGermanWouldYouRatherQuestionByUuid?: Maybe<UpdateGermanWouldYouRatherQuestionPayload>;
  /** Updates a single `EnglishWouldYouRatherQuestion` using its globally unique id and a patch. */
  updateEnglishWouldYouRatherQuestionByNodeId?: Maybe<UpdateEnglishWouldYouRatherQuestionPayload>;
  /** Updates a single `EnglishWouldYouRatherQuestion` using a unique key and a patch. */
  updateEnglishWouldYouRatherQuestion?: Maybe<UpdateEnglishWouldYouRatherQuestionPayload>;
  /** Updates a single `EnglishWouldYouRatherQuestion` using a unique key and a patch. */
  updateEnglishWouldYouRatherQuestionByUuid?: Maybe<UpdateEnglishWouldYouRatherQuestionPayload>;
  /** Updates a single `SpanishWouldYouRatherQuestion` using its globally unique id and a patch. */
  updateSpanishWouldYouRatherQuestionByNodeId?: Maybe<UpdateSpanishWouldYouRatherQuestionPayload>;
  /** Updates a single `SpanishWouldYouRatherQuestion` using a unique key and a patch. */
  updateSpanishWouldYouRatherQuestion?: Maybe<UpdateSpanishWouldYouRatherQuestionPayload>;
  /** Updates a single `SpanishWouldYouRatherQuestion` using a unique key and a patch. */
  updateSpanishWouldYouRatherQuestionByUuid?: Maybe<UpdateSpanishWouldYouRatherQuestionPayload>;
  /** Updates a single `FrenchWouldYouRatherQuestion` using its globally unique id and a patch. */
  updateFrenchWouldYouRatherQuestionByNodeId?: Maybe<UpdateFrenchWouldYouRatherQuestionPayload>;
  /** Updates a single `FrenchWouldYouRatherQuestion` using a unique key and a patch. */
  updateFrenchWouldYouRatherQuestion?: Maybe<UpdateFrenchWouldYouRatherQuestionPayload>;
  /** Updates a single `FrenchWouldYouRatherQuestion` using a unique key and a patch. */
  updateFrenchWouldYouRatherQuestionByUuid?: Maybe<UpdateFrenchWouldYouRatherQuestionPayload>;
  /** Updates a single `ItalianWouldYouRatherQuestion` using its globally unique id and a patch. */
  updateItalianWouldYouRatherQuestionByNodeId?: Maybe<UpdateItalianWouldYouRatherQuestionPayload>;
  /** Updates a single `ItalianWouldYouRatherQuestion` using a unique key and a patch. */
  updateItalianWouldYouRatherQuestion?: Maybe<UpdateItalianWouldYouRatherQuestionPayload>;
  /** Updates a single `ItalianWouldYouRatherQuestion` using a unique key and a patch. */
  updateItalianWouldYouRatherQuestionByUuid?: Maybe<UpdateItalianWouldYouRatherQuestionPayload>;
  /** Updates a single `JapaneseWouldYouRatherQuestion` using its globally unique id and a patch. */
  updateJapaneseWouldYouRatherQuestionByNodeId?: Maybe<UpdateJapaneseWouldYouRatherQuestionPayload>;
  /** Updates a single `JapaneseWouldYouRatherQuestion` using a unique key and a patch. */
  updateJapaneseWouldYouRatherQuestion?: Maybe<UpdateJapaneseWouldYouRatherQuestionPayload>;
  /** Updates a single `JapaneseWouldYouRatherQuestion` using a unique key and a patch. */
  updateJapaneseWouldYouRatherQuestionByUuid?: Maybe<UpdateJapaneseWouldYouRatherQuestionPayload>;
  /** Updates a single `KoreanWouldYouRatherQuestion` using its globally unique id and a patch. */
  updateKoreanWouldYouRatherQuestionByNodeId?: Maybe<UpdateKoreanWouldYouRatherQuestionPayload>;
  /** Updates a single `KoreanWouldYouRatherQuestion` using a unique key and a patch. */
  updateKoreanWouldYouRatherQuestion?: Maybe<UpdateKoreanWouldYouRatherQuestionPayload>;
  /** Updates a single `KoreanWouldYouRatherQuestion` using a unique key and a patch. */
  updateKoreanWouldYouRatherQuestionByUuid?: Maybe<UpdateKoreanWouldYouRatherQuestionPayload>;
  /** Updates a single `PortugueseWouldYouRatherQuestion` using its globally unique id and a patch. */
  updatePortugueseWouldYouRatherQuestionByNodeId?: Maybe<UpdatePortugueseWouldYouRatherQuestionPayload>;
  /** Updates a single `PortugueseWouldYouRatherQuestion` using a unique key and a patch. */
  updatePortugueseWouldYouRatherQuestion?: Maybe<UpdatePortugueseWouldYouRatherQuestionPayload>;
  /** Updates a single `PortugueseWouldYouRatherQuestion` using a unique key and a patch. */
  updatePortugueseWouldYouRatherQuestionByUuid?: Maybe<UpdatePortugueseWouldYouRatherQuestionPayload>;
  /** Updates a single `RussianWouldYouRatherQuestion` using its globally unique id and a patch. */
  updateRussianWouldYouRatherQuestionByNodeId?: Maybe<UpdateRussianWouldYouRatherQuestionPayload>;
  /** Updates a single `RussianWouldYouRatherQuestion` using a unique key and a patch. */
  updateRussianWouldYouRatherQuestion?: Maybe<UpdateRussianWouldYouRatherQuestionPayload>;
  /** Updates a single `RussianWouldYouRatherQuestion` using a unique key and a patch. */
  updateRussianWouldYouRatherQuestionByUuid?: Maybe<UpdateRussianWouldYouRatherQuestionPayload>;
  /** Updates a single `ChineseWouldYouRatherQuestion` using its globally unique id and a patch. */
  updateChineseWouldYouRatherQuestionByNodeId?: Maybe<UpdateChineseWouldYouRatherQuestionPayload>;
  /** Updates a single `ChineseWouldYouRatherQuestion` using a unique key and a patch. */
  updateChineseWouldYouRatherQuestion?: Maybe<UpdateChineseWouldYouRatherQuestionPayload>;
  /** Updates a single `ChineseWouldYouRatherQuestion` using a unique key and a patch. */
  updateChineseWouldYouRatherQuestionByUuid?: Maybe<UpdateChineseWouldYouRatherQuestionPayload>;
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
  /** Deletes a single `ChineseGuessCharacterQuestion` using its globally unique id. */
  deleteChineseGuessCharacterQuestionByNodeId?: Maybe<DeleteChineseGuessCharacterQuestionPayload>;
  /** Deletes a single `ChineseGuessCharacterQuestion` using a unique key. */
  deleteChineseGuessCharacterQuestion?: Maybe<DeleteChineseGuessCharacterQuestionPayload>;
  /** Deletes a single `ChineseGuessCharacterQuestion` using a unique key. */
  deleteChineseGuessCharacterQuestionByUuid?: Maybe<DeleteChineseGuessCharacterQuestionPayload>;
  /** Deletes a single `InviteToken` using its globally unique id. */
  deleteInviteTokenByNodeId?: Maybe<DeleteInviteTokenPayload>;
  /** Deletes a single `InviteToken` using a unique key. */
  deleteInviteToken?: Maybe<DeleteInviteTokenPayload>;
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
  /** Deletes a single `MessagePreview` using its globally unique id. */
  deleteMessagePreviewByNodeId?: Maybe<DeleteMessagePreviewPayload>;
  /** Deletes a single `MessagePreview` using a unique key. */
  deleteMessagePreview?: Maybe<DeleteMessagePreviewPayload>;
  /** Deletes a single `MessagePreview` using a unique key. */
  deleteMessagePreviewByUuid?: Maybe<DeleteMessagePreviewPayload>;
  /** Deletes a single `Message` using its globally unique id. */
  deleteMessageByNodeId?: Maybe<DeleteMessagePayload>;
  /** Deletes a single `Message` using a unique key. */
  deleteMessage?: Maybe<DeleteMessagePayload>;
  /** Deletes a single `Message` using a unique key. */
  deleteMessageByUuid?: Maybe<DeleteMessagePayload>;
  /** Deletes a single `NotificationChannel` using its globally unique id. */
  deleteNotificationChannelByNodeId?: Maybe<DeleteNotificationChannelPayload>;
  /** Deletes a single `NotificationChannel` using a unique key. */
  deleteNotificationChannel?: Maybe<DeleteNotificationChannelPayload>;
  /** Deletes a single `NotificationChannel` using a unique key. */
  deleteNotificationChannelByUuid?: Maybe<DeleteNotificationChannelPayload>;
  /** Deletes a single `NotificationChannel` using a unique key. */
  deleteNotificationChannelByName?: Maybe<DeleteNotificationChannelPayload>;
  /** Deletes a single `Notification` using its globally unique id. */
  deleteNotificationByNodeId?: Maybe<DeleteNotificationPayload>;
  /** Deletes a single `Notification` using a unique key. */
  deleteNotification?: Maybe<DeleteNotificationPayload>;
  /** Deletes a single `Notification` using a unique key. */
  deleteNotificationByUuid?: Maybe<DeleteNotificationPayload>;
  /** Deletes a single `PostLike` using its globally unique id. */
  deletePostLikeByNodeId?: Maybe<DeletePostLikePayload>;
  /** Deletes a single `PostLike` using a unique key. */
  deletePostLike?: Maybe<DeletePostLikePayload>;
  /** Deletes a single `PostRecording` using its globally unique id. */
  deletePostRecordingByNodeId?: Maybe<DeletePostRecordingPayload>;
  /** Deletes a single `PostRecording` using a unique key. */
  deletePostRecording?: Maybe<DeletePostRecordingPayload>;
  /** Deletes a single `PostRecording` using a unique key. */
  deletePostRecordingByUuid?: Maybe<DeletePostRecordingPayload>;
  /** Deletes a single `Post` using its globally unique id. */
  deletePostByNodeId?: Maybe<DeletePostPayload>;
  /** Deletes a single `Post` using a unique key. */
  deletePost?: Maybe<DeletePostPayload>;
  /** Deletes a single `Post` using a unique key. */
  deletePostByUuid?: Maybe<DeletePostPayload>;
  /** Deletes a single `Prompt` using its globally unique id. */
  deletePromptByNodeId?: Maybe<DeletePromptPayload>;
  /** Deletes a single `Prompt` using a unique key. */
  deletePrompt?: Maybe<DeletePromptPayload>;
  /** Deletes a single `Prompt` using a unique key. */
  deletePromptByUuid?: Maybe<DeletePromptPayload>;
  /** Deletes a single `GermanRandomQuestion` using its globally unique id. */
  deleteGermanRandomQuestionByNodeId?: Maybe<DeleteGermanRandomQuestionPayload>;
  /** Deletes a single `GermanRandomQuestion` using a unique key. */
  deleteGermanRandomQuestion?: Maybe<DeleteGermanRandomQuestionPayload>;
  /** Deletes a single `GermanRandomQuestion` using a unique key. */
  deleteGermanRandomQuestionByUuid?: Maybe<DeleteGermanRandomQuestionPayload>;
  /** Deletes a single `EnglishRandomQuestion` using its globally unique id. */
  deleteEnglishRandomQuestionByNodeId?: Maybe<DeleteEnglishRandomQuestionPayload>;
  /** Deletes a single `EnglishRandomQuestion` using a unique key. */
  deleteEnglishRandomQuestion?: Maybe<DeleteEnglishRandomQuestionPayload>;
  /** Deletes a single `EnglishRandomQuestion` using a unique key. */
  deleteEnglishRandomQuestionByUuid?: Maybe<DeleteEnglishRandomQuestionPayload>;
  /** Deletes a single `SpanishRandomQuestion` using its globally unique id. */
  deleteSpanishRandomQuestionByNodeId?: Maybe<DeleteSpanishRandomQuestionPayload>;
  /** Deletes a single `SpanishRandomQuestion` using a unique key. */
  deleteSpanishRandomQuestion?: Maybe<DeleteSpanishRandomQuestionPayload>;
  /** Deletes a single `SpanishRandomQuestion` using a unique key. */
  deleteSpanishRandomQuestionByUuid?: Maybe<DeleteSpanishRandomQuestionPayload>;
  /** Deletes a single `FrenchRandomQuestion` using its globally unique id. */
  deleteFrenchRandomQuestionByNodeId?: Maybe<DeleteFrenchRandomQuestionPayload>;
  /** Deletes a single `FrenchRandomQuestion` using a unique key. */
  deleteFrenchRandomQuestion?: Maybe<DeleteFrenchRandomQuestionPayload>;
  /** Deletes a single `FrenchRandomQuestion` using a unique key. */
  deleteFrenchRandomQuestionByUuid?: Maybe<DeleteFrenchRandomQuestionPayload>;
  /** Deletes a single `ItalianRandomQuestion` using its globally unique id. */
  deleteItalianRandomQuestionByNodeId?: Maybe<DeleteItalianRandomQuestionPayload>;
  /** Deletes a single `ItalianRandomQuestion` using a unique key. */
  deleteItalianRandomQuestion?: Maybe<DeleteItalianRandomQuestionPayload>;
  /** Deletes a single `ItalianRandomQuestion` using a unique key. */
  deleteItalianRandomQuestionByUuid?: Maybe<DeleteItalianRandomQuestionPayload>;
  /** Deletes a single `JapaneseRandomQuestion` using its globally unique id. */
  deleteJapaneseRandomQuestionByNodeId?: Maybe<DeleteJapaneseRandomQuestionPayload>;
  /** Deletes a single `JapaneseRandomQuestion` using a unique key. */
  deleteJapaneseRandomQuestion?: Maybe<DeleteJapaneseRandomQuestionPayload>;
  /** Deletes a single `JapaneseRandomQuestion` using a unique key. */
  deleteJapaneseRandomQuestionByUuid?: Maybe<DeleteJapaneseRandomQuestionPayload>;
  /** Deletes a single `KoreanRandomQuestion` using its globally unique id. */
  deleteKoreanRandomQuestionByNodeId?: Maybe<DeleteKoreanRandomQuestionPayload>;
  /** Deletes a single `KoreanRandomQuestion` using a unique key. */
  deleteKoreanRandomQuestion?: Maybe<DeleteKoreanRandomQuestionPayload>;
  /** Deletes a single `KoreanRandomQuestion` using a unique key. */
  deleteKoreanRandomQuestionByUuid?: Maybe<DeleteKoreanRandomQuestionPayload>;
  /** Deletes a single `PortugueseRandomQuestion` using its globally unique id. */
  deletePortugueseRandomQuestionByNodeId?: Maybe<DeletePortugueseRandomQuestionPayload>;
  /** Deletes a single `PortugueseRandomQuestion` using a unique key. */
  deletePortugueseRandomQuestion?: Maybe<DeletePortugueseRandomQuestionPayload>;
  /** Deletes a single `PortugueseRandomQuestion` using a unique key. */
  deletePortugueseRandomQuestionByUuid?: Maybe<DeletePortugueseRandomQuestionPayload>;
  /** Deletes a single `RussianRandomQuestion` using its globally unique id. */
  deleteRussianRandomQuestionByNodeId?: Maybe<DeleteRussianRandomQuestionPayload>;
  /** Deletes a single `RussianRandomQuestion` using a unique key. */
  deleteRussianRandomQuestion?: Maybe<DeleteRussianRandomQuestionPayload>;
  /** Deletes a single `RussianRandomQuestion` using a unique key. */
  deleteRussianRandomQuestionByUuid?: Maybe<DeleteRussianRandomQuestionPayload>;
  /** Deletes a single `ChineseRandomQuestion` using its globally unique id. */
  deleteChineseRandomQuestionByNodeId?: Maybe<DeleteChineseRandomQuestionPayload>;
  /** Deletes a single `ChineseRandomQuestion` using a unique key. */
  deleteChineseRandomQuestion?: Maybe<DeleteChineseRandomQuestionPayload>;
  /** Deletes a single `ChineseRandomQuestion` using a unique key. */
  deleteChineseRandomQuestionByUuid?: Maybe<DeleteChineseRandomQuestionPayload>;
  /** Deletes a single `UserDevice` using its globally unique id. */
  deleteUserDeviceByNodeId?: Maybe<DeleteUserDevicePayload>;
  /** Deletes a single `UserDevice` using a unique key. */
  deleteUserDevice?: Maybe<DeleteUserDevicePayload>;
  /** Deletes a single `UserDevice` using a unique key. */
  deleteUserDeviceByUuid?: Maybe<DeleteUserDevicePayload>;
  /** Deletes a single `UserDevice` using a unique key. */
  deleteUserDeviceByFcmToken?: Maybe<DeleteUserDevicePayload>;
  /** Deletes a single `UserFollower` using its globally unique id. */
  deleteUserFollowerByNodeId?: Maybe<DeleteUserFollowerPayload>;
  /** Deletes a single `UserFollower` using a unique key. */
  deleteUserFollower?: Maybe<DeleteUserFollowerPayload>;
  /** Deletes a single `UserLanguage` using its globally unique id. */
  deleteUserLanguageByNodeId?: Maybe<DeleteUserLanguagePayload>;
  /** Deletes a single `UserLanguage` using a unique key. */
  deleteUserLanguage?: Maybe<DeleteUserLanguagePayload>;
  /** Deletes a single `UserPreference` using its globally unique id. */
  deleteUserPreferenceByNodeId?: Maybe<DeleteUserPreferencePayload>;
  /** Deletes a single `UserPreference` using a unique key. */
  deleteUserPreference?: Maybe<DeleteUserPreferencePayload>;
  /** Deletes a single `UserPreference` using a unique key. */
  deleteUserPreferenceByUserId?: Maybe<DeleteUserPreferencePayload>;
  /** Deletes a single `UserSession` using its globally unique id. */
  deleteUserSessionByNodeId?: Maybe<DeleteUserSessionPayload>;
  /** Deletes a single `UserSession` using a unique key. */
  deleteUserSession?: Maybe<DeleteUserSessionPayload>;
  /** Deletes a single `User` using its globally unique id. */
  deleteUserByNodeId?: Maybe<DeleteUserPayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUser?: Maybe<DeleteUserPayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUserByUsername?: Maybe<DeleteUserPayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUserByEmail?: Maybe<DeleteUserPayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUserByUuid?: Maybe<DeleteUserPayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUserByEmailUnsubscribeToken?: Maybe<DeleteUserPayload>;
  /** Deletes a single `GermanWord` using its globally unique id. */
  deleteGermanWordByNodeId?: Maybe<DeleteGermanWordPayload>;
  /** Deletes a single `GermanWord` using a unique key. */
  deleteGermanWord?: Maybe<DeleteGermanWordPayload>;
  /** Deletes a single `GermanWord` using a unique key. */
  deleteGermanWordByUuid?: Maybe<DeleteGermanWordPayload>;
  /** Deletes a single `EnglishWord` using its globally unique id. */
  deleteEnglishWordByNodeId?: Maybe<DeleteEnglishWordPayload>;
  /** Deletes a single `EnglishWord` using a unique key. */
  deleteEnglishWord?: Maybe<DeleteEnglishWordPayload>;
  /** Deletes a single `EnglishWord` using a unique key. */
  deleteEnglishWordByUuid?: Maybe<DeleteEnglishWordPayload>;
  /** Deletes a single `SpanishWord` using its globally unique id. */
  deleteSpanishWordByNodeId?: Maybe<DeleteSpanishWordPayload>;
  /** Deletes a single `SpanishWord` using a unique key. */
  deleteSpanishWord?: Maybe<DeleteSpanishWordPayload>;
  /** Deletes a single `SpanishWord` using a unique key. */
  deleteSpanishWordByUuid?: Maybe<DeleteSpanishWordPayload>;
  /** Deletes a single `FrenchWord` using its globally unique id. */
  deleteFrenchWordByNodeId?: Maybe<DeleteFrenchWordPayload>;
  /** Deletes a single `FrenchWord` using a unique key. */
  deleteFrenchWord?: Maybe<DeleteFrenchWordPayload>;
  /** Deletes a single `FrenchWord` using a unique key. */
  deleteFrenchWordByUuid?: Maybe<DeleteFrenchWordPayload>;
  /** Deletes a single `ItalianWord` using its globally unique id. */
  deleteItalianWordByNodeId?: Maybe<DeleteItalianWordPayload>;
  /** Deletes a single `ItalianWord` using a unique key. */
  deleteItalianWord?: Maybe<DeleteItalianWordPayload>;
  /** Deletes a single `ItalianWord` using a unique key. */
  deleteItalianWordByUuid?: Maybe<DeleteItalianWordPayload>;
  /** Deletes a single `PortugueseWord` using its globally unique id. */
  deletePortugueseWordByNodeId?: Maybe<DeletePortugueseWordPayload>;
  /** Deletes a single `PortugueseWord` using a unique key. */
  deletePortugueseWord?: Maybe<DeletePortugueseWordPayload>;
  /** Deletes a single `PortugueseWord` using a unique key. */
  deletePortugueseWordByUuid?: Maybe<DeletePortugueseWordPayload>;
  /** Deletes a single `RussianWord` using its globally unique id. */
  deleteRussianWordByNodeId?: Maybe<DeleteRussianWordPayload>;
  /** Deletes a single `RussianWord` using a unique key. */
  deleteRussianWord?: Maybe<DeleteRussianWordPayload>;
  /** Deletes a single `RussianWord` using a unique key. */
  deleteRussianWordByUuid?: Maybe<DeleteRussianWordPayload>;
  /** Deletes a single `GermanWouldYouRatherQuestion` using its globally unique id. */
  deleteGermanWouldYouRatherQuestionByNodeId?: Maybe<DeleteGermanWouldYouRatherQuestionPayload>;
  /** Deletes a single `GermanWouldYouRatherQuestion` using a unique key. */
  deleteGermanWouldYouRatherQuestion?: Maybe<DeleteGermanWouldYouRatherQuestionPayload>;
  /** Deletes a single `GermanWouldYouRatherQuestion` using a unique key. */
  deleteGermanWouldYouRatherQuestionByUuid?: Maybe<DeleteGermanWouldYouRatherQuestionPayload>;
  /** Deletes a single `EnglishWouldYouRatherQuestion` using its globally unique id. */
  deleteEnglishWouldYouRatherQuestionByNodeId?: Maybe<DeleteEnglishWouldYouRatherQuestionPayload>;
  /** Deletes a single `EnglishWouldYouRatherQuestion` using a unique key. */
  deleteEnglishWouldYouRatherQuestion?: Maybe<DeleteEnglishWouldYouRatherQuestionPayload>;
  /** Deletes a single `EnglishWouldYouRatherQuestion` using a unique key. */
  deleteEnglishWouldYouRatherQuestionByUuid?: Maybe<DeleteEnglishWouldYouRatherQuestionPayload>;
  /** Deletes a single `SpanishWouldYouRatherQuestion` using its globally unique id. */
  deleteSpanishWouldYouRatherQuestionByNodeId?: Maybe<DeleteSpanishWouldYouRatherQuestionPayload>;
  /** Deletes a single `SpanishWouldYouRatherQuestion` using a unique key. */
  deleteSpanishWouldYouRatherQuestion?: Maybe<DeleteSpanishWouldYouRatherQuestionPayload>;
  /** Deletes a single `SpanishWouldYouRatherQuestion` using a unique key. */
  deleteSpanishWouldYouRatherQuestionByUuid?: Maybe<DeleteSpanishWouldYouRatherQuestionPayload>;
  /** Deletes a single `FrenchWouldYouRatherQuestion` using its globally unique id. */
  deleteFrenchWouldYouRatherQuestionByNodeId?: Maybe<DeleteFrenchWouldYouRatherQuestionPayload>;
  /** Deletes a single `FrenchWouldYouRatherQuestion` using a unique key. */
  deleteFrenchWouldYouRatherQuestion?: Maybe<DeleteFrenchWouldYouRatherQuestionPayload>;
  /** Deletes a single `FrenchWouldYouRatherQuestion` using a unique key. */
  deleteFrenchWouldYouRatherQuestionByUuid?: Maybe<DeleteFrenchWouldYouRatherQuestionPayload>;
  /** Deletes a single `ItalianWouldYouRatherQuestion` using its globally unique id. */
  deleteItalianWouldYouRatherQuestionByNodeId?: Maybe<DeleteItalianWouldYouRatherQuestionPayload>;
  /** Deletes a single `ItalianWouldYouRatherQuestion` using a unique key. */
  deleteItalianWouldYouRatherQuestion?: Maybe<DeleteItalianWouldYouRatherQuestionPayload>;
  /** Deletes a single `ItalianWouldYouRatherQuestion` using a unique key. */
  deleteItalianWouldYouRatherQuestionByUuid?: Maybe<DeleteItalianWouldYouRatherQuestionPayload>;
  /** Deletes a single `JapaneseWouldYouRatherQuestion` using its globally unique id. */
  deleteJapaneseWouldYouRatherQuestionByNodeId?: Maybe<DeleteJapaneseWouldYouRatherQuestionPayload>;
  /** Deletes a single `JapaneseWouldYouRatherQuestion` using a unique key. */
  deleteJapaneseWouldYouRatherQuestion?: Maybe<DeleteJapaneseWouldYouRatherQuestionPayload>;
  /** Deletes a single `JapaneseWouldYouRatherQuestion` using a unique key. */
  deleteJapaneseWouldYouRatherQuestionByUuid?: Maybe<DeleteJapaneseWouldYouRatherQuestionPayload>;
  /** Deletes a single `KoreanWouldYouRatherQuestion` using its globally unique id. */
  deleteKoreanWouldYouRatherQuestionByNodeId?: Maybe<DeleteKoreanWouldYouRatherQuestionPayload>;
  /** Deletes a single `KoreanWouldYouRatherQuestion` using a unique key. */
  deleteKoreanWouldYouRatherQuestion?: Maybe<DeleteKoreanWouldYouRatherQuestionPayload>;
  /** Deletes a single `KoreanWouldYouRatherQuestion` using a unique key. */
  deleteKoreanWouldYouRatherQuestionByUuid?: Maybe<DeleteKoreanWouldYouRatherQuestionPayload>;
  /** Deletes a single `PortugueseWouldYouRatherQuestion` using its globally unique id. */
  deletePortugueseWouldYouRatherQuestionByNodeId?: Maybe<DeletePortugueseWouldYouRatherQuestionPayload>;
  /** Deletes a single `PortugueseWouldYouRatherQuestion` using a unique key. */
  deletePortugueseWouldYouRatherQuestion?: Maybe<DeletePortugueseWouldYouRatherQuestionPayload>;
  /** Deletes a single `PortugueseWouldYouRatherQuestion` using a unique key. */
  deletePortugueseWouldYouRatherQuestionByUuid?: Maybe<DeletePortugueseWouldYouRatherQuestionPayload>;
  /** Deletes a single `RussianWouldYouRatherQuestion` using its globally unique id. */
  deleteRussianWouldYouRatherQuestionByNodeId?: Maybe<DeleteRussianWouldYouRatherQuestionPayload>;
  /** Deletes a single `RussianWouldYouRatherQuestion` using a unique key. */
  deleteRussianWouldYouRatherQuestion?: Maybe<DeleteRussianWouldYouRatherQuestionPayload>;
  /** Deletes a single `RussianWouldYouRatherQuestion` using a unique key. */
  deleteRussianWouldYouRatherQuestionByUuid?: Maybe<DeleteRussianWouldYouRatherQuestionPayload>;
  /** Deletes a single `ChineseWouldYouRatherQuestion` using its globally unique id. */
  deleteChineseWouldYouRatherQuestionByNodeId?: Maybe<DeleteChineseWouldYouRatherQuestionPayload>;
  /** Deletes a single `ChineseWouldYouRatherQuestion` using a unique key. */
  deleteChineseWouldYouRatherQuestion?: Maybe<DeleteChineseWouldYouRatherQuestionPayload>;
  /** Deletes a single `ChineseWouldYouRatherQuestion` using a unique key. */
  deleteChineseWouldYouRatherQuestionByUuid?: Maybe<DeleteChineseWouldYouRatherQuestionPayload>;
  joinGlobalGroup?: Maybe<JoinGlobalGroupPayload>;
  registerUserActivity?: Maybe<RegisterUserActivityPayload>;
  /** Upserts a single `GroupUser`. */
  upsertGroupUser?: Maybe<UpsertGroupUserPayload>;
  /** Upserts a single `Group`. */
  upsertGroup?: Maybe<UpsertGroupPayload>;
  /** Upserts a single `ChineseGuessCharacterQuestion`. */
  upsertChineseGuessCharacterQuestion?: Maybe<UpsertChineseGuessCharacterQuestionPayload>;
  /** Upserts a single `InviteToken`. */
  upsertInviteToken?: Maybe<UpsertInviteTokenPayload>;
  /** Upserts a single `LanguageSkillLevel`. */
  upsertLanguageSkillLevel?: Maybe<UpsertLanguageSkillLevelPayload>;
  /** Upserts a single `Language`. */
  upsertLanguage?: Maybe<UpsertLanguagePayload>;
  /** Upserts a single `MessagePreview`. */
  upsertMessagePreview?: Maybe<UpsertMessagePreviewPayload>;
  /** Upserts a single `Message`. */
  upsertMessage?: Maybe<UpsertMessagePayload>;
  /** Upserts a single `NotificationChannel`. */
  upsertNotificationChannel?: Maybe<UpsertNotificationChannelPayload>;
  /** Upserts a single `Notification`. */
  upsertNotification?: Maybe<UpsertNotificationPayload>;
  /** Upserts a single `PostLike`. */
  upsertPostLike?: Maybe<UpsertPostLikePayload>;
  /** Upserts a single `PostRecording`. */
  upsertPostRecording?: Maybe<UpsertPostRecordingPayload>;
  /** Upserts a single `Post`. */
  upsertPost?: Maybe<UpsertPostPayload>;
  /** Upserts a single `Prompt`. */
  upsertPrompt?: Maybe<UpsertPromptPayload>;
  /** Upserts a single `GermanRandomQuestion`. */
  upsertGermanRandomQuestion?: Maybe<UpsertGermanRandomQuestionPayload>;
  /** Upserts a single `EnglishRandomQuestion`. */
  upsertEnglishRandomQuestion?: Maybe<UpsertEnglishRandomQuestionPayload>;
  /** Upserts a single `SpanishRandomQuestion`. */
  upsertSpanishRandomQuestion?: Maybe<UpsertSpanishRandomQuestionPayload>;
  /** Upserts a single `FrenchRandomQuestion`. */
  upsertFrenchRandomQuestion?: Maybe<UpsertFrenchRandomQuestionPayload>;
  /** Upserts a single `ItalianRandomQuestion`. */
  upsertItalianRandomQuestion?: Maybe<UpsertItalianRandomQuestionPayload>;
  /** Upserts a single `JapaneseRandomQuestion`. */
  upsertJapaneseRandomQuestion?: Maybe<UpsertJapaneseRandomQuestionPayload>;
  /** Upserts a single `KoreanRandomQuestion`. */
  upsertKoreanRandomQuestion?: Maybe<UpsertKoreanRandomQuestionPayload>;
  /** Upserts a single `PortugueseRandomQuestion`. */
  upsertPortugueseRandomQuestion?: Maybe<UpsertPortugueseRandomQuestionPayload>;
  /** Upserts a single `RussianRandomQuestion`. */
  upsertRussianRandomQuestion?: Maybe<UpsertRussianRandomQuestionPayload>;
  /** Upserts a single `ChineseRandomQuestion`. */
  upsertChineseRandomQuestion?: Maybe<UpsertChineseRandomQuestionPayload>;
  /** Upserts a single `UserDevice`. */
  upsertUserDevice?: Maybe<UpsertUserDevicePayload>;
  /** Upserts a single `UserFollower`. */
  upsertUserFollower?: Maybe<UpsertUserFollowerPayload>;
  /** Upserts a single `UserLanguage`. */
  upsertUserLanguage?: Maybe<UpsertUserLanguagePayload>;
  /** Upserts a single `UserPreference`. */
  upsertUserPreference?: Maybe<UpsertUserPreferencePayload>;
  /** Upserts a single `UserSession`. */
  upsertUserSession?: Maybe<UpsertUserSessionPayload>;
  /** Upserts a single `User`. */
  upsertUser?: Maybe<UpsertUserPayload>;
  /** Upserts a single `GermanWord`. */
  upsertGermanWord?: Maybe<UpsertGermanWordPayload>;
  /** Upserts a single `EnglishWord`. */
  upsertEnglishWord?: Maybe<UpsertEnglishWordPayload>;
  /** Upserts a single `SpanishWord`. */
  upsertSpanishWord?: Maybe<UpsertSpanishWordPayload>;
  /** Upserts a single `FrenchWord`. */
  upsertFrenchWord?: Maybe<UpsertFrenchWordPayload>;
  /** Upserts a single `ItalianWord`. */
  upsertItalianWord?: Maybe<UpsertItalianWordPayload>;
  /** Upserts a single `PortugueseWord`. */
  upsertPortugueseWord?: Maybe<UpsertPortugueseWordPayload>;
  /** Upserts a single `RussianWord`. */
  upsertRussianWord?: Maybe<UpsertRussianWordPayload>;
  /** Upserts a single `GermanWouldYouRatherQuestion`. */
  upsertGermanWouldYouRatherQuestion?: Maybe<UpsertGermanWouldYouRatherQuestionPayload>;
  /** Upserts a single `EnglishWouldYouRatherQuestion`. */
  upsertEnglishWouldYouRatherQuestion?: Maybe<UpsertEnglishWouldYouRatherQuestionPayload>;
  /** Upserts a single `SpanishWouldYouRatherQuestion`. */
  upsertSpanishWouldYouRatherQuestion?: Maybe<UpsertSpanishWouldYouRatherQuestionPayload>;
  /** Upserts a single `FrenchWouldYouRatherQuestion`. */
  upsertFrenchWouldYouRatherQuestion?: Maybe<UpsertFrenchWouldYouRatherQuestionPayload>;
  /** Upserts a single `ItalianWouldYouRatherQuestion`. */
  upsertItalianWouldYouRatherQuestion?: Maybe<UpsertItalianWouldYouRatherQuestionPayload>;
  /** Upserts a single `JapaneseWouldYouRatherQuestion`. */
  upsertJapaneseWouldYouRatherQuestion?: Maybe<UpsertJapaneseWouldYouRatherQuestionPayload>;
  /** Upserts a single `KoreanWouldYouRatherQuestion`. */
  upsertKoreanWouldYouRatherQuestion?: Maybe<UpsertKoreanWouldYouRatherQuestionPayload>;
  /** Upserts a single `PortugueseWouldYouRatherQuestion`. */
  upsertPortugueseWouldYouRatherQuestion?: Maybe<UpsertPortugueseWouldYouRatherQuestionPayload>;
  /** Upserts a single `RussianWouldYouRatherQuestion`. */
  upsertRussianWouldYouRatherQuestion?: Maybe<UpsertRussianWouldYouRatherQuestionPayload>;
  /** Upserts a single `ChineseWouldYouRatherQuestion`. */
  upsertChineseWouldYouRatherQuestion?: Maybe<UpsertChineseWouldYouRatherQuestionPayload>;
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
export type MutationCreateChineseGuessCharacterQuestionArgs = {
  input: CreateChineseGuessCharacterQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateInviteTokenArgs = {
  input: CreateInviteTokenInput;
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
export type MutationCreateMessagePreviewArgs = {
  input: CreateMessagePreviewInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateMessageArgs = {
  input: CreateMessageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateNotificationChannelArgs = {
  input: CreateNotificationChannelInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateNotificationArgs = {
  input: CreateNotificationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePostLikeArgs = {
  input: CreatePostLikeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePostRecordingArgs = {
  input: CreatePostRecordingInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePromptArgs = {
  input: CreatePromptInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateGermanRandomQuestionArgs = {
  input: CreateGermanRandomQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateEnglishRandomQuestionArgs = {
  input: CreateEnglishRandomQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSpanishRandomQuestionArgs = {
  input: CreateSpanishRandomQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateFrenchRandomQuestionArgs = {
  input: CreateFrenchRandomQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateItalianRandomQuestionArgs = {
  input: CreateItalianRandomQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateJapaneseRandomQuestionArgs = {
  input: CreateJapaneseRandomQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateKoreanRandomQuestionArgs = {
  input: CreateKoreanRandomQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePortugueseRandomQuestionArgs = {
  input: CreatePortugueseRandomQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateRussianRandomQuestionArgs = {
  input: CreateRussianRandomQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateChineseRandomQuestionArgs = {
  input: CreateChineseRandomQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserDeviceArgs = {
  input: CreateUserDeviceInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserFollowerArgs = {
  input: CreateUserFollowerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserLanguageArgs = {
  input: CreateUserLanguageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserPreferenceArgs = {
  input: CreateUserPreferenceInput;
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
export type MutationCreateGermanWordArgs = {
  input: CreateGermanWordInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateEnglishWordArgs = {
  input: CreateEnglishWordInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSpanishWordArgs = {
  input: CreateSpanishWordInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateFrenchWordArgs = {
  input: CreateFrenchWordInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateItalianWordArgs = {
  input: CreateItalianWordInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePortugueseWordArgs = {
  input: CreatePortugueseWordInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateRussianWordArgs = {
  input: CreateRussianWordInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateGermanWouldYouRatherQuestionArgs = {
  input: CreateGermanWouldYouRatherQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateEnglishWouldYouRatherQuestionArgs = {
  input: CreateEnglishWouldYouRatherQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSpanishWouldYouRatherQuestionArgs = {
  input: CreateSpanishWouldYouRatherQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateFrenchWouldYouRatherQuestionArgs = {
  input: CreateFrenchWouldYouRatherQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateItalianWouldYouRatherQuestionArgs = {
  input: CreateItalianWouldYouRatherQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateJapaneseWouldYouRatherQuestionArgs = {
  input: CreateJapaneseWouldYouRatherQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateKoreanWouldYouRatherQuestionArgs = {
  input: CreateKoreanWouldYouRatherQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePortugueseWouldYouRatherQuestionArgs = {
  input: CreatePortugueseWouldYouRatherQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateRussianWouldYouRatherQuestionArgs = {
  input: CreateRussianWouldYouRatherQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateChineseWouldYouRatherQuestionArgs = {
  input: CreateChineseWouldYouRatherQuestionInput;
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
export type MutationUpdateChineseGuessCharacterQuestionByNodeIdArgs = {
  input: UpdateChineseGuessCharacterQuestionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateChineseGuessCharacterQuestionArgs = {
  input: UpdateChineseGuessCharacterQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateChineseGuessCharacterQuestionByUuidArgs = {
  input: UpdateChineseGuessCharacterQuestionByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateInviteTokenByNodeIdArgs = {
  input: UpdateInviteTokenByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateInviteTokenArgs = {
  input: UpdateInviteTokenInput;
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
export type MutationUpdateMessagePreviewByNodeIdArgs = {
  input: UpdateMessagePreviewByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMessagePreviewArgs = {
  input: UpdateMessagePreviewInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMessagePreviewByUuidArgs = {
  input: UpdateMessagePreviewByUuidInput;
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
export type MutationUpdateNotificationChannelByNodeIdArgs = {
  input: UpdateNotificationChannelByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateNotificationChannelArgs = {
  input: UpdateNotificationChannelInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateNotificationChannelByUuidArgs = {
  input: UpdateNotificationChannelByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateNotificationChannelByNameArgs = {
  input: UpdateNotificationChannelByNameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateNotificationByNodeIdArgs = {
  input: UpdateNotificationByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateNotificationArgs = {
  input: UpdateNotificationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateNotificationByUuidArgs = {
  input: UpdateNotificationByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePostLikeByNodeIdArgs = {
  input: UpdatePostLikeByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePostLikeArgs = {
  input: UpdatePostLikeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePostRecordingByNodeIdArgs = {
  input: UpdatePostRecordingByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePostRecordingArgs = {
  input: UpdatePostRecordingInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePostRecordingByUuidArgs = {
  input: UpdatePostRecordingByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePostByNodeIdArgs = {
  input: UpdatePostByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePostArgs = {
  input: UpdatePostInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePostByUuidArgs = {
  input: UpdatePostByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePromptByNodeIdArgs = {
  input: UpdatePromptByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePromptArgs = {
  input: UpdatePromptInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePromptByUuidArgs = {
  input: UpdatePromptByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateGermanRandomQuestionByNodeIdArgs = {
  input: UpdateGermanRandomQuestionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateGermanRandomQuestionArgs = {
  input: UpdateGermanRandomQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateGermanRandomQuestionByUuidArgs = {
  input: UpdateGermanRandomQuestionByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEnglishRandomQuestionByNodeIdArgs = {
  input: UpdateEnglishRandomQuestionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEnglishRandomQuestionArgs = {
  input: UpdateEnglishRandomQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEnglishRandomQuestionByUuidArgs = {
  input: UpdateEnglishRandomQuestionByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSpanishRandomQuestionByNodeIdArgs = {
  input: UpdateSpanishRandomQuestionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSpanishRandomQuestionArgs = {
  input: UpdateSpanishRandomQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSpanishRandomQuestionByUuidArgs = {
  input: UpdateSpanishRandomQuestionByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateFrenchRandomQuestionByNodeIdArgs = {
  input: UpdateFrenchRandomQuestionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateFrenchRandomQuestionArgs = {
  input: UpdateFrenchRandomQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateFrenchRandomQuestionByUuidArgs = {
  input: UpdateFrenchRandomQuestionByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateItalianRandomQuestionByNodeIdArgs = {
  input: UpdateItalianRandomQuestionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateItalianRandomQuestionArgs = {
  input: UpdateItalianRandomQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateItalianRandomQuestionByUuidArgs = {
  input: UpdateItalianRandomQuestionByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateJapaneseRandomQuestionByNodeIdArgs = {
  input: UpdateJapaneseRandomQuestionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateJapaneseRandomQuestionArgs = {
  input: UpdateJapaneseRandomQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateJapaneseRandomQuestionByUuidArgs = {
  input: UpdateJapaneseRandomQuestionByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateKoreanRandomQuestionByNodeIdArgs = {
  input: UpdateKoreanRandomQuestionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateKoreanRandomQuestionArgs = {
  input: UpdateKoreanRandomQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateKoreanRandomQuestionByUuidArgs = {
  input: UpdateKoreanRandomQuestionByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePortugueseRandomQuestionByNodeIdArgs = {
  input: UpdatePortugueseRandomQuestionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePortugueseRandomQuestionArgs = {
  input: UpdatePortugueseRandomQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePortugueseRandomQuestionByUuidArgs = {
  input: UpdatePortugueseRandomQuestionByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRussianRandomQuestionByNodeIdArgs = {
  input: UpdateRussianRandomQuestionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRussianRandomQuestionArgs = {
  input: UpdateRussianRandomQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRussianRandomQuestionByUuidArgs = {
  input: UpdateRussianRandomQuestionByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateChineseRandomQuestionByNodeIdArgs = {
  input: UpdateChineseRandomQuestionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateChineseRandomQuestionArgs = {
  input: UpdateChineseRandomQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateChineseRandomQuestionByUuidArgs = {
  input: UpdateChineseRandomQuestionByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserDeviceByNodeIdArgs = {
  input: UpdateUserDeviceByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserDeviceArgs = {
  input: UpdateUserDeviceInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserDeviceByUuidArgs = {
  input: UpdateUserDeviceByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserDeviceByFcmTokenArgs = {
  input: UpdateUserDeviceByFcmTokenInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserFollowerByNodeIdArgs = {
  input: UpdateUserFollowerByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserFollowerArgs = {
  input: UpdateUserFollowerInput;
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
export type MutationUpdateUserPreferenceByNodeIdArgs = {
  input: UpdateUserPreferenceByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserPreferenceArgs = {
  input: UpdateUserPreferenceInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserPreferenceByUserIdArgs = {
  input: UpdateUserPreferenceByUserIdInput;
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
export type MutationUpdateUserByUsernameArgs = {
  input: UpdateUserByUsernameInput;
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
export type MutationUpdateUserByEmailUnsubscribeTokenArgs = {
  input: UpdateUserByEmailUnsubscribeTokenInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateGermanWordByNodeIdArgs = {
  input: UpdateGermanWordByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateGermanWordArgs = {
  input: UpdateGermanWordInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateGermanWordByUuidArgs = {
  input: UpdateGermanWordByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEnglishWordByNodeIdArgs = {
  input: UpdateEnglishWordByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEnglishWordArgs = {
  input: UpdateEnglishWordInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEnglishWordByUuidArgs = {
  input: UpdateEnglishWordByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSpanishWordByNodeIdArgs = {
  input: UpdateSpanishWordByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSpanishWordArgs = {
  input: UpdateSpanishWordInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSpanishWordByUuidArgs = {
  input: UpdateSpanishWordByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateFrenchWordByNodeIdArgs = {
  input: UpdateFrenchWordByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateFrenchWordArgs = {
  input: UpdateFrenchWordInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateFrenchWordByUuidArgs = {
  input: UpdateFrenchWordByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateItalianWordByNodeIdArgs = {
  input: UpdateItalianWordByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateItalianWordArgs = {
  input: UpdateItalianWordInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateItalianWordByUuidArgs = {
  input: UpdateItalianWordByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePortugueseWordByNodeIdArgs = {
  input: UpdatePortugueseWordByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePortugueseWordArgs = {
  input: UpdatePortugueseWordInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePortugueseWordByUuidArgs = {
  input: UpdatePortugueseWordByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRussianWordByNodeIdArgs = {
  input: UpdateRussianWordByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRussianWordArgs = {
  input: UpdateRussianWordInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRussianWordByUuidArgs = {
  input: UpdateRussianWordByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateGermanWouldYouRatherQuestionByNodeIdArgs = {
  input: UpdateGermanWouldYouRatherQuestionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateGermanWouldYouRatherQuestionArgs = {
  input: UpdateGermanWouldYouRatherQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateGermanWouldYouRatherQuestionByUuidArgs = {
  input: UpdateGermanWouldYouRatherQuestionByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEnglishWouldYouRatherQuestionByNodeIdArgs = {
  input: UpdateEnglishWouldYouRatherQuestionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEnglishWouldYouRatherQuestionArgs = {
  input: UpdateEnglishWouldYouRatherQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateEnglishWouldYouRatherQuestionByUuidArgs = {
  input: UpdateEnglishWouldYouRatherQuestionByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSpanishWouldYouRatherQuestionByNodeIdArgs = {
  input: UpdateSpanishWouldYouRatherQuestionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSpanishWouldYouRatherQuestionArgs = {
  input: UpdateSpanishWouldYouRatherQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSpanishWouldYouRatherQuestionByUuidArgs = {
  input: UpdateSpanishWouldYouRatherQuestionByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateFrenchWouldYouRatherQuestionByNodeIdArgs = {
  input: UpdateFrenchWouldYouRatherQuestionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateFrenchWouldYouRatherQuestionArgs = {
  input: UpdateFrenchWouldYouRatherQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateFrenchWouldYouRatherQuestionByUuidArgs = {
  input: UpdateFrenchWouldYouRatherQuestionByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateItalianWouldYouRatherQuestionByNodeIdArgs = {
  input: UpdateItalianWouldYouRatherQuestionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateItalianWouldYouRatherQuestionArgs = {
  input: UpdateItalianWouldYouRatherQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateItalianWouldYouRatherQuestionByUuidArgs = {
  input: UpdateItalianWouldYouRatherQuestionByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateJapaneseWouldYouRatherQuestionByNodeIdArgs = {
  input: UpdateJapaneseWouldYouRatherQuestionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateJapaneseWouldYouRatherQuestionArgs = {
  input: UpdateJapaneseWouldYouRatherQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateJapaneseWouldYouRatherQuestionByUuidArgs = {
  input: UpdateJapaneseWouldYouRatherQuestionByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateKoreanWouldYouRatherQuestionByNodeIdArgs = {
  input: UpdateKoreanWouldYouRatherQuestionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateKoreanWouldYouRatherQuestionArgs = {
  input: UpdateKoreanWouldYouRatherQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateKoreanWouldYouRatherQuestionByUuidArgs = {
  input: UpdateKoreanWouldYouRatherQuestionByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePortugueseWouldYouRatherQuestionByNodeIdArgs = {
  input: UpdatePortugueseWouldYouRatherQuestionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePortugueseWouldYouRatherQuestionArgs = {
  input: UpdatePortugueseWouldYouRatherQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePortugueseWouldYouRatherQuestionByUuidArgs = {
  input: UpdatePortugueseWouldYouRatherQuestionByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRussianWouldYouRatherQuestionByNodeIdArgs = {
  input: UpdateRussianWouldYouRatherQuestionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRussianWouldYouRatherQuestionArgs = {
  input: UpdateRussianWouldYouRatherQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateRussianWouldYouRatherQuestionByUuidArgs = {
  input: UpdateRussianWouldYouRatherQuestionByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateChineseWouldYouRatherQuestionByNodeIdArgs = {
  input: UpdateChineseWouldYouRatherQuestionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateChineseWouldYouRatherQuestionArgs = {
  input: UpdateChineseWouldYouRatherQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateChineseWouldYouRatherQuestionByUuidArgs = {
  input: UpdateChineseWouldYouRatherQuestionByUuidInput;
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
export type MutationDeleteChineseGuessCharacterQuestionByNodeIdArgs = {
  input: DeleteChineseGuessCharacterQuestionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteChineseGuessCharacterQuestionArgs = {
  input: DeleteChineseGuessCharacterQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteChineseGuessCharacterQuestionByUuidArgs = {
  input: DeleteChineseGuessCharacterQuestionByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteInviteTokenByNodeIdArgs = {
  input: DeleteInviteTokenByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteInviteTokenArgs = {
  input: DeleteInviteTokenInput;
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
export type MutationDeleteMessagePreviewByNodeIdArgs = {
  input: DeleteMessagePreviewByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMessagePreviewArgs = {
  input: DeleteMessagePreviewInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMessagePreviewByUuidArgs = {
  input: DeleteMessagePreviewByUuidInput;
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
export type MutationDeleteNotificationChannelByNodeIdArgs = {
  input: DeleteNotificationChannelByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteNotificationChannelArgs = {
  input: DeleteNotificationChannelInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteNotificationChannelByUuidArgs = {
  input: DeleteNotificationChannelByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteNotificationChannelByNameArgs = {
  input: DeleteNotificationChannelByNameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteNotificationByNodeIdArgs = {
  input: DeleteNotificationByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteNotificationArgs = {
  input: DeleteNotificationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteNotificationByUuidArgs = {
  input: DeleteNotificationByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePostLikeByNodeIdArgs = {
  input: DeletePostLikeByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePostLikeArgs = {
  input: DeletePostLikeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePostRecordingByNodeIdArgs = {
  input: DeletePostRecordingByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePostRecordingArgs = {
  input: DeletePostRecordingInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePostRecordingByUuidArgs = {
  input: DeletePostRecordingByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePostByNodeIdArgs = {
  input: DeletePostByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePostArgs = {
  input: DeletePostInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePostByUuidArgs = {
  input: DeletePostByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePromptByNodeIdArgs = {
  input: DeletePromptByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePromptArgs = {
  input: DeletePromptInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePromptByUuidArgs = {
  input: DeletePromptByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteGermanRandomQuestionByNodeIdArgs = {
  input: DeleteGermanRandomQuestionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteGermanRandomQuestionArgs = {
  input: DeleteGermanRandomQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteGermanRandomQuestionByUuidArgs = {
  input: DeleteGermanRandomQuestionByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEnglishRandomQuestionByNodeIdArgs = {
  input: DeleteEnglishRandomQuestionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEnglishRandomQuestionArgs = {
  input: DeleteEnglishRandomQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEnglishRandomQuestionByUuidArgs = {
  input: DeleteEnglishRandomQuestionByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSpanishRandomQuestionByNodeIdArgs = {
  input: DeleteSpanishRandomQuestionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSpanishRandomQuestionArgs = {
  input: DeleteSpanishRandomQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSpanishRandomQuestionByUuidArgs = {
  input: DeleteSpanishRandomQuestionByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteFrenchRandomQuestionByNodeIdArgs = {
  input: DeleteFrenchRandomQuestionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteFrenchRandomQuestionArgs = {
  input: DeleteFrenchRandomQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteFrenchRandomQuestionByUuidArgs = {
  input: DeleteFrenchRandomQuestionByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteItalianRandomQuestionByNodeIdArgs = {
  input: DeleteItalianRandomQuestionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteItalianRandomQuestionArgs = {
  input: DeleteItalianRandomQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteItalianRandomQuestionByUuidArgs = {
  input: DeleteItalianRandomQuestionByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteJapaneseRandomQuestionByNodeIdArgs = {
  input: DeleteJapaneseRandomQuestionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteJapaneseRandomQuestionArgs = {
  input: DeleteJapaneseRandomQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteJapaneseRandomQuestionByUuidArgs = {
  input: DeleteJapaneseRandomQuestionByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteKoreanRandomQuestionByNodeIdArgs = {
  input: DeleteKoreanRandomQuestionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteKoreanRandomQuestionArgs = {
  input: DeleteKoreanRandomQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteKoreanRandomQuestionByUuidArgs = {
  input: DeleteKoreanRandomQuestionByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePortugueseRandomQuestionByNodeIdArgs = {
  input: DeletePortugueseRandomQuestionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePortugueseRandomQuestionArgs = {
  input: DeletePortugueseRandomQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePortugueseRandomQuestionByUuidArgs = {
  input: DeletePortugueseRandomQuestionByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRussianRandomQuestionByNodeIdArgs = {
  input: DeleteRussianRandomQuestionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRussianRandomQuestionArgs = {
  input: DeleteRussianRandomQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRussianRandomQuestionByUuidArgs = {
  input: DeleteRussianRandomQuestionByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteChineseRandomQuestionByNodeIdArgs = {
  input: DeleteChineseRandomQuestionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteChineseRandomQuestionArgs = {
  input: DeleteChineseRandomQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteChineseRandomQuestionByUuidArgs = {
  input: DeleteChineseRandomQuestionByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserDeviceByNodeIdArgs = {
  input: DeleteUserDeviceByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserDeviceArgs = {
  input: DeleteUserDeviceInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserDeviceByUuidArgs = {
  input: DeleteUserDeviceByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserDeviceByFcmTokenArgs = {
  input: DeleteUserDeviceByFcmTokenInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserFollowerByNodeIdArgs = {
  input: DeleteUserFollowerByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserFollowerArgs = {
  input: DeleteUserFollowerInput;
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
export type MutationDeleteUserPreferenceByNodeIdArgs = {
  input: DeleteUserPreferenceByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserPreferenceArgs = {
  input: DeleteUserPreferenceInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserPreferenceByUserIdArgs = {
  input: DeleteUserPreferenceByUserIdInput;
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
export type MutationDeleteUserByUsernameArgs = {
  input: DeleteUserByUsernameInput;
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
export type MutationDeleteUserByEmailUnsubscribeTokenArgs = {
  input: DeleteUserByEmailUnsubscribeTokenInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteGermanWordByNodeIdArgs = {
  input: DeleteGermanWordByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteGermanWordArgs = {
  input: DeleteGermanWordInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteGermanWordByUuidArgs = {
  input: DeleteGermanWordByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEnglishWordByNodeIdArgs = {
  input: DeleteEnglishWordByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEnglishWordArgs = {
  input: DeleteEnglishWordInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEnglishWordByUuidArgs = {
  input: DeleteEnglishWordByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSpanishWordByNodeIdArgs = {
  input: DeleteSpanishWordByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSpanishWordArgs = {
  input: DeleteSpanishWordInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSpanishWordByUuidArgs = {
  input: DeleteSpanishWordByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteFrenchWordByNodeIdArgs = {
  input: DeleteFrenchWordByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteFrenchWordArgs = {
  input: DeleteFrenchWordInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteFrenchWordByUuidArgs = {
  input: DeleteFrenchWordByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteItalianWordByNodeIdArgs = {
  input: DeleteItalianWordByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteItalianWordArgs = {
  input: DeleteItalianWordInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteItalianWordByUuidArgs = {
  input: DeleteItalianWordByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePortugueseWordByNodeIdArgs = {
  input: DeletePortugueseWordByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePortugueseWordArgs = {
  input: DeletePortugueseWordInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePortugueseWordByUuidArgs = {
  input: DeletePortugueseWordByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRussianWordByNodeIdArgs = {
  input: DeleteRussianWordByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRussianWordArgs = {
  input: DeleteRussianWordInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRussianWordByUuidArgs = {
  input: DeleteRussianWordByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteGermanWouldYouRatherQuestionByNodeIdArgs = {
  input: DeleteGermanWouldYouRatherQuestionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteGermanWouldYouRatherQuestionArgs = {
  input: DeleteGermanWouldYouRatherQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteGermanWouldYouRatherQuestionByUuidArgs = {
  input: DeleteGermanWouldYouRatherQuestionByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEnglishWouldYouRatherQuestionByNodeIdArgs = {
  input: DeleteEnglishWouldYouRatherQuestionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEnglishWouldYouRatherQuestionArgs = {
  input: DeleteEnglishWouldYouRatherQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteEnglishWouldYouRatherQuestionByUuidArgs = {
  input: DeleteEnglishWouldYouRatherQuestionByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSpanishWouldYouRatherQuestionByNodeIdArgs = {
  input: DeleteSpanishWouldYouRatherQuestionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSpanishWouldYouRatherQuestionArgs = {
  input: DeleteSpanishWouldYouRatherQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSpanishWouldYouRatherQuestionByUuidArgs = {
  input: DeleteSpanishWouldYouRatherQuestionByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteFrenchWouldYouRatherQuestionByNodeIdArgs = {
  input: DeleteFrenchWouldYouRatherQuestionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteFrenchWouldYouRatherQuestionArgs = {
  input: DeleteFrenchWouldYouRatherQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteFrenchWouldYouRatherQuestionByUuidArgs = {
  input: DeleteFrenchWouldYouRatherQuestionByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteItalianWouldYouRatherQuestionByNodeIdArgs = {
  input: DeleteItalianWouldYouRatherQuestionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteItalianWouldYouRatherQuestionArgs = {
  input: DeleteItalianWouldYouRatherQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteItalianWouldYouRatherQuestionByUuidArgs = {
  input: DeleteItalianWouldYouRatherQuestionByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteJapaneseWouldYouRatherQuestionByNodeIdArgs = {
  input: DeleteJapaneseWouldYouRatherQuestionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteJapaneseWouldYouRatherQuestionArgs = {
  input: DeleteJapaneseWouldYouRatherQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteJapaneseWouldYouRatherQuestionByUuidArgs = {
  input: DeleteJapaneseWouldYouRatherQuestionByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteKoreanWouldYouRatherQuestionByNodeIdArgs = {
  input: DeleteKoreanWouldYouRatherQuestionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteKoreanWouldYouRatherQuestionArgs = {
  input: DeleteKoreanWouldYouRatherQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteKoreanWouldYouRatherQuestionByUuidArgs = {
  input: DeleteKoreanWouldYouRatherQuestionByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePortugueseWouldYouRatherQuestionByNodeIdArgs = {
  input: DeletePortugueseWouldYouRatherQuestionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePortugueseWouldYouRatherQuestionArgs = {
  input: DeletePortugueseWouldYouRatherQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePortugueseWouldYouRatherQuestionByUuidArgs = {
  input: DeletePortugueseWouldYouRatherQuestionByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRussianWouldYouRatherQuestionByNodeIdArgs = {
  input: DeleteRussianWouldYouRatherQuestionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRussianWouldYouRatherQuestionArgs = {
  input: DeleteRussianWouldYouRatherQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteRussianWouldYouRatherQuestionByUuidArgs = {
  input: DeleteRussianWouldYouRatherQuestionByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteChineseWouldYouRatherQuestionByNodeIdArgs = {
  input: DeleteChineseWouldYouRatherQuestionByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteChineseWouldYouRatherQuestionArgs = {
  input: DeleteChineseWouldYouRatherQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteChineseWouldYouRatherQuestionByUuidArgs = {
  input: DeleteChineseWouldYouRatherQuestionByUuidInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationJoinGlobalGroupArgs = {
  input: JoinGlobalGroupInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationRegisterUserActivityArgs = {
  input: RegisterUserActivityInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertGroupUserArgs = {
  where?: Maybe<UpsertGroupUserWhere>;
  input: UpsertGroupUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertGroupArgs = {
  where?: Maybe<UpsertGroupWhere>;
  input: UpsertGroupInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertChineseGuessCharacterQuestionArgs = {
  where?: Maybe<UpsertChineseGuessCharacterQuestionWhere>;
  input: UpsertChineseGuessCharacterQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertInviteTokenArgs = {
  where?: Maybe<UpsertInviteTokenWhere>;
  input: UpsertInviteTokenInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertLanguageSkillLevelArgs = {
  where?: Maybe<UpsertLanguageSkillLevelWhere>;
  input: UpsertLanguageSkillLevelInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertLanguageArgs = {
  where?: Maybe<UpsertLanguageWhere>;
  input: UpsertLanguageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertMessagePreviewArgs = {
  where?: Maybe<UpsertMessagePreviewWhere>;
  input: UpsertMessagePreviewInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertMessageArgs = {
  where?: Maybe<UpsertMessageWhere>;
  input: UpsertMessageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertNotificationChannelArgs = {
  where?: Maybe<UpsertNotificationChannelWhere>;
  input: UpsertNotificationChannelInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertNotificationArgs = {
  where?: Maybe<UpsertNotificationWhere>;
  input: UpsertNotificationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertPostLikeArgs = {
  where?: Maybe<UpsertPostLikeWhere>;
  input: UpsertPostLikeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertPostRecordingArgs = {
  where?: Maybe<UpsertPostRecordingWhere>;
  input: UpsertPostRecordingInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertPostArgs = {
  where?: Maybe<UpsertPostWhere>;
  input: UpsertPostInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertPromptArgs = {
  where?: Maybe<UpsertPromptWhere>;
  input: UpsertPromptInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertGermanRandomQuestionArgs = {
  where?: Maybe<UpsertGermanRandomQuestionWhere>;
  input: UpsertGermanRandomQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertEnglishRandomQuestionArgs = {
  where?: Maybe<UpsertEnglishRandomQuestionWhere>;
  input: UpsertEnglishRandomQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertSpanishRandomQuestionArgs = {
  where?: Maybe<UpsertSpanishRandomQuestionWhere>;
  input: UpsertSpanishRandomQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertFrenchRandomQuestionArgs = {
  where?: Maybe<UpsertFrenchRandomQuestionWhere>;
  input: UpsertFrenchRandomQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertItalianRandomQuestionArgs = {
  where?: Maybe<UpsertItalianRandomQuestionWhere>;
  input: UpsertItalianRandomQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertJapaneseRandomQuestionArgs = {
  where?: Maybe<UpsertJapaneseRandomQuestionWhere>;
  input: UpsertJapaneseRandomQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertKoreanRandomQuestionArgs = {
  where?: Maybe<UpsertKoreanRandomQuestionWhere>;
  input: UpsertKoreanRandomQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertPortugueseRandomQuestionArgs = {
  where?: Maybe<UpsertPortugueseRandomQuestionWhere>;
  input: UpsertPortugueseRandomQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertRussianRandomQuestionArgs = {
  where?: Maybe<UpsertRussianRandomQuestionWhere>;
  input: UpsertRussianRandomQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertChineseRandomQuestionArgs = {
  where?: Maybe<UpsertChineseRandomQuestionWhere>;
  input: UpsertChineseRandomQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertUserDeviceArgs = {
  where?: Maybe<UpsertUserDeviceWhere>;
  input: UpsertUserDeviceInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertUserFollowerArgs = {
  where?: Maybe<UpsertUserFollowerWhere>;
  input: UpsertUserFollowerInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertUserLanguageArgs = {
  where?: Maybe<UpsertUserLanguageWhere>;
  input: UpsertUserLanguageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertUserPreferenceArgs = {
  where?: Maybe<UpsertUserPreferenceWhere>;
  input: UpsertUserPreferenceInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertUserSessionArgs = {
  where?: Maybe<UpsertUserSessionWhere>;
  input: UpsertUserSessionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertUserArgs = {
  where?: Maybe<UpsertUserWhere>;
  input: UpsertUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertGermanWordArgs = {
  where?: Maybe<UpsertGermanWordWhere>;
  input: UpsertGermanWordInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertEnglishWordArgs = {
  where?: Maybe<UpsertEnglishWordWhere>;
  input: UpsertEnglishWordInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertSpanishWordArgs = {
  where?: Maybe<UpsertSpanishWordWhere>;
  input: UpsertSpanishWordInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertFrenchWordArgs = {
  where?: Maybe<UpsertFrenchWordWhere>;
  input: UpsertFrenchWordInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertItalianWordArgs = {
  where?: Maybe<UpsertItalianWordWhere>;
  input: UpsertItalianWordInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertPortugueseWordArgs = {
  where?: Maybe<UpsertPortugueseWordWhere>;
  input: UpsertPortugueseWordInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertRussianWordArgs = {
  where?: Maybe<UpsertRussianWordWhere>;
  input: UpsertRussianWordInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertGermanWouldYouRatherQuestionArgs = {
  where?: Maybe<UpsertGermanWouldYouRatherQuestionWhere>;
  input: UpsertGermanWouldYouRatherQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertEnglishWouldYouRatherQuestionArgs = {
  where?: Maybe<UpsertEnglishWouldYouRatherQuestionWhere>;
  input: UpsertEnglishWouldYouRatherQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertSpanishWouldYouRatherQuestionArgs = {
  where?: Maybe<UpsertSpanishWouldYouRatherQuestionWhere>;
  input: UpsertSpanishWouldYouRatherQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertFrenchWouldYouRatherQuestionArgs = {
  where?: Maybe<UpsertFrenchWouldYouRatherQuestionWhere>;
  input: UpsertFrenchWouldYouRatherQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertItalianWouldYouRatherQuestionArgs = {
  where?: Maybe<UpsertItalianWouldYouRatherQuestionWhere>;
  input: UpsertItalianWouldYouRatherQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertJapaneseWouldYouRatherQuestionArgs = {
  where?: Maybe<UpsertJapaneseWouldYouRatherQuestionWhere>;
  input: UpsertJapaneseWouldYouRatherQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertKoreanWouldYouRatherQuestionArgs = {
  where?: Maybe<UpsertKoreanWouldYouRatherQuestionWhere>;
  input: UpsertKoreanWouldYouRatherQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertPortugueseWouldYouRatherQuestionArgs = {
  where?: Maybe<UpsertPortugueseWouldYouRatherQuestionWhere>;
  input: UpsertPortugueseWouldYouRatherQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertRussianWouldYouRatherQuestionArgs = {
  where?: Maybe<UpsertRussianWouldYouRatherQuestionWhere>;
  input: UpsertRussianWouldYouRatherQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertChineseWouldYouRatherQuestionArgs = {
  where?: Maybe<UpsertChineseWouldYouRatherQuestionWhere>;
  input: UpsertChineseWouldYouRatherQuestionInput;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
};

export type Notification = Node & {
  __typename?: 'Notification';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  uuid: Scalars['UUID'];
  recipientId?: Maybe<Scalars['Int']>;
  channelId: Scalars['Int'];
  params?: Maybe<Scalars['JSON']>;
  sentAt?: Maybe<Scalars['Datetime']>;
  withheldUntil?: Maybe<Scalars['Datetime']>;
  expiresAt?: Maybe<Scalars['Datetime']>;
  readAt?: Maybe<Scalars['Datetime']>;
  createdAt: Scalars['Datetime'];
  recipientGroupId?: Maybe<Scalars['Int']>;
  /** Reads a single `User` that is related to this `Notification`. */
  recipient?: Maybe<User>;
  /** Reads a single `NotificationChannel` that is related to this `Notification`. */
  channel?: Maybe<NotificationChannel>;
  /** Reads a single `Group` that is related to this `Notification`. */
  recipientGroup?: Maybe<Group>;
};

export type NotificationChannel = Node & {
  __typename?: 'NotificationChannel';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  uuid: Scalars['UUID'];
  name?: Maybe<Scalars['String']>;
  createdAt: Scalars['Datetime'];
  /** Reads and enables pagination through a set of `Notification`. */
  notificationsByChannelId: NotificationsConnection;
  /** Reads and enables pagination through a set of `User`. */
  usersByNotificationChannelIdAndRecipientId: NotificationChannelUsersByNotificationChannelIdAndRecipientIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Group`. */
  groupsByNotificationChannelIdAndRecipientGroupId: NotificationChannelGroupsByNotificationChannelIdAndRecipientGroupIdManyToManyConnection;
};


export type NotificationChannelNotificationsByChannelIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<NotificationsOrderBy>>;
  condition?: Maybe<NotificationCondition>;
  filter?: Maybe<NotificationFilter>;
};


export type NotificationChannelUsersByNotificationChannelIdAndRecipientIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
  filter?: Maybe<UserFilter>;
};


export type NotificationChannelGroupsByNotificationChannelIdAndRecipientGroupIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<GroupsOrderBy>>;
  condition?: Maybe<GroupCondition>;
  filter?: Maybe<GroupFilter>;
};

/**
 * A condition to be used against `NotificationChannel` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type NotificationChannelCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `uuid` field. */
  uuid?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `NotificationChannel` object types. All fields are combined with a logical ‘and.’ */
export type NotificationChannelFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `uuid` field. */
  uuid?: Maybe<UuidFilter>;
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<NotificationChannelFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<NotificationChannelFilter>>;
  /** Negates the expression. */
  not?: Maybe<NotificationChannelFilter>;
};

/** A connection to a list of `Group` values, with data from `Notification`. */
export type NotificationChannelGroupsByNotificationChannelIdAndRecipientGroupIdManyToManyConnection = {
  __typename?: 'NotificationChannelGroupsByNotificationChannelIdAndRecipientGroupIdManyToManyConnection';
  /** A list of `Group` objects. */
  nodes: Array<Maybe<Group>>;
  /** A list of edges which contains the `Group`, info from the `Notification`, and the cursor to aid in pagination. */
  edges: Array<NotificationChannelGroupsByNotificationChannelIdAndRecipientGroupIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Group` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Group` edge in the connection, with data from `Notification`. */
export type NotificationChannelGroupsByNotificationChannelIdAndRecipientGroupIdManyToManyEdge = {
  __typename?: 'NotificationChannelGroupsByNotificationChannelIdAndRecipientGroupIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Group` at the end of the edge. */
  node?: Maybe<Group>;
  /** Reads and enables pagination through a set of `Notification`. */
  notificationsByRecipientGroupId: NotificationsConnection;
};


/** A `Group` edge in the connection, with data from `Notification`. */
export type NotificationChannelGroupsByNotificationChannelIdAndRecipientGroupIdManyToManyEdgeNotificationsByRecipientGroupIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<NotificationsOrderBy>>;
  condition?: Maybe<NotificationCondition>;
  filter?: Maybe<NotificationFilter>;
};

/** An input for mutations affecting `NotificationChannel` */
export type NotificationChannelInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  name?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** Represents an update to a `NotificationChannel`. Fields that are set will be updated. */
export type NotificationChannelPatch = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  name?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `User` values, with data from `Notification`. */
export type NotificationChannelUsersByNotificationChannelIdAndRecipientIdManyToManyConnection = {
  __typename?: 'NotificationChannelUsersByNotificationChannelIdAndRecipientIdManyToManyConnection';
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** A list of edges which contains the `User`, info from the `Notification`, and the cursor to aid in pagination. */
  edges: Array<NotificationChannelUsersByNotificationChannelIdAndRecipientIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection, with data from `Notification`. */
export type NotificationChannelUsersByNotificationChannelIdAndRecipientIdManyToManyEdge = {
  __typename?: 'NotificationChannelUsersByNotificationChannelIdAndRecipientIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
  /** Reads and enables pagination through a set of `Notification`. */
  notificationsByRecipientId: NotificationsConnection;
};


/** A `User` edge in the connection, with data from `Notification`. */
export type NotificationChannelUsersByNotificationChannelIdAndRecipientIdManyToManyEdgeNotificationsByRecipientIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<NotificationsOrderBy>>;
  condition?: Maybe<NotificationCondition>;
  filter?: Maybe<NotificationFilter>;
};

/** A connection to a list of `NotificationChannel` values. */
export type NotificationChannelsConnection = {
  __typename?: 'NotificationChannelsConnection';
  /** A list of `NotificationChannel` objects. */
  nodes: Array<Maybe<NotificationChannel>>;
  /** A list of edges which contains the `NotificationChannel` and cursor to aid in pagination. */
  edges: Array<NotificationChannelsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `NotificationChannel` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `NotificationChannel` edge in the connection. */
export type NotificationChannelsEdge = {
  __typename?: 'NotificationChannelsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `NotificationChannel` at the end of the edge. */
  node?: Maybe<NotificationChannel>;
};

/** Methods to use when ordering `NotificationChannel`. */
export enum NotificationChannelsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UuidAsc = 'UUID_ASC',
  UuidDesc = 'UUID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/**
 * A condition to be used against `Notification` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type NotificationCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `uuid` field. */
  uuid?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `recipientId` field. */
  recipientId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `channelId` field. */
  channelId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `params` field. */
  params?: Maybe<Scalars['JSON']>;
  /** Checks for equality with the object’s `sentAt` field. */
  sentAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `withheldUntil` field. */
  withheldUntil?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `expiresAt` field. */
  expiresAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `readAt` field. */
  readAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `recipientGroupId` field. */
  recipientGroupId?: Maybe<Scalars['Int']>;
};

/** A filter to be used against `Notification` object types. All fields are combined with a logical ‘and.’ */
export type NotificationFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `uuid` field. */
  uuid?: Maybe<UuidFilter>;
  /** Filter by the object’s `recipientId` field. */
  recipientId?: Maybe<IntFilter>;
  /** Filter by the object’s `channelId` field. */
  channelId?: Maybe<IntFilter>;
  /** Filter by the object’s `sentAt` field. */
  sentAt?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `withheldUntil` field. */
  withheldUntil?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `expiresAt` field. */
  expiresAt?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `readAt` field. */
  readAt?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `recipientGroupId` field. */
  recipientGroupId?: Maybe<IntFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<NotificationFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<NotificationFilter>>;
  /** Negates the expression. */
  not?: Maybe<NotificationFilter>;
};

/** An input for mutations affecting `Notification` */
export type NotificationInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  recipientId?: Maybe<Scalars['Int']>;
  channelId: Scalars['Int'];
  params?: Maybe<Scalars['JSON']>;
  sentAt?: Maybe<Scalars['Datetime']>;
  withheldUntil?: Maybe<Scalars['Datetime']>;
  expiresAt?: Maybe<Scalars['Datetime']>;
  readAt?: Maybe<Scalars['Datetime']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  recipientGroupId?: Maybe<Scalars['Int']>;
};

/** Represents an update to a `Notification`. Fields that are set will be updated. */
export type NotificationPatch = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  recipientId?: Maybe<Scalars['Int']>;
  channelId?: Maybe<Scalars['Int']>;
  params?: Maybe<Scalars['JSON']>;
  sentAt?: Maybe<Scalars['Datetime']>;
  withheldUntil?: Maybe<Scalars['Datetime']>;
  expiresAt?: Maybe<Scalars['Datetime']>;
  readAt?: Maybe<Scalars['Datetime']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  recipientGroupId?: Maybe<Scalars['Int']>;
};

/** A connection to a list of `Notification` values. */
export type NotificationsConnection = {
  __typename?: 'NotificationsConnection';
  /** A list of `Notification` objects. */
  nodes: Array<Maybe<Notification>>;
  /** A list of edges which contains the `Notification` and cursor to aid in pagination. */
  edges: Array<NotificationsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Notification` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Notification` edge in the connection. */
export type NotificationsEdge = {
  __typename?: 'NotificationsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Notification` at the end of the edge. */
  node?: Maybe<Notification>;
};

/** Methods to use when ordering `Notification`. */
export enum NotificationsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UuidAsc = 'UUID_ASC',
  UuidDesc = 'UUID_DESC',
  RecipientIdAsc = 'RECIPIENT_ID_ASC',
  RecipientIdDesc = 'RECIPIENT_ID_DESC',
  ChannelIdAsc = 'CHANNEL_ID_ASC',
  ChannelIdDesc = 'CHANNEL_ID_DESC',
  ParamsAsc = 'PARAMS_ASC',
  ParamsDesc = 'PARAMS_DESC',
  SentAtAsc = 'SENT_AT_ASC',
  SentAtDesc = 'SENT_AT_DESC',
  WithheldUntilAsc = 'WITHHELD_UNTIL_ASC',
  WithheldUntilDesc = 'WITHHELD_UNTIL_DESC',
  ExpiresAtAsc = 'EXPIRES_AT_ASC',
  ExpiresAtDesc = 'EXPIRES_AT_DESC',
  ReadAtAsc = 'READ_AT_ASC',
  ReadAtDesc = 'READ_AT_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  RecipientGroupIdAsc = 'RECIPIENT_GROUP_ID_ASC',
  RecipientGroupIdDesc = 'RECIPIENT_GROUP_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

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

export type PortugueseRandomQuestion = Node & {
  __typename?: 'PortugueseRandomQuestion';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  uuid: Scalars['UUID'];
  question: Scalars['String'];
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['Datetime'];
  /** Reads a single `LanguageSkillLevel` that is related to this `PortugueseRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
};

/**
 * A condition to be used against `PortugueseRandomQuestion` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type PortugueseRandomQuestionCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `uuid` field. */
  uuid?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `question` field. */
  question?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `PortugueseRandomQuestion` object types. All fields are combined with a logical ‘and.’ */
export type PortugueseRandomQuestionFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `uuid` field. */
  uuid?: Maybe<UuidFilter>;
  /** Filter by the object’s `question` field. */
  question?: Maybe<StringFilter>;
  /** Filter by the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<IntFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<PortugueseRandomQuestionFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<PortugueseRandomQuestionFilter>>;
  /** Negates the expression. */
  not?: Maybe<PortugueseRandomQuestionFilter>;
};

/** An input for mutations affecting `PortugueseRandomQuestion` */
export type PortugueseRandomQuestionInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  question: Scalars['String'];
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** Represents an update to a `PortugueseRandomQuestion`. Fields that are set will be updated. */
export type PortugueseRandomQuestionPatch = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  question?: Maybe<Scalars['String']>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `PortugueseRandomQuestion` values. */
export type PortugueseRandomQuestionsConnection = {
  __typename?: 'PortugueseRandomQuestionsConnection';
  /** A list of `PortugueseRandomQuestion` objects. */
  nodes: Array<Maybe<PortugueseRandomQuestion>>;
  /** A list of edges which contains the `PortugueseRandomQuestion` and cursor to aid in pagination. */
  edges: Array<PortugueseRandomQuestionsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `PortugueseRandomQuestion` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `PortugueseRandomQuestion` edge in the connection. */
export type PortugueseRandomQuestionsEdge = {
  __typename?: 'PortugueseRandomQuestionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `PortugueseRandomQuestion` at the end of the edge. */
  node?: Maybe<PortugueseRandomQuestion>;
};

/** Methods to use when ordering `PortugueseRandomQuestion`. */
export enum PortugueseRandomQuestionsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UuidAsc = 'UUID_ASC',
  UuidDesc = 'UUID_DESC',
  QuestionAsc = 'QUESTION_ASC',
  QuestionDesc = 'QUESTION_DESC',
  RecommendedSkillLevelIdAsc = 'RECOMMENDED_SKILL_LEVEL_ID_ASC',
  RecommendedSkillLevelIdDesc = 'RECOMMENDED_SKILL_LEVEL_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type PortugueseWord = Node & {
  __typename?: 'PortugueseWord';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  uuid: Scalars['UUID'];
  word: Scalars['String'];
  /** Ranges from 0 to 1 (higher is more frequent) */
  frequency: Scalars['Float'];
  length?: Maybe<Scalars['Int']>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['Datetime'];
  /** Reads a single `LanguageSkillLevel` that is related to this `PortugueseWord`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
};

/**
 * A condition to be used against `PortugueseWord` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type PortugueseWordCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `uuid` field. */
  uuid?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `word` field. */
  word?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `frequency` field. */
  frequency?: Maybe<Scalars['Float']>;
  /** Checks for equality with the object’s `length` field. */
  length?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `PortugueseWord` object types. All fields are combined with a logical ‘and.’ */
export type PortugueseWordFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `uuid` field. */
  uuid?: Maybe<UuidFilter>;
  /** Filter by the object’s `word` field. */
  word?: Maybe<StringFilter>;
  /** Filter by the object’s `frequency` field. */
  frequency?: Maybe<FloatFilter>;
  /** Filter by the object’s `length` field. */
  length?: Maybe<IntFilter>;
  /** Filter by the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<IntFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<PortugueseWordFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<PortugueseWordFilter>>;
  /** Negates the expression. */
  not?: Maybe<PortugueseWordFilter>;
};

/** An input for mutations affecting `PortugueseWord` */
export type PortugueseWordInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  word: Scalars['String'];
  /** Ranges from 0 to 1 (higher is more frequent) */
  frequency: Scalars['Float'];
  length?: Maybe<Scalars['Int']>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** Represents an update to a `PortugueseWord`. Fields that are set will be updated. */
export type PortugueseWordPatch = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  word?: Maybe<Scalars['String']>;
  /** Ranges from 0 to 1 (higher is more frequent) */
  frequency?: Maybe<Scalars['Float']>;
  length?: Maybe<Scalars['Int']>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `PortugueseWord` values. */
export type PortugueseWordsConnection = {
  __typename?: 'PortugueseWordsConnection';
  /** A list of `PortugueseWord` objects. */
  nodes: Array<Maybe<PortugueseWord>>;
  /** A list of edges which contains the `PortugueseWord` and cursor to aid in pagination. */
  edges: Array<PortugueseWordsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `PortugueseWord` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `PortugueseWord` edge in the connection. */
export type PortugueseWordsEdge = {
  __typename?: 'PortugueseWordsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `PortugueseWord` at the end of the edge. */
  node?: Maybe<PortugueseWord>;
};

/** Methods to use when ordering `PortugueseWord`. */
export enum PortugueseWordsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UuidAsc = 'UUID_ASC',
  UuidDesc = 'UUID_DESC',
  WordAsc = 'WORD_ASC',
  WordDesc = 'WORD_DESC',
  FrequencyAsc = 'FREQUENCY_ASC',
  FrequencyDesc = 'FREQUENCY_DESC',
  LengthAsc = 'LENGTH_ASC',
  LengthDesc = 'LENGTH_DESC',
  RecommendedSkillLevelIdAsc = 'RECOMMENDED_SKILL_LEVEL_ID_ASC',
  RecommendedSkillLevelIdDesc = 'RECOMMENDED_SKILL_LEVEL_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type PortugueseWouldYouRatherQuestion = Node & {
  __typename?: 'PortugueseWouldYouRatherQuestion';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  uuid: Scalars['UUID'];
  question: Scalars['String'];
  answers: Array<Maybe<Scalars['String']>>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['Datetime'];
  /** Reads a single `LanguageSkillLevel` that is related to this `PortugueseWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
};

/**
 * A condition to be used against `PortugueseWouldYouRatherQuestion` object types.
 * All fields are tested for equality and combined with a logical ‘and.’
 */
export type PortugueseWouldYouRatherQuestionCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `uuid` field. */
  uuid?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `question` field. */
  question?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `answers` field. */
  answers?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Checks for equality with the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `PortugueseWouldYouRatherQuestion` object types. All fields are combined with a logical ‘and.’ */
export type PortugueseWouldYouRatherQuestionFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `uuid` field. */
  uuid?: Maybe<UuidFilter>;
  /** Filter by the object’s `question` field. */
  question?: Maybe<StringFilter>;
  /** Filter by the object’s `answers` field. */
  answers?: Maybe<StringListFilter>;
  /** Filter by the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<IntFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<PortugueseWouldYouRatherQuestionFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<PortugueseWouldYouRatherQuestionFilter>>;
  /** Negates the expression. */
  not?: Maybe<PortugueseWouldYouRatherQuestionFilter>;
};

/** An input for mutations affecting `PortugueseWouldYouRatherQuestion` */
export type PortugueseWouldYouRatherQuestionInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  question: Scalars['String'];
  answers: Array<Maybe<Scalars['String']>>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** Represents an update to a `PortugueseWouldYouRatherQuestion`. Fields that are set will be updated. */
export type PortugueseWouldYouRatherQuestionPatch = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  question?: Maybe<Scalars['String']>;
  answers?: Maybe<Array<Maybe<Scalars['String']>>>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `PortugueseWouldYouRatherQuestion` values. */
export type PortugueseWouldYouRatherQuestionsConnection = {
  __typename?: 'PortugueseWouldYouRatherQuestionsConnection';
  /** A list of `PortugueseWouldYouRatherQuestion` objects. */
  nodes: Array<Maybe<PortugueseWouldYouRatherQuestion>>;
  /** A list of edges which contains the `PortugueseWouldYouRatherQuestion` and cursor to aid in pagination. */
  edges: Array<PortugueseWouldYouRatherQuestionsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `PortugueseWouldYouRatherQuestion` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `PortugueseWouldYouRatherQuestion` edge in the connection. */
export type PortugueseWouldYouRatherQuestionsEdge = {
  __typename?: 'PortugueseWouldYouRatherQuestionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `PortugueseWouldYouRatherQuestion` at the end of the edge. */
  node?: Maybe<PortugueseWouldYouRatherQuestion>;
};

/** Methods to use when ordering `PortugueseWouldYouRatherQuestion`. */
export enum PortugueseWouldYouRatherQuestionsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UuidAsc = 'UUID_ASC',
  UuidDesc = 'UUID_DESC',
  QuestionAsc = 'QUESTION_ASC',
  QuestionDesc = 'QUESTION_DESC',
  AnswersAsc = 'ANSWERS_ASC',
  AnswersDesc = 'ANSWERS_DESC',
  RecommendedSkillLevelIdAsc = 'RECOMMENDED_SKILL_LEVEL_ID_ASC',
  RecommendedSkillLevelIdDesc = 'RECOMMENDED_SKILL_LEVEL_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type Post = Node & {
  __typename?: 'Post';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  uuid: Scalars['UUID'];
  authorId?: Maybe<Scalars['Int']>;
  body: Scalars['String'];
  parentPostId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['Datetime'];
  languageId: Scalars['Int'];
  promptId?: Maybe<Scalars['Int']>;
  /** Reads a single `User` that is related to this `Post`. */
  author?: Maybe<User>;
  /** Reads a single `Post` that is related to this `Post`. */
  parentPost?: Maybe<Post>;
  /** Reads a single `Language` that is related to this `Post`. */
  language?: Maybe<Language>;
  /** Reads a single `Prompt` that is related to this `Post`. */
  prompt?: Maybe<Prompt>;
  /** Reads and enables pagination through a set of `Post`. */
  replies: PostsConnection;
  /** Reads and enables pagination through a set of `PostLike`. */
  likes: PostLikesConnection;
  /** Reads and enables pagination through a set of `PostRecording`. */
  recordings: PostRecordingsConnection;
  /** Reads and enables pagination through a set of `User`. */
  usersByPostParentPostIdAndAuthorId: PostUsersByPostParentPostIdAndAuthorIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Language`. */
  languagesByPostParentPostIdAndLanguageId: PostLanguagesByPostParentPostIdAndLanguageIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Prompt`. */
  promptsByPostParentPostIdAndPromptId: PostPromptsByPostParentPostIdAndPromptIdManyToManyConnection;
  /** Reads and enables pagination through a set of `User`. */
  usersByPostLikePostIdAndUserId: PostUsersByPostLikePostIdAndUserIdManyToManyConnection;
  /** Reads and enables pagination through a set of `User`. */
  usersByPostRecordingPostIdAndUserId: PostUsersByPostRecordingPostIdAndUserIdManyToManyConnection;
};


export type PostRepliesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PostsOrderBy>>;
  condition?: Maybe<PostCondition>;
  filter?: Maybe<PostFilter>;
};


export type PostLikesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PostLikesOrderBy>>;
  condition?: Maybe<PostLikeCondition>;
  filter?: Maybe<PostLikeFilter>;
};


export type PostRecordingsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PostRecordingsOrderBy>>;
  condition?: Maybe<PostRecordingCondition>;
  filter?: Maybe<PostRecordingFilter>;
};


export type PostUsersByPostParentPostIdAndAuthorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
  filter?: Maybe<UserFilter>;
};


export type PostLanguagesByPostParentPostIdAndLanguageIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<LanguagesOrderBy>>;
  condition?: Maybe<LanguageCondition>;
  filter?: Maybe<LanguageFilter>;
};


export type PostPromptsByPostParentPostIdAndPromptIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PromptsOrderBy>>;
  condition?: Maybe<PromptCondition>;
  filter?: Maybe<PromptFilter>;
};


export type PostUsersByPostLikePostIdAndUserIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
  filter?: Maybe<UserFilter>;
};


export type PostUsersByPostRecordingPostIdAndUserIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
  filter?: Maybe<UserFilter>;
};

/** A condition to be used against `Post` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type PostCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `uuid` field. */
  uuid?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `authorId` field. */
  authorId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `body` field. */
  body?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `parentPostId` field. */
  parentPostId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `languageId` field. */
  languageId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `promptId` field. */
  promptId?: Maybe<Scalars['Int']>;
};

/** A filter to be used against `Post` object types. All fields are combined with a logical ‘and.’ */
export type PostFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `uuid` field. */
  uuid?: Maybe<UuidFilter>;
  /** Filter by the object’s `authorId` field. */
  authorId?: Maybe<IntFilter>;
  /** Filter by the object’s `body` field. */
  body?: Maybe<StringFilter>;
  /** Filter by the object’s `parentPostId` field. */
  parentPostId?: Maybe<IntFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `languageId` field. */
  languageId?: Maybe<IntFilter>;
  /** Filter by the object’s `promptId` field. */
  promptId?: Maybe<IntFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<PostFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<PostFilter>>;
  /** Negates the expression. */
  not?: Maybe<PostFilter>;
};

/** An input for mutations affecting `Post` */
export type PostInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  authorId?: Maybe<Scalars['Int']>;
  body: Scalars['String'];
  parentPostId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  languageId: Scalars['Int'];
  promptId?: Maybe<Scalars['Int']>;
};

/** A connection to a list of `Language` values, with data from `Post`. */
export type PostLanguagesByPostParentPostIdAndLanguageIdManyToManyConnection = {
  __typename?: 'PostLanguagesByPostParentPostIdAndLanguageIdManyToManyConnection';
  /** A list of `Language` objects. */
  nodes: Array<Maybe<Language>>;
  /** A list of edges which contains the `Language`, info from the `Post`, and the cursor to aid in pagination. */
  edges: Array<PostLanguagesByPostParentPostIdAndLanguageIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Language` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Language` edge in the connection, with data from `Post`. */
export type PostLanguagesByPostParentPostIdAndLanguageIdManyToManyEdge = {
  __typename?: 'PostLanguagesByPostParentPostIdAndLanguageIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Language` at the end of the edge. */
  node?: Maybe<Language>;
  /** Reads and enables pagination through a set of `Post`. */
  posts: PostsConnection;
};


/** A `Language` edge in the connection, with data from `Post`. */
export type PostLanguagesByPostParentPostIdAndLanguageIdManyToManyEdgePostsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PostsOrderBy>>;
  condition?: Maybe<PostCondition>;
  filter?: Maybe<PostFilter>;
};

export type PostLike = Node & {
  __typename?: 'PostLike';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  userId: Scalars['Int'];
  postId: Scalars['Int'];
  createdAt: Scalars['Datetime'];
  /** Reads a single `User` that is related to this `PostLike`. */
  user?: Maybe<User>;
  /** Reads a single `Post` that is related to this `PostLike`. */
  post?: Maybe<Post>;
};

/**
 * A condition to be used against `PostLike` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type PostLikeCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `postId` field. */
  postId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `PostLike` object types. All fields are combined with a logical ‘and.’ */
export type PostLikeFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `userId` field. */
  userId?: Maybe<IntFilter>;
  /** Filter by the object’s `postId` field. */
  postId?: Maybe<IntFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<PostLikeFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<PostLikeFilter>>;
  /** Negates the expression. */
  not?: Maybe<PostLikeFilter>;
};

/** An input for mutations affecting `PostLike` */
export type PostLikeInput = {
  id?: Maybe<Scalars['Int']>;
  userId: Scalars['Int'];
  postId: Scalars['Int'];
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** Represents an update to a `PostLike`. Fields that are set will be updated. */
export type PostLikePatch = {
  id?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['Int']>;
  postId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `PostLike` values. */
export type PostLikesConnection = {
  __typename?: 'PostLikesConnection';
  /** A list of `PostLike` objects. */
  nodes: Array<Maybe<PostLike>>;
  /** A list of edges which contains the `PostLike` and cursor to aid in pagination. */
  edges: Array<PostLikesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `PostLike` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `PostLike` edge in the connection. */
export type PostLikesEdge = {
  __typename?: 'PostLikesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `PostLike` at the end of the edge. */
  node?: Maybe<PostLike>;
};

/** Methods to use when ordering `PostLike`. */
export enum PostLikesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC',
  PostIdAsc = 'POST_ID_ASC',
  PostIdDesc = 'POST_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** Represents an update to a `Post`. Fields that are set will be updated. */
export type PostPatch = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  authorId?: Maybe<Scalars['Int']>;
  body?: Maybe<Scalars['String']>;
  parentPostId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  languageId?: Maybe<Scalars['Int']>;
  promptId?: Maybe<Scalars['Int']>;
};

/** A connection to a list of `Prompt` values, with data from `Post`. */
export type PostPromptsByPostParentPostIdAndPromptIdManyToManyConnection = {
  __typename?: 'PostPromptsByPostParentPostIdAndPromptIdManyToManyConnection';
  /** A list of `Prompt` objects. */
  nodes: Array<Maybe<Prompt>>;
  /** A list of edges which contains the `Prompt`, info from the `Post`, and the cursor to aid in pagination. */
  edges: Array<PostPromptsByPostParentPostIdAndPromptIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Prompt` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Prompt` edge in the connection, with data from `Post`. */
export type PostPromptsByPostParentPostIdAndPromptIdManyToManyEdge = {
  __typename?: 'PostPromptsByPostParentPostIdAndPromptIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Prompt` at the end of the edge. */
  node?: Maybe<Prompt>;
  /** Reads and enables pagination through a set of `Post`. */
  posts: PostsConnection;
};


/** A `Prompt` edge in the connection, with data from `Post`. */
export type PostPromptsByPostParentPostIdAndPromptIdManyToManyEdgePostsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PostsOrderBy>>;
  condition?: Maybe<PostCondition>;
  filter?: Maybe<PostFilter>;
};

export type PostRecording = Node & {
  __typename?: 'PostRecording';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  uuid: Scalars['UUID'];
  userId: Scalars['Int'];
  postId: Scalars['Int'];
  /** Basename without extension */
  filename: Scalars['String'];
  /** Extension without leading dot */
  extension?: Maybe<Scalars['String']>;
  createdAt: Scalars['Datetime'];
  /** Reads a single `User` that is related to this `PostRecording`. */
  user?: Maybe<User>;
  /** Reads a single `Post` that is related to this `PostRecording`. */
  post?: Maybe<Post>;
};

/**
 * A condition to be used against `PostRecording` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type PostRecordingCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `uuid` field. */
  uuid?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `postId` field. */
  postId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `filename` field. */
  filename?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `extension` field. */
  extension?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `PostRecording` object types. All fields are combined with a logical ‘and.’ */
export type PostRecordingFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `uuid` field. */
  uuid?: Maybe<UuidFilter>;
  /** Filter by the object’s `userId` field. */
  userId?: Maybe<IntFilter>;
  /** Filter by the object’s `postId` field. */
  postId?: Maybe<IntFilter>;
  /** Filter by the object’s `filename` field. */
  filename?: Maybe<StringFilter>;
  /** Filter by the object’s `extension` field. */
  extension?: Maybe<StringFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<PostRecordingFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<PostRecordingFilter>>;
  /** Negates the expression. */
  not?: Maybe<PostRecordingFilter>;
};

/** An input for mutations affecting `PostRecording` */
export type PostRecordingInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  userId: Scalars['Int'];
  postId: Scalars['Int'];
  /** Basename without extension */
  filename: Scalars['String'];
  /** Extension without leading dot */
  extension?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** Represents an update to a `PostRecording`. Fields that are set will be updated. */
export type PostRecordingPatch = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  userId?: Maybe<Scalars['Int']>;
  postId?: Maybe<Scalars['Int']>;
  /** Basename without extension */
  filename?: Maybe<Scalars['String']>;
  /** Extension without leading dot */
  extension?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `PostRecording` values. */
export type PostRecordingsConnection = {
  __typename?: 'PostRecordingsConnection';
  /** A list of `PostRecording` objects. */
  nodes: Array<Maybe<PostRecording>>;
  /** A list of edges which contains the `PostRecording` and cursor to aid in pagination. */
  edges: Array<PostRecordingsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `PostRecording` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `PostRecording` edge in the connection. */
export type PostRecordingsEdge = {
  __typename?: 'PostRecordingsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `PostRecording` at the end of the edge. */
  node?: Maybe<PostRecording>;
};

/** Methods to use when ordering `PostRecording`. */
export enum PostRecordingsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UuidAsc = 'UUID_ASC',
  UuidDesc = 'UUID_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC',
  PostIdAsc = 'POST_ID_ASC',
  PostIdDesc = 'POST_ID_DESC',
  FilenameAsc = 'FILENAME_ASC',
  FilenameDesc = 'FILENAME_DESC',
  ExtensionAsc = 'EXTENSION_ASC',
  ExtensionDesc = 'EXTENSION_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** A connection to a list of `User` values, with data from `PostLike`. */
export type PostUsersByPostLikePostIdAndUserIdManyToManyConnection = {
  __typename?: 'PostUsersByPostLikePostIdAndUserIdManyToManyConnection';
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** A list of edges which contains the `User`, info from the `PostLike`, and the cursor to aid in pagination. */
  edges: Array<PostUsersByPostLikePostIdAndUserIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection, with data from `PostLike`. */
export type PostUsersByPostLikePostIdAndUserIdManyToManyEdge = {
  __typename?: 'PostUsersByPostLikePostIdAndUserIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
  /** Reads and enables pagination through a set of `PostLike`. */
  postLikes: PostLikesConnection;
};


/** A `User` edge in the connection, with data from `PostLike`. */
export type PostUsersByPostLikePostIdAndUserIdManyToManyEdgePostLikesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PostLikesOrderBy>>;
  condition?: Maybe<PostLikeCondition>;
  filter?: Maybe<PostLikeFilter>;
};

/** A connection to a list of `User` values, with data from `Post`. */
export type PostUsersByPostParentPostIdAndAuthorIdManyToManyConnection = {
  __typename?: 'PostUsersByPostParentPostIdAndAuthorIdManyToManyConnection';
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** A list of edges which contains the `User`, info from the `Post`, and the cursor to aid in pagination. */
  edges: Array<PostUsersByPostParentPostIdAndAuthorIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection, with data from `Post`. */
export type PostUsersByPostParentPostIdAndAuthorIdManyToManyEdge = {
  __typename?: 'PostUsersByPostParentPostIdAndAuthorIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
  /** Reads and enables pagination through a set of `Post`. */
  authoredPosts: PostsConnection;
};


/** A `User` edge in the connection, with data from `Post`. */
export type PostUsersByPostParentPostIdAndAuthorIdManyToManyEdgeAuthoredPostsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PostsOrderBy>>;
  condition?: Maybe<PostCondition>;
  filter?: Maybe<PostFilter>;
};

/** A connection to a list of `User` values, with data from `PostRecording`. */
export type PostUsersByPostRecordingPostIdAndUserIdManyToManyConnection = {
  __typename?: 'PostUsersByPostRecordingPostIdAndUserIdManyToManyConnection';
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** A list of edges which contains the `User`, info from the `PostRecording`, and the cursor to aid in pagination. */
  edges: Array<PostUsersByPostRecordingPostIdAndUserIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection, with data from `PostRecording`. */
export type PostUsersByPostRecordingPostIdAndUserIdManyToManyEdge = {
  __typename?: 'PostUsersByPostRecordingPostIdAndUserIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
  /** Reads and enables pagination through a set of `PostRecording`. */
  postRecordings: PostRecordingsConnection;
};


/** A `User` edge in the connection, with data from `PostRecording`. */
export type PostUsersByPostRecordingPostIdAndUserIdManyToManyEdgePostRecordingsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PostRecordingsOrderBy>>;
  condition?: Maybe<PostRecordingCondition>;
  filter?: Maybe<PostRecordingFilter>;
};

/** A connection to a list of `Post` values. */
export type PostsConnection = {
  __typename?: 'PostsConnection';
  /** A list of `Post` objects. */
  nodes: Array<Maybe<Post>>;
  /** A list of edges which contains the `Post` and cursor to aid in pagination. */
  edges: Array<PostsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Post` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Post` edge in the connection. */
export type PostsEdge = {
  __typename?: 'PostsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Post` at the end of the edge. */
  node?: Maybe<Post>;
};

/** Methods to use when ordering `Post`. */
export enum PostsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UuidAsc = 'UUID_ASC',
  UuidDesc = 'UUID_DESC',
  AuthorIdAsc = 'AUTHOR_ID_ASC',
  AuthorIdDesc = 'AUTHOR_ID_DESC',
  BodyAsc = 'BODY_ASC',
  BodyDesc = 'BODY_DESC',
  ParentPostIdAsc = 'PARENT_POST_ID_ASC',
  ParentPostIdDesc = 'PARENT_POST_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  LanguageIdAsc = 'LANGUAGE_ID_ASC',
  LanguageIdDesc = 'LANGUAGE_ID_DESC',
  PromptIdAsc = 'PROMPT_ID_ASC',
  PromptIdDesc = 'PROMPT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type Prompt = Node & {
  __typename?: 'Prompt';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  uuid: Scalars['UUID'];
  languageId: Scalars['Int'];
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  type: PromptType;
  contentEn?: Maybe<Scalars['String']>;
  contentDe?: Maybe<Scalars['String']>;
  contentZh?: Maybe<Scalars['String']>;
  createdAt: Scalars['Datetime'];
  contentEs?: Maybe<Scalars['String']>;
  contentFr?: Maybe<Scalars['String']>;
  contentPt?: Maybe<Scalars['String']>;
  contentRu?: Maybe<Scalars['String']>;
  contentJa?: Maybe<Scalars['String']>;
  contentKo?: Maybe<Scalars['String']>;
  contentIt?: Maybe<Scalars['String']>;
  /** Reads a single `Language` that is related to this `Prompt`. */
  language?: Maybe<Language>;
  /** Reads a single `LanguageSkillLevel` that is related to this `Prompt`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** Reads and enables pagination through a set of `Post`. */
  posts: PostsConnection;
  content?: Maybe<Scalars['String']>;
  /** Reads and enables pagination through a set of `User`. */
  usersByPostPromptIdAndAuthorId: PromptUsersByPostPromptIdAndAuthorIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Post`. */
  postsByPostPromptIdAndParentPostId: PromptPostsByPostPromptIdAndParentPostIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Language`. */
  languagesByPostPromptIdAndLanguageId: PromptLanguagesByPostPromptIdAndLanguageIdManyToManyConnection;
};


export type PromptPostsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PostsOrderBy>>;
  condition?: Maybe<PostCondition>;
  filter?: Maybe<PostFilter>;
};


export type PromptUsersByPostPromptIdAndAuthorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
  filter?: Maybe<UserFilter>;
};


export type PromptPostsByPostPromptIdAndParentPostIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PostsOrderBy>>;
  condition?: Maybe<PostCondition>;
  filter?: Maybe<PostFilter>;
};


export type PromptLanguagesByPostPromptIdAndLanguageIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<LanguagesOrderBy>>;
  condition?: Maybe<LanguageCondition>;
  filter?: Maybe<LanguageFilter>;
};

/** A condition to be used against `Prompt` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type PromptCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `uuid` field. */
  uuid?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `languageId` field. */
  languageId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `type` field. */
  type?: Maybe<PromptType>;
  /** Checks for equality with the object’s `contentEn` field. */
  contentEn?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `contentDe` field. */
  contentDe?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `contentZh` field. */
  contentZh?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `contentEs` field. */
  contentEs?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `contentFr` field. */
  contentFr?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `contentPt` field. */
  contentPt?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `contentRu` field. */
  contentRu?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `contentJa` field. */
  contentJa?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `contentKo` field. */
  contentKo?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `contentIt` field. */
  contentIt?: Maybe<Scalars['String']>;
};

/** A filter to be used against `Prompt` object types. All fields are combined with a logical ‘and.’ */
export type PromptFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `uuid` field. */
  uuid?: Maybe<UuidFilter>;
  /** Filter by the object’s `languageId` field. */
  languageId?: Maybe<IntFilter>;
  /** Filter by the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<IntFilter>;
  /** Filter by the object’s `type` field. */
  type?: Maybe<PromptTypeFilter>;
  /** Filter by the object’s `contentEn` field. */
  contentEn?: Maybe<StringFilter>;
  /** Filter by the object’s `contentDe` field. */
  contentDe?: Maybe<StringFilter>;
  /** Filter by the object’s `contentZh` field. */
  contentZh?: Maybe<StringFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `contentEs` field. */
  contentEs?: Maybe<StringFilter>;
  /** Filter by the object’s `contentFr` field. */
  contentFr?: Maybe<StringFilter>;
  /** Filter by the object’s `contentPt` field. */
  contentPt?: Maybe<StringFilter>;
  /** Filter by the object’s `contentRu` field. */
  contentRu?: Maybe<StringFilter>;
  /** Filter by the object’s `contentJa` field. */
  contentJa?: Maybe<StringFilter>;
  /** Filter by the object’s `contentKo` field. */
  contentKo?: Maybe<StringFilter>;
  /** Filter by the object’s `contentIt` field. */
  contentIt?: Maybe<StringFilter>;
  /** Filter by the object’s `content` field. */
  content?: Maybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<PromptFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<PromptFilter>>;
  /** Negates the expression. */
  not?: Maybe<PromptFilter>;
};

/** An input for mutations affecting `Prompt` */
export type PromptInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  languageId: Scalars['Int'];
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  type: PromptType;
  contentEn?: Maybe<Scalars['String']>;
  contentDe?: Maybe<Scalars['String']>;
  contentZh?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  contentEs?: Maybe<Scalars['String']>;
  contentFr?: Maybe<Scalars['String']>;
  contentPt?: Maybe<Scalars['String']>;
  contentRu?: Maybe<Scalars['String']>;
  contentJa?: Maybe<Scalars['String']>;
  contentKo?: Maybe<Scalars['String']>;
  contentIt?: Maybe<Scalars['String']>;
};

/** A connection to a list of `Language` values, with data from `Post`. */
export type PromptLanguagesByPostPromptIdAndLanguageIdManyToManyConnection = {
  __typename?: 'PromptLanguagesByPostPromptIdAndLanguageIdManyToManyConnection';
  /** A list of `Language` objects. */
  nodes: Array<Maybe<Language>>;
  /** A list of edges which contains the `Language`, info from the `Post`, and the cursor to aid in pagination. */
  edges: Array<PromptLanguagesByPostPromptIdAndLanguageIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Language` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Language` edge in the connection, with data from `Post`. */
export type PromptLanguagesByPostPromptIdAndLanguageIdManyToManyEdge = {
  __typename?: 'PromptLanguagesByPostPromptIdAndLanguageIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Language` at the end of the edge. */
  node?: Maybe<Language>;
  /** Reads and enables pagination through a set of `Post`. */
  posts: PostsConnection;
};


/** A `Language` edge in the connection, with data from `Post`. */
export type PromptLanguagesByPostPromptIdAndLanguageIdManyToManyEdgePostsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PostsOrderBy>>;
  condition?: Maybe<PostCondition>;
  filter?: Maybe<PostFilter>;
};

/** Represents an update to a `Prompt`. Fields that are set will be updated. */
export type PromptPatch = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  languageId?: Maybe<Scalars['Int']>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  type?: Maybe<PromptType>;
  contentEn?: Maybe<Scalars['String']>;
  contentDe?: Maybe<Scalars['String']>;
  contentZh?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  contentEs?: Maybe<Scalars['String']>;
  contentFr?: Maybe<Scalars['String']>;
  contentPt?: Maybe<Scalars['String']>;
  contentRu?: Maybe<Scalars['String']>;
  contentJa?: Maybe<Scalars['String']>;
  contentKo?: Maybe<Scalars['String']>;
  contentIt?: Maybe<Scalars['String']>;
};

/** A connection to a list of `Post` values, with data from `Post`. */
export type PromptPostsByPostPromptIdAndParentPostIdManyToManyConnection = {
  __typename?: 'PromptPostsByPostPromptIdAndParentPostIdManyToManyConnection';
  /** A list of `Post` objects. */
  nodes: Array<Maybe<Post>>;
  /** A list of edges which contains the `Post`, info from the `Post`, and the cursor to aid in pagination. */
  edges: Array<PromptPostsByPostPromptIdAndParentPostIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Post` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Post` edge in the connection, with data from `Post`. */
export type PromptPostsByPostPromptIdAndParentPostIdManyToManyEdge = {
  __typename?: 'PromptPostsByPostPromptIdAndParentPostIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Post` at the end of the edge. */
  node?: Maybe<Post>;
  /** Reads and enables pagination through a set of `Post`. */
  replies: PostsConnection;
};


/** A `Post` edge in the connection, with data from `Post`. */
export type PromptPostsByPostPromptIdAndParentPostIdManyToManyEdgeRepliesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PostsOrderBy>>;
  condition?: Maybe<PostCondition>;
  filter?: Maybe<PostFilter>;
};

export enum PromptType {
  Question = 'QUESTION',
  Word = 'WORD'
}

/** A filter to be used against PromptType fields. All fields are combined with a logical ‘and.’ */
export type PromptTypeFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<PromptType>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<PromptType>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<PromptType>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<PromptType>;
  /** Included in the specified list. */
  in?: Maybe<Array<PromptType>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<PromptType>>;
  /** Less than the specified value. */
  lessThan?: Maybe<PromptType>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<PromptType>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<PromptType>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<PromptType>;
};

/** A connection to a list of `User` values, with data from `Post`. */
export type PromptUsersByPostPromptIdAndAuthorIdManyToManyConnection = {
  __typename?: 'PromptUsersByPostPromptIdAndAuthorIdManyToManyConnection';
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** A list of edges which contains the `User`, info from the `Post`, and the cursor to aid in pagination. */
  edges: Array<PromptUsersByPostPromptIdAndAuthorIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection, with data from `Post`. */
export type PromptUsersByPostPromptIdAndAuthorIdManyToManyEdge = {
  __typename?: 'PromptUsersByPostPromptIdAndAuthorIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
  /** Reads and enables pagination through a set of `Post`. */
  authoredPosts: PostsConnection;
};


/** A `User` edge in the connection, with data from `Post`. */
export type PromptUsersByPostPromptIdAndAuthorIdManyToManyEdgeAuthoredPostsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PostsOrderBy>>;
  condition?: Maybe<PostCondition>;
  filter?: Maybe<PostFilter>;
};

/** A connection to a list of `Prompt` values. */
export type PromptsConnection = {
  __typename?: 'PromptsConnection';
  /** A list of `Prompt` objects. */
  nodes: Array<Maybe<Prompt>>;
  /** A list of edges which contains the `Prompt` and cursor to aid in pagination. */
  edges: Array<PromptsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Prompt` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Prompt` edge in the connection. */
export type PromptsEdge = {
  __typename?: 'PromptsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Prompt` at the end of the edge. */
  node?: Maybe<Prompt>;
};

/** Methods to use when ordering `Prompt`. */
export enum PromptsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UuidAsc = 'UUID_ASC',
  UuidDesc = 'UUID_DESC',
  LanguageIdAsc = 'LANGUAGE_ID_ASC',
  LanguageIdDesc = 'LANGUAGE_ID_DESC',
  RecommendedSkillLevelIdAsc = 'RECOMMENDED_SKILL_LEVEL_ID_ASC',
  RecommendedSkillLevelIdDesc = 'RECOMMENDED_SKILL_LEVEL_ID_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC',
  ContentEnAsc = 'CONTENT_EN_ASC',
  ContentEnDesc = 'CONTENT_EN_DESC',
  ContentDeAsc = 'CONTENT_DE_ASC',
  ContentDeDesc = 'CONTENT_DE_DESC',
  ContentZhAsc = 'CONTENT_ZH_ASC',
  ContentZhDesc = 'CONTENT_ZH_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  ContentEsAsc = 'CONTENT_ES_ASC',
  ContentEsDesc = 'CONTENT_ES_DESC',
  ContentFrAsc = 'CONTENT_FR_ASC',
  ContentFrDesc = 'CONTENT_FR_DESC',
  ContentPtAsc = 'CONTENT_PT_ASC',
  ContentPtDesc = 'CONTENT_PT_DESC',
  ContentRuAsc = 'CONTENT_RU_ASC',
  ContentRuDesc = 'CONTENT_RU_DESC',
  ContentJaAsc = 'CONTENT_JA_ASC',
  ContentJaDesc = 'CONTENT_JA_DESC',
  ContentKoAsc = 'CONTENT_KO_ASC',
  ContentKoDesc = 'CONTENT_KO_DESC',
  ContentItAsc = 'CONTENT_IT_ASC',
  ContentItDesc = 'CONTENT_IT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

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
  /** Reads and enables pagination through a set of `ChineseGuessCharacterQuestion`. */
  chineseGuessCharacterQuestions?: Maybe<ChineseGuessCharacterQuestionsConnection>;
  /** Reads and enables pagination through a set of `InviteToken`. */
  inviteTokens?: Maybe<InviteTokensConnection>;
  /** Reads and enables pagination through a set of `LanguageSkillLevel`. */
  languageSkillLevels?: Maybe<LanguageSkillLevelsConnection>;
  /** Reads and enables pagination through a set of `Language`. */
  languages?: Maybe<LanguagesConnection>;
  /** Reads and enables pagination through a set of `MessagePreview`. */
  messagePreviews?: Maybe<MessagePreviewsConnection>;
  /** Reads and enables pagination through a set of `Message`. */
  messages?: Maybe<MessagesConnection>;
  /** Reads and enables pagination through a set of `NotificationChannel`. */
  notificationChannels?: Maybe<NotificationChannelsConnection>;
  /** Reads and enables pagination through a set of `Notification`. */
  notifications?: Maybe<NotificationsConnection>;
  /** Reads and enables pagination through a set of `PostLike`. */
  postLikes?: Maybe<PostLikesConnection>;
  /** Reads and enables pagination through a set of `PostRecording`. */
  postRecordings?: Maybe<PostRecordingsConnection>;
  /** Reads and enables pagination through a set of `Post`. */
  posts?: Maybe<PostsConnection>;
  /** Reads and enables pagination through a set of `Prompt`. */
  prompts?: Maybe<PromptsConnection>;
  /** Reads and enables pagination through a set of `GermanRandomQuestion`. */
  germanRandomQuestions?: Maybe<GermanRandomQuestionsConnection>;
  /** Reads and enables pagination through a set of `EnglishRandomQuestion`. */
  englishRandomQuestions?: Maybe<EnglishRandomQuestionsConnection>;
  /** Reads and enables pagination through a set of `SpanishRandomQuestion`. */
  spanishRandomQuestions?: Maybe<SpanishRandomQuestionsConnection>;
  /** Reads and enables pagination through a set of `FrenchRandomQuestion`. */
  frenchRandomQuestions?: Maybe<FrenchRandomQuestionsConnection>;
  /** Reads and enables pagination through a set of `ItalianRandomQuestion`. */
  italianRandomQuestions?: Maybe<ItalianRandomQuestionsConnection>;
  /** Reads and enables pagination through a set of `JapaneseRandomQuestion`. */
  japaneseRandomQuestions?: Maybe<JapaneseRandomQuestionsConnection>;
  /** Reads and enables pagination through a set of `KoreanRandomQuestion`. */
  koreanRandomQuestions?: Maybe<KoreanRandomQuestionsConnection>;
  /** Reads and enables pagination through a set of `PortugueseRandomQuestion`. */
  portugueseRandomQuestions?: Maybe<PortugueseRandomQuestionsConnection>;
  /** Reads and enables pagination through a set of `RussianRandomQuestion`. */
  russianRandomQuestions?: Maybe<RussianRandomQuestionsConnection>;
  /** Reads and enables pagination through a set of `ChineseRandomQuestion`. */
  chineseRandomQuestions?: Maybe<ChineseRandomQuestionsConnection>;
  /** Reads and enables pagination through a set of `UserDevice`. */
  userDevices?: Maybe<UserDevicesConnection>;
  /** Reads and enables pagination through a set of `UserFollower`. */
  userFollowers?: Maybe<UserFollowersConnection>;
  /** Reads and enables pagination through a set of `UserLanguage`. */
  userLanguages?: Maybe<UserLanguagesConnection>;
  /** Reads and enables pagination through a set of `UserPreference`. */
  userPreferences?: Maybe<UserPreferencesConnection>;
  /** Reads and enables pagination through a set of `UserSession`. */
  userSessions?: Maybe<UserSessionsConnection>;
  /** Reads and enables pagination through a set of `User`. */
  users?: Maybe<UsersConnection>;
  /** Reads and enables pagination through a set of `GermanWord`. */
  germanWords?: Maybe<GermanWordsConnection>;
  /** Reads and enables pagination through a set of `EnglishWord`. */
  englishWords?: Maybe<EnglishWordsConnection>;
  /** Reads and enables pagination through a set of `SpanishWord`. */
  spanishWords?: Maybe<SpanishWordsConnection>;
  /** Reads and enables pagination through a set of `FrenchWord`. */
  frenchWords?: Maybe<FrenchWordsConnection>;
  /** Reads and enables pagination through a set of `ItalianWord`. */
  italianWords?: Maybe<ItalianWordsConnection>;
  /** Reads and enables pagination through a set of `PortugueseWord`. */
  portugueseWords?: Maybe<PortugueseWordsConnection>;
  /** Reads and enables pagination through a set of `RussianWord`. */
  russianWords?: Maybe<RussianWordsConnection>;
  /** Reads and enables pagination through a set of `GermanWouldYouRatherQuestion`. */
  germanWouldYouRatherQuestions?: Maybe<GermanWouldYouRatherQuestionsConnection>;
  /** Reads and enables pagination through a set of `EnglishWouldYouRatherQuestion`. */
  englishWouldYouRatherQuestions?: Maybe<EnglishWouldYouRatherQuestionsConnection>;
  /** Reads and enables pagination through a set of `SpanishWouldYouRatherQuestion`. */
  spanishWouldYouRatherQuestions?: Maybe<SpanishWouldYouRatherQuestionsConnection>;
  /** Reads and enables pagination through a set of `FrenchWouldYouRatherQuestion`. */
  frenchWouldYouRatherQuestions?: Maybe<FrenchWouldYouRatherQuestionsConnection>;
  /** Reads and enables pagination through a set of `ItalianWouldYouRatherQuestion`. */
  italianWouldYouRatherQuestions?: Maybe<ItalianWouldYouRatherQuestionsConnection>;
  /** Reads and enables pagination through a set of `JapaneseWouldYouRatherQuestion`. */
  japaneseWouldYouRatherQuestions?: Maybe<JapaneseWouldYouRatherQuestionsConnection>;
  /** Reads and enables pagination through a set of `KoreanWouldYouRatherQuestion`. */
  koreanWouldYouRatherQuestions?: Maybe<KoreanWouldYouRatherQuestionsConnection>;
  /** Reads and enables pagination through a set of `PortugueseWouldYouRatherQuestion`. */
  portugueseWouldYouRatherQuestions?: Maybe<PortugueseWouldYouRatherQuestionsConnection>;
  /** Reads and enables pagination through a set of `RussianWouldYouRatherQuestion`. */
  russianWouldYouRatherQuestions?: Maybe<RussianWouldYouRatherQuestionsConnection>;
  /** Reads and enables pagination through a set of `ChineseWouldYouRatherQuestion`. */
  chineseWouldYouRatherQuestions?: Maybe<ChineseWouldYouRatherQuestionsConnection>;
  groupUser?: Maybe<GroupUser>;
  group?: Maybe<Group>;
  groupByUuid?: Maybe<Group>;
  chineseGuessCharacterQuestion?: Maybe<ChineseGuessCharacterQuestion>;
  chineseGuessCharacterQuestionByUuid?: Maybe<ChineseGuessCharacterQuestion>;
  inviteToken?: Maybe<InviteToken>;
  languageSkillLevel?: Maybe<LanguageSkillLevel>;
  language?: Maybe<Language>;
  languageByAlpha2?: Maybe<Language>;
  languageByEnglishName?: Maybe<Language>;
  messagePreview?: Maybe<MessagePreview>;
  messagePreviewByUuid?: Maybe<MessagePreview>;
  message?: Maybe<Message>;
  messageByUuid?: Maybe<Message>;
  notificationChannel?: Maybe<NotificationChannel>;
  notificationChannelByUuid?: Maybe<NotificationChannel>;
  notificationChannelByName?: Maybe<NotificationChannel>;
  notification?: Maybe<Notification>;
  notificationByUuid?: Maybe<Notification>;
  postLike?: Maybe<PostLike>;
  postRecording?: Maybe<PostRecording>;
  postRecordingByUuid?: Maybe<PostRecording>;
  post?: Maybe<Post>;
  postByUuid?: Maybe<Post>;
  prompt?: Maybe<Prompt>;
  promptByUuid?: Maybe<Prompt>;
  germanRandomQuestion?: Maybe<GermanRandomQuestion>;
  germanRandomQuestionByUuid?: Maybe<GermanRandomQuestion>;
  englishRandomQuestion?: Maybe<EnglishRandomQuestion>;
  englishRandomQuestionByUuid?: Maybe<EnglishRandomQuestion>;
  spanishRandomQuestion?: Maybe<SpanishRandomQuestion>;
  spanishRandomQuestionByUuid?: Maybe<SpanishRandomQuestion>;
  frenchRandomQuestion?: Maybe<FrenchRandomQuestion>;
  frenchRandomQuestionByUuid?: Maybe<FrenchRandomQuestion>;
  italianRandomQuestion?: Maybe<ItalianRandomQuestion>;
  italianRandomQuestionByUuid?: Maybe<ItalianRandomQuestion>;
  japaneseRandomQuestion?: Maybe<JapaneseRandomQuestion>;
  japaneseRandomQuestionByUuid?: Maybe<JapaneseRandomQuestion>;
  koreanRandomQuestion?: Maybe<KoreanRandomQuestion>;
  koreanRandomQuestionByUuid?: Maybe<KoreanRandomQuestion>;
  portugueseRandomQuestion?: Maybe<PortugueseRandomQuestion>;
  portugueseRandomQuestionByUuid?: Maybe<PortugueseRandomQuestion>;
  russianRandomQuestion?: Maybe<RussianRandomQuestion>;
  russianRandomQuestionByUuid?: Maybe<RussianRandomQuestion>;
  chineseRandomQuestion?: Maybe<ChineseRandomQuestion>;
  chineseRandomQuestionByUuid?: Maybe<ChineseRandomQuestion>;
  userDevice?: Maybe<UserDevice>;
  userDeviceByUuid?: Maybe<UserDevice>;
  userDeviceByFcmToken?: Maybe<UserDevice>;
  userFollower?: Maybe<UserFollower>;
  userLanguage?: Maybe<UserLanguage>;
  userPreference?: Maybe<UserPreference>;
  userPreferenceByUserId?: Maybe<UserPreference>;
  userSession?: Maybe<UserSession>;
  user?: Maybe<User>;
  userByUsername?: Maybe<User>;
  userByEmail?: Maybe<User>;
  userByUuid?: Maybe<User>;
  userByEmailUnsubscribeToken?: Maybe<User>;
  germanWord?: Maybe<GermanWord>;
  germanWordByUuid?: Maybe<GermanWord>;
  englishWord?: Maybe<EnglishWord>;
  englishWordByUuid?: Maybe<EnglishWord>;
  spanishWord?: Maybe<SpanishWord>;
  spanishWordByUuid?: Maybe<SpanishWord>;
  frenchWord?: Maybe<FrenchWord>;
  frenchWordByUuid?: Maybe<FrenchWord>;
  italianWord?: Maybe<ItalianWord>;
  italianWordByUuid?: Maybe<ItalianWord>;
  portugueseWord?: Maybe<PortugueseWord>;
  portugueseWordByUuid?: Maybe<PortugueseWord>;
  russianWord?: Maybe<RussianWord>;
  russianWordByUuid?: Maybe<RussianWord>;
  germanWouldYouRatherQuestion?: Maybe<GermanWouldYouRatherQuestion>;
  germanWouldYouRatherQuestionByUuid?: Maybe<GermanWouldYouRatherQuestion>;
  englishWouldYouRatherQuestion?: Maybe<EnglishWouldYouRatherQuestion>;
  englishWouldYouRatherQuestionByUuid?: Maybe<EnglishWouldYouRatherQuestion>;
  spanishWouldYouRatherQuestion?: Maybe<SpanishWouldYouRatherQuestion>;
  spanishWouldYouRatherQuestionByUuid?: Maybe<SpanishWouldYouRatherQuestion>;
  frenchWouldYouRatherQuestion?: Maybe<FrenchWouldYouRatherQuestion>;
  frenchWouldYouRatherQuestionByUuid?: Maybe<FrenchWouldYouRatherQuestion>;
  italianWouldYouRatherQuestion?: Maybe<ItalianWouldYouRatherQuestion>;
  italianWouldYouRatherQuestionByUuid?: Maybe<ItalianWouldYouRatherQuestion>;
  japaneseWouldYouRatherQuestion?: Maybe<JapaneseWouldYouRatherQuestion>;
  japaneseWouldYouRatherQuestionByUuid?: Maybe<JapaneseWouldYouRatherQuestion>;
  koreanWouldYouRatherQuestion?: Maybe<KoreanWouldYouRatherQuestion>;
  koreanWouldYouRatherQuestionByUuid?: Maybe<KoreanWouldYouRatherQuestion>;
  portugueseWouldYouRatherQuestion?: Maybe<PortugueseWouldYouRatherQuestion>;
  portugueseWouldYouRatherQuestionByUuid?: Maybe<PortugueseWouldYouRatherQuestion>;
  russianWouldYouRatherQuestion?: Maybe<RussianWouldYouRatherQuestion>;
  russianWouldYouRatherQuestionByUuid?: Maybe<RussianWouldYouRatherQuestion>;
  chineseWouldYouRatherQuestion?: Maybe<ChineseWouldYouRatherQuestion>;
  chineseWouldYouRatherQuestionByUuid?: Maybe<ChineseWouldYouRatherQuestion>;
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
  /** Reads a single `ChineseGuessCharacterQuestion` using its globally unique `ID`. */
  chineseGuessCharacterQuestionByNodeId?: Maybe<ChineseGuessCharacterQuestion>;
  /** Reads a single `InviteToken` using its globally unique `ID`. */
  inviteTokenByNodeId?: Maybe<InviteToken>;
  /** Reads a single `LanguageSkillLevel` using its globally unique `ID`. */
  languageSkillLevelByNodeId?: Maybe<LanguageSkillLevel>;
  /** Reads a single `Language` using its globally unique `ID`. */
  languageByNodeId?: Maybe<Language>;
  /** Reads a single `MessagePreview` using its globally unique `ID`. */
  messagePreviewByNodeId?: Maybe<MessagePreview>;
  /** Reads a single `Message` using its globally unique `ID`. */
  messageByNodeId?: Maybe<Message>;
  /** Reads a single `NotificationChannel` using its globally unique `ID`. */
  notificationChannelByNodeId?: Maybe<NotificationChannel>;
  /** Reads a single `Notification` using its globally unique `ID`. */
  notificationByNodeId?: Maybe<Notification>;
  /** Reads a single `PostLike` using its globally unique `ID`. */
  postLikeByNodeId?: Maybe<PostLike>;
  /** Reads a single `PostRecording` using its globally unique `ID`. */
  postRecordingByNodeId?: Maybe<PostRecording>;
  /** Reads a single `Post` using its globally unique `ID`. */
  postByNodeId?: Maybe<Post>;
  /** Reads a single `Prompt` using its globally unique `ID`. */
  promptByNodeId?: Maybe<Prompt>;
  /** Reads a single `GermanRandomQuestion` using its globally unique `ID`. */
  germanRandomQuestionByNodeId?: Maybe<GermanRandomQuestion>;
  /** Reads a single `EnglishRandomQuestion` using its globally unique `ID`. */
  englishRandomQuestionByNodeId?: Maybe<EnglishRandomQuestion>;
  /** Reads a single `SpanishRandomQuestion` using its globally unique `ID`. */
  spanishRandomQuestionByNodeId?: Maybe<SpanishRandomQuestion>;
  /** Reads a single `FrenchRandomQuestion` using its globally unique `ID`. */
  frenchRandomQuestionByNodeId?: Maybe<FrenchRandomQuestion>;
  /** Reads a single `ItalianRandomQuestion` using its globally unique `ID`. */
  italianRandomQuestionByNodeId?: Maybe<ItalianRandomQuestion>;
  /** Reads a single `JapaneseRandomQuestion` using its globally unique `ID`. */
  japaneseRandomQuestionByNodeId?: Maybe<JapaneseRandomQuestion>;
  /** Reads a single `KoreanRandomQuestion` using its globally unique `ID`. */
  koreanRandomQuestionByNodeId?: Maybe<KoreanRandomQuestion>;
  /** Reads a single `PortugueseRandomQuestion` using its globally unique `ID`. */
  portugueseRandomQuestionByNodeId?: Maybe<PortugueseRandomQuestion>;
  /** Reads a single `RussianRandomQuestion` using its globally unique `ID`. */
  russianRandomQuestionByNodeId?: Maybe<RussianRandomQuestion>;
  /** Reads a single `ChineseRandomQuestion` using its globally unique `ID`. */
  chineseRandomQuestionByNodeId?: Maybe<ChineseRandomQuestion>;
  /** Reads a single `UserDevice` using its globally unique `ID`. */
  userDeviceByNodeId?: Maybe<UserDevice>;
  /** Reads a single `UserFollower` using its globally unique `ID`. */
  userFollowerByNodeId?: Maybe<UserFollower>;
  /** Reads a single `UserLanguage` using its globally unique `ID`. */
  userLanguageByNodeId?: Maybe<UserLanguage>;
  /** Reads a single `UserPreference` using its globally unique `ID`. */
  userPreferenceByNodeId?: Maybe<UserPreference>;
  /** Reads a single `UserSession` using its globally unique `ID`. */
  userSessionByNodeId?: Maybe<UserSession>;
  /** Reads a single `User` using its globally unique `ID`. */
  userByNodeId?: Maybe<User>;
  /** Reads a single `GermanWord` using its globally unique `ID`. */
  germanWordByNodeId?: Maybe<GermanWord>;
  /** Reads a single `EnglishWord` using its globally unique `ID`. */
  englishWordByNodeId?: Maybe<EnglishWord>;
  /** Reads a single `SpanishWord` using its globally unique `ID`. */
  spanishWordByNodeId?: Maybe<SpanishWord>;
  /** Reads a single `FrenchWord` using its globally unique `ID`. */
  frenchWordByNodeId?: Maybe<FrenchWord>;
  /** Reads a single `ItalianWord` using its globally unique `ID`. */
  italianWordByNodeId?: Maybe<ItalianWord>;
  /** Reads a single `PortugueseWord` using its globally unique `ID`. */
  portugueseWordByNodeId?: Maybe<PortugueseWord>;
  /** Reads a single `RussianWord` using its globally unique `ID`. */
  russianWordByNodeId?: Maybe<RussianWord>;
  /** Reads a single `GermanWouldYouRatherQuestion` using its globally unique `ID`. */
  germanWouldYouRatherQuestionByNodeId?: Maybe<GermanWouldYouRatherQuestion>;
  /** Reads a single `EnglishWouldYouRatherQuestion` using its globally unique `ID`. */
  englishWouldYouRatherQuestionByNodeId?: Maybe<EnglishWouldYouRatherQuestion>;
  /** Reads a single `SpanishWouldYouRatherQuestion` using its globally unique `ID`. */
  spanishWouldYouRatherQuestionByNodeId?: Maybe<SpanishWouldYouRatherQuestion>;
  /** Reads a single `FrenchWouldYouRatherQuestion` using its globally unique `ID`. */
  frenchWouldYouRatherQuestionByNodeId?: Maybe<FrenchWouldYouRatherQuestion>;
  /** Reads a single `ItalianWouldYouRatherQuestion` using its globally unique `ID`. */
  italianWouldYouRatherQuestionByNodeId?: Maybe<ItalianWouldYouRatherQuestion>;
  /** Reads a single `JapaneseWouldYouRatherQuestion` using its globally unique `ID`. */
  japaneseWouldYouRatherQuestionByNodeId?: Maybe<JapaneseWouldYouRatherQuestion>;
  /** Reads a single `KoreanWouldYouRatherQuestion` using its globally unique `ID`. */
  koreanWouldYouRatherQuestionByNodeId?: Maybe<KoreanWouldYouRatherQuestion>;
  /** Reads a single `PortugueseWouldYouRatherQuestion` using its globally unique `ID`. */
  portugueseWouldYouRatherQuestionByNodeId?: Maybe<PortugueseWouldYouRatherQuestion>;
  /** Reads a single `RussianWouldYouRatherQuestion` using its globally unique `ID`. */
  russianWouldYouRatherQuestionByNodeId?: Maybe<RussianWouldYouRatherQuestion>;
  /** Reads a single `ChineseWouldYouRatherQuestion` using its globally unique `ID`. */
  chineseWouldYouRatherQuestionByNodeId?: Maybe<ChineseWouldYouRatherQuestion>;
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
export type QueryChineseGuessCharacterQuestionsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ChineseGuessCharacterQuestionsOrderBy>>;
  condition?: Maybe<ChineseGuessCharacterQuestionCondition>;
  filter?: Maybe<ChineseGuessCharacterQuestionFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryInviteTokensArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<InviteTokensOrderBy>>;
  condition?: Maybe<InviteTokenCondition>;
  filter?: Maybe<InviteTokenFilter>;
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
export type QueryMessagePreviewsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MessagePreviewsOrderBy>>;
  condition?: Maybe<MessagePreviewCondition>;
  filter?: Maybe<MessagePreviewFilter>;
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
export type QueryNotificationChannelsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<NotificationChannelsOrderBy>>;
  condition?: Maybe<NotificationChannelCondition>;
  filter?: Maybe<NotificationChannelFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNotificationsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<NotificationsOrderBy>>;
  condition?: Maybe<NotificationCondition>;
  filter?: Maybe<NotificationFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryPostLikesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PostLikesOrderBy>>;
  condition?: Maybe<PostLikeCondition>;
  filter?: Maybe<PostLikeFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryPostRecordingsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PostRecordingsOrderBy>>;
  condition?: Maybe<PostRecordingCondition>;
  filter?: Maybe<PostRecordingFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryPostsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PostsOrderBy>>;
  condition?: Maybe<PostCondition>;
  filter?: Maybe<PostFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryPromptsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PromptsOrderBy>>;
  condition?: Maybe<PromptCondition>;
  filter?: Maybe<PromptFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGermanRandomQuestionsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<GermanRandomQuestionsOrderBy>>;
  condition?: Maybe<GermanRandomQuestionCondition>;
  filter?: Maybe<GermanRandomQuestionFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryEnglishRandomQuestionsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<EnglishRandomQuestionsOrderBy>>;
  condition?: Maybe<EnglishRandomQuestionCondition>;
  filter?: Maybe<EnglishRandomQuestionFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySpanishRandomQuestionsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<SpanishRandomQuestionsOrderBy>>;
  condition?: Maybe<SpanishRandomQuestionCondition>;
  filter?: Maybe<SpanishRandomQuestionFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryFrenchRandomQuestionsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<FrenchRandomQuestionsOrderBy>>;
  condition?: Maybe<FrenchRandomQuestionCondition>;
  filter?: Maybe<FrenchRandomQuestionFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryItalianRandomQuestionsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ItalianRandomQuestionsOrderBy>>;
  condition?: Maybe<ItalianRandomQuestionCondition>;
  filter?: Maybe<ItalianRandomQuestionFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryJapaneseRandomQuestionsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<JapaneseRandomQuestionsOrderBy>>;
  condition?: Maybe<JapaneseRandomQuestionCondition>;
  filter?: Maybe<JapaneseRandomQuestionFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryKoreanRandomQuestionsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<KoreanRandomQuestionsOrderBy>>;
  condition?: Maybe<KoreanRandomQuestionCondition>;
  filter?: Maybe<KoreanRandomQuestionFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryPortugueseRandomQuestionsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PortugueseRandomQuestionsOrderBy>>;
  condition?: Maybe<PortugueseRandomQuestionCondition>;
  filter?: Maybe<PortugueseRandomQuestionFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryRussianRandomQuestionsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<RussianRandomQuestionsOrderBy>>;
  condition?: Maybe<RussianRandomQuestionCondition>;
  filter?: Maybe<RussianRandomQuestionFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryChineseRandomQuestionsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ChineseRandomQuestionsOrderBy>>;
  condition?: Maybe<ChineseRandomQuestionCondition>;
  filter?: Maybe<ChineseRandomQuestionFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUserDevicesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UserDevicesOrderBy>>;
  condition?: Maybe<UserDeviceCondition>;
  filter?: Maybe<UserDeviceFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUserFollowersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UserFollowersOrderBy>>;
  condition?: Maybe<UserFollowerCondition>;
  filter?: Maybe<UserFollowerFilter>;
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
export type QueryUserPreferencesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UserPreferencesOrderBy>>;
  condition?: Maybe<UserPreferenceCondition>;
  filter?: Maybe<UserPreferenceFilter>;
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
export type QueryGermanWordsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<GermanWordsOrderBy>>;
  condition?: Maybe<GermanWordCondition>;
  filter?: Maybe<GermanWordFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryEnglishWordsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<EnglishWordsOrderBy>>;
  condition?: Maybe<EnglishWordCondition>;
  filter?: Maybe<EnglishWordFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySpanishWordsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<SpanishWordsOrderBy>>;
  condition?: Maybe<SpanishWordCondition>;
  filter?: Maybe<SpanishWordFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryFrenchWordsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<FrenchWordsOrderBy>>;
  condition?: Maybe<FrenchWordCondition>;
  filter?: Maybe<FrenchWordFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryItalianWordsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ItalianWordsOrderBy>>;
  condition?: Maybe<ItalianWordCondition>;
  filter?: Maybe<ItalianWordFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryPortugueseWordsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PortugueseWordsOrderBy>>;
  condition?: Maybe<PortugueseWordCondition>;
  filter?: Maybe<PortugueseWordFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryRussianWordsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<RussianWordsOrderBy>>;
  condition?: Maybe<RussianWordCondition>;
  filter?: Maybe<RussianWordFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGermanWouldYouRatherQuestionsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<GermanWouldYouRatherQuestionsOrderBy>>;
  condition?: Maybe<GermanWouldYouRatherQuestionCondition>;
  filter?: Maybe<GermanWouldYouRatherQuestionFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryEnglishWouldYouRatherQuestionsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<EnglishWouldYouRatherQuestionsOrderBy>>;
  condition?: Maybe<EnglishWouldYouRatherQuestionCondition>;
  filter?: Maybe<EnglishWouldYouRatherQuestionFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySpanishWouldYouRatherQuestionsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<SpanishWouldYouRatherQuestionsOrderBy>>;
  condition?: Maybe<SpanishWouldYouRatherQuestionCondition>;
  filter?: Maybe<SpanishWouldYouRatherQuestionFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryFrenchWouldYouRatherQuestionsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<FrenchWouldYouRatherQuestionsOrderBy>>;
  condition?: Maybe<FrenchWouldYouRatherQuestionCondition>;
  filter?: Maybe<FrenchWouldYouRatherQuestionFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryItalianWouldYouRatherQuestionsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ItalianWouldYouRatherQuestionsOrderBy>>;
  condition?: Maybe<ItalianWouldYouRatherQuestionCondition>;
  filter?: Maybe<ItalianWouldYouRatherQuestionFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryJapaneseWouldYouRatherQuestionsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<JapaneseWouldYouRatherQuestionsOrderBy>>;
  condition?: Maybe<JapaneseWouldYouRatherQuestionCondition>;
  filter?: Maybe<JapaneseWouldYouRatherQuestionFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryKoreanWouldYouRatherQuestionsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<KoreanWouldYouRatherQuestionsOrderBy>>;
  condition?: Maybe<KoreanWouldYouRatherQuestionCondition>;
  filter?: Maybe<KoreanWouldYouRatherQuestionFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryPortugueseWouldYouRatherQuestionsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PortugueseWouldYouRatherQuestionsOrderBy>>;
  condition?: Maybe<PortugueseWouldYouRatherQuestionCondition>;
  filter?: Maybe<PortugueseWouldYouRatherQuestionFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryRussianWouldYouRatherQuestionsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<RussianWouldYouRatherQuestionsOrderBy>>;
  condition?: Maybe<RussianWouldYouRatherQuestionCondition>;
  filter?: Maybe<RussianWouldYouRatherQuestionFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryChineseWouldYouRatherQuestionsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ChineseWouldYouRatherQuestionsOrderBy>>;
  condition?: Maybe<ChineseWouldYouRatherQuestionCondition>;
  filter?: Maybe<ChineseWouldYouRatherQuestionFilter>;
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
export type QueryChineseGuessCharacterQuestionArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryChineseGuessCharacterQuestionByUuidArgs = {
  uuid: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryInviteTokenArgs = {
  id: Scalars['Int'];
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
export type QueryMessagePreviewArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMessagePreviewByUuidArgs = {
  uuid: Scalars['UUID'];
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
export type QueryNotificationChannelArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryNotificationChannelByUuidArgs = {
  uuid: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryNotificationChannelByNameArgs = {
  name: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryNotificationArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryNotificationByUuidArgs = {
  uuid: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPostLikeArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPostRecordingArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPostRecordingByUuidArgs = {
  uuid: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPostArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPostByUuidArgs = {
  uuid: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPromptArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPromptByUuidArgs = {
  uuid: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGermanRandomQuestionArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGermanRandomQuestionByUuidArgs = {
  uuid: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEnglishRandomQuestionArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEnglishRandomQuestionByUuidArgs = {
  uuid: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySpanishRandomQuestionArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySpanishRandomQuestionByUuidArgs = {
  uuid: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryFrenchRandomQuestionArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryFrenchRandomQuestionByUuidArgs = {
  uuid: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryItalianRandomQuestionArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryItalianRandomQuestionByUuidArgs = {
  uuid: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryJapaneseRandomQuestionArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryJapaneseRandomQuestionByUuidArgs = {
  uuid: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryKoreanRandomQuestionArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryKoreanRandomQuestionByUuidArgs = {
  uuid: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPortugueseRandomQuestionArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPortugueseRandomQuestionByUuidArgs = {
  uuid: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRussianRandomQuestionArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRussianRandomQuestionByUuidArgs = {
  uuid: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryChineseRandomQuestionArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryChineseRandomQuestionByUuidArgs = {
  uuid: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserDeviceArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserDeviceByUuidArgs = {
  uuid: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserDeviceByFcmTokenArgs = {
  fcmToken: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserFollowerArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserLanguageArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserPreferenceArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserPreferenceByUserIdArgs = {
  userId: Scalars['Int'];
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
export type QueryUserByUsernameArgs = {
  username: Scalars['String'];
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
export type QueryUserByEmailUnsubscribeTokenArgs = {
  emailUnsubscribeToken: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGermanWordArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGermanWordByUuidArgs = {
  uuid: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEnglishWordArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEnglishWordByUuidArgs = {
  uuid: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySpanishWordArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySpanishWordByUuidArgs = {
  uuid: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryFrenchWordArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryFrenchWordByUuidArgs = {
  uuid: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryItalianWordArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryItalianWordByUuidArgs = {
  uuid: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPortugueseWordArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPortugueseWordByUuidArgs = {
  uuid: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRussianWordArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRussianWordByUuidArgs = {
  uuid: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGermanWouldYouRatherQuestionArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGermanWouldYouRatherQuestionByUuidArgs = {
  uuid: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEnglishWouldYouRatherQuestionArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEnglishWouldYouRatherQuestionByUuidArgs = {
  uuid: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySpanishWouldYouRatherQuestionArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySpanishWouldYouRatherQuestionByUuidArgs = {
  uuid: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryFrenchWouldYouRatherQuestionArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryFrenchWouldYouRatherQuestionByUuidArgs = {
  uuid: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryItalianWouldYouRatherQuestionArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryItalianWouldYouRatherQuestionByUuidArgs = {
  uuid: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryJapaneseWouldYouRatherQuestionArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryJapaneseWouldYouRatherQuestionByUuidArgs = {
  uuid: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryKoreanWouldYouRatherQuestionArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryKoreanWouldYouRatherQuestionByUuidArgs = {
  uuid: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPortugueseWouldYouRatherQuestionArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPortugueseWouldYouRatherQuestionByUuidArgs = {
  uuid: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRussianWouldYouRatherQuestionArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRussianWouldYouRatherQuestionByUuidArgs = {
  uuid: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryChineseWouldYouRatherQuestionArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryChineseWouldYouRatherQuestionByUuidArgs = {
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
export type QueryChineseGuessCharacterQuestionByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryInviteTokenByNodeIdArgs = {
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
export type QueryMessagePreviewByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMessageByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryNotificationChannelByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryNotificationByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPostLikeByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPostRecordingByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPostByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPromptByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGermanRandomQuestionByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEnglishRandomQuestionByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySpanishRandomQuestionByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryFrenchRandomQuestionByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryItalianRandomQuestionByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryJapaneseRandomQuestionByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryKoreanRandomQuestionByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPortugueseRandomQuestionByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRussianRandomQuestionByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryChineseRandomQuestionByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserDeviceByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserFollowerByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserLanguageByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserPreferenceByNodeIdArgs = {
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


/** The root query type which gives access points into the data universe. */
export type QueryGermanWordByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEnglishWordByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySpanishWordByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryFrenchWordByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryItalianWordByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPortugueseWordByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRussianWordByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGermanWouldYouRatherQuestionByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEnglishWouldYouRatherQuestionByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySpanishWouldYouRatherQuestionByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryFrenchWouldYouRatherQuestionByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryItalianWouldYouRatherQuestionByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryJapaneseWouldYouRatherQuestionByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryKoreanWouldYouRatherQuestionByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPortugueseWouldYouRatherQuestionByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryRussianWouldYouRatherQuestionByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryChineseWouldYouRatherQuestionByNodeIdArgs = {
  nodeId: Scalars['ID'];
};

/** All input for the `registerUserActivity` mutation. */
export type RegisterUserActivityInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  userId: Scalars['Int'];
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

export type RussianRandomQuestion = Node & {
  __typename?: 'RussianRandomQuestion';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  uuid: Scalars['UUID'];
  question: Scalars['String'];
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['Datetime'];
  /** Reads a single `LanguageSkillLevel` that is related to this `RussianRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
};

/**
 * A condition to be used against `RussianRandomQuestion` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type RussianRandomQuestionCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `uuid` field. */
  uuid?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `question` field. */
  question?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `RussianRandomQuestion` object types. All fields are combined with a logical ‘and.’ */
export type RussianRandomQuestionFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `uuid` field. */
  uuid?: Maybe<UuidFilter>;
  /** Filter by the object’s `question` field. */
  question?: Maybe<StringFilter>;
  /** Filter by the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<IntFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<RussianRandomQuestionFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<RussianRandomQuestionFilter>>;
  /** Negates the expression. */
  not?: Maybe<RussianRandomQuestionFilter>;
};

/** An input for mutations affecting `RussianRandomQuestion` */
export type RussianRandomQuestionInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  question: Scalars['String'];
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** Represents an update to a `RussianRandomQuestion`. Fields that are set will be updated. */
export type RussianRandomQuestionPatch = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  question?: Maybe<Scalars['String']>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `RussianRandomQuestion` values. */
export type RussianRandomQuestionsConnection = {
  __typename?: 'RussianRandomQuestionsConnection';
  /** A list of `RussianRandomQuestion` objects. */
  nodes: Array<Maybe<RussianRandomQuestion>>;
  /** A list of edges which contains the `RussianRandomQuestion` and cursor to aid in pagination. */
  edges: Array<RussianRandomQuestionsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `RussianRandomQuestion` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `RussianRandomQuestion` edge in the connection. */
export type RussianRandomQuestionsEdge = {
  __typename?: 'RussianRandomQuestionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `RussianRandomQuestion` at the end of the edge. */
  node?: Maybe<RussianRandomQuestion>;
};

/** Methods to use when ordering `RussianRandomQuestion`. */
export enum RussianRandomQuestionsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UuidAsc = 'UUID_ASC',
  UuidDesc = 'UUID_DESC',
  QuestionAsc = 'QUESTION_ASC',
  QuestionDesc = 'QUESTION_DESC',
  RecommendedSkillLevelIdAsc = 'RECOMMENDED_SKILL_LEVEL_ID_ASC',
  RecommendedSkillLevelIdDesc = 'RECOMMENDED_SKILL_LEVEL_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type RussianWord = Node & {
  __typename?: 'RussianWord';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  uuid: Scalars['UUID'];
  word: Scalars['String'];
  /** Ranges from 0 to 1 (higher is more frequent) */
  frequency: Scalars['Float'];
  length?: Maybe<Scalars['Int']>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['Datetime'];
  /** Reads a single `LanguageSkillLevel` that is related to this `RussianWord`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
};

/**
 * A condition to be used against `RussianWord` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type RussianWordCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `uuid` field. */
  uuid?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `word` field. */
  word?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `frequency` field. */
  frequency?: Maybe<Scalars['Float']>;
  /** Checks for equality with the object’s `length` field. */
  length?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `RussianWord` object types. All fields are combined with a logical ‘and.’ */
export type RussianWordFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `uuid` field. */
  uuid?: Maybe<UuidFilter>;
  /** Filter by the object’s `word` field. */
  word?: Maybe<StringFilter>;
  /** Filter by the object’s `frequency` field. */
  frequency?: Maybe<FloatFilter>;
  /** Filter by the object’s `length` field. */
  length?: Maybe<IntFilter>;
  /** Filter by the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<IntFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<RussianWordFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<RussianWordFilter>>;
  /** Negates the expression. */
  not?: Maybe<RussianWordFilter>;
};

/** An input for mutations affecting `RussianWord` */
export type RussianWordInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  word: Scalars['String'];
  /** Ranges from 0 to 1 (higher is more frequent) */
  frequency: Scalars['Float'];
  length?: Maybe<Scalars['Int']>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** Represents an update to a `RussianWord`. Fields that are set will be updated. */
export type RussianWordPatch = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  word?: Maybe<Scalars['String']>;
  /** Ranges from 0 to 1 (higher is more frequent) */
  frequency?: Maybe<Scalars['Float']>;
  length?: Maybe<Scalars['Int']>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `RussianWord` values. */
export type RussianWordsConnection = {
  __typename?: 'RussianWordsConnection';
  /** A list of `RussianWord` objects. */
  nodes: Array<Maybe<RussianWord>>;
  /** A list of edges which contains the `RussianWord` and cursor to aid in pagination. */
  edges: Array<RussianWordsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `RussianWord` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `RussianWord` edge in the connection. */
export type RussianWordsEdge = {
  __typename?: 'RussianWordsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `RussianWord` at the end of the edge. */
  node?: Maybe<RussianWord>;
};

/** Methods to use when ordering `RussianWord`. */
export enum RussianWordsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UuidAsc = 'UUID_ASC',
  UuidDesc = 'UUID_DESC',
  WordAsc = 'WORD_ASC',
  WordDesc = 'WORD_DESC',
  FrequencyAsc = 'FREQUENCY_ASC',
  FrequencyDesc = 'FREQUENCY_DESC',
  LengthAsc = 'LENGTH_ASC',
  LengthDesc = 'LENGTH_DESC',
  RecommendedSkillLevelIdAsc = 'RECOMMENDED_SKILL_LEVEL_ID_ASC',
  RecommendedSkillLevelIdDesc = 'RECOMMENDED_SKILL_LEVEL_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type RussianWouldYouRatherQuestion = Node & {
  __typename?: 'RussianWouldYouRatherQuestion';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  uuid: Scalars['UUID'];
  question: Scalars['String'];
  answers: Array<Maybe<Scalars['String']>>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['Datetime'];
  /** Reads a single `LanguageSkillLevel` that is related to this `RussianWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
};

/**
 * A condition to be used against `RussianWouldYouRatherQuestion` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type RussianWouldYouRatherQuestionCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `uuid` field. */
  uuid?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `question` field. */
  question?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `answers` field. */
  answers?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Checks for equality with the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `RussianWouldYouRatherQuestion` object types. All fields are combined with a logical ‘and.’ */
export type RussianWouldYouRatherQuestionFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `uuid` field. */
  uuid?: Maybe<UuidFilter>;
  /** Filter by the object’s `question` field. */
  question?: Maybe<StringFilter>;
  /** Filter by the object’s `answers` field. */
  answers?: Maybe<StringListFilter>;
  /** Filter by the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<IntFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<RussianWouldYouRatherQuestionFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<RussianWouldYouRatherQuestionFilter>>;
  /** Negates the expression. */
  not?: Maybe<RussianWouldYouRatherQuestionFilter>;
};

/** An input for mutations affecting `RussianWouldYouRatherQuestion` */
export type RussianWouldYouRatherQuestionInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  question: Scalars['String'];
  answers: Array<Maybe<Scalars['String']>>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** Represents an update to a `RussianWouldYouRatherQuestion`. Fields that are set will be updated. */
export type RussianWouldYouRatherQuestionPatch = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  question?: Maybe<Scalars['String']>;
  answers?: Maybe<Array<Maybe<Scalars['String']>>>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `RussianWouldYouRatherQuestion` values. */
export type RussianWouldYouRatherQuestionsConnection = {
  __typename?: 'RussianWouldYouRatherQuestionsConnection';
  /** A list of `RussianWouldYouRatherQuestion` objects. */
  nodes: Array<Maybe<RussianWouldYouRatherQuestion>>;
  /** A list of edges which contains the `RussianWouldYouRatherQuestion` and cursor to aid in pagination. */
  edges: Array<RussianWouldYouRatherQuestionsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `RussianWouldYouRatherQuestion` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `RussianWouldYouRatherQuestion` edge in the connection. */
export type RussianWouldYouRatherQuestionsEdge = {
  __typename?: 'RussianWouldYouRatherQuestionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `RussianWouldYouRatherQuestion` at the end of the edge. */
  node?: Maybe<RussianWouldYouRatherQuestion>;
};

/** Methods to use when ordering `RussianWouldYouRatherQuestion`. */
export enum RussianWouldYouRatherQuestionsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UuidAsc = 'UUID_ASC',
  UuidDesc = 'UUID_DESC',
  QuestionAsc = 'QUESTION_ASC',
  QuestionDesc = 'QUESTION_DESC',
  AnswersAsc = 'ANSWERS_ASC',
  AnswersDesc = 'ANSWERS_DESC',
  RecommendedSkillLevelIdAsc = 'RECOMMENDED_SKILL_LEVEL_ID_ASC',
  RecommendedSkillLevelIdDesc = 'RECOMMENDED_SKILL_LEVEL_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type SpanishRandomQuestion = Node & {
  __typename?: 'SpanishRandomQuestion';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  uuid: Scalars['UUID'];
  question: Scalars['String'];
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['Datetime'];
  /** Reads a single `LanguageSkillLevel` that is related to this `SpanishRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
};

/**
 * A condition to be used against `SpanishRandomQuestion` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type SpanishRandomQuestionCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `uuid` field. */
  uuid?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `question` field. */
  question?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `SpanishRandomQuestion` object types. All fields are combined with a logical ‘and.’ */
export type SpanishRandomQuestionFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `uuid` field. */
  uuid?: Maybe<UuidFilter>;
  /** Filter by the object’s `question` field. */
  question?: Maybe<StringFilter>;
  /** Filter by the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<IntFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<SpanishRandomQuestionFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<SpanishRandomQuestionFilter>>;
  /** Negates the expression. */
  not?: Maybe<SpanishRandomQuestionFilter>;
};

/** An input for mutations affecting `SpanishRandomQuestion` */
export type SpanishRandomQuestionInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  question: Scalars['String'];
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** Represents an update to a `SpanishRandomQuestion`. Fields that are set will be updated. */
export type SpanishRandomQuestionPatch = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  question?: Maybe<Scalars['String']>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `SpanishRandomQuestion` values. */
export type SpanishRandomQuestionsConnection = {
  __typename?: 'SpanishRandomQuestionsConnection';
  /** A list of `SpanishRandomQuestion` objects. */
  nodes: Array<Maybe<SpanishRandomQuestion>>;
  /** A list of edges which contains the `SpanishRandomQuestion` and cursor to aid in pagination. */
  edges: Array<SpanishRandomQuestionsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `SpanishRandomQuestion` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `SpanishRandomQuestion` edge in the connection. */
export type SpanishRandomQuestionsEdge = {
  __typename?: 'SpanishRandomQuestionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `SpanishRandomQuestion` at the end of the edge. */
  node?: Maybe<SpanishRandomQuestion>;
};

/** Methods to use when ordering `SpanishRandomQuestion`. */
export enum SpanishRandomQuestionsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UuidAsc = 'UUID_ASC',
  UuidDesc = 'UUID_DESC',
  QuestionAsc = 'QUESTION_ASC',
  QuestionDesc = 'QUESTION_DESC',
  RecommendedSkillLevelIdAsc = 'RECOMMENDED_SKILL_LEVEL_ID_ASC',
  RecommendedSkillLevelIdDesc = 'RECOMMENDED_SKILL_LEVEL_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type SpanishWord = Node & {
  __typename?: 'SpanishWord';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  uuid: Scalars['UUID'];
  word: Scalars['String'];
  /** Ranges from 0 to 1 (higher is more frequent) */
  frequency: Scalars['Float'];
  length?: Maybe<Scalars['Int']>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['Datetime'];
  /** Reads a single `LanguageSkillLevel` that is related to this `SpanishWord`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
};

/**
 * A condition to be used against `SpanishWord` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type SpanishWordCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `uuid` field. */
  uuid?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `word` field. */
  word?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `frequency` field. */
  frequency?: Maybe<Scalars['Float']>;
  /** Checks for equality with the object’s `length` field. */
  length?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `SpanishWord` object types. All fields are combined with a logical ‘and.’ */
export type SpanishWordFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `uuid` field. */
  uuid?: Maybe<UuidFilter>;
  /** Filter by the object’s `word` field. */
  word?: Maybe<StringFilter>;
  /** Filter by the object’s `frequency` field. */
  frequency?: Maybe<FloatFilter>;
  /** Filter by the object’s `length` field. */
  length?: Maybe<IntFilter>;
  /** Filter by the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<IntFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<SpanishWordFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<SpanishWordFilter>>;
  /** Negates the expression. */
  not?: Maybe<SpanishWordFilter>;
};

/** An input for mutations affecting `SpanishWord` */
export type SpanishWordInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  word: Scalars['String'];
  /** Ranges from 0 to 1 (higher is more frequent) */
  frequency: Scalars['Float'];
  length?: Maybe<Scalars['Int']>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** Represents an update to a `SpanishWord`. Fields that are set will be updated. */
export type SpanishWordPatch = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  word?: Maybe<Scalars['String']>;
  /** Ranges from 0 to 1 (higher is more frequent) */
  frequency?: Maybe<Scalars['Float']>;
  length?: Maybe<Scalars['Int']>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `SpanishWord` values. */
export type SpanishWordsConnection = {
  __typename?: 'SpanishWordsConnection';
  /** A list of `SpanishWord` objects. */
  nodes: Array<Maybe<SpanishWord>>;
  /** A list of edges which contains the `SpanishWord` and cursor to aid in pagination. */
  edges: Array<SpanishWordsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `SpanishWord` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `SpanishWord` edge in the connection. */
export type SpanishWordsEdge = {
  __typename?: 'SpanishWordsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `SpanishWord` at the end of the edge. */
  node?: Maybe<SpanishWord>;
};

/** Methods to use when ordering `SpanishWord`. */
export enum SpanishWordsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UuidAsc = 'UUID_ASC',
  UuidDesc = 'UUID_DESC',
  WordAsc = 'WORD_ASC',
  WordDesc = 'WORD_DESC',
  FrequencyAsc = 'FREQUENCY_ASC',
  FrequencyDesc = 'FREQUENCY_DESC',
  LengthAsc = 'LENGTH_ASC',
  LengthDesc = 'LENGTH_DESC',
  RecommendedSkillLevelIdAsc = 'RECOMMENDED_SKILL_LEVEL_ID_ASC',
  RecommendedSkillLevelIdDesc = 'RECOMMENDED_SKILL_LEVEL_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type SpanishWouldYouRatherQuestion = Node & {
  __typename?: 'SpanishWouldYouRatherQuestion';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  uuid: Scalars['UUID'];
  question: Scalars['String'];
  answers: Array<Maybe<Scalars['String']>>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['Datetime'];
  /** Reads a single `LanguageSkillLevel` that is related to this `SpanishWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
};

/**
 * A condition to be used against `SpanishWouldYouRatherQuestion` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type SpanishWouldYouRatherQuestionCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `uuid` field. */
  uuid?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `question` field. */
  question?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `answers` field. */
  answers?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Checks for equality with the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `SpanishWouldYouRatherQuestion` object types. All fields are combined with a logical ‘and.’ */
export type SpanishWouldYouRatherQuestionFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `uuid` field. */
  uuid?: Maybe<UuidFilter>;
  /** Filter by the object’s `question` field. */
  question?: Maybe<StringFilter>;
  /** Filter by the object’s `answers` field. */
  answers?: Maybe<StringListFilter>;
  /** Filter by the object’s `recommendedSkillLevelId` field. */
  recommendedSkillLevelId?: Maybe<IntFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<SpanishWouldYouRatherQuestionFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<SpanishWouldYouRatherQuestionFilter>>;
  /** Negates the expression. */
  not?: Maybe<SpanishWouldYouRatherQuestionFilter>;
};

/** An input for mutations affecting `SpanishWouldYouRatherQuestion` */
export type SpanishWouldYouRatherQuestionInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  question: Scalars['String'];
  answers: Array<Maybe<Scalars['String']>>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** Represents an update to a `SpanishWouldYouRatherQuestion`. Fields that are set will be updated. */
export type SpanishWouldYouRatherQuestionPatch = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  question?: Maybe<Scalars['String']>;
  answers?: Maybe<Array<Maybe<Scalars['String']>>>;
  recommendedSkillLevelId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `SpanishWouldYouRatherQuestion` values. */
export type SpanishWouldYouRatherQuestionsConnection = {
  __typename?: 'SpanishWouldYouRatherQuestionsConnection';
  /** A list of `SpanishWouldYouRatherQuestion` objects. */
  nodes: Array<Maybe<SpanishWouldYouRatherQuestion>>;
  /** A list of edges which contains the `SpanishWouldYouRatherQuestion` and cursor to aid in pagination. */
  edges: Array<SpanishWouldYouRatherQuestionsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `SpanishWouldYouRatherQuestion` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `SpanishWouldYouRatherQuestion` edge in the connection. */
export type SpanishWouldYouRatherQuestionsEdge = {
  __typename?: 'SpanishWouldYouRatherQuestionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `SpanishWouldYouRatherQuestion` at the end of the edge. */
  node?: Maybe<SpanishWouldYouRatherQuestion>;
};

/** Methods to use when ordering `SpanishWouldYouRatherQuestion`. */
export enum SpanishWouldYouRatherQuestionsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UuidAsc = 'UUID_ASC',
  UuidDesc = 'UUID_DESC',
  QuestionAsc = 'QUESTION_ASC',
  QuestionDesc = 'QUESTION_DESC',
  AnswersAsc = 'ANSWERS_ASC',
  AnswersDesc = 'ANSWERS_DESC',
  RecommendedSkillLevelIdAsc = 'RECOMMENDED_SKILL_LEVEL_ID_ASC',
  RecommendedSkillLevelIdDesc = 'RECOMMENDED_SKILL_LEVEL_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

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

/** A filter to be used against String List fields. All fields are combined with a logical ‘and.’ */
export type StringListFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Less than the specified value. */
  lessThan?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Contains the specified list of values. */
  contains?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Contained by the specified list of values. */
  containedBy?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Overlaps the specified list of values. */
  overlaps?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Any array item is equal to the specified value. */
  anyEqualTo?: Maybe<Scalars['String']>;
  /** Any array item is not equal to the specified value. */
  anyNotEqualTo?: Maybe<Scalars['String']>;
  /** Any array item is less than the specified value. */
  anyLessThan?: Maybe<Scalars['String']>;
  /** Any array item is less than or equal to the specified value. */
  anyLessThanOrEqualTo?: Maybe<Scalars['String']>;
  /** Any array item is greater than the specified value. */
  anyGreaterThan?: Maybe<Scalars['String']>;
  /** Any array item is greater than or equal to the specified value. */
  anyGreaterThanOrEqualTo?: Maybe<Scalars['String']>;
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

/** All input for the `updateChineseGuessCharacterQuestionByNodeId` mutation. */
export type UpdateChineseGuessCharacterQuestionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `ChineseGuessCharacterQuestion` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `ChineseGuessCharacterQuestion` being updated. */
  patch: ChineseGuessCharacterQuestionPatch;
};

/** All input for the `updateChineseGuessCharacterQuestionByUuid` mutation. */
export type UpdateChineseGuessCharacterQuestionByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `ChineseGuessCharacterQuestion` being updated. */
  patch: ChineseGuessCharacterQuestionPatch;
  uuid: Scalars['UUID'];
};

/** All input for the `updateChineseGuessCharacterQuestion` mutation. */
export type UpdateChineseGuessCharacterQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `ChineseGuessCharacterQuestion` being updated. */
  patch: ChineseGuessCharacterQuestionPatch;
  id: Scalars['Int'];
};

/** The output of our update `ChineseGuessCharacterQuestion` mutation. */
export type UpdateChineseGuessCharacterQuestionPayload = {
  __typename?: 'UpdateChineseGuessCharacterQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ChineseGuessCharacterQuestion` that was updated by this mutation. */
  chineseGuessCharacterQuestion?: Maybe<ChineseGuessCharacterQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `ChineseGuessCharacterQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `ChineseGuessCharacterQuestion`. May be used by Relay 1. */
  chineseGuessCharacterQuestionEdge?: Maybe<ChineseGuessCharacterQuestionsEdge>;
};


/** The output of our update `ChineseGuessCharacterQuestion` mutation. */
export type UpdateChineseGuessCharacterQuestionPayloadChineseGuessCharacterQuestionEdgeArgs = {
  orderBy?: Maybe<Array<ChineseGuessCharacterQuestionsOrderBy>>;
};

/** All input for the `updateChineseRandomQuestionByNodeId` mutation. */
export type UpdateChineseRandomQuestionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `ChineseRandomQuestion` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `ChineseRandomQuestion` being updated. */
  patch: ChineseRandomQuestionPatch;
};

/** All input for the `updateChineseRandomQuestionByUuid` mutation. */
export type UpdateChineseRandomQuestionByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `ChineseRandomQuestion` being updated. */
  patch: ChineseRandomQuestionPatch;
  uuid: Scalars['UUID'];
};

/** All input for the `updateChineseRandomQuestion` mutation. */
export type UpdateChineseRandomQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `ChineseRandomQuestion` being updated. */
  patch: ChineseRandomQuestionPatch;
  id: Scalars['Int'];
};

/** The output of our update `ChineseRandomQuestion` mutation. */
export type UpdateChineseRandomQuestionPayload = {
  __typename?: 'UpdateChineseRandomQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ChineseRandomQuestion` that was updated by this mutation. */
  chineseRandomQuestion?: Maybe<ChineseRandomQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `ChineseRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `ChineseRandomQuestion`. May be used by Relay 1. */
  chineseRandomQuestionEdge?: Maybe<ChineseRandomQuestionsEdge>;
};


/** The output of our update `ChineseRandomQuestion` mutation. */
export type UpdateChineseRandomQuestionPayloadChineseRandomQuestionEdgeArgs = {
  orderBy?: Maybe<Array<ChineseRandomQuestionsOrderBy>>;
};

/** All input for the `updateChineseWouldYouRatherQuestionByNodeId` mutation. */
export type UpdateChineseWouldYouRatherQuestionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `ChineseWouldYouRatherQuestion` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `ChineseWouldYouRatherQuestion` being updated. */
  patch: ChineseWouldYouRatherQuestionPatch;
};

/** All input for the `updateChineseWouldYouRatherQuestionByUuid` mutation. */
export type UpdateChineseWouldYouRatherQuestionByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `ChineseWouldYouRatherQuestion` being updated. */
  patch: ChineseWouldYouRatherQuestionPatch;
  uuid: Scalars['UUID'];
};

/** All input for the `updateChineseWouldYouRatherQuestion` mutation. */
export type UpdateChineseWouldYouRatherQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `ChineseWouldYouRatherQuestion` being updated. */
  patch: ChineseWouldYouRatherQuestionPatch;
  id: Scalars['Int'];
};

/** The output of our update `ChineseWouldYouRatherQuestion` mutation. */
export type UpdateChineseWouldYouRatherQuestionPayload = {
  __typename?: 'UpdateChineseWouldYouRatherQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ChineseWouldYouRatherQuestion` that was updated by this mutation. */
  chineseWouldYouRatherQuestion?: Maybe<ChineseWouldYouRatherQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `ChineseWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `ChineseWouldYouRatherQuestion`. May be used by Relay 1. */
  chineseWouldYouRatherQuestionEdge?: Maybe<ChineseWouldYouRatherQuestionsEdge>;
};


/** The output of our update `ChineseWouldYouRatherQuestion` mutation. */
export type UpdateChineseWouldYouRatherQuestionPayloadChineseWouldYouRatherQuestionEdgeArgs = {
  orderBy?: Maybe<Array<ChineseWouldYouRatherQuestionsOrderBy>>;
};

/** All input for the `updateEnglishRandomQuestionByNodeId` mutation. */
export type UpdateEnglishRandomQuestionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `EnglishRandomQuestion` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `EnglishRandomQuestion` being updated. */
  patch: EnglishRandomQuestionPatch;
};

/** All input for the `updateEnglishRandomQuestionByUuid` mutation. */
export type UpdateEnglishRandomQuestionByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `EnglishRandomQuestion` being updated. */
  patch: EnglishRandomQuestionPatch;
  uuid: Scalars['UUID'];
};

/** All input for the `updateEnglishRandomQuestion` mutation. */
export type UpdateEnglishRandomQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `EnglishRandomQuestion` being updated. */
  patch: EnglishRandomQuestionPatch;
  id: Scalars['Int'];
};

/** The output of our update `EnglishRandomQuestion` mutation. */
export type UpdateEnglishRandomQuestionPayload = {
  __typename?: 'UpdateEnglishRandomQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EnglishRandomQuestion` that was updated by this mutation. */
  englishRandomQuestion?: Maybe<EnglishRandomQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `EnglishRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `EnglishRandomQuestion`. May be used by Relay 1. */
  englishRandomQuestionEdge?: Maybe<EnglishRandomQuestionsEdge>;
};


/** The output of our update `EnglishRandomQuestion` mutation. */
export type UpdateEnglishRandomQuestionPayloadEnglishRandomQuestionEdgeArgs = {
  orderBy?: Maybe<Array<EnglishRandomQuestionsOrderBy>>;
};

/** All input for the `updateEnglishWordByNodeId` mutation. */
export type UpdateEnglishWordByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `EnglishWord` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `EnglishWord` being updated. */
  patch: EnglishWordPatch;
};

/** All input for the `updateEnglishWordByUuid` mutation. */
export type UpdateEnglishWordByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `EnglishWord` being updated. */
  patch: EnglishWordPatch;
  uuid: Scalars['UUID'];
};

/** All input for the `updateEnglishWord` mutation. */
export type UpdateEnglishWordInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `EnglishWord` being updated. */
  patch: EnglishWordPatch;
  id: Scalars['Int'];
};

/** The output of our update `EnglishWord` mutation. */
export type UpdateEnglishWordPayload = {
  __typename?: 'UpdateEnglishWordPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EnglishWord` that was updated by this mutation. */
  englishWord?: Maybe<EnglishWord>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `EnglishWord`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `EnglishWord`. May be used by Relay 1. */
  englishWordEdge?: Maybe<EnglishWordsEdge>;
};


/** The output of our update `EnglishWord` mutation. */
export type UpdateEnglishWordPayloadEnglishWordEdgeArgs = {
  orderBy?: Maybe<Array<EnglishWordsOrderBy>>;
};

/** All input for the `updateEnglishWouldYouRatherQuestionByNodeId` mutation. */
export type UpdateEnglishWouldYouRatherQuestionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `EnglishWouldYouRatherQuestion` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `EnglishWouldYouRatherQuestion` being updated. */
  patch: EnglishWouldYouRatherQuestionPatch;
};

/** All input for the `updateEnglishWouldYouRatherQuestionByUuid` mutation. */
export type UpdateEnglishWouldYouRatherQuestionByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `EnglishWouldYouRatherQuestion` being updated. */
  patch: EnglishWouldYouRatherQuestionPatch;
  uuid: Scalars['UUID'];
};

/** All input for the `updateEnglishWouldYouRatherQuestion` mutation. */
export type UpdateEnglishWouldYouRatherQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `EnglishWouldYouRatherQuestion` being updated. */
  patch: EnglishWouldYouRatherQuestionPatch;
  id: Scalars['Int'];
};

/** The output of our update `EnglishWouldYouRatherQuestion` mutation. */
export type UpdateEnglishWouldYouRatherQuestionPayload = {
  __typename?: 'UpdateEnglishWouldYouRatherQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EnglishWouldYouRatherQuestion` that was updated by this mutation. */
  englishWouldYouRatherQuestion?: Maybe<EnglishWouldYouRatherQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `EnglishWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `EnglishWouldYouRatherQuestion`. May be used by Relay 1. */
  englishWouldYouRatherQuestionEdge?: Maybe<EnglishWouldYouRatherQuestionsEdge>;
};


/** The output of our update `EnglishWouldYouRatherQuestion` mutation. */
export type UpdateEnglishWouldYouRatherQuestionPayloadEnglishWouldYouRatherQuestionEdgeArgs = {
  orderBy?: Maybe<Array<EnglishWouldYouRatherQuestionsOrderBy>>;
};

/** All input for the `updateFrenchRandomQuestionByNodeId` mutation. */
export type UpdateFrenchRandomQuestionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `FrenchRandomQuestion` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `FrenchRandomQuestion` being updated. */
  patch: FrenchRandomQuestionPatch;
};

/** All input for the `updateFrenchRandomQuestionByUuid` mutation. */
export type UpdateFrenchRandomQuestionByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `FrenchRandomQuestion` being updated. */
  patch: FrenchRandomQuestionPatch;
  uuid: Scalars['UUID'];
};

/** All input for the `updateFrenchRandomQuestion` mutation. */
export type UpdateFrenchRandomQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `FrenchRandomQuestion` being updated. */
  patch: FrenchRandomQuestionPatch;
  id: Scalars['Int'];
};

/** The output of our update `FrenchRandomQuestion` mutation. */
export type UpdateFrenchRandomQuestionPayload = {
  __typename?: 'UpdateFrenchRandomQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `FrenchRandomQuestion` that was updated by this mutation. */
  frenchRandomQuestion?: Maybe<FrenchRandomQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `FrenchRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `FrenchRandomQuestion`. May be used by Relay 1. */
  frenchRandomQuestionEdge?: Maybe<FrenchRandomQuestionsEdge>;
};


/** The output of our update `FrenchRandomQuestion` mutation. */
export type UpdateFrenchRandomQuestionPayloadFrenchRandomQuestionEdgeArgs = {
  orderBy?: Maybe<Array<FrenchRandomQuestionsOrderBy>>;
};

/** All input for the `updateFrenchWordByNodeId` mutation. */
export type UpdateFrenchWordByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `FrenchWord` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `FrenchWord` being updated. */
  patch: FrenchWordPatch;
};

/** All input for the `updateFrenchWordByUuid` mutation. */
export type UpdateFrenchWordByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `FrenchWord` being updated. */
  patch: FrenchWordPatch;
  uuid: Scalars['UUID'];
};

/** All input for the `updateFrenchWord` mutation. */
export type UpdateFrenchWordInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `FrenchWord` being updated. */
  patch: FrenchWordPatch;
  id: Scalars['Int'];
};

/** The output of our update `FrenchWord` mutation. */
export type UpdateFrenchWordPayload = {
  __typename?: 'UpdateFrenchWordPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `FrenchWord` that was updated by this mutation. */
  frenchWord?: Maybe<FrenchWord>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `FrenchWord`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `FrenchWord`. May be used by Relay 1. */
  frenchWordEdge?: Maybe<FrenchWordsEdge>;
};


/** The output of our update `FrenchWord` mutation. */
export type UpdateFrenchWordPayloadFrenchWordEdgeArgs = {
  orderBy?: Maybe<Array<FrenchWordsOrderBy>>;
};

/** All input for the `updateFrenchWouldYouRatherQuestionByNodeId` mutation. */
export type UpdateFrenchWouldYouRatherQuestionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `FrenchWouldYouRatherQuestion` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `FrenchWouldYouRatherQuestion` being updated. */
  patch: FrenchWouldYouRatherQuestionPatch;
};

/** All input for the `updateFrenchWouldYouRatherQuestionByUuid` mutation. */
export type UpdateFrenchWouldYouRatherQuestionByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `FrenchWouldYouRatherQuestion` being updated. */
  patch: FrenchWouldYouRatherQuestionPatch;
  uuid: Scalars['UUID'];
};

/** All input for the `updateFrenchWouldYouRatherQuestion` mutation. */
export type UpdateFrenchWouldYouRatherQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `FrenchWouldYouRatherQuestion` being updated. */
  patch: FrenchWouldYouRatherQuestionPatch;
  id: Scalars['Int'];
};

/** The output of our update `FrenchWouldYouRatherQuestion` mutation. */
export type UpdateFrenchWouldYouRatherQuestionPayload = {
  __typename?: 'UpdateFrenchWouldYouRatherQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `FrenchWouldYouRatherQuestion` that was updated by this mutation. */
  frenchWouldYouRatherQuestion?: Maybe<FrenchWouldYouRatherQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `FrenchWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `FrenchWouldYouRatherQuestion`. May be used by Relay 1. */
  frenchWouldYouRatherQuestionEdge?: Maybe<FrenchWouldYouRatherQuestionsEdge>;
};


/** The output of our update `FrenchWouldYouRatherQuestion` mutation. */
export type UpdateFrenchWouldYouRatherQuestionPayloadFrenchWouldYouRatherQuestionEdgeArgs = {
  orderBy?: Maybe<Array<FrenchWouldYouRatherQuestionsOrderBy>>;
};

/** All input for the `updateGermanRandomQuestionByNodeId` mutation. */
export type UpdateGermanRandomQuestionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `GermanRandomQuestion` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `GermanRandomQuestion` being updated. */
  patch: GermanRandomQuestionPatch;
};

/** All input for the `updateGermanRandomQuestionByUuid` mutation. */
export type UpdateGermanRandomQuestionByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `GermanRandomQuestion` being updated. */
  patch: GermanRandomQuestionPatch;
  uuid: Scalars['UUID'];
};

/** All input for the `updateGermanRandomQuestion` mutation. */
export type UpdateGermanRandomQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `GermanRandomQuestion` being updated. */
  patch: GermanRandomQuestionPatch;
  id: Scalars['Int'];
};

/** The output of our update `GermanRandomQuestion` mutation. */
export type UpdateGermanRandomQuestionPayload = {
  __typename?: 'UpdateGermanRandomQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `GermanRandomQuestion` that was updated by this mutation. */
  germanRandomQuestion?: Maybe<GermanRandomQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `GermanRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `GermanRandomQuestion`. May be used by Relay 1. */
  germanRandomQuestionEdge?: Maybe<GermanRandomQuestionsEdge>;
};


/** The output of our update `GermanRandomQuestion` mutation. */
export type UpdateGermanRandomQuestionPayloadGermanRandomQuestionEdgeArgs = {
  orderBy?: Maybe<Array<GermanRandomQuestionsOrderBy>>;
};

/** All input for the `updateGermanWordByNodeId` mutation. */
export type UpdateGermanWordByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `GermanWord` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `GermanWord` being updated. */
  patch: GermanWordPatch;
};

/** All input for the `updateGermanWordByUuid` mutation. */
export type UpdateGermanWordByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `GermanWord` being updated. */
  patch: GermanWordPatch;
  uuid: Scalars['UUID'];
};

/** All input for the `updateGermanWord` mutation. */
export type UpdateGermanWordInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `GermanWord` being updated. */
  patch: GermanWordPatch;
  id: Scalars['Int'];
};

/** The output of our update `GermanWord` mutation. */
export type UpdateGermanWordPayload = {
  __typename?: 'UpdateGermanWordPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `GermanWord` that was updated by this mutation. */
  germanWord?: Maybe<GermanWord>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `GermanWord`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `GermanWord`. May be used by Relay 1. */
  germanWordEdge?: Maybe<GermanWordsEdge>;
};


/** The output of our update `GermanWord` mutation. */
export type UpdateGermanWordPayloadGermanWordEdgeArgs = {
  orderBy?: Maybe<Array<GermanWordsOrderBy>>;
};

/** All input for the `updateGermanWouldYouRatherQuestionByNodeId` mutation. */
export type UpdateGermanWouldYouRatherQuestionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `GermanWouldYouRatherQuestion` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `GermanWouldYouRatherQuestion` being updated. */
  patch: GermanWouldYouRatherQuestionPatch;
};

/** All input for the `updateGermanWouldYouRatherQuestionByUuid` mutation. */
export type UpdateGermanWouldYouRatherQuestionByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `GermanWouldYouRatherQuestion` being updated. */
  patch: GermanWouldYouRatherQuestionPatch;
  uuid: Scalars['UUID'];
};

/** All input for the `updateGermanWouldYouRatherQuestion` mutation. */
export type UpdateGermanWouldYouRatherQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `GermanWouldYouRatherQuestion` being updated. */
  patch: GermanWouldYouRatherQuestionPatch;
  id: Scalars['Int'];
};

/** The output of our update `GermanWouldYouRatherQuestion` mutation. */
export type UpdateGermanWouldYouRatherQuestionPayload = {
  __typename?: 'UpdateGermanWouldYouRatherQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `GermanWouldYouRatherQuestion` that was updated by this mutation. */
  germanWouldYouRatherQuestion?: Maybe<GermanWouldYouRatherQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `GermanWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `GermanWouldYouRatherQuestion`. May be used by Relay 1. */
  germanWouldYouRatherQuestionEdge?: Maybe<GermanWouldYouRatherQuestionsEdge>;
};


/** The output of our update `GermanWouldYouRatherQuestion` mutation. */
export type UpdateGermanWouldYouRatherQuestionPayloadGermanWouldYouRatherQuestionEdgeArgs = {
  orderBy?: Maybe<Array<GermanWouldYouRatherQuestionsOrderBy>>;
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

/** All input for the `updateInviteTokenByNodeId` mutation. */
export type UpdateInviteTokenByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `InviteToken` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `InviteToken` being updated. */
  patch: InviteTokenPatch;
};

/** All input for the `updateInviteToken` mutation. */
export type UpdateInviteTokenInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `InviteToken` being updated. */
  patch: InviteTokenPatch;
  id: Scalars['Int'];
};

/** The output of our update `InviteToken` mutation. */
export type UpdateInviteTokenPayload = {
  __typename?: 'UpdateInviteTokenPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `InviteToken` that was updated by this mutation. */
  inviteToken?: Maybe<InviteToken>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `InviteToken`. */
  user?: Maybe<User>;
  /** An edge for our `InviteToken`. May be used by Relay 1. */
  inviteTokenEdge?: Maybe<InviteTokensEdge>;
};


/** The output of our update `InviteToken` mutation. */
export type UpdateInviteTokenPayloadInviteTokenEdgeArgs = {
  orderBy?: Maybe<Array<InviteTokensOrderBy>>;
};

/** All input for the `updateItalianRandomQuestionByNodeId` mutation. */
export type UpdateItalianRandomQuestionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `ItalianRandomQuestion` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `ItalianRandomQuestion` being updated. */
  patch: ItalianRandomQuestionPatch;
};

/** All input for the `updateItalianRandomQuestionByUuid` mutation. */
export type UpdateItalianRandomQuestionByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `ItalianRandomQuestion` being updated. */
  patch: ItalianRandomQuestionPatch;
  uuid: Scalars['UUID'];
};

/** All input for the `updateItalianRandomQuestion` mutation. */
export type UpdateItalianRandomQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `ItalianRandomQuestion` being updated. */
  patch: ItalianRandomQuestionPatch;
  id: Scalars['Int'];
};

/** The output of our update `ItalianRandomQuestion` mutation. */
export type UpdateItalianRandomQuestionPayload = {
  __typename?: 'UpdateItalianRandomQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ItalianRandomQuestion` that was updated by this mutation. */
  italianRandomQuestion?: Maybe<ItalianRandomQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `ItalianRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `ItalianRandomQuestion`. May be used by Relay 1. */
  italianRandomQuestionEdge?: Maybe<ItalianRandomQuestionsEdge>;
};


/** The output of our update `ItalianRandomQuestion` mutation. */
export type UpdateItalianRandomQuestionPayloadItalianRandomQuestionEdgeArgs = {
  orderBy?: Maybe<Array<ItalianRandomQuestionsOrderBy>>;
};

/** All input for the `updateItalianWordByNodeId` mutation. */
export type UpdateItalianWordByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `ItalianWord` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `ItalianWord` being updated. */
  patch: ItalianWordPatch;
};

/** All input for the `updateItalianWordByUuid` mutation. */
export type UpdateItalianWordByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `ItalianWord` being updated. */
  patch: ItalianWordPatch;
  uuid: Scalars['UUID'];
};

/** All input for the `updateItalianWord` mutation. */
export type UpdateItalianWordInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `ItalianWord` being updated. */
  patch: ItalianWordPatch;
  id: Scalars['Int'];
};

/** The output of our update `ItalianWord` mutation. */
export type UpdateItalianWordPayload = {
  __typename?: 'UpdateItalianWordPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ItalianWord` that was updated by this mutation. */
  italianWord?: Maybe<ItalianWord>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `ItalianWord`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `ItalianWord`. May be used by Relay 1. */
  italianWordEdge?: Maybe<ItalianWordsEdge>;
};


/** The output of our update `ItalianWord` mutation. */
export type UpdateItalianWordPayloadItalianWordEdgeArgs = {
  orderBy?: Maybe<Array<ItalianWordsOrderBy>>;
};

/** All input for the `updateItalianWouldYouRatherQuestionByNodeId` mutation. */
export type UpdateItalianWouldYouRatherQuestionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `ItalianWouldYouRatherQuestion` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `ItalianWouldYouRatherQuestion` being updated. */
  patch: ItalianWouldYouRatherQuestionPatch;
};

/** All input for the `updateItalianWouldYouRatherQuestionByUuid` mutation. */
export type UpdateItalianWouldYouRatherQuestionByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `ItalianWouldYouRatherQuestion` being updated. */
  patch: ItalianWouldYouRatherQuestionPatch;
  uuid: Scalars['UUID'];
};

/** All input for the `updateItalianWouldYouRatherQuestion` mutation. */
export type UpdateItalianWouldYouRatherQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `ItalianWouldYouRatherQuestion` being updated. */
  patch: ItalianWouldYouRatherQuestionPatch;
  id: Scalars['Int'];
};

/** The output of our update `ItalianWouldYouRatherQuestion` mutation. */
export type UpdateItalianWouldYouRatherQuestionPayload = {
  __typename?: 'UpdateItalianWouldYouRatherQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ItalianWouldYouRatherQuestion` that was updated by this mutation. */
  italianWouldYouRatherQuestion?: Maybe<ItalianWouldYouRatherQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `ItalianWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `ItalianWouldYouRatherQuestion`. May be used by Relay 1. */
  italianWouldYouRatherQuestionEdge?: Maybe<ItalianWouldYouRatherQuestionsEdge>;
};


/** The output of our update `ItalianWouldYouRatherQuestion` mutation. */
export type UpdateItalianWouldYouRatherQuestionPayloadItalianWouldYouRatherQuestionEdgeArgs = {
  orderBy?: Maybe<Array<ItalianWouldYouRatherQuestionsOrderBy>>;
};

/** All input for the `updateJapaneseRandomQuestionByNodeId` mutation. */
export type UpdateJapaneseRandomQuestionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `JapaneseRandomQuestion` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `JapaneseRandomQuestion` being updated. */
  patch: JapaneseRandomQuestionPatch;
};

/** All input for the `updateJapaneseRandomQuestionByUuid` mutation. */
export type UpdateJapaneseRandomQuestionByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `JapaneseRandomQuestion` being updated. */
  patch: JapaneseRandomQuestionPatch;
  uuid: Scalars['UUID'];
};

/** All input for the `updateJapaneseRandomQuestion` mutation. */
export type UpdateJapaneseRandomQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `JapaneseRandomQuestion` being updated. */
  patch: JapaneseRandomQuestionPatch;
  id: Scalars['Int'];
};

/** The output of our update `JapaneseRandomQuestion` mutation. */
export type UpdateJapaneseRandomQuestionPayload = {
  __typename?: 'UpdateJapaneseRandomQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `JapaneseRandomQuestion` that was updated by this mutation. */
  japaneseRandomQuestion?: Maybe<JapaneseRandomQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `JapaneseRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `JapaneseRandomQuestion`. May be used by Relay 1. */
  japaneseRandomQuestionEdge?: Maybe<JapaneseRandomQuestionsEdge>;
};


/** The output of our update `JapaneseRandomQuestion` mutation. */
export type UpdateJapaneseRandomQuestionPayloadJapaneseRandomQuestionEdgeArgs = {
  orderBy?: Maybe<Array<JapaneseRandomQuestionsOrderBy>>;
};

/** All input for the `updateJapaneseWouldYouRatherQuestionByNodeId` mutation. */
export type UpdateJapaneseWouldYouRatherQuestionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `JapaneseWouldYouRatherQuestion` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `JapaneseWouldYouRatherQuestion` being updated. */
  patch: JapaneseWouldYouRatherQuestionPatch;
};

/** All input for the `updateJapaneseWouldYouRatherQuestionByUuid` mutation. */
export type UpdateJapaneseWouldYouRatherQuestionByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `JapaneseWouldYouRatherQuestion` being updated. */
  patch: JapaneseWouldYouRatherQuestionPatch;
  uuid: Scalars['UUID'];
};

/** All input for the `updateJapaneseWouldYouRatherQuestion` mutation. */
export type UpdateJapaneseWouldYouRatherQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `JapaneseWouldYouRatherQuestion` being updated. */
  patch: JapaneseWouldYouRatherQuestionPatch;
  id: Scalars['Int'];
};

/** The output of our update `JapaneseWouldYouRatherQuestion` mutation. */
export type UpdateJapaneseWouldYouRatherQuestionPayload = {
  __typename?: 'UpdateJapaneseWouldYouRatherQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `JapaneseWouldYouRatherQuestion` that was updated by this mutation. */
  japaneseWouldYouRatherQuestion?: Maybe<JapaneseWouldYouRatherQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `JapaneseWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `JapaneseWouldYouRatherQuestion`. May be used by Relay 1. */
  japaneseWouldYouRatherQuestionEdge?: Maybe<JapaneseWouldYouRatherQuestionsEdge>;
};


/** The output of our update `JapaneseWouldYouRatherQuestion` mutation. */
export type UpdateJapaneseWouldYouRatherQuestionPayloadJapaneseWouldYouRatherQuestionEdgeArgs = {
  orderBy?: Maybe<Array<JapaneseWouldYouRatherQuestionsOrderBy>>;
};

/** All input for the `updateKoreanRandomQuestionByNodeId` mutation. */
export type UpdateKoreanRandomQuestionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `KoreanRandomQuestion` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `KoreanRandomQuestion` being updated. */
  patch: KoreanRandomQuestionPatch;
};

/** All input for the `updateKoreanRandomQuestionByUuid` mutation. */
export type UpdateKoreanRandomQuestionByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `KoreanRandomQuestion` being updated. */
  patch: KoreanRandomQuestionPatch;
  uuid: Scalars['UUID'];
};

/** All input for the `updateKoreanRandomQuestion` mutation. */
export type UpdateKoreanRandomQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `KoreanRandomQuestion` being updated. */
  patch: KoreanRandomQuestionPatch;
  id: Scalars['Int'];
};

/** The output of our update `KoreanRandomQuestion` mutation. */
export type UpdateKoreanRandomQuestionPayload = {
  __typename?: 'UpdateKoreanRandomQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `KoreanRandomQuestion` that was updated by this mutation. */
  koreanRandomQuestion?: Maybe<KoreanRandomQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `KoreanRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `KoreanRandomQuestion`. May be used by Relay 1. */
  koreanRandomQuestionEdge?: Maybe<KoreanRandomQuestionsEdge>;
};


/** The output of our update `KoreanRandomQuestion` mutation. */
export type UpdateKoreanRandomQuestionPayloadKoreanRandomQuestionEdgeArgs = {
  orderBy?: Maybe<Array<KoreanRandomQuestionsOrderBy>>;
};

/** All input for the `updateKoreanWouldYouRatherQuestionByNodeId` mutation. */
export type UpdateKoreanWouldYouRatherQuestionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `KoreanWouldYouRatherQuestion` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `KoreanWouldYouRatherQuestion` being updated. */
  patch: KoreanWouldYouRatherQuestionPatch;
};

/** All input for the `updateKoreanWouldYouRatherQuestionByUuid` mutation. */
export type UpdateKoreanWouldYouRatherQuestionByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `KoreanWouldYouRatherQuestion` being updated. */
  patch: KoreanWouldYouRatherQuestionPatch;
  uuid: Scalars['UUID'];
};

/** All input for the `updateKoreanWouldYouRatherQuestion` mutation. */
export type UpdateKoreanWouldYouRatherQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `KoreanWouldYouRatherQuestion` being updated. */
  patch: KoreanWouldYouRatherQuestionPatch;
  id: Scalars['Int'];
};

/** The output of our update `KoreanWouldYouRatherQuestion` mutation. */
export type UpdateKoreanWouldYouRatherQuestionPayload = {
  __typename?: 'UpdateKoreanWouldYouRatherQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `KoreanWouldYouRatherQuestion` that was updated by this mutation. */
  koreanWouldYouRatherQuestion?: Maybe<KoreanWouldYouRatherQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `KoreanWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `KoreanWouldYouRatherQuestion`. May be used by Relay 1. */
  koreanWouldYouRatherQuestionEdge?: Maybe<KoreanWouldYouRatherQuestionsEdge>;
};


/** The output of our update `KoreanWouldYouRatherQuestion` mutation. */
export type UpdateKoreanWouldYouRatherQuestionPayloadKoreanWouldYouRatherQuestionEdgeArgs = {
  orderBy?: Maybe<Array<KoreanWouldYouRatherQuestionsOrderBy>>;
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

/** All input for the `updateMessagePreviewByNodeId` mutation. */
export type UpdateMessagePreviewByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `MessagePreview` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `MessagePreview` being updated. */
  patch: MessagePreviewPatch;
};

/** All input for the `updateMessagePreviewByUuid` mutation. */
export type UpdateMessagePreviewByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `MessagePreview` being updated. */
  patch: MessagePreviewPatch;
  uuid: Scalars['UUID'];
};

/** All input for the `updateMessagePreview` mutation. */
export type UpdateMessagePreviewInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `MessagePreview` being updated. */
  patch: MessagePreviewPatch;
  id: Scalars['Int'];
};

/** The output of our update `MessagePreview` mutation. */
export type UpdateMessagePreviewPayload = {
  __typename?: 'UpdateMessagePreviewPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MessagePreview` that was updated by this mutation. */
  messagePreview?: Maybe<MessagePreview>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Message` that is related to this `MessagePreview`. */
  message?: Maybe<Message>;
  /** An edge for our `MessagePreview`. May be used by Relay 1. */
  messagePreviewEdge?: Maybe<MessagePreviewsEdge>;
};


/** The output of our update `MessagePreview` mutation. */
export type UpdateMessagePreviewPayloadMessagePreviewEdgeArgs = {
  orderBy?: Maybe<Array<MessagePreviewsOrderBy>>;
};

/** All input for the `updateNotificationByNodeId` mutation. */
export type UpdateNotificationByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Notification` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Notification` being updated. */
  patch: NotificationPatch;
};

/** All input for the `updateNotificationByUuid` mutation. */
export type UpdateNotificationByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Notification` being updated. */
  patch: NotificationPatch;
  uuid: Scalars['UUID'];
};

/** All input for the `updateNotificationChannelByName` mutation. */
export type UpdateNotificationChannelByNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `NotificationChannel` being updated. */
  patch: NotificationChannelPatch;
  name: Scalars['String'];
};

/** All input for the `updateNotificationChannelByNodeId` mutation. */
export type UpdateNotificationChannelByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `NotificationChannel` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `NotificationChannel` being updated. */
  patch: NotificationChannelPatch;
};

/** All input for the `updateNotificationChannelByUuid` mutation. */
export type UpdateNotificationChannelByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `NotificationChannel` being updated. */
  patch: NotificationChannelPatch;
  uuid: Scalars['UUID'];
};

/** All input for the `updateNotificationChannel` mutation. */
export type UpdateNotificationChannelInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `NotificationChannel` being updated. */
  patch: NotificationChannelPatch;
  id: Scalars['Int'];
};

/** The output of our update `NotificationChannel` mutation. */
export type UpdateNotificationChannelPayload = {
  __typename?: 'UpdateNotificationChannelPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `NotificationChannel` that was updated by this mutation. */
  notificationChannel?: Maybe<NotificationChannel>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `NotificationChannel`. May be used by Relay 1. */
  notificationChannelEdge?: Maybe<NotificationChannelsEdge>;
};


/** The output of our update `NotificationChannel` mutation. */
export type UpdateNotificationChannelPayloadNotificationChannelEdgeArgs = {
  orderBy?: Maybe<Array<NotificationChannelsOrderBy>>;
};

/** All input for the `updateNotification` mutation. */
export type UpdateNotificationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Notification` being updated. */
  patch: NotificationPatch;
  id: Scalars['Int'];
};

/** The output of our update `Notification` mutation. */
export type UpdateNotificationPayload = {
  __typename?: 'UpdateNotificationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Notification` that was updated by this mutation. */
  notification?: Maybe<Notification>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `Notification`. */
  recipient?: Maybe<User>;
  /** Reads a single `NotificationChannel` that is related to this `Notification`. */
  channel?: Maybe<NotificationChannel>;
  /** Reads a single `Group` that is related to this `Notification`. */
  recipientGroup?: Maybe<Group>;
  /** An edge for our `Notification`. May be used by Relay 1. */
  notificationEdge?: Maybe<NotificationsEdge>;
};


/** The output of our update `Notification` mutation. */
export type UpdateNotificationPayloadNotificationEdgeArgs = {
  orderBy?: Maybe<Array<NotificationsOrderBy>>;
};

/** All input for the `updatePortugueseRandomQuestionByNodeId` mutation. */
export type UpdatePortugueseRandomQuestionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PortugueseRandomQuestion` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PortugueseRandomQuestion` being updated. */
  patch: PortugueseRandomQuestionPatch;
};

/** All input for the `updatePortugueseRandomQuestionByUuid` mutation. */
export type UpdatePortugueseRandomQuestionByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `PortugueseRandomQuestion` being updated. */
  patch: PortugueseRandomQuestionPatch;
  uuid: Scalars['UUID'];
};

/** All input for the `updatePortugueseRandomQuestion` mutation. */
export type UpdatePortugueseRandomQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `PortugueseRandomQuestion` being updated. */
  patch: PortugueseRandomQuestionPatch;
  id: Scalars['Int'];
};

/** The output of our update `PortugueseRandomQuestion` mutation. */
export type UpdatePortugueseRandomQuestionPayload = {
  __typename?: 'UpdatePortugueseRandomQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `PortugueseRandomQuestion` that was updated by this mutation. */
  portugueseRandomQuestion?: Maybe<PortugueseRandomQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `PortugueseRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `PortugueseRandomQuestion`. May be used by Relay 1. */
  portugueseRandomQuestionEdge?: Maybe<PortugueseRandomQuestionsEdge>;
};


/** The output of our update `PortugueseRandomQuestion` mutation. */
export type UpdatePortugueseRandomQuestionPayloadPortugueseRandomQuestionEdgeArgs = {
  orderBy?: Maybe<Array<PortugueseRandomQuestionsOrderBy>>;
};

/** All input for the `updatePortugueseWordByNodeId` mutation. */
export type UpdatePortugueseWordByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PortugueseWord` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PortugueseWord` being updated. */
  patch: PortugueseWordPatch;
};

/** All input for the `updatePortugueseWordByUuid` mutation. */
export type UpdatePortugueseWordByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `PortugueseWord` being updated. */
  patch: PortugueseWordPatch;
  uuid: Scalars['UUID'];
};

/** All input for the `updatePortugueseWord` mutation. */
export type UpdatePortugueseWordInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `PortugueseWord` being updated. */
  patch: PortugueseWordPatch;
  id: Scalars['Int'];
};

/** The output of our update `PortugueseWord` mutation. */
export type UpdatePortugueseWordPayload = {
  __typename?: 'UpdatePortugueseWordPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `PortugueseWord` that was updated by this mutation. */
  portugueseWord?: Maybe<PortugueseWord>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `PortugueseWord`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `PortugueseWord`. May be used by Relay 1. */
  portugueseWordEdge?: Maybe<PortugueseWordsEdge>;
};


/** The output of our update `PortugueseWord` mutation. */
export type UpdatePortugueseWordPayloadPortugueseWordEdgeArgs = {
  orderBy?: Maybe<Array<PortugueseWordsOrderBy>>;
};

/** All input for the `updatePortugueseWouldYouRatherQuestionByNodeId` mutation. */
export type UpdatePortugueseWouldYouRatherQuestionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PortugueseWouldYouRatherQuestion` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PortugueseWouldYouRatherQuestion` being updated. */
  patch: PortugueseWouldYouRatherQuestionPatch;
};

/** All input for the `updatePortugueseWouldYouRatherQuestionByUuid` mutation. */
export type UpdatePortugueseWouldYouRatherQuestionByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `PortugueseWouldYouRatherQuestion` being updated. */
  patch: PortugueseWouldYouRatherQuestionPatch;
  uuid: Scalars['UUID'];
};

/** All input for the `updatePortugueseWouldYouRatherQuestion` mutation. */
export type UpdatePortugueseWouldYouRatherQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `PortugueseWouldYouRatherQuestion` being updated. */
  patch: PortugueseWouldYouRatherQuestionPatch;
  id: Scalars['Int'];
};

/** The output of our update `PortugueseWouldYouRatherQuestion` mutation. */
export type UpdatePortugueseWouldYouRatherQuestionPayload = {
  __typename?: 'UpdatePortugueseWouldYouRatherQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `PortugueseWouldYouRatherQuestion` that was updated by this mutation. */
  portugueseWouldYouRatherQuestion?: Maybe<PortugueseWouldYouRatherQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `PortugueseWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `PortugueseWouldYouRatherQuestion`. May be used by Relay 1. */
  portugueseWouldYouRatherQuestionEdge?: Maybe<PortugueseWouldYouRatherQuestionsEdge>;
};


/** The output of our update `PortugueseWouldYouRatherQuestion` mutation. */
export type UpdatePortugueseWouldYouRatherQuestionPayloadPortugueseWouldYouRatherQuestionEdgeArgs = {
  orderBy?: Maybe<Array<PortugueseWouldYouRatherQuestionsOrderBy>>;
};

/** All input for the `updatePostByNodeId` mutation. */
export type UpdatePostByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Post` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Post` being updated. */
  patch: PostPatch;
};

/** All input for the `updatePostByUuid` mutation. */
export type UpdatePostByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Post` being updated. */
  patch: PostPatch;
  uuid: Scalars['UUID'];
};

/** All input for the `updatePost` mutation. */
export type UpdatePostInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Post` being updated. */
  patch: PostPatch;
  id: Scalars['Int'];
};

/** All input for the `updatePostLikeByNodeId` mutation. */
export type UpdatePostLikeByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PostLike` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PostLike` being updated. */
  patch: PostLikePatch;
};

/** All input for the `updatePostLike` mutation. */
export type UpdatePostLikeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `PostLike` being updated. */
  patch: PostLikePatch;
  id: Scalars['Int'];
};

/** The output of our update `PostLike` mutation. */
export type UpdatePostLikePayload = {
  __typename?: 'UpdatePostLikePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `PostLike` that was updated by this mutation. */
  postLike?: Maybe<PostLike>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `PostLike`. */
  user?: Maybe<User>;
  /** Reads a single `Post` that is related to this `PostLike`. */
  post?: Maybe<Post>;
  /** An edge for our `PostLike`. May be used by Relay 1. */
  postLikeEdge?: Maybe<PostLikesEdge>;
};


/** The output of our update `PostLike` mutation. */
export type UpdatePostLikePayloadPostLikeEdgeArgs = {
  orderBy?: Maybe<Array<PostLikesOrderBy>>;
};

/** The output of our update `Post` mutation. */
export type UpdatePostPayload = {
  __typename?: 'UpdatePostPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Post` that was updated by this mutation. */
  post?: Maybe<Post>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `Post`. */
  author?: Maybe<User>;
  /** Reads a single `Post` that is related to this `Post`. */
  parentPost?: Maybe<Post>;
  /** Reads a single `Language` that is related to this `Post`. */
  language?: Maybe<Language>;
  /** Reads a single `Prompt` that is related to this `Post`. */
  prompt?: Maybe<Prompt>;
  /** An edge for our `Post`. May be used by Relay 1. */
  postEdge?: Maybe<PostsEdge>;
};


/** The output of our update `Post` mutation. */
export type UpdatePostPayloadPostEdgeArgs = {
  orderBy?: Maybe<Array<PostsOrderBy>>;
};

/** All input for the `updatePostRecordingByNodeId` mutation. */
export type UpdatePostRecordingByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PostRecording` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `PostRecording` being updated. */
  patch: PostRecordingPatch;
};

/** All input for the `updatePostRecordingByUuid` mutation. */
export type UpdatePostRecordingByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `PostRecording` being updated. */
  patch: PostRecordingPatch;
  uuid: Scalars['UUID'];
};

/** All input for the `updatePostRecording` mutation. */
export type UpdatePostRecordingInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `PostRecording` being updated. */
  patch: PostRecordingPatch;
  id: Scalars['Int'];
};

/** The output of our update `PostRecording` mutation. */
export type UpdatePostRecordingPayload = {
  __typename?: 'UpdatePostRecordingPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `PostRecording` that was updated by this mutation. */
  postRecording?: Maybe<PostRecording>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `PostRecording`. */
  user?: Maybe<User>;
  /** Reads a single `Post` that is related to this `PostRecording`. */
  post?: Maybe<Post>;
  /** An edge for our `PostRecording`. May be used by Relay 1. */
  postRecordingEdge?: Maybe<PostRecordingsEdge>;
};


/** The output of our update `PostRecording` mutation. */
export type UpdatePostRecordingPayloadPostRecordingEdgeArgs = {
  orderBy?: Maybe<Array<PostRecordingsOrderBy>>;
};

/** All input for the `updatePromptByNodeId` mutation. */
export type UpdatePromptByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Prompt` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Prompt` being updated. */
  patch: PromptPatch;
};

/** All input for the `updatePromptByUuid` mutation. */
export type UpdatePromptByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Prompt` being updated. */
  patch: PromptPatch;
  uuid: Scalars['UUID'];
};

/** All input for the `updatePrompt` mutation. */
export type UpdatePromptInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Prompt` being updated. */
  patch: PromptPatch;
  id: Scalars['Int'];
};

/** The output of our update `Prompt` mutation. */
export type UpdatePromptPayload = {
  __typename?: 'UpdatePromptPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Prompt` that was updated by this mutation. */
  prompt?: Maybe<Prompt>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Language` that is related to this `Prompt`. */
  language?: Maybe<Language>;
  /** Reads a single `LanguageSkillLevel` that is related to this `Prompt`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `Prompt`. May be used by Relay 1. */
  promptEdge?: Maybe<PromptsEdge>;
};


/** The output of our update `Prompt` mutation. */
export type UpdatePromptPayloadPromptEdgeArgs = {
  orderBy?: Maybe<Array<PromptsOrderBy>>;
};

/** All input for the `updateRussianRandomQuestionByNodeId` mutation. */
export type UpdateRussianRandomQuestionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `RussianRandomQuestion` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `RussianRandomQuestion` being updated. */
  patch: RussianRandomQuestionPatch;
};

/** All input for the `updateRussianRandomQuestionByUuid` mutation. */
export type UpdateRussianRandomQuestionByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `RussianRandomQuestion` being updated. */
  patch: RussianRandomQuestionPatch;
  uuid: Scalars['UUID'];
};

/** All input for the `updateRussianRandomQuestion` mutation. */
export type UpdateRussianRandomQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `RussianRandomQuestion` being updated. */
  patch: RussianRandomQuestionPatch;
  id: Scalars['Int'];
};

/** The output of our update `RussianRandomQuestion` mutation. */
export type UpdateRussianRandomQuestionPayload = {
  __typename?: 'UpdateRussianRandomQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `RussianRandomQuestion` that was updated by this mutation. */
  russianRandomQuestion?: Maybe<RussianRandomQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `RussianRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `RussianRandomQuestion`. May be used by Relay 1. */
  russianRandomQuestionEdge?: Maybe<RussianRandomQuestionsEdge>;
};


/** The output of our update `RussianRandomQuestion` mutation. */
export type UpdateRussianRandomQuestionPayloadRussianRandomQuestionEdgeArgs = {
  orderBy?: Maybe<Array<RussianRandomQuestionsOrderBy>>;
};

/** All input for the `updateRussianWordByNodeId` mutation. */
export type UpdateRussianWordByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `RussianWord` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `RussianWord` being updated. */
  patch: RussianWordPatch;
};

/** All input for the `updateRussianWordByUuid` mutation. */
export type UpdateRussianWordByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `RussianWord` being updated. */
  patch: RussianWordPatch;
  uuid: Scalars['UUID'];
};

/** All input for the `updateRussianWord` mutation. */
export type UpdateRussianWordInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `RussianWord` being updated. */
  patch: RussianWordPatch;
  id: Scalars['Int'];
};

/** The output of our update `RussianWord` mutation. */
export type UpdateRussianWordPayload = {
  __typename?: 'UpdateRussianWordPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `RussianWord` that was updated by this mutation. */
  russianWord?: Maybe<RussianWord>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `RussianWord`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `RussianWord`. May be used by Relay 1. */
  russianWordEdge?: Maybe<RussianWordsEdge>;
};


/** The output of our update `RussianWord` mutation. */
export type UpdateRussianWordPayloadRussianWordEdgeArgs = {
  orderBy?: Maybe<Array<RussianWordsOrderBy>>;
};

/** All input for the `updateRussianWouldYouRatherQuestionByNodeId` mutation. */
export type UpdateRussianWouldYouRatherQuestionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `RussianWouldYouRatherQuestion` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `RussianWouldYouRatherQuestion` being updated. */
  patch: RussianWouldYouRatherQuestionPatch;
};

/** All input for the `updateRussianWouldYouRatherQuestionByUuid` mutation. */
export type UpdateRussianWouldYouRatherQuestionByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `RussianWouldYouRatherQuestion` being updated. */
  patch: RussianWouldYouRatherQuestionPatch;
  uuid: Scalars['UUID'];
};

/** All input for the `updateRussianWouldYouRatherQuestion` mutation. */
export type UpdateRussianWouldYouRatherQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `RussianWouldYouRatherQuestion` being updated. */
  patch: RussianWouldYouRatherQuestionPatch;
  id: Scalars['Int'];
};

/** The output of our update `RussianWouldYouRatherQuestion` mutation. */
export type UpdateRussianWouldYouRatherQuestionPayload = {
  __typename?: 'UpdateRussianWouldYouRatherQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `RussianWouldYouRatherQuestion` that was updated by this mutation. */
  russianWouldYouRatherQuestion?: Maybe<RussianWouldYouRatherQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `RussianWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `RussianWouldYouRatherQuestion`. May be used by Relay 1. */
  russianWouldYouRatherQuestionEdge?: Maybe<RussianWouldYouRatherQuestionsEdge>;
};


/** The output of our update `RussianWouldYouRatherQuestion` mutation. */
export type UpdateRussianWouldYouRatherQuestionPayloadRussianWouldYouRatherQuestionEdgeArgs = {
  orderBy?: Maybe<Array<RussianWouldYouRatherQuestionsOrderBy>>;
};

/** All input for the `updateSpanishRandomQuestionByNodeId` mutation. */
export type UpdateSpanishRandomQuestionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `SpanishRandomQuestion` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `SpanishRandomQuestion` being updated. */
  patch: SpanishRandomQuestionPatch;
};

/** All input for the `updateSpanishRandomQuestionByUuid` mutation. */
export type UpdateSpanishRandomQuestionByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `SpanishRandomQuestion` being updated. */
  patch: SpanishRandomQuestionPatch;
  uuid: Scalars['UUID'];
};

/** All input for the `updateSpanishRandomQuestion` mutation. */
export type UpdateSpanishRandomQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `SpanishRandomQuestion` being updated. */
  patch: SpanishRandomQuestionPatch;
  id: Scalars['Int'];
};

/** The output of our update `SpanishRandomQuestion` mutation. */
export type UpdateSpanishRandomQuestionPayload = {
  __typename?: 'UpdateSpanishRandomQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SpanishRandomQuestion` that was updated by this mutation. */
  spanishRandomQuestion?: Maybe<SpanishRandomQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `SpanishRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `SpanishRandomQuestion`. May be used by Relay 1. */
  spanishRandomQuestionEdge?: Maybe<SpanishRandomQuestionsEdge>;
};


/** The output of our update `SpanishRandomQuestion` mutation. */
export type UpdateSpanishRandomQuestionPayloadSpanishRandomQuestionEdgeArgs = {
  orderBy?: Maybe<Array<SpanishRandomQuestionsOrderBy>>;
};

/** All input for the `updateSpanishWordByNodeId` mutation. */
export type UpdateSpanishWordByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `SpanishWord` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `SpanishWord` being updated. */
  patch: SpanishWordPatch;
};

/** All input for the `updateSpanishWordByUuid` mutation. */
export type UpdateSpanishWordByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `SpanishWord` being updated. */
  patch: SpanishWordPatch;
  uuid: Scalars['UUID'];
};

/** All input for the `updateSpanishWord` mutation. */
export type UpdateSpanishWordInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `SpanishWord` being updated. */
  patch: SpanishWordPatch;
  id: Scalars['Int'];
};

/** The output of our update `SpanishWord` mutation. */
export type UpdateSpanishWordPayload = {
  __typename?: 'UpdateSpanishWordPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SpanishWord` that was updated by this mutation. */
  spanishWord?: Maybe<SpanishWord>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `SpanishWord`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `SpanishWord`. May be used by Relay 1. */
  spanishWordEdge?: Maybe<SpanishWordsEdge>;
};


/** The output of our update `SpanishWord` mutation. */
export type UpdateSpanishWordPayloadSpanishWordEdgeArgs = {
  orderBy?: Maybe<Array<SpanishWordsOrderBy>>;
};

/** All input for the `updateSpanishWouldYouRatherQuestionByNodeId` mutation. */
export type UpdateSpanishWouldYouRatherQuestionByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `SpanishWouldYouRatherQuestion` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `SpanishWouldYouRatherQuestion` being updated. */
  patch: SpanishWouldYouRatherQuestionPatch;
};

/** All input for the `updateSpanishWouldYouRatherQuestionByUuid` mutation. */
export type UpdateSpanishWouldYouRatherQuestionByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `SpanishWouldYouRatherQuestion` being updated. */
  patch: SpanishWouldYouRatherQuestionPatch;
  uuid: Scalars['UUID'];
};

/** All input for the `updateSpanishWouldYouRatherQuestion` mutation. */
export type UpdateSpanishWouldYouRatherQuestionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `SpanishWouldYouRatherQuestion` being updated. */
  patch: SpanishWouldYouRatherQuestionPatch;
  id: Scalars['Int'];
};

/** The output of our update `SpanishWouldYouRatherQuestion` mutation. */
export type UpdateSpanishWouldYouRatherQuestionPayload = {
  __typename?: 'UpdateSpanishWouldYouRatherQuestionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SpanishWouldYouRatherQuestion` that was updated by this mutation. */
  spanishWouldYouRatherQuestion?: Maybe<SpanishWouldYouRatherQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `SpanishWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `SpanishWouldYouRatherQuestion`. May be used by Relay 1. */
  spanishWouldYouRatherQuestionEdge?: Maybe<SpanishWouldYouRatherQuestionsEdge>;
};


/** The output of our update `SpanishWouldYouRatherQuestion` mutation. */
export type UpdateSpanishWouldYouRatherQuestionPayloadSpanishWouldYouRatherQuestionEdgeArgs = {
  orderBy?: Maybe<Array<SpanishWouldYouRatherQuestionsOrderBy>>;
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

/** All input for the `updateUserByEmailUnsubscribeToken` mutation. */
export type UpdateUserByEmailUnsubscribeTokenInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch;
  emailUnsubscribeToken: Scalars['String'];
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

/** All input for the `updateUserByUsername` mutation. */
export type UpdateUserByUsernameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch;
  username: Scalars['String'];
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

/** All input for the `updateUserDeviceByFcmToken` mutation. */
export type UpdateUserDeviceByFcmTokenInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `UserDevice` being updated. */
  patch: UserDevicePatch;
  fcmToken: Scalars['String'];
};

/** All input for the `updateUserDeviceByNodeId` mutation. */
export type UpdateUserDeviceByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `UserDevice` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `UserDevice` being updated. */
  patch: UserDevicePatch;
};

/** All input for the `updateUserDeviceByUuid` mutation. */
export type UpdateUserDeviceByUuidInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `UserDevice` being updated. */
  patch: UserDevicePatch;
  uuid: Scalars['UUID'];
};

/** All input for the `updateUserDevice` mutation. */
export type UpdateUserDeviceInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `UserDevice` being updated. */
  patch: UserDevicePatch;
  id: Scalars['Int'];
};

/** The output of our update `UserDevice` mutation. */
export type UpdateUserDevicePayload = {
  __typename?: 'UpdateUserDevicePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserDevice` that was updated by this mutation. */
  userDevice?: Maybe<UserDevice>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `UserDevice`. */
  user?: Maybe<User>;
  /** An edge for our `UserDevice`. May be used by Relay 1. */
  userDeviceEdge?: Maybe<UserDevicesEdge>;
};


/** The output of our update `UserDevice` mutation. */
export type UpdateUserDevicePayloadUserDeviceEdgeArgs = {
  orderBy?: Maybe<Array<UserDevicesOrderBy>>;
};

/** All input for the `updateUserFollowerByNodeId` mutation. */
export type UpdateUserFollowerByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `UserFollower` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `UserFollower` being updated. */
  patch: UserFollowerPatch;
};

/** All input for the `updateUserFollower` mutation. */
export type UpdateUserFollowerInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `UserFollower` being updated. */
  patch: UserFollowerPatch;
  id: Scalars['Int'];
};

/** The output of our update `UserFollower` mutation. */
export type UpdateUserFollowerPayload = {
  __typename?: 'UpdateUserFollowerPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserFollower` that was updated by this mutation. */
  userFollower?: Maybe<UserFollower>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `UserFollower`. */
  user?: Maybe<User>;
  /** Reads a single `User` that is related to this `UserFollower`. */
  follower?: Maybe<User>;
  /** An edge for our `UserFollower`. May be used by Relay 1. */
  userFollowerEdge?: Maybe<UserFollowersEdge>;
};


/** The output of our update `UserFollower` mutation. */
export type UpdateUserFollowerPayloadUserFollowerEdgeArgs = {
  orderBy?: Maybe<Array<UserFollowersOrderBy>>;
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
  /** Reads a single `InviteToken` that is related to this `User`. */
  signedUpWithToken?: Maybe<InviteToken>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our update `User` mutation. */
export type UpdateUserPayloadUserEdgeArgs = {
  orderBy?: Maybe<Array<UsersOrderBy>>;
};

/** All input for the `updateUserPreferenceByNodeId` mutation. */
export type UpdateUserPreferenceByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `UserPreference` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `UserPreference` being updated. */
  patch: UserPreferencePatch;
};

/** All input for the `updateUserPreferenceByUserId` mutation. */
export type UpdateUserPreferenceByUserIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `UserPreference` being updated. */
  patch: UserPreferencePatch;
  userId: Scalars['Int'];
};

/** All input for the `updateUserPreference` mutation. */
export type UpdateUserPreferenceInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `UserPreference` being updated. */
  patch: UserPreferencePatch;
  id: Scalars['Int'];
};

/** The output of our update `UserPreference` mutation. */
export type UpdateUserPreferencePayload = {
  __typename?: 'UpdateUserPreferencePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserPreference` that was updated by this mutation. */
  userPreference?: Maybe<UserPreference>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `UserPreference`. */
  user?: Maybe<User>;
  /** Reads a single `Language` that is related to this `UserPreference`. */
  feedLanguage?: Maybe<Language>;
  /** An edge for our `UserPreference`. May be used by Relay 1. */
  userPreferenceEdge?: Maybe<UserPreferencesEdge>;
};


/** The output of our update `UserPreference` mutation. */
export type UpdateUserPreferencePayloadUserPreferenceEdgeArgs = {
  orderBy?: Maybe<Array<UserPreferencesOrderBy>>;
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

/** All input for the upsert `ChineseGuessCharacterQuestion` mutation. */
export type UpsertChineseGuessCharacterQuestionInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ChineseGuessCharacterQuestion` to be upserted by this mutation. */
  chineseGuessCharacterQuestion: ChineseGuessCharacterQuestionInput;
};

/** The output of our upsert `ChineseGuessCharacterQuestion` mutation. */
export type UpsertChineseGuessCharacterQuestionPayload = {
  __typename?: 'UpsertChineseGuessCharacterQuestionPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ChineseGuessCharacterQuestion` that was upserted by this mutation. */
  chineseGuessCharacterQuestion?: Maybe<ChineseGuessCharacterQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `ChineseGuessCharacterQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `ChineseGuessCharacterQuestion`. May be used by Relay 1. */
  chineseGuessCharacterQuestionEdge?: Maybe<ChineseGuessCharacterQuestionsEdge>;
};


/** The output of our upsert `ChineseGuessCharacterQuestion` mutation. */
export type UpsertChineseGuessCharacterQuestionPayloadChineseGuessCharacterQuestionEdgeArgs = {
  orderBy?: Maybe<Array<ChineseGuessCharacterQuestionsOrderBy>>;
};

/** Where conditions for the upsert `ChineseGuessCharacterQuestion` mutation. */
export type UpsertChineseGuessCharacterQuestionWhere = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
};

/** All input for the upsert `ChineseRandomQuestion` mutation. */
export type UpsertChineseRandomQuestionInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ChineseRandomQuestion` to be upserted by this mutation. */
  chineseRandomQuestion: ChineseRandomQuestionInput;
};

/** The output of our upsert `ChineseRandomQuestion` mutation. */
export type UpsertChineseRandomQuestionPayload = {
  __typename?: 'UpsertChineseRandomQuestionPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ChineseRandomQuestion` that was upserted by this mutation. */
  chineseRandomQuestion?: Maybe<ChineseRandomQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `ChineseRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `ChineseRandomQuestion`. May be used by Relay 1. */
  chineseRandomQuestionEdge?: Maybe<ChineseRandomQuestionsEdge>;
};


/** The output of our upsert `ChineseRandomQuestion` mutation. */
export type UpsertChineseRandomQuestionPayloadChineseRandomQuestionEdgeArgs = {
  orderBy?: Maybe<Array<ChineseRandomQuestionsOrderBy>>;
};

/** Where conditions for the upsert `ChineseRandomQuestion` mutation. */
export type UpsertChineseRandomQuestionWhere = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
};

/** All input for the upsert `ChineseWouldYouRatherQuestion` mutation. */
export type UpsertChineseWouldYouRatherQuestionInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ChineseWouldYouRatherQuestion` to be upserted by this mutation. */
  chineseWouldYouRatherQuestion: ChineseWouldYouRatherQuestionInput;
};

/** The output of our upsert `ChineseWouldYouRatherQuestion` mutation. */
export type UpsertChineseWouldYouRatherQuestionPayload = {
  __typename?: 'UpsertChineseWouldYouRatherQuestionPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ChineseWouldYouRatherQuestion` that was upserted by this mutation. */
  chineseWouldYouRatherQuestion?: Maybe<ChineseWouldYouRatherQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `ChineseWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `ChineseWouldYouRatherQuestion`. May be used by Relay 1. */
  chineseWouldYouRatherQuestionEdge?: Maybe<ChineseWouldYouRatherQuestionsEdge>;
};


/** The output of our upsert `ChineseWouldYouRatherQuestion` mutation. */
export type UpsertChineseWouldYouRatherQuestionPayloadChineseWouldYouRatherQuestionEdgeArgs = {
  orderBy?: Maybe<Array<ChineseWouldYouRatherQuestionsOrderBy>>;
};

/** Where conditions for the upsert `ChineseWouldYouRatherQuestion` mutation. */
export type UpsertChineseWouldYouRatherQuestionWhere = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
};

/** All input for the upsert `EnglishRandomQuestion` mutation. */
export type UpsertEnglishRandomQuestionInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EnglishRandomQuestion` to be upserted by this mutation. */
  englishRandomQuestion: EnglishRandomQuestionInput;
};

/** The output of our upsert `EnglishRandomQuestion` mutation. */
export type UpsertEnglishRandomQuestionPayload = {
  __typename?: 'UpsertEnglishRandomQuestionPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EnglishRandomQuestion` that was upserted by this mutation. */
  englishRandomQuestion?: Maybe<EnglishRandomQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `EnglishRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `EnglishRandomQuestion`. May be used by Relay 1. */
  englishRandomQuestionEdge?: Maybe<EnglishRandomQuestionsEdge>;
};


/** The output of our upsert `EnglishRandomQuestion` mutation. */
export type UpsertEnglishRandomQuestionPayloadEnglishRandomQuestionEdgeArgs = {
  orderBy?: Maybe<Array<EnglishRandomQuestionsOrderBy>>;
};

/** Where conditions for the upsert `EnglishRandomQuestion` mutation. */
export type UpsertEnglishRandomQuestionWhere = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
};

/** All input for the upsert `EnglishWord` mutation. */
export type UpsertEnglishWordInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EnglishWord` to be upserted by this mutation. */
  englishWord: EnglishWordInput;
};

/** The output of our upsert `EnglishWord` mutation. */
export type UpsertEnglishWordPayload = {
  __typename?: 'UpsertEnglishWordPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EnglishWord` that was upserted by this mutation. */
  englishWord?: Maybe<EnglishWord>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `EnglishWord`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `EnglishWord`. May be used by Relay 1. */
  englishWordEdge?: Maybe<EnglishWordsEdge>;
};


/** The output of our upsert `EnglishWord` mutation. */
export type UpsertEnglishWordPayloadEnglishWordEdgeArgs = {
  orderBy?: Maybe<Array<EnglishWordsOrderBy>>;
};

/** Where conditions for the upsert `EnglishWord` mutation. */
export type UpsertEnglishWordWhere = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
};

/** All input for the upsert `EnglishWouldYouRatherQuestion` mutation. */
export type UpsertEnglishWouldYouRatherQuestionInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EnglishWouldYouRatherQuestion` to be upserted by this mutation. */
  englishWouldYouRatherQuestion: EnglishWouldYouRatherQuestionInput;
};

/** The output of our upsert `EnglishWouldYouRatherQuestion` mutation. */
export type UpsertEnglishWouldYouRatherQuestionPayload = {
  __typename?: 'UpsertEnglishWouldYouRatherQuestionPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `EnglishWouldYouRatherQuestion` that was upserted by this mutation. */
  englishWouldYouRatherQuestion?: Maybe<EnglishWouldYouRatherQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `EnglishWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `EnglishWouldYouRatherQuestion`. May be used by Relay 1. */
  englishWouldYouRatherQuestionEdge?: Maybe<EnglishWouldYouRatherQuestionsEdge>;
};


/** The output of our upsert `EnglishWouldYouRatherQuestion` mutation. */
export type UpsertEnglishWouldYouRatherQuestionPayloadEnglishWouldYouRatherQuestionEdgeArgs = {
  orderBy?: Maybe<Array<EnglishWouldYouRatherQuestionsOrderBy>>;
};

/** Where conditions for the upsert `EnglishWouldYouRatherQuestion` mutation. */
export type UpsertEnglishWouldYouRatherQuestionWhere = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
};

/** All input for the upsert `FrenchRandomQuestion` mutation. */
export type UpsertFrenchRandomQuestionInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `FrenchRandomQuestion` to be upserted by this mutation. */
  frenchRandomQuestion: FrenchRandomQuestionInput;
};

/** The output of our upsert `FrenchRandomQuestion` mutation. */
export type UpsertFrenchRandomQuestionPayload = {
  __typename?: 'UpsertFrenchRandomQuestionPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `FrenchRandomQuestion` that was upserted by this mutation. */
  frenchRandomQuestion?: Maybe<FrenchRandomQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `FrenchRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `FrenchRandomQuestion`. May be used by Relay 1. */
  frenchRandomQuestionEdge?: Maybe<FrenchRandomQuestionsEdge>;
};


/** The output of our upsert `FrenchRandomQuestion` mutation. */
export type UpsertFrenchRandomQuestionPayloadFrenchRandomQuestionEdgeArgs = {
  orderBy?: Maybe<Array<FrenchRandomQuestionsOrderBy>>;
};

/** Where conditions for the upsert `FrenchRandomQuestion` mutation. */
export type UpsertFrenchRandomQuestionWhere = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
};

/** All input for the upsert `FrenchWord` mutation. */
export type UpsertFrenchWordInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `FrenchWord` to be upserted by this mutation. */
  frenchWord: FrenchWordInput;
};

/** The output of our upsert `FrenchWord` mutation. */
export type UpsertFrenchWordPayload = {
  __typename?: 'UpsertFrenchWordPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `FrenchWord` that was upserted by this mutation. */
  frenchWord?: Maybe<FrenchWord>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `FrenchWord`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `FrenchWord`. May be used by Relay 1. */
  frenchWordEdge?: Maybe<FrenchWordsEdge>;
};


/** The output of our upsert `FrenchWord` mutation. */
export type UpsertFrenchWordPayloadFrenchWordEdgeArgs = {
  orderBy?: Maybe<Array<FrenchWordsOrderBy>>;
};

/** Where conditions for the upsert `FrenchWord` mutation. */
export type UpsertFrenchWordWhere = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
};

/** All input for the upsert `FrenchWouldYouRatherQuestion` mutation. */
export type UpsertFrenchWouldYouRatherQuestionInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `FrenchWouldYouRatherQuestion` to be upserted by this mutation. */
  frenchWouldYouRatherQuestion: FrenchWouldYouRatherQuestionInput;
};

/** The output of our upsert `FrenchWouldYouRatherQuestion` mutation. */
export type UpsertFrenchWouldYouRatherQuestionPayload = {
  __typename?: 'UpsertFrenchWouldYouRatherQuestionPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `FrenchWouldYouRatherQuestion` that was upserted by this mutation. */
  frenchWouldYouRatherQuestion?: Maybe<FrenchWouldYouRatherQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `FrenchWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `FrenchWouldYouRatherQuestion`. May be used by Relay 1. */
  frenchWouldYouRatherQuestionEdge?: Maybe<FrenchWouldYouRatherQuestionsEdge>;
};


/** The output of our upsert `FrenchWouldYouRatherQuestion` mutation. */
export type UpsertFrenchWouldYouRatherQuestionPayloadFrenchWouldYouRatherQuestionEdgeArgs = {
  orderBy?: Maybe<Array<FrenchWouldYouRatherQuestionsOrderBy>>;
};

/** Where conditions for the upsert `FrenchWouldYouRatherQuestion` mutation. */
export type UpsertFrenchWouldYouRatherQuestionWhere = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
};

/** All input for the upsert `GermanRandomQuestion` mutation. */
export type UpsertGermanRandomQuestionInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `GermanRandomQuestion` to be upserted by this mutation. */
  germanRandomQuestion: GermanRandomQuestionInput;
};

/** The output of our upsert `GermanRandomQuestion` mutation. */
export type UpsertGermanRandomQuestionPayload = {
  __typename?: 'UpsertGermanRandomQuestionPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `GermanRandomQuestion` that was upserted by this mutation. */
  germanRandomQuestion?: Maybe<GermanRandomQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `GermanRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `GermanRandomQuestion`. May be used by Relay 1. */
  germanRandomQuestionEdge?: Maybe<GermanRandomQuestionsEdge>;
};


/** The output of our upsert `GermanRandomQuestion` mutation. */
export type UpsertGermanRandomQuestionPayloadGermanRandomQuestionEdgeArgs = {
  orderBy?: Maybe<Array<GermanRandomQuestionsOrderBy>>;
};

/** Where conditions for the upsert `GermanRandomQuestion` mutation. */
export type UpsertGermanRandomQuestionWhere = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
};

/** All input for the upsert `GermanWord` mutation. */
export type UpsertGermanWordInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `GermanWord` to be upserted by this mutation. */
  germanWord: GermanWordInput;
};

/** The output of our upsert `GermanWord` mutation. */
export type UpsertGermanWordPayload = {
  __typename?: 'UpsertGermanWordPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `GermanWord` that was upserted by this mutation. */
  germanWord?: Maybe<GermanWord>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `GermanWord`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `GermanWord`. May be used by Relay 1. */
  germanWordEdge?: Maybe<GermanWordsEdge>;
};


/** The output of our upsert `GermanWord` mutation. */
export type UpsertGermanWordPayloadGermanWordEdgeArgs = {
  orderBy?: Maybe<Array<GermanWordsOrderBy>>;
};

/** Where conditions for the upsert `GermanWord` mutation. */
export type UpsertGermanWordWhere = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
};

/** All input for the upsert `GermanWouldYouRatherQuestion` mutation. */
export type UpsertGermanWouldYouRatherQuestionInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `GermanWouldYouRatherQuestion` to be upserted by this mutation. */
  germanWouldYouRatherQuestion: GermanWouldYouRatherQuestionInput;
};

/** The output of our upsert `GermanWouldYouRatherQuestion` mutation. */
export type UpsertGermanWouldYouRatherQuestionPayload = {
  __typename?: 'UpsertGermanWouldYouRatherQuestionPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `GermanWouldYouRatherQuestion` that was upserted by this mutation. */
  germanWouldYouRatherQuestion?: Maybe<GermanWouldYouRatherQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `GermanWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `GermanWouldYouRatherQuestion`. May be used by Relay 1. */
  germanWouldYouRatherQuestionEdge?: Maybe<GermanWouldYouRatherQuestionsEdge>;
};


/** The output of our upsert `GermanWouldYouRatherQuestion` mutation. */
export type UpsertGermanWouldYouRatherQuestionPayloadGermanWouldYouRatherQuestionEdgeArgs = {
  orderBy?: Maybe<Array<GermanWouldYouRatherQuestionsOrderBy>>;
};

/** Where conditions for the upsert `GermanWouldYouRatherQuestion` mutation. */
export type UpsertGermanWouldYouRatherQuestionWhere = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
};

/** All input for the upsert `Group` mutation. */
export type UpsertGroupInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Group` to be upserted by this mutation. */
  group: GroupInput;
};

/** The output of our upsert `Group` mutation. */
export type UpsertGroupPayload = {
  __typename?: 'UpsertGroupPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Group` that was upserted by this mutation. */
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


/** The output of our upsert `Group` mutation. */
export type UpsertGroupPayloadGroupEdgeArgs = {
  orderBy?: Maybe<Array<GroupsOrderBy>>;
};

/** All input for the upsert `GroupUser` mutation. */
export type UpsertGroupUserInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `GroupUser` to be upserted by this mutation. */
  groupUser: GroupUserInput;
};

/** The output of our upsert `GroupUser` mutation. */
export type UpsertGroupUserPayload = {
  __typename?: 'UpsertGroupUserPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `GroupUser` that was upserted by this mutation. */
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


/** The output of our upsert `GroupUser` mutation. */
export type UpsertGroupUserPayloadGroupUserEdgeArgs = {
  orderBy?: Maybe<Array<GroupUsersOrderBy>>;
};

/** Where conditions for the upsert `GroupUser` mutation. */
export type UpsertGroupUserWhere = {
  id?: Maybe<Scalars['Int']>;
};

/** Where conditions for the upsert `Group` mutation. */
export type UpsertGroupWhere = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
};

/** All input for the upsert `InviteToken` mutation. */
export type UpsertInviteTokenInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `InviteToken` to be upserted by this mutation. */
  inviteToken: InviteTokenInput;
};

/** The output of our upsert `InviteToken` mutation. */
export type UpsertInviteTokenPayload = {
  __typename?: 'UpsertInviteTokenPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `InviteToken` that was upserted by this mutation. */
  inviteToken?: Maybe<InviteToken>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `InviteToken`. */
  user?: Maybe<User>;
  /** An edge for our `InviteToken`. May be used by Relay 1. */
  inviteTokenEdge?: Maybe<InviteTokensEdge>;
};


/** The output of our upsert `InviteToken` mutation. */
export type UpsertInviteTokenPayloadInviteTokenEdgeArgs = {
  orderBy?: Maybe<Array<InviteTokensOrderBy>>;
};

/** Where conditions for the upsert `InviteToken` mutation. */
export type UpsertInviteTokenWhere = {
  id?: Maybe<Scalars['Int']>;
};

/** All input for the upsert `ItalianRandomQuestion` mutation. */
export type UpsertItalianRandomQuestionInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ItalianRandomQuestion` to be upserted by this mutation. */
  italianRandomQuestion: ItalianRandomQuestionInput;
};

/** The output of our upsert `ItalianRandomQuestion` mutation. */
export type UpsertItalianRandomQuestionPayload = {
  __typename?: 'UpsertItalianRandomQuestionPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ItalianRandomQuestion` that was upserted by this mutation. */
  italianRandomQuestion?: Maybe<ItalianRandomQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `ItalianRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `ItalianRandomQuestion`. May be used by Relay 1. */
  italianRandomQuestionEdge?: Maybe<ItalianRandomQuestionsEdge>;
};


/** The output of our upsert `ItalianRandomQuestion` mutation. */
export type UpsertItalianRandomQuestionPayloadItalianRandomQuestionEdgeArgs = {
  orderBy?: Maybe<Array<ItalianRandomQuestionsOrderBy>>;
};

/** Where conditions for the upsert `ItalianRandomQuestion` mutation. */
export type UpsertItalianRandomQuestionWhere = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
};

/** All input for the upsert `ItalianWord` mutation. */
export type UpsertItalianWordInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ItalianWord` to be upserted by this mutation. */
  italianWord: ItalianWordInput;
};

/** The output of our upsert `ItalianWord` mutation. */
export type UpsertItalianWordPayload = {
  __typename?: 'UpsertItalianWordPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ItalianWord` that was upserted by this mutation. */
  italianWord?: Maybe<ItalianWord>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `ItalianWord`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `ItalianWord`. May be used by Relay 1. */
  italianWordEdge?: Maybe<ItalianWordsEdge>;
};


/** The output of our upsert `ItalianWord` mutation. */
export type UpsertItalianWordPayloadItalianWordEdgeArgs = {
  orderBy?: Maybe<Array<ItalianWordsOrderBy>>;
};

/** Where conditions for the upsert `ItalianWord` mutation. */
export type UpsertItalianWordWhere = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
};

/** All input for the upsert `ItalianWouldYouRatherQuestion` mutation. */
export type UpsertItalianWouldYouRatherQuestionInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ItalianWouldYouRatherQuestion` to be upserted by this mutation. */
  italianWouldYouRatherQuestion: ItalianWouldYouRatherQuestionInput;
};

/** The output of our upsert `ItalianWouldYouRatherQuestion` mutation. */
export type UpsertItalianWouldYouRatherQuestionPayload = {
  __typename?: 'UpsertItalianWouldYouRatherQuestionPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ItalianWouldYouRatherQuestion` that was upserted by this mutation. */
  italianWouldYouRatherQuestion?: Maybe<ItalianWouldYouRatherQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `ItalianWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `ItalianWouldYouRatherQuestion`. May be used by Relay 1. */
  italianWouldYouRatherQuestionEdge?: Maybe<ItalianWouldYouRatherQuestionsEdge>;
};


/** The output of our upsert `ItalianWouldYouRatherQuestion` mutation. */
export type UpsertItalianWouldYouRatherQuestionPayloadItalianWouldYouRatherQuestionEdgeArgs = {
  orderBy?: Maybe<Array<ItalianWouldYouRatherQuestionsOrderBy>>;
};

/** Where conditions for the upsert `ItalianWouldYouRatherQuestion` mutation. */
export type UpsertItalianWouldYouRatherQuestionWhere = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
};

/** All input for the upsert `JapaneseRandomQuestion` mutation. */
export type UpsertJapaneseRandomQuestionInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `JapaneseRandomQuestion` to be upserted by this mutation. */
  japaneseRandomQuestion: JapaneseRandomQuestionInput;
};

/** The output of our upsert `JapaneseRandomQuestion` mutation. */
export type UpsertJapaneseRandomQuestionPayload = {
  __typename?: 'UpsertJapaneseRandomQuestionPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `JapaneseRandomQuestion` that was upserted by this mutation. */
  japaneseRandomQuestion?: Maybe<JapaneseRandomQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `JapaneseRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `JapaneseRandomQuestion`. May be used by Relay 1. */
  japaneseRandomQuestionEdge?: Maybe<JapaneseRandomQuestionsEdge>;
};


/** The output of our upsert `JapaneseRandomQuestion` mutation. */
export type UpsertJapaneseRandomQuestionPayloadJapaneseRandomQuestionEdgeArgs = {
  orderBy?: Maybe<Array<JapaneseRandomQuestionsOrderBy>>;
};

/** Where conditions for the upsert `JapaneseRandomQuestion` mutation. */
export type UpsertJapaneseRandomQuestionWhere = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
};

/** All input for the upsert `JapaneseWouldYouRatherQuestion` mutation. */
export type UpsertJapaneseWouldYouRatherQuestionInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `JapaneseWouldYouRatherQuestion` to be upserted by this mutation. */
  japaneseWouldYouRatherQuestion: JapaneseWouldYouRatherQuestionInput;
};

/** The output of our upsert `JapaneseWouldYouRatherQuestion` mutation. */
export type UpsertJapaneseWouldYouRatherQuestionPayload = {
  __typename?: 'UpsertJapaneseWouldYouRatherQuestionPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `JapaneseWouldYouRatherQuestion` that was upserted by this mutation. */
  japaneseWouldYouRatherQuestion?: Maybe<JapaneseWouldYouRatherQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `JapaneseWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `JapaneseWouldYouRatherQuestion`. May be used by Relay 1. */
  japaneseWouldYouRatherQuestionEdge?: Maybe<JapaneseWouldYouRatherQuestionsEdge>;
};


/** The output of our upsert `JapaneseWouldYouRatherQuestion` mutation. */
export type UpsertJapaneseWouldYouRatherQuestionPayloadJapaneseWouldYouRatherQuestionEdgeArgs = {
  orderBy?: Maybe<Array<JapaneseWouldYouRatherQuestionsOrderBy>>;
};

/** Where conditions for the upsert `JapaneseWouldYouRatherQuestion` mutation. */
export type UpsertJapaneseWouldYouRatherQuestionWhere = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
};

/** All input for the upsert `KoreanRandomQuestion` mutation. */
export type UpsertKoreanRandomQuestionInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `KoreanRandomQuestion` to be upserted by this mutation. */
  koreanRandomQuestion: KoreanRandomQuestionInput;
};

/** The output of our upsert `KoreanRandomQuestion` mutation. */
export type UpsertKoreanRandomQuestionPayload = {
  __typename?: 'UpsertKoreanRandomQuestionPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `KoreanRandomQuestion` that was upserted by this mutation. */
  koreanRandomQuestion?: Maybe<KoreanRandomQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `KoreanRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `KoreanRandomQuestion`. May be used by Relay 1. */
  koreanRandomQuestionEdge?: Maybe<KoreanRandomQuestionsEdge>;
};


/** The output of our upsert `KoreanRandomQuestion` mutation. */
export type UpsertKoreanRandomQuestionPayloadKoreanRandomQuestionEdgeArgs = {
  orderBy?: Maybe<Array<KoreanRandomQuestionsOrderBy>>;
};

/** Where conditions for the upsert `KoreanRandomQuestion` mutation. */
export type UpsertKoreanRandomQuestionWhere = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
};

/** All input for the upsert `KoreanWouldYouRatherQuestion` mutation. */
export type UpsertKoreanWouldYouRatherQuestionInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `KoreanWouldYouRatherQuestion` to be upserted by this mutation. */
  koreanWouldYouRatherQuestion: KoreanWouldYouRatherQuestionInput;
};

/** The output of our upsert `KoreanWouldYouRatherQuestion` mutation. */
export type UpsertKoreanWouldYouRatherQuestionPayload = {
  __typename?: 'UpsertKoreanWouldYouRatherQuestionPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `KoreanWouldYouRatherQuestion` that was upserted by this mutation. */
  koreanWouldYouRatherQuestion?: Maybe<KoreanWouldYouRatherQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `KoreanWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `KoreanWouldYouRatherQuestion`. May be used by Relay 1. */
  koreanWouldYouRatherQuestionEdge?: Maybe<KoreanWouldYouRatherQuestionsEdge>;
};


/** The output of our upsert `KoreanWouldYouRatherQuestion` mutation. */
export type UpsertKoreanWouldYouRatherQuestionPayloadKoreanWouldYouRatherQuestionEdgeArgs = {
  orderBy?: Maybe<Array<KoreanWouldYouRatherQuestionsOrderBy>>;
};

/** Where conditions for the upsert `KoreanWouldYouRatherQuestion` mutation. */
export type UpsertKoreanWouldYouRatherQuestionWhere = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
};

/** All input for the upsert `Language` mutation. */
export type UpsertLanguageInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Language` to be upserted by this mutation. */
  language: LanguageInput;
};

/** The output of our upsert `Language` mutation. */
export type UpsertLanguagePayload = {
  __typename?: 'UpsertLanguagePayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Language` that was upserted by this mutation. */
  language?: Maybe<Language>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Language`. May be used by Relay 1. */
  languageEdge?: Maybe<LanguagesEdge>;
};


/** The output of our upsert `Language` mutation. */
export type UpsertLanguagePayloadLanguageEdgeArgs = {
  orderBy?: Maybe<Array<LanguagesOrderBy>>;
};

/** All input for the upsert `LanguageSkillLevel` mutation. */
export type UpsertLanguageSkillLevelInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `LanguageSkillLevel` to be upserted by this mutation. */
  languageSkillLevel: LanguageSkillLevelInput;
};

/** The output of our upsert `LanguageSkillLevel` mutation. */
export type UpsertLanguageSkillLevelPayload = {
  __typename?: 'UpsertLanguageSkillLevelPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `LanguageSkillLevel` that was upserted by this mutation. */
  languageSkillLevel?: Maybe<LanguageSkillLevel>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `LanguageSkillLevel`. May be used by Relay 1. */
  languageSkillLevelEdge?: Maybe<LanguageSkillLevelsEdge>;
};


/** The output of our upsert `LanguageSkillLevel` mutation. */
export type UpsertLanguageSkillLevelPayloadLanguageSkillLevelEdgeArgs = {
  orderBy?: Maybe<Array<LanguageSkillLevelsOrderBy>>;
};

/** Where conditions for the upsert `LanguageSkillLevel` mutation. */
export type UpsertLanguageSkillLevelWhere = {
  id?: Maybe<Scalars['Int']>;
};

/** Where conditions for the upsert `Language` mutation. */
export type UpsertLanguageWhere = {
  id?: Maybe<Scalars['Int']>;
  alpha2?: Maybe<Scalars['String']>;
  englishName?: Maybe<Scalars['String']>;
};

/** All input for the upsert `Message` mutation. */
export type UpsertMessageInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Message` to be upserted by this mutation. */
  message: MessageInput;
};

/** The output of our upsert `Message` mutation. */
export type UpsertMessagePayload = {
  __typename?: 'UpsertMessagePayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Message` that was upserted by this mutation. */
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


/** The output of our upsert `Message` mutation. */
export type UpsertMessagePayloadMessageEdgeArgs = {
  orderBy?: Maybe<Array<MessagesOrderBy>>;
};

/** All input for the upsert `MessagePreview` mutation. */
export type UpsertMessagePreviewInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MessagePreview` to be upserted by this mutation. */
  messagePreview: MessagePreviewInput;
};

/** The output of our upsert `MessagePreview` mutation. */
export type UpsertMessagePreviewPayload = {
  __typename?: 'UpsertMessagePreviewPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MessagePreview` that was upserted by this mutation. */
  messagePreview?: Maybe<MessagePreview>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Message` that is related to this `MessagePreview`. */
  message?: Maybe<Message>;
  /** An edge for our `MessagePreview`. May be used by Relay 1. */
  messagePreviewEdge?: Maybe<MessagePreviewsEdge>;
};


/** The output of our upsert `MessagePreview` mutation. */
export type UpsertMessagePreviewPayloadMessagePreviewEdgeArgs = {
  orderBy?: Maybe<Array<MessagePreviewsOrderBy>>;
};

/** Where conditions for the upsert `MessagePreview` mutation. */
export type UpsertMessagePreviewWhere = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
};

/** Where conditions for the upsert `Message` mutation. */
export type UpsertMessageWhere = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
};

/** All input for the upsert `NotificationChannel` mutation. */
export type UpsertNotificationChannelInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `NotificationChannel` to be upserted by this mutation. */
  notificationChannel: NotificationChannelInput;
};

/** The output of our upsert `NotificationChannel` mutation. */
export type UpsertNotificationChannelPayload = {
  __typename?: 'UpsertNotificationChannelPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `NotificationChannel` that was upserted by this mutation. */
  notificationChannel?: Maybe<NotificationChannel>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `NotificationChannel`. May be used by Relay 1. */
  notificationChannelEdge?: Maybe<NotificationChannelsEdge>;
};


/** The output of our upsert `NotificationChannel` mutation. */
export type UpsertNotificationChannelPayloadNotificationChannelEdgeArgs = {
  orderBy?: Maybe<Array<NotificationChannelsOrderBy>>;
};

/** Where conditions for the upsert `NotificationChannel` mutation. */
export type UpsertNotificationChannelWhere = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  name?: Maybe<Scalars['String']>;
};

/** All input for the upsert `Notification` mutation. */
export type UpsertNotificationInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Notification` to be upserted by this mutation. */
  notification: NotificationInput;
};

/** The output of our upsert `Notification` mutation. */
export type UpsertNotificationPayload = {
  __typename?: 'UpsertNotificationPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Notification` that was upserted by this mutation. */
  notification?: Maybe<Notification>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `Notification`. */
  recipient?: Maybe<User>;
  /** Reads a single `NotificationChannel` that is related to this `Notification`. */
  channel?: Maybe<NotificationChannel>;
  /** Reads a single `Group` that is related to this `Notification`. */
  recipientGroup?: Maybe<Group>;
  /** An edge for our `Notification`. May be used by Relay 1. */
  notificationEdge?: Maybe<NotificationsEdge>;
};


/** The output of our upsert `Notification` mutation. */
export type UpsertNotificationPayloadNotificationEdgeArgs = {
  orderBy?: Maybe<Array<NotificationsOrderBy>>;
};

/** Where conditions for the upsert `Notification` mutation. */
export type UpsertNotificationWhere = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
};

/** All input for the upsert `PortugueseRandomQuestion` mutation. */
export type UpsertPortugueseRandomQuestionInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `PortugueseRandomQuestion` to be upserted by this mutation. */
  portugueseRandomQuestion: PortugueseRandomQuestionInput;
};

/** The output of our upsert `PortugueseRandomQuestion` mutation. */
export type UpsertPortugueseRandomQuestionPayload = {
  __typename?: 'UpsertPortugueseRandomQuestionPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `PortugueseRandomQuestion` that was upserted by this mutation. */
  portugueseRandomQuestion?: Maybe<PortugueseRandomQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `PortugueseRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `PortugueseRandomQuestion`. May be used by Relay 1. */
  portugueseRandomQuestionEdge?: Maybe<PortugueseRandomQuestionsEdge>;
};


/** The output of our upsert `PortugueseRandomQuestion` mutation. */
export type UpsertPortugueseRandomQuestionPayloadPortugueseRandomQuestionEdgeArgs = {
  orderBy?: Maybe<Array<PortugueseRandomQuestionsOrderBy>>;
};

/** Where conditions for the upsert `PortugueseRandomQuestion` mutation. */
export type UpsertPortugueseRandomQuestionWhere = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
};

/** All input for the upsert `PortugueseWord` mutation. */
export type UpsertPortugueseWordInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `PortugueseWord` to be upserted by this mutation. */
  portugueseWord: PortugueseWordInput;
};

/** The output of our upsert `PortugueseWord` mutation. */
export type UpsertPortugueseWordPayload = {
  __typename?: 'UpsertPortugueseWordPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `PortugueseWord` that was upserted by this mutation. */
  portugueseWord?: Maybe<PortugueseWord>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `PortugueseWord`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `PortugueseWord`. May be used by Relay 1. */
  portugueseWordEdge?: Maybe<PortugueseWordsEdge>;
};


/** The output of our upsert `PortugueseWord` mutation. */
export type UpsertPortugueseWordPayloadPortugueseWordEdgeArgs = {
  orderBy?: Maybe<Array<PortugueseWordsOrderBy>>;
};

/** Where conditions for the upsert `PortugueseWord` mutation. */
export type UpsertPortugueseWordWhere = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
};

/** All input for the upsert `PortugueseWouldYouRatherQuestion` mutation. */
export type UpsertPortugueseWouldYouRatherQuestionInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `PortugueseWouldYouRatherQuestion` to be upserted by this mutation. */
  portugueseWouldYouRatherQuestion: PortugueseWouldYouRatherQuestionInput;
};

/** The output of our upsert `PortugueseWouldYouRatherQuestion` mutation. */
export type UpsertPortugueseWouldYouRatherQuestionPayload = {
  __typename?: 'UpsertPortugueseWouldYouRatherQuestionPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `PortugueseWouldYouRatherQuestion` that was upserted by this mutation. */
  portugueseWouldYouRatherQuestion?: Maybe<PortugueseWouldYouRatherQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `PortugueseWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `PortugueseWouldYouRatherQuestion`. May be used by Relay 1. */
  portugueseWouldYouRatherQuestionEdge?: Maybe<PortugueseWouldYouRatherQuestionsEdge>;
};


/** The output of our upsert `PortugueseWouldYouRatherQuestion` mutation. */
export type UpsertPortugueseWouldYouRatherQuestionPayloadPortugueseWouldYouRatherQuestionEdgeArgs = {
  orderBy?: Maybe<Array<PortugueseWouldYouRatherQuestionsOrderBy>>;
};

/** Where conditions for the upsert `PortugueseWouldYouRatherQuestion` mutation. */
export type UpsertPortugueseWouldYouRatherQuestionWhere = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
};

/** All input for the upsert `Post` mutation. */
export type UpsertPostInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Post` to be upserted by this mutation. */
  post: PostInput;
};

/** All input for the upsert `PostLike` mutation. */
export type UpsertPostLikeInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `PostLike` to be upserted by this mutation. */
  postLike: PostLikeInput;
};

/** The output of our upsert `PostLike` mutation. */
export type UpsertPostLikePayload = {
  __typename?: 'UpsertPostLikePayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `PostLike` that was upserted by this mutation. */
  postLike?: Maybe<PostLike>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `PostLike`. */
  user?: Maybe<User>;
  /** Reads a single `Post` that is related to this `PostLike`. */
  post?: Maybe<Post>;
  /** An edge for our `PostLike`. May be used by Relay 1. */
  postLikeEdge?: Maybe<PostLikesEdge>;
};


/** The output of our upsert `PostLike` mutation. */
export type UpsertPostLikePayloadPostLikeEdgeArgs = {
  orderBy?: Maybe<Array<PostLikesOrderBy>>;
};

/** Where conditions for the upsert `PostLike` mutation. */
export type UpsertPostLikeWhere = {
  id?: Maybe<Scalars['Int']>;
};

/** The output of our upsert `Post` mutation. */
export type UpsertPostPayload = {
  __typename?: 'UpsertPostPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Post` that was upserted by this mutation. */
  post?: Maybe<Post>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `Post`. */
  author?: Maybe<User>;
  /** Reads a single `Post` that is related to this `Post`. */
  parentPost?: Maybe<Post>;
  /** Reads a single `Language` that is related to this `Post`. */
  language?: Maybe<Language>;
  /** Reads a single `Prompt` that is related to this `Post`. */
  prompt?: Maybe<Prompt>;
  /** An edge for our `Post`. May be used by Relay 1. */
  postEdge?: Maybe<PostsEdge>;
};


/** The output of our upsert `Post` mutation. */
export type UpsertPostPayloadPostEdgeArgs = {
  orderBy?: Maybe<Array<PostsOrderBy>>;
};

/** All input for the upsert `PostRecording` mutation. */
export type UpsertPostRecordingInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `PostRecording` to be upserted by this mutation. */
  postRecording: PostRecordingInput;
};

/** The output of our upsert `PostRecording` mutation. */
export type UpsertPostRecordingPayload = {
  __typename?: 'UpsertPostRecordingPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `PostRecording` that was upserted by this mutation. */
  postRecording?: Maybe<PostRecording>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `PostRecording`. */
  user?: Maybe<User>;
  /** Reads a single `Post` that is related to this `PostRecording`. */
  post?: Maybe<Post>;
  /** An edge for our `PostRecording`. May be used by Relay 1. */
  postRecordingEdge?: Maybe<PostRecordingsEdge>;
};


/** The output of our upsert `PostRecording` mutation. */
export type UpsertPostRecordingPayloadPostRecordingEdgeArgs = {
  orderBy?: Maybe<Array<PostRecordingsOrderBy>>;
};

/** Where conditions for the upsert `PostRecording` mutation. */
export type UpsertPostRecordingWhere = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
};

/** Where conditions for the upsert `Post` mutation. */
export type UpsertPostWhere = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
};

/** All input for the upsert `Prompt` mutation. */
export type UpsertPromptInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Prompt` to be upserted by this mutation. */
  prompt: PromptInput;
};

/** The output of our upsert `Prompt` mutation. */
export type UpsertPromptPayload = {
  __typename?: 'UpsertPromptPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Prompt` that was upserted by this mutation. */
  prompt?: Maybe<Prompt>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Language` that is related to this `Prompt`. */
  language?: Maybe<Language>;
  /** Reads a single `LanguageSkillLevel` that is related to this `Prompt`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `Prompt`. May be used by Relay 1. */
  promptEdge?: Maybe<PromptsEdge>;
};


/** The output of our upsert `Prompt` mutation. */
export type UpsertPromptPayloadPromptEdgeArgs = {
  orderBy?: Maybe<Array<PromptsOrderBy>>;
};

/** Where conditions for the upsert `Prompt` mutation. */
export type UpsertPromptWhere = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
};

/** All input for the upsert `RussianRandomQuestion` mutation. */
export type UpsertRussianRandomQuestionInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `RussianRandomQuestion` to be upserted by this mutation. */
  russianRandomQuestion: RussianRandomQuestionInput;
};

/** The output of our upsert `RussianRandomQuestion` mutation. */
export type UpsertRussianRandomQuestionPayload = {
  __typename?: 'UpsertRussianRandomQuestionPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `RussianRandomQuestion` that was upserted by this mutation. */
  russianRandomQuestion?: Maybe<RussianRandomQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `RussianRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `RussianRandomQuestion`. May be used by Relay 1. */
  russianRandomQuestionEdge?: Maybe<RussianRandomQuestionsEdge>;
};


/** The output of our upsert `RussianRandomQuestion` mutation. */
export type UpsertRussianRandomQuestionPayloadRussianRandomQuestionEdgeArgs = {
  orderBy?: Maybe<Array<RussianRandomQuestionsOrderBy>>;
};

/** Where conditions for the upsert `RussianRandomQuestion` mutation. */
export type UpsertRussianRandomQuestionWhere = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
};

/** All input for the upsert `RussianWord` mutation. */
export type UpsertRussianWordInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `RussianWord` to be upserted by this mutation. */
  russianWord: RussianWordInput;
};

/** The output of our upsert `RussianWord` mutation. */
export type UpsertRussianWordPayload = {
  __typename?: 'UpsertRussianWordPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `RussianWord` that was upserted by this mutation. */
  russianWord?: Maybe<RussianWord>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `RussianWord`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `RussianWord`. May be used by Relay 1. */
  russianWordEdge?: Maybe<RussianWordsEdge>;
};


/** The output of our upsert `RussianWord` mutation. */
export type UpsertRussianWordPayloadRussianWordEdgeArgs = {
  orderBy?: Maybe<Array<RussianWordsOrderBy>>;
};

/** Where conditions for the upsert `RussianWord` mutation. */
export type UpsertRussianWordWhere = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
};

/** All input for the upsert `RussianWouldYouRatherQuestion` mutation. */
export type UpsertRussianWouldYouRatherQuestionInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `RussianWouldYouRatherQuestion` to be upserted by this mutation. */
  russianWouldYouRatherQuestion: RussianWouldYouRatherQuestionInput;
};

/** The output of our upsert `RussianWouldYouRatherQuestion` mutation. */
export type UpsertRussianWouldYouRatherQuestionPayload = {
  __typename?: 'UpsertRussianWouldYouRatherQuestionPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `RussianWouldYouRatherQuestion` that was upserted by this mutation. */
  russianWouldYouRatherQuestion?: Maybe<RussianWouldYouRatherQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `RussianWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `RussianWouldYouRatherQuestion`. May be used by Relay 1. */
  russianWouldYouRatherQuestionEdge?: Maybe<RussianWouldYouRatherQuestionsEdge>;
};


/** The output of our upsert `RussianWouldYouRatherQuestion` mutation. */
export type UpsertRussianWouldYouRatherQuestionPayloadRussianWouldYouRatherQuestionEdgeArgs = {
  orderBy?: Maybe<Array<RussianWouldYouRatherQuestionsOrderBy>>;
};

/** Where conditions for the upsert `RussianWouldYouRatherQuestion` mutation. */
export type UpsertRussianWouldYouRatherQuestionWhere = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
};

/** All input for the upsert `SpanishRandomQuestion` mutation. */
export type UpsertSpanishRandomQuestionInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SpanishRandomQuestion` to be upserted by this mutation. */
  spanishRandomQuestion: SpanishRandomQuestionInput;
};

/** The output of our upsert `SpanishRandomQuestion` mutation. */
export type UpsertSpanishRandomQuestionPayload = {
  __typename?: 'UpsertSpanishRandomQuestionPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SpanishRandomQuestion` that was upserted by this mutation. */
  spanishRandomQuestion?: Maybe<SpanishRandomQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `SpanishRandomQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `SpanishRandomQuestion`. May be used by Relay 1. */
  spanishRandomQuestionEdge?: Maybe<SpanishRandomQuestionsEdge>;
};


/** The output of our upsert `SpanishRandomQuestion` mutation. */
export type UpsertSpanishRandomQuestionPayloadSpanishRandomQuestionEdgeArgs = {
  orderBy?: Maybe<Array<SpanishRandomQuestionsOrderBy>>;
};

/** Where conditions for the upsert `SpanishRandomQuestion` mutation. */
export type UpsertSpanishRandomQuestionWhere = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
};

/** All input for the upsert `SpanishWord` mutation. */
export type UpsertSpanishWordInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SpanishWord` to be upserted by this mutation. */
  spanishWord: SpanishWordInput;
};

/** The output of our upsert `SpanishWord` mutation. */
export type UpsertSpanishWordPayload = {
  __typename?: 'UpsertSpanishWordPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SpanishWord` that was upserted by this mutation. */
  spanishWord?: Maybe<SpanishWord>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `SpanishWord`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `SpanishWord`. May be used by Relay 1. */
  spanishWordEdge?: Maybe<SpanishWordsEdge>;
};


/** The output of our upsert `SpanishWord` mutation. */
export type UpsertSpanishWordPayloadSpanishWordEdgeArgs = {
  orderBy?: Maybe<Array<SpanishWordsOrderBy>>;
};

/** Where conditions for the upsert `SpanishWord` mutation. */
export type UpsertSpanishWordWhere = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
};

/** All input for the upsert `SpanishWouldYouRatherQuestion` mutation. */
export type UpsertSpanishWouldYouRatherQuestionInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SpanishWouldYouRatherQuestion` to be upserted by this mutation. */
  spanishWouldYouRatherQuestion: SpanishWouldYouRatherQuestionInput;
};

/** The output of our upsert `SpanishWouldYouRatherQuestion` mutation. */
export type UpsertSpanishWouldYouRatherQuestionPayload = {
  __typename?: 'UpsertSpanishWouldYouRatherQuestionPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SpanishWouldYouRatherQuestion` that was upserted by this mutation. */
  spanishWouldYouRatherQuestion?: Maybe<SpanishWouldYouRatherQuestion>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `LanguageSkillLevel` that is related to this `SpanishWouldYouRatherQuestion`. */
  recommendedSkillLevel?: Maybe<LanguageSkillLevel>;
  /** An edge for our `SpanishWouldYouRatherQuestion`. May be used by Relay 1. */
  spanishWouldYouRatherQuestionEdge?: Maybe<SpanishWouldYouRatherQuestionsEdge>;
};


/** The output of our upsert `SpanishWouldYouRatherQuestion` mutation. */
export type UpsertSpanishWouldYouRatherQuestionPayloadSpanishWouldYouRatherQuestionEdgeArgs = {
  orderBy?: Maybe<Array<SpanishWouldYouRatherQuestionsOrderBy>>;
};

/** Where conditions for the upsert `SpanishWouldYouRatherQuestion` mutation. */
export type UpsertSpanishWouldYouRatherQuestionWhere = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
};

/** All input for the upsert `UserDevice` mutation. */
export type UpsertUserDeviceInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserDevice` to be upserted by this mutation. */
  userDevice: UserDeviceInput;
};

/** The output of our upsert `UserDevice` mutation. */
export type UpsertUserDevicePayload = {
  __typename?: 'UpsertUserDevicePayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserDevice` that was upserted by this mutation. */
  userDevice?: Maybe<UserDevice>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `UserDevice`. */
  user?: Maybe<User>;
  /** An edge for our `UserDevice`. May be used by Relay 1. */
  userDeviceEdge?: Maybe<UserDevicesEdge>;
};


/** The output of our upsert `UserDevice` mutation. */
export type UpsertUserDevicePayloadUserDeviceEdgeArgs = {
  orderBy?: Maybe<Array<UserDevicesOrderBy>>;
};

/** Where conditions for the upsert `UserDevice` mutation. */
export type UpsertUserDeviceWhere = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  fcmToken?: Maybe<Scalars['String']>;
};

/** All input for the upsert `UserFollower` mutation. */
export type UpsertUserFollowerInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserFollower` to be upserted by this mutation. */
  userFollower: UserFollowerInput;
};

/** The output of our upsert `UserFollower` mutation. */
export type UpsertUserFollowerPayload = {
  __typename?: 'UpsertUserFollowerPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserFollower` that was upserted by this mutation. */
  userFollower?: Maybe<UserFollower>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `UserFollower`. */
  user?: Maybe<User>;
  /** Reads a single `User` that is related to this `UserFollower`. */
  follower?: Maybe<User>;
  /** An edge for our `UserFollower`. May be used by Relay 1. */
  userFollowerEdge?: Maybe<UserFollowersEdge>;
};


/** The output of our upsert `UserFollower` mutation. */
export type UpsertUserFollowerPayloadUserFollowerEdgeArgs = {
  orderBy?: Maybe<Array<UserFollowersOrderBy>>;
};

/** Where conditions for the upsert `UserFollower` mutation. */
export type UpsertUserFollowerWhere = {
  id?: Maybe<Scalars['Int']>;
};

/** All input for the upsert `User` mutation. */
export type UpsertUserInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `User` to be upserted by this mutation. */
  user: UserInput;
};

/** All input for the upsert `UserLanguage` mutation. */
export type UpsertUserLanguageInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserLanguage` to be upserted by this mutation. */
  userLanguage: UserLanguageInput;
};

/** The output of our upsert `UserLanguage` mutation. */
export type UpsertUserLanguagePayload = {
  __typename?: 'UpsertUserLanguagePayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserLanguage` that was upserted by this mutation. */
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


/** The output of our upsert `UserLanguage` mutation. */
export type UpsertUserLanguagePayloadUserLanguageEdgeArgs = {
  orderBy?: Maybe<Array<UserLanguagesOrderBy>>;
};

/** Where conditions for the upsert `UserLanguage` mutation. */
export type UpsertUserLanguageWhere = {
  id?: Maybe<Scalars['Int']>;
};

/** The output of our upsert `User` mutation. */
export type UpsertUserPayload = {
  __typename?: 'UpsertUserPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `User` that was upserted by this mutation. */
  user?: Maybe<User>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Language` that is related to this `User`. */
  languageByLocale?: Maybe<Language>;
  /** Reads a single `InviteToken` that is related to this `User`. */
  signedUpWithToken?: Maybe<InviteToken>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our upsert `User` mutation. */
export type UpsertUserPayloadUserEdgeArgs = {
  orderBy?: Maybe<Array<UsersOrderBy>>;
};

/** All input for the upsert `UserPreference` mutation. */
export type UpsertUserPreferenceInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserPreference` to be upserted by this mutation. */
  userPreference: UserPreferenceInput;
};

/** The output of our upsert `UserPreference` mutation. */
export type UpsertUserPreferencePayload = {
  __typename?: 'UpsertUserPreferencePayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserPreference` that was upserted by this mutation. */
  userPreference?: Maybe<UserPreference>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `UserPreference`. */
  user?: Maybe<User>;
  /** Reads a single `Language` that is related to this `UserPreference`. */
  feedLanguage?: Maybe<Language>;
  /** An edge for our `UserPreference`. May be used by Relay 1. */
  userPreferenceEdge?: Maybe<UserPreferencesEdge>;
};


/** The output of our upsert `UserPreference` mutation. */
export type UpsertUserPreferencePayloadUserPreferenceEdgeArgs = {
  orderBy?: Maybe<Array<UserPreferencesOrderBy>>;
};

/** Where conditions for the upsert `UserPreference` mutation. */
export type UpsertUserPreferenceWhere = {
  id?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['Int']>;
};

/** All input for the upsert `UserSession` mutation. */
export type UpsertUserSessionInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserSession` to be upserted by this mutation. */
  userSession: UserSessionInput;
};

/** The output of our upsert `UserSession` mutation. */
export type UpsertUserSessionPayload = {
  __typename?: 'UpsertUserSessionPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserSession` that was upserted by this mutation. */
  userSession?: Maybe<UserSession>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `UserSession`. May be used by Relay 1. */
  userSessionEdge?: Maybe<UserSessionsEdge>;
};


/** The output of our upsert `UserSession` mutation. */
export type UpsertUserSessionPayloadUserSessionEdgeArgs = {
  orderBy?: Maybe<Array<UserSessionsOrderBy>>;
};

/** Where conditions for the upsert `UserSession` mutation. */
export type UpsertUserSessionWhere = {
  sid?: Maybe<Scalars['String']>;
};

/** Where conditions for the upsert `User` mutation. */
export type UpsertUserWhere = {
  id?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  uuid?: Maybe<Scalars['UUID']>;
  emailUnsubscribeToken?: Maybe<Scalars['String']>;
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
  passwordHash?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
  avatarUrl?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['Int']>;
  googleId?: Maybe<Scalars['String']>;
  signedUpWithTokenId?: Maybe<Scalars['Int']>;
  emailNotificationsEnabled: Scalars['Boolean'];
  emailUnsubscribeToken?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  /** Reads a single `Language` that is related to this `User`. */
  languageByLocale?: Maybe<Language>;
  /** Reads a single `InviteToken` that is related to this `User`. */
  signedUpWithToken?: Maybe<InviteToken>;
  /** Reads and enables pagination through a set of `UserLanguage`. */
  userLanguages: UserLanguagesConnection;
  /** Reads and enables pagination through a set of `GroupUser`. */
  groupUsers: GroupUsersConnection;
  /** Reads and enables pagination through a set of `Message`. */
  messagesBySenderId: MessagesConnection;
  /** Reads and enables pagination through a set of `Message`. */
  messagesByRecipientId: MessagesConnection;
  /** Reads and enables pagination through a set of `InviteToken`. */
  inviteTokens: InviteTokensConnection;
  /** Reads and enables pagination through a set of `UserDevice`. */
  userDevices: UserDevicesConnection;
  /** Reads and enables pagination through a set of `Notification`. */
  notificationsByRecipientId: NotificationsConnection;
  /** Reads and enables pagination through a set of `Post`. */
  authoredPosts: PostsConnection;
  /** Reads and enables pagination through a set of `PostLike`. */
  postLikes: PostLikesConnection;
  /** Reads and enables pagination through a set of `PostRecording`. */
  postRecordings: PostRecordingsConnection;
  /** Reads and enables pagination through a set of `UserFollower`. */
  followers: UserFollowersConnection;
  /** Reads and enables pagination through a set of `UserFollower`. */
  followedUsers: UserFollowersConnection;
  /** Reads a single `UserPreference` that is related to this `User`. */
  preference?: Maybe<UserPreference>;
  followedByCurrentUser?: Maybe<Scalars['Boolean']>;
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
  /** Reads and enables pagination through a set of `NotificationChannel`. */
  notificationChannelsByNotificationRecipientIdAndChannelId: UserNotificationChannelsByNotificationRecipientIdAndChannelIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Group`. */
  groupsByNotificationRecipientIdAndRecipientGroupId: UserGroupsByNotificationRecipientIdAndRecipientGroupIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Post`. */
  postsByPostAuthorIdAndParentPostId: UserPostsByPostAuthorIdAndParentPostIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Language`. */
  languagesByPostAuthorIdAndLanguageId: UserLanguagesByPostAuthorIdAndLanguageIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Prompt`. */
  promptsByPostAuthorIdAndPromptId: UserPromptsByPostAuthorIdAndPromptIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Post`. */
  postsByPostLikeUserIdAndPostId: UserPostsByPostLikeUserIdAndPostIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Post`. */
  postsByPostRecordingUserIdAndPostId: UserPostsByPostRecordingUserIdAndPostIdManyToManyConnection;
  /** Reads and enables pagination through a set of `User`. */
  usersByUserFollowerUserIdAndFollowerId: UserUsersByUserFollowerUserIdAndFollowerIdManyToManyConnection;
  /** Reads and enables pagination through a set of `User`. */
  usersByUserFollowerFollowerIdAndUserId: UserUsersByUserFollowerFollowerIdAndUserIdManyToManyConnection;
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


export type UserInviteTokensArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<InviteTokensOrderBy>>;
  condition?: Maybe<InviteTokenCondition>;
  filter?: Maybe<InviteTokenFilter>;
};


export type UserUserDevicesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UserDevicesOrderBy>>;
  condition?: Maybe<UserDeviceCondition>;
  filter?: Maybe<UserDeviceFilter>;
};


export type UserNotificationsByRecipientIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<NotificationsOrderBy>>;
  condition?: Maybe<NotificationCondition>;
  filter?: Maybe<NotificationFilter>;
};


export type UserAuthoredPostsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PostsOrderBy>>;
  condition?: Maybe<PostCondition>;
  filter?: Maybe<PostFilter>;
};


export type UserPostLikesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PostLikesOrderBy>>;
  condition?: Maybe<PostLikeCondition>;
  filter?: Maybe<PostLikeFilter>;
};


export type UserPostRecordingsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PostRecordingsOrderBy>>;
  condition?: Maybe<PostRecordingCondition>;
  filter?: Maybe<PostRecordingFilter>;
};


export type UserFollowersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UserFollowersOrderBy>>;
  condition?: Maybe<UserFollowerCondition>;
  filter?: Maybe<UserFollowerFilter>;
};


export type UserFollowedUsersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UserFollowersOrderBy>>;
  condition?: Maybe<UserFollowerCondition>;
  filter?: Maybe<UserFollowerFilter>;
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


export type UserNotificationChannelsByNotificationRecipientIdAndChannelIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<NotificationChannelsOrderBy>>;
  condition?: Maybe<NotificationChannelCondition>;
  filter?: Maybe<NotificationChannelFilter>;
};


export type UserGroupsByNotificationRecipientIdAndRecipientGroupIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<GroupsOrderBy>>;
  condition?: Maybe<GroupCondition>;
  filter?: Maybe<GroupFilter>;
};


export type UserPostsByPostAuthorIdAndParentPostIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PostsOrderBy>>;
  condition?: Maybe<PostCondition>;
  filter?: Maybe<PostFilter>;
};


export type UserLanguagesByPostAuthorIdAndLanguageIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<LanguagesOrderBy>>;
  condition?: Maybe<LanguageCondition>;
  filter?: Maybe<LanguageFilter>;
};


export type UserPromptsByPostAuthorIdAndPromptIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PromptsOrderBy>>;
  condition?: Maybe<PromptCondition>;
  filter?: Maybe<PromptFilter>;
};


export type UserPostsByPostLikeUserIdAndPostIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PostsOrderBy>>;
  condition?: Maybe<PostCondition>;
  filter?: Maybe<PostFilter>;
};


export type UserPostsByPostRecordingUserIdAndPostIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PostsOrderBy>>;
  condition?: Maybe<PostCondition>;
  filter?: Maybe<PostFilter>;
};


export type UserUsersByUserFollowerUserIdAndFollowerIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
  filter?: Maybe<UserFilter>;
};


export type UserUsersByUserFollowerFollowerIdAndUserIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
  filter?: Maybe<UserFilter>;
};

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
  /** Checks for equality with the object’s `signedUpWithTokenId` field. */
  signedUpWithTokenId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `emailNotificationsEnabled` field. */
  emailNotificationsEnabled?: Maybe<Scalars['Boolean']>;
  /** Checks for equality with the object’s `emailUnsubscribeToken` field. */
  emailUnsubscribeToken?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `displayName` field. */
  displayName?: Maybe<Scalars['String']>;
};

export type UserDevice = Node & {
  __typename?: 'UserDevice';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  uuid: Scalars['UUID'];
  userId?: Maybe<Scalars['Int']>;
  fcmToken?: Maybe<Scalars['String']>;
  createdAt: Scalars['Datetime'];
  /** Reads a single `User` that is related to this `UserDevice`. */
  user?: Maybe<User>;
};

/**
 * A condition to be used against `UserDevice` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type UserDeviceCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `uuid` field. */
  uuid?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `fcmToken` field. */
  fcmToken?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `UserDevice` object types. All fields are combined with a logical ‘and.’ */
export type UserDeviceFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `uuid` field. */
  uuid?: Maybe<UuidFilter>;
  /** Filter by the object’s `userId` field. */
  userId?: Maybe<IntFilter>;
  /** Filter by the object’s `fcmToken` field. */
  fcmToken?: Maybe<StringFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<UserDeviceFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<UserDeviceFilter>>;
  /** Negates the expression. */
  not?: Maybe<UserDeviceFilter>;
};

/** An input for mutations affecting `UserDevice` */
export type UserDeviceInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  userId?: Maybe<Scalars['Int']>;
  fcmToken?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** Represents an update to a `UserDevice`. Fields that are set will be updated. */
export type UserDevicePatch = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['UUID']>;
  userId?: Maybe<Scalars['Int']>;
  fcmToken?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `UserDevice` values. */
export type UserDevicesConnection = {
  __typename?: 'UserDevicesConnection';
  /** A list of `UserDevice` objects. */
  nodes: Array<Maybe<UserDevice>>;
  /** A list of edges which contains the `UserDevice` and cursor to aid in pagination. */
  edges: Array<UserDevicesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `UserDevice` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `UserDevice` edge in the connection. */
export type UserDevicesEdge = {
  __typename?: 'UserDevicesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `UserDevice` at the end of the edge. */
  node?: Maybe<UserDevice>;
};

/** Methods to use when ordering `UserDevice`. */
export enum UserDevicesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UuidAsc = 'UUID_ASC',
  UuidDesc = 'UUID_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC',
  FcmTokenAsc = 'FCM_TOKEN_ASC',
  FcmTokenDesc = 'FCM_TOKEN_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

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
  /** Filter by the object’s `signedUpWithTokenId` field. */
  signedUpWithTokenId?: Maybe<IntFilter>;
  /** Filter by the object’s `emailNotificationsEnabled` field. */
  emailNotificationsEnabled?: Maybe<BooleanFilter>;
  /** Filter by the object’s `emailUnsubscribeToken` field. */
  emailUnsubscribeToken?: Maybe<StringFilter>;
  /** Filter by the object’s `displayName` field. */
  displayName?: Maybe<StringFilter>;
  /** Filter by the object’s `followedByCurrentUser` field. */
  followedByCurrentUser?: Maybe<BooleanFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<UserFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<UserFilter>>;
  /** Negates the expression. */
  not?: Maybe<UserFilter>;
};

export type UserFollower = Node & {
  __typename?: 'UserFollower';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  userId: Scalars['Int'];
  followerId: Scalars['Int'];
  createdAt: Scalars['Datetime'];
  /** Reads a single `User` that is related to this `UserFollower`. */
  user?: Maybe<User>;
  /** Reads a single `User` that is related to this `UserFollower`. */
  follower?: Maybe<User>;
};

/**
 * A condition to be used against `UserFollower` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type UserFollowerCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `followerId` field. */
  followerId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `UserFollower` object types. All fields are combined with a logical ‘and.’ */
export type UserFollowerFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `userId` field. */
  userId?: Maybe<IntFilter>;
  /** Filter by the object’s `followerId` field. */
  followerId?: Maybe<IntFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<UserFollowerFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<UserFollowerFilter>>;
  /** Negates the expression. */
  not?: Maybe<UserFollowerFilter>;
};

/** An input for mutations affecting `UserFollower` */
export type UserFollowerInput = {
  id?: Maybe<Scalars['Int']>;
  userId: Scalars['Int'];
  followerId: Scalars['Int'];
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** Represents an update to a `UserFollower`. Fields that are set will be updated. */
export type UserFollowerPatch = {
  id?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['Int']>;
  followerId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `UserFollower` values. */
export type UserFollowersConnection = {
  __typename?: 'UserFollowersConnection';
  /** A list of `UserFollower` objects. */
  nodes: Array<Maybe<UserFollower>>;
  /** A list of edges which contains the `UserFollower` and cursor to aid in pagination. */
  edges: Array<UserFollowersEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `UserFollower` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `UserFollower` edge in the connection. */
export type UserFollowersEdge = {
  __typename?: 'UserFollowersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `UserFollower` at the end of the edge. */
  node?: Maybe<UserFollower>;
};

/** Methods to use when ordering `UserFollower`. */
export enum UserFollowersOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC',
  FollowerIdAsc = 'FOLLOWER_ID_ASC',
  FollowerIdDesc = 'FOLLOWER_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

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

/** A connection to a list of `Group` values, with data from `Notification`. */
export type UserGroupsByNotificationRecipientIdAndRecipientGroupIdManyToManyConnection = {
  __typename?: 'UserGroupsByNotificationRecipientIdAndRecipientGroupIdManyToManyConnection';
  /** A list of `Group` objects. */
  nodes: Array<Maybe<Group>>;
  /** A list of edges which contains the `Group`, info from the `Notification`, and the cursor to aid in pagination. */
  edges: Array<UserGroupsByNotificationRecipientIdAndRecipientGroupIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Group` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Group` edge in the connection, with data from `Notification`. */
export type UserGroupsByNotificationRecipientIdAndRecipientGroupIdManyToManyEdge = {
  __typename?: 'UserGroupsByNotificationRecipientIdAndRecipientGroupIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Group` at the end of the edge. */
  node?: Maybe<Group>;
  /** Reads and enables pagination through a set of `Notification`. */
  notificationsByRecipientGroupId: NotificationsConnection;
};


/** A `Group` edge in the connection, with data from `Notification`. */
export type UserGroupsByNotificationRecipientIdAndRecipientGroupIdManyToManyEdgeNotificationsByRecipientGroupIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<NotificationsOrderBy>>;
  condition?: Maybe<NotificationCondition>;
  filter?: Maybe<NotificationFilter>;
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
  uuid?: Maybe<Scalars['UUID']>;
  avatarUrl?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['Int']>;
  googleId?: Maybe<Scalars['String']>;
  signedUpWithTokenId?: Maybe<Scalars['Int']>;
  emailNotificationsEnabled?: Maybe<Scalars['Boolean']>;
  emailUnsubscribeToken?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
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

/** An input for mutations affecting `UserLanguage` */
export type UserLanguageInput = {
  id?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['Int']>;
  languageId?: Maybe<Scalars['Int']>;
  languageSkillLevelId?: Maybe<Scalars['Int']>;
  native?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['Datetime']>;
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

/** A connection to a list of `Language` values, with data from `Post`. */
export type UserLanguagesByPostAuthorIdAndLanguageIdManyToManyConnection = {
  __typename?: 'UserLanguagesByPostAuthorIdAndLanguageIdManyToManyConnection';
  /** A list of `Language` objects. */
  nodes: Array<Maybe<Language>>;
  /** A list of edges which contains the `Language`, info from the `Post`, and the cursor to aid in pagination. */
  edges: Array<UserLanguagesByPostAuthorIdAndLanguageIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Language` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Language` edge in the connection, with data from `Post`. */
export type UserLanguagesByPostAuthorIdAndLanguageIdManyToManyEdge = {
  __typename?: 'UserLanguagesByPostAuthorIdAndLanguageIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Language` at the end of the edge. */
  node?: Maybe<Language>;
  /** Reads and enables pagination through a set of `Post`. */
  posts: PostsConnection;
};


/** A `Language` edge in the connection, with data from `Post`. */
export type UserLanguagesByPostAuthorIdAndLanguageIdManyToManyEdgePostsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PostsOrderBy>>;
  condition?: Maybe<PostCondition>;
  filter?: Maybe<PostFilter>;
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

/** A `UserLanguage` edge in the connection. */
export type UserLanguagesEdge = {
  __typename?: 'UserLanguagesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `UserLanguage` at the end of the edge. */
  node?: Maybe<UserLanguage>;
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

/** A connection to a list of `NotificationChannel` values, with data from `Notification`. */
export type UserNotificationChannelsByNotificationRecipientIdAndChannelIdManyToManyConnection = {
  __typename?: 'UserNotificationChannelsByNotificationRecipientIdAndChannelIdManyToManyConnection';
  /** A list of `NotificationChannel` objects. */
  nodes: Array<Maybe<NotificationChannel>>;
  /** A list of edges which contains the `NotificationChannel`, info from the `Notification`, and the cursor to aid in pagination. */
  edges: Array<UserNotificationChannelsByNotificationRecipientIdAndChannelIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `NotificationChannel` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `NotificationChannel` edge in the connection, with data from `Notification`. */
export type UserNotificationChannelsByNotificationRecipientIdAndChannelIdManyToManyEdge = {
  __typename?: 'UserNotificationChannelsByNotificationRecipientIdAndChannelIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `NotificationChannel` at the end of the edge. */
  node?: Maybe<NotificationChannel>;
  /** Reads and enables pagination through a set of `Notification`. */
  notificationsByChannelId: NotificationsConnection;
};


/** A `NotificationChannel` edge in the connection, with data from `Notification`. */
export type UserNotificationChannelsByNotificationRecipientIdAndChannelIdManyToManyEdgeNotificationsByChannelIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<NotificationsOrderBy>>;
  condition?: Maybe<NotificationCondition>;
  filter?: Maybe<NotificationFilter>;
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
  signedUpWithTokenId?: Maybe<Scalars['Int']>;
  emailNotificationsEnabled?: Maybe<Scalars['Boolean']>;
  emailUnsubscribeToken?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
};

/** A connection to a list of `Post` values, with data from `Post`. */
export type UserPostsByPostAuthorIdAndParentPostIdManyToManyConnection = {
  __typename?: 'UserPostsByPostAuthorIdAndParentPostIdManyToManyConnection';
  /** A list of `Post` objects. */
  nodes: Array<Maybe<Post>>;
  /** A list of edges which contains the `Post`, info from the `Post`, and the cursor to aid in pagination. */
  edges: Array<UserPostsByPostAuthorIdAndParentPostIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Post` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Post` edge in the connection, with data from `Post`. */
export type UserPostsByPostAuthorIdAndParentPostIdManyToManyEdge = {
  __typename?: 'UserPostsByPostAuthorIdAndParentPostIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Post` at the end of the edge. */
  node?: Maybe<Post>;
  /** Reads and enables pagination through a set of `Post`. */
  replies: PostsConnection;
};


/** A `Post` edge in the connection, with data from `Post`. */
export type UserPostsByPostAuthorIdAndParentPostIdManyToManyEdgeRepliesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PostsOrderBy>>;
  condition?: Maybe<PostCondition>;
  filter?: Maybe<PostFilter>;
};

/** A connection to a list of `Post` values, with data from `PostLike`. */
export type UserPostsByPostLikeUserIdAndPostIdManyToManyConnection = {
  __typename?: 'UserPostsByPostLikeUserIdAndPostIdManyToManyConnection';
  /** A list of `Post` objects. */
  nodes: Array<Maybe<Post>>;
  /** A list of edges which contains the `Post`, info from the `PostLike`, and the cursor to aid in pagination. */
  edges: Array<UserPostsByPostLikeUserIdAndPostIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Post` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Post` edge in the connection, with data from `PostLike`. */
export type UserPostsByPostLikeUserIdAndPostIdManyToManyEdge = {
  __typename?: 'UserPostsByPostLikeUserIdAndPostIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Post` at the end of the edge. */
  node?: Maybe<Post>;
  /** Reads and enables pagination through a set of `PostLike`. */
  likes: PostLikesConnection;
};


/** A `Post` edge in the connection, with data from `PostLike`. */
export type UserPostsByPostLikeUserIdAndPostIdManyToManyEdgeLikesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PostLikesOrderBy>>;
  condition?: Maybe<PostLikeCondition>;
  filter?: Maybe<PostLikeFilter>;
};

/** A connection to a list of `Post` values, with data from `PostRecording`. */
export type UserPostsByPostRecordingUserIdAndPostIdManyToManyConnection = {
  __typename?: 'UserPostsByPostRecordingUserIdAndPostIdManyToManyConnection';
  /** A list of `Post` objects. */
  nodes: Array<Maybe<Post>>;
  /** A list of edges which contains the `Post`, info from the `PostRecording`, and the cursor to aid in pagination. */
  edges: Array<UserPostsByPostRecordingUserIdAndPostIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Post` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Post` edge in the connection, with data from `PostRecording`. */
export type UserPostsByPostRecordingUserIdAndPostIdManyToManyEdge = {
  __typename?: 'UserPostsByPostRecordingUserIdAndPostIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Post` at the end of the edge. */
  node?: Maybe<Post>;
  /** Reads and enables pagination through a set of `PostRecording`. */
  recordings: PostRecordingsConnection;
};


/** A `Post` edge in the connection, with data from `PostRecording`. */
export type UserPostsByPostRecordingUserIdAndPostIdManyToManyEdgeRecordingsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PostRecordingsOrderBy>>;
  condition?: Maybe<PostRecordingCondition>;
  filter?: Maybe<PostRecordingFilter>;
};

export type UserPreference = Node & {
  __typename?: 'UserPreference';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  userId: Scalars['Int'];
  feedLanguageId: Scalars['Int'];
  createdAt: Scalars['Datetime'];
  /** Reads a single `User` that is related to this `UserPreference`. */
  user?: Maybe<User>;
  /** Reads a single `Language` that is related to this `UserPreference`. */
  feedLanguage?: Maybe<Language>;
};

/**
 * A condition to be used against `UserPreference` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type UserPreferenceCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `feedLanguageId` field. */
  feedLanguageId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `UserPreference` object types. All fields are combined with a logical ‘and.’ */
export type UserPreferenceFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `userId` field. */
  userId?: Maybe<IntFilter>;
  /** Filter by the object’s `feedLanguageId` field. */
  feedLanguageId?: Maybe<IntFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<UserPreferenceFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<UserPreferenceFilter>>;
  /** Negates the expression. */
  not?: Maybe<UserPreferenceFilter>;
};

/** An input for mutations affecting `UserPreference` */
export type UserPreferenceInput = {
  id?: Maybe<Scalars['Int']>;
  userId: Scalars['Int'];
  feedLanguageId: Scalars['Int'];
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** Represents an update to a `UserPreference`. Fields that are set will be updated. */
export type UserPreferencePatch = {
  id?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['Int']>;
  feedLanguageId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `UserPreference` values. */
export type UserPreferencesConnection = {
  __typename?: 'UserPreferencesConnection';
  /** A list of `UserPreference` objects. */
  nodes: Array<Maybe<UserPreference>>;
  /** A list of edges which contains the `UserPreference` and cursor to aid in pagination. */
  edges: Array<UserPreferencesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `UserPreference` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `UserPreference` edge in the connection. */
export type UserPreferencesEdge = {
  __typename?: 'UserPreferencesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `UserPreference` at the end of the edge. */
  node?: Maybe<UserPreference>;
};

/** Methods to use when ordering `UserPreference`. */
export enum UserPreferencesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC',
  FeedLanguageIdAsc = 'FEED_LANGUAGE_ID_ASC',
  FeedLanguageIdDesc = 'FEED_LANGUAGE_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** A connection to a list of `Prompt` values, with data from `Post`. */
export type UserPromptsByPostAuthorIdAndPromptIdManyToManyConnection = {
  __typename?: 'UserPromptsByPostAuthorIdAndPromptIdManyToManyConnection';
  /** A list of `Prompt` objects. */
  nodes: Array<Maybe<Prompt>>;
  /** A list of edges which contains the `Prompt`, info from the `Post`, and the cursor to aid in pagination. */
  edges: Array<UserPromptsByPostAuthorIdAndPromptIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Prompt` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Prompt` edge in the connection, with data from `Post`. */
export type UserPromptsByPostAuthorIdAndPromptIdManyToManyEdge = {
  __typename?: 'UserPromptsByPostAuthorIdAndPromptIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Prompt` at the end of the edge. */
  node?: Maybe<Prompt>;
  /** Reads and enables pagination through a set of `Post`. */
  posts: PostsConnection;
};


/** A `Prompt` edge in the connection, with data from `Post`. */
export type UserPromptsByPostAuthorIdAndPromptIdManyToManyEdgePostsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PostsOrderBy>>;
  condition?: Maybe<PostCondition>;
  filter?: Maybe<PostFilter>;
};

export type UserSession = Node & {
  __typename?: 'UserSession';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  sid: Scalars['String'];
  sess: Scalars['JSON'];
  expire: Scalars['Datetime'];
  createdAt: Scalars['Datetime'];
};

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
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `UserSession` object types. All fields are combined with a logical ‘and.’ */
export type UserSessionFilter = {
  /** Filter by the object’s `sid` field. */
  sid?: Maybe<StringFilter>;
  /** Filter by the object’s `expire` field. */
  expire?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<UserSessionFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<UserSessionFilter>>;
  /** Negates the expression. */
  not?: Maybe<UserSessionFilter>;
};

/** An input for mutations affecting `UserSession` */
export type UserSessionInput = {
  sid: Scalars['String'];
  sess: Scalars['JSON'];
  expire: Scalars['Datetime'];
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** Represents an update to a `UserSession`. Fields that are set will be updated. */
export type UserSessionPatch = {
  sid?: Maybe<Scalars['String']>;
  sess?: Maybe<Scalars['JSON']>;
  expire?: Maybe<Scalars['Datetime']>;
  createdAt?: Maybe<Scalars['Datetime']>;
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
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export enum UserType {
  Learner = 'LEARNER',
  Native = 'NATIVE',
  Global = 'GLOBAL'
}

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

/** A connection to a list of `User` values, with data from `UserFollower`. */
export type UserUsersByUserFollowerFollowerIdAndUserIdManyToManyConnection = {
  __typename?: 'UserUsersByUserFollowerFollowerIdAndUserIdManyToManyConnection';
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** A list of edges which contains the `User`, info from the `UserFollower`, and the cursor to aid in pagination. */
  edges: Array<UserUsersByUserFollowerFollowerIdAndUserIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection, with data from `UserFollower`. */
export type UserUsersByUserFollowerFollowerIdAndUserIdManyToManyEdge = {
  __typename?: 'UserUsersByUserFollowerFollowerIdAndUserIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
  /** Reads and enables pagination through a set of `UserFollower`. */
  followers: UserFollowersConnection;
};


/** A `User` edge in the connection, with data from `UserFollower`. */
export type UserUsersByUserFollowerFollowerIdAndUserIdManyToManyEdgeFollowersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UserFollowersOrderBy>>;
  condition?: Maybe<UserFollowerCondition>;
  filter?: Maybe<UserFollowerFilter>;
};

/** A connection to a list of `User` values, with data from `UserFollower`. */
export type UserUsersByUserFollowerUserIdAndFollowerIdManyToManyConnection = {
  __typename?: 'UserUsersByUserFollowerUserIdAndFollowerIdManyToManyConnection';
  /** A list of `User` objects. */
  nodes: Array<Maybe<User>>;
  /** A list of edges which contains the `User`, info from the `UserFollower`, and the cursor to aid in pagination. */
  edges: Array<UserUsersByUserFollowerUserIdAndFollowerIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection, with data from `UserFollower`. */
export type UserUsersByUserFollowerUserIdAndFollowerIdManyToManyEdge = {
  __typename?: 'UserUsersByUserFollowerUserIdAndFollowerIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node?: Maybe<User>;
  /** Reads and enables pagination through a set of `UserFollower`. */
  followedUsers: UserFollowersConnection;
};


/** A `User` edge in the connection, with data from `UserFollower`. */
export type UserUsersByUserFollowerUserIdAndFollowerIdManyToManyEdgeFollowedUsersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UserFollowersOrderBy>>;
  condition?: Maybe<UserFollowerCondition>;
  filter?: Maybe<UserFollowerFilter>;
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
  AvatarUrlAsc = 'AVATAR_URL_ASC',
  AvatarUrlDesc = 'AVATAR_URL_DESC',
  LocaleAsc = 'LOCALE_ASC',
  LocaleDesc = 'LOCALE_DESC',
  GoogleIdAsc = 'GOOGLE_ID_ASC',
  GoogleIdDesc = 'GOOGLE_ID_DESC',
  SignedUpWithTokenIdAsc = 'SIGNED_UP_WITH_TOKEN_ID_ASC',
  SignedUpWithTokenIdDesc = 'SIGNED_UP_WITH_TOKEN_ID_DESC',
  EmailNotificationsEnabledAsc = 'EMAIL_NOTIFICATIONS_ENABLED_ASC',
  EmailNotificationsEnabledDesc = 'EMAIL_NOTIFICATIONS_ENABLED_DESC',
  EmailUnsubscribeTokenAsc = 'EMAIL_UNSUBSCRIBE_TOKEN_ASC',
  EmailUnsubscribeTokenDesc = 'EMAIL_UNSUBSCRIBE_TOKEN_DESC',
  DisplayNameAsc = 'DISPLAY_NAME_ASC',
  DisplayNameDesc = 'DISPLAY_NAME_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type ChatUserQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ChatUserQuery = { __typename?: 'Query', user?: Maybe<{ __typename?: 'User', id: number, username?: Maybe<string>, uuid: any, avatarUrl?: Maybe<string> }> };

export type CreateMessageMutationVariables = Exact<{
  parentMessageId?: Maybe<Scalars['Int']>;
  recipientGroupId?: Maybe<Scalars['Int']>;
  recipientId?: Maybe<Scalars['Int']>;
  senderId?: Maybe<Scalars['Int']>;
  uuid: Scalars['UUID'];
  body: Scalars['String'];
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage?: Maybe<{ __typename?: 'CreateMessagePayload', sender?: Maybe<{ __typename?: 'User', uuid: any }>, message?: Maybe<{ __typename?: 'Message', id: number, uuid: any, createdAt: any }> }> };

export type CreateMessagePreviewMutationVariables = Exact<{
  messageId: Scalars['Int'];
  filename: Scalars['String'];
  extension?: Maybe<Scalars['String']>;
  uuid: Scalars['UUID'];
}>;


export type CreateMessagePreviewMutation = { __typename?: 'Mutation', createMessagePreview?: Maybe<{ __typename?: 'CreateMessagePreviewPayload', messagePreview?: Maybe<{ __typename?: 'MessagePreview', id: number }> }> };

export type GroupChatQueryVariables = Exact<{
  groupUuid: Scalars['UUID'];
}>;


export type GroupChatQuery = { __typename?: 'Query', groupByUuid?: Maybe<{ __typename?: 'Group', groupName?: Maybe<string>, uuid: any, language?: Maybe<{ __typename?: 'Language', englishName: string }>, languageSkillLevel?: Maybe<{ __typename?: 'LanguageSkillLevel', name?: Maybe<string>, nodeId: string }>, usersByGroupUserGroupIdAndUserId: { __typename?: 'GroupUsersByGroupUserGroupIdAndUserIdManyToManyConnection', nodes: Array<Maybe<{ __typename?: 'User', bio: string, avatarUrl?: Maybe<string>, uuid: any, username?: Maybe<string>, lastActiveAt: any, userLanguages: { __typename?: 'UserLanguagesConnection', nodes: Array<Maybe<{ __typename?: 'UserLanguage', nodeId: string, language?: Maybe<{ __typename?: 'Language', englishName: string }> }>> }, groupUsers: { __typename?: 'GroupUsersConnection', nodes: Array<Maybe<{ __typename?: 'GroupUser', userType: UserType, nodeId: string, group?: Maybe<{ __typename?: 'Group', uuid: any, language?: Maybe<{ __typename?: 'Language', englishName: string }>, languageSkillLevel?: Maybe<{ __typename?: 'LanguageSkillLevel', name?: Maybe<string> }> }> }>> } }>> } }> };

export type GroupChatMessagesQueryVariables = Exact<{
  groupUuid: Scalars['UUID'];
  before?: Maybe<Scalars['Cursor']>;
}>;


export type GroupChatMessagesQuery = { __typename?: 'Query', groupByUuid?: Maybe<{ __typename?: 'Group', messagesByRecipientGroupId: { __typename?: 'MessagesConnection', edges: Array<{ __typename?: 'MessagesEdge', node?: Maybe<{ __typename?: 'Message', body: string, createdAt: any, uuid: any, sender?: Maybe<{ __typename?: 'User', uuid: any }>, messagePreviews: { __typename?: 'MessagePreviewsConnection', nodes: Array<Maybe<{ __typename?: 'MessagePreview', uuid: any, filename: string, extension?: Maybe<string> }>> } }> }>, pageInfo: { __typename?: 'PageInfo', startCursor?: Maybe<any>, hasPreviousPage: boolean } } }> };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser?: Maybe<{ __typename?: 'User', bio: string, email: string, gender?: Maybe<string>, username?: Maybe<string>, uuid: any, avatarUrl?: Maybe<string>, userLanguages: { __typename?: 'UserLanguagesConnection', totalCount: number }, languageByLocale?: Maybe<{ __typename?: 'Language', alpha2: string }>, inviteTokens: { __typename?: 'InviteTokensConnection', nodes: Array<Maybe<{ __typename?: 'InviteToken', inviteToken: string }>> }, preference?: Maybe<{ __typename?: 'UserPreference', feedLanguage?: Maybe<{ __typename?: 'Language', alpha2: string }> }> }> };

export type RegisterUserActivityMutationVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type RegisterUserActivityMutation = { __typename?: 'Mutation', registerUserActivity?: Maybe<{ __typename?: 'RegisterUserActivityPayload', datetime?: Maybe<any> }> };

export type AllPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllPostsQuery = { __typename?: 'Query', posts?: Maybe<{ __typename?: 'PostsConnection', nodes: Array<Maybe<{ __typename?: 'Post', uuid: any, nodeId: string, createdAt: any, body: string, author?: Maybe<{ __typename?: 'User', uuid: any, username?: Maybe<string>, avatarUrl?: Maybe<string>, displayName?: Maybe<string> }>, likes: { __typename?: 'PostLikesConnection', totalCount: number, nodes: Array<Maybe<{ __typename?: 'PostLike', user?: Maybe<{ __typename?: 'User', uuid: any }> }>> }, parentPost?: Maybe<{ __typename?: 'Post', uuid: any }>, replies: { __typename?: 'PostsConnection', totalCount: number, nodes: Array<Maybe<{ __typename?: 'Post', uuid: any, nodeId: string, createdAt: any, body: string, author?: Maybe<{ __typename?: 'User', uuid: any, username?: Maybe<string>, avatarUrl?: Maybe<string> }>, likes: { __typename?: 'PostLikesConnection', totalCount: number, nodes: Array<Maybe<{ __typename?: 'PostLike', user?: Maybe<{ __typename?: 'User', uuid: any }> }>> }, parentPost?: Maybe<{ __typename?: 'Post', uuid: any }>, language?: Maybe<{ __typename?: 'Language', alpha2: string }>, prompt?: Maybe<{ __typename?: 'Prompt', content?: Maybe<string>, uuid: any, type: PromptType }> }>> }, recordings: { __typename?: 'PostRecordingsConnection', totalCount: number, nodes: Array<Maybe<{ __typename?: 'PostRecording', filename: string, extension?: Maybe<string>, uuid: any, user?: Maybe<{ __typename?: 'User', uuid: any }> }>> }, language?: Maybe<{ __typename?: 'Language', alpha2: string }>, prompt?: Maybe<{ __typename?: 'Prompt', content?: Maybe<string>, uuid: any, type: PromptType }> }>> }> };

export type CreatePostMutationVariables = Exact<{
  authorId: Scalars['Int'];
  body: Scalars['String'];
  parentPostId?: Maybe<Scalars['Int']>;
  languageId: Scalars['Int'];
  promptId?: Maybe<Scalars['Int']>;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost?: Maybe<{ __typename?: 'CreatePostPayload', clientMutationId?: Maybe<string>, post?: Maybe<{ __typename?: 'Post', body: string, createdAt: any, id: number, uuid: any, nodeId: string }> }> };

export type CreatePostLikeMutationVariables = Exact<{
  userId: Scalars['Int'];
  postId: Scalars['Int'];
}>;


export type CreatePostLikeMutation = { __typename?: 'Mutation', createPostLike?: Maybe<{ __typename?: 'CreatePostLikePayload', postLike?: Maybe<{ __typename?: 'PostLike', id: number, postId: number, userId: number, nodeId: string, createdAt: any }> }> };

export type CreatePostRecordingMutationVariables = Exact<{
  userId: Scalars['Int'];
  postId: Scalars['Int'];
  filename: Scalars['String'];
  extension?: Maybe<Scalars['String']>;
}>;


export type CreatePostRecordingMutation = { __typename?: 'Mutation', createPostRecording?: Maybe<{ __typename?: 'CreatePostRecordingPayload', postRecording?: Maybe<{ __typename?: 'PostRecording', createdAt: any, extension?: Maybe<string>, filename: string, uuid: any, nodeId: string }> }> };

export type DeletePostLikeMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePostLikeMutation = { __typename?: 'Mutation', deletePostLike?: Maybe<{ __typename?: 'DeletePostLikePayload', postLike?: Maybe<{ __typename?: 'PostLike', postId: number, userId: number, nodeId: string, createdAt: any }> }> };

export type PostIdByUuidQueryVariables = Exact<{
  uuid: Scalars['UUID'];
}>;


export type PostIdByUuidQuery = { __typename?: 'Query', postByUuid?: Maybe<{ __typename?: 'Post', id: number, nodeId: string }> };

export type PostLikeIdByPostIdAndUserIdQueryVariables = Exact<{
  postId: Scalars['Int'];
  userId: Scalars['Int'];
}>;


export type PostLikeIdByPostIdAndUserIdQuery = { __typename?: 'Query', postLikes?: Maybe<{ __typename?: 'PostLikesConnection', totalCount: number, nodes: Array<Maybe<{ __typename?: 'PostLike', id: number, nodeId: string }>> }> };

export type PromptIdByUuidQueryVariables = Exact<{
  uuid: Scalars['UUID'];
}>;


export type PromptIdByUuidQuery = { __typename?: 'Query', promptByUuid?: Maybe<{ __typename?: 'Prompt', id: number, nodeId: string }> };

export type CreateUserFollowershipMutationVariables = Exact<{
  userId: Scalars['Int'];
  followerId: Scalars['Int'];
}>;


export type CreateUserFollowershipMutation = { __typename?: 'Mutation', createUserFollower?: Maybe<{ __typename?: 'CreateUserFollowerPayload', userFollower?: Maybe<{ __typename?: 'UserFollower', userId: number, followerId: number, nodeId: string, createdAt: any }> }> };

export type DeleteUserFollowershipMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteUserFollowershipMutation = { __typename?: 'Mutation', deleteUserFollower?: Maybe<{ __typename?: 'DeleteUserFollowerPayload', userFollower?: Maybe<{ __typename?: 'UserFollower', followerId: number, userId: number, nodeId: string, createdAt: any }> }> };

export type UserByUsernameFollowershipsQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type UserByUsernameFollowershipsQuery = { __typename?: 'Query', userByUsername?: Maybe<{ __typename?: 'User', followers: { __typename?: 'UserFollowersConnection', nodes: Array<Maybe<{ __typename?: 'UserFollower', follower?: Maybe<{ __typename?: 'User', uuid: any, avatarUrl?: Maybe<string>, bio: string, displayName?: Maybe<string>, username?: Maybe<string>, followedByCurrentUser?: Maybe<boolean> }> }>> }, followedUsers: { __typename?: 'UserFollowersConnection', nodes: Array<Maybe<{ __typename?: 'UserFollower', user?: Maybe<{ __typename?: 'User', avatarUrl?: Maybe<string>, bio: string, displayName?: Maybe<string>, uuid: any, followedByCurrentUser?: Maybe<boolean>, username?: Maybe<string> }> }>> } }> };

export type UserFollowershipIdByUserIdAndFollowerIdQueryVariables = Exact<{
  followerId: Scalars['Int'];
  userId: Scalars['Int'];
}>;


export type UserFollowershipIdByUserIdAndFollowerIdQuery = { __typename?: 'Query', userFollowers?: Maybe<{ __typename?: 'UserFollowersConnection', totalCount: number, nodes: Array<Maybe<{ __typename?: 'UserFollower', id: number, nodeId: string }>> }> };

export type CreateGroupUserMutationVariables = Exact<{
  userType: UserType;
  userId: Scalars['Int'];
  groupId: Scalars['Int'];
}>;


export type CreateGroupUserMutation = { __typename?: 'Mutation', createGroupUser?: Maybe<{ __typename?: 'CreateGroupUserPayload', groupUser?: Maybe<{ __typename?: 'GroupUser', id: number }> }> };

export type JoinGlobalGroupMutationVariables = Exact<{
  groupUuid: Scalars['UUID'];
}>;


export type JoinGlobalGroupMutation = { __typename?: 'Mutation', joinGlobalGroup?: Maybe<{ __typename?: 'JoinGlobalGroupPayload', groupUser?: Maybe<{ __typename?: 'GroupUser', nodeId: string, group?: Maybe<{ __typename?: 'Group', uuid: any }>, user?: Maybe<{ __typename?: 'User', uuid: any }> }> }> };

export type UserGroupMembershipsQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UserGroupMembershipsQuery = { __typename?: 'Query', user?: Maybe<{ __typename?: 'User', groupUsers: { __typename?: 'GroupUsersConnection', edges: Array<{ __typename?: 'GroupUsersEdge', node?: Maybe<{ __typename?: 'GroupUser', userType: UserType, group?: Maybe<{ __typename?: 'Group', global: boolean, uuid: any, groupName?: Maybe<string>, language?: Maybe<{ __typename?: 'Language', alpha2: string }>, languageSkillLevel?: Maybe<{ __typename?: 'LanguageSkillLevel', name?: Maybe<string> }> }> }> }> } }> };

export type UserIsInGroupQueryVariables = Exact<{
  userId: Scalars['Int'];
  groupUuid: Scalars['UUID'];
}>;


export type UserIsInGroupQuery = { __typename?: 'Query', groupByUuid?: Maybe<{ __typename?: 'Group', groupUsers: { __typename?: 'GroupUsersConnection', totalCount: number } }> };

export type UsersWithoutLearnerGroupQueryVariables = Exact<{
  lid: Scalars['Int'];
  lsklid: Scalars['Int'];
  learnerSize: Scalars['Int'];
}>;


export type UsersWithoutLearnerGroupQuery = { __typename?: 'Query', usersWithoutLearnerGroup?: Maybe<{ __typename?: 'UsersConnection', nodes: Array<Maybe<{ __typename?: 'User', id: number }>> }> };

export type UsersWithoutNativeGroupQueryVariables = Exact<{
  lid: Scalars['Int'];
  nativeSize: Scalars['Int'];
}>;


export type UsersWithoutNativeGroupQuery = { __typename?: 'Query', usersWithoutNativeGroup?: Maybe<{ __typename?: 'UsersConnection', nodes: Array<Maybe<{ __typename?: 'User', id: number }>> }> };

export type AllGroupUuidsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllGroupUuidsQuery = { __typename?: 'Query', groups?: Maybe<{ __typename?: 'GroupsConnection', nodes: Array<Maybe<{ __typename?: 'Group', uuid: any }>> }> };

export type AllGroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllGroupsQuery = { __typename?: 'Query', groups?: Maybe<{ __typename?: 'GroupsConnection', nodes: Array<Maybe<{ __typename?: 'Group', uuid: any, groupName?: Maybe<string>, global: boolean, language?: Maybe<{ __typename?: 'Language', alpha2: string, englishName: string }>, languageSkillLevel?: Maybe<{ __typename?: 'LanguageSkillLevel', name?: Maybe<string>, nodeId: string }>, groupUsers: { __typename?: 'GroupUsersConnection', totalCount: number, nodes: Array<Maybe<{ __typename?: 'GroupUser', joinedOn: any, user?: Maybe<{ __typename?: 'User', avatarUrl?: Maybe<string>, username?: Maybe<string>, uuid: any }> }>> } }>> }> };

export type CreateGroupMutationVariables = Exact<{
  global: Scalars['Boolean'];
  groupName: Scalars['String'];
  languageId: Scalars['Int'];
  languageSkillLevelId: Scalars['Int'];
  uuid: Scalars['UUID'];
}>;


export type CreateGroupMutation = { __typename?: 'Mutation', createGroup?: Maybe<{ __typename?: 'CreateGroupPayload', group?: Maybe<{ __typename?: 'Group', id: number, uuid: any }> }> };

export type GroupIdByUuidQueryVariables = Exact<{
  uuid: Scalars['UUID'];
}>;


export type GroupIdByUuidQuery = { __typename?: 'Query', groupByUuid?: Maybe<{ __typename?: 'Group', id: number }> };

export type GroupLanguageByUuidQueryVariables = Exact<{
  uuid: Scalars['UUID'];
}>;


export type GroupLanguageByUuidQuery = { __typename?: 'Query', groupByUuid?: Maybe<{ __typename?: 'Group', uuid: any, language?: Maybe<{ __typename?: 'Language', alpha2: string }> }> };

export type LanguageCodeMappingsQueryVariables = Exact<{ [key: string]: never; }>;


export type LanguageCodeMappingsQuery = { __typename?: 'Query', languages?: Maybe<{ __typename?: 'LanguagesConnection', nodes: Array<Maybe<{ __typename?: 'Language', alpha2: string, englishName: string }>> }> };

export type LanguageIdByAlpha2QueryVariables = Exact<{
  alpha2: Scalars['String'];
}>;


export type LanguageIdByAlpha2Query = { __typename?: 'Query', languageByAlpha2?: Maybe<{ __typename?: 'Language', id: number }> };

export type AdminEmailsFcmTokensQueryVariables = Exact<{
  in: Array<Scalars['String']> | Scalars['String'];
}>;


export type AdminEmailsFcmTokensQuery = { __typename?: 'Query', users?: Maybe<{ __typename?: 'UsersConnection', nodes: Array<Maybe<{ __typename?: 'User', userDevices: { __typename?: 'UserDevicesConnection', nodes: Array<Maybe<{ __typename?: 'UserDevice', fcmToken?: Maybe<string> }>> } }>> }> };

export type CreateNotificationMutationVariables = Exact<{
  channelId: Scalars['Int'];
  recipientId?: Maybe<Scalars['Int']>;
  recipientGroupId?: Maybe<Scalars['Int']>;
  sentAt?: Maybe<Scalars['Datetime']>;
  params?: Maybe<Scalars['JSON']>;
  expiresAt?: Maybe<Scalars['Datetime']>;
  withheldUntil?: Maybe<Scalars['Datetime']>;
}>;


export type CreateNotificationMutation = { __typename?: 'Mutation', createNotification?: Maybe<{ __typename?: 'CreateNotificationPayload', clientMutationId?: Maybe<string>, notification?: Maybe<{ __typename?: 'Notification', createdAt: any, expiresAt?: Maybe<any>, withheldUntil?: Maybe<any>, id: number }> }> };

export type CreateUserDeviceMutationVariables = Exact<{
  userId: Scalars['Int'];
  fcmToken?: Maybe<Scalars['String']>;
}>;


export type CreateUserDeviceMutation = { __typename?: 'Mutation', createUserDevice?: Maybe<{ __typename?: 'CreateUserDevicePayload', userDevice?: Maybe<{ __typename?: 'UserDevice', uuid: any, fcmToken?: Maybe<string>, id: number }> }> };

export type DeleteInvalidFcmTokenMutationVariables = Exact<{
  fcmToken: Scalars['String'];
}>;


export type DeleteInvalidFcmTokenMutation = { __typename?: 'Mutation', deleteUserDeviceByFcmToken?: Maybe<{ __typename?: 'DeleteUserDevicePayload', clientMutationId?: Maybe<string>, userDevice?: Maybe<{ __typename?: 'UserDevice', userId?: Maybe<number>, fcmToken?: Maybe<string>, id: number }> }> };

export type GroupMessageNotificationQueryVariables = Exact<{
  groupUuid: Scalars['UUID'];
  senderUuid: Scalars['UUID'];
}>;


export type GroupMessageNotificationQuery = { __typename?: 'Query', groupByUuid?: Maybe<{ __typename?: 'Group', groupName?: Maybe<string>, uuid: any, groupUsers: { __typename?: 'GroupUsersConnection', nodes: Array<Maybe<{ __typename?: 'GroupUser', user?: Maybe<{ __typename?: 'User', uuid: any, userDevices: { __typename?: 'UserDevicesConnection', nodes: Array<Maybe<{ __typename?: 'UserDevice', fcmToken?: Maybe<string> }>> } }> }>> }, language?: Maybe<{ __typename?: 'Language', alpha2: string }>, languageSkillLevel?: Maybe<{ __typename?: 'LanguageSkillLevel', name?: Maybe<string> }> }>, userByUuid?: Maybe<{ __typename?: 'User', username?: Maybe<string> }> };

export type MarkNotificationAsSentMutationVariables = Exact<{
  id: Scalars['Int'];
  sentAt?: Maybe<Scalars['Datetime']>;
}>;


export type MarkNotificationAsSentMutation = { __typename?: 'Mutation', updateNotification?: Maybe<{ __typename?: 'UpdateNotificationPayload', notification?: Maybe<{ __typename?: 'Notification', id: number, sentAt?: Maybe<any> }> }> };

export type NotificationChannelByNameQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type NotificationChannelByNameQuery = { __typename?: 'Query', notificationChannelByName?: Maybe<{ __typename?: 'NotificationChannel', id: number }> };

export type OutstandingEmailNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type OutstandingEmailNotificationsQuery = { __typename?: 'Query', notificationChannelByName?: Maybe<{ __typename?: 'NotificationChannel', notificationsByChannelId: { __typename?: 'NotificationsConnection', nodes: Array<Maybe<{ __typename?: 'Notification', id: number, params?: Maybe<any>, expiresAt?: Maybe<any>, withheldUntil?: Maybe<any>, recipient?: Maybe<{ __typename?: 'User', email: string, emailNotificationsEnabled: boolean, username?: Maybe<string>, unconfirmedEmail?: Maybe<string> }> }>> } }> };

export type OutstandingFcmNotificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type OutstandingFcmNotificationsQuery = { __typename?: 'Query', notificationChannelByName?: Maybe<{ __typename?: 'NotificationChannel', notificationsByChannelId: { __typename?: 'NotificationsConnection', nodes: Array<Maybe<{ __typename?: 'Notification', id: number, params?: Maybe<any>, expiresAt?: Maybe<any>, withheldUntil?: Maybe<any>, recipient?: Maybe<{ __typename?: 'User', uuid: any, userDevices: { __typename?: 'UserDevicesConnection', nodes: Array<Maybe<{ __typename?: 'UserDevice', fcmToken?: Maybe<string> }>> } }>, recipientGroup?: Maybe<{ __typename?: 'Group', uuid: any, groupUsers: { __typename?: 'GroupUsersConnection', nodes: Array<Maybe<{ __typename?: 'GroupUser', user?: Maybe<{ __typename?: 'User', uuid: any, userDevices: { __typename?: 'UserDevicesConnection', nodes: Array<Maybe<{ __typename?: 'UserDevice', fcmToken?: Maybe<string> }>> } }> }>> } }> }>> } }> };

export type PostLikeNotificationQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PostLikeNotificationQuery = { __typename?: 'Query', postLike?: Maybe<{ __typename?: 'PostLike', post?: Maybe<{ __typename?: 'Post', authorId?: Maybe<number>, body: string, parentPostId?: Maybe<number> }>, user?: Maybe<{ __typename?: 'User', id: number, username?: Maybe<string>, displayName?: Maybe<string> }> }> };

export type PostReplyNotificationQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PostReplyNotificationQuery = { __typename?: 'Query', post?: Maybe<{ __typename?: 'Post', authorId?: Maybe<number>, body: string, createdAt: any, parentPost?: Maybe<{ __typename?: 'Post', authorId?: Maybe<number> }>, author?: Maybe<{ __typename?: 'User', displayName?: Maybe<string>, username?: Maybe<string> }> }> };

export type UnsubscribeUserEmailNotificationsMutationVariables = Exact<{
  token: Scalars['String'];
  lastActiveAt: Scalars['Datetime'];
}>;


export type UnsubscribeUserEmailNotificationsMutation = { __typename?: 'Mutation', updateUserByEmailUnsubscribeToken?: Maybe<{ __typename?: 'UpdateUserPayload', clientMutationId?: Maybe<string>, user?: Maybe<{ __typename?: 'User', email: string, uuid: any, username?: Maybe<string> }> }> };

export type UserByUsernamePostsQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type UserByUsernamePostsQuery = { __typename?: 'Query', userByUsername?: Maybe<{ __typename?: 'User', authoredPosts: { __typename?: 'PostsConnection', nodes: Array<Maybe<{ __typename?: 'Post', uuid: any, nodeId: string, createdAt: any, body: string, author?: Maybe<{ __typename?: 'User', uuid: any, username?: Maybe<string>, avatarUrl?: Maybe<string>, displayName?: Maybe<string> }>, likes: { __typename?: 'PostLikesConnection', totalCount: number, nodes: Array<Maybe<{ __typename?: 'PostLike', user?: Maybe<{ __typename?: 'User', uuid: any }> }>> }, parentPost?: Maybe<{ __typename?: 'Post', uuid: any }>, replies: { __typename?: 'PostsConnection', totalCount: number, nodes: Array<Maybe<{ __typename?: 'Post', uuid: any, nodeId: string, createdAt: any, body: string, author?: Maybe<{ __typename?: 'User', uuid: any, username?: Maybe<string>, avatarUrl?: Maybe<string> }>, likes: { __typename?: 'PostLikesConnection', totalCount: number, nodes: Array<Maybe<{ __typename?: 'PostLike', user?: Maybe<{ __typename?: 'User', uuid: any }> }>> }, parentPost?: Maybe<{ __typename?: 'Post', uuid: any }>, language?: Maybe<{ __typename?: 'Language', alpha2: string }>, prompt?: Maybe<{ __typename?: 'Prompt', content?: Maybe<string>, uuid: any, type: PromptType }> }>> }, recordings: { __typename?: 'PostRecordingsConnection', totalCount: number, nodes: Array<Maybe<{ __typename?: 'PostRecording', filename: string, extension?: Maybe<string>, uuid: any, user?: Maybe<{ __typename?: 'User', uuid: any }> }>> }, language?: Maybe<{ __typename?: 'Language', alpha2: string }>, prompt?: Maybe<{ __typename?: 'Prompt', content?: Maybe<string>, uuid: any, type: PromptType }> }>> } }> };

export type UserProfileQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type UserProfileQuery = { __typename?: 'Query', userByUsername?: Maybe<{ __typename?: 'User', bio: string, gender?: Maybe<string>, username?: Maybe<string>, avatarUrl?: Maybe<string>, uuid: any, displayName?: Maybe<string>, userLanguages: { __typename?: 'UserLanguagesConnection', totalCount: number, nodes: Array<Maybe<{ __typename?: 'UserLanguage', native: boolean, language?: Maybe<{ __typename?: 'Language', englishName: string }>, languageSkillLevel?: Maybe<{ __typename?: 'LanguageSkillLevel', name?: Maybe<string> }> }>> } }> };

export type CreateUserMutationVariables = Exact<{
  email: Scalars['String'];
  gender: Scalars['String'];
  passwordHash: Scalars['String'];
  username: Scalars['String'];
  uuid: Scalars['UUID'];
  avatarUrl: Scalars['String'];
  locale?: Maybe<Scalars['Int']>;
  emailUnsubscribeToken: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: Maybe<{ __typename?: 'CreateUserPayload', user?: Maybe<{ __typename?: 'User', id: number }> }> };

export type CreateUserLanguageMutationVariables = Exact<{
  languageId: Scalars['Int'];
  languageSkillLevelId?: Maybe<Scalars['Int']>;
  native: Scalars['Boolean'];
  userId: Scalars['Int'];
}>;


export type CreateUserLanguageMutation = { __typename?: 'Mutation', createUserLanguage?: Maybe<{ __typename?: 'CreateUserLanguagePayload', userLanguage?: Maybe<{ __typename?: 'UserLanguage', id: number }> }> };

export type CreateUserPreferenceMutationVariables = Exact<{
  feedLanguageId: Scalars['Int'];
  userId: Scalars['Int'];
}>;


export type CreateUserPreferenceMutation = { __typename?: 'Mutation', createUserPreference?: Maybe<{ __typename?: 'CreateUserPreferencePayload', userPreference?: Maybe<{ __typename?: 'UserPreference', createdAt: any, id: number, nodeId: string, feedLanguageId: number }> }> };

export type CurrentUserProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserProfileQuery = { __typename?: 'Query', currentUser?: Maybe<{ __typename?: 'User', bio: string, email: string, gender?: Maybe<string>, username?: Maybe<string>, avatarUrl?: Maybe<string>, uuid: any, displayName?: Maybe<string>, userLanguages: { __typename?: 'UserLanguagesConnection', totalCount: number, nodes: Array<Maybe<{ __typename?: 'UserLanguage', native: boolean, language?: Maybe<{ __typename?: 'Language', englishName: string }>, languageSkillLevel?: Maybe<{ __typename?: 'LanguageSkillLevel', name?: Maybe<string> }> }>> }, groupUsers: { __typename?: 'GroupUsersConnection', nodes: Array<Maybe<{ __typename?: 'GroupUser', nodeId: string, userType: UserType, joinedOn: any, group?: Maybe<{ __typename?: 'Group', uuid: any, groupName?: Maybe<string>, language?: Maybe<{ __typename?: 'Language', englishName: string }>, languageSkillLevel?: Maybe<{ __typename?: 'LanguageSkillLevel', name?: Maybe<string> }> }> }>> } }> };

export type UpdateUserAvatarUrlMutationVariables = Exact<{
  avatarUrl: Scalars['String'];
  id: Scalars['Int'];
}>;


export type UpdateUserAvatarUrlMutation = { __typename?: 'Mutation', updateUser?: Maybe<{ __typename?: 'UpdateUserPayload', user?: Maybe<{ __typename?: 'User', avatarUrl?: Maybe<string> }> }> };

export type UpdateUserBioMutationVariables = Exact<{
  bio: Scalars['String'];
  id: Scalars['Int'];
}>;


export type UpdateUserBioMutation = { __typename?: 'Mutation', updateUser?: Maybe<{ __typename?: 'UpdateUserPayload', user?: Maybe<{ __typename?: 'User', bio: string }> }> };

export type UpsertUserPreferenceMutationVariables = Exact<{
  feedLanguageId: Scalars['Int'];
  userId: Scalars['Int'];
}>;


export type UpsertUserPreferenceMutation = { __typename?: 'Mutation', upsertUserPreference?: Maybe<{ __typename?: 'UpsertUserPreferencePayload', userPreference?: Maybe<{ __typename?: 'UserPreference', createdAt: any, id: number, nodeId: string, feedLanguageId: number }> }> };

export type UserHasCompletedProfileQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UserHasCompletedProfileQuery = { __typename?: 'Query', user?: Maybe<{ __typename?: 'User', username?: Maybe<string>, userLanguages: { __typename?: 'UserLanguagesConnection', totalCount: number } }> };

export type UserIdByEmailQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type UserIdByEmailQuery = { __typename?: 'Query', userByEmail?: Maybe<{ __typename?: 'User', id: number }> };

export type UserIdByUuidQueryVariables = Exact<{
  uuid: Scalars['UUID'];
}>;


export type UserIdByUuidQuery = { __typename?: 'Query', userByUuid?: Maybe<{ __typename?: 'User', id: number }> };

export type UserLanguageInfoQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UserLanguageInfoQuery = { __typename?: 'Query', user?: Maybe<{ __typename?: 'User', id: number, uuid: any, userLanguages: { __typename?: 'UserLanguagesConnection', nodes: Array<Maybe<{ __typename?: 'UserLanguage', nodeId: string, languageId: number, languageSkillLevelId?: Maybe<number>, native: boolean }>> } }> };

export type UserUuidByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UserUuidByIdQuery = { __typename?: 'Query', user?: Maybe<{ __typename?: 'User', uuid: any }> };


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
export const CreateMessagePreview = gql`
    mutation CreateMessagePreview($messageId: Int!, $filename: String!, $extension: String, $uuid: UUID!) {
  createMessagePreview(
    input: {messagePreview: {uuid: $uuid, filename: $filename, extension: $extension, messageId: $messageId}}
  ) {
    messagePreview {
      id
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
      nodeId
    }
    uuid
    usersByGroupUserGroupIdAndUserId {
      nodes {
        bio
        avatarUrl
        uuid
        username
        lastActiveAt
        userLanguages {
          nodes {
            nodeId
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
            nodeId
          }
        }
      }
    }
  }
}
    `;
export const GroupChatMessages = gql`
    query GroupChatMessages($groupUuid: UUID!, $before: Cursor) {
  groupByUuid(uuid: $groupUuid) {
    messagesByRecipientGroupId(orderBy: CREATED_AT_ASC, last: 128, before: $before) {
      edges {
        node {
          body
          createdAt
          sender {
            uuid
          }
          uuid
          messagePreviews {
            nodes {
              uuid
              filename
              extension
            }
          }
        }
      }
      pageInfo {
        startCursor
        hasPreviousPage
      }
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
    inviteTokens {
      nodes {
        inviteToken
      }
    }
    preference {
      feedLanguage {
        alpha2
      }
    }
  }
}
    `;
export const RegisterUserActivity = gql`
    mutation RegisterUserActivity($userId: Int!) {
  registerUserActivity(input: {userId: $userId}) {
    datetime
  }
}
    `;
export const AllPosts = gql`
    query AllPosts {
  posts(orderBy: CREATED_AT_DESC, condition: {parentPostId: null}) {
    nodes {
      uuid
      nodeId
      createdAt
      author {
        uuid
        username
        avatarUrl
        displayName
      }
      body
      likes {
        totalCount
        nodes {
          user {
            uuid
          }
        }
      }
      parentPost {
        uuid
      }
      replies(orderBy: CREATED_AT_ASC, filter: {not: {parentPostId: {isNull: true}}}) {
        totalCount
        nodes {
          uuid
          nodeId
          createdAt
          author {
            uuid
            username
            avatarUrl
          }
          likes {
            totalCount
            nodes {
              user {
                uuid
              }
            }
          }
          body
          parentPost {
            uuid
          }
          language {
            alpha2
          }
          prompt {
            content
            uuid
            type
          }
        }
      }
      recordings {
        totalCount
        nodes {
          filename
          extension
          uuid
          user {
            uuid
          }
        }
      }
      language {
        alpha2
      }
      prompt {
        content
        uuid
        type
      }
    }
  }
}
    `;
export const CreatePost = gql`
    mutation CreatePost($authorId: Int!, $body: String!, $parentPostId: Int, $languageId: Int!, $promptId: Int) {
  createPost(
    input: {post: {authorId: $authorId, parentPostId: $parentPostId, body: $body, languageId: $languageId, promptId: $promptId}}
  ) {
    clientMutationId
    post {
      body
      createdAt
      id
      uuid
      nodeId
    }
  }
}
    `;
export const CreatePostLike = gql`
    mutation CreatePostLike($userId: Int!, $postId: Int!) {
  createPostLike(input: {postLike: {postId: $postId, userId: $userId}}) {
    postLike {
      id
      postId
      userId
      nodeId
      createdAt
    }
  }
}
    `;
export const CreatePostRecording = gql`
    mutation CreatePostRecording($userId: Int!, $postId: Int!, $filename: String!, $extension: String = "") {
  createPostRecording(
    input: {postRecording: {userId: $userId, postId: $postId, filename: $filename, extension: $extension}}
  ) {
    postRecording {
      createdAt
      extension
      filename
      uuid
      nodeId
    }
  }
}
    `;
export const DeletePostLike = gql`
    mutation DeletePostLike($id: Int!) {
  deletePostLike(input: {id: $id}) {
    postLike {
      postId
      userId
      nodeId
      createdAt
    }
  }
}
    `;
export const PostIdByUuid = gql`
    query PostIdByUuid($uuid: UUID!) {
  postByUuid(uuid: $uuid) {
    id
    nodeId
  }
}
    `;
export const PostLikeIdByPostIdAndUserId = gql`
    query PostLikeIdByPostIdAndUserId($postId: Int!, $userId: Int!) {
  postLikes(condition: {postId: $postId, userId: $userId}) {
    nodes {
      id
      nodeId
    }
    totalCount
  }
}
    `;
export const PromptIdByUuid = gql`
    query PromptIdByUuid($uuid: UUID!) {
  promptByUuid(uuid: $uuid) {
    id
    nodeId
  }
}
    `;
export const CreateUserFollowership = gql`
    mutation CreateUserFollowership($userId: Int!, $followerId: Int!) {
  createUserFollower(
    input: {userFollower: {userId: $userId, followerId: $followerId}}
  ) {
    userFollower {
      userId
      followerId
      nodeId
      createdAt
    }
  }
}
    `;
export const DeleteUserFollowership = gql`
    mutation DeleteUserFollowership($id: Int!) {
  deleteUserFollower(input: {id: $id}) {
    userFollower {
      followerId
      userId
      nodeId
      createdAt
    }
  }
}
    `;
export const UserByUsernameFollowerships = gql`
    query UserByUsernameFollowerships($username: String!) {
  userByUsername(username: $username) {
    followers {
      nodes {
        follower {
          uuid
          avatarUrl
          bio
          displayName
          username
          followedByCurrentUser
        }
      }
    }
    followedUsers {
      nodes {
        user {
          avatarUrl
          bio
          displayName
          uuid
          followedByCurrentUser
          username
        }
      }
    }
  }
}
    `;
export const UserFollowershipIdByUserIdAndFollowerId = gql`
    query UserFollowershipIdByUserIdAndFollowerId($followerId: Int!, $userId: Int!) {
  userFollowers(condition: {followerId: $followerId, userId: $userId}) {
    nodes {
      id
      nodeId
    }
    totalCount
  }
}
    `;
export const CreateGroupUser = gql`
    mutation CreateGroupUser($userType: UserType!, $userId: Int!, $groupId: Int!) {
  createGroupUser(
    input: {groupUser: {userType: $userType, userId: $userId, groupId: $groupId}}
  ) {
    groupUser {
      id
    }
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
      nodeId
    }
  }
}
    `;
export const UserGroupMemberships = gql`
    query UserGroupMemberships($id: Int!) {
  user(id: $id) {
    groupUsers {
      edges {
        node {
          group {
            global
            uuid
            groupName
            language {
              alpha2
            }
            languageSkillLevel {
              name
            }
          }
          userType
        }
      }
    }
  }
}
    `;
export const UserIsInGroup = gql`
    query UserIsInGroup($userId: Int!, $groupUuid: UUID!) {
  groupByUuid(uuid: $groupUuid) {
    groupUsers(condition: {userId: $userId}) {
      totalCount
    }
  }
}
    `;
export const UsersWithoutLearnerGroup = gql`
    query UsersWithoutLearnerGroup($lid: Int!, $lsklid: Int!, $learnerSize: Int!) {
  usersWithoutLearnerGroup(lid: $lid, lsklid: $lsklid, first: $learnerSize) {
    nodes {
      id
    }
  }
}
    `;
export const UsersWithoutNativeGroup = gql`
    query UsersWithoutNativeGroup($lid: Int!, $nativeSize: Int!) {
  usersWithoutNativeGroup(lid: $lid, first: $nativeSize) {
    nodes {
      id
    }
  }
}
    `;
export const AllGroupUuids = gql`
    query AllGroupUuids {
  groups {
    nodes {
      uuid
    }
  }
}
    `;
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
        nodeId
      }
      groupUsers {
        totalCount
        nodes {
          user {
            avatarUrl
            username
            uuid
          }
          joinedOn
        }
      }
    }
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
      uuid
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
export const GroupLanguageByUuid = gql`
    query GroupLanguageByUuid($uuid: UUID!) {
  groupByUuid(uuid: $uuid) {
    language {
      alpha2
    }
    uuid
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
export const AdminEmailsFcmTokens = gql`
    query AdminEmailsFcmTokens($in: [String!]!) {
  users(filter: {email: {in: $in}}) {
    nodes {
      userDevices {
        nodes {
          fcmToken
        }
      }
    }
  }
}
    `;
export const CreateNotification = gql`
    mutation CreateNotification($channelId: Int!, $recipientId: Int, $recipientGroupId: Int, $sentAt: Datetime, $params: JSON, $expiresAt: Datetime, $withheldUntil: Datetime) {
  createNotification(
    input: {notification: {channelId: $channelId, recipientId: $recipientId, recipientGroupId: $recipientGroupId, params: $params, sentAt: $sentAt, expiresAt: $expiresAt, withheldUntil: $withheldUntil}}
  ) {
    clientMutationId
    notification {
      createdAt
      expiresAt
      withheldUntil
      id
    }
  }
}
    `;
export const CreateUserDevice = gql`
    mutation CreateUserDevice($userId: Int!, $fcmToken: String) {
  createUserDevice(input: {userDevice: {userId: $userId, fcmToken: $fcmToken}}) {
    userDevice {
      uuid
      fcmToken
      id
    }
  }
}
    `;
export const DeleteInvalidFcmToken = gql`
    mutation DeleteInvalidFcmToken($fcmToken: String!) {
  deleteUserDeviceByFcmToken(input: {fcmToken: $fcmToken}) {
    userDevice {
      userId
      fcmToken
      id
    }
    clientMutationId
  }
}
    `;
export const GroupMessageNotification = gql`
    query GroupMessageNotification($groupUuid: UUID!, $senderUuid: UUID!) {
  groupByUuid(uuid: $groupUuid) {
    groupUsers {
      nodes {
        user {
          uuid
          userDevices {
            nodes {
              fcmToken
            }
          }
        }
      }
    }
    groupName
    uuid
    language {
      alpha2
    }
    languageSkillLevel {
      name
    }
  }
  userByUuid(uuid: $senderUuid) {
    username
  }
}
    `;
export const MarkNotificationAsSent = gql`
    mutation MarkNotificationAsSent($id: Int!, $sentAt: Datetime) {
  updateNotification(input: {patch: {sentAt: $sentAt}, id: $id}) {
    notification {
      id
      sentAt
    }
  }
}
    `;
export const NotificationChannelByName = gql`
    query NotificationChannelByName($name: String!) {
  notificationChannelByName(name: $name) {
    id
  }
}
    `;
export const OutstandingEmailNotifications = gql`
    query OutstandingEmailNotifications {
  notificationChannelByName(name: "Email") {
    notificationsByChannelId(
      orderBy: CREATED_AT_ASC
      filter: {sentAt: {isNull: true}}
    ) {
      nodes {
        id
        recipient {
          email
          emailNotificationsEnabled
          username
          unconfirmedEmail
        }
        params
        expiresAt
        withheldUntil
      }
    }
  }
}
    `;
export const OutstandingFcmNotifications = gql`
    query OutstandingFcmNotifications {
  notificationChannelByName(name: "Firebase Cloud Messaging") {
    notificationsByChannelId(
      orderBy: CREATED_AT_ASC
      filter: {sentAt: {isNull: true}}
    ) {
      nodes {
        id
        recipient {
          userDevices {
            nodes {
              fcmToken
            }
          }
          uuid
        }
        params
        expiresAt
        withheldUntil
        recipientGroup {
          uuid
          groupUsers {
            nodes {
              user {
                userDevices {
                  nodes {
                    fcmToken
                  }
                }
                uuid
              }
            }
          }
        }
      }
    }
  }
}
    `;
export const PostLikeNotification = gql`
    query PostLikeNotification($id: Int!) {
  postLike(id: $id) {
    post {
      authorId
      body
      parentPostId
    }
    user {
      id
      username
      displayName
    }
  }
}
    `;
export const PostReplyNotification = gql`
    query PostReplyNotification($id: Int!) {
  post(id: $id) {
    authorId
    parentPost {
      authorId
    }
    body
    createdAt
    author {
      displayName
      username
    }
  }
}
    `;
export const UnsubscribeUserEmailNotifications = gql`
    mutation UnsubscribeUserEmailNotifications($token: String!, $lastActiveAt: Datetime!) {
  updateUserByEmailUnsubscribeToken(
    input: {patch: {emailNotificationsEnabled: false, lastActiveAt: $lastActiveAt}, emailUnsubscribeToken: $token}
  ) {
    clientMutationId
    user {
      email
      uuid
      username
    }
  }
}
    `;
export const UserByUsernamePosts = gql`
    query UserByUsernamePosts($username: String!) {
  userByUsername(username: $username) {
    authoredPosts(orderBy: CREATED_AT_DESC, condition: {parentPostId: null}) {
      nodes {
        uuid
        nodeId
        createdAt
        author {
          uuid
          username
          avatarUrl
          displayName
        }
        body
        likes {
          totalCount
          nodes {
            user {
              uuid
            }
          }
        }
        parentPost {
          uuid
        }
        replies(orderBy: CREATED_AT_ASC, filter: {not: {parentPostId: {isNull: true}}}) {
          totalCount
          nodes {
            uuid
            nodeId
            createdAt
            author {
              uuid
              username
              avatarUrl
            }
            likes {
              totalCount
              nodes {
                user {
                  uuid
                }
              }
            }
            body
            parentPost {
              uuid
            }
            language {
              alpha2
            }
            prompt {
              content
              uuid
              type
            }
          }
        }
        recordings {
          totalCount
          nodes {
            filename
            extension
            uuid
            user {
              uuid
            }
          }
        }
        language {
          alpha2
        }
        prompt {
          content
          uuid
          type
        }
      }
    }
  }
}
    `;
export const UserProfile = gql`
    query UserProfile($username: String!) {
  userByUsername(username: $username) {
    bio
    gender
    username
    avatarUrl
    uuid
    userLanguages {
      totalCount
      nodes {
        language {
          englishName
        }
        languageSkillLevel {
          name
        }
        native
      }
    }
    displayName
  }
}
    `;
export const CreateUser = gql`
    mutation CreateUser($email: String!, $gender: String!, $passwordHash: String!, $username: String!, $uuid: UUID!, $avatarUrl: String!, $locale: Int, $emailUnsubscribeToken: String!) {
  createUser(
    input: {user: {email: $email, gender: $gender, passwordHash: $passwordHash, username: $username, uuid: $uuid, avatarUrl: $avatarUrl, locale: $locale, emailUnsubscribeToken: $emailUnsubscribeToken}}
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
export const CreateUserPreference = gql`
    mutation CreateUserPreference($feedLanguageId: Int!, $userId: Int!) {
  createUserPreference(
    input: {userPreference: {feedLanguageId: $feedLanguageId, userId: $userId}}
  ) {
    userPreference {
      createdAt
      id
      nodeId
      feedLanguageId
    }
  }
}
    `;
export const CurrentUserProfile = gql`
    query CurrentUserProfile {
  currentUser {
    bio
    email
    gender
    username
    avatarUrl
    uuid
    userLanguages {
      totalCount
      nodes {
        language {
          englishName
        }
        languageSkillLevel {
          name
        }
        native
      }
    }
    groupUsers {
      nodes {
        nodeId
        group {
          uuid
          groupName
          language {
            englishName
          }
          languageSkillLevel {
            name
          }
        }
        userType
        joinedOn
      }
    }
    displayName
  }
}
    `;
export const UpdateUserAvatarUrl = gql`
    mutation UpdateUserAvatarUrl($avatarUrl: String!, $id: Int!) {
  updateUser(input: {patch: {avatarUrl: $avatarUrl}, id: $id}) {
    user {
      avatarUrl
    }
  }
}
    `;
export const UpdateUserBio = gql`
    mutation UpdateUserBio($bio: String!, $id: Int!) {
  updateUser(input: {patch: {bio: $bio}, id: $id}) {
    user {
      bio
    }
  }
}
    `;
export const UpsertUserPreference = gql`
    mutation UpsertUserPreference($feedLanguageId: Int!, $userId: Int!) {
  upsertUserPreference(
    input: {userPreference: {feedLanguageId: $feedLanguageId, userId: $userId}}
    where: {userId: $userId}
  ) {
    userPreference {
      createdAt
      id
      nodeId
      feedLanguageId
    }
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
export const UserIdByEmail = gql`
    query UserIdByEmail($email: String!) {
  userByEmail(email: $email) {
    id
  }
}
    `;
export const UserIdByUuid = gql`
    query UserIdByUuid($uuid: UUID!) {
  userByUuid(uuid: $uuid) {
    id
  }
}
    `;
export const UserLanguageInfo = gql`
    query UserLanguageInfo($id: Int!) {
  user(id: $id) {
    id
    uuid
    userLanguages {
      nodes {
        nodeId
        languageId
        languageSkillLevelId
        native
      }
    }
  }
}
    `;
export const UserUuidById = gql`
    query UserUuidById($id: Int!) {
  user(id: $id) {
    uuid
  }
}
    `;