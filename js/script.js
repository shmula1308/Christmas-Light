const play = document.querySelector(".on");
const stop = document.querySelector(".off");
const lights = document.getElementsByClassName("circle");
const speedBtn = document.querySelector(".speed");
const rowsBtn = document.querySelector(".row");
const intensityBtn = document.querySelector(".intensity");
const speedInput = document.querySelector(".input-speed");
const rowsInput = document.querySelector(".input-rows");
const lightBoard = document.querySelector(".light-board");
const colorChangeInput = document.getElementsByClassName("change-color");
const switcher = document.querySelector('.switcher-container');
const switchToggle = document.querySelector('.switcher');
const sizeSlider = document.querySelector('.size-input');
const rangeContainer = document.querySelector(".range-container");

let sizeValue = 10;
let selectedCircle;

let sizeDisplay = {
    display: false
}

let colorSelector = {
    active: true
}

lightBoard.addEventListener('click', selectLight)

function selectLight(ev){
    if(ev.target.className.includes('circle')) {
        Array.from(lights).forEach(light => light.style.border = 'none')
        selectedCircle = ev.target;
        ev.target.style.border = '1px solid white';
        ev.target.classList.add('change-size');
        ev.target.style.transform = `scale(${Number(sizeValue)})`;
    }
    
}

function changeSize() {
    selectedCircle.style.transform = `scale(${Number(sizeValue)})`;
}
 
sizeSlider.addEventListener('input', function(ev) {
     sizeValue = ev.target.value;
     changeSize();
})


switcher.addEventListener('click', function() {
    switchToggle.classList.toggle('change-switch');
    
    if(colorSelector.active === true) {
        colorSelector.active = false;
        Array.from(colorChangeInput).forEach(colorPicker => {
            colorPicker.style.display = 'none';
        })
    } else {
        // selectedCircle.style.border = 'none'
        colorSelector.active = true;
        Array.from(colorChangeInput).forEach(colorPicker => {
            colorPicker.style.display = 'inline-block';
            console.log(colorPicker)
        })
    }

     if(sizeDisplay.display === false) {
        sizeDisplay.display = true;
        rangeContainer.style.display ='block';
     }else {
        sizeDisplay.display = false;
        rangeContainer.style.display = 'none';
     }
     
})


play.addEventListener('click',on);
stop.addEventListener('click',off);
speedBtn.addEventListener('click', changeSpeed);
rowsBtn.addEventListener('click', changeRows);
Array.from(colorChangeInput).forEach(colorInput => {
    colorInput.addEventListener('input', changeColor)
})




function on() {
  Array.from(lights).forEach(light => {
      light.removeAttribute('style');
      light.style.animationPlayState = "running";
      light.style.backgroundColor = "none";
  })
}

function off() {
    Array.from(lights).forEach(light => {
        light.style.animation = 'none';
        light.style.backgroundColor = '#563260';
    })
}

function changeSpeed() {
    let speedValue = speedInput.value;
    if(speedValue > 5) {
        speedValue = 5;
    }
    Array.from(lights).forEach(light => {
        light.style.animationDuration = speedValue +'s';
    })
}

function changeRows() {
   let rowValue = rowsInput.value;
   let lightColorsRow = ['red','green','blue','yellow','red','green','blue','yellow'];
   let df = new DocumentFragment();
   for(let i = 0; i < rowsInput.value; i++) {
     lightColorsRow.forEach(color => {
        let div = document.createElement('div');
        div.className = "circle";
        div.className += " " + color;
        let colorInput = document.createElement('input');
        colorInput.setAttribute('type','color');
        colorInput.classList.add('change-color');
        div.append(colorInput)
        df.append(div);
     })
   }
   lightBoard.innerHTML = "";
   lightBoard.append(df);

   Array.from(colorChangeInput).forEach(colorInput => {
    colorInput.addEventListener('input', changeColor)
})

}


function changeColor(ev) {
    let color = ev.target.value;
    let light = ev.target.parentElement;
    light.style.backgroundColor = color;
    // light.style.boxShadow = `0 0 20px 5px ${color}`;
}






