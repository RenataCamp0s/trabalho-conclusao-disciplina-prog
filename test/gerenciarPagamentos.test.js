import ServicoDePagamentos from '../src/gerenciarPagamentos.js';
import assert from 'node:assert';

describe('Classe de Servico de Pagamentos', () => {
    it('Validar que o pagamento é adicionado na lista de pagamentos', function() {
        // Arrange
        const servicoDePagamentos = new ServicoDePagamentos();

        // Act
        servicoDePagamentos.pagar('123456', 'Empresa A', 60.00);
        const pagamentos = servicoDePagamentos.consultarUltimoPagamento();
        const meuPagamento = pagamentos.at(-1);

        // Assert
        assert.equal(meuPagamento.codigoDeBarras, '123456');
        assert.equal(meuPagamento.empresa, 'Empresa A');
        assert.equal(meuPagamento.valor, 60.00);
    });
    it('Validar que a categoria do pagamento é classificada como cara quando o valor é maior que 100', function() {
        // Arrange
        const servicoDePagamentos = new ServicoDePagamentos();

        // Act
        servicoDePagamentos.pagar('678910', 'Empresa B', 150.00);
        const pagamentos = servicoDePagamentos.consultarUltimoPagamento();
        const meuPagamento = pagamentos.at(-1);

        // Assert
        assert.equal(meuPagamento.codigoDeBarras, '678910');
        assert.equal(meuPagamento.empresa, 'Empresa B');
        assert.equal(meuPagamento.valor, 150.00);
        assert.equal(meuPagamento.categoria, 'cara');
    });
    it('Validar que a categoria do pagamento é classificada como padrão quando o valor é menor que 100', function() {
        // Arrange
        const servicoDePagamentos = new ServicoDePagamentos();

        // Act
        servicoDePagamentos.pagar('654321', 'Empresa C', 80.00);
        const pagamentos = servicoDePagamentos.consultarUltimoPagamento();
        const meuPagamento = pagamentos.at(-1);

        // Assert
        assert.equal(meuPagamento.codigoDeBarras, '654321');
        assert.equal(meuPagamento.empresa, 'Empresa C');
        assert.equal(meuPagamento.valor, 80.00);
        assert.equal(meuPagamento.categoria, 'padrao');
    });
});