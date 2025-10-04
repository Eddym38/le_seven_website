import React from 'react';
import { ArrowLeft, Calendar, User, ArrowRight } from 'lucide-react';

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

interface BlogPostProps {
  post: BlogPostData;
  onBack: () => void;
  onNavigateHome: () => void;
  onOpenPost: (post: BlogPostData) => void;
}

const relatedPosts: BlogPostData[] = [
  {
    id: '7',
    title: 'Mediterranean Herbs: Growing Your Own Garden',
    excerpt: 'Learn how to cultivate the essential herbs that make Mediterranean cuisine so aromatic and flavorful.',
    content: '',
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    date: 'March 10, 2025',
    author: 'Isabella Romano',
    category: 'Gardening'
  },
  {
    id: '8',
    title: 'The History of Bohemian Dining Culture',
    excerpt: 'Explore the rich history and cultural significance of bohemian dining traditions that inspire our restaurant.',
    content: '',
    image: 'https://images.pexels.com/photos/1055058/pexels-photo-1055058.jpeg?auto=compress&cs=tinysrgb&w=400',
    date: 'March 5, 2025',
    author: 'Marie Dubois',
    category: 'Culture'
  },
  {
    id: '9',
    title: 'Cooking Classes: Learn Mediterranean Techniques',
    excerpt: 'Join our monthly cooking classes and master the art of Mediterranean cuisine with our expert chefs.',
    content: '',
    image: 'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=400',
    date: 'February 25, 2025',
    author: 'Chef Antoine Dubois',
    category: 'Classes'
  }
];

export function BlogPost({ post, onBack, onNavigateHome, onOpenPost }: BlogPostProps) {
  return (
    <div className="min-h-screen bg-[#FAF6EF] text-[#4C4C4C]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-[#FAF6EF]/95 backdrop-blur-sm z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button 
            onClick={onNavigateHome}
            className="font-pacifico text-2xl text-[#92C6C4] hover:text-[#F7C8C8] transition-colors"
          >
            Le Seven
          </button>
          
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-2 font-montserrat font-medium text-[#4C4C4C] hover:text-[#92C6C4] transition-colors"
          >
            <ArrowLeft size={18} />
            <span>Back to Blog</span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 pb-0">
        <div className="relative h-96 md:h-[500px] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute bottom-8 left-0 right-0">
            <div className="max-w-4xl mx-auto px-4">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8">
                <div className="flex items-center space-x-4 text-sm text-[#4C4C4C]/60 mb-4">
                  <span className="bg-[#F6E08B] text-[#4C4C4C] px-3 py-1 rounded-full font-montserrat font-medium">
                    {post.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Calendar size={16} />
                    <span className="font-montserrat">{post.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User size={16} />
                    <span className="font-montserrat">{post.author}</span>
                  </div>
                </div>
                <h1 className="font-pacifico text-2xl md:text-4xl text-[#4C4C4C] leading-tight">
                  {post.title}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm">
            <div 
              className="prose prose-lg max-w-none font-montserrat text-[#4C4C4C] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
              style={{
                '--tw-prose-headings': '#4C4C4C',
                '--tw-prose-h2': '#92C6C4',
                '--tw-prose-links': '#92C6C4',
                '--tw-prose-bold': '#4C4C4C',
              } as React.CSSProperties}
            />
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-pacifico text-3xl text-[#92C6C4] mb-12 text-center">
            Related Stories
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <article
                key={relatedPost.id}
                className="bg-[#FAF6EF] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                onClick={() => onOpenPost(relatedPost)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#F6E08B] text-[#4C4C4C] px-2 py-1 rounded-full font-montserrat text-xs font-medium">
                      {relatedPost.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-xs text-[#4C4C4C]/60 mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span className="font-montserrat">{relatedPost.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User size={14} />
                      <span className="font-montserrat">{relatedPost.author}</span>
                    </div>
                  </div>
                  
                  <h3 className="font-pacifico text-lg text-[#4C4C4C] mb-3 leading-tight">
                    {relatedPost.title}
                  </h3>
                  
                  <p className="font-montserrat text-sm text-[#4C4C4C]/80 mb-4 leading-relaxed">
                    {relatedPost.excerpt}
                  </p>
                  
                  <div className="inline-flex items-center space-x-2 text-[#92C6C4] hover:text-[#F7C8C8] font-montserrat font-semibold text-sm transition-colors">
                    <span>Read More</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-[#92C6C4]/10 to-[#F7C8C8]/10 rounded-3xl p-12">
            <h2 className="font-pacifico text-3xl text-[#92C6C4] mb-4">
              Experience Le Seven
            </h2>
            <p className="font-montserrat text-[#4C4C4C]/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Ready to taste the Mediterranean cuisine that inspires our stories? Book your table now and experience the bohemian atmosphere of Le Seven.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.thefork.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#92C6C4] text-white px-8 py-4 rounded-full font-montserrat font-semibold text-lg hover:bg-[#F7C8C8] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Book a Table
              </a>
              <button
                onClick={onNavigateHome}
                className="border-2 border-[#92C6C4] text-[#92C6C4] px-8 py-4 rounded-full font-montserrat font-semibold text-lg hover:bg-[#92C6C4] hover:text-white transition-all duration-300"
              >
                Visit Restaurant
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#4C4C4C] text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <button 
            onClick={onNavigateHome}
            className="font-pacifico text-2xl text-[#92C6C4] mb-4 hover:text-[#F7C8C8] transition-colors"
          >
            Le Seven
          </button>
          <p className="font-montserrat text-white/80 mb-6">
            Mediterranean cuisine meets bohemian atmosphere
          </p>
          <div className="flex justify-center space-x-6">
            <button
              onClick={onNavigateHome}
              className="font-montserrat text-white/80 hover:text-[#92C6C4] transition-colors"
            >
              Restaurant
            </button>
            <span className="text-white/40">•</span>
            <button
              onClick={onBack}
              className="font-montserrat text-white/80 hover:text-[#92C6C4] transition-colors"
            >
              Blog
            </button>
            <span className="text-white/40">•</span>
            <a href="#" className="font-montserrat text-white/80 hover:text-[#92C6C4] transition-colors">
              Privacy Policy
            </a>
            <span className="text-white/40">•</span>
            <a href="#" className="font-montserrat text-white/80 hover:text-[#92C6C4] transition-colors">
              Legal Notice
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}