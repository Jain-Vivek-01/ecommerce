"use client";

import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import axios from "axios";

export default function Reviews({ productId ,reviews}) {
  const [writeReview, setWriteReview] = useState("");
  const [localReviews, setLocalReviews] = useState(reviews);
  console.log("reviews: ",reviews)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get("http://localhost:5000/reviews");
        const productReviews = res.data.reviews?.[productId] || [];
        setLocalReviews(productReviews);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };
    fetchReviews();
  }, [productId]);

  const avgRating =
    localReviews.length > 0
      ? localReviews.reduce((sum, r) => sum + (r?.rating || 0), 0) / localReviews.length
      : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!writeReview.trim()) return;

    const newId = localReviews.length
      ? Math.max(...localReviews.map(r => r.id)) + 1
      : 1;

    const newReview = {
      id: newId,
      rating: 5,
      comment: writeReview,
      date: new Date().toISOString(),
      reviewerName: "Anonymous"
    };

    try {
      const res = await axios.get("http://localhost:5000/reviews");
      const allReviews = res.data.reviews || {};

      const updatedProductReviews = [,...localReviews, newReview];
      allReviews[productId] = updatedProductReviews;

      await axios.patch("http://localhost:5000/reviews", { reviews: allReviews });

      setLocalReviews(updatedProductReviews);
      setWriteReview("");
    } catch (err) {
      console.error("Error saving review:", err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Customer Reviews
        </h2>
        <div className="flex items-center gap-2">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                className={`h-5 w-5 ${
                  i < Math.round(avgRating) ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-gray-600 text-sm">
            {avgRating.toFixed(1)} out of 5 ({localReviews.length} reviews)
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {localReviews.length === 0 ? (
          <div className="text-gray-500 text-center">No reviews yet.</div>
        ) : (
          localReviews?.map((review) => (
            <div key={review?.id} className="border-b pb-4">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-800">{review?.reviewerName}</span>
                  <span className="text-xs text-gray-400">
                    {review?.date ? new Date(review.date).toLocaleDateString() : "Recently"}
                  </span>
                </div>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-4 w-4 ${
                        i < review?.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{review?.comment}</p>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 flex items-center">
        <form onSubmit={handleSubmit} className="flex flex-col m-2 p-2 w-[90%]">
          <label className="font-semibold underline" htmlFor="review">
            Write your review
          </label>
          <textarea
            id="review"
            placeholder="Your experience"
            value={writeReview}
            onChange={(e) => setWriteReview(e.target.value)}
            className="mt-2 border h-24 p-2 text-start"
          />
          <button
            type="submit"
            className="mt-3 text-lg font-bold text-white bg-gray-400 hover:bg-gray-600 w-20 h-8 rounded-lg"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
