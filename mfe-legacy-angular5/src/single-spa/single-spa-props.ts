import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AppProps } from 'single-spa';

export const singleSpaPropsSubject = new ReplaySubject<AppProps>(1);
