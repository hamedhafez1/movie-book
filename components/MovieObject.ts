export type MovieObject ={
    id: string,
    title: string,
    image: string,
    rank: string | number,
    fullTitle: string,
    crew: string,
    imDbRating: string,
    contentRating: string,
    runtimeStr: string,
    year: string,
    genres: string,
    directors: string,
    releaseDate: string,
    plot: string,
    actorList: any,
    similar: any,
    //tv
    tvSeriesInfo: {
        creators: string
    },
    //actor
    role: string,
    description: string
}