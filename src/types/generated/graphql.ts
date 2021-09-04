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
  /** Creates a single `ChineseRandomQuestion`. */
  createChineseRandomQuestion?: Maybe<CreateChineseRandomQuestionPayload>;
  /** Creates a single `UserDevice`. */
  createUserDevice?: Maybe<CreateUserDevicePayload>;
  /** Creates a single `UserLanguage`. */
  createUserLanguage?: Maybe<CreateUserLanguagePayload>;
  /** Creates a single `UserSession`. */
  createUserSession?: Maybe<CreateUserSessionPayload>;
  /** Creates a single `User`. */
  createUser?: Maybe<CreateUserPayload>;
  /** Creates a single `GermanWord`. */
  createGermanWord?: Maybe<CreateGermanWordPayload>;
  /** Creates a single `EnglishWord`. */
  createEnglishWord?: Maybe<CreateEnglishWordPayload>;
  /** Creates a single `GermanWouldYouRatherQuestion`. */
  createGermanWouldYouRatherQuestion?: Maybe<CreateGermanWouldYouRatherQuestionPayload>;
  /** Creates a single `EnglishWouldYouRatherQuestion`. */
  createEnglishWouldYouRatherQuestion?: Maybe<CreateEnglishWouldYouRatherQuestionPayload>;
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
  /** Deletes a single `ChineseWouldYouRatherQuestion` using its globally unique id. */
  deleteChineseWouldYouRatherQuestionByNodeId?: Maybe<DeleteChineseWouldYouRatherQuestionPayload>;
  /** Deletes a single `ChineseWouldYouRatherQuestion` using a unique key. */
  deleteChineseWouldYouRatherQuestion?: Maybe<DeleteChineseWouldYouRatherQuestionPayload>;
  /** Deletes a single `ChineseWouldYouRatherQuestion` using a unique key. */
  deleteChineseWouldYouRatherQuestionByUuid?: Maybe<DeleteChineseWouldYouRatherQuestionPayload>;
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
export type MutationCreateChineseRandomQuestionArgs = {
  input: CreateChineseRandomQuestionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserDeviceArgs = {
  input: CreateUserDeviceInput;
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
export type MutationCreateGermanWordArgs = {
  input: CreateGermanWordInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateEnglishWordArgs = {
  input: CreateEnglishWordInput;
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
  /** Reads and enables pagination through a set of `ChineseRandomQuestion`. */
  chineseRandomQuestions?: Maybe<ChineseRandomQuestionsConnection>;
  /** Reads and enables pagination through a set of `UserDevice`. */
  userDevices?: Maybe<UserDevicesConnection>;
  /** Reads and enables pagination through a set of `UserLanguage`. */
  userLanguages?: Maybe<UserLanguagesConnection>;
  /** Reads and enables pagination through a set of `UserSession`. */
  userSessions?: Maybe<UserSessionsConnection>;
  /** Reads and enables pagination through a set of `User`. */
  users?: Maybe<UsersConnection>;
  /** Reads and enables pagination through a set of `GermanWord`. */
  germanWords?: Maybe<GermanWordsConnection>;
  /** Reads and enables pagination through a set of `EnglishWord`. */
  englishWords?: Maybe<EnglishWordsConnection>;
  /** Reads and enables pagination through a set of `GermanWouldYouRatherQuestion`. */
  germanWouldYouRatherQuestions?: Maybe<GermanWouldYouRatherQuestionsConnection>;
  /** Reads and enables pagination through a set of `EnglishWouldYouRatherQuestion`. */
  englishWouldYouRatherQuestions?: Maybe<EnglishWouldYouRatherQuestionsConnection>;
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
  chineseRandomQuestion?: Maybe<ChineseRandomQuestion>;
  chineseRandomQuestionByUuid?: Maybe<ChineseRandomQuestion>;
  userDevice?: Maybe<UserDevice>;
  userDeviceByUuid?: Maybe<UserDevice>;
  userDeviceByFcmToken?: Maybe<UserDevice>;
  userLanguage?: Maybe<UserLanguage>;
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
  germanWouldYouRatherQuestion?: Maybe<GermanWouldYouRatherQuestion>;
  germanWouldYouRatherQuestionByUuid?: Maybe<GermanWouldYouRatherQuestion>;
  englishWouldYouRatherQuestion?: Maybe<EnglishWouldYouRatherQuestion>;
  englishWouldYouRatherQuestionByUuid?: Maybe<EnglishWouldYouRatherQuestion>;
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
  /** Reads a single `ChineseRandomQuestion` using its globally unique `ID`. */
  chineseRandomQuestionByNodeId?: Maybe<ChineseRandomQuestion>;
  /** Reads a single `UserDevice` using its globally unique `ID`. */
  userDeviceByNodeId?: Maybe<UserDevice>;
  /** Reads a single `UserLanguage` using its globally unique `ID`. */
  userLanguageByNodeId?: Maybe<UserLanguage>;
  /** Reads a single `UserSession` using its globally unique `ID`. */
  userSessionByNodeId?: Maybe<UserSession>;
  /** Reads a single `User` using its globally unique `ID`. */
  userByNodeId?: Maybe<User>;
  /** Reads a single `GermanWord` using its globally unique `ID`. */
  germanWordByNodeId?: Maybe<GermanWord>;
  /** Reads a single `EnglishWord` using its globally unique `ID`. */
  englishWordByNodeId?: Maybe<EnglishWord>;
  /** Reads a single `GermanWouldYouRatherQuestion` using its globally unique `ID`. */
  germanWouldYouRatherQuestionByNodeId?: Maybe<GermanWouldYouRatherQuestion>;
  /** Reads a single `EnglishWouldYouRatherQuestion` using its globally unique `ID`. */
  englishWouldYouRatherQuestionByNodeId?: Maybe<EnglishWouldYouRatherQuestion>;
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
export type QueryChineseRandomQuestionByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserDeviceByNodeIdArgs = {
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


/** The root query type which gives access points into the data universe. */
export type QueryGermanWordByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEnglishWordByNodeIdArgs = {
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
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<UserFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<UserFilter>>;
  /** Negates the expression. */
  not?: Maybe<UserFilter>;
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


export type CurrentUserQuery = { __typename?: 'Query', currentUser?: Maybe<{ __typename?: 'User', bio: string, email: string, gender?: Maybe<string>, username?: Maybe<string>, uuid: any, avatarUrl?: Maybe<string>, userLanguages: { __typename?: 'UserLanguagesConnection', totalCount: number }, languageByLocale?: Maybe<{ __typename?: 'Language', alpha2: string }>, inviteTokens: { __typename?: 'InviteTokensConnection', nodes: Array<Maybe<{ __typename?: 'InviteToken', inviteToken: string }>> } }> };

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


export type CreatePostMutation = { __typename?: 'Mutation', createPost?: Maybe<{ __typename?: 'CreatePostPayload', clientMutationId?: Maybe<string>, post?: Maybe<{ __typename?: 'Post', body: string, createdAt: any, uuid: any, nodeId: string }> }> };

export type CreatePostLikeMutationVariables = Exact<{
  userId: Scalars['Int'];
  postId: Scalars['Int'];
}>;


export type CreatePostLikeMutation = { __typename?: 'Mutation', createPostLike?: Maybe<{ __typename?: 'CreatePostLikePayload', postLike?: Maybe<{ __typename?: 'PostLike', postId: number, userId: number, nodeId: string, createdAt: any }> }> };

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

export type UnsubscribeUserEmailNotificationsMutationVariables = Exact<{
  token: Scalars['String'];
  lastActiveAt: Scalars['Datetime'];
}>;


export type UnsubscribeUserEmailNotificationsMutation = { __typename?: 'Mutation', updateUserByEmailUnsubscribeToken?: Maybe<{ __typename?: 'UpdateUserPayload', clientMutationId?: Maybe<string>, user?: Maybe<{ __typename?: 'User', email: string, uuid: any, username?: Maybe<string> }> }> };

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

export type CurrentUserProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserProfileQuery = { __typename?: 'Query', currentUser?: Maybe<{ __typename?: 'User', bio: string, email: string, gender?: Maybe<string>, username?: Maybe<string>, avatarUrl?: Maybe<string>, uuid: any, displayName?: Maybe<string>, userLanguages: { __typename?: 'UserLanguagesConnection', totalCount: number, nodes: Array<Maybe<{ __typename?: 'UserLanguage', native: boolean, language?: Maybe<{ __typename?: 'Language', englishName: string }>, languageSkillLevel?: Maybe<{ __typename?: 'LanguageSkillLevel', name?: Maybe<string> }> }>> }, groupUsers: { __typename?: 'GroupUsersConnection', nodes: Array<Maybe<{ __typename?: 'GroupUser', nodeId: string, userType: UserType, joinedOn: any, group?: Maybe<{ __typename?: 'Group', uuid: any, groupName?: Maybe<string>, language?: Maybe<{ __typename?: 'Language', englishName: string }>, languageSkillLevel?: Maybe<{ __typename?: 'LanguageSkillLevel', name?: Maybe<string> }> }> }>> } }> };

export type UpdateUserAvatarUrlMutationVariables = Exact<{
  avatarUrl: Scalars['String'];
  id: Scalars['Int'];
}>;


export type UpdateUserAvatarUrlMutation = { __typename?: 'Mutation', updateUser?: Maybe<{ __typename?: 'UpdateUserPayload', user?: Maybe<{ __typename?: 'User', avatarUrl?: Maybe<string> }> }> };

export type UserHasCompletedProfileQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UserHasCompletedProfileQuery = { __typename?: 'Query', user?: Maybe<{ __typename?: 'User', username?: Maybe<string>, userLanguages: { __typename?: 'UserLanguagesConnection', totalCount: number } }> };

export type UserIdByEmailQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type UserIdByEmailQuery = { __typename?: 'Query', userByEmail?: Maybe<{ __typename?: 'User', id: number }> };

export type UserLanguageInfoQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UserLanguageInfoQuery = { __typename?: 'Query', user?: Maybe<{ __typename?: 'User', id: number, uuid: any, userLanguages: { __typename?: 'UserLanguagesConnection', nodes: Array<Maybe<{ __typename?: 'UserLanguage', nodeId: string, languageId: number, languageSkillLevelId?: Maybe<number>, native: boolean }>> } }> };

export type UserProfileQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type UserProfileQuery = { __typename?: 'Query', userByUsername?: Maybe<{ __typename?: 'User', bio: string, gender?: Maybe<string>, username?: Maybe<string>, avatarUrl?: Maybe<string>, uuid: any, displayName?: Maybe<string>, userLanguages: { __typename?: 'UserLanguagesConnection', totalCount: number, nodes: Array<Maybe<{ __typename?: 'UserLanguage', native: boolean, language?: Maybe<{ __typename?: 'Language', englishName: string }>, languageSkillLevel?: Maybe<{ __typename?: 'LanguageSkillLevel', name?: Maybe<string> }> }>> } }> };

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
export const UserUuidById = gql`
    query UserUuidById($id: Int!) {
  user(id: $id) {
    uuid
  }
}
    `;