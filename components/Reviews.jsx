import { StarIcon } from "@heroicons/react/24/solid";

export default function Reviews({ reviews = [] }) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow text-gray-500 text-center">
        No reviews yet.
      </div>
    );
  }

  const avgRating =
    reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length;

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
                  i < Math.round(avgRating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-gray-600 text-sm">
            {avgRating.toFixed(1)} out of 5 ({reviews.length} reviews)
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review, idx) => (
          <div key={idx} className="border-b pb-4">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-800">
                  {review.reviewerName || "Anonymous"}
                </span>
                <span className="text-xs text-gray-400">
                  {review.date || "Recently"}
                </span>
              </div>
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              {review.comment || "No comment provided."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
