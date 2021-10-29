# Everglot Web Application


## Global terms and phrases

-brand-name = Everglot
-post-game-type = { $type ->
       *[guess_case] Guess the Case
        [guess_gender] Guess the Gender
        [cloze] Fill in the Gaps
    }
user-follow = Follow
user-unfollow = Unfollow

## Feed page

index-browser-window-title = { -brand-name } – Learn Together.
index-shuffle-prompts-button-initial = Prompt Me
index-shuffle-prompts-button-prompt-shown = Shuffle Prompts
index-shuffle-prompts-button-initial-mobile = Prompt Me
index-shuffle-prompts-button-prompt-shown-mobile = Shuffle
index-prompt-instruction-word = Use this word in a sentence.
index-post-form-record-button = Record
index-post-form-post-button = Post
index-post-form-body-input-placeholder = Squeek your mind …
post-game-create-modal-title = Pick a game
post-game-create-modal-guess-case = { -post-game-type(type: "guess_case") }
post-game-create-modal-guess-gender = { -post-game-type(type: "guess_gender") }
post-game-create-modal-cloze = { -post-game-type(type: "cloze") }
post-game-guess-case-en-nominative = Subject
post-game-guess-case-en-genitive = Possessive
post-game-guess-case-en-dative = Ind. Object
post-game-guess-case-en-accusative = Dir. Object
post-game-cloze-new-gap = Create Gap
post-game-cancel = Cancel
post-game-selection-remove = Remove
post-game-selection-cancel = Cancel
post-prompt-note-word = Make a sentence with "{ $word }".
post-game-note-game-action = { $gameType ->
       *[GUESS_CASE] guess the case
        [GUESS_GENDER] guess the gender
        [CLOZE] fill in the gaps
    }
post-game-note-own = You have challenged the others to { post-game-note-game-action }.
post-game-note-other = { $username } is challenging you to { post-game-note-game-action }!
post-corrections-note = Select parts of the squeek to correct it. (Press and hold)
post-correction-selection-cancel = Close

## Chat page

chat-browser-window-title = { -brand-name } – Learn Together.
chat-panel-games = Games
chat-panel-subtitles = Subtitles
chat-submit-form-join-group = Join Group
chat-sidebar-members = Members
chat-sidebar-members-join-group = Join Group
chat-sidebar-members-nobody-prompt =
    <p data-l10n-name="nobody">Nobody is here yet 😥</p>
    <p data-l10n-name="prompt">Why don't you go ahead and join this group to get the ball rolling? Somebody has to go first!</p>
chat-sidebar-members-error = Failed to load group information
chat-sidebar-members-learners = Learners
chat-sidebar-members-native = Native Speakers
chat-sidebar-controls = Controls
chat-sidebar-controls-display = Display
chat-sidebar-controls-games = Games
chat-sidebar-controls-mic = Mic
chat-sidebar-controls-audio = Audio
chat-sidebar-controls-toggle-on = On
chat-sidebar-controls-toggle-off = Off
chat-sidebar-start-call = Join Call
chat-sidebar-leave-call = Leave Call
chat-sidebar-switch-call-text = You are already in a call, do you want to switch to this group?
chat-sidebar-switch-call-cancel = Cancel
chat-sidebar-switch-call-confirm = Switch
chat-side-panel-bubble = Welcome to the game center. Select a game to play with your study group.
chat-side-panel-bubble-no-activity-available = Sorry, { -brand-name } does not support games for { $language }, yet.
chat-side-panel-menu-hangman = Play Hangman
chat-side-panel-menu-would-you-rather = Play Would You Rather
chat-side-panel-menu-random-question = Ask a Random Question
chat-side-panel-menu-guess-character = Play Guess the Character
chat-side-panel-activity-hangman = Hangman
chat-side-panel-activity-would-you-rather = Would You Rather
chat-side-panel-activity-random-question = Random Question
chat-side-panel-activity-guess-character = Guess the Character
chat-side-panel-activity-quit = End Game
chat-side-panel-activity-quit-text = You will be ending the game for everyone in the group, are you sure?
chat-side-panel-activity-quit-cancel = Cancel
chat-side-panel-activity-quit-confirm = Yes, I'm sure!
chat-side-panel-activity-hangman-guess = Make a guess
chat-side-panel-activity-hangman-enter = Enter
chat-side-panel-activity-hangman-solution-correct = You correctly guessed:
chat-side-panel-activity-hangman-solution-wrong = The word would have been:
chat-side-panel-activity-hangman-feedback-guess-correct = { $username } guessed { $guess } which is correct!
chat-side-panel-activity-hangman-feedback-guess-wrong = { $username } guessed { $guess } which is incorrect!
chat-side-panel-activity-hangman-feedback-own-guess-correct = { $guess } is correct, nice!
chat-side-panel-activity-hangman-feedback-own-guess-wrong = { $guess } is incorrect, careful!
chat-side-panel-activity-hangman-feedback-letter-already-picked = The letter { $input } has already been picked
chat-side-panel-activity-hangman-feedback-letter-not-available = The letter { $badLetter } is not available
chat-side-panel-activity-guess-character-guess = Make a guess
chat-side-panel-activity-guess-character-enter = Enter
chat-side-panel-activity-guess-character-hint = { $hint }
chat-side-panel-activity-guess-character-solution-correct = You correctly guessed: { $solution } ({ $hint })
chat-side-panel-activity-guess-character-solution-wrong = The word would have been: { $solution } ({ $hint })
chat-side-panel-activity-guess-character-feedback-guess-correct = { $username } guessed { $guess } which is correct!
chat-side-panel-activity-guess-character-feedback-guess-wrong = { $username } guessed { $guess } which is incorrect!
chat-side-panel-activity-guess-character-feedback-own-guess-correct = { $guess } is correct, nice!
chat-side-panel-activity-guess-character-feedback-own-guess-wrong = { $guess } is incorrect, careful!
chat-side-panel-activity-guess-character-feedback-character-single-characters-only = Only single characters are accepted, you wrote { $input }
chat-side-panel-activity-guess-character-feedback-character-already-picked = The character { $input } has already been picked
chat-side-panel-activity-guess-character-feedback-character-not-available = The character { $badCharacter } is not available
chat-side-panel-activity-would-you-rather-picked-answer = You picked <strong class="text-gray-bitdark">{ $answer }</strong>!
chat-side-panel-activity-would-you-rather-timer =
    The poll ends in { $seconds ->
        [one] { $seconds } second
       *[other] { $seconds } seconds
    }.
chat-side-panel-activity-would-you-rather-next-question = Ask another question
chat-side-panel-activity-random-question-next-question = Ask another question
chat-side-panel-activity-random-question-discuss = Discuss in your group.
chat-submit-form-send = Send
chat-submit-form-connecting = Connecting …
# Chat text message input field
chat-submit-form-input = { "" }
    .placeholder = Enter text message …
chat-activity-text-input = { "" }
    .placeholder = Enter your guess …
chat-submit-form-voice = Audio
chat-submit-form-voice-join-call = Join Call
chat-submit-form-voice-leave-call = Leave Call
chat-submit-form-voice-switch-call = Switch Call
chat-submit-form-voice-mute = Mute
chat-submit-form-voice-unmute = Unmute
chat-submit-form-chat = Chat
chat-message-username-unknown = unknown
chat-message-show-less = Show less
chat-message-show-more = Show more
chat-message-username-bot = Ebo

## Main Navigation

main-nav-feed = Squeeks
main-nav-global = Global
main-nav-groups = Groups
main-nav-profile = Profile
main-nav-invite-friends = Invite Friends
main-nav-logout = Logout
main-nav-go-to-call = Go to Call
main-nav-privacy = Privacy
main-nav-download-app-ios = iOS App
main-nav-download-app-android = Android App
main-nav-feedback = Give Feedback
main-nav-continue = Continue
main-nav-notifications = Activities

## Signup successful page

signup-success-browser-window-title = Success – { -brand-name }
signup-success-title = Success!
signup-success-msg = Thank you for being among the first to try out our prototype! Stand by while we sort you into a study group. This may take awhile.  We will notify you via app notifications or by email once this process is complete.
signup-success-explore = Explore Global Channel
signup-success-download-app-ios = Download { -brand-name } for iOS
signup-success-download-app-android = Download { -brand-name } for Android

## Invite Modal

invite-modal-msg = Send this link to your friends to invite them to join { -brand-name }!
invite-modal-close = Close
invite-modal-copy = Copy Link
invite-modal-copy-success = Copied
invite-modal-copy-failed = Failed to copy

## Login page

login-browser-window-title = Login – { -brand-name }
login-title = Login to { -brand-name }
login-form-email = Email
login-form-password = Password
login-form-submit = Login
login-form-signup = I don't have an account, yet
login-form-google = Login with Google
login-form-reset-password = I forgot my password

## Join page

join-browser-window-title = Join – { -brand-name }
join-title = Join { -brand-name }
join-form-email = Email
join-form-password = Password
join-form-submit = Create a new account
join-form-login = I already have an account
join-form-google = Use my Google account

## Signup page

signup-browser-window-title = Sign Up – { -brand-name }
signup-title = Tell us a little bit about yourself
signup-form-username-label = Pick a username*
signup-form-username-helper = The others will see you under this name.
signup-form-username-placeholder = Username …
signup-form-learning-label = What language(s) are you interested in ({ $max } max)?*
signup-form-learning-helper = Please only choose languages that you really want to learn or are already learning.
signup-form-learning-placeholder = Search language …
signup-form-teaching-placeholder = Search language …
signup-form-learning-levels-legend = Your level in …
signup-form-learning-levels-select-placeholder = Your level …
signup-form-learning-levels-select-empty = Please select …
signup-form-learning-levels-select-a1 = A1 – Beginner
signup-form-learning-levels-select-a2 = A2 – Elementary
signup-form-learning-levels-select-b1 = B1 – Intermediate
signup-form-learning-levels-select-b2 = B2 – Upper intermediate
signup-form-learning-levels-select-c1 = C1 – Advanced
signup-form-learning-levels-select-c2 = C2 – Proficient
signup-form-difficult-msg =
    <p data-l10n-name="difficult">{ -brand-name } can be quite difficult for beginners and elementary level learners.</p>
    <p data-l10n-name="no-problem">You can still continue. Please be aware that in the beginning it could be hard for you to follow along.</p>
signup-form-not-supported-msg =
    <p data-l10n-name="sorry">
        Note that { $learnCount ->
        [one] { $lang1 } is
       *[other] { $lang1 } and { $lang2 } are
    } not fully supported, yet. Some features are still under development.
    </p>
    <p data-l10n-name="no-worries">
        It may take a while, but we will still find you { $learnCount ->
        [one] a { $lang1 } study group
       *[other] { $lang1 } and { $lang2 } study groups
    } and notify you as soon as { $learnCount ->
        [one] it's
       *[other] they're
    } ready.
    </p>
signup-form-teaching-label = What language(s) could you help others out with ({ $max } max)?*
signup-form-teaching-helper =
    These are languages that you either speak natively or on a
    near-native level.
signup-form-gender-label = What gender do you identify as?
signup-form-gender-helper =
    We'll use this information only to optimize group
    compositions.
signup-form-gender-female = Female
signup-form-gender-male = Male
signup-form-gender-other = Other
signup-form-submit = Next
signup-form-error-loading-language-codes = Something went wrong.

## Reset Password page

users-password-reset-browser-window-title = Forgot Password – { -brand-name }
users-password-reset-form-title = I forgot my { -brand-name } password
users-password-reset-form-email = Email
users-password-reset-form-submit = Let me change my password
users-password-reset-form-login = No, I remember my password
users-password-reset-form-signup = I don't have an account, yet

## Reset Password Updating Password page

users-password-reset-token-browser-window-title = Change Password – { -brand-name }
users-password-reset-token-form-title = Change my { -brand-name } password
users-password-reset-token-form-password = New Password
users-password-reset-token-form-password-confirm = New Password (again)
users-password-reset-token-form-submit = Change my password
users-password-reset-token-form-login = No, I remember my password
users-password-reset-token-form-signup = I don't have an account, yet
users-password-reset-token-form-resend = Send me another email

## User Bio component

user-bio-languages-title = Languages
user-bio-error = Error

## Global page

global-browser-window-title = Global – { -brand-name }
global-sidebar-language = Language
global-main-channels = Channels
global-group-members-count =
    { $membersCount } { $membersCount ->
        [one] member
       *[other] members
    }
global-error = Error

## Global profile page

u-username-browser-window-title = { $username } - { -brand-name }

## Profile page

profile-browser-window-title = My Profile – { -brand-name }
profile-title = My Profile
profile-error = Failed to load profile
profile-email = Email
profile-change-password = Change my password
profile-username = Username
profile-gender = Gender
profile-gender-male = Male
profile-gender-female = Female
profile-gender-other = Other
profile-gender-unknown = Unknown
profile-languages = My Languages
profile-language-native-hint = (Native)
profile-groups = My Groups
profile-upload-avatar = Upload Avatar
profile-avatar-upload-failed = Your avatar could not be changed successfully. Please try again.
profile-avatar-max-size = Avatars must be smaller than { $maxSize } in size.

## Email notifications unsubscription successful
email-unsubscribe-success-headline = Success!
email-unsubscribe-success-description = You will no longer receive email notifications.

## Email notifications unsubscription unsuccessful
email-unsubscribe-failure-link-invalid = The link that got you here is no longer valid.
email-unsubscribe-failure-contact-us = Please contact us if you think this is a mistake.

## Locales

locale-en = English
locale-de = German
locale-zh = Chinese
locale-es = Spanish
locale-it = Italian
locale-fr = French
locale-ko = Korean
locale-ja = Japanese
locale-ru = Russian
locale-ar = Arabic
locale-pt = Portuguese
