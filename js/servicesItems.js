export function setServicesItems(lang) {
  fetch("../json/servicesItems.json")
    .then((res) => res.json())
    .then((servicesItems) => {
      const wrapper = document.querySelector(".szolgaltatasok-box")
      let wrapperInnerHtml = ""
      for (let item of servicesItems) {
        wrapperInnerHtml += `
            <div class="szolgaltatasok-item box-style">
                <i class="fas ${item.icon}"></i>
                <h3 class="szolgaltatasok-item-title">${item[lang].title}</h3>
                <p class="szolgaltatasok-item-content">${item[lang].content}</p>
            </div>
            `
      }
      wrapper.innerHTML = wrapperInnerHtml
    })
    .catch((e) => console.log(e))
}
