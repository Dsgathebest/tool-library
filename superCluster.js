import { use, launch } from 'puppeteer-extra';
import { Cluster } from 'puppeteer-cluster';
// const fs = require('fs');

import StealthPlugin from 'puppeteer-extra-plugin-stealth';
use(StealthPlugin());

const linkSectionPages = ['linkS1', 'linksS2', 'linkS3'];
let urlsProducts = [];

// Esta funcion se encarga de recoger todos los links de las paginas individuales que tienen los productos de una seccion
async function collectLinkItems(sectionPage) {
    const browser = await launch({
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

    await page.goto(sectionPage);

    urlsProducts = ['linkP', 'linkP1', 'linkP2', 'linkP3'];
    await browser.close();
}

// Este recoge todos los datos especificos de un producto, como titulo, precios, descripcion, etc.
async function collectItems(linksProductos) {

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

    await cluster.task(async ({ page, data: linkProducto }) => {
        await page.goto(linkProducto);


    });

    for (const linkProducto of linksProductos) {
        await cluster.queue(linkProducto)
    }

    // Cerrar el navegador
    await cluster.idle();
    await cluster.close();

}

// Esta funcion tiene el proposito de hacer todo el proceso de scrapeado pero con cada seccion, por ejemplo, zapatos, ropa para hombre, ropa para mujer, etc.
async function moreSections(sectionPages) {

    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_PAGE,
        maxConcurrency: 1,
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

    await cluster.task(async ({ data: sectionPage }) => {

        await collectLinkItems(sectionPage);
        await collectItems(urlsProducts);
        console.log("Finalizacion de todo el proceso con la primera section");
        // para la proxima seccion se limpia el array de productos que atrapo en la section
        urlsProducts = [];

    });

    for (const sectionPage of sectionPages) {
        await cluster.queue(sectionPage)
    }

    // Cerrar el navegador
    await cluster.idle();
    await cluster.close();

}

moreSections(linkSectionPages);