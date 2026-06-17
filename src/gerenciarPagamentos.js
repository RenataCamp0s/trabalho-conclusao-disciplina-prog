export default class ServicoDePagamentos {
  #pagamentos
  
  constructor(){
    this.#pagamentos = [];
  }
  
  pagar(codigoBarras, empresa, valor) {
    // Validação de codigoBarras
    if (typeof codigoBarras !== 'string' || codigoBarras.trim() === '') {
      throw new Error('Código de barras deve ser uma string não-vazia');
    }

    // Validação de empresa
    if (typeof empresa !== 'string' || empresa.trim() === '') {
      throw new Error('Empresa deve ser uma string não-vazia');
    }

    // Validação de valor
    if (typeof valor !== 'number' || isNaN(valor)) {
      throw new Error('Valor deve ser um número válido');
    }
    if (valor <= 0) {
      throw new Error('Valor deve ser maior que zero');
    }

    // Determinar categoria baseado no valor
    let categoria;
    if (valor > 100) {
      categoria = 'cara';
    } else {
      categoria = 'padrao';
    }

    // Adicionar pagamento à lista
    this.#pagamentos.push({
      codigoBarras: codigoBarras,
      empresa: empresa,
      valor: valor,
      categoria: categoria
    });
  }
  
  consultarUltimoPagamento() {
    return this.#pagamentos.at(-1);
  }
}