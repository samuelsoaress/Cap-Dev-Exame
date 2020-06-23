const errors = {
  'HYSTRIX-FALLBACK': { status: 412, message: [{ mensagem: 'Sistema indisponível no momento. Por favor tente novamente mais tarde.' }] },
  'JOI-MISSING-FIELDS': { status: 412, message: [{ mensagem: 'Sistema indisponível no momento. Por favor tente novamente mais tarde.' }] },
  'DIGITO-INVALIDO': { status: 412, message: [{ mensagem: 'Dígito da conta inválido.' }] },
  'CONTA-DIVERGENTE': { status: 412, message: [{ mensagem: 'Dados da conta enviada não conferem com a cadastrada.' }] },
  default: { status: 500, message: [{ mensagem: 'Erro interno do sistema.' }] },
};

const getError = err => (errors[err.message] || errors.default);

module.exports = {
  getError,
};
