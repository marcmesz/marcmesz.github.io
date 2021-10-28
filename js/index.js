const text = document.getElementById("text")
const hero = document.getElementById("kezdolap")
const navbar = document.querySelector(".navbar")
const navLinks = document.querySelectorAll(".nav__link")
const sections = document.querySelectorAll("section")
const blinkingCursor = document.getElementById("blinking-cursor")
const myString = ["Új honlap? 💻😎","Modern webáruház? 👕","Minőségi portfólió? 📸"]
const myColorBg = ["bgColor1","bgColor2","bgColor3"]

let myColorNum = 1
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
    },50)
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
        myColorNum<myColorBg.length-1 ? myColorNum++ : myColorNum=0
        displayCharacters()
    }
  },20)

  hero.classList.add(myColorBg[myColorNum])
  myColorNum===0 && hero.classList.remove("bgColor2","bgColor3") 
  
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

window.onscroll = () => {
  window.scrollY > 400 ? navbar.classList.add('nav-active') : navbar.classList.remove('nav-active')

  let currentSection = ""
  sections.forEach((section) => {
  const sectionTop = section.offsetTop;
  if (scrollY >= sectionTop - 400) {
    currentSection=section.getAttribute("id")
    let currentClass = ""
    switch(currentSection){
      case "kezdolap":
            currentClass = "kezdolap"
            document.body.classList.remove("szolgaltatasok", "portfolio","kapcsolat")
            break
      case "szolgaltatasok":
            currentClass = "szolgaltatasok"
            document.body.classList.remove("kezdolap", "portfolio", "kapcsolat")
            break
      case "portfolio":
            currentClass = "portfolio"
            document.body.classList.remove("kezdolap", "szolgaltatasok", "kapcsolat")
            break
      case "kapcsolat":
            currentClass = "kapcsolat"
            document.body.classList.remove("kezdolap", "szolgaltatasok", "portfolio")
            break
    }
    document.body.classList.add(currentClass)
  }  
})
}


