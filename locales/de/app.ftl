# Everglot Web Application


## Global terms and phrases

-brand-name = Everglot
# Note: This is a placeholder for values that we need to
#       fill because svelte-fluent currently does not support
#       empty values.
-empty = _

## Chat page

chat-head = { -empty }
    .title = { -brand-name } – Sprachgemeinschaft
chat-panel-games = Spiele
chat-panel-subtitles = Untertitel
chat-submit-form-join-group = Gruppe beitreten
chat-sidebar-members = Mitglieder
chat-sidebar-members-join-group = Gruppe beitreten
chat-sidebar-members-nobody-prompt =
    <p data-l10n-name="nobody">Bisher ist niemand hier 😥</p>
    <p data-l10n-name="prompt">Nutze doch die Gelegenheit und tritt der Gruppe bei. Irgendjemand muss immer den ersten Schritt wagen!</p>
chat-sidebar-members-error = Infos zur Gruppe konnten nicht geladen werden
chat-sidebar-members-learners = Lernende
chat-sidebar-members-native = Muttersprachler
chat-sidebar-controls = Einstellungen
chat-sidebar-controls-display = 2-spaltig
chat-sidebar-controls-mic = Mikro
chat-sidebar-controls-audio = Ton
chat-sidebar-controls-toggle-on = An
chat-sidebar-controls-toggle-off = Aus
chat-sidebar-start-call = Anruf starten
chat-submit-form-send = Senden
chat-submit-form-connecting = Verbinde …
chat-submit-form-input = { -empty }
    .placeholder = Nachricht eingeben …
chat-message-username-unknown = unbekannt
chat-message-show-less = Weniger anzeigen
chat-message-show-more = Mehr anzeigen

## Main Navigation

main-nav-global = Global
main-nav-groups = Gruppen
main-nav-profile = Profil
main-nav-invite-friends = Freunde einladen
main-nav-logout = Abmelden

## Signup successful page

signup-success-head = { -empty }
    .title = Erfolgreich registriert – { -brand-name }
signup-success-title = Prima!
signup-success-msg =
    Du stehst jetzt auf der Warteliste.
    Sobald wir für dich eine Gruppe gefunden haben, schicken wir dir eine Mail.
    In der Zwischenzeit kannst du die Plattform schon mal erkunden.
signup-success-explore = Globale Kanäle erkunden

## Invite Modal

invite-modal-msg = Schicke diesen Link an deine Freunde, um sie zu { -brand-name } einzuladen!
invite-modal-close = Schließen
invite-modal-copy = Link kopieren
invite-modal-copy-success = Kopiert
invite-modal-copy-failed = Fehler beim Kopieren

## Login page

login-head = { -empty }
    .title = Einloggen – { -brand-name }
login-title = Bei { -brand-name } einloggen
login-form-email = E-Mail
login-form-password = Passwort
login-form-submit = Einloggen
login-form-signup = Ich habe keinen Account

## Join page

join-head = { -empty }
    .title = Registrieren – { -brand-name }
join-title = { -brand-name } beitreten
join-form-email = E-Mail
join-form-password = Passwort
join-form-submit = Registrieren
join-form-login = Ich habe schon einen Account

## Signup page

signup-head = { -empty }
    .title = Fast fertig – { -brand-name }
signup-title = Erzähl uns ein wenig von dir
signup-form-username-label = Wähle einen Nutzernamen*
signup-form-username-helper = Die anderen werden dich unter diesem Namen sehen.
signup-form-learning-label = Für welche Sprachen interessiert du dich (bis zu { $max })?*
signup-form-learning-helper = Bitte wähle nur Sprachen, die du wirklich lernen möchtest oder bereits lernst.
signup-form-difficult-msg =
    <p data-l10n-name="difficult">
    Everglot kann für Anfänger auf den Stufen A1 und A2 ganz schön anstrengend sein.
    </p>
    <p data-l10n-name="no-problem">
    Du kannst dennoch fortfahren. Bitte beachte, dass es für dich zu Beginn schwierig sein kann, den anderen zu folgen.
    </p>
signup-form-not-supported-msg =
    <p data-l10n-name="sorry">Entschuldige, aber { $learnCount ->
        [one] { $lang1 } wird
       *[other] { $lang1 } und { $lang2 } werden
    } noch nicht unterstützt.</p><p data-l10n-name="no-worries">Aber nicht verzagen, wir setzen dich auf die Warteliste für { $learnCount ->
        [one] eine { $lang1 }-Lerngruppe
       *[other] { $lang1 }- und { $lang2 }-Lerngruppen
    } und benachrichtigen dich sobald { $learnCount ->
        [one] es losgeht.
       *[other] sie starten.
    }</p>
signup-form-teaching-label = Mit welchen Sprachen könntest du andere unterstützen (bis zu { $max })?*
signup-form-teaching-helper = Dies sind deine Muttersprachen und jene, die du auf einem ähnlichen Niveau sprichst.
signup-form-gender-label = Welches Geschlecht hast du?
signup-form-gender-helper = Wir werden diese Info nur nutzen, um Gruppen-Zusammensetzungen zu optimieren.
signup-form-gender-female = Weiblich
signup-form-gender-male = Männlich
signup-form-gender-other = Divers
signup-form-submit = Weiter

## Footer component

footer-privacy = Datenschutz
footer-imprint = Impressum

## User Bio component

user-bio-languages-title = Sprachen
user-bio-error = Fehler

## Global page

global-head = { -empty }
    .title = Global – { -brand-name }
global-sidebar-language = Sprache
global-group-members-count =
    { $membersCount } { $membersCount ->
        [one] Mitglied
       *[other] Mitglieder
    }

## Profile page

profile-head = { -empty }
    .title = Mein Profil – { -brand-name }
profile-title = Mein Profil
profile-error = Profil konnte nicht geladen werden
profile-email = E-Mail
profile-change-password = Passwort ändern
profile-username = Nutzername
profile-gender = Geschlecht
profile-gender-male = Männlich
profile-gender-female = Weiblich
profile-gender-other = Divers
profile-gender-unknown = unbekannt
profile-languages = Meine Sprachen
profile-language-native-hint = (Muttersprache)
profile-groups = Meine Gruppen
## Locales
locale-en = Englisch
locale-de = Deutsch
locale-zh = Chinesisch
