export interface HomePagePropsType {
    history: any;
}

export interface Movie {
    Id: number;
    Title: string;
    ImdID: string;
    ListingType:string;
    ImdbRating: string
    Language: string;
    Location: string;
    Plot: string;
    Poster: string;
    SoundEffects: Array<SoundEffect>;
    Stills: Array<Still>;
}

export interface SoundEffect {
    id: number;
    soundEffect: string;
    movieId: number;
}

export interface Still {
    id: number;
    still: string;
    movieId: number;
}

export type ErrorBoundaryStateType = {
    hasError: Boolean;
};
