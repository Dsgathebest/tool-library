const puppeteer = require('puppeteer-extra')

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

// puppeteer usage as normal
puppeteer.launch({
    headless: false,
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    userDataDir :"C:/Users/Daniel/AppData/Local/Google/Chrome/User Data/Default"
    // args:["--proxy-server=http://..."]
    }).then(async browser => {
  console.log('Running tests..')
  const page = await browser.newPage()
  await page.goto('https://shop.mango.com/co/mujer/destacados/ver-todo_d96164384')
  await page.screenshot({ path: 'testresult.png', fullPage: true })
  await browser.close()
  console.log(`All done, check the screenshot. ✨`)
})