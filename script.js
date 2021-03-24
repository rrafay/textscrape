
const puppeteer = require('puppeteer')

async function scrapeUrl(url) {
  const browser = await puppeteer.launch({args: ['--no-sandbox']});
  const page = await browser.newPage()

  await page.goto(url)

  const[el] = await page.$x('//*[@id="right-section"]/div[3]/div/div/h3/span')
  const txt = await el.getProperty('textContent')
  const number = await txt.jsonValue()

  const [el2] = await page.$x('//*[@id="right-section"]/div[1]/h2/span[2]')
  const txt2 = await el2.getProperty('textContent')
  const amount = await txt2.jsonValue()

  await browser.close()
  return {number, amount}


}


(async ()=>{
const http = require('http')

const port = 3000;
const data = await scrapeUrl('https://app.mobilecause.com/vf/marywood')

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  
  res.write(JSON.stringify(data))
  
  res.end();

});


server.listen(port, () => {
  console.log(`Server running at ${port}/`);
});
})()
