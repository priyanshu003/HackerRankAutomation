const puppeteer = require("puppeteer");
const loginLink = "https://www.hackerrank.com/auth/login";
const codeObj = require("./codes");
const email = "priyanshujain32000@gmail.com";
const password = "priyanshu@#$";

let browserOpenPromise = puppeteer.launch({
  headless: false,
  args: ["--start-maximized"],
  slowMo: true,
  defaultViewport: null,
});
let page;
browserOpenPromise
  .then(function (browserObj) {
    let browserOpenPage = browserObj.newPage();
    return browserOpenPage;
  })
  .then(function (nnewTab) {
    page = nnewTab;
    let hkOpenPromise = nnewTab.goto(loginLink);
    return hkOpenPromise;
  })
  .then(function () {
    let pageOpenElementWaitPromise = page.waitForSelector(
      "input[id='input-1']",
      { visible: true }
    );
    return pageOpenElementWaitPromise;
  })
  .then(function () {
    let emailIsEntered = page.type("input[id='input-1']", email, { delay: 50 });
    return emailIsEntered;
  })
  .then(function () {
    let passwordToType = page.type("input[type='password']", password, {
      delay: 50,
    });
    return passwordToType;
  })
  .then(function () {
    let loginButtonClicked = page.click(
      'button[data-analytics="LoginPassword"]',
      { delay: 50 }
    );
    return loginButtonClicked;
  })
  .then(function () {
    let clickOnAlgoPromise = waitAndClick(
      '.topic-card a[data-attr1="algorithms"]',
      page
    );
    return clickOnAlgoPromise;
  })
  .then(function () {
    let warmUpClick = waitAndClick('input[value="warmup"]', page);
    return warmUpClick;
  })
  .then(function () {
    let waitForSomeTime = page.waitFor(5000);
    return waitForSomeTime;
  })
  .then(function () {
    let allQuestionsPromise = page.$$(
      ".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled",
      { delay: 50 }
    );
    return allQuestionsPromise;
  })
  .then(function (arrayOfQuestions) {
    console.log(arrayOfQuestions.length);
    let questinWillBeSolved = questionSolver(
      page,
      arrayOfQuestions[0],
      codeObj.answers[0]
    );
    return questinWillBeSolved;
  });

function waitAndClick(selector, cPage) {
  return new Promise(function (resolve, reject) {
    let waitForModelPromise = cPage.waitForSelector(selector, {
      visible: true,
    });
    waitForModelPromise
      .then(function () {
        let clickModal = cPage.click(selector);
        return clickModal;
      })
      .then(function () {
        resolve();
      })
      .catch(function (err) {
        reject();
      });
  });
}

function questionSolver(page, question, answer) {
  return new Promise(function (resolve, reject) {
    let questionWillClick = question.click();
    questionWillClick
      .then(function () {
        let textAreaPromise = waitAndClick(
          ".monaco-editor.no-user-select.vs",
          page
        );
        return textAreaPromise;
      })
      .then(function () {
        return waitAndClick(".checkbox-input", page);
      })
      .then(function () {
        return waitAndClick("textarea.custominput", page);
      })
      .then(function () {
        return page.type("textarea.custominput", answer, { delay: 10 });
      })
      .then(function () {
        let ctrlPress = page.keyboard.down("Control");
        return ctrlPress;
      })
      .then(function () {
        let pressABtn = page.keyboard.press("A", { delay: 100 });
        return pressABtn;
      })
      .then(function () {
        let xIsPress = page.keyboard.press("X", { delay: 100 });
        return xIsPress;
      })
      .then(function () {
        let cntrIsUnpressed = page.keyboard.up("Control");
        return cntrIsUnpressed;
      })
      .then(function () {
        let backToEditor = waitAndClick(
          ".monaco-editor.no-user-select.vs",
          page
        );
        return backToEditor;
      })
      .then(function () {
        let ctrlPressAgainInEditor = page.keyboard.down("Control");
        return ctrlPressAgainInEditor;
      })
      .then(function () {
        let pressABtnAgain = page.keyboard.press("A", { delay: 100 });
        return pressABtnAgain;
      })
      .then(function () {
        let pressVBtn = page.keyboard.press("V", { delay: 100 });
        return pressVBtn;
      })
      .then(function () {
        let cntrIsUnpressedAgain = page.keyboard.up("Control");
        return cntrIsUnpressedAgain;
      })
      .then(function () {
        return page.click(".hr-monaco-submit", { delay: 100 });
      })
      .then(function () {
        return waitAndClick(".hr-monaco-submit", page);
      })
      .then(function () {
        resolve();
      })
      .catch(function (err) {
        console.log(err);
      });
  });
}
