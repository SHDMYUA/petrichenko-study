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







});