import React from "react";
import culture from '../images/culture.jpg';
import culture1 from '../images/culture1.jpg';
import culture2 from '../images/culture2.jpg';
import culture3 from '../images/culture3.jpg';
import culture4 from '../images/culture4.jpg';
import culture5 from '../images/culture5.jpg';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Ventures() {
  const data = [
    {
     name: 'Ethiopia Dress',
     img: culture,
     review: 'Elegance in white'
    },
    {
      name: 'Ethiopia Dress',
      img: culture1,
      review: 'Elegance in white'
     },
     {
      name: 'Ethiopia Dress',
      img: culture2,
      review: 'Elegance in white'
     },
     {
      name: 'Ethiopia Dress',
      img: culture3,
      review: 'Elegance in white'
     },
     {
      name: 'Ethiopia Dress',
      img: culture4,
      review: 'Elegance in white'
     },
     {
      name: 'Ethiopia Dress',
      img: culture5,
      review: 'Elegance in white'
     }
  ]

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  }

  return (
    <div id='testimonials' className="w-3/4 m-auto">
      <div className="mt-20">
        <Slider {...settings}>
        {data.map((d) => (
          <div className="rounded-xl">
            <div className="rounded-t-xl flex justify-center items-center">
              <img src={d.img} alt="" className="h-50 w-50 rounded-full" />
              </div>
              <div className="flex flex-col justify-center items-center gap-4 p-4">
                <p className="text-xl for-semibold">{d.name}</p>
                <p>{d.review}</p>
                <button className="bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl">Read More</button>
                </div>
            </div>
        ))}
     </Slider>
      </div>
    <div>
      
    </div>
    </div>
  );
}


export default Ventures;