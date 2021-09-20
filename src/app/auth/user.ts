export class User {
    constructor(
        public email: string,
        public id: string,
        public tokenExpirationDate: Date,
        private _token: string,
    ) {}

    get token() {
        if (this.tokenExpirationDate && new Date() < this.tokenExpirationDate) {
            return this._token;
        } else {
            return null;
        }
    }
}