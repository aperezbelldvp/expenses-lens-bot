export class User {
    constructor(
        public telegramId: bigint,
        public isBot: boolean,
        public firstName: string,
        public lastName?: string | null,
        public username?: string | null,
        public languageCode?: string | null,
        public createdAt?: Date,
        public updatedAt?: Date,
        public lastActiveAt?: Date
    ) { }
}
