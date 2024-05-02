

const whitelist = [
    'https://commesr.io',
    'http://localhost:3500',
    'http://127.0.0.1:3500',
    'https://api.matriclive.com/',
    'https://google.com',
    'https://cdnjs.cloudflare.com'
];
const corsOptions = {
    origin: (origin, callback) => {
     if (whitelist.indexOf(origin) !== -1 || !origin) {
    callback(null, true)
    } else {
    callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
    credentials: true,
}
module.exports = corsOptions;