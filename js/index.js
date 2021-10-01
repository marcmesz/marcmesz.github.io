const text = document.getElementById("text")
const blinkingCursor = document.getElementById("blinking-cursor")
const myString = ["honlapot készíteni. 💻","igényes munkát végezni. 😎","azért lazulni is. 🎷🍺🎸"]
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
  

function displayCharacters(){

    const kiir = setInterval(()=>{
      if(currentChar===myString[currentPhrase].length){
          clearInterval(kiir)
          setTimeout(deleteCharacters, 3000)
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
        if(currentPhrase<myString.length-1){
          currentPhrase++
        }
        else{
          currentPhrase=0
        }

        if(myColorNum<myColorBg.length-1)
        {
          myColorNum++
        }
        else{
          myColorNum=0
        }
        displayCharacters()

    }
  },20)

  document.body.classList.add(myColorBg[myColorNum])
  if(myColorNum===0){
    document.body.classList.remove("bgColor2","bgColor3")
  }
  
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
