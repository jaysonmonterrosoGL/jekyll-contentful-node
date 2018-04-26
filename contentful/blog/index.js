
import moment from 'moment'
import { loadContentType, writeCollectionFile} from '../utils'
import { createClient } from 'contentful'


// CONSTANTS
const TOKEN = '457e334701c7c313087be8f56dfad038588ec5883bdceb3a6ec548e799676cd9'
const SPACE_ID = 'ptqkhdoe3xjz'
const POSTS_CONTENT_TYPE_ID = '2wKn6yEnZewu2SCCkus4as' // this is the post id content type
const FILE_NAME_CONTENTFUL = '-contentful.md'
const POSTS_PATH = './_posts/'


const client = createClient({
    space: SPACE_ID,
    accessToken: TOKEN
})



const createCollectionFile = ({ title, slug, body,  featuredImage, createdAt}) => {  
    const header= {title, slug, featuredImage, layout: 'post'}
    const formattedDate = (createdAt) ? moment(createdAt).utc().format('YYYY-MM-DD') : moment().utc().format('YYYY-MM-DD')
    writeCollectionFile({ path: POSTS_PATH, 
    fileName: `${formattedDate}-${slug}`, 
    extension: FILE_NAME_CONTENTFUL, 
    header,
    body })
}

export default async () => {  
    try {
        const {items} = await client.getEntries({ content_type: POSTS_CONTENT_TYPE_ID}) ;
        items.forEach(({ fields }) => createCollectionFile(fields))
    }catch(ex){
        throw new Error(ex);
    }
    
}
