async function example() {
    const browser = await puppeteer.launch({
        headless: false, // Ejecutar el navegador en modo visible
        defaultViewport: {
            width: 1920,
            height: 920,
        }, // Desactivar el tamaño de vista predeterminado
        executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
        userDataDir: 'C:/Users/Daniel/AppData/Local/Google/Chrome/User Data/Default',
         args: ['--max-old-space-size=4096'] // Aumenta el límite de memoria a 4 GB (puedes ajustarlo según tus necesidades)
    });
    const page = await browser.newPage();

    await page.goto(url);

   
    await browser.close();
}