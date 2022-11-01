import React, { useState, useEffect } from 'react'
import Pill from '../components/Pill'
import Search from '../components/Search'
import '../css/Home.css'
import Card from '../components/CardBook';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/system';

const CardCus = styled('div')({
  color: 'darkslategray',
  backgroundColor: 'aliceblue',
  borderRadius: 4,
  margin: 10,
});

const Home = () => {
  const [search, setSearch] = useState('')
  const [categories, setCategories] = useState([])
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [catId, setCatId] = useState(1)
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)
  const [PageCount, setPageCount] = useState(1)

  const [pillIcon, setPillIcon] = useState([
    { icon: 'border_all', catname: 'All', link: '/all' },
    { icon: 'sentiment_very_satisfied', catname: 'Happiness & Mindfulness', link: '/happiness-mindfulness' },
    { icon: 'work', catname: 'Career & Business', link: '/career-business' },
    { icon: 'productivity', catname: 'Productivity & Time Management', link: '/all' },
    { icon: 'gavel', catname: 'Society & Politics', link: '/all' },
    { icon: 'payments', catname: 'Investment & Finance', link: '/all' },
  ]);


  const getCategories = () => {
    categories.push(pillIcon)

    fetch('https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-categories',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'no-cors': true,
          'Access-Control-Allow-Origin': '*',
        }
      })
      .then(res => res.json())
      .then(data => {
        setCategories(data)
      }).catch(err => console.log(err))
  }

  const handleChangePage = (value, categoryId, pageId, sizeId) => {
    const url = `https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-books?categoryId=${catId}&page=${page}&size=${size}`,
      options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'no-cors': true,
          'Access-Control-Allow-Origin': '*',
        }
      }
    setLoading(true)
    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        setBooks(data)
        let totalData = data.length()
        let pagecount = Math.ceil(totalData / 10)
        setPageCount(pagecount)
        setLoading(false)
      }).catch(err => console.log(err))
  }

  const getBooks = (categoryId, pageId, sizeId, search) => {
    const url = `https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-books?categoryId=${catId}&page=${page}&size=${size}`,
      options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'no-cors': true,
          'Access-Control-Allow-Origin': '*',
        }
      }
    setLoading(true)
    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        if (search !== '') {
          let filtered = data.filter((item) => {
            return item.title.toLowerCase().includes(search.toLowerCase())
          })
          setBooks(filtered)
        } else {
          setBooks(data)
        }

        let totalData = data.length
        let pagecount = Math.ceil(totalData / 10)
        setPageCount(pagecount)

        setLoading(false)
      }).catch(err => console.log(err))
  }

  const passparam = (data) => {
    setCatId(data)
  }

  const passInputValue = (data) => {
    setSearch(data)
  }

  const passValue = (data) => {
    setSearch(data)
  }

  useEffect(() => {
    getCategories()

    getBooks(catId, page, size, search)
  }, [catId, search]);

  return (
    <section className='home'>
      <div className="search">
        <Search books={books} passValue={passValue} passInputValue={passInputValue} />
      </div>
      <div className="categories">
        <h1>Kategori</h1>
        <div className="row-categories">
          {categories.map((item, index) => {
            return (
              <Pill key={index} icon={item.icon} catname={item.name} id={item.id} passparam={passparam} />
            )
          })}
        </div>
      </div>
      <section className='list-books'>
        <div className='books'>
          {books.map((item, index) => {
            return (
              <Card key={index} title={item.title} authors={item.authors} image={item.cover_url} />
            )
          })}
        </div>
        <div className='pagination'>
          <Stack spacing={2} mt={10}>
            <Pagination
              count={PageCount}
              color="primary"
              onChange={(e, value) => handleChangePage(value)}
            />
          </Stack>
        </div>
      </section>
    </section>
  )
}


export default Home