async function example() {

    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_PAGE,
        maxConcurrency: 20,
        monitor: true,
        puppeteerOptions: {
            headless: true, // Ejecutar el navegador en modo visible
            defaultViewport: false, // Desactivar el tamaño de vista predeterminado
            // Consultar la info de abajo en chrome://version/
            executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
            userDataDir: "C:/Users/Daniel/AppData/Local/Google/Chrome/User Data/Default",
            // args: ['--max-old-space-size=4096'] // Aumenta el límite de memoria a 4 GB (puedes ajustarlo según tus necesidades)
        }
    });

    cluster.on("taskerror", (err, data) => {
        console.log(`Error crawling ${data}: ${err.message}`);
    });

    cluster.taskTimeout = 50000;

    await cluster.task(async ({ page, data: url }) => {
        await page.goto(url);
        

    });

    for (const url of linksProductos) {
        await cluster.queue(url)
    }

    // Cerrar el navegador
    await cluster.idle();
    await cluster.close();

}