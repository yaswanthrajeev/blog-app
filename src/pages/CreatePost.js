import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  const createPost = async () => {
    if (!title || !postText) {
      setError("Both fields are required.");
      return;
    }
    setLoading(true);
    try {
      await addDoc(postsCollectionRef, {
        title,
        postText,
        author: {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid,
        },
        createdAt: new Date().toISOString(),
      });
      navigate("/");
    } catch (e) {
      setError("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  return (
    <div className="postCreationPage">
      <div className="postContainer">
        <h1>Create A New Post</h1>
        {error && <p className="postError">{error}</p>}
        <div className="inputGroup">
          <label htmlFor="postTitle">Title:</label>
          <input
            id="postTitle"
            className="postInput"
            placeholder="Enter the title..."
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={100}
          />
          <small className="charCount">{title.length}/100</small>
        </div>
        <div className="inputGroup">
          <label htmlFor="postContent">Post:</label>
          <textarea
            id="postContent"
            className="postTextarea"
            placeholder="Write your thoughts..."
            value={postText}
            onChange={(event) => setPostText(event.target.value)}
            maxLength={500}
          />
          <small className="charCount">{postText.length}/500</small>
        </div>
        <button className="submitButton" onClick={createPost} disabled={loading}>
          {loading ? "Submitting..." : "Submit Post"}
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
