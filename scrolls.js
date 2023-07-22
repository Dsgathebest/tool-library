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