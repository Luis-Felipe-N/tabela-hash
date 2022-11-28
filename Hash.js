
const prompts = require('prompts');
class Hash {
    constructor(tamanho) {
      this.tabela = new Array(tamanho);
      this.tipoHash = 0
    }
  
    hash(chave) {
      return this.tipoHash == 0 ? this.hash211(chave) : this.hash512(chave)
    }

    hash512(chave) {
      return m * (chave * (Math.sqrt(5) - 1) % 1)
    }

    hash211(chave) {
      return chave % 211
    }
  
    /**
     * Função responsável por inserir um valor na tabela tratando as colisões.
     * - Se não tiver elemento na lista de encadeamento, apenas adiciona.
     * - Se tiver algum elemento, verifica se é diferente, se não for adiciona.
     */
    inserir(valor) {
      const index = this.hash(valor);
      const bucket = this.tabela[index];
  
      if (!bucket) {
        this.tabela[index] = [{valor: valor, prox: null}];
      } else {
        const temMesmoValor = bucket.find((item) => item.valor === valor);
        if (!temMesmoValor) {
          const ultimoElemento = bucket[0]
          const elemento = {valor: valor, prox: ultimoElemento.valor}
          bucket.unshift(elemento);
        }
      }
    }
  
    /**
     * Função responsável por buscar o elemento da tabela hash.
     * - Pelo valor é possível gerar um hash para encontrar o index da lista de encadeamento.
     * - Depois procura na lista de encadeamento o valor.
     */
    busca(valor) {
      const index = this.hash(valor);
      const bucket = this.tabela[index];
      
      if (bucket) {
        const temMesmaChave = bucket.find((item) => item.valor === valor);
        
        if (temMesmaChave) {
          return temMesmaChave;
        }
      }
      return undefined;
    }
  
    /**
     * Função responsável por remover o elemento da tabela hash.
     * - Encontra a lista de encadeamento e procura o elemento dentro da lista retornando o index caso encontre
     * -  Se tiver um antecessor do elemento, o prox é passado para ele
     */
    remover(valor) {
      let index = this.hash(valor);
      const bucket = this.tabela[index];

      if (bucket) {
        const temOElemento = bucket.findIndex((item) => item.valor === valor);
        if (temOElemento >= 0) {
          if (temOElemento > 0) {
            bucket[temOElemento - 1].prox = bucket[temOElemento].prox
          }
          bucket.splice(temOElemento, 1);
        }
      }
    }
  
    display() {
      console.clear()
      console.table(this.tabela)
      for (let i = 0; i < this.tabela.length; i++) {
        if (this.tabela[i]) {
          console.log(i, this.tabela[i]);
        }
      }
    }

    async menu() {
      // • Escolha de qual função utilizar para inserir elementos na tabela hash;
      // • Inserção de um elemento na tabela hash;
      // • Remoção de um elemento na tabela hash;
      // • Busca de um elemento na tabela hash;
      // • Impressão da tabela hash
      let opcaoHash;
      for(;;) {  

        if (typeof opcaoHash === "undefined") {
          ({ opcaoHash } = await prompts({
            type: 'select',
            name: 'opcaoHash',
            message: 'Qual método hash?',
            choices: [
              { title: 'Divisão', value: 0 },
              { title: 'Multiplicação', value: 1 }
            ],
          }))
        }

        const { opcao } = await prompts({
          type: 'select',
          name: 'opcao',
          message: 'Escolha uma função: ',
          choices: [
            { title: 'Inserção', value: 0 },
            { title: 'Remoção', value: 1 },
            { title: 'Busca', value: 2 },
            { title: 'Impressão', value: 3 }
          ],
        })
      
        this.tipoHash = opcaoHash
        
        switch (opcao) {
          case 0:
            // Inserir
            const { valorInsersao } = await prompts({
              type: 'number',
              name: 'valorInsersao',
              message: 'Qual número deseja inserir?'
            });
          
            this.inserir(valorInsersao)
            break;
          case 1:
              // Remover
              const { valorRemocao } = await prompts({
                type: 'number',
                name: 'valorRemocao',
                message: 'Qual número deseja inserir?'
              });
            
              this.remover(valorRemocao)
              break;
          case 2:
            // Busca
            const { valorBusca } = await prompts({
              type: 'number',
              name: 'valorBusca',
              message: 'Qual número deseja inserir?'
            });
          
            console.log('Valor encontrado', this.busca(valorBusca))
            break;
          case 3:
            // Impressão
            this.display()
            break;
          default:
            break;
        }
      }
    }
  }
  
  const tabela = new Hash();
  tabela.menu()
  // tabela.inserir(2);
  // tabela.inserir(5);
  // tabela.display();
  // console.log('#################')
  // tabela.inserir(211);
  // tabela.display();
  // console.log('#################')
  // tabela.inserir(422);
  // console.log(tabela.busca(422));
  // tabela.display();
  // tabela.remover(422);
  // tabela.display();
  // console.log('#################')
  