import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select'
import Country from './Country';
import config from '../config/api';
import styles from '../StyleSheets/CountryShow.module.css'

export default function CountryShow() {

  const [cPage, setCpage] = useState(1);
  const [totalPages, setTotalPages] = useState(15);

  const countries = useSelector(state => state.countriesShow.countries);
  const searchResult = useSelector(state => state.countriesShow.search);
  const searchStatus = useSelector(state => state.countriesShow.searchStatus);
  const filters = useSelector(state => state.countriesShow.filters);
  const filterError = useSelector(state => state.countriesShow.filter_not_found);

  const handlePages = (e) => {
    setTotalPages(e.value);
  }

  const handlecurrentPage = (page) => {
    window.scrollTo(0,0);
    setCpage(page);
  }

  const searchPag = () => {
    return config.pagination(searchResult, totalPages)
  }
  const filterPag = () => {
    return config.pagination(filters, totalPages)
  }
  const countriesPag = () => {
    return config.pagination(countries, totalPages)
  }


  return (
    <div className={styles.container2}>
      <div className={styles.pages}>
        <div className={styles.nums}>
          {
            searchStatus === 'success'
              ?
              searchResult.length > 0
              && searchPag().map(e => (
                <button
                  key={e.page.current}
                  className={styles.btn}
                  onClick={() => handlecurrentPage(e.page.current)}
                  disabled={e.page.current === cPage ? true : false}
                >{e.page.current}</button>
              ))

              : filters.length > 0
                ? filterPag().map(e => (
                  <button
                    key={e.page.current}
                    className={styles.btn}
                    onClick={() => handlecurrentPage(e.page.current)}
                    disabled={e.page.current === cPage ? true : false}
                  >{e.page.current}</button>
                ))
                : !filterError
                && countriesPag().map(e => (
                  <button
                    key={e.page.current}
                    className={styles.btn}
                    onClick={() => handlecurrentPage(e.page.current)}
                    disabled={e.page.current === cPage ? true : false}
                  >{e.page.current}</button>
                ))
          }
        </div>
        <div className={styles.cpages}>
          <label style={{color:'white', fontWeight:'bold'}}>Countries/page:</label>
          <Select
            value={totalPages}
            placeholder='Select c/p'
            className={styles.total}
            options={config.pages}
            onChange={handlePages}
          />
        </div>
      </div>
      <div className={styles.container}>
        {
          searchStatus === 'success'
            ?
            (searchResult.length > 0
              ?
              searchPag()[cPage - 1].data.map(country => (
                <Country data={country} key={country.id} />))
              :
              <h1 className={styles.notFound}>Country not found</h1>)

            : filters.length > 0
              ?
              filterPag()[cPage - 1].data.map((e) => (<Country data={e} key={e.id} />))
              :
              (filterError
                ?
                (<h1 className={styles.notFound}>Countries not found</h1>)
                :
                countriesPag()[cPage - 1].data.map(country => (
                  <Country data={country} key={country.id} />)))

        }
      </div>
      <div className={styles.pages}>
        <div className={styles.nums}>
          {
            searchStatus === 'success'
              ?
              searchResult.length > 0
              && searchPag().map(e => (
                <button
                  key={e.page.current}
                  className={styles.btn}
                  onClick={() => handlecurrentPage(e.page.current)}
                  disabled={e.page.current === cPage ? true : false}
                >{e.page.current}</button>
              ))

              : filters.length > 0
                ? filterPag().map(e => (
                  <button
                    key={e.page.current}
                    className={styles.btn}
                    onClick={() => handlecurrentPage(e.page.current)}
                    disabled={e.page.current === cPage ? true : false}
                  >{e.page.current}</button>
                ))
                : !filterError
                && countriesPag().map(e => (
                  <button
                    key={e.page.current}
                    className={styles.btn}
                    onClick={() => handlecurrentPage(e.page.current)}
                    disabled={e.page.current === cPage ? true : false}
                  >{e.page.current}</button>
                ))
          }
        </div>
      </div>
    </div>
  )
}
