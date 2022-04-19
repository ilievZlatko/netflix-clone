import Image from 'next/image'
import React from 'react'
import type { Movie } from '../typings'

interface ThumbnailProps {
  movie: Movie
}

const Thumbnail: React.FC<ThumbnailProps> = ({ movie }) => {
  return (
    <div className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        className="object-cover"
        layout="fill"
      />
    </div>
  )
}

export default Thumbnail
