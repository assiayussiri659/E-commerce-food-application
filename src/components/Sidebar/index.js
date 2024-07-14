import React, { useEffect, useState, useContext } from 'react';
import Radio from '@mui/material/Radio';
import { Button } from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import bannerImg from '../../assets/images/banner1.jpg';
import { Link, useParams } from 'react-router-dom';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

import { MyContext } from '../../App';

function valuetext(value) {
    return `${value}°C`;
}

const Sidebar = (props) => {
    const [value, setValue] = useState([100, 60000]);
    const [value2, setValue2] = useState(0);
    const [brandFilters, setBrandFilters] = useState([]);
    const [ratingsArr, setRatings] = useState([]);
    const [totalLength, setTotalLength] = useState([]);

    const context = useContext(MyContext);
    const { id } = useParams();

    useEffect(() => {
        if (props.data.length !== 0) {
            const lengthArr = props.data.map(item => item.items.reduce((acc, item_) => acc + item_.products.length, 0));
            const uniqueLengths = [...new Set(lengthArr)];
            setTotalLength(uniqueLengths);
        }
    }, [props.data]);

    useEffect(() => {
        if (props.currentCatData.length !== 0) {
            const brands = [...new Set(props.currentCatData.map(item => item.brand))];
            const ratings = [...new Set(props.currentCatData.map(item => parseFloat(item.rating)))];
            setBrandFilters(brands);
            setRatings(ratings);
        }
    }, [props.currentCatData]);

    useEffect(() => {
        if (props.currentCatData.length !== 0) {
            const maxPrice = Math.max(...props.currentCatData.map(item => parseInt(item.price.toString().replace(/,/g, ""), 10)));
            setValue2(maxPrice);
        }
    }, [props.currentCatData]);

    useEffect(() => {
        filterByPrice(value[0], value[1]);
    }, [value]);

    const filterByBrand = (keyword) => {
        props.filterByBrand(keyword);
    };

    const filterByRating = (keyword) => {
        props.filterByRating(parseFloat(keyword));
    };

    const filterByPrice = (minValue, maxValue) => {
        props.filterByPrice(minValue, maxValue);
    };

    return (
        <>
            <div className={`sidebar ${context.isOpenFilters ? 'open' : ''}`}>
                <div className='card border-0 shadow res-hide'>
                    <h3>Category</h3>
                    <div className='catList'>
                        {props.data.length !== 0 && props.data.map((item, index) => (
                            <Link key={index} to={`/cat/${item.cat_name.toLowerCase()}`}>
                                <div className='catItem d-flex align-items-center'>
                                    <span className='img'><img src='https://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/category-1.svg' alt='' width={30} /></span>
                                    <h4 className='mb-0 ml-3 mr-3 text-capitalize'>{item.cat_name}</h4>
                                    <span className='d-flex align-items-center justify-content-center rounded-circle ml-auto'>
                                        {totalLength[index]}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className='card border-0 shadow'>
                    <h3>Filter by price</h3>
                    <RangeSlider value={value} onInput={setValue} min={100} max={60000} step={5} />
                    <div className='d-flex pt-2 pb-2 priceRange'>
                        <span>From: <strong className='text-success'>Rs: {value[0]}</strong></span>
                        <span className='ml-auto'>To: <strong className='text-success'>Rs: {value[1]}</strong></span>
                    </div>

                    <div className='filters pt-5'>
                        <h5>Filter By Brand</h5>
                        <ul className='mb-0'>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                            >
                                {brandFilters.length !== 0 && brandFilters.map((item, index) => (
                                    <li key={index}>
                                        <FormControlLabel value={item} control={<Radio onChange={() => filterByBrand(item)} />} label={item} />
                                    </li>
                                ))}
                            </RadioGroup>
                        </ul>
                    </div>

                    <div className='filters pt-0'>
                        <h5>Filter By Ratings</h5>
                        <ul>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                name="radio-buttons-group"
                            >
                                {ratingsArr.length !== 0 && ratingsArr.map((item, index) => (
                                    <li key={index}>
                                        <FormControlLabel value={item} control={<Radio onChange={() => filterByRating(item)} />} label={item} />
                                    </li>
                                ))}
                            </RadioGroup>
                        </ul>
                    </div>

                    <div className='d-flex filterWrapper'>
                        <Button className='btn btn-g w-100' onClick={() => context.openFilters()}>
                            <FilterAltOutlinedIcon /> Filter
                        </Button>
                    </div>
                </div>

                <img src={bannerImg} alt='' className='w-100' />
            </div>
        </>
    );
};

export default Sidebar;
