// Import stylesheets
import './style.css';

import { zip, forkJoin, combineLatest, Subject } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';

// types:
type Shape = '♠️' | '❤';
type Card = '👑' | '1️⃣';

// subjects:
const shapes$ = new Subject<Shape>();
const cards$ = new Subject<Card>();

// operated:
const zipped$ = zip(shapes$, cards$);
const forkedJoin$ = forkJoin(shapes$, cards$);
const combinedLatest$ = combineLatest(shapes$, cards$);
const withLatestFromed$ = shapes$.pipe(withLatestFrom(cards$));

// subscriptions:

// 每次所有源都发出新的数据（组装过的数据不在组装）时，会发出一套最新的数据，任意一个源没有发出新数据，将不会发出整套数据
zipped$.subscribe((x) => console.log('zipped: ', x)); 

// 所有源都完成时，如果所有源都发出过数据，会发出最后一套数据，如果任意一个源没有发出过数据就完成，那么最后不会发出数据。
forkedJoin$.subscribe((y) => console.log('forkedJoin: ', y)); 

// 每次任意一个源发出数据，都会和其他源的最后一个数据（任意一个源还没有发出过数据，那么将继续等待，直到每一个源都有最后的一个数据）组装并发出
combinedLatest$.subscribe((z) => console.log('combinedLatest: ', z)); 

// 每次shapes$发出值时和cards$流的最后一个数据进行组装，然后一起发出值, 如果cards$没有发出数据，那么不会有数据发出。
withLatestFromed$.subscribe((w) => console.log('withLatestFromed: ', w)); 

// next params:
shapes$.next('♠️');
cards$.next('👑');

shapes$.next('❤');
cards$.next('1️⃣');

shapes$.next('♠️');
cards$.next('👑');

shapes$.next('❤');
cards$.next('1️⃣');

// complete subjects
shapes$.complete();
cards$.complete();
