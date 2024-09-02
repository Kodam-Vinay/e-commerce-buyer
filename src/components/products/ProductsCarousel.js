import { Swiper, SwiperSlide } from "swiper/react";
import image1 from "../../assets/carousel/ferris-wheel.jpg";
import image2 from "../../assets/carousel/ride-park-sky-color-abstract.jpg";
import image3 from "../../assets/carousel/wide-shot-ferris-wheel-right-with-space-text-left.jpg";
import image4 from "../../assets/carousel/zara.png";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../../App.css";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import useDeviceResize from "../../hooks/useDeviceResize";

const imagesList = [
  image1,
  image2,
  image3,
  image4,
  image2,
  image1,
  image3,
  image4,
];
export default function ProductsCarousel() {
  const size = useDeviceResize();
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={size?.width > 900 ? true : false}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {imagesList?.map((eachSlide, index) => (
        <SwiperSlide key={index}>
          <img src={eachSlide} alt="image_image" className="object-contain" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
