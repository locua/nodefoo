#!/usr/bin/env node

// node

console.info("Hello world!");

// to automatically run a node app use nodemon => $ npm i -g nodemon
// nodemon index.js


// Use process.exit(1); to exit an app


// common http server module express

const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send('Hi!')
})

const server = app.listen(3000, () => console.log('Server ready'))

process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Process terminated')
    })
})
process.kill(process.pid, 'SIGTERM')

