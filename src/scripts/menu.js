// This runs on initial load
import Swup from "swup";
const swup = new Swup();

document.querySelector(".hamburger").addEventListener("click", () => {
  document.querySelector(".nav-links").classList.toggle("translate-x-full");
});
swup.hooks.on("page:view", () => {
  // This runs after every page change by swup
  document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".nav-links").classList.toggle("translate-x-full");
  });
});
