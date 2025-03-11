import got from 'got';
import cheerio from 'cheerio';
import { config } from './config.js';
import { Notifier } from './notifier.js';
import { TargetType } from 'puppeteer';

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
        
        try{
            console.log('Starting enroll...');

            console.log('Attempting agreement1');
            await this.client.get(agreement, {
                method: "GET",
                headers: {
                    "x-forwarded-host": "sb.cunyfirst.cuny.edu",
                    "sec-ch-ua-platform": "macOS",
                    "x-forwarded-proto": "https",
                    "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
                    "sec-ch-ua-mobile": "?0",
                    "x-requested-with": "XMLHttpRequest",
                    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
                    "accept": "*/*",
                    "sec-fetch-site": "same-origin",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-dest": "empty",
                    "referer": "https://sb.cunyfirst.cuny.edu/criteria.jsp?access=0&lang=en&tip=2&page=results&scratch=0&advice=0&legend=1&term=3202510&sort=none&filters=iiiiiiiiii&bbs=&ds=&cams=HTR01iHTR01&locs=any&isrts=any&ses=any&pl=&pac=1&course_0_0=CSCI-39544&va_0_0=28ff&sa_0_0=&cs_0_0=HTR01--1252_7329--&cpn_0_0=&csn_0_0=&ca_0_0=&dropdown_0_0=kp_HTR01--1252_7329--&ig_0_0=0&rq_0_0=&bg_0_0=0&cr_0_0=&ss_0_0=0&sbc_0_0=0&course_1_0=CSCI-39540&va_1_0=14c6&sa_1_0=&cs_1_0=HTR01--1252_7362--&cpn_1_0=&csn_1_0=&ca_1_0=&dropdown_1_0=kp_HTR01--1252_7362--&ig_1_0=0&rq_1_0=&bg_1_0=0&cr_1_0=&ss_1_0=0&sbc_1_0=0&course_2_0=MATH-27500&va_2_0=5860&sa_2_0=&cs_2_0=HTR01--1252_7870--&cpn_2_0=&csn_2_0=&ca_2_0=&dropdown_2_0=kp_HTR01--1252_7870--&ig_2_0=0&rq_2_0=&bg_2_0=0&cr_2_0=&ss_2_0=0&sbc_2_0=0&course_3_0=CSCI-49900&va_3_0=4d28&sa_3_0=&cs_3_0=HTR01--1252_8227--&cpn_3_0=&csn_3_0=&ca_3_0=&dropdown_3_0=kp_HTR01--1252_8227--&ig_3_0=0&rq_3_0=&bg_3_0=0&cr_3_0=&ss_3_0=0&sbc_3_0=0&course_4_0=CSCI-13500&va_4_0=87a2&sa_4_0=&cs_4_0=HTR01--1252_10462-10467-&cpn_4_0=&csn_4_0=&ca_4_0=&dropdown_4_0=kp_HTR01--1252_10462-10467-&ig_4_0=0&rq_4_0=&bg_4_0=0&cr_4_0=&ss_4_0=0&sbc_4_0=0&course_5_0=CSCI-12100&va_5_0=7a5e&sa_5_0=&cs_5_0=HTR01--1252_9902--&cpn_5_0=&csn_5_0=&ca_5_0=&dropdown_5_0=us_HTR01--1252_9902--&ig_5_0=0&rq_5_0=&bg_5_0=0&cr_5_0=&ss_5_0=0&sbc_5_0=9902",
                    "accept-encoding": "gzip, deflate, br, zstd",
                    "accept-language": "en-US,en;q=0.9",
                }
            })

            console.log("attempting enroll options");
            await this.client.get(enrolloptions, {
                method: "GET",
                headers: {
                    "x-forwarded-host": "sb.cunyfirst.cuny.edu",
                    "sec-ch-ua-platform": "macOS",
                    "x-forwarded-proto": "https",
                    "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
                    "sec-ch-ua-mobile": "?0",
                    "x-requested-with": "XMLHttpRequest",
                    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
                    "accept": "*/*",
                    "sec-fetch-site": "same-origin",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-dest": "empty",
                    "referer": "https://sb.cunyfirst.cuny.edu/criteria.jsp?access=0&lang=en&tip=2&page=results&scratch=0&advice=0&legend=1&term=3202510&sort=none&filters=iiiiiiiiii&bbs=&ds=&cams=HTR01iHTR01&locs=any&isrts=any&ses=any&pl=&pac=1&course_0_0=CSCI-39544&va_0_0=28ff&sa_0_0=&cs_0_0=HTR01--1252_7329--&cpn_0_0=&csn_0_0=&ca_0_0=&dropdown_0_0=kp_HTR01--1252_7329--&ig_0_0=0&rq_0_0=&bg_0_0=0&cr_0_0=&ss_0_0=0&sbc_0_0=0&course_1_0=CSCI-39540&va_1_0=14c6&sa_1_0=&cs_1_0=HTR01--1252_7362--&cpn_1_0=&csn_1_0=&ca_1_0=&dropdown_1_0=kp_HTR01--1252_7362--&ig_1_0=0&rq_1_0=&bg_1_0=0&cr_1_0=&ss_1_0=0&sbc_1_0=0&course_2_0=MATH-27500&va_2_0=5860&sa_2_0=&cs_2_0=HTR01--1252_7870--&cpn_2_0=&csn_2_0=&ca_2_0=&dropdown_2_0=kp_HTR01--1252_7870--&ig_2_0=0&rq_2_0=&bg_2_0=0&cr_2_0=&ss_2_0=0&sbc_2_0=0&course_3_0=CSCI-49900&va_3_0=4d28&sa_3_0=&cs_3_0=HTR01--1252_8227--&cpn_3_0=&csn_3_0=&ca_3_0=&dropdown_3_0=kp_HTR01--1252_8227--&ig_3_0=0&rq_3_0=&bg_3_0=0&cr_3_0=&ss_3_0=0&sbc_3_0=0&course_4_0=CSCI-13500&va_4_0=87a2&sa_4_0=&cs_4_0=HTR01--1252_10462-10467-&cpn_4_0=&csn_4_0=&ca_4_0=&dropdown_4_0=kp_HTR01--1252_10462-10467-&ig_4_0=0&rq_4_0=&bg_4_0=0&cr_4_0=&ss_4_0=0&sbc_4_0=0&course_5_0=CSCI-12100&va_5_0=7a5e&sa_5_0=&cs_5_0=HTR01--1252_9902--&cpn_5_0=&csn_5_0=&ca_5_0=&dropdown_5_0=us_HTR01--1252_9902--&ig_5_0=0&rq_5_0=&bg_5_0=0&cr_5_0=&ss_5_0=0&sbc_5_0=9902",
                    "accept-encoding": "gzip, deflate, br, zstd",
                    "accept-language": "en-US,en;q=0.9",
                }
            })

            console.log('Attempting agreement2');
            await this.client.get(agreement2, {
                method: "GET",
                headers: {
                    "x-forwarded-host": "sb.cunyfirst.cuny.edu",
                    "sec-ch-ua-platform": "macOS",
                    "x-forwarded-proto": "https",
                    "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
                    "sec-ch-ua-mobile": "?0",
                    "x-requested-with": "XMLHttpRequest",
                    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
                    "accept": "*/*",
                    "sec-fetch-site": "same-origin",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-dest": "empty",
                    "referer": "https://sb.cunyfirst.cuny.edu/criteria.jsp?access=0&lang=en&tip=2&page=results&scratch=0&advice=0&legend=1&term=3202510&sort=none&filters=iiiiiiiiii&bbs=&ds=&cams=HTR01iHTR01&locs=any&isrts=any&ses=any&pl=&pac=1&course_0_0=CSCI-39544&va_0_0=28ff&sa_0_0=&cs_0_0=HTR01--1252_7329--&cpn_0_0=&csn_0_0=&ca_0_0=&dropdown_0_0=kp_HTR01--1252_7329--&ig_0_0=0&rq_0_0=&bg_0_0=0&cr_0_0=&ss_0_0=0&sbc_0_0=0&course_1_0=CSCI-39540&va_1_0=14c6&sa_1_0=&cs_1_0=HTR01--1252_7362--&cpn_1_0=&csn_1_0=&ca_1_0=&dropdown_1_0=kp_HTR01--1252_7362--&ig_1_0=0&rq_1_0=&bg_1_0=0&cr_1_0=&ss_1_0=0&sbc_1_0=0&course_2_0=MATH-27500&va_2_0=5860&sa_2_0=&cs_2_0=HTR01--1252_7870--&cpn_2_0=&csn_2_0=&ca_2_0=&dropdown_2_0=kp_HTR01--1252_7870--&ig_2_0=0&rq_2_0=&bg_2_0=0&cr_2_0=&ss_2_0=0&sbc_2_0=0&course_3_0=CSCI-49900&va_3_0=4d28&sa_3_0=&cs_3_0=HTR01--1252_8227--&cpn_3_0=&csn_3_0=&ca_3_0=&dropdown_3_0=kp_HTR01--1252_8227--&ig_3_0=0&rq_3_0=&bg_3_0=0&cr_3_0=&ss_3_0=0&sbc_3_0=0&course_4_0=CSCI-13500&va_4_0=87a2&sa_4_0=&cs_4_0=HTR01--1252_10462-10467-&cpn_4_0=&csn_4_0=&ca_4_0=&dropdown_4_0=kp_HTR01--1252_10462-10467-&ig_4_0=0&rq_4_0=&bg_4_0=0&cr_4_0=&ss_4_0=0&sbc_4_0=0&course_5_0=CSCI-12100&va_5_0=7a5e&sa_5_0=&cs_5_0=HTR01--1252_9902--&cpn_5_0=&csn_5_0=&ca_5_0=&dropdown_5_0=us_HTR01--1252_9902--&ig_5_0=0&rq_5_0=&bg_5_0=0&cr_5_0=&ss_5_0=0&sbc_5_0=9902",
                    "accept-encoding": "gzip, deflate, br, zstd",
                    "accept-language": "en-US,en;q=0.9",
                }
            })

            console.log('Attempting enroll');
            await this.client.get(enrollURL, {
                method: "GET",
                headers: {
                    'x-forwarded-host': 'sb.cunyfirst.cuny.edu',
                    'sec-ch-ua-platform': '"macOS"',
                    'x-forwarded-proto': 'https',
                    'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
                    'sec-ch-ua-mobile': '?0',
                    'x-forwarded-port': '',
                    'x-requested-with': 'XMLHttpRequest',
                    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
                    'accept': '*/*',
                    'sec-fetch-site': 'same-origin',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-dest': 'empty',
                    'referer': 'https://sb.cunyfirst.cuny.edu/criteria.jsp?access=0&lang=en&tip=2&page=results&scratch=0&advice=0&legend=1&term=3202510&sort=none&filters=iiiiiiiiii&bbs=&ds=&cams=HTR01iHTR01&locs=any&isrts=any&ses=any&pl=&pac=1&course_0_0=CSCI-39544&va_0_0=28ff&sa_0_0=&cs_0_0=HTR01--1252_7329--&cpn_0_0=&csn_0_0=&ca_0_0=&dropdown_0_0=kp_HTR01--1252_7329--&ig_0_0=0&rq_0_0=&bg_0_0=0&cr_0_0=&ss_0_0=0&sbc_0_0=0&course_1_0=CSCI-39540&va_1_0=14c6&sa_1_0=&cs_1_0=HTR01--1252_7362--&cpn_1_0=&csn_1_0=&ca_1_0=&dropdown_1_0=kp_HTR01--1252_7362--&ig_1_0=0&rq_1_0=&bg_1_0=0&cr_1_0=&ss_1_0=0&sbc_1_0=0&course_2_0=MATH-27500&va_2_0=5860&sa_2_0=&cs_2_0=HTR01--1252_7870--&cpn_2_0=&csn_2_0=&ca_2_0=&dropdown_2_0=kp_HTR01--1252_7870--&ig_2_0=0&rq_2_0=&bg_2_0=0&cr_2_0=&ss_2_0=0&sbc_2_0=0&course_3_0=CSCI-49900&va_3_0=4d28&sa_3_0=&cs_3_0=HTR01--1252_8227--&cpn_3_0=&csn_3_0=&ca_3_0=&dropdown_3_0=kp_HTR01--1252_8227--&ig_3_0=0&rq_3_0=&bg_3_0=0&cr_3_0=&ss_3_0=0&sbc_3_0=0&course_4_0=CSCI-13500&va_4_0=87a2&sa_4_0=&cs_4_0=HTR01--1252_10462-10467-&cpn_4_0=&csn_4_0=&ca_4_0=&dropdown_4_0=kp_HTR01--1252_10462-10467-&ig_4_0=0&rq_4_0=&bg_4_0=0&cr_4_0=&ss_4_0=0&sbc_4_0=0&course_5_0=CSCI-12100&va_5_0=7a5e&sa_5_0=&cs_5_0=HTR01--1252_9902--&cpn_5_0=&csn_5_0=&ca_5_0=&dropdown_5_0=us_HTR01--1252_9902--&ig_5_0=0&rq_5_0=&bg_5_0=0&cr_5_0=&ss_5_0=0&sbc_5_0=9902',
                    'accept-encoding': 'gzip, deflate, br, zstd',
                    'accept-language': 'en-US,en;q=0.9',
                }
            })  
            
            console.log("Attempting enrollment state")
                await this.client.get(enrollmentState, {
                method: "GET",
                headers: {
                    'x-forwarded-host': 'sb.cunyfirst.cuny.edu',
                    'sec-ch-ua-platform': '"macOS"',
                    'x-forwarded-proto': 'https',
                    'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
                    'sec-ch-ua-mobile': '?0',
                    'x-forwarded-port': '',
                    'x-requested-with': 'XMLHttpRequest',
                    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
                    'accept': 'application/json, text/javascript, */*; q=0.01',
                    'sec-fetch-site': 'same-origin',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-dest': 'empty',
                    'referer': 'https://sb.cunyfirst.cuny.edu/criteria.jsp?access=0&lang=en&tip=2&page=results&scratch=0&advice=0&legend=1&term=3202510&sort=none&filters=iiiiiiiiii&bbs=&ds=&cams=HTR01iHTR01&locs=any&isrts=any&ses=any&pl=&pac=1&course_0_0=CSCI-39544&va_0_0=28ff&sa_0_0=&cs_0_0=HTR01--1252_7329--&cpn_0_0=&csn_0_0=&ca_0_0=&dropdown_0_0=kp_HTR01--1252_7329--&ig_0_0=0&rq_0_0=&bg_0_0=0&cr_0_0=&ss_0_0=0&sbc_0_0=0&course_1_0=CSCI-39540&va_1_0=14c6&sa_1_0=&cs_1_0=HTR01--1252_7362--&cpn_1_0=&csn_1_0=&ca_1_0=&dropdown_1_0=kp_HTR01--1252_7362--&ig_1_0=0&rq_1_0=&bg_1_0=0&cr_1_0=&ss_1_0=0&sbc_1_0=0&course_2_0=MATH-27500&va_2_0=5860&sa_2_0=&cs_2_0=HTR01--1252_7870--&cpn_2_0=&csn_2_0=&ca_2_0=&dropdown_2_0=kp_HTR01--1252_7870--&ig_2_0=0&rq_2_0=&bg_2_0=0&cr_2_0=&ss_2_0=0&sbc_2_0=0&course_3_0=CSCI-49900&va_3_0=4d28&sa_3_0=&cs_3_0=HTR01--1252_8227--&cpn_3_0=&csn_3_0=&ca_3_0=&dropdown_3_0=kp_HTR01--1252_8227--&ig_3_0=0&rq_3_0=&bg_3_0=0&cr_3_0=&ss_3_0=0&sbc_3_0=0&course_4_0=CSCI-13500&va_4_0=87a2&sa_4_0=&cs_4_0=HTR01--1252_10462-10467-&cpn_4_0=&csn_4_0=&ca_4_0=&dropdown_4_0=kp_HTR01--1252_10462-10467-&ig_4_0=0&rq_4_0=&bg_4_0=0&cr_4_0=&ss_4_0=0&sbc_4_0=0&course_5_0=CSCI-12100&va_5_0=7a5e&sa_5_0=&cs_5_0=HTR01--1252_9902--&cpn_5_0=&csn_5_0=&ca_5_0=&dropdown_5_0=us_HTR01--1252_9902--&ig_5_0=0&rq_5_0=&bg_5_0=0&cr_5_0=&ss_5_0=0&sbc_5_0=9902',
                    'accept-encoding': 'gzip, deflate, br, zstd',
                    'accept-language': 'en-US,en;q=0.9',
                }
            })

            console.log("end of the flow");
            const $ = cheerio.load(response.body);
            const successMessage = $('.actionInfoMessage').text().trim();
            const failTitle = $('.actionFailTitle').text().trim();
            const failMessage = $('.actionFailMessage').text().trim();

            if (successMessage === "Success - This class is added to your schedule.") {
                console.log("Enrollment successful!");
                Notifier.sendSuccess(this.email, this.username, classID);
            } else if (failTitle === "Failed") {
                console.log("Enrollment failed.");
                Notifier.sendFailure(this.email, this.username, failMessage);
            }
        }
        catch(err){
            console.log("Error:", err.message);
        }
    }
}