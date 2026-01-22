(() => {
  const root = document.documentElement;
  const storageKey = "ap-theme";
  const stored = localStorage.getItem(storageKey);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = stored || (prefersDark ? "dark" : "light");

  root.setAttribute("data-bs-theme", initialTheme);

  const syncLabels = (theme) => {
    document.querySelectorAll("[data-theme-label]").forEach((label) => {
      label.textContent = theme === "dark" ? "Light" : "Dark";
    });
    document.querySelectorAll("[data-theme-icon]").forEach((icon) => {
      icon.className = theme === "dark" ? "bi bi-sun" : "bi bi-moon-stars";
    });
  };

  syncLabels(initialTheme);

  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const nextTheme = root.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-bs-theme", nextTheme);
      localStorage.setItem(storageKey, nextTheme);
      syncLabels(nextTheme);
    });
  });

  const currentPage = document.body?.dataset?.page;
  if (currentPage) {
    document.querySelectorAll("[data-nav]").forEach((link) => {
      if (link.dataset.nav === currentPage) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });
  }
})();
