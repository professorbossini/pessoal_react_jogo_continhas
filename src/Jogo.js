import React, { Component } from 'react';
import { Button } from 'primereact/button'
import _ from 'underscore'
export default class Jogo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // coleção para armazenar as alternativas
      alternativas: Array(5).fill(undefined),
      // tempo de duração da exibição de cada desafio
      intervaloAtualizacao: 5000,
      //valor inicial do intervalo dentro do qual os valores serão gerados
      valorInicial: 1,
      //valor final do intervalo dentro do qual os valores serão gerados
      valorFinal: 10,
      //variável que controla o tempo que resta para o usuário resolver o desafio exibido atualmente.
      tempoRestante: 5
    }
  }
  
  timerGeral = null
  timerSegundoASegundo = null
  
  operacoes = [
    {simbolo: '+', operacao: (a, b) => a + b},
    {simbolo: '-', operacao: (a, b) => a - b},
  ]

  gerarConta = () => {
    let n1 = Math.floor (Math.random() * this.state.valorFinal) + this.state.valorInicial;
    let n2 = Math.floor (Math.random() * this.state.valorFinal) + this.state.valorInicial;
    let oQueFazer = Math.floor(Math.random ()* this.operacoes.length)
    let simbolo = this.operacoes[oQueFazer]['simbolo'] 
    let resultado = this.operacoes[oQueFazer]['operacao'](n1, n2)
    return {n1, n2, simbolo, resultado}
  }

  gerarAlternativas = (resultado) => {
    let aux = [resultado]
    while (aux.length < 5){
      let n = Math.floor (Math.random() * this.state.valorFinal) + this.state.valorInicial
      if (!aux.includes(n))
        aux.push(n)
    }
    return aux
  }

  gerarJogo = () => {
    // this.setState({
    //   tempoRestante: 5
    // })
    let {n1, n2, simbolo, resultado} = this.gerarConta()
    let alternativas = this.gerarAlternativas(resultado)
    this.setState({
      n1, n2, simbolo, resultado, alternativas: _.shuffle(alternativas), tempoRestante: 5
    })
    
  }
  

  iniciarRodada = () => {
  
    // encerramos a execução dos dois timers
    clearInterval(this.timerGeral)
    clearInterval(this.timerSegundoASegundo)
    //uma função para registrar o timer das rodadas
    //ela dispara a geração do jogo imediatamente e agenda as demais
    //o timer segundo a segundo também é iniciado aqui
    let fire = (f, t) => {
      f()
      this.timerSegundoASegundo = setInterval(() => {
        this.setState({tempoRestante: this.state.tempoRestante - 1})
      },1000);
      return setInterval(f, t)
    }
    this.timerGeral = fire(this.gerarJogo, this.state.intervaloAtualizacao)
    
    
  }

  encerrar = () => {
    clearInterval(this.timerGeral)
    clearInterval(this.timerSegundoASegundo)
  }


  componentWillUnmount(){   
    this.encerrar()
  }

  componentDidMount(){
    //passado pelo componente principal
    if (this.props.status === 'on')
      this.iniciarRodada()
  }


  render() {
    const conta = (
      <div>
        <div className={styles.conta}>
          <div className={styles.valor}>{this.state.n1}</div>
          <div className={styles.valor}>{this.state.simbolo}</div>
          <div className={styles.valor}>{this.state.n2}</div>
          <div className={styles.valor}>=</div>
          <div className={styles.valor}>...</div>
        </div>
        </div>
    )
    const alternativas = (
        <div className={styles.alternativas}>
          {this.state.alternativas.map((alternativa, indice) => (
            <Button 
              key={indice} 
              className={`${styles.valor} ${styles.alternativa}`} label={alternativa?.toString()}
              onClick={() => {
                this.iniciarRodada()
                this.props.fAtualizarPontuacao(this.state.resultado === alternativa)}
              }
            />
          ))}          
        </div>
    )
    const tempoRestante = (

        <div className={styles.tempoRestante}>
          {this.state.tempoRestante}
        </div>
    )
      
    return (
      <div>
        {conta}
        {alternativas}
        {tempoRestante}
      </div>
    )
  }
}

//fora da classe
const styles = {
  // centraliza, borda, background laranja, sombra, altura
  conta:
    'flex justify-content-center align-items-center border-round bg-orange-200 shadow-2 h-4rem',
    // centraliza, espaçamento uniforme, borda, sombra, altura margin top
  alternativas:
    'flex justify-content-evenly align-items-center border-round shadow-2 h-4rem mt-2',
    // centraliza borda, altura e largura iguais
  valor:
    'flex justify-content-center align-items-center border-round border-1 border-400  h-3rem w-3rem',
    // outline no botão
  alternativa:
  'p-button-outlined',
  // centraliza, altura, tamanho da fonte
  tempoRestante:
    'flex justify-content-center align-items-center h-4rem text-3xl'
};
