// eslint-disable-next-line no-undef
const TRIM_SPEEDUP_PATH_PREFIX = Deno.env.get('TRIM_SPEEDUP_PATH_PREFIX') ?? '';

const favicon =
    'AAABAAEAICAAAAEAIACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAABAAACUWAAAlFgAAAAAAAAAAAAD///8A////AP///wD///8A////AP///wD///8AAAAAEAAAALAAAAD/AAAA/wAAAP8AAACgAAAAEP///wD///8A////AP///wAAAAAQAAAAkAAAAP8AAAD/AAAA/wAAAMAAAAAw////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AAAAABAAAADQAAAA/wAAAP8AAAD/AAAA/wAAAP8AAADA////AP///wD///8A////AAAAAMAAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAPAAAAAQ////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AAAAAcAAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAABQ////AP///wAAAABAAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAHD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wAAAADAAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAAwP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AAAAAEAAAANAAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAADA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AAAAAFAAAADwAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP+vr6///////////////////////+/v7/+vr6//Xl5e5AYGBvYAAAD/AAAA/wAAALAAAAAQ////AP///wD///8A////AP///wD///8A////AP///wAAAACgAAAA/wAAAP9AQEDrHx8f7QAAAP8AAAD/AAAA/wAAAP8AAAD/Ly8v6////////////////////////////////////////////////4uLi/cGBgb2AAAA/wAAANAAAAAQ////AP///wD///8A////AP///wD///8AAAAAoAAAAP8GBgb2rKys9f/////v7+//PT095wAAAP8AAAD/AAAA/09PT+jv7+///////////////////////////////////////////////////////+/v7/8vLy/rAAAA/wAAAPAAAAAw////AP///wD///8A////AAAAAIAAAAD/BgYG9s/Pz/////////////////////////////////////////////////////////////////////////////////////////////////////////////////9TU1PtAAAA/wAAAOAAAAAQ////AP///wAAAAAwAAAA/wAAAP/Pz8////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9AQEDrAAAA/wAAAMD///8A////AAAAAMAAAAD/d3d38P///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/v7/8RERHwAAAA/wAAAFD///8AAAAA/wAAAP+Li4v3/////////////////////////////////////////////////////////////////////5+fn/9PT0//Hx8f/wAAAP8/Pz//b29v/9/f3////////////////////////////5ubm/YAAAD/AAAA4P///wAAAADgAAAA/wAAAP8fHx/t7+/v/////////////////////////////////////////////////+/v7/8vLy//AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/Dw8P/5+fn////////////////////////////xEREfAAAAD/AAAAMP///wAAAAAgAAAA0AAAAP9PT0/o///////////////////////////////////////////v7+//Ly8v/wAAAP8fHx//r6+v////////////39/f/19fX/8AAAD/AAAA/5+fn///////////////////////h4eH7gAAAP8AAACQ////AP///wAAAAAQAAAA/w8PD+7//////////////////////////////////////////39/f/8AAAD/Ly8v/+/v7////////////////////////////5+fn/8AAAD/Dw8P/+/v7//////////////////f39//AAAA/wAAAND///8A////AP///wAAAAD/AAAA////////////////////////////////////////////n5+f/w8PD//f39///////////////////////////////////////19fX/8vLy////////////////////////////8GBgb2AAAA/////wD///8A////AAAAAP8AAAD/////////////////////////////////////////////////7+/v/////////////////////////////////////////////////9/f3////////////////////////////yQkJOAAAAD/////AP///wD///8AAAAA/wAAAP//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////JCQk4AAAAP////8A////AP///wAAAADwAAAA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8kJCTgAAAA/////wD///8A////AAAAAMAAAAD/7+/v///////////////////////////////////////Pz8//Pz8//+/v7///////////////////////////////////////X19f/19fX////////////////////////////w8PD+4AAAD/////AP///wD///8AAAAAoAAAAP+vr6//////////////////////////////////39/f/w8PD/8AAAD/Ly8v/+/v7////////////////////////////29vb/8AAAD/AAAA/29vb//////////////////v7+//AAAA/wAAAOD///8A////AP///wAAAABwAAAA/15eXuT////////////////////////////////v7+//Ly8v/wAAAP9fX1//////////////////////////////////z8/P/w8PD/8PDw//z8/P/////////////////5ubm/YAAAD/AAAAoP///wD///8A////AAAAACAAAAD/BgYG9v/////////////////////////////////////v7+//j4+P////////////////////////////////////////////z8/P/8/Pz///////////////////////LCws6AAAAP8AAABQ////AP///wD///8A////AAAAALAAAAD/i4uL9////////////////////////////////////////////////////////////////////////////////////////////////////////////////7+/v/8AAAD/AAAA4P///wD///8A////AP///wD///8AAAAAQAAAAP8GBgb27+/v////////////////////////////////////////////////////////////////////////////////////////////////////////////HR0d6wAAAP8AAABw////AP///wD///8A////AP///wD///8AAAAAoAAAAP8vLy/r/////////////////////////////////////////////////////////////////////////////////////////////////////2NjY+sAAAD/AAAA0P///wD///8A////AP///wD///8A////AP///wAAAAAQAAAA4AAAAP9TU1Pt//////////////////////////////////////////////////////////////////////////////////////////+bm5v2AAAA/wAAAPAAAAAw////AP///wD///8A////AP///wD///8A////AP///wAAAAAwAAAA8AAAAP9AQEDr7+/v////////////////////////////////////////////////////////////////////////////Y2Nj6wAAAP8AAAD/AAAAYP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wAAAAAwAAAA4AAAAP8RERHwm5ub9v//////////////////////////////////////////////////////////v7+//x0dHesAAAD/AAAA8AAAAGD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wAAAAAQAAAAsAAAAP8AAAD/ERER8IeHh+7f39/////////////////////////////v7+//m5ub9iwsLOgAAAD/AAAA/wAAANAAAAAw////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AAAAAUAAAAOAAAAD/AAAA/wAAAP8GBgb2JCQk4CQkJOAkJCTgDw8P7gAAAP8AAAD/AAAA/wAAAOAAAABw////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AAAAADAAAACQAAAA0AAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA4AAAAKAAAABQ////AP///wD///8A////AP///wD///8A////AP///wD///8A/gPAf/wDwD/8AYA//AAAP/gAAD/wAAAf4AAAD8AAAAeAAAADAAAAAwAAAAEAAAABAAAAAIAAAADAAAAA4AAAAOAAAADgAAAA4AAAAOAAAADgAAAA4AAAAOAAAADwAAAB8AAAAfgAAAP4AAAD/AAAB/4AAA//AAAf/8AAf//wAf8=';

// eslint-disable-next-line camelcase
function u_atob(ascii) {
    return Uint8Array.from(atob(ascii), (c) => c.charCodeAt(0));
}

function isValidUrl(url) {
    try {
        // const parsedUrl = new URL(url);
        new URL(url);
        return true;
    } catch (_e) {
        return false;
    }
}

function responseJson(code, args) {
    const responseBody = JSON.stringify(
        {
            err: args.err,
            errmsg: args.errmsg,
            data: args.data,
        },
        null,
        2,
    );
    return new Response(responseBody, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json;charset=UTF-8',
        },
        status: code,
    });
}

function handleOptions(request) {
    const headers = request.headers;
    if (
        headers.get('Origin') !== null &&
        headers.get('Access-Control-Request-Method') !== null &&
        headers.get('Access-Control-Request-Headers') !== null
    ) {
        const respHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
            'Access-Control-Max-Age': '86400',
            'Access-Control-Allow-Headers': request.headers.get(
                'Access-Control-Request-Headers',
            ) ||
                'Accept, Authorization, Cache-Control, Content-Type, DNT, If-Modified-Since, Keep-Alive, Origin, User-Agent, X-Requested-With, Token, x-access-token',
        };
        return new Response(null, {
            headers: respHeaders,
        });
    } else {
        return new Response(null, {
            headers: {
                Allow: 'GET, HEAD, POST, OPTIONS',
            },
        });
    }
}

async function handleRequest(request, connInfo) {
    console.debug('handleRequest, request:', request, connInfo);
    console.info(`${request.method} ${request.url} FROM ${request.headers.get('referer')}`);

    const fixHttpsUrl = request.url.replace(/^http:\/\//, 'https://');
    const { origin: baseUrl } = new URL(fixHttpsUrl);

    try {
        let newUrl = '';

        const realOrigin = request.headers.get('x-real-origin');
        if (realOrigin && isValidUrl(realOrigin)) {
            const tmpUrl = new URL(fixHttpsUrl);
            tmpUrl.hostname = new URL(realOrigin).hostname;
            if (TRIM_SPEEDUP_PATH_PREFIX) {
                if (tmpUrl.pathname.startsWith(TRIM_SPEEDUP_PATH_PREFIX)) {
                    tmpUrl.pathname = tmpUrl.pathname.slice(TRIM_SPEEDUP_PATH_PREFIX.length);
                } else {
                    return responseJson(400, { errmsg: 'url prefix not match', err: 18122 });
                }
            }
            newUrl = tmpUrl.href;
        } else {
            newUrl = request.url.match(/https?:\/\/.*?\/(.*)/)[1];
            if (newUrl.length === 0) {
                return responseJson(200, { data: 'working' });
            }
            if (newUrl === 'favicon.ico') {
                return new Response(u_atob(favicon), { headers: { 'content-type': 'image/x-icon' } });
            }
            if (TRIM_SPEEDUP_PATH_PREFIX) {
                if (`/${newUrl}`.startsWith(TRIM_SPEEDUP_PATH_PREFIX)) {
                    newUrl = newUrl.slice(TRIM_SPEEDUP_PATH_PREFIX.length);
                } else {
                    return responseJson(400, { errmsg: 'url prefix not match', err: 18123 });
                }
            }
            if (!isValidUrl(newUrl)) {
                if (newUrl.indexOf('.') === -1 || !isValidUrl(`https://${newUrl}`)) {
                    return responseJson(400, { errmsg: 'Bad Request', err: 18106 });
                }
                newUrl = `https://${newUrl}`;
            }
        }

        const { origin: newBaseUrl } = new URL(newUrl);

        const newHeaders = new Headers(request.headers);
        newHeaders.delete('Origin');
        newHeaders.delete('Host');

        const newRequest = new Request(newUrl, {
            headers: newHeaders,
            body: request.body,
            method: request.method,
            redirect: 'manual',
        });

        let proxyResponse;
        try {
            proxyResponse = await fetch(newRequest);
        } catch (e) {
            console.error(`fetch url:${newUrl} failed.`, newRequest, e);
            return responseJson(400, { errmsg: 'Bad Request', err: 18107 });
        }
        const response = new Response(proxyResponse.body, proxyResponse);

        response.headers.set('Access-Control-Allow-Origin', '*');
        response.headers.append('Vary', 'Origin');
        if (response.headers.has('Location')) {
            const location = new URL(response.headers.get('Location'), newBaseUrl);
            response.headers.set('Location', `${baseUrl}${TRIM_SPEEDUP_PATH_PREFIX}/${location.href}`);
        }
        // fetch 实现已经删除了，这里为了兼容
        response.headers.delete('Content-Encoding');

        fetch('https://pageview.deno.dev/api/collect?accessToken=LdF7hAj2A5xKZeYL', {
            method: 'POST',
            body: JSON.stringify({
                name: 'deno-speedup',
                ts: new Date().toISOString(),
                client_id: '',
                url: fixHttpsUrl,
                content_type: response.headers.get('Content-Type'),
                referer: request.headers.get('Referer'),
                ua: request.headers.get('User-Agent'),
                cookie: request.headers.get('Cookie'),
                sip: connInfo?.remoteAddr?.hostname,
                request_headers: JSON.stringify(Object.fromEntries(request.headers.entries())),
                status_code: response.status,
                response_headers: JSON.stringify(Object.fromEntries(response.headers.entries())),
                title: '',
            }),
            headers: {
                'Content-type': 'application/json;charset=UTF-8',
            },
        });

        return response;
    } catch (err) {
        return responseJson(500, { errmsg: err.message || err.toString(), err: 18105 });
    }
}

// eslint-disable-next-line no-undef
Deno.serve({
    onListen: ({ port }) => {
        console.log('Deno server listening on *:', port);
    },
}, (request, connInfo) => {
    if (request.method === 'OPTIONS') {
        return handleOptions(request);
    } else {
        return handleRequest(request, connInfo);
    }
});