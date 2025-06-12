import React, { useEffect, useState } from 'react'
import Navbar from '../components/NavBar/Navbar'
import Login from '../components/Modal/Login'
import Sell from '../components/Modal/Sell';
import Card from '../components/Card';
import { useItemContext } from '../components/Context/Item';
import { fetchFromFireStore } from '../utils/Firebase';
import Flyout from '../components/Flyout';
import { useLocation, useNavigate } from 'react-router-dom';


function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [openModalSell, setOpenModalSell] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')
  
  const navigate=useNavigate()
  const location =useLocation()

  const handleCategorySelect = (category) => {
    //  navigate('/', { state: { selectedCategory: category } });
    setSelectedCategory(category);
  };

  const toggleModalSell = () => {
    setOpenModalSell(!openModalSell)
  }

  const toggleModal = () => {
    setOpenModal(!openModal)
  }

  const itemCntx = useItemContext();
  console.log(itemCntx)
  useEffect(() => {
    const getItems = async () => {
      const datas = await fetchFromFireStore();
      itemCntx?.setItems(datas)


    }

    getItems()
  }, []);
  
useEffect(() => {
  if (location.state?.selectedCategory) {
    setSelectedCategory(location.state.selectedCategory);
  } else {
    setSelectedCategory('All'); // fallback default
  }
}, [location.state]);

  useEffect(() => {
    console.log('updated items: ', itemCntx.items)
  }, [itemCntx.items])

const filteredItems = !itemCntx.items
  ? []
  : selectedCategory === 'All'
  ? itemCntx.items
  : itemCntx.items.filter(item =>
      item.category?.toLowerCase() === selectedCategory.toLowerCase()
    );

  return (
    <>

     
      <div>
        
        <Navbar  toggleModal={toggleModal} toggleModalSell={toggleModalSell} />

        <Login toggleModal={toggleModal} status={openModal} />
        <Sell setItems={(itemCntx).setItems} toggleModalSell={toggleModalSell} status={openModalSell} />


         <Card items={filteredItems || []} />

      </div>
      

    </>
  )
}

export default Home