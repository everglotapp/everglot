# Everglot Web Application


## Global terms and phrases

-brand-name = 爱语阁

## Chat page

chat-browser-window-title = { -brand-name } - 识遍天下字，读尽人间书。
chat-panel-games = 游戏
chat-panel-subtitles = 字幕
chat-submit-form-join-group = 加入小组
chat-sidebar-members = 组员
chat-sidebar-members-join-group = 加入小组
chat-sidebar-members-nobody-prompt =
    <p data-l10n-name="nobody">还没有人在这哦 😥</p>
    <p data-l10n-name="prompt">你何不先带头加入小组？成为第一个吃螃蟹的人吧！</p>
chat-sidebar-members-error = 加载小组信息失败
chat-sidebar-members-learners = 学生
chat-sidebar-members-native = 老师
chat-sidebar-controls = 控制面板
chat-sidebar-controls-display = 分屏
chat-sidebar-controls-mic = 麦克风
chat-sidebar-controls-audio = 音频
chat-sidebar-controls-toggle-on = 开
chat-sidebar-controls-toggle-off = 关
chat-sidebar-start-call = 加入语音
chat-sidebar-leave-call = 退出语音
chat-sidebar-switch-call-text = 你已经加入了一个小组的语音聊天，你想要切换到这个小组吗？
chat-sidebar-switch-call-cancel = 取消
chat-sidebar-switch-call-confirm = 切换
chat-side-panel-bubble = 和你的小伙伴们一起玩游戏吧！
chat-side-panel-menu-would-you-rather = 我宁愿
chat-side-panel-menu-random-question = 随机问题
chat-side-panel-menu-guess-character = 猜字谜
chat-side-panel-activity-hangman = 猜单词
chat-side-panel-activity-would-you-rather = 我宁愿
chat-side-panel-activity-random-question = 随机问题
chat-side-panel-activity-guess-character = 猜字谜
chat-side-panel-activity-quit = 结束游戏
chat-side-panel-activity-hangman-guess = 猜一猜
chat-side-panel-activity-hangman-enter = 确认
chat-side-panel-activity-hangman-solution-correct = 你猜对了：
chat-side-panel-activity-guess-character-guess = 我猜
chat-side-panel-activity-guess-character-enter = 确认
chat-side-panel-activity-guess-character-hint = 字谜：{ $hint }
chat-side-panel-activity-guess-character-solution-correct = 你猜对了！
chat-side-panel-activity-guess-character-solution-wrong = 答案是：{ $solution }
chat-side-panel-activity-guess-character-feedback-guess-correct = { $username } 猜对了：{ $guess }
chat-side-panel-activity-guess-character-feedback-guess-wrong = { $username } 猜 { $guess }， 可惜不对
chat-side-panel-activity-guess-character-feedback-own-guess-correct = { $guess }是正确的！
chat-side-panel-activity-guess-character-feedback-own-guess-wrong = { $guess }不对！
chat-side-panel-activity-guess-character-feedback-character-single-characters-only = 只猜单个汉字，你输入了{ $input }
chat-side-panel-activity-guess-character-feedback-character-already-picked = { $input }已经有人猜过了
chat-side-panel-activity-guess-character-feedback-character-not-available = { $badCharacter }不可用
chat-side-panel-activity-would-you-rather-picked-answer = 你选择了<strong class="text-gray-bitdark">{ $answer }</strong>！
chat-side-panel-activity-would-you-rather-timer =
    问题将在{ $seconds ->
       *[other] { $seconds }秒
    }后结束。
chat-submit-form-send = 发送
chat-submit-form-connecting = 连接中…
# Chat text message input field
chat-submit-form-input = { "" }
    .placeholder = 输入信息…
chat-message-username-unknown = 未知
chat-message-show-less = 收起
chat-message-show-more = 展开
chat-message-username-bot = 艾宝

## Main Navigation

main-nav-global = 公众频道
main-nav-groups = 小组
main-nav-profile = 个人面板
main-nav-invite-friends = 邀请朋友
main-nav-logout = 注销
main-nav-go-to-call = 回到语音组
main-nav-privacy = 隐私

## Signup successful page

signup-success-browser-window-title = 注册成功 - { -brand-name }
signup-success-title = 成功！
signup-success-msg = 我们正在为您安排合适的学习小组，请耐心等待。一旦安排妥当，我们将会通知您。与此同时，请您先探索我们的公众频道。
signup-success-explore = 探索公众频道

## Invite Modal

invite-modal-msg = 把这个链接发给你的朋友邀请他们加入{ -brand-name }吧！
invite-modal-close = 关闭
invite-modal-copy = 复制链接
invite-modal-copy-success = 复制成功
invite-modal-copy-failed = 复制失败

## Login page

login-browser-window-title = 登录 – { -brand-name }
login-title = 登录到{ -brand-name }
login-form-email = 邮箱
login-form-password = 密码
login-form-submit = 登录
login-form-signup = 我没有账号
login-form-google = 谷歌账号登录

## Join page

join-browser-window-title = 注册 – { -brand-name }
join-title = 注册{ -brand-name }
join-form-email = 邮箱
join-form-password = 密码
join-form-submit = 创建新账号
join-form-login = 我已经有账号了
join-form-google = 使用谷歌账号

## Signup page

signup-browser-window-title = 注册 – { -brand-name }
signup-title = 介绍一下你自己
signup-form-username-label = 选个用户名*
signup-form-username-helper = 您将会以此用户名示人。
signup-form-learning-label = 你对哪个语言感兴趣？（最多{ $max }个）?*
signup-form-learning-helper = 请选择你想学的或者已经在学的语言。
signup-form-difficult-msg =
    <p data-l10n-name="difficult">
    { -brand-name }并不适用于初学者。
    </p>
    <p data-l10n-name="no-problem">
    您可以继续注册，但开始可能会有点困难。
    </p>
signup-form-not-supported-msg =
    <p data-l10n-name="sorry">不好意思，{ $learnCount ->
       *[other] 我们还不支持{ $lang1 }{ $lang2 }
    }</p><p data-l10n-name="no-worries">不用担心，我们会将您及时通知您，当我们支持{ $learnCount ->
       *[other] { $lang1 }{ $lang2 }
    }的时候{ $learnCount ->
       *[other] 。
    }</p>
signup-form-teaching-label = 哪些语言你能帮助别人学习？(最多{ $max })?*
signup-form-teaching-helper = 这是你的母语或者你达到母语水平的外语。
signup-form-gender-label = 你的性别是？
signup-form-gender-helper = 我们使用此信息来优化小组的分配。
signup-form-gender-female = 女生
signup-form-gender-male = 男生
signup-form-gender-other = 其他
signup-form-submit = 下一步

## User Bio component

user-bio-languages-title = 语言
user-bio-error = 错误

## Global page

global-browser-window-title = 频道 - { -brand-name }
global-sidebar-language = 语言
global-main-channels = 频道
global-group-members-count =
    { $membersCount }{ $membersCount ->
       *[other] 成员
    }
global-error = 错误

## Profile page

profile-browser-window-title = 我的简介 - { -brand-name }
profile-title = 我的简介
profile-error = 加载失败
profile-email = 邮箱
profile-change-password = 更改密码
profile-username = 用户名
profile-gender = 性别
profile-gender-male = 男生
profile-gender-female = 女生
profile-gender-other = 其他
profile-gender-unknown = 不知道
profile-languages = 我的语言
profile-language-native-hint = （母语）
profile-groups = 我的小组
profile-avatar-upload-failed = 你的头像更换失败，请重新尝试。

## Locales

locale-en = 英语
locale-de = 德语
locale-zh = 中文
