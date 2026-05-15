export default class ServicoDePagamentos {
  #pagamentos
  
  constructor(){
    this.#pagamentos = [];
  }
  
  pagar(codigoDeBarras, empresa, valor) {
    if (valor > 100) {
      this.#pagamentos.push({
      codigoDeBarras: codigoDeBarras,
      empresa: empresa,
      valor: valor,
      categoria: 'cara'
      })
    }
    if (valor < 100) {
      this.#pagamentos.push({
      codigoDeBarras: codigoDeBarras,
      empresa: empresa,
      valor: valor,
      categoria: 'padrao'
      })
    }
  }
  
  consultarUltimoPagamento() {
    return this.#pagamentos;
  }
}