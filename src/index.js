import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

import Cartao from './Cartao';
import Mensagem from './Mensagem';
import Botoes from './Botoes';
import Jogo from './Jogo';
import GraficoLinha from './GraficoLinha';

export default class App extends Component {
  state = {
    // jogo iniciado ou não?
    status: 'off',
    //número de acertos
    acertos: 0,
    //número de erros
    erros: 0,
    //número de tentativas
    contador: 0
  }
  alterarStatus = (status) => {
    this.setState({ status });
  };
  atualizarPontuacao = (acertou) => {
    this.setState(
      acertou
        ? { acertos: this.state.acertos + 1, contador: this.state.contador + 1}
        : { erros: this.state.erros + 1, contador: this.state.contador + 1}
    );
  };

  zerarPontuacao = () => {
    this.setState({
      acertos: 0,
      erros: 0,
    });
  };
    render() {
    return (
        //grid conteúdo centralizado horizontalmente
      <div className='grid justify-content-center'>
        {/*12 colunas. 6 para telas grandes  */}
        <div className='col-12 lg:col-6'>
        {/* altura */}
          <Cartao className='h-18rem'>
          {/* garantindo altura para alternar entre mensagem e jogo */}
            <div className='h-12rem'>
              {this.state.status === 'on' ? (
                  <Jogo
                    status={this.state.status}
                    fAtualizarPontuacao={this.atualizarPontuacao}
                  />
                ) : (
                  <div className='flex align-items-center h-full justify-content-center'>
                    <Mensagem texto='Clique para iniciar' className='w-6' />
                  </div>
                )}
            </div>
            <Botoes 
              fIniciar={() => this.alterarStatus('on')}
              fEncerrar={() => this.alterarStatus('off')}
              fZerar={() => this.zerarPontuacao()}
            />
            {/* comentar */}
            {/* {`Acertos: ${this.state.acertos}`}
            {`Erros: ${this.state.erros}`} */}
          </Cartao>
        </div>
        {/* 12 colunas. 6 para telas grandes */}
        <div className='col-12 lg:col-6'>
          <Cartao 
            titulo="Sua pontuação"
            // altura igual à do outro
            className='h-18rem'>
            <GraficoLinha 
                  acertos={this.state.acertos}
                  erros={this.state.erros}
                  contador={this.state.contador}
                  zerar={(!this.state.acertos && !this.state.erros)}
                  />
          </Cartao>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
