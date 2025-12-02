import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import amazon from '../../../assets/brands/amazon.png';
import amazonVector from '../../../assets/brands/amazon_vector.png';
import casio from '../../../assets/brands/casio.png';
import moonStar from '../../../assets/brands/moonstar.png';
import randstad from '../../../assets/brands/randstad.png';
import star from '../../../assets/brands/star.png';
import startPeople from '../../../assets/brands/start_people.png';

const brandLogos = [amazon, amazonVector, casio, moonStar, randstad, star, startPeople];

const Brands = () => {
    return (
            <>
      <Swiper
        slidesPerView={4}
        loop={true}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        modules={[Autoplay]}
        autoplay={{
          delay: 900,
          disableOnInteraction: false,
        }}
        // pagination={{
        //   clickable: true,
        // }}
        // modules={[Pagination]}
        // className="mySwiper"
      >
        {
            brandLogos.map((logo, index) => 
                <SwiperSlide key={index}>
                    <img src={logo} alt="" />
                </SwiperSlide>
            )
        }
        
      </Swiper>
    </>
    );
};

export default Brands;