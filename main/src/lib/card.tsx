import React from "react";
import { DetailedCardContext } from "../App";
import { DetailedCard } from "./detailed-card";

export type CardProp =  {
  id: string,
  title: string,
  img: string, 
  year: string, 
  type: 'movie' | 'series' | 'episode'
}

export default function Card(props: CardProp) {
  const globalDetailedCardContext = React.useContext(DetailedCardContext);

  async function handleClick() {
    // showDetailedCard
    let title: string = props.title.toLowerCase().replace(/\s+/, '+');
    const response = await fetch(`http://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}&t=${title}&plot=full`);
    const data = await response.json();
    const DetailedCardObject: DetailedCard = {
      title: data['Title'],
      yearsRan: data['Year'],
      cast: data['Actors'],
      plot: data['Plot'],
      genre: data['Genre'],
      episodeLength: data['Runtime'],
      releaseDate: data['Released'],
      type: data['Type'],
      poster: data['Poster']
    }
    globalDetailedCardContext!.showDetailedCard(true);
    globalDetailedCardContext!.setDetailedCardProp(DetailedCardObject);
  }

  return (
  <div onClick={handleClick} className="border-2 shadow-2xl w-3/5 transition ease-in-out delay delay-0 hover:scale-110 relative max-w-48 max-h-72 flex items-center justify-center bg-black">
    {(props.img !== "N/A") ? <img src={props.img} className="align-middle"/> : <span className="align-middle text-white text-center" >{props.title}</span>}
    
  </div>
  )
}