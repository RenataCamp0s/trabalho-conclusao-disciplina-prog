## Trabalho de Conclusao da Disciplina de Programacao para Automacao de Testes

Crie uma classe que possua dois métodos: um para realizar pagamento e outro para consultar o último pagamento. Pagamentos serão armazenados como objetos Javascript dentro de uma lista de pagamentos. Cada pagamento terá as propriedades: Código de Barras, Empresa e Valor. Quando um pagamento for realizado e o valor for maior que 100.00, o pagamento também terá a propriedade categoria como 'cara', caso contrário, a propriedade categoria ficará como 'padrão'. O método de consultar trará apenas o último pagamento.
  
  ex. 
  const servicoDePagamento = new ServicoDePagamento();
  servicoDePagamento.pagar('0987-7656-3475', 'Samar', 156.87);
  console.log(servicoDePagamento.consultarUltimoPagamento());
  {
     codigoBarras: '0987-7656-3475',
     empresa: 'Samar',
     valor: 56.87,
     categoria: 'cara'
  }


---

## CI Pipeline - GitHub Actions - Conclusao da Disciplina de Integracao Continua

### Visão Geral

Este projeto utiliza **GitHub Actions** para automatizar a execução de testes e geração de relatórios. O pipeline está configurado no arquivo [.github/workflows/ci-projeto.yaml](.github/workflows/ci-projeto.yaml).

### Como Funciona

O workflow é acionado em três situações:

1. **Manualmente** (`workflow_dispatch`): Executa os testes sob demanda com um clique
2. **Agendado** (`schedule`): Executa automaticamente todos os dias à meia-noite (UTC)
3. **Push para main** (`push`): Executa os testes sempre que há alterações na branch principal

### Fluxo do Pipeline

```
1. Checkout do repositório
   ↓
2. Instalação do Node.js (v24.x)
   ↓
3. Instalação de dependências (npm install)
   ↓
4. Execução dos testes com Mocha + Mochawesome
   ↓
5. Upload dos relatórios como artefatos
```

### Tecnologias Utilizadas

#### **Mocha**
- Framework de teste JavaScript
- Executa os testes
- Suporta múltiplos relatorios (formas de exibir resultados)

#### **Mochawesome**
- Reporter visual para Mocha
- Gera dois tipos de saída:
  - **report.html**: Relatório interativo e visual em navegador
  - **report.json**: Dados estruturados em JSON

### Steps do Workflow

| Step | Descrição |
|------|-----------|
| **Checkout repository** | Clona o repositório para o ambiente de execução |
| **Install Node.js** | Instala Node.js v24.x necessário para rodar JavaScript |
| **Install dependencies** | Executa `npm install` para instalar Mocha e Mochawesome |
| **Run unit tests** | Executa testes com Mocha usando Mochawesome como reporter |
| **Upload test reports** | Salva os relatórios (HTML e JSON) como artefatos do workflow |

### Comando de Testes Detalhado

```bash
mkdir -p test-reports && npx mocha \
  --reporter mochawesome \
  --reporter-options reportDir=test-reports,reportFilename=report.html,html=true,json=true
```

**Explicação:**
- `mkdir -p test-reports`: Cria diretório para armazenar relatórios
- `--reporter mochawesome`: Usa Mochawesome para gerar relatório
- `reportDir=test-reports`: Salva os relatórios neste diretório
- `reportFilename=report.html`: Nome do arquivo HTML
- `html=true`: Gera relatório em HTML
- `json=true`: Gera também um JSON com os dados dos testes

### Artefatos Gerados

Após cada execução, os seguintes artefatos são disponibilizados:

- **test-reports/report.html**: Relatório visual (confira no navegador)
- **test-reports/report.json**: Dados estruturados dos testes
- **test-reports/assets/**: Recursos visuais do relatório (CSS, JS, etc)

### Configurações Importantes

#### Always Upload (if: always())
```yaml
if: always()
```
- Garante upload do relatório **mesmo se os testes falharem**
- Importante para análise de problemas

#### Retenção de Artefatos
```yaml
retention-days: 30
```
- Mantém os relatórios por 30 dias
- Economiza espaço no GitHub

