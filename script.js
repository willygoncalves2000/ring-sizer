let currentStep = 1;
let realCardHeight = 53.9; // mm

let pxPerMM = 0;

let ringRim = 13; // Tamanho do aro default 
let maxRingRim = 35;
let minRingRim = 10;

var rangeValue = 300;
var stepRangeValue = 10.0;
var maxRangeValue = 500;
var minRangeValue = 100;

function calculatePxPerMm() {
  // rangeValue é o tamanho da altura da div da imagem do cartão (em px)
  // realCardHeight é o tamanho da altura de um cartão real (em mm)
  // pxmm corresponde à relação px por mm. Cada px vai ter "pxmm" mm
  pxPerMM = rangeValue/realCardHeight;
  loadSizeRing(pxPerMM, ringRim);
  console.log("Px Per MM: "+ pxPerMM);
}

function getDiameter(rim) {
  var rimPerDiameter = {
    "10": 14.80,
    "11": 15.20,
    "12": 15.50,
    "13": 15.80,
    "14": 16.20,
    "15": 16.50,
    "16": 16.80,
    "17": 17.20,
    "18": 17.50,
    "19": 17.80,
    "20": 18.20,
    "21": 18.50,
    "22": 18.80,
    "23": 19.20,
    "24": 19.50,
    "25": 19.90,
    "26": 20.20,
    "27": 20.50,
    "28": 20.80,
    "29": 21.20,
    "30": 21.50,
    "31": 21.80,
    "32": 22.20,
    "33": 22.50,
    "34": 22.80,
    "35": 23.20,
  }
  return rimPerDiameter[rim];
}

function loadSizeRing(pxmm, rim) {
  var ring = document.getElementById("ring");
  var diameter = getDiameter(rim);
  console.log("RIM: " + ringRim)
  console.log("Tamanho anel: " + (diameter*pxmm));
  console.log("Tamanho anel round: " + Math.round(diameter*pxmm));
  ring.style.width = diameter*pxmm + "px";
  ring.style.height = diameter*pxmm + "px";

  var ringSizeSpan = document.getElementById("ring-size");
  ringSizeSpan.textContent = diameter + "mm"
  var ringRimSpan = document.getElementById("ring-rim");
  ringRimSpan.textContent = ringRim
}

function updateRangeValue() {
  var nextStepButton = document.getElementById("next-step-calibrated");
  nextStepButton.addEventListener("click", function (){
    resizeCard();
    calculatePxPerMm();
  })

  var rangeSlider = document.getElementById("range-control");
  rangeSlider.addEventListener("input", function() {
    rangeValue = rangeSlider.value;
    rangeValue = parseFloat(rangeValue);
    if (rangeValue <= minRangeValue) {
      rangeValue = minRangeValue;
    }
    if (rangeValue >= maxRangeValue) {
      rangeValue = maxRangeValue;
    }
    // Atualiza o campo value no HTML do input range 
    rangeSlider.setAttribute("value", rangeValue);
    // Move a thumb (circulo) pela linha do range
    rangeSlider.value = rangeValue
    console.log(rangeValue)
    resizeCard();
  });

  // ----- DIMINUI VALUE ----
  var lessValue = document.getElementById("less-value");
  lessValue.addEventListener("click", function() {
    rangeValue -= stepRangeValue;
    if (rangeValue < minRangeValue) {
      rangeValue = minRangeValue;
    }
    // Atualiza o campo value no HTML do input range 
    rangeSlider.setAttribute("value", rangeValue);
    // Move a thumb (circulo) pela linha do range
    rangeSlider.value = rangeValue
    // console.log(rangeValue)
    resizeCard();
  });
  
  // ----- AUMENTA VALUE ----
  var moreValue = document.getElementById("more-value");
  moreValue.addEventListener("click", function() {
    rangeValue +=  stepRangeValue;
    if (rangeValue > maxRangeValue) {
      rangeValue = maxRangeValue;
    }
    // Atualiza o campo value no HTML do input range 
    rangeSlider.setAttribute("value", rangeValue);
    // Move a thumb (circulo) pela linha do range
    rangeSlider.value = rangeValue
    // console.log(rangeValue)
    resizeCard();
  });
}

function decreaseSize() {
  ringRim--;
  if (ringRim < minRingRim) {
    ringRim = minRingRim;
  }
  loadSizeRing(pxPerMM, ringRim);
  var ringSizeSlider = document.getElementById("size-ring-control");
  // Atualiza o campo value no HTML do input range 
  ringSizeSlider.setAttribute("value", ringRim);
  // Move a thumb (circulo) pela linha do range
  ringSizeSlider.value = ringRim;
}

function increaseSize() {
  ringRim++;
  if (ringRim > maxRingRim) {
    ringRim = maxRingRim;
  }
  loadSizeRing(pxPerMM, ringRim);
  var ringSizeSlider = document.getElementById("size-ring-control");
  // Atualiza o campo value no HTML do input range 
  ringSizeSlider.setAttribute("value", ringRim);
  // Move a thumb (circulo) pela linha do range
  ringSizeSlider.value = ringRim;
}

function resizeCard() {

  var cardImage = document.getElementById("card-image");
  // console.log("Nova altura " + rangeValue)
  var oldHeight = cardImage.offsetHeight;
  var newHeight = rangeValue;
  // console.log("Old Top " + cardImage.offsetTop);

  // ----- Diminuiu de tamanho ------
  if (oldHeight > newHeight) {
    cardImage.style.top = cardImage.offsetTop + ((oldHeight - newHeight) / 2)  + "px"; 
    console.log("New Top " + cardImage.offsetTop);
    console.log("New Height " + newHeight);
    console.log("Old Height " + oldHeight);
  } 
  // ----- Aumentou de tamanho ------
  if (oldHeight < newHeight) {
    cardImage.style.top = cardImage.offsetTop - ((newHeight - oldHeight) / 2) + "px"; 
    console.log("New Top " + cardImage.offsetTop);
    console.log("New Height " + newHeight);
    console.log("Old Height " + oldHeight);
  }

  cardImage.style.height = newHeight + "px";
  cardImage.style.top = cardImage.offsetTop; 
}


function incrementRangeValue() {

}


function showStep(step) {
  document.querySelectorAll('.swiper-slide').forEach(function (elem){
    elem.classList.remove('visible');
  });
  if (currentStep != 0) {
    document.getElementById('step' + step).classList.toggle('visible');
  }
  if (currentStep == 2) {
    var cardImage = document.getElementById("card-image");
    cardImage.style.top = "30%";
    updateRangeValue();
  }
  if (currentStep == 3) {
    var ringSizeSlider = document.getElementById("size-ring-control");

    ringSizeSlider.addEventListener("input", function() {
      ringRim = ringSizeSlider.value;
      if (ringRim <= ringRim) {
        ringRim = ringRim;
      }
      if (ringRim >= maxRingRim) {
        ringRim = maxRingRim;
      }
      // Atualiza o campo value no HTML do input range 
      ringSizeSlider.setAttribute("value", ringRim);
      // Move a thumb (circulo) pela linha do range
      ringSizeSlider.value = ringRim
      loadSizeRing(pxPerMM, ringRim);
      console.log("RIM" + ringRim)
    });
  }
}

function nextStep() {
  if (currentStep < 3) {
    document.getElementById('step' + (currentStep)).classList.toggle('visible');
    currentStep++;
    showStep(currentStep);
  }
}

function prevStep() {
  if (currentStep > 1) {
    document.getElementById('step' + currentStep).classList.toggle('visible');
    currentStep--;
    showStep(currentStep)
  }
}

showStep(currentStep);


