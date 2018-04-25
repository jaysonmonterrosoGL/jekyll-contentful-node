import { writeFile as writePost, existsSync} from 'fs';
import mkdirp from 'mkdirp';
import {createClient} from 'contentful'
import {stringify} from 'json2yaml'

const TOKEN = '457e334701c7c313087be8f56dfad038588ec5883bdceb3a6ec548e799676cd9'
const SPACE_ID = 'ptqkhdoe3xjz'

const client = createClient({
    space: SPACE_ID,
    accessToken: TOKEN
})

const failBuild = () => {
    if (ENV !== 'preview') {
        process.exit(1)
    }
}


const createFolder = (path) => {
    if (!existsSync(path)) {
        mkdirp.sync(path)
    }
}

const writeCollectionFile = ({ path, fileName, header = {}, body = '', extension = '.md' }) => {
    if (!path && !fileName) {
        throw new Error('No path or filename defined to create data file')
    }

    createFolder(path)
    const fileContent = `${stringify(header)}---\n${body || ''}`
    console.log(fileContent)
    writePost(`${path}${fileName}${extension}`, fileContent, (err) => {
        err
            ? console.log(err)
            : console.log(`\n √ ${path}${fileName}${extension} \n`)
    })
}

const loadContentType =  (args) => client.getEntries(args);

export { loadContentType, writeCollectionFile}