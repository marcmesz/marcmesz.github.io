var text = document.getElementById("text")
var blinkingCursor = document.getElementById("blinking-cursor")
var myString = ["honlapot készíteni. 💻","igényes munkát végezni. 😎","azért lazulni is. 🎷🍺🎸"]
var myColorBg = ["bgColor1","bgColor2","bgColor3"]
var myColorNum = 1
var currentPhrase = 0
var isBlinking = true
var currentChar = 0
var currentReverse = 0

var menuBtn = document.querySelector(".nav-toggle")

menuBtn.addEventListener("click",()=>{
  document.body.classList.toggle("nav-open")
})
  

function displayCharacters(){

    var kiir = setInterval(()=>{
      if(currentChar===myString[currentPhrase].length){
          clearInterval(kiir)
          setTimeout(devareCharacters, 3000)
      }
      else{
          currentChar++
          text.innerHTML+=myString[currentPhrase].split("")[currentChar-1]
      }
    },50)
}

function devareCharacters(){
  var torol = setInterval(()=>{
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

var cursorBlinking = setInterval(()=>{
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
