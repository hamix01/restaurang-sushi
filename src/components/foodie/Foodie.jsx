import React, {useEffect, useState} from 'react'
import {Spinner} from 'react-bootstrap'
import {fetchCategories, fetchItems, fetchRestaurantOptions} from '../../helpers/ApiManager'
import Container from '../Container'
import Loading from '../Loading'
import ItemBrowser from './ItemBrowser'

function Foodie() {

  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getItems = async () => {
    let categories = await fetchCategories();
    categories = categories?.data;
    const res = await fetchItems();
    let data = res.data;
    let categoriesItems = []
    
    categories.forEach(category => {
      let items = data.filter(item => item.item_category_id === category.id)
      categoriesItems.push({
        category: category.name,
        items: items
      })
    })

    let itemsWithoutCategory = data.filter(item => item.item_category_id === null)
    categoriesItems.push({
      category: 'No category',
      items: itemsWithoutCategory
    });

    setItems(categoriesItems);
    setIsLoading(false);
  }

  

  useEffect(() => {
    document.title = `Lifli Sushi - Beställ`;
    getItems();
  }, [])

  return (
    <Container>
      {isLoading ? <Loading /> : <ItemBrowser items={items} />}
    </Container>
  )
}

export default Foodie