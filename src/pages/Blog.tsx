import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { BlogIndex } from "../components/BlogIndex";
import { BlogPost } from "../components/BlogPost";

interface BlogPostData {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
}

export const Blog: React.FC = () => {
  const [currentBlogPost, setCurrentBlogPost] = useState<BlogPostData | null>(
    null
  );
  const navigate = useNavigate();

  const openBlogPost = (post: BlogPostData) => {
    setCurrentBlogPost(post);
    window.scrollTo(0, 0);
  };

  const backToBlog = () => {
    setCurrentBlogPost(null);
    window.scrollTo(0, 0);
  };

  const navigateToHome = () => {
    navigate("/");
  };

  if (currentBlogPost) {
    return (
      <div className="min-h-screen bg-[#FAF6EF] text-[#4C4C4C]">
        <Navbar />
        <BlogPost
          post={currentBlogPost}
          onBack={backToBlog}
          onNavigateHome={navigateToHome}
          onOpenPost={openBlogPost}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6EF] text-[#4C4C4C]">
      <Navbar />
      <BlogIndex onNavigateHome={navigateToHome} onOpenPost={openBlogPost} />
    </div>
  );
};
