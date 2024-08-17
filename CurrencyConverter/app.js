const BASE_URL = "https://api.exchangerate-api.com/v4/latest";

const countriesList = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const amount = document.querySelector(".amount input");

let finalAmount = document.getElementById("finalAmount");

//dropdown options
for (let select of countriesList) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evnt) => {
    updateflag(evnt.target);
  });
}

const updateflag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

function displayResults(data) {
  let fromRate = data.rates[fromCurr.value];
  let toRate = data.rates[toCurr.value];
  let finalValue = finalAmount;
  finalValue.innerText = `${amount.value} ${fromCurr.value} = ${(
    (toRate / fromRate) *
    amount.value
  ).toFixed(2)} ${toCurr.value}`;
  finalAmount.style.display = "block";
}

btn.addEventListener("click", async (evnt) => {
  evnt.preventDefault();
  let amountVal = amount.value;
  if (amountVal === "" || amountVal < 1) {
    amountVal = 1;
    amount.value = "1";
  }
  const URL = `${BASE_URL}/${fromCurr.value}`;
  await fetch(URL)
    .then((response) => response.json())
    .then((data) => displayResults(data));
});
