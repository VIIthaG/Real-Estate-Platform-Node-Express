import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true",
        furnished: furnishedFromUrl === "true",
        offer: offerFromUrl === "true",
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      setListings(data);
      setShowMore(data.length > 8);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value, checked } = e.target;

    setSidebardata((prev) => ({
      ...prev,
      [id]:
        id === "searchTerm"
          ? value
          : id === "sort_order"
          ? { sort: value.split("_")[0], order: value.split("_")[1] }
          : checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(sidebardata);
    navigate(`/search?${urlParams.toString()}`);
  };

  const onShowMoreClick = async () => {
    const startIndex = listings.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const res = await fetch(`/api/listing/get?${urlParams.toString()}`);
    const data = await res.json();
    setListings((prev) => [...prev, ...data]);
    setShowMore(data.length >= 9);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap  font-semibold">Search:</label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className=" rounded-lg bg-white p-3 w-full"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            {["all", "rent", "sale"].map((type) => (
              <div key={type} className="flex gap-2">
                <input
                  type="checkbox"
                  id={type}
                  className="w-5"
                  onChange={handleChange}
                  checked={sidebardata.type === type}
                />
                <span className="capitalize">{type}</span>
              </div>
            ))}
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.offer}
              />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Amenities:</label>
            {["parking", "furnished"].map((amenity) => (
              <div key={amenity} className="flex gap-2">
                <input
                  type="checkbox"
                  id={amenity}
                  className="w-5"
                  onChange={handleChange}
                  checked={sidebardata[amenity]}
                />
                <span className="capitalize">{amenity}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              id="sort_order"
              onChange={handleChange}
              className=" bg-white rounded-lg p-3"
              defaultValue="created_at_desc"
            >
              <option value="regularPrice_desc">Price: High to Low</option>
              <option value="regularPrice_asc">Price: Low to High</option>
              <option value="created_at_desc">Latest</option>
              <option value="created_at_asc">Oldest</option>
            </select>
          </div>

          <div className="flex justify-center">
            <button className="bg-amber-100 hover:scale-101 font-semibold hover:cursor-pointer hover:bg-yellow-100 transition-transform text-amber-700 p-3 w-29 lg:w-full text-center rounded-lg uppercase hover:opacity-95">
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-yellow-50 mt-5">
          Listing results:
        </h1>

        <div className="p-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {!loading && listings.length === 0 && (
            <div className="text-xl flex justify-center font-semibold lg:mt-75 text-stone-700 col-span-full">
              No listings found!
            </div>
          )}

          {loading && (
            <p className="text-xl text-slate-700 text-center col-span-full">
              Loading...
            </p>
          )}

          {!loading &&
            listings.map((listing) => (
              <ListingItem
                key={listing._id}
                listing={listing}
                className="opacity-0 transition-opacity"
                onLoad={(e) => e.target.classList.remove("opacity-0")}
              />
            ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className="text-yellow-50 hover:underline p-7 text-center col-span-full"
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
