import got from 'got';
import cheerio from 'cheerio';
import { config } from './config.js';
import { Notifier } from './notifier.js';

export class Enroller {
    constructor(client) {
        this.client = client;
    }
}