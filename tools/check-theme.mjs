import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const home = read("public/index.html");
assert.ok(/class="mail-row"/.test(home), "Posts should retain the compact metadata rows.");
assert.ok(home.includes("Welcome to my terminal-based blog."), "Keep the original welcome copy.");
assert.ok(home.includes("ls posts/"), "Keep the original posts heading.");
assert.ok(!/收件箱|封信|LETTERS FROM|THE SENDER/.test(home), "Do not rename the blog to a mailbox.");
const navigation = home.match(/<nav class="terminal-nav"[\s\S]*?<\/nav>/)[0];
assert.deepEqual([...navigation.matchAll(/data-terminal-nav="([^"]+)"/g)].map((match) => match[1]), ["home", "archives", "about"]);
assert.ok(!/class="post-tags"|class="about-details"|data-terminal-theme-choice/.test(home), "Keep secondary details out of the main reading view.");
const archives = read("public/archives/index.html");
assert.ok(/class="archive-browse"/.test(archives) && archives.includes('href="/categories/"') && archives.includes('href="/tags/"'), "Keep archive browsing reachable.");
const about = read("public/about/index.html");
assert.ok(/class="about-details"/.test(about) && about.includes("查拉图斯特拉如是说") && about.includes("SHORTCUTS"), "Keep profile details and shortcut help on About.");

for (const path of ["index.html", "archives/index.html", "categories/index.html", "tags/index.html", "about/index.html", "page/2/index.html"]) {
  const active = read(`public/${path}`).match(/data-terminal-nav="([^"]+)"\s+aria-current="page"/);
  const expected = path.startsWith("about/") ? "about" : /^(archives|categories|tags)\//.test(path) ? "archives" : "home";
  assert.equal(active?.[1], expected, `Incorrect active navigation: ${path}`);
}
const duplicateTitlePost = read("public/gallery/stop-over-engineering-agents-to-death/index.html");
assert.equal((duplicateTitlePost.match(/<h1\b/g) || []).length, 1, "Do not duplicate the article title.");

const postPath = home.match(/class="mail-row" href="([^"]+)"/)[1];
const post = read(`public${decodeURI(postPath)}index.html`);
for (const label of ["From", "Date", "Subject"]) {
  assert.ok(post.includes(`<dt>${label}:</dt>`), `Missing article metadata: ${label}`);
}
assert.ok(!/正在读信的你|附件 \/ 封面|← 上一封|下一封 →/.test(post), "Keep mail wording confined to metadata.");
assert.ok(/rel="(?:prev|next)"/.test(post), "Keep adjacent article navigation.");
assert.ok(/class="letter-tags"/.test(post), "Keep full tags on the article page.");
assert.ok(readFileSync(new URL("../public/fonts/fusion-pixel.woff2", import.meta.url)).length > 0);

const themes = ["green", "amber", "cyan", "magenta", "white"];
function checkTheme(saved, blocked = false) {
  let stored;
  const makeButton = () => ({
    textContent: "",
    setAttribute(name, value) { this[name] = value; },
    addEventListener(event, handler) { if (event === "click") this.click = handler; },
  });
  const current = makeButton();
  const document = {
    documentElement: { dataset: {} },
    querySelectorAll: () => [current],
  };
  const context = {
    document,
    localStorage: {
      getItem() { if (blocked) throw new Error("Storage unavailable"); return saved; },
      setItem(key, value) { if (blocked) throw new Error("Storage unavailable"); stored = value; },
    },
  };
  const expected = themes.includes(saved) ? saved : "green";
  const initScript = home.match(/<script>([\s\S]*?)<\/script>/)[1];
  runInNewContext(initScript, context);
  assert.equal(document.documentElement.dataset.terminalTheme, expected);
  runInNewContext(read("themes/terminal/source/js/theme-switcher.js"), context);
  assert.equal(current.textContent, `terminal-${expected}`);
  for (let step = 1; step <= themes.length; step++) {
    current.click();
    const theme = themes[(themes.indexOf(expected) + step) % themes.length];
    assert.equal(document.documentElement.dataset.terminalTheme, theme);
    assert.equal(current["aria-label"], `Cycle theme, terminal-${theme}`);
    assert.equal(current.title, `terminal-${theme}`);
    if (!blocked) assert.equal(stored, theme);
  }
}

for (const saved of [null, ...themes, "invalid"]) checkTheme(saved);
checkTheme(null, true);
console.log("Navigation, article metadata, and all five theme colors passed.");
