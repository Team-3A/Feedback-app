"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { X, Upload } from "lucide-react";

export default function WriteReview() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const onStarClick = (value: number) => {
    setRating(value);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const uploaded = Array.from(e.target.files);

    setImages((prev) => [...prev, ...uploaded]);
    const mapped = uploaded.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...mapped]);
  };

  const removeImage = (i: number) => {
    setImages((prev) => prev.filter((_, index) => index !== i));
    setPreviews((prev) => prev.filter((_, index) => index !== i));
  };

  const canSubmit = rating > 0 && review.trim().length >= 80;

  const handleSubmit = () => {
    if (!canSubmit) return;

    setLoading(true);

    setTimeout(() => {
      console.log({
        rating,
        review,
        photos: images,
      });

      setLoading(false);
      alert("Review successfully posted!");
    }, 900);
  };

  return (
    <div className="flex justify-center w-full py-10">
      <Card className="w-full max-w-2xl p-8">
        <h1 className="text-2xl font-semibold text-center">Write a Review</h1>

        <p className="text-center text-gray-600">Reviewing: {}</p>

        <div>
          <p className="text-center font-medium">
            How would you rate your experience?
          </p>

          <div className="flex justify-center gap-2 mt-2">
            {[1, 2, 3, 4, 5].map((star) => {
              const filled = star <= (hover || rating);

              return (
                <svg
                  key={star}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => onStarClick(star)}
                  className="w-9 h-9 cursor-pointer transition-all duration-150"
                  viewBox="0 0 24 24"
                  fill={filled ? "gold" : "none"}
                  stroke={filled ? "gold" : "gray"}
                  strokeWidth={filled ? "2.4" : "2"}
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
                </svg>
              );
            })}
          </div>
        </div>

        <div className="mt-3">
          <p className="font-medium mb-2">Your Review</p>

          <Textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your experience at {} and tell us what you loved (or didn't love!)."
            className="h-36 resize-none"
          />

          <p className="text-xs text-gray-500 mt-1">
            {review.length}/80 characters
          </p>
        </div>

        <div className="mt-3">
          <p className="font-medium mb-2">Add Photos (Optional)</p>

          <label
            htmlFor="fileUpload"
            className="border border-dashed rounded-md flex items-center justify-center h-28 cursor-pointer hover:bg-gray-50 transition"
          >
            <div className="flex flex-col items-center text-gray-600">
              <Upload size={22} />
              <span className="text-sm mt-1">Click to upload</span>
            </div>
          </label>

          <input
            id="fileUpload"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileSelect}
          />

          {previews.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mt-4">
              {previews.map((src, i) => (
                <div key={i} className="relative">
                  <img
                    src={src}
                    className="w-full h-28 object-cover rounded-md"
                  />

                  <button
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 ">
          <Button variant="outline">Cancel</Button>

          <Button onClick={handleSubmit} disabled={!canSubmit || loading}>
            {loading ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
