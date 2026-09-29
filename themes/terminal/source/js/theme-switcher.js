(function () {
  const themes = ["green", "amber", "cyan", "magenta", "white"];
  const names = {
    green: "terminal-green",
    amber: "terminal-amber",
    cyan: "terminal-cyan",
    magenta: "terminal-magenta",
    white: "terminal-white",
  };
  const key = "terminal-theme";
  const currentNodes = Array.from(document.querySelectorAll("[data-terminal-theme-current]"));

  function setTheme(theme) {
    const nextTheme = themes.includes(theme) ? theme : "green";
    document.documentElement.dataset.terminalTheme = nextTheme;
    currentNodes.forEach((node) => {
      node.textContent = names[nextTheme];
      node.setAttribute("aria-label", `Cycle theme, ${names[nextTheme]}`);
      node.setAttribute("title", names[nextTheme]);
    });
    try {
      localStorage.setItem(key, nextTheme);
    } catch {
    }
  }

  function savedTheme() {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  currentNodes.forEach((node) => {
    node.addEventListener("click", () => {
      const activeTheme = document.documentElement.dataset.terminalTheme || "green";
      const index = themes.indexOf(activeTheme);
      setTheme(themes[(index + 1) % themes.length]);
    });
  });

  setTheme(savedTheme() || "green");
})();
