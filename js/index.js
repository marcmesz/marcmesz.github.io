const text = document.getElementById("text")
const navbar = document.querySelector(".navbar")
const navLinks = document.querySelectorAll(".nav__link")
const sections = document.querySelectorAll("section")
const blinkingCursor = document.getElementById("blinking-cursor")
const langBtn = document.getElementById("language-selector")
const portfolioItemSpan = document.querySelectorAll(".portfolio-item-description")
const portfolioItem = document.querySelectorAll(".portfolio-item")
const menuBtn = document.querySelector(".nav-toggle")
let currentPhrase = 0
let isBlinking = true
let currentChar = 0
let currentReverse = 0
let lang = true
let setLang = ""
let setTitle = ""
let setImgTitle = ""

checkCookie()
displayCharacters()
liveBackGround()
displayHiddenPages()

const cursorBlinking = setInterval(setBlinker,450)

langBtn.addEventListener("click",()=>{
  lang = !lang
  setLanguage()
})

menuBtn.addEventListener("click",()=>{
  document.body.classList.toggle("nav-open")
})

Array.from(navLinks).forEach(item=>item.addEventListener("click",()=>{
  document.body.classList.toggle("nav-open")
  Array.from(navLinks).forEach(link=>link.classList.remove("current-link"))
  item.classList.add("current-link")
}))

Array.from(document.querySelectorAll(".adatvedelem-btn")).forEach(btn=>btn.addEventListener("click",(e)=>{
  e.preventDefault()
  document.body.classList.contains("impresszum-open") ? document.body.classList.remove("impresszum-open") : null
  document.body.classList.contains("cookie-kezeles-open") ? document.body.classList.remove("cookie-kezeles-open") : null
  document.body.classList.contains("aszf-open") ? document.body.classList.remove("aszf-open") : null
  document.body.classList.toggle("adatvedelem-open")
}))

document.querySelector(".impresszum-btn").addEventListener("click",(e)=>{
  e.preventDefault()
  document.body.classList.contains("adatvedelem-open") ? document.body.classList.remove("adatvedelem-open") : null
  document.body.classList.contains("cookie-kezeles-open") ? document.body.classList.remove("cookie-kezeles-open") : null
  document.body.classList.contains("aszf-open") ? document.body.classList.remove("aszf-open") : null
  document.body.classList.toggle("impresszum-open")
})

document.querySelector(".aszf-btn").addEventListener("click",(e)=>{
  e.preventDefault()
  document.body.classList.contains("adatvedelem-open") ? document.body.classList.remove("adatvedelem-open") : null
  document.body.classList.contains("cookie-kezeles-open") ? document.body.classList.remove("cookie-kezeles-open") : null
  document.body.classList.contains("impresszum-open") ? document.body.classList.remove("impresszum-open") : null
  document.body.classList.toggle("aszf-open")
})

Array.from(document.querySelectorAll(".cookie-kezeles-btn")).forEach(btn=>btn.addEventListener("click",(e)=>{
  e.preventDefault()
  cookieButtons()
}))



/* Hidden Pages Buttons */
Array.from(document.querySelectorAll(".btn-close")).forEach(btn=>btn.addEventListener("click",()=>{
  if(document.body.classList.contains("adatvedelem-open")){
    document.body.classList.remove("adatvedelem-open")
  }
  else if(document.body.classList.contains("impresszum-open")){
    document.body.classList.remove("impresszum-open")
  }
  else if(document.body.classList.contains("aszf-open")){
    document.body.classList.remove("aszf-open")
  }
  else{
    document.body.classList.remove("cookie-kezeles-open")
  }
}))


/* Portfolio Buttons */

const links = document.querySelectorAll(".portfolio-btn")
Array.from(links).forEach(link=>{
  link.addEventListener("click",()=>{
    Array.from(links).forEach(item=>item.classList.remove("btn-current"))
    const currentLink = link.getAttribute("id")
    document.getElementById(currentLink).classList.add("btn-current")

    if(currentLink==="btn-weboldal"){
      Array.from(document.querySelectorAll(".webaruhaz")).forEach(item=>{
        item.classList.add("portfolio-hidden")
      })
      Array.from(document.querySelectorAll(".weboldal")).forEach(item=>{
        item.classList.remove("portfolio-hidden")
      })
    }
    else if(currentLink==="btn-webaruhaz"){
      Array.from(document.querySelectorAll(".weboldal")).forEach(item=>{
        item.classList.add("portfolio-hidden")
      })
      Array.from(document.querySelectorAll(".webaruhaz")).forEach(item=>{
        item.classList.remove("portfolio-hidden")
      })
    }
    else{
      Array.from(document.querySelectorAll(".portfolio-item")).forEach(item=>{
        item.classList.remove("portfolio-hidden")
      })
    }
  })
})


/* Functions */

function setBlinker(){
  if(text.innerHTML.length===0 || text.innerHTML.length===myString[currentPhrase].length || !isBlinking){
    if(isBlinking){
      isBlinking=!isBlinking
      blinkingCursor.style.display="none"
    }
    else{
      isBlinking=!isBlinking
      blinkingCursor.style.display="inline"
    }
  }
}

function displayCharacters(){
  lang ? myString = ["Weboldal?","Web??ruh??z?","Portf??li???"] : myString = ["Website?","Webshop?","Portfolio?"]
  const kiir = setInterval(()=>{
    if(currentChar===myString[currentPhrase].length){
        clearInterval(kiir)
        setTimeout(deleteCharacters, 1500)
    }
    else{
        currentChar++
        text.innerHTML+=myString[currentPhrase].split("")[currentChar-1]
    }
  },70)
}

function deleteCharacters(){
  const torol = setInterval(()=>{
    if(currentReverse!==-myString[currentPhrase].length){
        currentReverse--    
        text.innerHTML=myString[currentPhrase].slice(0,currentReverse)
    }
    else{
        clearInterval(torol)
        currentChar = 0
        currentReverse = 0
        currentPhrase<myString.length-1 ? currentPhrase++ : currentPhrase=0
        displayCharacters()
    }
  },40)  
}

function liveBackGround(){
  let currentSection = ""
  window.onscroll = () => {
  window.scrollY > 200 ? navbar.classList.add('nav-active') : navbar.classList.remove('nav-active')

  Array.from(sections).forEach((section) => {
  const sectionTop = section.offsetTop
  if(scrollY >= sectionTop - 500){
    currentSection=section.getAttribute("id")
    Array.from(navLinks).forEach(link=>{
      link.classList.remove("current-link")
      currentSection===link.getAttribute("href").substring(1) ? link.classList.add("current-link") : null
    })
  }

  })
  document.body.className=currentSection
  }
}

function displayHiddenPages(){
  setTimeout(()=>{
    document.querySelector(".nav").style.display="block"
    document.querySelector("#adatvedelmi-iranyelvek").style.display="flex"
    document.querySelector("#cookie-kezeles").style.display="flex"
    document.querySelector("#aszf").style.display="flex"
    document.querySelector("#impresszum").style.display="flex"
  },500)
}

/* Sutikezelesi Tajekoztato */
function checkCookie(){
  if(!getCookie("_suti_Tajekoztato")){
    document.querySelector(".suti-btn").addEventListener("click",(e)=>{
      e.preventDefault()
      const d = new Date()
      document.cookie = "_suti_Tajekoztato=1;expires="+d.toUTCString(d.setTime(d.getTime()+730*24*60*60*1000))
      document.querySelector(".suti-tajekoztato").style.opacity=0
      setTimeout(()=>document.querySelector(".suti-tajekoztato").remove(),350)
    })
  }
  else{
    document.querySelector(".suti-tajekoztato").remove()
  }
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function cookieButtons(){
  document.body.classList.contains("impresszum-open") ? document.body.classList.remove("impresszum-open") : null
  document.body.classList.contains("adatvedelem-open") ? document.body.classList.remove("adatvedelem-open") : null
  document.body.classList.contains("aszf-open") ? document.body.classList.remove("aszf-open") : null
  document.body.classList.contains("impresszum-open") ? document.body.classList.remove("impresszum-open") : null
  document.body.classList.toggle("cookie-kezeles-open")
}

function setLanguage(){
  fetch("./js/content.json")
  .then(res => res.json())
  .then(data=>{
    lang ? setLang = "hu" : setLang = "en"
    lang ? setTitle = "Magyar" : setTitle = "English"
    lang ? setImgTitle = "Switch to English" : setImgTitle = "V??lt??s Magyar nyelvre"
    
    document.documentElement.setAttribute("lang",setLang)
    document.title="WebJazz ??? "+data.pageTitle[setLang]
    document.getElementById("language-icon").setAttribute("src","img/"+setLang+".png")
    document.getElementById("language-selector").setAttribute("title",setImgTitle)
    document.getElementById("language-selector-title").textContent=setTitle
    document.querySelector(".dynamic-slogan").textContent=data.slogan[setLang]
    document.getElementById("screen-text").textContent=data.servicesFooterText[setLang]
    document.getElementById("dynamic-btn").textContent=data.allButtonText[0][setLang]
    document.getElementById("btn-osszes").textContent=data.allButtonText[1][setLang]
    document.getElementById("btn-weboldal").textContent=data.allButtonText[2][setLang]
    document.getElementById("btn-webaruhaz").textContent=data.allButtonText[3][setLang]
    Array.from(document.querySelectorAll(".arlista-btn")).forEach(item=>item.textContent=data.allButtonText[4][setLang])

    for(let i = 0; i<data.sectionTitle.hu.length; i++){
      document.querySelectorAll(".nav__link")[i].textContent=data.sectionTitle[setLang][i]
    }
    for(let i = 0; i<data.sectionTitle.hu.length-1; i++){
      document.querySelectorAll(".section-title")[i].textContent=data.sectionTitle[setLang][i+1]
      document.querySelectorAll(".section-subtitle")[i].textContent=data.sectionSubTitle[setLang][i]
    }
    for(let i = 0; i<data.servicesItems.length; i++){
      document.querySelectorAll(".szolgaltatasok-item-title")[i].textContent=data.servicesItems[i].title[setLang]
      document.querySelectorAll(".szolgaltatasok-item-content")[i].textContent=data.servicesItems[i].content[setLang]
    }
    for(let i = 0; i<data.portfolioItems.length; i++){
      if(portfolioItem[i].classList.contains("weboldal")){
        portfolioItemSpan[i].textContent=data.website[setLang]+" ?? "+data.portfolioItems[i][setLang]
      }
      else if(portfolioItem[i].classList.contains("webaruhaz")){
        portfolioItemSpan[i].textContent=data.webshop[setLang]+" ?? "+data.portfolioItems[i][setLang]
      }
    }
    for(let i = 0; i<data.priceCategoriesTitle.length; i++){
      document.querySelectorAll(".arlista-main-title")[i].textContent=data.priceCategoriesTitle[i][setLang]
    }
    document.querySelectorAll(".arlista-sub-title")[0].textContent=data.website[setLang]
    document.querySelectorAll(".arlista-sub-title")[1].textContent=data.website[setLang]
    document.querySelectorAll(".arlista-sub-title")[2].textContent=data.webshop[setLang]
    document.querySelector(".nepszeru").textContent=data.bestSeller[setLang]

    for(let i = 0; i<data.introductiveWebsite.length; i++){
      document.querySelectorAll(".arlista-list-introduction")[i].textContent=data.introductiveWebsite[i][setLang]
    }
    for(let i = 0; i<data.premiumWebsite.length; i++){
      document.querySelectorAll(".arlista-list-premium")[i].textContent=data.premiumWebsite[i][setLang]
    }
    for(let i = 0; i<data.businessWebshop.length; i++){
      document.querySelectorAll(".arlista-list-business")[i].textContent=data.businessWebshop[i][setLang]
    }
    Array.from(document.querySelectorAll(".amount")).forEach(item=>!lang ? item.style.order=2 : null)
    Array.from(document.querySelectorAll(".tol")).forEach(item=>{
      if(!lang){
        item.style.order=1
        item.textContent="from"
      }
      else{
        item.style.order=3
        item.textContent="-t??l"
      }
    })
    Array.from(document.querySelectorAll(".ft")).forEach(item=>{
      if(!lang){
        item.style.order=3
        item.textContent="HUF"
      }
      else{
        item.textContent="Ft"
      }
    })

    document.querySelector(".arlista-feltuntetett-arak").textContent=data.priceListText1[setLang]
    document.querySelector(".arlista-egyedi-arajanlat").textContent=data.priceListText2[setLang]
    document.querySelector(".title-melyiket-valasszam").textContent=data.whichOneToChose[setLang]
    for(let i = 0; i<data.priceCategoriesTitle.length; i++){
      document.querySelectorAll(".arlista-info-maintitle")[i].textContent=data.priceCategoriesTitle[i][setLang]+" "
    }
    document.querySelectorAll(".arlista-info-subtitle")[0].textContent=data.website[setLang]
    document.querySelectorAll(".arlista-info-subtitle")[1].textContent=data.website[setLang]
    document.querySelectorAll(".arlista-info-subtitle")[2].textContent=data.webshop[setLang]
    for(let i = 0; i<data.whichOneDescription.length; i++){
      document.querySelectorAll(".arlista-info-pelda-szoveg")[i].textContent=data.whichOneDescription[i][setLang]
    }
    
    if(document.querySelector(".valasztott-kategoria").classList[1] === "btn-bemutatkozo-erdekel"){
      document.querySelector(".valasztott-kategoria").textContent=data.chosenPlan[setLang]+data.priceCategoriesTitle[0][setLang]+" "+data.website[setLang]
      document.querySelector(".valasztott-hidden").value=data.priceCategoriesTitle[0][setLang]+" "+data.website[setLang]
    }
    if(document.querySelector(".valasztott-kategoria").classList[1] === "btn-premium-erdekel"){
      document.querySelector(".valasztott-kategoria").textContent=data.chosenPlan[setLang]+data.priceCategoriesTitle[1][setLang]+" "+data.website[setLang]
      document.querySelector(".valasztott-hidden").value=data.priceCategoriesTitle[1][setLang]+" "+data.website[setLang]
    }
    if(document.querySelector(".valasztott-kategoria").classList[1] === "btn-webaruhaz-erdekel"){
      document.querySelector(".valasztott-kategoria").textContent=data.chosenPlan[setLang]+data.priceCategoriesTitle[2][setLang]+" "+data.webshop[setLang]
      document.querySelector(".valasztott-hidden").value=data.priceCategoriesTitle[2][setLang]+" "+data.webshop[setLang]
    }
    document.querySelector(".error-input").textContent=data.errorRequired[setLang]
    document.querySelector(".footer-copy-text-switch").textContent=data.footerCopyTextSpan[setLang]
    document.querySelector(".adatvedelem-btn").textContent=data.privacyPolicy[setLang]
    document.querySelector(".cookie-kezeles-btn").textContent=data.cookieConsent[setLang]
    document.querySelector(".aszf-btn").textContent=data.termsAndConditions[setLang]
    document.querySelector(".impresszum-btn").textContent=data.imprint[setLang]
  })
}




