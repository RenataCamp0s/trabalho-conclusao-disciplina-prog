import ServicoDePagamentos from '../src/gerenciarPagamentos.js';
import assert from 'node:assert';

describe('Classe de Servico de Pagamentos', () => {
    it('Validar que o pagamento é adicionado na lista de pagamentos', function() {
        // Arrange
        const servicoDePagamentos = new ServicoDePagamentos();

        // Act
        servicoDePagamentos.pagar('123456', 'Empresa A', 60.00);
        const meuPagamento = servicoDePagamentos.consultarUltimoPagamento();

        // Assert
        assert.equal(meuPagamento.codigoBarras, '123456');
        assert.equal(meuPagamento.empresa, 'Empresa A');
        assert.equal(meuPagamento.valor, 60.00);
    });
    it('Validar que a categoria do pagamento é classificada como cara quando o valor é maior que 100', function() {
        // Arrange
        const servicoDePagamentos = new ServicoDePagamentos();

        // Act
        servicoDePagamentos.pagar('678910', 'Empresa B', 150.00);
        const meuPagamento = servicoDePagamentos.consultarUltimoPagamento();

        // Assert
        assert.equal(meuPagamento.codigoBarras, '678910');
        assert.equal(meuPagamento.empresa, 'Empresa B');
        assert.equal(meuPagamento.valor, 150.00);
        assert.equal(meuPagamento.categoria, 'cara');
    });
    it('Validar que a categoria do pagamento é classificada como padrão quando o valor é menor que 100', function() {
        // Arrange
        const servicoDePagamentos = new ServicoDePagamentos();

        // Act
        servicoDePagamentos.pagar('654321', 'Empresa C', 80.00);
        const meuPagamento = servicoDePagamentos.consultarUltimoPagamento();

        // Assert
        assert.equal(meuPagamento.codigoBarras, '654321');
        assert.equal(meuPagamento.empresa, 'Empresa C');
        assert.equal(meuPagamento.valor, 80.00);
        assert.equal(meuPagamento.categoria, 'padrao');
    });
    
    it('Validar que a categoria do pagamento é classificada como padrão quando o valor é igual a 100', function() {
        // Arrange
        const servicoDePagamentos = new ServicoDePagamentos();

        // Act
        servicoDePagamentos.pagar('111111', 'Empresa D', 100.00);
        const meuPagamento = servicoDePagamentos.consultarUltimoPagamento();

        // Assert
        assert.equal(meuPagamento.valor, 100.00);
        assert.equal(meuPagamento.categoria, 'padrao');
    });

    it('Deve lançar erro quando código de barras é vazio', function() {
        // Arrange
        const servicoDePagamentos = new ServicoDePagamentos();

        // Act & Assert
        assert.throws(
            () => servicoDePagamentos.pagar('', 'Empresa A', 50.00),
            Error,
            'Código de barras deve ser uma string não-vazia'
        );
    });

    it('Deve lançar erro quando código de barras é apenas espaços em branco', function() {
        // Arrange
        const servicoDePagamentos = new ServicoDePagamentos();

        // Act & Assert
        assert.throws(
            () => servicoDePagamentos.pagar('   ', 'Empresa A', 50.00),
            Error,
            'Código de barras deve ser uma string não-vazia'
        );
    });

    it('Deve lançar erro quando código de barras não é uma string', function() {
        // Arrange
        const servicoDePagamentos = new ServicoDePagamentos();

        // Act & Assert
        assert.throws(
            () => servicoDePagamentos.pagar(123456, 'Empresa A', 50.00),
            Error,
            'Código de barras deve ser uma string não-vazia'
        );
    });

    it('Deve lançar erro quando empresa é vazia', function() {
        // Arrange
        const servicoDePagamentos = new ServicoDePagamentos();

        // Act & Assert
        assert.throws(
            () => servicoDePagamentos.pagar('123456', '', 50.00),
            Error,
            'Empresa deve ser uma string não-vazia'
        );
    });

    it('Deve lançar erro quando empresa não é uma string', function() {
        // Arrange
        const servicoDePagamentos = new ServicoDePagamentos();

        // Act & Assert
        assert.throws(
            () => servicoDePagamentos.pagar('123456', 123, 50.00),
            Error,
            'Empresa deve ser uma string não-vazia'
        );
    });

    it('Deve lançar erro quando valor é negativo', function() {
        // Arrange
        const servicoDePagamentos = new ServicoDePagamentos();

        // Act & Assert
        assert.throws(
            () => servicoDePagamentos.pagar('123456', 'Empresa A', -50.00),
            Error,
            'Valor deve ser maior que zero'
        );
    });

    it('Deve lançar erro quando valor é zero', function() {
        // Arrange
        const servicoDePagamentos = new ServicoDePagamentos();

        // Act & Assert
        assert.throws(
            () => servicoDePagamentos.pagar('123456', 'Empresa A', 0),
            Error,
            'Valor deve ser maior que zero'
        );
    });

    it('Deve lançar erro quando valor não é um número', function() {
        // Arrange
        const servicoDePagamentos = new ServicoDePagamentos();

        // Act & Assert
        assert.throws(
            () => servicoDePagamentos.pagar('123456', 'Empresa A', 'cinquenta'),
            Error,
            'Valor deve ser um número válido'
        );
    });

    it('Deve lançar erro quando valor é NaN', function() {
        // Arrange
        const servicoDePagamentos = new ServicoDePagamentos();

        // Act & Assert
        assert.throws(
            () => servicoDePagamentos.pagar('123456', 'Empresa A', NaN),
            Error,
            'Valor deve ser um número válido'
        );
    });
});