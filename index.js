const { response, request } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(express.static('build'))

app.use(cors())
app.use(express.json())

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


app.get('/', (request, response) => {
    response.send('<h1>Phonebook</h1>')
})
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/info', (request, response) => {
    const date = Date(Date.now())
    
    response.send(`<div><p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p></div>`)
})

app.get('/api/persons/:id', (request, response) => {

    const id = Number(request.params.id)
    const returnedPerson = persons.find(person => person.id === id)
    returnedPerson ? response.json(returnedPerson) : response.status(404).end()

})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    const person = {
        id : Math.floor(Math.random() * 101),
        name :body.name,
        number : body.number
    }

    if (!body.name || !body.number) {
        console.log('name or number is required')
    }
    else if (persons.filter(person => person.name === body.name).length === 1) {
        console.log({ error: 'name must be unique' })
    }
    else {
        persons = persons.concat(person)
        response.json(person)
    }
    
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log( `Server Running on port ${PORT}`)
})