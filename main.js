const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Loop through pages 9 to 59
  for (let pageNum = 44; pageNum <= 57; pageNum++) {
    await page.goto(`https://epstopikvn.com/voca/download?lesson=${pageNum}`);

    // Click on the button with class "m-auto btn btn-main-y"
    await page.click(".m-auto.btn.btn-main-y");

    // Wait for 11 seconds for the popup
    await new Promise(resolve => setTimeout(resolve, 11000));

    // Click on the button with class "m-auto btn btn-main-y fs-3"
    await page.click(".m-auto.btn.btn-main-y.fs-3");

    await new Promise(resolve => setTimeout(resolve, 3000));

    await page.keyboard.press("Enter");
    // Trigger the print command
    // await page.evaluate(() => window.print());

    await new Promise(resolve => setTimeout(resolve, 3000));

    await page.keyboard.press("Enter");

    console.log("Downloaded page " + pageNum + " successfully!");
  }

  await browser.close();
})();

// <print-preview-button-strip>
//   <div class="controls">
//     <cr-button class="cancel-button" role="button" tabindex="0" aria-disabled="false">
//       Cancel
//     </cr-button>
//     <cr-button class="action-button" aria-disabled="false" tabindex="0" role="button">
//       Save
//     </cr-button>
//   </div>
// </print-preview-button-strip>;

// click to save button
