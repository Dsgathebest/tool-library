const infinitScroll = async (page) => {

    // let scrollTop;
    let pageHeight;
    let pageHeightNew;


    do {
        // scrollTop = await page.evaluate(()=> window.scrollY);
        await delay(1000);
        pageHeight = await page.evaluate('document.body.scrollHeight');
        const preScrollHeight = Math.floor(pageHeight * 1);
        await page.evaluate(`window.scrollTo(0, ${preScrollHeight})`);
        const preScrollHeight2 = Math.floor(pageHeight * 0.1);
        await page.evaluate(`window.scrollTo(0, ${preScrollHeight2})`);
        const scrollHeight = Math.floor(pageHeight * 0.9);
        await page.evaluate(`window.scrollTo(0, ${scrollHeight})`);
        console.log(`Page Height: ${pageHeight}`);
        // console.log(`Scroll Height: ${scrollHeight}`);
        // console.log(`Scroll Top: ${scrollTop}`);

        await page.evaluate(`window.scrollTo(0, ${scrollHeight})`);
        await delay(2000);
        pageHeightNew = await page.evaluate('document.body.scrollHeight');
        console.log(`Page Height new: ${pageHeightNew}`);

    } while (pageHeight !== pageHeightNew);
}

// Estos 2 son usados en el scraper de nafnaf 
const infinitScroll2 = async (page) => {
    const pageHeight = await page.evaluate('document.body.scrollHeight');
    const scrollHeight = Math.floor(pageHeight * 0.5); // Calcula el 80% del tamaño de la página

    await page.evaluate(`window.scrollTo(0, ${scrollHeight})`);
};

const infinitScroll3 = async (page) => {
    const pageHeight = await page.evaluate('document.body.scrollHeight');
    const scrollHeight = Math.floor(pageHeight * 0.8); // Calcula el 80% del tamaño de la página

    await page.evaluate(`window.scrollBy(0, ${scrollHeight})`);
};


const infinitScroll4 = async (page) => {

    // let scrollTop;
    let pageHeight;
    let pageHeightNew;
  
    do {
      // Obtenemos la posición actual del scroll
      const scrollTop = await page.evaluate(() => window.scrollY);
  
      // Obtenemos la altura total de la página
      pageHeight = await page.evaluate(() => document.body.scrollHeight);
  
      // Calculamos la altura relativa que nos falta por recorrer
      const relativeHeight = pageHeight - scrollTop;
      console.log(relativeHeight);
  
      // Definimos una función para hacer scroll hacia abajo
      async function scrollByRelativeHeight(relativeHeightPercentage) {
        const preScrollHeight = Math.floor(relativeHeight * relativeHeightPercentage);
        await page.evaluate(`window.scrollBy(0, ${preScrollHeight})`);
        await delay(1000);
      }
  
      // Realizamos el scroll en diferentes porcentajes
      await scrollByRelativeHeight(1);
      await scrollByRelativeHeight(0);
      await scrollByRelativeHeight(0.1);
      await scrollByRelativeHeight(0.2);
      await scrollByRelativeHeight(0.3);
      await scrollByRelativeHeight(0.4);
      await scrollByRelativeHeight(0.5);
      await scrollByRelativeHeight(0.6);
      await scrollByRelativeHeight(0.7);
      await scrollByRelativeHeight(0.8);
      await scrollByRelativeHeight(0.9);
  
      // Obtenemos la nueva posición del scroll
      const scrollHeight = Math.floor(relativeHeight * 1);
  
      // Realizamos el último scroll hasta el final de la página
      await page.evaluate(`window.scrollBy(0, ${scrollHeight})`);
      await delay(1000);
  
      console.log(`Page Height: ${pageHeight}`);
      await page.evaluate(`window.scrollTo(0, ${scrollHeight})`);
      await delay(2000);
  
      // Obtenemos la nueva altura total de la página
      pageHeightNew = await page.evaluate(() => document.body.scrollHeight);
      console.log(`Page Height new: ${pageHeightNew}`);
    } while (pageHeight !== pageHeightNew);
}

// Estos 2 son usados en el scraper de mango
const infinitScroll5 = async (page) => {

    // let scrollTop;
    let pageHeight;
    let pageHeightNew;


    do {
        // scrollTop = await page.evaluate(()=> window.scrollY);
        await delay(1000);
        pageHeight = await page.evaluate('document.body.scrollHeight');
        console.log(`Page Height: ${pageHeight}`);
        const preScrollHeight = Math.floor(pageHeight * 1);
        await page.evaluate(`window.scrollTo(0, ${preScrollHeight})`);
        const preScrollHeight2 = Math.floor(pageHeight * 0.1);
        await page.evaluate(`window.scrollTo(0, ${preScrollHeight2})`);
        const preScrollHeight3 = Math.floor(pageHeight * 0.2);
        await page.evaluate(`window.scrollTo(0, ${preScrollHeight3})`);
        const preScrollHeight4 = Math.floor(pageHeight * 0.3);
        await delay(1000);
        await page.evaluate(`window.scrollTo(0, ${preScrollHeight4})`);
        const preScrollHeight5 = Math.floor(pageHeight * 0.4);
        await page.evaluate(`window.scrollTo(0, ${preScrollHeight5})`);
        const preScrollHeight6 = Math.floor(pageHeight * 0.5);
        await page.evaluate(`window.scrollTo(0, ${preScrollHeight6})`);
        const preScrollHeight7 = Math.floor(pageHeight * 0.6);
        await delay(1000);
        await page.evaluate(`window.scrollTo(0, ${preScrollHeight7})`);
        const preScrollHeight8 = Math.floor(pageHeight * 0.7);
        await page.evaluate(`window.scrollTo(0, ${preScrollHeight8})`);
        const preScrollHeight9 = Math.floor(pageHeight * 0.8);
        await page.evaluate(`window.scrollTo(0, ${preScrollHeight9})`);
        const preScrollHeight10 = Math.floor(pageHeight * 0.9);
        await page.evaluate(`window.scrollTo(0, ${preScrollHeight10})`);
        await delay(1000);
        const scrollHeight = Math.floor(pageHeight * 1);

        await page.evaluate(`window.scrollTo(0, ${scrollHeight})`);
        await delay(2000);
        pageHeightNew = await page.evaluate('document.body.scrollHeight');
        console.log(`Page Height new: ${pageHeightNew}`);

    } while (pageHeight !== pageHeightNew);
}

const infinitScroll6 = async (page) => {
    let pageHeight;
    pageHeight = await page.evaluate('document.body.scrollHeight');
    let currentScroll = 0;
    const scrollStep = 150;

    await page.evaluate('window.scrollTo(0, 0)');

    while (currentScroll < pageHeight) {
        // Hacemos un desplazamiento incremental de un número de píxeles en cada iteración
        await page.evaluate(`window.scrollBy(0, ${scrollStep})`);
        await delay(50); // Un pequeño retardo para dar tiempo al scroll

        // Actualizamos la posición actual del scroll y la altura de la pagina.
        currentScroll += scrollStep;
        pageHeight = await page.evaluate('document.body.scrollHeight');
    }
    console.log(`CurrentScroll :${currentScroll}`);
    console.log(`PageHeight : ${pageHeight}`);

}