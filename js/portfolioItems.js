export function setPortfolioItems(lang) {
  fetch("../js/portfolioItems.json")
    .then((res) => res.json())
    .then((portfolioItems) => {
      const wrapper = document.querySelector(".portfolio-wrap")
      let wrapperInnerHtml = ""
      for (let item of portfolioItems) {
        if (!item.isHidden) {
          wrapperInnerHtml += `
          <div class="portfolio-item box-style ${item.hu.category.replaceAll(
            "á",
            "a"
          )}">
          <div class="portfolio-desc">
              <a href="${item.url}" target="_blank" rel="noopener"
                  title="${item[lang].title}"> ${item.shortUrl} <span
                      class="portfolio-item-description">${
                        item[lang].category
                      } · ${item[lang].desc}</span> </a>
          </div>
          <picture>
              <source width="900" height="600" loading="lazy" srcset="${
                item.src
              }"
                  type="image/webp" class="lazyload">
              <img width="900" height="600" loading="lazy" srcset="${item.src}"
                  type="image/webp" class="lazyload">
          </picture>
          </div>
        `
        }
      }
      wrapper.innerHTML = wrapperInnerHtml
    })
    .catch((e) => console.log(e))
}
