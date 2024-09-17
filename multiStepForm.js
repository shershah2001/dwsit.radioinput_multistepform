
document.addEventListener('DOMContentLoaded',()=>{
    const form = document.querySelector('.form-wizard');
    const progress = document.querySelector(".progress");
    const stepsContainer = document.querySelector(".steps-container");
    const steps = document.querySelectorAll(".step");
    const stepIndicators = document.querySelectorAll(".progress-container li")
    const prevButton = document.querySelector(".prev-btn");
    const nextButton = document.querySelector(".next-btn");
    const submitButton = document.querySelector(".submit-btn");
    document.documentElement.style.setProperty("--steps",stepIndicators.length);
    const formIntro = document.querySelector(".form_intro");
    const completed = document.querySelector(".completed");
    const completedCss  = window.getComputedStyle(completed);
    const getCompletedCss = completedCss.getPropertyValue("display");
    console.log("getCompletedCss==>",getCompletedCss)
    let currentStep=0;
  const updateProgress = ()=>{
    // let width = currentStep/(steps.length-1);
    // console.log("width ===>",steps.length-1)
        // progress.style.transform = `scaleX(${width})`;
        stepsContainer.style.height = steps[currentStep].offsetHeight + "px";
        // stepIndicators.forEach((indicator,index)=>{
        //     indicator.classList.toggle('current',currentStep === index);
        //     indicator.classList.toggle('done',currentStep>index);
        // })
        
        steps.forEach((step,index)=>{
          //  console.log("first-name===>",currentStep)
            step.style.transform=`translateX(-${currentStep*100}%)`
            step.classList.toggle('current',currentStep === index);
        })
        updateButtons()
        
  }
  const updateButtons = ()=>{
    prevButton.hidden = currentStep===0;
    nextButton.hidden = currentStep>= steps.length-1;
    submitButton.hidden = !nextButton.hidden;
  }
  const isValidStep = ()=>{
    const fields=steps[currentStep].querySelectorAll('input,textarea');
    return [...fields].every(field=>field.reportValidity())
  }

//  event listeners

const inputs = form.querySelectorAll('input,textarea');
inputs.forEach(input=>input.addEventListener('focus',(e)=>{
    const focusedElement=e.target;
    // console.log("focusedElement===>",focusedElement)
    // get the step where the focused element belongs
    const focusedStep = [...steps].findIndex(step=>step.contains(focusedElement));
    // console.log("focusedStep===>",focusedStep)
    if(focusedStep !==-1 && focusedStep!==currentStep){
       if(!isValidStep()) return; 

        currentStep=focusedStep;
        updateProgress()
    }
    stepsContainer.scrollTop=0;
    stepsContainer.scrollLeft=0;
}))

form.addEventListener("submit", (e) => {
    e.preventDefault(); // prevent form submission

    // if (!form.checkValidity()) return;
    
    const formData = new FormData(form);
    // console.log("form ===>",formData)
    // send the data somewhere
    // console.log(Object.fromEntries(formData));

    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    // mimic a server request
    setTimeout(() => {
      form.querySelector(".completed").hidden = false;
    }, 3000);
    // heading hidding
   
    if(getCompletedCss){
      formIntro.style.display="none";
    }
  });


   prevButton.addEventListener('click',(e)=>{
    e.preventDefault();
     if(currentStep>0){
        currentStep--;
        updateProgress();
     }
   })
  
   nextButton.addEventListener('click',(e)=>{
    e.preventDefault();
     if(!isValidStep()) return ;
     if(currentStep<steps.length-1){
        currentStep++;
        updateProgress();
     }
   })
   updateProgress();
const clickHere = document.querySelectorAll(".click_here");
const inputField = document.querySelectorAll(".click_here + input,.click_here + select");
console.log("inputField===>",inputField)
// console.log("clickHere==>",clickHere)
let currentIndex = -1; // Start at -1 since no field is open initially.
clickHere.forEach((item, index) => {
  item.onclick = function (e) {
    const currentItem = e.currentTarget;
    const currentInput = currentItem.nextElementSibling;
    // const currentInput_height = inputField.offsetHeight+"px";
    const inputStyle = window.getComputedStyle(currentInput);
    
    const inputPaddingTop = inputStyle.getPropertyValue("padding-top");
    const inputPaddingBottom = inputStyle.getPropertyValue("padding-bottom");
    const totalInputPadding = parseInt(inputPaddingBottom);
    // console.log("inputPaddingCss==>", inputDisplay)
    // Show the current input field
    currentInput.classList.add("activeInput");
    if(currentInput.classList.contains("activeInput")){
      stepsContainer.style.height = steps[currentStep].offsetHeight + totalInputPadding + "px";
      
    }
    // Hide the previous input field if any is open
    if (currentIndex !== -1 && currentIndex !== index) {
      const previousInput = clickHere[currentIndex].nextElementSibling;
      previousInput.classList.remove("activeInput");
    }
    // Update the current index to track the open field
    currentIndex = index;
  };
});
})

