export async function parseToMap(pathToFile) {
    const text = await fetch(pathToFile).then(response => response.text())

    const mappedIni = new Map();
    for (const line of text.split('\n')) {
        const keyValue = line.split('=');

        if(keyValue.length == 0) { continue; }

        mappedIni.set(keyValue[0].trim(), keyValue[1].trim())
    }

    return mappedIni;
}