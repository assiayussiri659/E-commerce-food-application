import React, { useEffect, useState, useContext } from 'react';
import './style.css';
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { MyContext } from '../../App';

const Product = (props) => {
    const [productData, setProductData] = useState();
    const [isAdded, setIsAdded] = useState(false);
    const context = useContext(MyContext);

    useEffect(() => {
        setProductData(props.item);
    }, [props.item]);

    const setProductCat = () => {
        if (productData) {
            sessionStorage.setItem('parentCat', productData.parentCatName);
            sessionStorage.setItem('subCatName', productData.subCatName);
        }
    };

    const addToCart = (item) => {
        context.addToCart(item);
        setIsAdded(true);
    };

    return (
        <div className='productThumb' onClick={setProductCat}>
            {props.tag && <span className={`badge ${props.tag}`}>{props.tag}</span>}
            {productData && (
                <>
                    <Link to={`/product/${productData.id}`}>
                        <div className='imgWrapper'>
                            <div className='p-4 wrapper mb-3'>
                                <img
                                    src={`${productData.catImg}?im=Resize=(420,420)`}
                                    className='w-100'
                                    alt={productData.productName}
                                />
                            </div>

                            <div className='overlay transition'>
                                <ul className='list list-inline mb-0'>
                                    <li className='list-inline-item'>
                                        <a className='cursor' title="Add to Wishlist">
                                            <FavoriteBorderOutlinedIcon />
                                        </a>
                                    </li>
                                    <li className='list-inline-item'>
                                        <a className='cursor' title="Compare">
                                            <CompareArrowsOutlinedIcon />
                                        </a>
                                    </li>
                                    <li className='list-inline-item'>
                                        <a className='cursor' title="Quick View">
                                            <RemoveRedEyeOutlinedIcon />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Link>

                    <div className='info'>
                        <span className='d-block catName'>{productData.brand}</span>
                        <h4 className='title'>
                            <Link to={`/product/${productData.id}`}>
                                {productData.productName.length > 50
                                    ? `${productData.productName.substr(0, 50)}...`
                                    : productData.productName}
                            </Link>
                        </h4>
                        <Rating
                            name="half-rating-read"
                            value={parseFloat(productData.rating)}
                            precision={0.5}
                            readOnly
                        />
                        <span className='brand d-block text-g'>
                            By <Link className='text-g' to={`/brand/${productData.brand}`}>{productData.brand}</Link>
                        </span>

                        <div className='d-flex align-items-center mt-3'>
                            <div className='d-flex align-items-center w-100'>
                                <span className='price text-g font-weight-bold'>
                                    Rs {productData.price}
                                </span>
                                <span className='ml-auto'>
                                    <Button className='btn-g addToCart' onClick={() => addToCart(productData)} disabled={isAdded}>
                                        {isAdded ? 'Added' : 'Add to Cart'} <ShoppingCartOutlinedIcon />
                                    </Button>
                                </span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Product;
