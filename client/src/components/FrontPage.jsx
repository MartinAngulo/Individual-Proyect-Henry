import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'; 
import styles from '../StyleSheets/FrontPage.module.css'
import {getAllCountries} from '../store/countriesShow';


function mapDispatchToProps(dispatch) {
  return {
    getAllCountries: () => dispatch(getAllCountries())
  };
}


class FrontPage extends Component {

  componentDidMount() {
    this.props.getAllCountries();
  }

  render() {
    return (
      <div className={styles.WaitName}>
        <h1>Estas en la Pagina Inicial</h1>
        <Link to={'/home'}>Iniciar App</Link>
      </div>
    );
  }
}

export default connect(null,mapDispatchToProps)(FrontPage);