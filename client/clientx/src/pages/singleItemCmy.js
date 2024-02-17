import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function SingleItemCmy() {
  let { id } = useParams();
  const [company, setCompany] = useState({});
  const [comments, setComments] = useState([]);
  const [compID, setCompID] = useState("");
  const [newComment, setNewComment] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [authState, setAuthState] = useState(false);

  const [selectedRating, setSelectedRating] = useState(1); // Default rating is 1

  const handleRatingChange = (event) => {
    setSelectedRating(parseInt(event.target.value, 10));
  };

  useEffect(() => {
    // Fetch company information
    axios
      .get(`http://localhost:3001/companies/byId/${id}`)
      .then((response) => {
        console.log("Company response:", response.data); // Log the response
        setCompany(response.data);
        setCompID(response.data.companyID);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching company information:", error);
      });

    // Fetch comments information
    axios
      .get(`http://localhost:3001/comments/${id}`)
      .then((response) => {
        console.log("Comments response:", response.data); // Log the response
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });

    // Fetch authentication status
    axios
      .get("http://localhost:3001/auth", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState(false);
        } else {
          setAuthState(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching authentication status:", error);
      });
  }, [id]);

  const addComment = () => {
    console.log("companyyyy", compID);
    let commentData = {
      CompanyID: compID,

      Rating: selectedRating,
      Comment: newComment,
    };
    axios
      .post("http://localhost:3001/comments", commentData, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          const toAdd = { comment: newComment };
          setComments([...comments, toAdd]);
          setNewComment("");
        }
      });
  };
  return (
    <div className="outer">
      <div className="card">
        <div className="inner">
          <h1 className="id">{company.companyName}</h1>
        </div>
      </div>
      {authState && (
        <>
          <div className="card">
            <div className="inner">
              <textarea
                className="commentBox"
                placeholder="Write your comment"
                value={newComment}
                onChange={(event) => {
                  setNewComment(event.target.value);
                }}
              />
              <div className="comment-inner">
                <label htmlFor="ratingSelect">Choose Rating:</label>
                <select
                  id="ratingSelect"
                  className="rating-select"
                  value={selectedRating}
                  onChange={handleRatingChange}
                >
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <option key={rating} value={rating}>
                      {rating}
                    </option>
                  ))}
                </select>
              </div>

              <div className="inner">
                <button onClick={addComment}>Add</button>
              </div>
            </div>
          </div>
        </>
      )}

      {comments.map((value, key) => {
        return (
          <div className="commentcard">
            <p>{value.comment}</p>
          </div>
        );
      })}
    </div>
  );
}

export default SingleItemCmy;
