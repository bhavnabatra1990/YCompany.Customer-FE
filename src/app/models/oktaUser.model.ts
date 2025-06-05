
export class OktaUser {
    firstName: string;
    lastName: string;
    email: string;
    login: string;
    userType: string;

    constructor(firstName: string, lastName: string, email: string, login: string, userType: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.login = login;
        this.userType = userType;
    }
}