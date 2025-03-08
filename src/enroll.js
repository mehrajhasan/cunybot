import got from 'got';
import cheerio from 'cheerio';
import { config } from './config.js';
import { Notifier } from './notifier.js';

export class Enroller {
    constructor(client) {
        this.client = client;
    }

    async enroll() {
        const agreement = "https://sb.cunyfirst.cuny.edu/api/v2/agreement/getAgreement?term=3202510&vsbTriggerLocationCode=GET_SCHEDULE_CLICK&_=1732759453644";
        const enrolloptions = "https://sb.cunyfirst.cuny.edu/api/enroll-options?statea=T&keya=HTR01--1252_9902--&stateb=E&keyb=HTR01--1252_9902--&_=1732759453645";
        const agreement2 = "https://sb.cunyfirst.cuny.edu/api/v2/agreement/getAgreement?term=3202510&vsbTriggerLocationCode=DO_ACTIONS_CLICK&_=1732759453646";
        const enrollURL = "https://sb.cunyfirst.cuny.edu/api/perform-action?conditionalAddDrop=0&statea0=T&keya0=HTR01--1252_9902--&vaa0=8776&vab0=8776&stateb0=E&keyb0=HTR01--1252_9902--&option0_17041904=true&schoolTermId=3202510&cohort=undefined&_=1732759453647";
        const enrollmentState = "https://sb.cunyfirst.cuny.edu/api/getEnrollmentState?term=3202510&_=1732759453648";
    }
}