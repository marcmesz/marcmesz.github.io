export function setPortfolioItems(lang) {
  fetch("../json/portfolioItems.json")
    .then((res) => res.json())
    .then((portfolioItems) => {
      const allItemsCount = portfolioItems?.length ?? 0
      const websiteCount =
        portfolioItems?.filter((p) => p?.hu?.category === "weboldal")?.length ??
        0
      const webshopCount = allItemsCount - websiteCount

      document.getElementById(
        "btn-osszes"
      ).innerHTML += `<span class="portfolio-count">(${allItemsCount})</span>`
      document.getElementById(
        "btn-weboldal"
      ).innerHTML += `<span class="portfolio-count">(${websiteCount})</span>`
      document.getElementById(
        "btn-webaruhaz"
      ).innerHTML += `<span class="portfolio-count">(${webshopCount})</span>`

      const wrapper = document.querySelector(".portfolio-wrap")
      let wrapperInnerHtml = ""
      for (let item of portfolioItems) {
        const isNew = isNewItem(item.date)
          ? `<div class="ribbon"><span>${
              lang === "hu" ? "ÚJ" : "NEW"
            }</span></div>`
          : ""
        if (!item.isHidden) {
          wrapperInnerHtml += `
          <div class="portfolio-item box-style ${item.hu.category.replaceAll(
            "á",
            "a"
          )}">
          
          <div class="portfolio-desc">
          <a href="${item.url}" target="_blank" rel="noopener"
          title="${item[lang].title}"> ${item.shortUrl} <span
          class="portfolio-item-description">${item[lang].category} · ${
            item[lang].desc
          }</span> </a>
          </div>
          
          
          <picture>
          <source width="900" height="600" loading="lazy" srcset="${item.src}"
          type="image/webp" class="lazyload">
          <img width="900" height="600" loading="lazy" srcset="${item.src}"
          type="image/webp" class="lazyload">
          </picture>
          ${isNew}
          </div>
        `
        }
      }
      wrapper.innerHTML = wrapperInnerHtml
    })
    .catch((e) => console.log(e))
}

function isNewItem(date) {
  if (!date) {
    return false
  }

  const itemDate = new Date(date)
  const currentDate = new Date()
  const twoWeeksPastNow = new Date().setDate(currentDate.getDate() - 14)

  if (itemDate <= currentDate && itemDate >= twoWeeksPastNow) {
    return true
  }

  return false
}
