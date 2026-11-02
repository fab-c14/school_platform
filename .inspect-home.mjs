import { chromium } from "playwright-core";

const browser = await chromium.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
console.log(JSON.stringify(await page.evaluate(() => {
  const rect = (element) => {
    if (!element) return null;
    const box = element.getBoundingClientRect();
    return { x: box.x, y: box.y, width: box.width, height: box.height, right: box.right };
  };
  return {
    viewport: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
    header: rect(document.querySelector("header")),
    headerInner: rect(document.querySelector("header > div")),
    apply: rect(document.querySelector('header a[href="/apply"]')),
    menu: rect(document.querySelector("header button[aria-controls='mobile-nav']")),
    nav: rect(document.querySelector("header nav")),
    hero: rect(document.querySelector("main section")),
    heroText: rect(document.querySelector("main section h1")),
  };
}), null, 2));
await page.screenshot({ path: "C:\\Users\\plesi\\AppData\\Local\\Temp\\opencode\\welkin-home-mobile-pw.png" });
await browser.close();
