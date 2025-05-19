import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { Printer } from "lucide-react";
import { RxCrossCircled } from "react-icons/rx";

const IternaryField = () => {
  const { id } = useParams();
  const [itinerary, setItinerary] = useState(null);
  const componentRef = useRef();

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/Iternary/mano/682b17cc3585325892b61383`
        );
        setItinerary(res.data.data);
      } catch (err) {
        console.error("Error fetching itinerary", err);
      }
    };

    fetchItinerary();
  }, [id]);

  // 👇 MOVE THIS HOOK ABOVE ANY RETURN STATEMENT
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: itinerary?.title || "Itinerary",
    removeAfterPrint: true,
  });

  if (!itinerary) {
    return (
      <p className="text-center mt-10 text-gray-500">Loading itinerary...</p>
    );
  }

  const days = Number(itinerary.days);
  const nights = isNaN(days) ? "N/A" : days + 1;

  return (
    <>
      <div>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-indigo-600 
          ml-[850px] mb-[-20px]
          hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <Printer className="w-5 h-5" />
          Print Itinerary
        </button>
      </div>
      <div className="min-h-screen text-gray-800 p-6 md:p-12 flex items-start">
        <div className="flex justify-end mb-6"></div>
        <div
          ref={componentRef}
          className="bg-white rounded-lg shadow-lg p-6 md:p-10 space-y-6"
        >
          <div className="w-full mb-4">
            <img
              className="rounded-lg w-full h-[290px] object-cover shadow"
              src="src/assets/71840.jpg"
              alt="Main"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div class=" rounded-md ">
              <img
                className="rounded-lg w-full h-[150px] object-cover shadow"
                src="src/assets/71840.jpg"
                alt="Main"
              />
            </div>
            <div class=" rounded-md ">
              <img
                className="rounded-lg w-full h-[150px] object-cover shadow"
                src="src/assets/71840.jpg"
                alt="Main"
              />
            </div>
            <div class=" rounded-md ">
              <img
                className="rounded-lg w-full h-[150px] object-cover shadow"
                src="src/assets/71840.jpg"
                alt="Main"
              />
            </div>
          </div>
          {/* Logo */}
          <div className="flex justify-center">
            <img
              src="/src/assets/Logo.png"
              alt="Logo"
              className="w-40 h-28 object-contain"
            />
          </div>
          {/* Title */}
          {/* <h1 className="text-center text-2xl md:text-3xl font-bold underline">
            {itinerary.title || "Nepal Tour 2024"}
          </h1> */}
          {/* Company Info */}
          <div className="bg-gray-100 p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-2 text-red-600">
              Shine Travels
            </h2>
            <ul className="space-y-1 text-sm md:text-base">
              <li>
                <strong>Founder/Managing Director:</strong> Yashpal Saini
              </li>
              <li>
                <strong>Manager:</strong> Sumit Singh (Senior Manager,
                Gorakhpur)
              </li>
              <li>
                <strong>Mobile No:</strong> +91-8173923599 / 9140427414
              </li>
              <li>
                <strong>Address:</strong> Bankati Chak, 87-A, Raiganj Rd, near
                Choti Maszid, Raiganj, Gorakhpur, UP 273001
              </li>
              <li>
                <strong>Website:</strong>{" "}
                <a
                  href="https://www.shinetravels.co.in/index.html"
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  www.shinetravels.co.in
                </a>
              </li>
            </ul>
          </div>
          <div className="bg-white ml-[-13px] p-6 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">
              {itinerary.title} Trip Summary
            </h2>
            <div className="text-cyan-600 text-lg font-semibold mb-2">
              ₹Ask for Price
            </div>
            <p className="text-gray-700 mb-4">
              The{" "}
              <span className="text-lg underline">
                {isNaN(itinerary.days)
                  ? "Duration not available"
                  : `${itinerary.days} Days / ${nights} Nights`}
              </span>{" "}
              Exclusive Pashupatinath Darshan Tour Package, a Kathmandu Tour
              Package from Gorakhpur, is ideal for everyone. As Nepal’s capital,
              the city thrives with diverse experiences. From rich history to
              breathtaking natural beauty, Kathmandu embraces it all. Its
              vibrant culture and unique lifestyle stand as the heart of Nepal’s
              tourism.
            </p>
            <p className="text-gray-700">
              Visitors can explore ancient temples, bustling markets, and serene
              landscapes, making every moment memorable. The spiritual aura of
              Pashupatinath Temple, combined with Kathmandu’s rich heritage,
              offers a perfect blend of devotion and adventure. Whether seeking
              peace or excitement, this tour has something for everyone.
            </p>
          </div>

          <h2 className="text-2xl font-semibold mb-2 text-gray-800">
            Basic Information
          </h2>
          <p className="text-gray-600 mb-4 w-[700px]">
            This tour offers a perfect blend of spirituality, history, and
            scenic beauty, making it an ideal journey for travelers of all
            kinds. From the revered temples of Kathmandu to the birthplace of
            Lord Buddha in Lumbini, every destination holds deep cultural and
            religious significance. With comfortable accommodations, expert
            guidance, and a well-structured itinerary, this trip ensures a
            hassle-free and enriching travel experience.
          </p>

          <div className="border rounded-lg p-3 bg-white max-w-2xl mb-6">
            <table
              className="w-full text-left border-separate"
              style={{ borderSpacing: 0 }}
            >
              <tbody>
                {[
                  ["Date of Journey", itinerary.date],
                  ["Pickup Location", itinerary.pickLoc],
                  ["Drop Location", itinerary.dropLoc],
                  ["Pickup Time", itinerary.pickTime],
                  ["Drop Time", itinerary.dropTime],
                  ["Vehicle Type", itinerary.vehicle],
                  ["Package Name", itinerary.package],
                ].map(([label, value]) => (
                  <tr key={label} className="">
                    <td className="p-2 font-medium text-gray-700 flex items-center gap-2">
                      <CheckCircle className="text-cyan-500 w-4 h-4" />
                      {label}
                    </td>
                    <td className="p-3 text-gray-800">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-1 underline">
              Destinations
            </h3>
            <ul className="list-disc list-inside text-sm md:text-base text-gray-700">
              {(itinerary.destinations || []).length > 0 ? (
                itinerary.destinations.map((place, i) => (
                  <li key={i}>{place}</li>
                ))
              ) : (
                <li>N/A</li>
              )}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-1 underline">Hotels</h3>
            <ul className="list-disc list-inside text-sm md:text-base text-gray-700">
              {(itinerary.hotelSelected || []).length > 0 ? (
                itinerary.hotelSelected.map((place, i) => (
                  <li key={i}>{place}</li>
                ))
              ) : (
                <li>N/A</li>
              )}
            </ul>
          </div>
          {/* Day-wise Schedule */}
          <div>
            <h3 className="text-lg font-semibold mb-1 underline">
              Day-wise Itinerary
            </h3>

            {(itinerary.dynamicFields || []).length > 0 ? (
              <div className="space-y-4">
                {itinerary.dynamicFields.map((day, i) => (
                  <div key={i}>
                    <h4 className="font-semibold text-base text-blue-700 mb-1">
                      {day.dayTitle || `Day ${i + 1}`}
                    </h4>
                    <ul className="list-disc list-inside text-sm md:text-base text-gray-700 space-y-1">
                      {(day.points || []).map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                No itinerary details available.
              </p>
            )}
          </div>
          <div className="text-left">
            <p className="text-black">
              Note Rs-{itinerary.advance} Please find Paytm or Google Pay Phone
              PayNumberdetail -{" "}
              <span className="underline text-blue-700 cursor-pointer">
                9140427414
              </span>
              <br></br>Shine Travels Please find UPI code -
              saini.yashpal505-1@okicici
            </p>
          </div>
          <div className="mt-6">
            <h3 className="text-2xl font-bold mb-4 underline">
              Included and Excluded
            </h3>
            <p className="text-gray-700 mb-4">
              This package includes a deluxe stay in double or triple-sharing
              rooms with breakfast, ensuring a comfortable experience. All
              transportation is covered with AC cabs, including pickups,
              drop-offs, tolls, permits, parking, and driver allowances. Guided
              sightseeing to mentioned attractions and a local SIM card are also
              provided for convenience.
            </p>
            <div className="grid md:grid-cols-2 gap-6 border rounded-lg p-6 bg-white shadow">
              <div>
                <h4 className="text-lg font-semibold text-green-700 mb-2">
                  Included
                </h4>
                <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                  {(itinerary.costInclude || []).length > 0 ? (
                    itinerary.costInclude.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="text-green-500 w-5 h-5 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">N/A</li>
                  )}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-red-700 mb-2">
                  Excluded
                </h4>
                <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                  {(itinerary.costExclude || []).length > 0 ? (
                    itinerary.costExclude.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-red-500 text-xl font-bold leading-none">
                          <RxCrossCircled className="text-red-500 w-5 h-5 mt-1" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">N/A</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IternaryField;
