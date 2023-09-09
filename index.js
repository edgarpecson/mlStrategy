
const OpenAI = require('openai')
const {Configuration, OpenAIApi} = OpenAI;

const openai = new OpenAI({
    organization:`org-jqYvjursxqWxgg7bb6cpN3fH`,
    apiKey:`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`
});

//An express server
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.PORT || 3001
const app=express();

app.use(bodyParser.json())
app.use(cors());


app.post ('/', async (req,res) => {
    const {message} = req.body;

    const completion = await openai.completions.create({
        model: "text-davinci-003",
        prompt: `You're a machine learning strategy expert for a medium sized business. Use this input to define a 4 part strategy to utilize machine learning and AI tools to improve the effectiveness of the business and optimize COGS.  Here is the information provide:
        ML: I am an expert in Machine Learning and can help optimize your business, and provide actionable task.
        Person: I want to know how can minimize expenses and increase productivity
        ML:I will help you optimize your business so you produce 20% annual savings a year on operating expenses. Provide input and I will respond with actionable results.
        Person: ${message}?
        ML: `,
        max_tokens: 200,
        temperature: 1,
    })
    console.log(completion.choices[0])
        if (completion.choices[0].text){
            res.json({
                message: completion.choices[0].text
            })
        }
    })

// function generatePrompt(message){
//     const userInput = message;
//     return `You're a machine learning strategy expert for a medium sized business. Use this input to define a 4 part strategy to utilize machine learning and AI tools to improve the effectiveness of the business and optimize COGS.  Here is the information provide: ${userInput}`
// }

    



app.listen(port, () => {
    console.log(`Backend Server started on port ${port}`)
})