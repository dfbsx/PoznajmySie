import { test, expect } from '@playwright/test';
import lighthouse from 'lighthouse';
import { chromium } from 'playwright';
import * as fs from 'fs'; // Moduł do zapisu danych do pliku

// URL aplikacji
const appUrl = 'https://poznajmy-sie.vercel.app';
const loginUrl = `${appUrl}/login`; // Strona logowania

// Funkcja uruchamiająca audyt Lighthouse
async function runLighthouseAudit(url: string, browser: any) {
    const port = 9222;

    // Tworzymy nowy kontekst i stronę w Playwright
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(url); // Przechodzimy na stronę, którą będziemy audytować

    // Ustalamy opcje dla Lighthouse
    const options = {
        port,
        disableDeviceEmulation: true, // Wyłącz emulację urządzeń, jeśli chcesz audytować stronę "desktopową"
    };

    // Uruchamiamy audyt Lighthouse na stronie
    const runnerResult = await lighthouse(url, options);
    return runnerResult?.lhr;
}

// Funkcja zapisująca dane do pliku
function saveResultsToFile(results: any) {
    const filePath = './lighthouse_results.json'; // Ścieżka do pliku

    // Odczytujemy istniejące dane (jeśli plik już istnieje)
    let existingData: any[] = [];
    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf-8');
        existingData = JSON.parse(fileData);
    }

    // Dodajemy nowe dane do istniejących wyników
    existingData.push(results);

    // Zapisz wyniki do pliku w formacie JSON
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2), 'utf-8');
    console.log(`Wyniki zapisano do pliku: ${filePath}`);
}

// Test logowania i audytowania stron po zalogowaniu
test('Zaloguj się i wykonaj audyt Lighthouse na stronach aplikacji', async ({ page }) => {
    test.setTimeout(60000);  // Zwiększ timeout testu do 60 sekund

    // Uruchom przeglądarkę Playwright
    const browser = await chromium.launch({
        headless: true,
        args: ['--remote-debugging-port=9222'], // Port, na którym będzie działał zdalny debuger
    });

    // Zaloguj się na stronie logowania
    await page.goto(loginUrl);
    const username = 'ulala';
    const password = 'Haslo+123';

    await page.fill('input[placeholder="email@example.com"]', username);  // Wypełnij pole username
    await page.fill('input[placeholder="*****"]', password);
    await page.click('button[type="submit"]');

    // Lista stron do audytowania po zalogowaniu
    const pagesToAudit = [
        `${appUrl}/login`,
        `${appUrl}/home`,
        `${appUrl}/edit`
    ];

    // Uruchamiamy audyty dla każdej strony
    const results = [];
    for (const pageUrl of pagesToAudit) {
        const result = await runLighthouseAudit(pageUrl, browser);
        results.push({
            url: result.finalUrl,
            performanceScore: result.categories.performance.score,
            accessibilityScore: result.categories.accessibility.score,
            seoScore: result.categories.seo.score,
            bestPracticesScore: result.categories['best-practices'].score,
            pwaScore: result.categories.pwa ? result.categories.pwa.score : null,  // Dodajemy PWA jeśli jest dostępne
            firstContentfulPaint: result.audits['first-contentful-paint'].displayValue,
            speedIndex: result.audits['speed-index'].displayValue,
            interactive: result.audits['interactive'].displayValue,
            totalBlockingTime: result.audits['total-blocking-time'].displayValue,
            cumulativeLayoutShift: result.audits['cumulative-layout-shift'].displayValue,
        });
    }

    // Zapisz wyniki do pliku
    results.forEach(result => {
        saveResultsToFile(result);
    });

    // Zamknij przeglądarkę po zakończeniu testu
    await browser.close();
});
