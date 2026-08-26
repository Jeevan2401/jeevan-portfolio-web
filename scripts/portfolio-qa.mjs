import { chromium } from "playwright";

const baseUrl = process.env.QA_BASE_URL || "http://127.0.0.1:3000/";
const report = { passed: [], warnings: [], failures: [], consoleErrors: [], requestFailures: [] };

function pass(label) {
  report.passed.push(label);
}

function warn(label) {
  report.warnings.push(label);
}

function ensure(condition, label) {
  if (!condition) throw new Error(label);
  pass(label);
}

async function waitForMainPage(page, { testIntroControls = false } = {}) {
  const intro = page.locator(".bmw-intro");
  if (testIntroControls) {
    await intro.waitFor({ state: "visible", timeout: 7000 });
    const sound = page.locator(".bmw-intro__sound");
    await sound.click({ force: true, timeout: 2500 });
    await ensure(await sound.getAttribute("aria-pressed") === "true", "BMW sound control changes from muted to enabled");
    await page.locator(".bmw-intro__skip").click({ force: true, timeout: 2500 });
    await intro.waitFor({ state: "hidden", timeout: 3000 });
  } else if (await intro.count()) {
    const skip = page.locator(".bmw-intro__skip");
    if (await skip.isVisible().catch(() => false)) await skip.click();
    await intro.waitFor({ state: "hidden", timeout: 3000 });
  }
  await page.waitForTimeout(150);
  const scrollState = await page.evaluate(() => ({
    rootOverflow: getComputedStyle(document.documentElement).overflowY,
    bodyOverflow: getComputedStyle(document.body).overflowY,
    touchAction: getComputedStyle(document.body).touchAction,
  }));
  ensure(scrollState.rootOverflow !== "hidden" && scrollState.bodyOverflow !== "hidden", "BMW completion restores page overflow");
  ensure(scrollState.touchAction !== "none", "BMW completion restores touch input");
}

async function goToSection(page, sectionId, activation = "click") {
  const menu = page.getByRole("button", { name: /^(MENU|CLOSE)$/ });
  if ((await menu.textContent())?.trim() !== "CLOSE") await menu.click();
  const destination = page.locator(`.menu-item`).filter({ hasText: new RegExp(`^0[1-3].*${sectionId === "work" ? "Work" : sectionId === "experience" ? "Experience" : "Contact"}`, "i") });
  if (activation === "keyboard") await destination.press("Enter");
  else await destination.click();
  await page.waitForFunction((selector) => {
    const section = document.querySelector(selector);
    return Boolean(section) && Math.abs(section.getBoundingClientRect().top) < 180;
  }, `#${sectionId}`, { timeout: 2500 });
  const offset = await page.locator(`#${sectionId}`).evaluate((element) => Math.abs(element.getBoundingClientRect().top));
  ensure(offset < 180, `Menu navigation reaches the ${sectionId} section`);
}

async function auditDesktop(browser) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  await context.addInitScript(() => {
    window.__qaSharePayload = null;
    Object.defineProperty(navigator, "share", {
      configurable: true,
      value: async (payload) => { window.__qaSharePayload = payload; },
    });
  });
  const page = await context.newPage();
  let releaseIntroImage;
  await page.route("**/manus-storage/bmw-side-profile-true-alpha_800a6571.webp", async (route) => {
    await new Promise((resolve) => {
      releaseIntroImage = () => route.abort().finally(resolve);
    });
  });
  page.on("pageerror", (error) => report.failures.push(`Page error: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") report.consoleErrors.push(message.text());
  });
  page.on("requestfailed", (request) => {
    if (!request.url().includes("bmw-side-profile-true-alpha_800a6571.webp")) report.requestFailures.push(`${request.method()} ${request.url()} — ${request.failure()?.errorText}`);
  });

  await page.goto(`${baseUrl}?qa=desktop`, { waitUntil: "domcontentloaded" });
  await waitForMainPage(page, { testIntroControls: true });
  releaseIntroImage?.();

  const profileTrigger = page.locator('button[aria-controls="profile-card"]');
  await profileTrigger.click();
  await page.locator("#profile-card").waitFor({ state: "visible" });
  const portrait = page.locator("#profile-card img[alt='Portrait of Jeevan G.']");
  await page.waitForFunction((selector) => {
    const image = document.querySelector(selector);
    return image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0;
  }, "#profile-card img[alt='Portrait of Jeevan G.']", { timeout: 5000 });
  ensure(await portrait.evaluate((image) => image.complete && image.naturalWidth > 0), "Profile card portrait image loads");
  ensure(await page.locator(".profile-card").evaluate((element) => getComputedStyle(element).borderTopColor.includes("224") && getComputedStyle(element).boxShadow !== "none"), "Profile card carries the technical border glow");
  await page.locator(".profile-card__scene").click();
  ensure(await page.locator(".profile-card__scene").getAttribute("aria-pressed") === "true", "Profile card flips to the technical back");
  await page.getByRole("button", { name: "SHARE PROFILE ↗" }).click();
  ensure(await page.evaluate(() => Boolean(window.__qaSharePayload?.url)), "Profile share action invokes the native sharing path");
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(120);
  ensure(await page.evaluate(() => window.scrollY > 100), "Page scrolls while the profile card is open");
  await page.getByRole("button", { name: "Close profile card" }).click();
  await page.locator("#profile-card").waitFor({ state: "detached" });
  pass("Profile card closes cleanly");

  await goToSection(page, "work", "keyboard");
  await goToSection(page, "experience");
  await goToSection(page, "contact");

  const heroWork = page.getByRole("button", { name: /OPEN PROJECT LOG/i });
  await heroWork.click();
  await page.waitForFunction(() => Math.abs(document.querySelector("#work").getBoundingClientRect().top) < 180, { timeout: 2500 });
  ensure(await page.locator("#work").evaluate((element) => Math.abs(element.getBoundingClientRect().top) < 180), "Hero project action scrolls to work");
  const heroContact = page.getByRole("button", { name: /START A WEBSITE/i });
  await heroContact.click();
  await page.waitForFunction(() => Math.abs(document.querySelector("#contact").getBoundingClientRect().top) < 180, { timeout: 2500 });
  ensure(await page.locator("#contact").evaluate((element) => Math.abs(element.getBoundingClientRect().top) < 180), "Hero contact action scrolls to contact");

  await page.getByRole("button", { name: /SEND MESSAGE/i }).click();
  ensure(await page.getByText("Name is required.").isVisible(), "Contact form shows name validation");
  ensure(await page.getByText("Email is required.").isVisible(), "Contact form shows email validation");
  ensure(await page.getByText("Message is required.").isVisible(), "Contact form shows message validation");

  const outbound = await page.locator("a[href]").evaluateAll((anchors) => anchors.map((anchor) => ({ href: anchor.href, text: anchor.textContent?.trim(), download: anchor.getAttribute("download") })));
  const nonHttpDestinations = outbound.filter((link) => !link.href.startsWith("http") && !link.href.startsWith("mailto:") && !link.href.startsWith("data:"));
  ensure(nonHttpDestinations.length === 0, "All visible anchors use valid external, email, or data destinations");
  ensure(outbound.some((link) => link.href.includes("wa.me/917358419838")), "WhatsApp project brief link targets the supplied number");
  ensure(outbound.some((link) => link.download === "Jeevan_Resume.pdf" && (link.href.startsWith("data:application/pdf") || link.href.includes("/manus-storage/Jeevan_Resume_"))), "Résumé download uses a valid stored PDF destination");
  ensure(outbound.filter((link) => link.href.includes("github.com/Jeevan2401/")).length >= 3, "Project repository links are present for completed projects");

  await context.close();
}

async function auditFormSuccess(browser) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 } });
  const page = await context.newPage();
  await page.route("https://api.web3forms.com/submit", async (route) => {
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ success: true }) });
  });
  await page.goto(`${baseUrl}?qa=form`, { waitUntil: "domcontentloaded" });
  await waitForMainPage(page);
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await page.getByPlaceholder("Your name").fill("QA Visitor");
  await page.getByPlaceholder("Your email").fill("qa@example.com");
  await page.getByPlaceholder(/Have an idea for a website/).fill("I need a responsive portfolio website with a clear project timeline.");
  await page.getByRole("button", { name: /SEND MESSAGE/i }).click();
  await page.getByRole("status").waitFor({ state: "visible", timeout: 3000 });
  ensure(await page.getByRole("status").isVisible(), "Contact form renders the success state after an accepted response");
  await context.close();
}

async function auditMobile(browser) {
  const context = await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  await page.goto(`${baseUrl}?qa=mobile`, { waitUntil: "domcontentloaded" });
  await waitForMainPage(page);
  await page.locator('button[aria-controls="profile-card"]').tap();
  await page.locator("#profile-card").waitFor({ state: "visible" });
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await page.waitForTimeout(120);
  ensure(await page.evaluate(() => window.scrollY > 100), "Mobile page scrolls while the profile card is open");
  await page.locator(".profile-card__scene").tap();
  ensure(await page.locator(".profile-card__scene").getAttribute("aria-pressed") === "true", "Mobile profile card tap flips the card");
  await context.close();
}

async function main() {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.QA_CHROMIUM_PATH || "/usr/bin/chromium" });
  try {
    await auditDesktop(browser);
    await auditFormSuccess(browser);
    await auditMobile(browser);
  } catch (error) {
    report.failures.push(error instanceof Error ? error.message : String(error));
  } finally {
    await browser.close();
  }
  const summary = {
    passed: report.passed,
    warnings: report.warnings,
    failures: report.failures,
    consoleErrors: [...new Set(report.consoleErrors)],
    requestFailures: [...new Set(report.requestFailures)],
  };
  console.log(JSON.stringify(summary, null, 2));
  if (summary.failures.length) process.exitCode = 1;
}

main();
