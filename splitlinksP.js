function splitLinksP(arrayLinksP) {
    const collectArray = [].concat(...arrayLinksP);
    arrayLinksP.length = 0; // Vaciar el array original

    Array.prototype.push.apply(arrayLinksP, collectArray); // Agregar los elementos de collectArray a arrayLinksP

    // console.log(arrayLinksP);
    let partsize = Math.floor(arrayLinksP.length / 4);
    urlsP1 = arrayLinksP.slice(0, partsize);
    urlsP2 = arrayLinksP.slice(partsize, partsize * 2);
    urlsP3 = arrayLinksP.slice(partsize * 2, partsize * 3);
    urlsP4 = arrayLinksP.slice(partsize * 3);
}

function splitLinksP2(arrayLinksP) {
    const collectArray = [].concat(...arrayLinksP);
    arrayLinksP.length = 0; // Vaciar el array original

    Array.prototype.push.apply(arrayLinksP, collectArray); // Agregar los elementos de collectArray a arrayLinksP

    // console.log(arrayLinksP);
    const numParts = 10; // Número de partes en las que queremos dividir el array
    const partSize = Math.floor(arrayLinksP.length / numParts);

    const dividedArray = [];

    for (let i = 0; i < numParts; i++) {
        dividedArray.push(arrayLinksP.slice(i * partSize, (i + 1) * partSize));
    }

    return dividedArray;
}
