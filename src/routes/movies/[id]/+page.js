import * as api from '$lib/api';

export async function load({params, fetch}) {
    const movie = await api.get(fetch, `/movie/${params.id}`, {
        append_to_response: 'images,videos,recommendations'
    });

    const trailer = movie.videos.results.find((video) => {
        return (
            video.official &&
            video.site === 'YouTube' &&
            (video.type === 'Trailer' || video.type === 'Teaser')
        );
    });

    return {
        movie,
        trailer
    }
}