import React from 'react';
import s from './featuredjobposts.module.scss';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { Scrollbar } from 'swiper';

const FeaturedJobPosts = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <Swiper
          slidesPerView={'auto'}
          centeredSlides={true}
          spaceBetween={30}
          grabCursor={true}
          modules={[Scrollbar]}
          className={s.swiper}
          scrollbar={{
            el: '.swiper-scrollbar',
            hide: true,
          }}
        >
          {data.map((item, idx) => (
            <SwiperSlide key={idx} className={s.slide}>
              <div className={s.card}>Slide {idx}</div>
            </SwiperSlide>
          ))}
          <div className="swiper-scrollbar"></div>
        </Swiper>
      </div>
    </div>
  );
};

export default FeaturedJobPosts;
