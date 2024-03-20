import puppeteer from "puppeteer";
import { setTimeout } from "timers/promises";
import { whatIsAutomation,whyAutomation,jsFunction,config } from "./variable.mjs";

const browser = await puppeteer.launch({
  headless: false,
  defaultViewport: { width: 1900, height: 1200},
  slowMo: 20,
  // userDataDir: "temporary",
});
const variables = [whatIsAutomation,whyAutomation,jsFunction,config]

const page = await browser.newPage();

await page.goto(
  "https://tally.so/r/wk6BEd?fbclid=IwAR0cSefFLvcgViplBimGlOq_yoG5w8Enj9IMn7cD3R14YBvwW2--3THw7FQ",
  {
    waitUntil: "networkidle2",
    timeout: 60000,
  }
);
const firstButton = ".sc-49afcbc1-1"
const whatIsAutomationInput = 'div > .sc-2007db8-0'
const buttonSelector =  await page.waitForSelector(firstButton)
await buttonSelector.scrollIntoView()
// await setTimeout(1000)
await buttonSelector.click()
await setTimeout(500)
// await page.screenshot({ path: "automation1.png" });
// const firstInput = await  page.waitForSelector(whatIsAutomationInput)
// await firstInput.scrollIntoView()
// await setTimeout(1000)
// await firstInput.type(whatIsAutomation)
// await page.screenshot({ path: "automation1.png" });

const textAreas = await page.$$('textarea');

// Loop through each textarea element and type the corresponding value
for (let i = 0; i < textAreas.length && i < variables.length; i++) {
  await textAreas[i].scrollIntoView()
  await textAreas[i].type(variables[i]);
}

// Take a full-page screenshot
await page.screenshot({ path: 'fullpage_screenshot.png', fullPage: true });
// await page.screenshot({ path: "automation1.png" });

console.log(textAreas)
await browser.close();
