import OpenAI from 'openai'
import { Document } from 'langchain/document'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { OpenAIEmbeddings } from '@langchain/openai'
import { CharacterTextSplitter } from 'langchain/text_splitter'
import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import { YoutubeLoader } from 'langchain/document_loaders/web/youtube'


const qa = (
  que
) => {

  const openai = new OpenAI()

  let video = 'https://www.youtube.com/watch?app=desktop&v=MhXwO_mkdzQ';

  const createStore = (docs) => {
    MemoryVectorStore.fromDocuments(docs, new OpenAIEmbeddings())
  }

  const docsFromYTVideo = (video) => {
    const loader = YoutubeLoader.createFromUrl(video, {
      language: 'em',
      addVideoInfo: true,
    })

    return loader.loadAndSplit(
      new CharacterTextSplitter({
        separator: ' ',
        chunkSize: 2000,
        chunkOverlap: 200,
      })
    )
  }

  const docsFromPDF = () =>{

    let pdf = ''
    const loader = new PDFLoader(pdf)
    return loader.loadAndSplit(
        new CharacterTextSplitter({
            separator: '. ',
            chunkSize: 2000,
            chunkOverlap: 200,
        })
    )
  }

  const loadStore = async ()=>{
    const videoDoc =  await docsFromYTVideo(video)
    //const pdfDoc = await docsFromPDF()

    console.log(videoDoc[0])
    return createStore([...videoDoc])
  }

  const query = async ()=>{
    const store = await loadStore()
    const result = await store.similaritySearch(que,2)

    return result
  }

  return query
}


export default qa;