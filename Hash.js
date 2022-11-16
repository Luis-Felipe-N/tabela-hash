class Hash {
    constructor() {
        this.tamanho = 211
        this.tabela = new Array()
    }

    hash(key) {
        return key % this.tamanho
    }

    inserir(key, valor) {

    }

    remove(key) {
        const index = this.hash(key)
        this.tabela[index] = undefined
    }
}