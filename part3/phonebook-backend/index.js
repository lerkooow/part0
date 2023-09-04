require("dotenv").config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Person = require("./models/person")

app.use(express.json())

// CORS
app.use(cors())

// Morgan
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

morgan.token('ms', (req, res) => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body);
    }
});


// GET info
app.get('/info', (request, response) => {
    res.json(newPerson)
})

// GET persons
app.get("/api/persons", (req, res) => {
    Person.find({}).then((persons) => {
        res.json(persons)
    })
})

// GET persons id с ошибкой, если индекс не найден
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

// DELETE
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

// generateId
const generateId = () => {
    const minId = 1;
    const maxId = 1000000;
    return Math.floor(Math.random() * (maxId - minId + 1)) + minId;
};

// POST
app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'Name or number missing'
        });
    } else if (persons.some(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'Name must be unique'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then((savedPerson) => {
        res.json(savedPerson)
    })
});


const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
