import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchItemsIfNeeded } from '../actions/items';
import Search from '../components/Search';
import Results from '../components/Results';
import Loader from '../components/Loader';
import Logo from '../components/Logo';

import './layout.scss';

class AsyncApp extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { dispatch, searchStr } = this.props;
    dispatch(fetchItemsIfNeeded(searchStr));
  }

  handleChange(searchStr) {
    this.props.dispatch(fetchItemsIfNeeded(searchStr));
  }

  render() {
    const { searchStr, items, isFetching } = this.props;
    return (
      <div className="container">
        <header className="header">
          <Logo />
          <Search value={searchStr} onChange={this.handleChange} />
        </header>
        <section className="content">
          {isFetching && items.length === 0 &&
            <Loader />
          }
          {!isFetching && items.length === 0 &&
            <h2>No Results</h2>
          }
          {items.length > 0 &&
            <Results items={items} />
          }
          <div className="tagline">
            Built and designed by <a href="http://www.robbg.io">Rob BG</a> using React / Redux.&nbsp;
            <a href="https://github.com/robertbg/react-example">Source code on Github</a>.
            <svg className="tagline__logo" viewBox="0 0 115 50">
              <path
                className="logo__dot"
                strokeWidth="2"
                strokeMiterlimit="10"
                d="M105.9,44.8c0-0.8,0.3-1.5,0.9-2.1c0.6-0.6,1.3-0.9,2.1-0.9c0.8,0,1.5,0.3,2.1,
                0.9c0.6,0.6,0.9,1.3,0.9,2.1s-0.3,1.6-0.9,2.1c-0.6,0.6-1.3,0.9-2.1,0.9c-0.8,
                0-1.5-0.3-2.1-0.9C106.2,46.3,105.9,45.6,105.9,44.8z"
              />
              <path
                strokeWidth="2"
                strokeMiterlimit="10"
                d="M106,25.4c0.1,0.9,0.1,1.8,0.1,2.7c0,5.5-1.9,10.1-5.8,13.9c-3.8,3.8-8.5,
                5.7-13.9,5.7c-5.5,0-10.1-1.9-14-5.8c-3.8-3.8-5.8-8.5-5.8-14c0-5.4,1.9-10.1,
                5.8-13.9c3.8-3.8,8.5-5.8,14-5.8c3.9,0,7.6,1.1,10.9,3.2c3.2,2.1,5.5,4.9,7.1,
                8.4h-6c-2.9-4.2-6.9-6.3-12-6.3c-4,0-7.4,1.4-10.2,4.2c-2.8,2.8-4.2,6.2-4.2,10.1c0,
                4,1.4,7.4,4.2,10.2c2.8,2.8,6.2,4.2,10.2,4.2c3.5,0,6.5-1.1,9.2-3.3c2.7-2.2,4.3-5,
                4.9-8.4h-14v-5.3H106z"
              />
              <path
                strokeWidth="2"
                strokeMiterlimit="10"
                d="M25.6,3.1h5.3v11.4c3.9-4.1,8.7-6.2,14.3-6.2c5.5,0,10.1,1.9,14,5.8C63,18,64.9,
                22.6,64.9,28c0,5.5-1.9,10.1-5.8,14c-3.8,3.8-8.5,5.8-14,5.8c-5.4,
                0-10.1-1.9-13.9-5.8c-3.8-3.8-5.8-8.5-5.8-14V3.1z M35.1,17.9c-2.8,2.8-4.2,6.2-4.2,
                10.1c0,4,1.4,7.4,4.2,10.2c2.8,2.8,6.2,4.2,10.1,4.2c4,0,7.4-1.4,10.2-4.2S59.6,32,
                59.6,28c0-3.9-1.4-7.3-4.2-10.1c-2.8-2.8-6.2-4.2-10.2-4.2C41.3,13.7,37.9,15.1,35.1,
                17.9z"
              />
              <path
                strokeWidth="2"
                strokeMiterlimit="10"
                d="M4.2,28.4c0-5.4,1.9-10.1,5.8-13.9c3.8-3.9,8.5-5.8,13.9-5.8v5.4c-3.9,0-7.3,
                1.4-10.1,4.2c-2.8,2.8-4.2,6.2-4.2,10.2v19.3H4.2V28.4z"
              />
            </svg>
          </div>
        </section>
      </div>
    );
}
}

AsyncApp.propTypes = {
  searchStr: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
  isFetching: PropTypes.bool,
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  const { searchStr, itemsBySearchString } = state;
  const { isFetching, items } = itemsBySearchString[searchStr] || {
    searchStr,
    isFetching: true,
    items: [],
  };

  return {
    searchStr,
    items,
    isFetching,
  };
}

export default connect(mapStateToProps)(AsyncApp);