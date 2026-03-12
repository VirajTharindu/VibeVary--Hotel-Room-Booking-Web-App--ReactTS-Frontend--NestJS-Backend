const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const OUT_DIR = path.join(__dirname, 'docs', 'screenshots');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

async function capture() {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });

    console.log('Navigating to http://localhost:5174/ ...');
    // Using admin=true to show the Add Suite button
    await page.goto('http://localhost:5174/?admin=true', { waitUntil: 'networkidle0', timeout: 60000 });
    
    // Helper to sleep
    const sleep = (ms) => new Promise(res => setTimeout(res, ms));

    // 1. Hero Section
    console.log('Capturing 1st - Hero Section...');
    await sleep(2000); // Wait for initial GSAP animations
    await page.screenshot({ path: path.join(OUT_DIR, '01_Hero_Section.png') });

    // 2. Experiences Section
    console.log('Capturing 2nd - Experiences Section...');
    await page.evaluate(() => document.getElementById('experiences').scrollIntoView());
    await sleep(1500); // Wait for scroll and intersection observers
    await page.screenshot({ path: path.join(OUT_DIR, '02_Experiences_Section.png') });

    // 3. Dining Section
    console.log('Capturing 3rd - Dining Section...');
    await page.evaluate(() => document.getElementById('dining').scrollIntoView());
    await sleep(1500);
    await page.screenshot({ path: path.join(OUT_DIR, '03_Dining_Section.png') });

    // 4. Wellness Section
    console.log('Capturing 4th - Wellness Section...');
    await page.evaluate(() => document.getElementById('wellness').scrollIntoView());
    await sleep(1500);
    await page.screenshot({ path: path.join(OUT_DIR, '04_Wellness_Section.png') });

    // 5. Suites Section
    console.log('Capturing 5th - Suites Section...');
    await page.evaluate(() => document.getElementById('suites').scrollIntoView());
    await sleep(1500);
    await page.screenshot({ path: path.join(OUT_DIR, '05_Suites_Section.png') });

    // Scroll to top for Modals / Navbar interaction
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(1000);

    // 6. Notification Center
    console.log('Capturing 6th - Notification Center...');
    // The Bell icon doesn't have an ID, we find the container by its location in the navbar
    await page.evaluate(() => {
        // Find the div containing the Bell lucide-react icon (has relative group cursor-pointer class)
        const buttons = Array.from(document.querySelectorAll('nav div'));
        buttons.find(el => el.innerHTML.includes('lucide-bell'))?.click();
    });
    await sleep(1000); // Spring reveal animation
    await page.screenshot({ path: path.join(OUT_DIR, '06_Notification_Center.png') });
    // Close Notification Center
    await page.evaluate(() => {
        const closeBtn = document.querySelector('.lucide-x').closest('button');
        if (closeBtn) closeBtn.click();
    });
    await sleep(1000);

    // 7. Concierge Board
    console.log('Capturing 7th - Concierge Board...');
    await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const btn = buttons.find(b => b.textContent && b.textContent.includes('Concierge'));
        if (btn) btn.click();
    });
    await sleep(1000);
    await page.screenshot({ path: path.join(OUT_DIR, '07_Concierge_Board.png') });
    // Close Modal
    await page.keyboard.press('Escape');
    await sleep(800);

    // 8. Chat Widget
    console.log('Capturing 8th - Chat Widget...');
    await page.evaluate(() => {
        const chatBtn = Array.from(document.querySelectorAll('.lucide-message-circle')).pop().closest('button');
        if (chatBtn) chatBtn.click();
    });
    await sleep(1000);
    await page.screenshot({ path: path.join(OUT_DIR, '08_Chat_Widget.png') });
    // Close Chat
    await page.evaluate(() => {
        const xBtn = Array.from(document.querySelectorAll('.lucide-x')).pop().closest('button');
        if (xBtn) xBtn.click();
    });
    await sleep(800);

    // 9. Add Suite Modal
    console.log('Capturing 9th - Add Suite Modal...');
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

    // 10. Booking Modal
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

    // 11. Footer
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
