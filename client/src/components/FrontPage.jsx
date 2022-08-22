import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from '../StyleSheets/FrontPage.module.css'
import { getAllCountries } from '../store/countriesShow';
import LoadingPage from './LoadingPage';


function mapDispatchToProps(dispatch) {
  return {
    getAllCountries: () => dispatch(getAllCountries())
  };
}

class FrontPage extends Component {

  constructor(props) {
    super(props);
    this.state = { load: false }
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.props.getAllCountries();
  }
  handleClick() {
    this.setState(state => state.load = true);
  }

  render() {
    return (
      <div className={styles.container} >
        {this.state.load ? <LoadingPage url={'/home'} />
          : <>
            {/* <h1>Welcome to Country's App </h1> */}
            <i className={styles.welcome}></i>
            <p className={styles.start} onClick={this.handleClick}></p>
            <span className={styles.by}>By: Martin Angulo</span>
          </>}
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(FrontPage);