import React from "react";
import { DataContext, LoadingContext, QueryContext } from "../App";

export type Query = {
  q: string,
  type: 'all' | 'movie' | 'episode' | 'series',
  year: string,
  page: number,
}


export default function QueryForm() {
  const globalQueryContext = React.useContext(QueryContext);
  const globalDataContext = React.useContext(DataContext);
  const globalLoadingContext = React.useContext(LoadingContext);

  const [query, setQuery] = [globalQueryContext!.query, globalQueryContext!.setQuery];
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const setData = globalDataContext!.setData;

  function validateQuery() {
    if (query.year && (Number.isNaN(query.year) || (Number.parseInt(query.year) < 1900 || Number.parseInt(query.year) > 2030))) {
      setErrorMessage('Year should be within 1900 and 2030');
      return false;
    };
    setErrorMessage('');
    return true;
  }

  function handleYearInput(e: React.ChangeEvent<HTMLInputElement>) {
    const VALUES:string = '0123456789';
    const inputVal = e.currentTarget.value;

    if (inputVal.length > 4)  return;
    if (!inputVal.split('').every(val => VALUES.includes(val))) {
      return;
    };
    setQuery({...query, year: e.currentTarget.value});
  }

  async function submitForm(e: React.FormEvent) {
    e.preventDefault();
    if (!validateQuery()) return;
    globalLoadingContext?.setIsLoading(true)
    const response = await fetchData(query);
    globalLoadingContext?.setIsLoading(false);
    setData({data: response.data , maxPage: Math.ceil(response.totalResults / response.data.length)});
    
  }


  return (
    <form className="m-auto my-10 w-1/3 flex flex-col border border-gray-300 rounded-lg p-6 bg-white shadow-md" onSubmit={submitForm}>
      <div className="mb-4">
        <label htmlFor="query" className="block text-sm font-medium text-gray-700">Query</label>
        <input  type="text" id="query" placeholder="Search for movies, series and episodes" onChange={(e) => setQuery({...query, q: e.currentTarget.value})} value={query.q}
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
        <input  type="text" id="year" placeholder="Enter year" onChange={handleYearInput} value={query.year}
          className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
        <select id="type" onChange={(e) => setQuery({...query, type: e.currentTarget.value as ('all' | 'episode' | 'series' | 'movie')})} value={query.type}
        className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
          <option value="episode">Episode</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="all">All</option>
        </select>
      </div>


      <button type="submit"
        className="w-full rounded-md bg-blue-500 py-2 text-white font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
      >
        Search
      </button>
      {(errorMessage.length > 0) ? <span className="text-red-600 text-center text-xs m-2">{errorMessage}</span>: (<></>)}
    </form>

  )
}



export async function fetchData(query: Query) {
  const queryUrl = new URL('https://www.omdbapi.com');
  const urlSearchParams = new URLSearchParams();

  urlSearchParams.set('apikey', import.meta.env.VITE_API_KEY);
  urlSearchParams.set('r', 'json');

  if (query.q.length > 0) urlSearchParams.set('s', query.q);
  if (query.year.length === 4) urlSearchParams.set('y', query.year);
  if (query.type !== 'all') urlSearchParams.set('type', query.type);
  urlSearchParams.set('page', query.page.toString());
  
  queryUrl.search = urlSearchParams.toString();

  const response = await fetch(queryUrl);
  const jsonResponse = await response.json();


  if (jsonResponse.Response === 'True') return {
    data: jsonResponse.Search,
    totalResults: jsonResponse.totalResults,
    message: 'Results fetched',
    ok: true
  };

  if (jsonResponse.Error === 'Too many results.') return {
    ok: false, 
    data: [],
    totalResults: -1,
    message: 'Search is too general, please specify more details for your search'
  } 

  if (jsonResponse.Error === 'Movie not found!') return {
    ok: true, 
    message: 'No results found',
    totalResults: 0,
    data: []
  }

  return {
    ok: false, 
    message: 'Unknown error occurred',
    totalResults: jsonResponse.searchResults,
    data: []
  }
}

