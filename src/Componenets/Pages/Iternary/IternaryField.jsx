import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const IternaryField = () => {
  const { id } = useParams();
  const [itinerary, setItinerary] = useState(null);

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

  if (!itinerary) {
    return (
      <p className="text-center mt-10 text-gray-500">Loading itinerary...</p>
    );
  }

  const days = Number(itinerary.days);
  const nights = isNaN(days) ? "N/A" : days + 1;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6 md:p-12 flex justify-center">
      <div className="bg-white w-full max-w-5xl rounded-lg shadow-lg p-6 md:p-10 space-y-6">
        {/* Logo */}
        <div className="flex justify-center">
          <img
            src="/src/assets/Logo.png"
            alt="Logo"
            className="w-40 h-28 object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="text-center text-2xl md:text-3xl font-bold underline">
          {itinerary.title || "Nepal Tour 2024"}
        </h1>

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
              <strong>Manager:</strong> Sumit Singh (Senior Manager, Gorakhpur)
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

        {/* Tour Overview */}
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Tour Duration</h2>
          <p className="text-lg underline">
            {isNaN(itinerary.days)
              ? "Duration not available"
              : `${itinerary.days} Days / ${nights} Nights`}
          </p>
        </div>

        {/* Itinerary Details */}
        <table className="w-full border border-gray-300 rounded overflow-hidden">
          <tbody className="text-sm md:text-base">
            {[
              ["Date of Journey", itinerary.date],
              ["Pickup Location", itinerary.pickLoc],
              ["Drop Location", itinerary.dropLoc],
              ["Pickup Time", itinerary.pickTime],
              ["Drop Time", itinerary.dropTime],
              ["Vehicle Type", itinerary.vehicle],
              ["Package Name", itinerary.package],
            ].map(([label, value]) => (
              <tr key={label} className="border-t border-gray-300">
                <td className="p-3 font-semibold bg-gray-50 w-1/3">{label}</td>
                <td className="p-3">{value || "N/A"}</td>
              </tr>
            ))}

            <tr className="border-t border-gray-300">
              <td className="p-3 font-semibold bg-gray-50">Package Cost</td>
              <td className="p-3">
                ₹{itinerary.cost || "N/A"} per person
                <br />
                {itinerary.personNo && `${itinerary.personNo} Adults`}
                <br />
                Hotel: {itinerary.hotelType || "N/A"}
                <br />
                Includes All Transportation & Parking Charges
              </td>
            </tr>
          </tbody>
        </table>

        {/* Hotels */}
        <div>
          <h3 className="text-lg font-semibold mb-1 underline">Hotels</h3>
          <ul className="list-disc list-inside text-sm md:text-base text-gray-700">
            {(itinerary.hotelSelected || []).length > 0 ? (
              itinerary.hotelSelected.map((hotel, i) => (
                <li key={i}>{hotel}</li>
              ))
            ) : (
              <li>N/A</li>
            )}
          </ul>
        </div>

        {/* Destinations */}
        <div>
          <h3 className="text-lg font-semibold mb-1 underline">Destinations</h3>
          <ul className="list-disc list-inside text-sm md:text-base text-gray-700">
            {(itinerary.destinations || []).length > 0 ? (
              itinerary.destinations.map((place, i) => <li key={i}>{place}</li>)
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
        <div>
          <h3 className="text-lg font-semibold mb-1 underline">
            Cost Includes
          </h3>
          <ul className="list-disc list-inside text-sm md:text-base text-gray-700">
            {(itinerary.costInclude || []).length > 0 ? (
              itinerary.costInclude.map((item, i) => <li key={i}>{item}</li>)
            ) : (
              <li>N/A</li>
            )}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-1 underline">
            Cost Excludes
          </h3>
          <ul className="list-disc list-inside text-sm md:text-base text-gray-700">
            {(itinerary.costExclude || []).length > 0 ? (
              itinerary.costExclude.map((item, i) => <li key={i}>{item}</li>)
            ) : (
              <li>N/A</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IternaryField;
