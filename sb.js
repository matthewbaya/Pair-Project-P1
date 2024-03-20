const fs = require('fs')

let data = JSON.parse(fs.readFileSync('./data/categories.json'))
data = data.map(e => {
    delete e.id;
    e.createdAt = new Date();
    e.updatedAt = new Date();
    return e
})
console.log(data);