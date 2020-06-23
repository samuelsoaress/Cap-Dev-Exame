module.exports = {
  req: {
    headers: {},
    body: {},
    params: {},
    query: {agencia:111, conta:1111, dac:12, titularidade:1},
    cwssession: "11",
    checkBody: (...args) => {},
    next: () => {},
    validationErrors:() => {},
  },
  res: {
    status: (statusCode = 200) => ({
      json: (...args) => ({ statusCode, body: args[0] }),
    }),
    locals: {
      stateless: {
        importFrom: (...args) => (null),
        exportTo:(... args) => (null), // eslint-disable-line no-unused-vars
        get: (param) => {
          if (param === 'conta') return '597925';
          if (param === 'dac') return '0';
          if (param === 'agencia') return '1217';
          if (param === 'titularidade') return '1';
          if (param === 'userAgent') return 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Mobile Safari/537.36 smic';
          return null;
        }, // eslint-disable-line no-unused-vars
        set: (...args) => (null), // eslint-disable-line no-unused-vars
        del: (...args) => (null), // eslint-disable-line no-unused-vars
      },
    },
  },
  next: (...args) => (args[0]),
  headers: {
    'x-stateless-open': 'eyJ1dWlkIjoiNzZkYTlkMDktYTgwNi00Mzg0LWE2NmEtOGNiZjU3NDFmODNhIiwiY2xpZW50ZSI6eyJ1c2VyQWdlbnQiOiJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvNzQuMC4zNzI5LjE1NyBTYWZhcmkvNTM3LjM2IiwiYWdlbmNpYSI6IjEyMTciLCJjb250YSI6IjU5NzkyNSIsImRhYyI6IjAiLCJ0aXR1bGFyaWRhZGUiOiIxIn19',
    'x-stateless-closed': 'a00=',
    cliente: JSON.stringify({
      conta: {
        agencia: 1234,
        conta: 132,
        digConta: 1,
        titularidade: 1,
      },
      documento: {
        numero: 1234567890,
        controle: '1',
      },
      segmento: 'x',
    }),
    cwssession: 'teste',
  },
};
