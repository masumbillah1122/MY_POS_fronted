import React, { useState, useEffect } from "react";
import LayoutApp from '../../components/Layout';
import axios from 'axios';
import { Row, Col } from 'antd';
import Product from './../../components/Product';
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();

  const [productData, setProductData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('pizzas');

  const categories = [
    {
      name: "pizzas",
      imageUrl:
        "https://toppng.com/uploads/preview/pizza-png-11553999296wkku2v8cnm.png",
    },
    {
      name: "burgers",
      imageUrl:
        "https://images.unsplash.com/photo-1625683257212-116d74981941?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJ1cmdlciUyMHBuZ3xlbnwwfHwwfHw%3D&w=1000&q=80",
    },
    {
      name: "drinks",
      imageUrl:
        "https://png.pngtree.com/png-clipart/20210418/original/pngtree-two-glasses-of-cocktail-drinks-png-image_6240890.jpg",
    },
  ];

    useEffect(() => {
        const getAllProducts = async () => {
          try {
            dispatch({
              type: "SHOW_LOADING",
            });
                const { data } = await axios.get('/api/products/getproducts');
            setProductData(data);
             dispatch({
               type: "HIDE_LOADING",
             });
            } catch (error) {
                console.log(error);
            }
        };
        getAllProducts();
    }, [dispatch]);
  return (
    <LayoutApp>
      <div className="category">
        {categories.map((category) => (
          <div key={category.name} className={`categoryFlex ${selectedCategory === category.name && 'category-active'}`} onClick={() => setSelectedCategory(category.name)}>
            <h3 className="categoryName">{category.name}</h3>
            <img src={category.imageUrl} alt={category.name} height={ 60 } width={ 60 } />
          </div>
        ))}
      </div>
      <Row>
        {productData.filter((i)=> i.category === selectedCategory).map((product) => (
          <Col xs={24} sm={6} md={12} lg={6}>
            <Product key={product.id} product={product} />
          </Col>
        ))};
      </Row>
    </LayoutApp>
  );
}

export default Home
