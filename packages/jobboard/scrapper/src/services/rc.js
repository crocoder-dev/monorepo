const remoteWords = require("../remoteWords");

const getUrls = async (browser, url) => {
  const page = await browser.newPage();
  await page.goto(url);

  const selector = await page.evaluate(() => {
    const content = document.querySelector(".location");
    return {
      content: content ? content : null,
    };
  });

  if (selector.content === null) {
    return await page.evaluate((remoteWords) => {
      const companyName = document.querySelector('[property="og:site_name"]').getAttribute("content");
      const companyWebsite = document.querySelector(".company-link");
      const logoUrl = document.querySelector("img");
      const isRemote = [...document.querySelectorAll(".job-location")];
      const urls = [...document.querySelectorAll(".apply-now > .btn")]
        .map((url, i) => ({
          url: url.href,
          isRemote: isRemote[i].textContent,
        }))
        .filter((t) =>
          new RegExp(`${remoteWords.join("|")}`, "gi").test(t.isRemote)
        )
        .map((t) => t.url);

      return {
        urls,
        companyName: companyName ? companyName : null,
        logoUrl: logoUrl ? logoUrl.src : null,
        companyWebsite: companyWebsite
          ? companyWebsite.href
          : window.location.href,
      };
    }, remoteWords);
  } else {
    return await page.evaluate((remoteWords) => {
      const companyName = document.querySelector('[property="og:site_name"]').getAttribute("content");
      const companyWebsite = document.querySelector(".company-link");
      const logoUrl = document.querySelector("img");
      const isRemote = [...document.querySelectorAll(".location")];
      const urls = [...document.querySelectorAll(".jobs > a")]
        .map((url, i) => ({
          url: url.href,
          isRemote: isRemote[i].textContent,
        }))
        .filter((t) =>
          new RegExp(`${remoteWords.join("|")}`, "gi").test(t.isRemote)
        )
        .map((t) => t.url);

      return {
        urls,
        companyName: companyName ? companyName : null,
        logoUrl: logoUrl ? logoUrl.src : null,
        companyWebsite: companyWebsite
          ? companyWebsite.href
          : window.location.href,
      };
    }, remoteWords);
  }
};

const getJobs = async (browser, url) => {
  const page = await browser.newPage();
  await page.goto(url);
  return {
    ...(await page.evaluate(() => {
      const parent = document.querySelector(".row > .content");
      parent.removeChild(
        document.querySelector(".content > .title")
      );
      parent.removeChild(
        document.querySelector(".content > .apply")
      );
      const location1 = document.querySelector(".info > ul > li:last-child");

      return {
        title: document.querySelector(".info > h2").textContent.trim(),
        content: parent.innerHTML
          .replace(/\n|&nbsp;|<br>/g, "")
          .replace(/h3|h1/g, "h2")
          .replace(
            /<strong[a-zA-Z-=0-9":;\. ]*><span[a-zA-Z-=0-9":;\. ]*>([^<]+)<\/span><\/strong>/g,
            "<h2>$1</h2>"
          )
          .replace(
            /<(span|h2|p)[a-zA-Z-=0-9":;\. ]*><strong[a-zA-Z-=0-9":;\. ]*>([^<]+)<\/strong><\/(span|h2|p)>/g,
            "<h2>$2</h2>"
          )
          .replace(
            /<(h2|span|strong)[a-zA-Z-=0-9":;\. ]*><(span|a)[a-zA-Z-=0-9":;\. ]*>([^<]+)<\/(span|a)><\/(h2|span|strong)>/g,
            "<p>$3</p>"
          ),
        location: location1 ? location1.textContent.trim() : null,
      };
    })),
    url,
    applyUrl: `${url}/c/new`,
  };
};

module.exports = { getUrls, getJobs };