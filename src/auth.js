import { CookieJar } from 'tough-cookie';
import { HttpsProxyAgent } from 'https-proxy-agent';
import got from 'got';
import { config } from './config.js';

export class Auth {
    constructor() {
        this.cookieJar = new CookieJar();
        this.proxyAgent = new HttpsProxyAgent('http://127.0.0.1:8888');

        this.client = got.extend({
            cookieJar: this.cookieJar,
            agent: {
                https: this.proxyAgent,
            },
            https: {
                rejectUnauthorized: false,
            },
        });

        this.redirectURL = null;
    }

    async fetchCookies() {
        const url = "https://cssa.cunyfirst.cuny.edu/psc/cnycsprd/EMPLOYEE/SA/s/WEBLIB_VSB.TRANSFER_FUNCS.FieldFormula.IScript_RedirectVSBuilder?INSTITUTION=LAG01";
        const headers = {
            'Host': 'ssologin.cuny.edu',
            'Connection': 'keep-alive',
            'Cache-Control': 'max-age=0',
            'sec-ch-ua': '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'Origin': 'https://ssologin.cuny.edu',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'dnt': '1',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-User': '?1',
            'Sec-Fetch-Dest': 'document',
            'Referer': 'https://ssologin.cuny.edu/cuny.html',
            'Accept-Encoding': 'gzip, deflate, br, zstd',
            'Accept-Language': 'en-US,en;q=0.9',
        };

        try {
            console.log('Fetching cookies...');
            await this.client.get(url, { headers });
        } catch (e) {
            console.error('Error Message:', e.message);
        }
    }

    async login() {
        const loginURL = 'https://ssologin.cuny.edu/oam/server/auth_cred_submit';

        const headers = {
            'Host': 'ssologin.cuny.edu',
            'Connection': 'keep-alive',
            'Cache-Control': 'max-age=0',
            'sec-ch-ua': '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'Origin': 'https://ssologin.cuny.edu',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'dnt': '1',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-User': '?1',
            'Sec-Fetch-Dest': 'document',
            'Referer': 'https://ssologin.cuny.edu/cuny.html',
            'Accept-Encoding': 'gzip, deflate, br, zstd',
            'Accept-Language': 'en-US,en;q=0.9',
        };

        const payload = new URLSearchParams({
            usernameH: config.email,
            username: config.username,
            password: config.password,
            submit: '',
        }).toString();

        console.log('Attempting login...');
        try {
            let response = await this.client.post(loginURL, {
                headers,
                body: payload,
                followRedirect: false,
            });

            const redirectURL = response.headers['location'];
            const urlObject = new URL(redirectURL);
            this.redirectURL = urlObject.pathname + urlObject.search;
        } catch (e) {
            console.error('Error Message:', e.message);
        }
    }

    
}
