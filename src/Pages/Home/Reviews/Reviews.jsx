import React, { use } from 'react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// import './styles.css';
import ReviewCard from './ReviewCard';


const Reviews = ({reviewsPromise}) => {
    const reviews =use(reviewsPromise)
    return (
          
            <div>
                <h2 className='text-center text-secondary'>What our customers are sayings</h2>
                <p>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
        <div>
            <Swiper
            loop={true}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        slidesPerView={'3'}
        coverflowEffect={{
          rotate: 30,
          stretch: "50%",
          depth: 200,
          scale: 0.75,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Autoplay, Pagination]}
        className="mySwiper"
      >
        {
          reviews.map(review =><SwiperSlide>
          <ReviewCard review={review}></ReviewCard>
        </SwiperSlide>)
        }
      </Swiper>
        </div>
            </div>

    );
};

export default Reviews;