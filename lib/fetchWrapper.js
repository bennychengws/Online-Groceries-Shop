import Router from 'next/router';

const fetchWrapper = async (url, context) => {
    const cookie = context.req?.headers.cookie;

    const resp = await fetch(url, {
        headers: {
            cookie: cookie
        }
    });

    if(resp.status === 401 && !context.req) {
        Router.replace('/');
        return {};
    }

    if(resp.status === 401 && context.req) {
        context.res?.writeHead(302, {
            Location: 'http://localhost:3000/'
        });
        context.res?.end();
        return;
    }

    const json = await resp.json();
    return json;
}

export default fetchWrapper
