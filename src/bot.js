import { Auth } from './auth.js';
import { ClassChecker } from './classChecker.js';
import { Enroller } from './enroller.js';

class Bot {
    constructor(email, username, password, classID) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.classID = classID;

        this.auth = new Auth(email, username, password);
        this.classChecker = new ClassChecker(this.auth.client, classID);
        this.enroller = new Enroller(this.auth.client);
    }

    async start() {
        console.log(`Starting bot for user: ${this.username}`);
        try {
            await this.auth.fetchCookies();

            await this.auth.login();

            const loggedIn = await this.auth.redirect();
            if (!loggedIn) {
                console.log(`Login failed for user: ${this.username}. Exiting...`);
                return;
            }

            await this.classChecker.checkClass();

            if (this.classChecker.found && this.classChecker.open) {
                await this.enroller.enroll(this.classID);
            } else {
                console.log(`Class ${this.classID} is not open or not found for user: ${this.username}`);
            }
        } catch (e) {
            console.log(`ERROR for user ${this.username}:`, e.message);
        }
    }
}

const users = [
    //users here
];

users.forEach((user) => {
    const bot = new Bot(user.email, user.username, user.password, user.classID);
    bot.start();
});