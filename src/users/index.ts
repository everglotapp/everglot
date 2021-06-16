export const MIN_USERNAME_LENGTH = 4
export const MIN_PASSWORD_LENGTH = 8

export const MAX_LEARNING = 2
export const MAX_TEACHING = 2

export enum Gender {
    FEMALE = "f",
    MALE = "m",
    OTHER = "o",
}

export enum CefrLevel {
    A1 = "A1",
    A2 = "A2",
    B1 = "B1",
    B2 = "B2",
    C1 = "C1",
    C2 = "C2",
}

export enum AuthMethod {
    EMAIL = "email",
    GOOGLE = "google",
}

export enum ActiveStatus {
    ACTIVE = "online",
    IDLE = "idle",
    OFFLINE = "offline",
}

export const getActiveStatus = (lastActiveDate: Date): ActiveStatus => {
    const now = Date.now()
    const lastActive = lastActiveDate.getTime()
    const THREE_MINS = 3 * 60 * 1000
    const ONE_HOUR = 60 * 60 * 1000
    if (now - lastActive < THREE_MINS) {
        return ActiveStatus.ACTIVE
    } else if (now - lastActive < ONE_HOUR) {
        return ActiveStatus.IDLE
    }
    return ActiveStatus.OFFLINE
}
