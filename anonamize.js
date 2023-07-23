const puppeteerExtra = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const AnonymizeUAPlugin = require('puppeteer-extra-plugin-anonymize-ua');
const proxyChain = require('proxy-chain');
const { Cluster } = require('puppeteer-cluster');


// Configuración de proxy
const proxyUrl = 'http://proxy-server-ip:port'; // Reemplaza con la URL de tu proxy
const proxiedUrl = proxyChain.anonymizeProxy(proxyUrl);

// Agregar los plugins a Puppeteer Extra
puppeteerExtra.use(StealthPlugin());
puppeteerExtra.use(AnonymizeUAPlugin());

async function scrapePage(url) {
  const browser = await puppeteerExtra.launch({
    headless: true,
    args: [`--proxy-server=${proxiedUrl}`], // Usar el proxy para las solicitudes del navegador
  });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Aquí puedes incluir tu lógica de extracción de datos de la página
    // Por ejemplo, puedes usar page.evaluate() para interactuar con el DOM de la página y obtener información

    console.log(`Datos extraídos de ${url}: ...`);
  } catch (error) {
    console.error(`Error al procesar ${url}:`, error);
  } finally {
    await browser.close();
  }
}

async function runCluster() {
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 2, // Número de navegadores que se ejecutarán simultáneamente
  });

  // Lista de URLs para procesar
  const urlsToScrape = [
    'https://www.example.com/page1',
    'https://www.example.com/page2',
    // Agrega más URLs que deseas procesar
  ];

  try {
    await cluster.task(async ({ page, data }) => {
      await scrapePage(data);
    });

    // Agregar las URLs a la cola de tareas
    for (const url of urlsToScrape) {
      cluster.queue(url);
    }

    // Esperar a que se completen todas las tareas
    await cluster.idle();
  } catch (error) {
    console.error('Error en el clúster:', error);
  } finally {
    await cluster.close();
  }
}

// Ejecutar el clúster para procesar las páginas web
runCluster();
