import React from 'react';
import s from './home.module.scss';
import Hero from '@/scenes/Home/Hero';
import Testimonials from '@/scenes/Home/Testimonials';
import TrustedBy from '@/scenes/Home/TrustedBy';
import FrequentAskedQuestions from '@/scenes/Home/FrequentAskedQuestions';
import SetUpAccount from '@/scenes/Home/SetUpAccount';
import PostIt from '@/scenes/Home/PostIt';
import FeaturedJobPosts from '@/scenes/Home/FeaturedJobPosts';

const Home = () => {
  return (
    <div className={s.container}>
      <Hero />
      {/*<FeaturedJobPosts />*/}
      <Testimonials />
      <PostIt />
      <TrustedBy />
      <FrequentAskedQuestions />
      <SetUpAccount />
    </div>
  );
};

export default Home;
