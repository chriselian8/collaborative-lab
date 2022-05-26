/////////////////////////////////////////////////////////////////////////
// set up
/////////////////////////////////////////////////////////////////////////

const express = require('express');
const mongoose = require ('mongoose');
const cors = require('cors');
const Movies = require('./models/movies.js')
const app = express ();

app.use(express.json());
app.use(cors());

/////////////////////////////////////////////////////////////////////////
// routes
/////////////////////////////////////////////////////////////////////////

app.post('/movies', (req, res) => {
    Movies.create(req.body, (err, createdMovie) => {
        res.json(createdMovie);
    })
})
app.get('/movies', (req, res)=> {
    Movies.find({}, (err, foundMovies)=> {
        res.json(foundMovies);
    })
})
app.delete('/movies/:id', (req, res) => {
    Movies.findByIdAndRemove(req.params.id, (err, deletedMovie) => {
        res.json(deletedMovie);
    })
})
app.put('/movies/:id', (req, res)=>{
    Movies.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedMovie)=>{
        res.json(updatedMovie);
    })
})


app.get('/movies', (req, res)=> {
  Movies.find({}, (err, foundMovies)=> {
      res.json(foundMovies);
  })
})

app.delete('/movies/:id', (req, res) => {
  Movies.findByIdAndRemove(req.params.id, (err, deletedMovie) => {
      res.json(deletedMovie);
  })
})

app.put('/movies/:id', (req, res)=>{
  Movies.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedMovie)=>{
      res.json(updatedMovie);
  })
})


// app.get('/', (req, res)=> {
//   res.send('Hello world')
// })

/////////////////////////////////////////////////////////////////////////
// connection
/////////////////////////////////////////////////////////////////////////

app.listen (3000, () => {
    console.log('listening...');

})
mongoose.connect('mongodb://localhost:27017/merncrudmovies')
mongoose.connection.once('open', ()=>{
    console.log('connected to mongod...');
});
