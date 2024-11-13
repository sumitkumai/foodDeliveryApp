import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Slidebar = ({ searchData, setSearchData }) => {

  const onChange = (e) => {
    setSearchData(e.target.value);
  }

  return (
    <div className="relative w-full h-60 md:h-80 lg:h-[400px] overflow-hidden">
      <Carousel 
        infiniteLoop 
        autoPlay 
        showStatus={false} 
        showArrows={false} 
        showThumbs={false} 
        interval={3000}
      >
        <div>
          <img src='https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg' alt='image1' className="w-full h-full object-cover" />
        </div>

        <div>
          <img src='https://img.freepik.com/free-photo/close-up-hamburgers-cutting-board_23-2148262994.jpg?t=st=1729918756~exp=1729922356~hmac=7f6c4125b61a8d229a33b23b8db082c40c432fcb7fb26cb6e87042911b0f4aac&w=996' alt='image2' className="w-full h-full object-cover" />
        </div>

        <div>
          <img src='https://images.pexels.com/photos/1640775/pexels-photo-1640775.jpeg' alt='image3' className="w-full h-60 md:h-80 lg:h-[400px] object-cover" />
        </div>

        <div>
          <img src='https://kauveryhospital.com/blog/wp-content/uploads/2021/04/pizza-5179939_960_720-1200x545_c.jpg' alt='image4' className="w-full h-60 md:h-80 lg:h-[400px] object-cover" />
        </div>
      </Carousel>

      <div className="absolute inset-x-14 inset-y-8 md:inset-y-10 lg:inset-y-12 flex items-end">
        <input 
          type="search" 
          placeholder="Search Your Food" 
          className="pl-2 pr-2 outline-none rounded-md w-full" 
          value={searchData} 
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default Slidebar;
