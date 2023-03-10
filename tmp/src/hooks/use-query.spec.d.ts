export declare const clientFactory: () => import("@urql/core/dist/urql-core-chunk").Client;
export type FilmQueryResponse = {
    film: {
        id: string;
        title: string;
    };
};
export declare const filmQuery: import("@urql/core/dist/urql-core-chunk").TypedDocumentNode<FilmQueryResponse, {
    id: string;
}>;
export declare const FilmQuery: import("@builder.io/qwik").QRL<() => import("@urql/core/dist/urql-core-chunk").TypedDocumentNode<FilmQueryResponse, {
    id: string;
}>>;
export type DirectorQueryResponse = {
    director: {
        id: string;
        favouriteFilm: {
            id: string;
            title: string;
        };
        worstFilm: {
            id: string;
            title: string;
        };
    };
};
export declare const directorQuery: import("@urql/core/dist/urql-core-chunk").TypedDocumentNode<DirectorQueryResponse, {
    id: string;
}>;
export declare const DirectorQuery: import("@builder.io/qwik").QRL<() => import("@urql/core/dist/urql-core-chunk").TypedDocumentNode<DirectorQueryResponse, {
    id: string;
}>>;
