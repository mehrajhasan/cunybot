import got from 'got';
import cheerio from 'cheerio';
import { config } from './config.js';

export class ClassChecker {
    constructor(client) {
        this.client = client;
        this.found = false;
        this.open = false;
    }

    //ned to change per sem
    async checkClass() {
        const duration = 120000;
        const begin = Date.now();
        const searchURL = 'https://globalsearch.cuny.edu/CFGlobalSearchTool/CFSearchToolController';

        const searchPayload = new URLSearchParams({
            selectedInstName: 'Hunter College |',
            inst_selection: 'HTR01',
            selectedTermName: '2025 Spring Term',
            term_value: '1252',
            next_btn: 'Next',
        }).toString();

        const coursePayload = new URLSearchParams({
            selectedSubjectName: 'Computer Science',
            subject_name: 'CMSC',
            selectedCCareerName: 'Undergraduate',
            courseCareer: 'UGRD',
            selectedCAttrName: '',
            courseAttr: '',
            selectedCAttrVName: '',
            courseAttValue: '',
            selectedReqDName: '',
            reqDesignation: '',
            open_class: '',
            selectedSessionName: 'Regular Academic Session',
            class_session: '1',
            selectedModeInsName: '',
            meetingStart: 'LT',
            selectedMeetingStartName: 'less than',
            meetingStartText: '',
            AndMeetingStartText: '',
            meetingEnd: 'LE',
            selectedMeetingEndName: 'less than or equal to',
            meetingEndText: '',
            AndMeetingEndText: '',
            daysOfWeek: 'I',
            selectedDaysOfWeekName: 'include only these days',
            instructor: 'B',
            selectedInstructorName: 'begins with',
            instructorName: '',
            search_btn_search: 'Search',
        }).toString();

        const headers = {
            'Host': 'globalsearch.cuny.edu',
            'Connection': 'keep-alive',
            'Cache-Control': 'max-age=0',
            'sec-ch-ua': '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS',
            'Origin': 'https://globalsearch.cuny.edu',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'dnt': '1',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-User': '?1',
            'Sec-Fetch-Dest': 'document',
            'Referer': 'https://globalsearch.cuny.edu/CFGlobalSearchTool/search.jsp',
            'Accept-Encoding': 'gzip, deflate, br, zstd',
            'Accept-Language': 'en-US,en;q=0.9',
        };

        try {
            console.log('Loading search page...');
            let response = await this.client.get('https://globalsearch.cuny.edu/CFGlobalSearchTool/search.jsp', { headers });

            console.log('Submitting search...');
            response = await this.client.post(searchURL, { headers, body: searchPayload });

            console.log('Submitting course search...');
            response = await this.client.post(searchURL, { headers, body: coursePayload });

            const $ = cheerio.load(response.body);
            const linkElem = $(`a:contains(${config.classID})`);
            const hrefLink = linkElem.attr('href');

            if (linkElem && hrefLink) {
                console.log(`${config.classID} FOUND`);
                this.found = true;

                response = await this.client.get(`https://globalsearch.cuny.edu/CFGlobalSearchTool/${hrefLink}`, { headers });
                const load = cheerio.load(response.body);
                const status = load('img[alt="Open"]').attr('title');

                while ((status != 'Open') && (Date.now() - begin < duration)) {
                    console.log(`Monitoring ${config.classID}`);
                }

                if (status === 'Open') {
                    this.open = true;
                    console.log(`${config.classID} OPEN`);
                }
            } else {
                console.log(`Class ${config.classID} NOT FOUND. Check ID`);
            }
        } catch (e) {
            console.log('ERROR:', e.message);
        }
    }
}