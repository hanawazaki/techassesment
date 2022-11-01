import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const CardContentCus = styled('div')({
  borderRadius: 4,
  boxShadow: 0,
});

const CardCust = styled('div')({
  boxShadow: 0,
});

const CardBook = ({ title, authors, image }) => {
  const [isFav, setIsFav] = useState(false);

  return (
    <div className='card'>
      <CardCust sx={{ maxWidth: 150 }}>
        <CardMedia
          component="img"
          image={image}
          alt={title}
        />
        <CardContentCus>
          <div className='content'>
            <Typography gutterBottom variant="h6" component="div">
              {title}
            </Typography>
            <span>
              <IconButton aria-label="add to favorites" edge={'start'} >
                {<FavoriteBorderIcon />}
              </IconButton>
            </span>
          </div>
          <Typography variant="body2" color="text.secondary">
            {authors.map((item, index) => {
              return (
                <label key={index}>{item}</label>
              )
            })}
          </Typography>
        </CardContentCus>
        <CardActions>

        </CardActions>
      </CardCust>
    </div >
  )
}

export default CardBook