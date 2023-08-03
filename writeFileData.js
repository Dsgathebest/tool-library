async function writeFileData(listItems) {
    const contenido = JSON.stringify(listItems);
    fs.writeFile("tester.json", contenido, (err) => {
        if (err) throw err;
    });
    await delay(2000);
    // Ruta al archivo JSON que deseas formatear y convertir en objetos anidados
    const rutaArchivoJSON = 'tester.json';

    // Lee el contenido del archivo JSON
    fs.readFile(rutaArchivoJSON, 'utf8', (error, data) => {
        if (error) {
            console.error('Error al leer el archivo JSON:', error);
            return;
        }

        try {
            // Parsea el contenido JSON en un objeto
            const json = JSON.parse(data);

            // Convierte el objeto en una cadena formateada
            const jsonFormateado = prettier.format(JSON.stringify(json), {
                parser: 'json',
            });

            // Guarda el resultado formateado en un archivo
            fs.writeFile('tester.json', jsonFormateado, 'utf8', (error) => {
                if (error) {
                    console.error('Error al guardar el archivo formateado:', error);
                    return;
                }

                console.log(`Archivo JSON formateado guardado en: ${rutaArchivoJSON}`);
            });
        } catch (error) {
            console.error('Error al formatear el archivo JSON:', error);
        }
    });
}

// Este es usado en el scraper de falabella
async function writeFileData2(listItems) {
    const contenido = JSON.stringify(listItems, null, 2); // 2 espacios para el espaciado
    fs.writeFile("tester.json", contenido, 'utf8', (err) => {
        if (err) {
            console.error('Error al guardar el archivo formateado:', err);
            return;
        }

        console.log(`Archivo JSON formateado guardado en: tester.json`);
    });
}