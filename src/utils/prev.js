import {
    map,
    pairwise
} from 'rxjs/operators';

export const prev = () => source =>
    source.pipe(
        pairwise(),
        map(([prev]) => prev || '')
    );
