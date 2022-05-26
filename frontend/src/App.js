import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import {useState, useEffect} from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  const [name, setName] = useState()
  const [release, setRelease] = useState()
  const [image, setImage] = useState()
  const [genre, setGenre] = useState()
  const [watched, setWatched] = useState(false)
  const [active, setActive] = useState('index')
  const [movies, setMovies] = useState([])

  const newmovie = (event) => {
    setActive('create')
  }
  const getHome = (event) => {
    setActive('index')
  }

  const editMovie = (event) => {
    setActive('edit')
  }

  const handleNewNameChange = (event) => {
    // console.log(event.target.value);
    setName(event.target.value);
  }

  const handleNewReleaseChange = (event) => {
    // console.log(event.target.value);
    setRelease(event.target.value);
  }

  const handleNewImageChange = (event) => {
    // console.log(event.target.value);
    setImage(event.target.value);
  }

  const handleNewGenreChange = (event) => {
    // console.log(event.target.value);
    setGenre(event.target.value);
  }

  const handleNewWatchedChange = (event) => {
    // console.log(event.target.checked);
    setGenre(event.target.checked);
  }

  const handleNewmovieFormSubmit = (event) => {
    event.preventDefault();
    // console.log(newName);
    axios.post(
      'http://localhost:3000/movies', 
      {
        name: name,
        release: release,
        image: image,
        genre: genre,
        watched: watched
      }
    ).then(() => {
      axios
        .get('http://localhost:3000/movies')
        .then((response) => {
          setMovies(response.data)
          setActive('index')
        })
    })
  }

  const handleDelete = (movieData)=>{
    axios
        .delete(`http://localhost:3000/movies/${movieData._id}`)
        .then(()=>{
            axios
                .get('http://localhost:3000/movies')
                .then((response)=>{
                    setMovies(response.data)
                })
        })
  }


  const handleUpdateFormSubmit = (movieData)=>{
    axios
        .put(
            `http://localhost:3000/movies/${movieData._id}`,
            {
              name: name,
              release: release,
              image: image,
              genre: genre,
              watched: watched
            }
        )
        .then(()=>{
            axios
                .get('http://localhost:3000/movies')
                .then((response)=>{
                    setMovies(response.data)
                })
        })
  }


  useEffect(() => {
    axios.get('http://localhost:3000/movies').then((response) => {
      {setMovies(response.data)}
    })
  }, [])

  if (active === 'index') {
    return (
      <>
        <header>
          <h1> Index </h1>
          <button onClick={getHome}>Home</button>
          <button onClick={newmovie}>Add a movie!</button>
        </header>
        <div className='container'>
          <div className="row row-cols-1 row-cols-md-3 g-4">
          {
            movies.map((movies) => {
             return <div className="card" key={movies._id}>
             <img src={movies.image} className="card-img-top"/>
               <div className="card-body">
                 <h1 className="card-title">{movies.name}</h1>
                 <h3 className="card-body">{movies.release}</h3>
                 <h3 className="card-body">{movies.genre}</h3>
                 {movies.watched ? <h3 className="card-body">You have watched this movie</h3> : <h3 className="card-body">You have not watched this yet</h3>}
               </div>
              <button onClick={editMovie}>Edit Movie</button>
              <button onClick={(event) => {handleDelete(movies)}}>Remove Movie</button>
            </div>
            })
          }
          </div>
        </div>
      </>
    )
  } else if (active === 'edit') {
    return (
      <>
        <header>
          <h1> Edit movies </h1>
          <button onClick={getHome}>Home</button>
        </header>
          <div className='container'>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            <div className="card" key={movies._id}>
              <div className="card-body">
                <form onSubmit={(event) => { handleUpdateFormSubmit(movies) }}>
                  <h5 className="card-title"> Name: <input type="text" className="form-control" onChange={handleNewNameChange} placeholder={movies.name} /></h5> <br />
                  <p className="card-body">Image: <input type="text" className="form-control" onChange={handleNewImageChange} placeholder={movies.image} /></p> <br />
                  <p className="card-body">Release: <input type="text" className="form-control" onChange={handleNewReleaseChange} placeholder={movies.release} /> </p> <br />
                  <p className="card-body">Genre: <input type="text" className="form-control" onChange={handleNewGenreChange} placeholder={movies.genre} /> </p> <br />
                  Watched: <input type="checkbox" onChange={handleNewWatchedChange} /><br />
                  <input type="submit" value="SUBMIT" />
                </form>
              </div>
            </div>
          </div>
          </div>
      </>
    )
  } else if (active === 'create') {
    return (
      <>
        <header>
          <h1> Create movies! </h1>
          <button onClick={getHome}>Home</button>
        </header>
        <div className='container'>
          <form onSubmit={handleNewmovieFormSubmit}>
            Name: <input type="text" className="form-control" onChange={handleNewNameChange} /> <br />
            Image: <input type="text" className="form-control" onChange={handleNewImageChange} /> <br />
            Release: <input type="text" className="form-control" onChange={handleNewReleaseChange} /> <br />
            Genre: <input type="text" className="form-control" onChange={handleNewGenreChange} /><br />
            Watched: <input type="checkbox" onChange={handleNewWatchedChange} /><br />
            <input type="submit" value="SUBMIT" />
          </form>
        </div>
      </>
    )
  }
}

export default App;
