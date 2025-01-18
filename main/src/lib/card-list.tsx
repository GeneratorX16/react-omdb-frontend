import React from "react";
import { MediaDataResponse } from "../data";
import Card from "./card";
import { DataContext, LoadingContext, QueryContext } from "../App";
import { fetchData } from "./query-form";

export default function CardList({ cardDataList, message='', maxPage}: { cardDataList: MediaDataResponse[], message?: string, maxPage: number }) {
  const isLoading = React.useContext(LoadingContext)!.isLoading;
  const globalQueryContext = React.useContext(QueryContext);
  const currentPage: number = globalQueryContext?.query.page ?? 1;

  return (
    <div className="p-10">
      {isLoading ? (
        <div className="flex">
          <SpinLoader />
        </div>
      ): (
              <div className="flex justify-evenly gap-2">
              {cardDataList.map((cardData) =>
                <
                  Card
                  title={cardData['Title']}
                  img={cardData['Poster']}
                  year={cardData['Year']}
                  type={cardData['Type']}
                  id={cardData['imdbID']}
                  key={cardData['imdbID']}
                />
              )}
            </div>
      )}
    
    {(isLoading || cardDataList.length=== 0) ? (<></>): (
      <div className="p-10 text-center flex gap-5 justify-center">
        {(currentPage > 1) ?  (<PageNavigateButton page={currentPage-1} />) : (<></>)}
          <PageNavigateButton page={currentPage} disabled={true} />
        {(currentPage < maxPage) ? (<PageNavigateButton page={currentPage+1} />) : (<></>)} 
      </div>
      

    )}

    </div>
  )
}

function SpinLoader() {
  return (
    <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600 m-auto">
    </div>
  )
}

function PageNavigateButton({page, disabled = false}: {page: number, disabled?: boolean}) {
  const globalQueryContext = React.useContext(QueryContext);
  const globalLoadingContext = React.useContext(LoadingContext);
  const globalDataContext = React.useContext(DataContext);

  async function handleClick() {
    globalLoadingContext?.setIsLoading(true);
    const response = await fetchData({...globalQueryContext!.query, page: page});
    globalLoadingContext?.setIsLoading(false);

    const newQuery = globalQueryContext?.query;
    newQuery!.page = page;
    console.log('Logging the new query object');
    console.log(newQuery)

    globalQueryContext?.setQuery(newQuery!);
    const x = globalDataContext!.data;
    console.log('Logging Data in Data context')
    console.log(x)
    globalDataContext?.setData({...(x.data), data: response.data});
  }

  return (
    <button className={"rounded-sm bg-cyan-800 text-white px-0.5 text-center min-w-5 " + (disabled ? "cursor-not-allowed" : "")} disabled={disabled} onClick={handleClick}>
      {page}
    </button>
  )
}
