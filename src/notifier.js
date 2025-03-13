import fetch from 'node-fetch';
import { config } from './config.js';

import fetch from 'node-fetch';
import { config } from './config.js';

export class Notifier {
    static sendSuccess(email, username, classID) {
        const data = {
            embeds: [
                {
                    title: "Enroll Success",
                    color: 16758080,
                    fields: [
                        { name: "Email", value: email, inline: true },
                        { name: "Profile", value: username, inline: true },
                        { name: "Class", value: classID, inline: true },
                    ],
                    footer: {
                        text: "bot made by mehraj hasan",
                    },
                },
            ],
        };

        this._sendWebhook(data);
    }

    static sendFailure(email, username, errorMessage) {
        const data = {
            embeds: [
                {
                    title: "Enroll Failed",
                    color: 16711680,
                    fields: [
                        { name: "Email", value: email, inline: true },
                        { name: "Profile", value: username, inline: true },
                        { name: "Error", value: errorMessage, inline: true },
                    ],
                    footer: {
                        text: "bot made by mehraj hasan",
                    },
                },
            ],
        };

        this._sendWebhook(data);
    }

    static async _sendWebhook(data) {
        try {
            await fetch(config.webhook, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            console.log("Notification sent successfully.");
        } catch (e) {
            console.error("Failed to send notification:", e.message);
        }
    }
}