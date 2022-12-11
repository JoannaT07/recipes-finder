import {useEffect} from 'react';
import axios from 'axios';

type Props = {}

export const Recipes = (props: Props) => {
    useEffect(() => {
        const options = {
          method: 'GET',
          url: 'https://tasty.p.rapidapi.com/recipes/list',
          params: {from: '0', size: '20', tags: 'under_30_minutes'},
          headers: {
            'X-RapidAPI-Key': '05eca59d77msh08269870e87fa7cp18d311jsn203a1d285d2b',
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
          }
        };
        
        axios.request(options).then(function (response) {
            console.log(response.data.results);
        }).catch(function (error) {
            console.error(error);
        });
    })
    
  return (
    <div>Recipes</div>
  )
}