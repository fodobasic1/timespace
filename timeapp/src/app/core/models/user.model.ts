export class User {
    username: string;
    password: string;
    apiguid: string;

    constructor(_username: string, _pass: string, _apiguid: string) {
        this.username = _username;
        this.password = _pass;
        this.apiguid = _apiguid;
    }
}