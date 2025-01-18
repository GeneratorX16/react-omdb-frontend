import React, { SetStateAction } from "react";
import CardList from "./lib/card-list";
import { ApiResponseData } from "./data";
import QueryForm, { type Query } from "./lib/query-form";
import { DetailedCard } from "./lib/detailed-card";

export const LoadingContext = React.createContext<{isLoading: boolean, setIsLoading: React.Dispatch<SetStateAction<boolean>>}|null>(null);
export const QueryContext = React.createContext<{query: Query, setQuery: React.Dispatch<SetStateAction<Query>>}|null>(null);
export const DataContext = React.createContext<{data: {data: ApiResponseData, message: string, maxPage?: number}, setData: React.Dispatch<SetStateAction<ApiResponseData>>}| null>(null);
export const DetailedCardContext  = React.createContext<{setDetailedCardProp: React.Dispatch<SetStateAction<DetailedCard | null>>, showDetailedCard: React.Dispatch<SetStateAction<boolean>>} | null>(null);

export default function App() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [query, setQuery] = React.useState<Query>({page: 1, q:'', year: '', type: 'all'});
  const [data, setData] = React.useState<ApiResponseData>({data: [], maxPage: 1});
  const [showCard, setShowCard] = React.useState<boolean>(false);
  const [detailedCardProp, setDetailedCardProp] = React.useState<DetailedCard|null>(null);

  
  return (
    <DetailedCardContext.Provider value={{showDetailedCard: setShowCard, setDetailedCardProp: setDetailedCardProp}}>
    <DataContext.Provider value={{data: { data: {data: data.data, maxPage: data.maxPage}, message: 'Search something...'}, setData}}>
      <LoadingContext.Provider value={{isLoading, setIsLoading}}>
        <QueryContext.Provider value={{query, setQuery}}>
          <QueryForm />
          <CardList cardDataList={data.data} maxPage={data.maxPage}/>

          {showCard && <DetailedCard item={detailedCardProp as DetailedCard}/>}
        </QueryContext.Provider>
      </LoadingContext.Provider>
    </DataContext.Provider>
    </DetailedCardContext.Provider>


    

  )
}




