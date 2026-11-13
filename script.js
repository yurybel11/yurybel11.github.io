const root = document.documentElement;
const themeBtn = document.querySelector(".theme-toggle");
const menuBtn = document.querySelector(".menu-toggle");
const links = document.querySelector(".nav-links");

const savedTheme = localStorage.getItem("theme") ||
  (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
setTheme(savedTheme);

function setTheme(theme) {
  root.dataset.theme = theme;
  themeBtn.innerHTML = theme === "dark" ? "&#9728;" : "&#9790;";
  localStorage.setItem("theme", theme);
}
themeBtn.addEventListener("click", () => setTheme(root.dataset.theme === "dark" ? "light" : "dark"));

menuBtn.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => links.classList.remove("open")));

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();
