# Everglot Web Application


## Global terms and phrases

-brand-name = Everglot

## Chat page

chat-browser-window-title = { -brand-name } – Language Community
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
chat-side-panel-menu-hangman = Play Hangman
chat-side-panel-menu-would-you-rather = Play Would You Rather
chat-side-panel-menu-random-question = Ask a Random Question
chat-side-panel-activity-hangman = Hangman
chat-side-panel-activity-would-you-rather = Would You Rather
chat-side-panel-activity-quit = Quit Game
chat-submit-form-send = Send
chat-submit-form-connecting = Connecting …
# Chat text message input field
chat-submit-form-input = {""}
    .placeholder = Enter text message …
chat-message-username-unknown = unknown
chat-message-show-less = Show less
chat-message-show-more = Show more
chat-message-username-bot = Ebo

## Main Navigation

main-nav-global = Global
main-nav-groups = Groups
main-nav-profile = Profile
main-nav-invite-friends = Invite Friends
main-nav-logout = Logout
main-nav-go-to-call = Go to Call

## Signup successful page

signup-success-browser-window-title = Success – { -brand-name }
signup-success-title = Success!
signup-success-msg =
    Stand by while we sort you into a study group. This may take awhile.  We will notify you by email once this process is complete.
    In the meantime, you can create and explore open discussion channels in the Global Channel.
signup-success-explore = Explore Global Channel

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
login-form-signup = I don't have an account
login-form-google = Login with Google

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
signup-form-learning-label = What language(s) are you interested in ({ $max } max)?*
signup-form-learning-helper = Please only choose languages that you really want to learn or are already learning.
signup-form-difficult-msg =
    <p data-l10n-name="difficult">
        Everglot can be quite difficult for
        beginners and elementary level
        learners.
    </p>
    <p data-l10n-name="no-problem">
        You can still continue. Please be
        aware that in the beginning it could
        be hard for you to follow along.
    </p>
signup-form-not-supported-msg =
    <p data-l10n-name="sorry">
        Sorry, { $learnCount ->
        [one] { $lang1 } is
       *[other] { $lang1 } and { $lang2 } are
    } not supported, yet.
    </p>
    <p data-l10n-name="no-worries">
        Don't worry, we will place you on a
        waiting list for { $learnCount ->
        [one] a { $lang1 } study group
       *[other] { $lang1 } and { $lang2 } study groups
    } and notify you as soon as { $learnCount ->
        [one] it's
       *[other] they're
    }
        ready.
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

## Footer component

footer-privacy = Privacy
footer-imprint = Imprint

## User Bio component

user-bio-languages-title = Languages
user-bio-error = Error

## Global page

global-browser-window-title = Global – { -brand-name }
global-sidebar-language = Language
global-group-members-count = { $membersCount } { $membersCount ->
    [one] member
    *[other] members
}
global-error = Error
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
profile-avatar-upload-failed = Your avatar could not be changed successfully. Please try again.
## Locales
locale-en = English
locale-de = German
locale-zh = Chinese
