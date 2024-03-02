import AI from '@/utils/ai'
import qa from '@/utils/qa'

const home = async () => {
  const d = qa('what given video is about?')
  console.log(d)
  return <>hey</>
}

export default home
