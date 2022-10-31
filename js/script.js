document.addEventListener("DOMContentLoaded", ()=>{

  const tabs = document.querySelectorAll(".tabheader__item"),
      tabContent = document.querySelectorAll(".tabcontent"),
      tabsParent = document.querySelector(".tabheader__items");
  
  function hideTabContent() {
    tabContent.forEach(item=>{
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });

    tabs.forEach(item=>{
    item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i=0) {
    tabContent[i].classList.add('show', 'fade');
    tabContent[i].classList.remove('hide');
    tabs[i].classList.add("tabheader__item_active");
  } 

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (e)=>{
  const target = e.target;

  if (target && target.classList.contains('tabheader__item')){
    tabs.forEach((item, i)=>{
    if (target == item){
    hideTabContent();
    showTabContent(i);
      }
    });
  }
  });

  //--------------------------TIMER------------------------------------

const deadline = "2022-12-31";

function getTimeRemaning(endtime) {
  const t = Date.parse(endtime) - Date.parse(new Date()),
        days = Math.floor(t / (1000 * 60 * 60 * 24)),
        hours = Math.floor((t / (1000 * 60 * 60)) % 24),
        minutes = Math.floor((t / 1000 / 60) % 60),
        seconds = Math.floor((t / 1000) % 60);
  
        return {
            "total": t,
            "days": days,
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds,
        };
}

function getZero(num){ // добавляем нолики спереди
  if(num >= 0 && num < 10) {
    return `0${num}`;
  } else {
    return num;
  }
}

function setClock (selector, endtime) {
const timer = document.querySelector(selector),
      days = document.querySelector("#days"),
      hours = document.querySelector("#hours"),
      minutes = document.querySelector("#minutes"),
      seconds = document.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

      updateClock(); // убераем моргание верстки при обновлении страницы

function updateClock() {
  const t = getTimeRemaning(endtime);

  days.innerHTML = getZero(t.days);
  hours.innerHTML = getZero(t.hours);
  minutes.innerHTML = getZero(t.minutes);
  seconds.innerHTML = getZero(t.seconds);

  if (t.total<=0){
    clearInterval(timeInterval);
  }
}
}
setClock(".timer", deadline);

//---------------MODAL WINDOW---------------------

const modalTriggers = document.querySelectorAll('[data-modal]'),
      modal = document.querySelector('.modal'),
      closeModalBtn = document.querySelector('[data-modal-close]');

modalTriggers.forEach((btn) => {
  btn.addEventListener('click', () => {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = "hidden"; 
  });
});

function closeModal () {
  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = "";
}

closeModalBtn.addEventListener('click', closeModal);

// close modal by click over modal window and ESC
modal.addEventListener('click', (event) => {
if (event.target === modal) {
  closeModal();
}
});

document.addEventListener('keydown', (event) => {
  if (event.code === "Escape" && modal.classList.contains('show')) {
    closeModal();
  }

});

// END SCRIPT
});