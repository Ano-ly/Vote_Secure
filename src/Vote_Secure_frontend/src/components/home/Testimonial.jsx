import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 

import rbiometric from '/assets/RBiometric.webp';
import reviewpic from '/assets/ReviewPic.webp';
import arrow_s_left from '/assets/Arrow_S_left.webp';
import arrow_s_right from '/assets/Arrow_S_Right.webp';


const Testimonial = () => {
  const sliderRef = useRef(null); // Ref to control the Slider instance

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0px", // Reduce padding for a tighter look
    slidesToShow: 3, // Show 3 cards
    speed: 500,
    responsive: [
      {
        breakpoint: 768, // Mobile view
        settings: {
          slidesToShow: 1,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 1024, // Tablet view
        settings: {
          slidesToShow: 1,
          centerPadding: "20px",
        },
      },
    ],
  };

  const items = [
    { key: '1', image: reviewpic, name: 'Emily Kim', school: 'Oau Elections' },
    { key: '2', image: reviewpic, name: 'John Doe', school: 'Uni XYZ' },
    { key: '3', image: reviewpic, name: 'Jane Smith', school: 'ABC Institute' },
    { key: '4', image: reviewpic, name: 'Michael Lee', school: 'LMN University' },
  ];

  function Card(props) {
    return (
      <div className="card card1 bg-card_bg bg-opacity-10 p-6 rounded-md border-2 border-white flex flex-col transition-transform duration-300 ease-in-out">
        <div className="flex justify-between">
          <div className="flex items-baseline gap-2">
            <img className="w-1/3" src={props.image} alt='' />
            <p className="font-bold text-sm">{props.name}</p>
          </div>
          <div className="w-1/12">
            <img className="w-full" src={rbiometric} alt="favicon" />
          </div>
        </div>
        <div>
          <p className="lg:text-base text-xs">
            "The best way to vote on campus! <br /> As a busy student, it’s hard to find time to vote. Vote Secure let <br /> me participate in the election without interrupting my schedule. It’s <br /> the future of voting for students.”
          </p>
        </div>
        <div className="text-right sm:text-sm lg:text-base">
          <p>{props.school}</p>
        </div>
      </div>
    );
  }

  const scrollLeft = () => {
    sliderRef.current.slickPrev(); // Trigger slick slider previous action
  };

  const scrollRight = () => {
    sliderRef.current.slickNext(); // Trigger slick slider next action
  };

  return (
    <div className="flex flex-col bg-main_bg_color gap-5 items-center text-white text-opacity-40 hide-scrollbar">
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-4xl font-bold gradient-text">Testimonial</h1>
        <p className="text-center lg:text-xl text-xs p-4">
          We believe that our work speaks for itself, but don’t just take our word for it. <br /> Here’s what our clients have to say about their experience with us.
        </p>
      </div>

      {/* React Slick Slider */}
      <div className="w-full">
        <Slider ref={sliderRef} {...settings}>
          {items.map((card) => (
            <div key={card.key} className="flex justify-center">
              <Card image={card.image} name={card.name} school={card.school} />
            </div>
          ))}
        </Slider>
      </div>

      {/* Navigation buttons */}
      <div className='w-full flex items-center justify-center gap-4'>
        <button onClick={scrollLeft}>
          <img className='lg:w-3/5 w-2/5' src={arrow_s_left} alt="Scroll Left" />
        </button>
        <button onClick={scrollRight}>
          <img className='lg:w-3/5 w-2/5' src={arrow_s_right} alt="Scroll Right" />
        </button>
      </div>
    </div>
  );
};

export default Testimonial;
