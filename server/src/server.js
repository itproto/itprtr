
const fs = require("fs");
const http = require("http");
const { Socket } = require("net");
const index = fs.readFileSync("public/index.html");
const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.end(index);
});

server.listen(8080);

const { Subject, timer, of, fromEvent, ReplaySubject, AsyncSubject, from } = require("rxjs");
const { merge } = require("rxjs/operators");
const { switchMap, tap, distinctUntilChanged, scan, map, mergeMap, takeUntil } = require("rxjs/operators");

// const obs = timer(0, 1 * 1000)

const ccyList = new Subject();

const ccyWatch$ = ccyList.asObservable();




const fetchCur$ = (ccl) => from(Promise.resolve(`Resolved ${ccl}`));

ccyWatch$.pipe(
    mergeMap(ccl => fetchCur$(ccl))
).subscribe(v => console.log(`Look ${JSON.stringify(v)}`))





//ccyList.next(['EUR', 'USD', 'GBP']);
//ccyList.next(['CUR', 'BUR']);

const { Server } = require('ws')
const wss = new Server({ port: 3001, });
// wss.on('connection', () => console.log('CONNECTED'));
/*fromEvent(wss, 'connection').pipe(
    mergeMap(fromEvent(sock, 'message').co
        (sock) => fromEvent(sock, 'close'))
    )
).subscribe((event) => {
    console.log(`hi`, event.data);
});*/
/*const wss$ = of(wsServer)
const connection$ = wss$
    .pipe(
        switchMap(wss =>
            fromEvent(wss, 'connection')
                .pipe(
                    tap((()) => console.warn(`Test ${JSON.stringify(params)}`))
                )
        )
    );

    wsServer.addListener('connection', (sock, req) => {
        console.log(req.
    });

function listenOnConnect() {
    return connection$
        .pipe(
            mergeMap((sock) =>
                fromEvent(sock, 'message')
            )
        )
}*/

// listenOnConnect().subscribe(v => console.log(`Here we go`, v))

/*
const wss = new Server({ server });

const handleConnection = (websocket: WebSocket): Observable<WebSocket.MessageEvent | WebSocket.CloseEvent> => {
  const onmessage$ = fromEvent<WebSocket.MessageEvent>(websocket, 'message')
    .pipe(
      tap(m => console.log(m.type))
    );
  const onclose$ = fromEvent<WebSocket.CloseEvent>(websocket, 'close')
    .pipe(
      tap(m => console.log(m.reason)));
      // const onerror$ = ....
      // etc
  return merge(onmessage$, onclose$)
}

fromEvent(wss, 'connection')
  .pipe(
    map(a => a[0] as WebSocket),
    mergeMap(handleConnection)
  ).subscribe();
}
*/
/*

const TickerSubject = new Subject();
const EmitTickerPrice = async (symbol, price, currency) => {
    const ticker = {
        symbol, price, currency,
        createdAt: Math.floor(new Date() / 1000),
    };
    TickerSubject.next(ticker);
    return ticker;
};





function listenOnConnect() {
    return connection$
        .pipe(
            mergeMap(({ wss, sock }) =>
                fromEvent(sock, 'message')
                    .pipe(
                        takeUntil(
                            fromEvent(sock, 'disconnect')
                        ),
                        map((a) => {
                            return { wss, sock, message: a.data };
                        })
                    )
            )
        )
}


const disconnect$ = connection$
    .pipe(
        mergeMap(({ client }) =>
            fromEvent(client, 'disconnect')
                .pipe(
                    map(() => client)
                )
        )
    )
    */
/*
wsServer.on("connection", (socket) => {
    socket.on("message", (msg) => {
        if (msg.toString() === "echo") {
            socket.send("echo");
        }
    });
});*/

/*
const got = require("got");

timer(0, 3 * 1000)
    .pipe(
        switchMap(_ => got('https://blockchain.info/ticker?cors=true')
            .then(res => JSON.parse(res.body))
            .then(parsed => parsed.EUR.buy)
        ))
    .pipe(distinctUntilChanged())
    .pipe(scan((acc, curr) => ({
        delta: Math.round((acc.value - curr || 0) * 100) / 100,
        value: curr
    }), {}));

listenOnConnect().subscribe(props => {
    console.log(`LOOK ${props.message}`);
});
*/