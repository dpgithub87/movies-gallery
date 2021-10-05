export interface HomePagePropsType {
    history: any;
}

export interface Movie {
    id: number;
    title: string;
    imdID: string;
    listingType:string;
    imdbRating: string;
    language: string;
    location: string;
    plot: string;
    poster: string;
    uniqueIdentifier: string;
    soundEffects: Array<SoundEffect>;
    stills: Array<Still>;
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

export type Language = {
    value: string;
    label: string;
}

export type Location = {
    value: string;
    label: string;
}