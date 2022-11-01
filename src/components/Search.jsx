import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { fontSize, styled } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          fontSize: '16px',
          fontFamily: "Lato",
        },
      },
    },
  },
});

export default function Search({ passValue, passInputValue }) {
  const [inputValue, setInputValue] = React.useState('');
  const [books, setBooks] = useState([])
  const [value, setValue] = React.useState(books[0]);
  const [catId, setCatId] = useState(1)
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)

  const getBooks = (categoryId, pageId, sizeId) => {
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
    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        setBooks(data)
      }).catch(err => console.log(err))
  }

  useEffect(() => {
    getBooks(catId, page, size)
  }, [catId]);

  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={2} sx={{ width: 400 }}>
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          value={value}
          onChange={(event, newValue) => {
            passValue(newValue);
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            passInputValue(newInputValue);
            setInputValue(newInputValue);
          }}
          options={books.map((option) => option.title)}
          renderInput={(params) => <TextField {...params} label="Search book or author" />}
        />
      </Stack>
    </ThemeProvider>
  );
}