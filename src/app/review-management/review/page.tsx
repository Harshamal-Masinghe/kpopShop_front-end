"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Swal from 'sweetalert2';
import html2pdf from 'html2pdf.js';

import { fetchReviews } from "../../../api/review";

interface Review {
  reviewId: string;
  name: string;
  email: string;
  comment: string;
  images: string[];
  rating: number;
}

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch reviews from backend using fetchReviews function
    fetchReviews()
      .then((reviews) => {
        setReviews(reviews);
        setFilteredReviews(reviews);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, []);

  const handleDelete = (reviewId: string) => {
    // Show confirmation prompt
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this review!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed deletion, send delete request to backend
        axios
          .delete(`http://localhost:8080/review/${reviewId}`)
          .then(() => {
            // Remove the deleted review from state
            setReviews((prevReviews) =>
              prevReviews.filter((review) => review.reviewId !== reviewId)
            );
            setFilteredReviews((prevReviews) =>
              prevReviews.filter((review) => review.reviewId !== reviewId)
            );
            Swal.fire(
              'Deleted!',
              'Your review has been deleted.',
              'success'
            );
          })
          .catch((error) => {
            console.error("Error deleting review:", error);
            Swal.fire(
              'Error!',
              'An error occurred while deleting the review.',
              'error'
            );
          });
      }
    });
  };

  const handleEdit = (reviewId: string) => {
    // Redirect to update review page with reviewId as query parameter
    router.push(`/review-management/review/update-review?reviewId=${reviewId}`);
  };

  const handleAddReview = () => {
    // Redirect to add review page
    router.push("/review-management/review/add-review");
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = reviews.filter(
      (review) =>
        review.name.toLowerCase().includes(query.toLowerCase()) ||
        review.email.toLowerCase().includes(query.toLowerCase()) ||
        review.comment.toLowerCase().includes(query.toLowerCase()) ||
        review.rating.toString().includes(query)
    );
    setFilteredReviews(filtered);
  };

  const calculateAverageRating = () => {
    const totalRating = filteredReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / filteredReviews.length;
    return averageRating.toFixed(2); // Round to 2 decimal places
  };

  const calculateRatingCount = (rating: number) => {
    return filteredReviews.filter((review) => review.rating === rating).length;
  };


  const generatePDFReport = () => {
    // Get current date and time
    const now = new Date();
    const formattedDateTime = now.toLocaleString();

    const header = `
        <h1 class="text-xl font-semi-bold mt-8 text-center text-gray-500">KpopShop Nexus</h1>
      `;
    const content = document.createElement('div');
    content.innerHTML =
      `<head>
    <!-- Load Tailwind CSS -->
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  </head>
  <body>
    <div class="flex flex-col items-center justify-center h-full">
      ${header}<header class="mb-8 text-sm text-gray-500 text-center">
        No: 87, Kandy Road, Kiribathgoda, Sri Lanka. </br> 076 366 3881 </br> <hr class="mt-4 w-9/10 mx-auto border-t border-gray-400">
          </header>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Comment</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          ${filteredReviews.map((review) => `
            <tr>
              <td>${review.name}</td>
              <td>${review.comment}</td>
              <td>${review.rating}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      </div>
        <div class="mr-10">
        <div class="ml-20">
      <h2 class="mt-10">Reviews Summary</h2>
      <p>Average Rating: ${calculateAverageRating()}</p>
      <p>Total Ratings Count:</p>
      <ul>
      <li>1 Star: ${calculateRatingCount(1)}</li>
      <li>2 Stars: ${calculateRatingCount(2)}</li>
      <li>3 Stars: ${calculateRatingCount(3)}</li>
      <li>4 Stars: ${calculateRatingCount(4)}</li>
      <li>5 Stars: ${calculateRatingCount(5)}</li>
      </ul></div></div>
      <footer class="mt-8 mb-4 text-sm text-gray-500 text-center">
          <hr class="w-full mx-auto border-t border-gray-400">Generated by Review Management </br>${formattedDateTime}</br>
          </footer>
     
    </body>
    </html>
    `;

    html2pdf()
      .from(content)
      .save();
  };





  return (
    <div className="p-4">
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Reviews</h1>
        <button
          className="px-4 py-2 bg-fuchsia-800 text-white rounded hover:bg-fuchsia-900"
          onClick={handleAddReview}
        >
          Add Review
        </button>
      </div>

      <div className="p-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <br />
      <ul>
        {filteredReviews.map((review) => (
          <li key={review.reviewId} className="mb-4 p-4 bg-gray-100 rounded-lg">
            <p className="font-bold">Name: {review.name}</p>
            <p>Email: {review.email}</p>
            <p>Comment: {review.comment}</p>
            <p>Rating: {review.rating}</p>
            <br></br>
            <div className="mt-2">
              {/* Displaying images */}
              {review.images.length > 0 && (
                <div className="flex flex-wrap mt-2">
                  {review.images.slice(0, 5).map((image, index) => (
                    <div key={index} className="w-1/5 flex-grow">
                      <Image
                        src={image}
                        alt={`Image ${index + 1}`}
                        width={128}
                        height={128}
                        className="w-32 h-32 object-cover rounded mr-4 mb-4"
                        onError={(e) => {
                          console.error("Error loading image:", e);
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
              <br></br>
              <button
                className="mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => handleDelete(review.reviewId)}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 bg-fuchsia-800 text-white rounded hover:bg-fuchsia-900"
                onClick={() => handleEdit(review.reviewId)}
              >
                Edit
              </button>
            </div>
            {/* You can handle displaying images here */}
          </li>
        ))}
      </ul>
      <button
          className="px-4 py-2 bg-fuchsia-800 text-white rounded hover:bg-fuchsia-900"
          onClick={generatePDFReport}
        >
          Generate PDF Report
        </button>
    </div>
  );
};

export default Reviews;
