import React, { useEffect, useState } from 'react'
import Tmdb from './Tmdb';
import './App.css'

import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';


function App() {

  const [movieList, setMovieList] = useState([]);
  const [featuredata, setFeatureData] = useState(null);

  useEffect( () => {
    const loadAll = async () => {
      //Pegando a lista TOTAL
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // Pegando o Featured
      let originals = list.filter(i => i.slug === 'originals')
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');

      setFeatureData(chosenInfo);
      
    }

    loadAll();
  }, [])


  return (
    <div className="page">

      {featuredata && 
        <FeaturedMovie item={featuredata} />
      }

      <section className="list">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
    </div>
  )
}

export default App;