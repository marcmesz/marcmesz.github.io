const text = document.getElementById("text")
const navbar = document.querySelector(".navbar")
const navLinks = document.querySelectorAll(".nav__link")
const sections = document.querySelectorAll("section")
const blinkingCursor = document.getElementById("blinking-cursor")
const myString = ["Weboldal?","Webáruház?","Portfólió?"]

let currentPhrase = 0
let isBlinking = true
let currentChar = 0
let currentReverse = 0

const menuBtn = document.querySelector(".nav-toggle")

menuBtn.addEventListener("click",()=>{
  document.body.classList.toggle("nav-open")
})

navLinks.forEach(item=>item.addEventListener("click",()=>{
  document.body.classList.toggle("nav-open")
  navLinks.forEach(link=>link.classList.remove("current-link"))
  item.classList.add("current-link")
}))


function displayCharacters(){

  const kiir = setInterval(()=>{
    if(currentChar===myString[currentPhrase].length){
        clearInterval(kiir)
        setTimeout(deleteCharacters, 2000)
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

const cursorBlinking = setInterval(()=>{
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
  },450)

displayCharacters()



/* Navbar Add Background on scroll */
let currentSection = ""
window.onscroll = () => {
  window.scrollY > 200 ? navbar.classList.add('nav-active') : navbar.classList.remove('nav-active')

  sections.forEach((section) => {
  const sectionTop = section.offsetTop
  scrollY >= sectionTop - 500 ? currentSection=section.getAttribute("id") : null

})
  document.body.className=currentSection
}

