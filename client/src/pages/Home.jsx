import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";
import taco from "/Users/apple/Desktop/Real Estate Project/client/src/assets/bBB.webp";

import kfc from "/Users/apple/Desktop/Real Estate Project/client/src/assets/Screenshot-2021-12-28-132323.jpg";
export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

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
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-6 p-10 lg:p-5 lg:mt-9 px-3 max-w-6xl mx-auto">
        <h1 className="text-amber-100 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-yellow-50">perfect</span>
          <br />
          place with ease
        </h1>
        <div className="text-stone-500 text-xs sm:text-sm">
          KohiEstate is the best place to find your next perfect place to live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={"/signup"}
          className="text-xs sm:text-sm text-amber-800 font-bold hover:scale-102 hover:bg-yellow-50 transition-transform bg-amber-50 p-1 w-20 rounded-lg text-center"
        >
          Sign-Up
        </Link>
      </div>

      {/* ✅ Centered Slider with smooth fade-in */}
      <div className="flex justify-center items-center my-5">
        <Swiper
          navigation
          className="max-w-[1330px] w-full"
          autoplay={{ delay: 4000 }}
          loop
        >
          {offerListings &&
            offerListings.length > 0 &&
            offerListings.map((listing) => (
              <SwiperSlide key={listing._id}>
                <div className="h-[500px] rounded-lg overflow-hidden">
                  <img
                    src={listing.imageUrls[0]}
                    alt="listing"
                    className="w-full h-full object-cover opacity-0 transition-opacity duration-1000"
                    onLoad={(e) => e.target.classList.remove("opacity-0")}
                  />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      <div className="flex flex-1 gap-7 justify-center ">
        <a href="https://www.kfc.com/menu">
          <img
            src={kfc}
            alt="ad"
            className="w-150 h-60 hidden lg:inline rounded-sm "
          />
        </a>
        <a href="https://www.tacobell.com">
          <img
            src={taco}
            alt="ad"
            className="w-120 mr-3 h-60 rounded-sm lg:w-150"
          />
        </a>
      </div>

      {/* listing results for offer, sale and rent */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-1">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold w-39 text-center rounded-lg  text-amber-100">
                Recent offers
              </h2>
              <Link
                className="text-sm text-amber-800  hover:underline"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-amber-100">
                Recent places for rent
              </h2>
              <Link
                className="text-sm text-amber-800 hover:underline"
                to={"/search?type=rent"}
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-amber-100">
                Recent places for sale
              </h2>
              <Link
                className="text-sm text-amber-800 hover:underline"
                to={"/search?type=sale"}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
      <br />
      <br />
    </div>
  );
}
