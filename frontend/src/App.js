import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import {useState, useEffect} from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  const [name, setName] = useState('')
  const [release, setRelease] = useState('')
  const [image, setImage] = useState('')
  const [genre, setGenre] = useState('')
  const [watched, setWatched] = useState(false)
  const [active, setActive] = useState('view')
  const [movies, setMovies] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/movies').then((response) => {
      {setMovies(response.data)}
    })
  }, [])

  if (active === 'view') {
    return (
      <>
        <header>
          <h1> TEST 1 </h1>
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
              <button>Edit movies</button>
              <button>
                Delete
              </button>
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
          <h1> TEST 2 </h1>
        </header>
          <div className='container'>
            <p></p>
          </div>
      </>
    )
  } else if (active === 'create') {
    return (
      <>
        <header>
          <h1> TEST 3 </h1>
        </header>
          <div className='container'>
            <p></p>
          </div>
      </>
    )
  }
}

export default App;
