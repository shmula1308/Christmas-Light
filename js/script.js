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






