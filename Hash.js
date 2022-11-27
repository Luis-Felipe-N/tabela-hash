class Hash {
    constructor(tamanho) {
      this.tabela = new Array(tamanho);
    }
  
    hash(chave) {
      return chave % 211
    }

    hash512(chave) {
      return m * (chave * (Math.sqrt(5) - 1) % 1)
    }
  
    /**
     * Função responsável por inserir um valor na tabela tratando as colisões.
     * - Se não tiver um elemento no mesmo index da tabela, apenas adiciona.
     * - Se tiver algum elemento, verifica se é diferente, se não for adiciona.
     */
    inserir(valor) {
      const index = this.hash(valor);
      const bucket = this.tabela[index];
  
      if (!bucket) {
        this.tabela[index] = [valor];
      } else {
        const temMesmoValor = bucket.find((item) => item === valor);
        if (!temMesmoValor) {
          bucket.push(valor);
        }
      }
    }
  
    /**
     * Função responsável por buscar o elemento na tabela hash.
     * - Pelo valor é possível gerar um hash para encontrar o index da lista de encadeamento.
     * - Depois procura na lista de encadeamento o valor.
     */
    busca(valor) {
      const index = this.hash(valor);
      const bucket = this.tabela[index];
      
      if (bucket) {
        const temMesmaChave = bucket.find((item) => item === valor);
        
        if (temMesmaChave) {
          return temMesmaChave;
        }
      }
      return undefined;
    }
  
    remover(valor) {
      let index = this.hash(valor);
      const bucket = this.tabela[index];
      if (bucket) {
        const temMesmoItem = bucket.find((item) => item === valor);
        if (temMesmoItem) {
          bucket.splice(bucket.indexOf(temMesmoItem), 1);
        }
      }
    }
  
    display() {
      for (let i = 0; i < this.tabela.length; i++) {
        if (this.tabela[i]) {
          console.log(i, this.tabela[i]);
        }
      }
    }
  }
  
  const tabela = new Hash();
  tabela.inserir(2);
  tabela.inserir(5);
  tabela.display();
  console.log('#################')
  tabela.inserir(211);
  tabela.display();
  console.log('#################')
  tabela.inserir(422);
  console.log(tabela.busca(422));
  tabela.display();
  tabela.remover(422);
  tabela.display();
  console.log('#################')
  