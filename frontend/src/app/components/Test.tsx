import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (editIndex !== null) {
      const updatedReviews = [...reviews];
      updatedReviews[editIndex] = data;
      setReviews(updatedReviews);
      setEditIndex(null);
    } else {
      setReviews([...reviews, data]);
    }
    setShowForm(false);
    reset();
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setShowForm(true);
    console.log("RESET", reviews[index]);
    reset(reviews[index]);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditIndex(null);
    reset();
  };

  return (
    <div>
      <input
        {...register("name", { required: "Name is required" })}
        placeholder="Your name"
      />
      {errors.name && <p>{errors.name.message}</p>}

      <button onClick={() => setShowForm(true)}>Add a review</button>

      {showForm && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Title"
          />
          {errors.title && <p>{errors.title.message}</p>}

          <textarea
            {...register("review", { required: "Review is required" })}
            placeholder="Your review"
          />
          {errors.review && <p>{errors.review.message}</p>}

          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit">{editIndex !== null ? "Update" : "Add"}</button>
        </form>
      )}

      <div>
        {reviews.map((review, index) => (
          <div key={index} onClick={() => handleEdit(index)}>
            <h3>{review.title}</h3>
            <p>{review.review}</p>
            <p>By: {review.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
