import 'dotenv/config'

import OpenAI from 'openai'


const AI = async()=>{
    const openai = new OpenAI()
    const results = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
        { role: 'system', content: 'your are an AI answer best as u can' },
        { role: 'user', content: 'hoe to find focus and concentration in himalayas?'}
    ],
    })

    return results.choices[0].message;

}

export default AI;


