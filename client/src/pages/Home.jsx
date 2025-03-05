import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
// import ListingItem from "../components/ListingItem";
import IMG from "/Users/apple/Desktop/Real Estate Project/client/src/assets/hut.jpeg.webp";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 p-18 lg:p-5 px-3  max-w-6xl mx-auto">
        <h1 className="text-amber-100 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-yellow-50">perfect</span>
          <br />
          place with ease
        </h1>
        <div className="text-stone-700 text-xs sm:text-sm">
          KohiEstate is the best place to find your next perfect place to live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <div>
          <img
            src={IMG}
            className="max-h-[320px] rounded-lg lg:max-h-300 h-auto lg:w-900 lg:h-100 w-[900px]"
          ></img>

          <div className="flex justify-center">
            <Link
              to={"/signup"}
              className="text-sm flex justify-center mt-5  text-amber-800 bg-amber-100 p-2 rounded-lg w-45 font-bold  hover:shadow-lg hover:scale-101 transition-transform lg:mb-10"
            >
              Sign up & get started...
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
