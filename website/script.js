/* selectors variables */
const buttons = document.querySelector(".buttons");
const form = document.querySelector(".user-inputs ");
const zipCode = document.querySelector("#zip");
const feeling = document.querySelector("#feelings");
const holderEntry = document.querySelector(".holder-entry");
const date = document.querySelector("#date");
const weatherStatus = document.querySelector(".weather-status");
const content = document.querySelector("#content");
const generateButton = document.querySelector("#generate");
const resetButton = document.querySelector("#reset");
/* ---------------------------------------------------------------------------------------------- */

/*variables */
const reg = new RegExp(/^-?\d*\.?\d*$/);
const currentDate = new Date();
const API_KEY = "780993f173571daf4551224776f7ecce";
const errors = {
  E: "Please insert a value !",
  WF: "zipcode format : length = 5 / only numbers",
};
let zipCodeVal;
let feelingVal;
/* ---------------------------------------------------------------------------------------------- */

/* Helper Functions */
const validateInput = () => {
  if (zipCodeVal === "") return "E";
  else if (zipCodeVal.length === 5 && reg.test(zipCodeVal)) return;
  else return "WF";
};
const generateResetMode = (isDisabled, backGroundColor, opacity) => {
  generateButton.disabled = isDisabled;
  zipCode.disabled = isDisabled;
  feeling.disabled = isDisabled;
  resetButton.disabled = !isDisabled;
  feeling.style.backgroundColor = backGroundColor;
  zipCode.style.backgroundColor = backGroundColor;
  zipCode.style.opacity = opacity;
  feeling.style.opacity = opacity;
};
let generate = () => {
  zipCodeVal = zipCode.value;
  feelingVal = feeling.value;
  feeling.value = "";
  zipCode.value = "";
  let message = validateInput();

  if (message) {
    zipCode.placeholder = errors[message];
  } else {
    generateResetMode(true, "lightgrey", "50%");
    zipCode.placeholder = "";
    getDataFromApi(zipCodeVal);
  }
};
let reset = () => {
  generateResetMode(false, "white", "100%");
  removeDataFromUi();
};

let updateUi = (data) => {
  weatherStatus.children[0].innerHTML = `${data.country} / ${data.name}`;
  weatherStatus.children[1].innerHTML = `${Math.round(data.temp)}&degC`;
  weatherStatus.children[2].innerHTML = `${data.description}`;
  weatherStatus.children[3].src = ` http://openweathermap.org/img/wn/${data.icon}@2x.png`;
  content.innerHTML = feelingVal;
  date.innerHTML = `${currentDate.toDateString()}`;

  holderEntry.classList.add("visible");
};
let removeDataFromUi = () => {
  weatherStatus.children[0].innerHTML = ``;
  weatherStatus.children[1].innerHTML = ``;
  weatherStatus.children[2].innerHTML = ``;
  weatherStatus.children[3].src = ` `;
  content.innerHTML = ``;
  date.innerHTML = ``;
  holderEntry.classList.remove("visible");
};

/* ---------------------------------------------------------------------------------------------- */

/* Event Listeners */
buttons.addEventListener("click", (e) => {
  if (e.target.id === "generate") {
    generate();
  } else if (e.target.id === "reset") {
    reset();
  }
});

/* ---------------------------------------------------------------------------------------------- */

/* Server Functions */
let getDataFromApi = async (zipcode) => {
  try {
    let res =
      await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&appid=${API_KEY}&units=metric
        `);
    let newData = await res.json();

    if (newData.cod == 200) {
      zipcode.placeholder = "";
      const {
        main: { temp },
        weather: [{ main, description, icon }],
        sys: { country },
        name,
      } = newData;
      const details = { temp, main, description, icon, country, name };
      insertDataToServer(details);
    } else if (newData.cod == 404) {
      reset();
      throw new Error(newData.message.toUpperCase() + " !");
    }
  } catch (e) {
    zipCode.value = "";
    zipCode.placeholder = e.message;
  }
};
let insertDataToServer = async (data) => {
  await fetch("insertdata", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  mostRecentEntry();
};

let mostRecentEntry = async () => {
  let res = await fetch("/getmostrecentdata");
  let newData = await res.json();
  updateUi(newData);
};

/* ---------------------------------------------------------------------------------------------- */
