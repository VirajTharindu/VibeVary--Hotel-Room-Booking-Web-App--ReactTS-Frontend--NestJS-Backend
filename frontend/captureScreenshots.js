import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUT_DIR = path.join(__dirname, '..', 'docs', 'screenshots');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

async function capture() {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });

    console.log('Navigating to http://localhost:5174/ ...');
    await page.goto('http://localhost:5174/?admin=true', { waitUntil: 'networkidle0', timeout: 60000 });
    
    const sleep = (ms) => new Promise(res => setTimeout(res, ms));

    console.log('Capturing 1st - Hero Section...');
    await sleep(2000); 
    await page.screenshot({ path: path.join(OUT_DIR, '01_Hero_Section.png') });

    console.log('Capturing 2nd - Experiences Section...');
    await page.evaluate(() => document.getElementById('experiences').scrollIntoView());
    await sleep(1500); 
    await page.screenshot({ path: path.join(OUT_DIR, '02_Experiences_Section.png') });

    console.log('Capturing 3rd - Dining Section...');
    await page.evaluate(() => document.getElementById('dining').scrollIntoView());
    await sleep(1500);
    await page.screenshot({ path: path.join(OUT_DIR, '03_Dining_Section.png') });

    console.log('Capturing 4th - Wellness Section...');
    await page.evaluate(() => document.getElementById('wellness').scrollIntoView());
    await sleep(1500);
    await page.screenshot({ path: path.join(OUT_DIR, '04_Wellness_Section.png') });

    console.log('Capturing 5th - Suites Section...');
    await page.evaluate(() => document.getElementById('suites').scrollIntoView());
    await sleep(1500);
    await page.screenshot({ path: path.join(OUT_DIR, '05_Suites_Section.png') });

    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(1000);

    console.log('Capturing 6th - Notification Center...');
    await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('nav div'));
        buttons.find(el => el.innerHTML.includes('lucide-bell'))?.click();
    });
    await sleep(1000); 
    await page.screenshot({ path: path.join(OUT_DIR, '06_Notification_Center.png') });
    await page.evaluate(() => {
        const closeBtn = document.querySelector('.lucide-x').closest('button');
        if (closeBtn) closeBtn.click();
    });
    await sleep(1000);

    console.log('Capturing 7th - Concierge Board...');
    await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const btn = buttons.find(b => b.textContent && b.textContent.includes('Concierge'));
        if (btn) btn.click();
    });
    await sleep(1000);
    await page.screenshot({ path: path.join(OUT_DIR, '07_Concierge_Board.png') });
    await page.keyboard.press('Escape');
    await sleep(800);

    console.log('Capturing 8th - Chat Widget...');
    await page.evaluate(() => {
        const chatBtn = Array.from(document.querySelectorAll('.lucide-message-circle')).pop().closest('button');
        if (chatBtn) chatBtn.click();
    });
    await sleep(1000);
    await page.screenshot({ path: path.join(OUT_DIR, '08_Chat_Widget.png') });
    await page.evaluate(() => {
        const xBtn = Array.from(document.querySelectorAll('.lucide-x')).pop().closest('button');
        if (xBtn) xBtn.click();
    });
    await sleep(800);

    console.log('Capturing 9th - Add Suite Modal...');
    // Add Suite button works on Suites section because admin=true is in URL
    await page.evaluate(() => document.getElementById('suites').scrollIntoView());
    await sleep(1000);
    await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const addBtn = buttons.find(b => b.textContent && b.textContent.includes('Add Suite'));
        if (addBtn) addBtn.click();
    });
    await sleep(1000);
    await page.screenshot({ path: path.join(OUT_DIR, '09_Add_Suite_Modal.png') });
    await page.keyboard.press('Escape');
    await sleep(800);

    console.log('Capturing 10th - Booking Modal...');
    await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const resBtn = buttons.find(b => b.textContent && (b.textContent.includes('Reserve Suite') || b.textContent.includes('RESERVE')));
        if (resBtn && !resBtn.disabled) resBtn.click();
    });
    await sleep(1000);
    await page.screenshot({ path: path.join(OUT_DIR, '10_Booking_Modal.png') });
    await page.keyboard.press('Escape');
    await sleep(800);

    console.log('Capturing 11th - Footer Section...');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await sleep(1000);
    await page.screenshot({ path: path.join(OUT_DIR, '11_Footer_Section.png') });

    console.log('All screenshots captured successfully!');
    await browser.close();
}

capture().catch(err => {
    console.error('Error during capture:', err);
    process.exit(1);
});
