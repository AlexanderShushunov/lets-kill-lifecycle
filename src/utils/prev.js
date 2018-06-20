import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pairwise';

export function prev() {
    return this
        .pairwise()
        .map(([prev]) => prev || '');
}