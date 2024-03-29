import https from 'https';
import http from 'http';

export default async url => {
    return new Promise(async (res, rej) => {

        try {

            if (url.startsWith('https://') || url.startsWith('http://')) {

                let req = url.startsWith('https://') ? https.get(url) : http.get(url);
                req.once("response", async r => {
                    let c = parseInt(r.headers['content-length']);
                    if (!isNaN(c)) res(formatBytes(c));
                    else rej("Couldn't get file size");
                });
                req.once("error", async e => rej(e));

            }

            else {
                throw 'error: The address should be http or https'
            }

        } catch (error) {

            console.log(error);
        }
    });
};

function formatBytes(x) {
    let units = ['B', 'KB', 'MB', 'GB', 'TB']
    let bytes = x
    let i;

    for (i = 0; bytes >= 1024 && i < 4; i++) {
        bytes /= 1024;
    }

    return bytes.toFixed(2) + ' ' + units[i];
}
