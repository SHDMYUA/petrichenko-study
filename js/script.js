document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tabheader__item"),
    tabContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items");

  function hideTabContent() {
    tabContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabContent[i].classList.add("show", "fade");
    tabContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener("click", (e) => {
    const target = e.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
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
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) {
    // добавляем нолики спереди
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
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

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setClock(".timer", deadline);

  //---------------MODAL WINDOW---------------------

  const modalTriggers = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal");

  // add features open modal window
  const modalTimerId = setTimeout(openModal, 50000);

  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerId);
  }

  modalTriggers.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  // close modal by click over modal window and ESC
  modal.addEventListener("click", (event) => {
    if (
      event.target === modal ||
      event.target.getAttribute("data-close") == ""
    ) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  // show modal when user scrolled to end of window
  function showModalByScroll() {
    const documentHeight = document.documentElement.scrollHeight;
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      documentHeight
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll);

  // Add Classes for cards
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAH();
    }
    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const elem = document.createElement("div");
      elem.innerHTML = `
      <div class="menu__item">
            <img src=${this.src} alt=${this.alt} />
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">
              ${this.descr}
            </div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
              <div class="menu__item-cost">Ціна:</div>
              <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
      </div>
      `;
      this.parent.append(elem);
    }
  }

  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фітнес"',
    'Меню "Фітнес" – це новий підхід до приготування страв: більше  свіжих овочів та фруктів. Продукт активних та здорових людей. Це абсолютно новий продукт з оптимальною ціною та високою якістю!',
    9,
    ".menu .container"
  ).render();

  new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    "Меню “Преміум",
    "У меню “Преміум” ми використовуємо не тільки гарний дизайн упаковки, а й якісне виконання страв. Червона риба, морепродукти, фрукти - ресторанне меню без походу до ресторану!",
    20,
    ".menu .container"
  ).render();

  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Пісне"',
    'Меню "Пісне" - це ретельний підбір інгредієнтів: повне відсутність  продуктів тваринного походження, молоко з мигдалю, вівса або кокоса, правильна кількість білків за рахунок тофу та вегетаріанських стейків.',
    25,
    ".menu .container"
  ).render();

  //Forms

  const forms = document.querySelectorAll("form");

  forms.forEach((item) => {
    bindPostData(item);
  });

  const message = {
    loading: "img/form/spinner.svg",
    succses: "We will call to you",
    failure: "Somting going wrong",
  };

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: data,
    });
    return await res.json();
  };

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
          display: block;
          margin: 0 auto;
        `;

      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form);

      const object = {};

      formData.forEach((key, value) => {
        object[key] = value;
      });

      postData("http://localhost:3000/requests", JSON.stringify(object))
        .then((data) => {
          console.log(data);
          showThanksModal(message.succses);
          // form.reset();
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
          // statusMessage.remove();
        })
        .finally(() => {
          form.reset();
        });

      // send to server JSON
      // request.send(json);

      //add listener to status response of form for output message for user
      //     request.addEventListener("load", () => {
      //       if (request.status === 200) {
      //         console.log(request.response);
      //         showThanksModal(message.succses);
      //         form.reset();
      //         statusMessage.remove();
      //       } else {
      //         showThanksModal(message.failure);
      //         statusMessage.remove();
      //       }
      //     });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");

    prevModalDialog.classList.add("hide");
    openModal();

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
        <div class ="modal__content">
            <div class = "modal__close" data-close>&times;</div>
            <div class = "modal__title">${message}</div>
        </div>
      `;
    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal();
    }, 4000);
  }

  //SLIDER

  const slides = document.querySelectorAll(".offer__slide"),
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next"),
    total = document.querySelector("#total"),
    current = document.querySelector("#current"),
    slideWrapper = document.querySelector(".offer__slider-wrapper"),
    slidesField = document.querySelector(".offer__slider-inner"),
    width = window.getComputedStyle(slideWrapper).width;

  let slideIndex = 1;

  // showSlides(slideIndex); //inicialisation of slider

  // //counter of slides
  // if (slides.length < 10) {
  //   total.textContent = `0${slides.length}`;
  // } else {
  //   total.textContent = slides.length;
  // }
  // //end

  // function showSlides(n) {
  //   if (n > slides.length) {
  //     slideIndex = 1;
  //   }
  //   if (n < 1) {
  //     slideIndex = slides.length;
  //   }

  //   slides.forEach((item) => (item.style.display = "none"));
  //   slides[slideIndex - 1].style.display = "block";

  //   //slide current counter
  //   if (slides.length < 10) {
  //     current.textContent = `0${slideIndex}`;
  //   } else {
  //     current.textContent = slideIndex;
  //   }
  // }

  // function plusSlides(n) {
  //   showSlides((slideIndex += n));
  // }

  // prev.addEventListener("click", () => {
  //   plusSlides(-1);
  // });

  // next.addEventListener("click", () => {
  //   plusSlides(1);
  // });

  // SLider CARUSEL
  // add to html new wrapper div class="offer__slider-inner"
  let offset = 0;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  slidesField.style.width = 100 * slides.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all";

  slideWrapper.style.overflow = "hidden";

  slides.forEach((slide) => {
    slide.style.width = width;
  });

  next.addEventListener("click", () => {
    if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    if (slideIndex < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  });

  prev.addEventListener("click", () => {
    if (offset == 0) {
      offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
      offset -= +width.slice(0, width.length - 2);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  });

  // END SCRIPT
});
