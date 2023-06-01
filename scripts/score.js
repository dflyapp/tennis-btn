const xlsx = require('node-xlsx')
const path = require('path')
const fs = require('fs')

async function generate() {
    const fileContents = await fs.readFileSync(path.join(process.cwd(), "scripts/data.xlsx"));
    const data = xlsx.parse(fileContents);

    try {
        fs.writeFileSync(path.join(process.cwd(), "scripts/data.json"), JSON.stringify(data));
    } catch (err) {
        console.error(err);
    }
}

generate()