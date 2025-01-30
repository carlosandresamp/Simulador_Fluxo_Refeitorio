# Simulador_Fluxo_Refeitorio
 Sistema de simulação que modela o fluxo de alunos em um refeitório universitário, permitindo a configuração de parâmetros operacionais e a análise estatística dos resultados para entender gargalos, eficiência e tempo médio de atendimento.

# Descrição Detalhada do Funcionamento do Refeitório

O refeitório opera em etapas sequenciais, com regras de controle de fluxo e limites físicos:

## 1. Fila Externa
- **Capacidade**: Sem limite de capacidade.
- **Objetivo**: Alunos aguardam para acessar a catraca.
- **Controle de Entrada**: A entrada na fila externa é determinada por uma distribuição configurável (normal, logarítmica ou linear) dentro do intervalo **IAR**.

## 2. Catraca
- **Função**: Controla o acesso à fila interna.
- **Operação**:
  - Cada aluno digita sua matrícula, levando em média **TMDM** segundos.
  - Bloqueia a entrada se a fila interna atingir o limite máximo **LFI**.
  - Libera novamente quando a fila interna reduz **QAL** alunos.

## 3. Fila Interna
- **Capacidade**: Máxima definida por **LFI**.
- **Objetivo**: Alunos aguardam para serem atendidos pelos funcionários.
- **Controle**:
  - Se todas as mesas estiverem ocupadas (**LM**), o atendimento é pausado até que uma mesa seja liberada.

## 4. Atendimento (Funcionários)
- **Função**: Servir comida aos alunos.
- **Operação**:
  - Servem a comida em um tempo médio de **TMPSC** segundos por aluno.
  - Atendimento ocorre apenas se houver mesas disponíveis.

## 5. Mesas
- **Capacidade**: Máxima definida por **LM**.
- **Operação**:
  - Cada aluno ocupa uma mesa por **TMPNM** segundos.
  - Após esse tempo, a mesa é liberada automaticamente.
