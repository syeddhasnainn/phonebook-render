const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
`mongodb+srv://syeddhasnainn:${password}@cluster0.cfvxotn.mongodb.net/personApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name:name,
    number:number
})

if (process.argv.length < 4){
    Person
    .find({})
    .then(result => {
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)})
    mongoose.connection.close()
    }
    )}

else{
person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
})
}

