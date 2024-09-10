export async function parseToMap(pathToFile) {
    const text = await fetch(pathToFile).then(response => response.text())

    const mappedIni = new Map();
    for (const line of text.split('\n')) {
        if (line.trim().length == 0 || line.trim()[0] == '#') { continue; }

        const keyValue = line.split('=');

        if(keyValue.length < 2) { continue; }

        mappedIni.set(keyValue[0].trim(), keyValue[1].trim())
    }

    return mappedIni;
}