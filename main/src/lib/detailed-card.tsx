

export type DetailedCard = {
  title: string,
  releaseDate: string,
  yearsRan: string,
  episodeLength: string,
  cast: string,
  type: string,
  genre: string,
  plot: string,
  poster: string
}


export function DetailedCard({ item }: { item: DetailedCard }) {
  return (
    <div className="absolute flex h-screen w-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
      <div className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-xl sm:rounded-lg sm:px-10">
        <div className="mx-auto flex max-w-3xl flex-wrap gap-10">
          <div className="w-1/2">
            <img src={item.poster} className="w-48 h-72 rounded-md object-cover" />
          </div>
          <div className="flex-1 divide-y divide-gray-300/50 max-w-2xl">
            <h1 className="text-xl font-bold text-gray-800">{item.title}</h1>
            <p className="text-sm text-gray-500">Release Date: {item.releaseDate}</p>
            <p className="text-sm text-gray-500">Years Ran: {item.yearsRan}</p>
            <p className="text-sm text-gray-500">Genre: {item.genre}</p>
            <p className="text-sm text-gray-500">Episode Length: {item.episodeLength} mins</p>
            <p className="text-sm text-gray-500">Type: {item.type}</p>
            <p className="text-sm text-gray-500">Cast: {item.cast}</p>
            <div className="space-y-4 py-4 text-base leading-7 text-gray-600">
              <p>{item.plot}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}