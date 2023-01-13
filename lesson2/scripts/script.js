
const date = new Date();

const yearElement = document.querySelector("#year");

const dateElement = document.querySelector("#date");

yearElement.textContent = date.getFullYear();

dateElement.textContent = date.toLocaleString();