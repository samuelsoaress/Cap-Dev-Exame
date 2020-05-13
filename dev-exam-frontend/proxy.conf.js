const PROXY_CONFIG = [
  {
    context:['/1api'],
    target:['http://localhost:3000/'],
    secure:false,
    logLevel:'debug',
    pathRewrite: {"^/1api" : ""}
  },
  {
    context:['/2api'],
    target:['http://bralpsvvwas02:8083/'],
    secure:false,
    logLevel:'debug',
    pathRewrite: {"^/2api" : ""}
  }
];

module.exports = PROXY_CONFIG;