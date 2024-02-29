const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

//populate all the options in dropdown//
const dropdowns = document.querySelectorAll(".dropdown select");
//get exchange rate button
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const message = document.querySelector(".msg");

//we will run a loop on our both dropdowns [from and to]
for (select of dropdowns) {
  for (currCode in countryList) {
    //we will add options by creating a new element option//
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    //we will start with code usa and inr
    if (select.name === "form" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    //and we will add this new option in our select//
    select.append(newOption);
    //so basically till now we coverted all our country's list
    //into indiviual option and added those option in our select. and now if we check
    //our drop down toh we have all our countries //
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}
//first-time load//
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[toCurr.value.toLowerCase()];

  let finalAmount = amtVal * rate;
  message.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

//as soon as the country updates flag IMG should be updated too//
const updateFlag = (element) => {
  //extract currCode from element
  let currCode = element.value;
  //we will get countrycode from our currency code
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  //we have to go to  element(select) ke parent(select-container) pr to access our img//
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};
btn.addEventListener("click", async (evt) => {
  evt.preventDefault(); //basically when form gets submitted,it has a default behaviour of refreshing the
  //page so to block that we have used preventdefault(); whatever was happening on submition ,now we will do it//
  let amount = document.querySelector("form input");
  let amtVal = amount.value;
  console.log(amtVal); //whatver amount hum likhenge ,it will be consoled
  if (amtVal === "" && amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  //iss url pe we have to send our request ans we will get our exchange rate
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json(); //our exchange rate value
  //we have to access the value
  let rate = data[toCurr.value.toLowerCase()];
  console.log(rate);
  //our final amount will be equal to rate*amount and we have to save the final amount in our message//
  let finalAmount = rate * amtVal;
  message.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});
//first time load //
window.addEventListener("load", () => {
  updateExchangeRate();
});
