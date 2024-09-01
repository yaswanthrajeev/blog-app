import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";

function Home({ isAuth }) {
  const [postLists, setPostList] = useState([]);
  const [expandedPostIds, setExpandedPostIds] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    setPostList(postLists.filter((post) => post.id !== id));
  };

  const toggleExpand = (id) => {
    setExpandedPostIds((prev) =>
      prev.includes(id) ? prev.filter((postId) => postId !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, []);

  return (
    <div className="gridContainer">
      {postLists.map((post) => {
        const wordCount = post.postText.split(" ").length;
        const isExpanded = expandedPostIds.includes(post.id);
        const shortText = post.postText.slice(0, 100);

        return (
          <div className="postTile" key={post.id}>
            <div className="tileHeader">
              <h2 className="tileTitle">{post.title}</h2>
              {isAuth && post.author.id === auth.currentUser.uid && (
                <button
                  className="tileDeleteButton"
                  onClick={() => deletePost(post.id)}
                >
                  &#128465;
                </button>
              )}
            </div>
            <div className="tileBody">
              <p className="tileText">
                {isExpanded || wordCount <= 150
                  ? post.postText
                  : `${shortText}...`}
              </p>
              {wordCount > 150 && (
                <button
                  className="seeMoreButton"
                  onClick={() => toggleExpand(post.id)}
                >
                  {isExpanded ? "See Less" : "See More"}
                </button>
              )}
            </div>
            <div className="tileFooter">
              <h4 className="tileAuthor">By @{post.author.name}</h4>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
