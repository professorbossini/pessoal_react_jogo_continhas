import React, { Component } from 'react';
import { Card } from 'primereact/card';
export default class Cartao extends Component {
  render() {
    return (
      <Card title={this.props.titulo} style={styles.card}>
        <div className={`${styles.inner} ${this.props.className}`}>{this.props.children}</div>
      </Card>
    );
  }
}

const styles = {
  card: {
    backgroundColor: 'var(--blue-100)',
  },
  inner: 'border-round bg-orange-50 w-8 p-2 m-auto',
};

Cartao.defaultProps = {
    titulo: 'Resolva a continha se puder!'
}
