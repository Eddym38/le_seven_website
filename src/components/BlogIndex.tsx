import React from "react";
import { Calendar, User, ArrowRight } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
}

interface BlogIndexProps {
  onNavigateHome: () => void;
  onOpenPost: (post: BlogPost) => void;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Art of Mediterranean Cooking: Our Chef's Journey",
    excerpt:
      "Discover the passion and tradition behind our authentic Mediterranean dishes, from farm-fresh ingredients to time-honored recipes.",
    content: `
      <p>Mediterranean cuisine is more than just food—it's a celebration of life, family, and tradition. At Le Seven, our chef brings decades of experience from the sun-soaked shores of the Mediterranean to create dishes that tell a story.</p>
      
      <h2>From Tradition to Innovation</h2>
      <p>Our culinary journey began in the small villages of Provence, where our chef learned the importance of using only the freshest, locally-sourced ingredients. Every dish on our menu reflects this philosophy, combining traditional techniques with modern presentation.</p>
      
      <h2>The Secret to Authentic Flavors</h2>
      <p>The key to authentic Mediterranean cuisine lies in simplicity and quality. We work closely with local farmers and artisans to source the finest olive oils, herbs, and seasonal produce. Our signature dishes, like the grilled sea bream with ratatouille, showcase how simple ingredients can create extraordinary flavors when treated with respect and skill.</p>
      
      <h2>A Bohemian Twist</h2>
      <p>What sets Le Seven apart is our bohemian approach to Mediterranean cooking. We're not afraid to experiment with unexpected flavor combinations while staying true to the essence of Mediterranean cuisine. Our lamb tagine with apricots and almonds is a perfect example of this philosophy—traditional Moroccan techniques with a French Mediterranean twist.</p>
    `,
    image:
      "https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=800",
    date: "March 15, 2025",
    author: "Chef Antoine Dubois",
    category: "Cuisine",
  },
  {
    id: "2",
    title: "Seasonal Menu: Spring Flavors at Le Seven",
    excerpt:
      "Explore our new spring menu featuring fresh asparagus, artichokes, and the first herbs of the season in dishes that celebrate renewal.",
    content: `
      <p>Spring has arrived at Le Seven, and with it comes a fresh wave of inspiration for our seasonal menu. This time of year is particularly exciting for our kitchen team as we welcome the first tender vegetables and aromatic herbs of the season.</p>
      
      <h2>Fresh Asparagus Delights</h2>
      <p>Our spring asparagus, sourced from local farms just outside the city, takes center stage in several new dishes. The asparagus and burrata salad with lemon vinaigrette has quickly become a guest favorite, showcasing the vegetable's natural sweetness alongside creamy Italian cheese.</p>
      
      <h2>Mediterranean Artichokes</h2>
      <p>We're also featuring baby artichokes in our new Mediterranean-style preparation, braised with white wine, garlic, and fresh thyme. This dish perfectly embodies our philosophy of letting high-quality ingredients speak for themselves.</p>
      
      <h2>Herb Garden to Table</h2>
      <p>Our rooftop herb garden is flourishing this spring, providing us with fresh basil, oregano, and mint that we use throughout our menu. There's nothing quite like the aroma of freshly picked herbs to elevate a dish from good to extraordinary.</p>
    `,
    image:
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
    date: "March 8, 2025",
    author: "Sofia Martinez",
    category: "Menu",
  },
  {
    id: "3",
    title: "Wine Pairing: Perfect Matches for Mediterranean Cuisine",
    excerpt:
      "Learn about our carefully curated wine selection and discover which wines complement our Mediterranean dishes best.",
    content: `
      <p>Wine and Mediterranean cuisine are natural partners, each enhancing the other to create a dining experience that's greater than the sum of its parts. At Le Seven, our sommelier has carefully curated a selection of wines that perfectly complement our bohemian Mediterranean menu.</p>
      
      <h2>Provence Rosé: The Perfect All-Rounder</h2>
      <p>Our Provence rosé is more than just a pretty pink wine—it's a versatile companion to many of our dishes. Its crisp acidity and subtle fruit flavors make it an ideal match for our Mediterranean mezze platter, while its mineral notes complement our grilled sea bream beautifully.</p>
      
      <h2>Bold Reds for Rich Flavors</h2>
      <p>For heartier dishes like our lamb tagine, we recommend our Chianti Classico. The wine's earthy undertones and balanced tannins provide the perfect counterpoint to the rich, aromatic spices in the tagine, creating a harmonious balance on the palate.</p>
      
      <h2>Crisp Whites for Seafood</h2>
      <p>Our Sancerre, with its bright acidity and mineral complexity, is the ideal partner for our seafood dishes. Whether you're enjoying our octopus carpaccio or our daily fish special, this Loire Valley white wine enhances the natural flavors of the sea.</p>
    `,
    image:
      "https://images.pexels.com/photos/1055058/pexels-photo-1055058.jpeg?auto=compress&cs=tinysrgb&w=800",
    date: "February 28, 2025",
    author: "Marie Dubois",
    category: "Wine",
  },
  {
    id: "4",
    title: "Behind the Scenes: Creating Our Bohemian Atmosphere",
    excerpt:
      "Take a peek behind the curtain to see how we create the warm, bohemian atmosphere that makes Le Seven so special.",
    content: `
      <p>The atmosphere at Le Seven is carefully crafted to transport our guests to a Mediterranean bohemian paradise. Every detail, from the warm lighting to the eclectic décor, is chosen to create an environment where guests can relax, connect, and enjoy exceptional food.</p>
      
      <h2>Lighting That Tells a Story</h2>
      <p>Our lighting design plays a crucial role in creating the perfect ambiance. We use a combination of warm Edison bulbs, Moroccan-inspired lanterns, and candles to create layers of light that change throughout the evening, from the golden hour glow of early dinner to the intimate atmosphere of late-night dining.</p>
      
      <h2>Eclectic Décor with Purpose</h2>
      <p>Each piece of décor in Le Seven has been carefully selected to contribute to our bohemian Mediterranean story. From the vintage Moroccan rugs to the hand-painted ceramics from local artisans, every element adds to the authentic, lived-in feeling we strive to create.</p>
      
      <h2>Music That Moves the Soul</h2>
      <p>Our carefully curated playlist features a mix of Mediterranean folk music, French chanson, and contemporary acoustic pieces that complement rather than compete with conversation. The music evolves throughout the evening, creating a soundtrack that enhances the dining experience.</p>
    `,
    image:
      "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=800",
    date: "February 20, 2025",
    author: "Isabella Romano",
    category: "Atmosphere",
  },
  {
    id: "5",
    title: "Sustainable Dining: Our Commitment to the Environment",
    excerpt:
      "Learn about Le Seven's sustainability initiatives and how we're working to reduce our environmental impact while serving exceptional food.",
    content: `
      <p>At Le Seven, we believe that exceptional dining and environmental responsibility go hand in hand. Our commitment to sustainability influences every aspect of our operation, from sourcing ingredients to managing waste.</p>
      
      <h2>Local Sourcing Philosophy</h2>
      <p>We work exclusively with local farmers and producers within a 50-kilometer radius of the restaurant. This not only ensures the freshest ingredients but also significantly reduces our carbon footprint. Our relationships with these suppliers allow us to trace every ingredient back to its source.</p>
      
      <h2>Zero-Waste Kitchen Practices</h2>
      <p>Our kitchen operates on zero-waste principles. Vegetable scraps become compost for our herb garden, meat trimmings are used for stocks and sauces, and any unavoidable food waste is processed through our partnership with a local biogas facility.</p>
      
      <h2>Eco-Friendly Operations</h2>
      <p>From biodegradable cleaning products to energy-efficient equipment, we've made conscious choices throughout our operation. Our water filtration system eliminates the need for bottled water, and our wine selection prioritizes organic and biodynamic producers.</p>
    `,
    image:
      "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=800",
    date: "February 12, 2025",
    author: "Chef Antoine Dubois",
    category: "Sustainability",
  },
  {
    id: "6",
    title: "The Perfect Date Night: Romance at Le Seven",
    excerpt:
      "Discover why Le Seven is the ideal destination for romantic dinners, with tips for creating unforgettable date night experiences.",
    content: `
      <p>Romance is in the air at Le Seven, where intimate lighting, exceptional cuisine, and attentive service create the perfect setting for memorable date nights. Our bohemian Mediterranean atmosphere naturally lends itself to romantic dining experiences.</p>
      
      <h2>Intimate Seating Options</h2>
      <p>Our restaurant features several intimate seating areas perfect for couples. The corner banquettes offer privacy and comfort, while our window tables provide a romantic view of the bustling street life outside. For special occasions, we can arrange private dining experiences.</p>
      
      <h2>Aphrodisiac Menu Items</h2>
      <p>Our menu features several dishes known for their romantic properties. The fresh oysters with champagne mignonette, our decadent chocolate desserts, and our selection of fine wines all contribute to creating a sensual dining experience.</p>
      
      <h2>Special Occasion Services</h2>
      <p>We love being part of life's special moments. Whether it's an anniversary, proposal, or simply a desire to reconnect, our team can help create personalized touches like custom dessert messages, special wine selections, or preferred seating arrangements.</p>
    `,
    image:
      "https://images.pexels.com/photos/2679501/pexels-photo-2679501.jpeg?auto=compress&cs=tinysrgb&w=800",
    date: "February 5, 2025",
    author: "Sofia Martinez",
    category: "Experience",
  },
];

export function BlogIndex({ onNavigateHome, onOpenPost }: BlogIndexProps) {
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
            onClick={onNavigateHome}
            className="font-montserrat font-medium text-[#4C4C4C] hover:text-[#92C6C4] transition-colors"
          >
            ← Back to Restaurant
          </button>
        </div>
      </nav>

      {/* Blog Header */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-pacifico text-4xl md:text-6xl text-[#92C6C4] mb-6">
            Le Seven Blog
          </h1>
          <p className="font-montserrat text-xl text-[#4C4C4C]/80 leading-relaxed max-w-2xl mx-auto">
            Stories from our kitchen, insights into Mediterranean cuisine, and
            the latest news from our bohemian restaurant
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative h-80 lg:h-auto">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#92C6C4] text-white px-3 py-1 rounded-full font-montserrat text-sm font-medium">
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center space-x-4 text-sm text-[#4C4C4C]/60 mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar size={16} />
                    <span className="font-montserrat">{blogPosts[0].date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User size={16} />
                    <span className="font-montserrat">
                      {blogPosts[0].author}
                    </span>
                  </div>
                </div>
                <h2 className="font-pacifico text-2xl lg:text-3xl text-[#4C4C4C] mb-4 leading-tight">
                  {blogPosts[0].title}
                </h2>
                <p className="font-montserrat text-[#4C4C4C]/80 mb-6 leading-relaxed">
                  {blogPosts[0].excerpt}
                </p>
                <button
                  onClick={() => onOpenPost(blogPosts[0])}
                  className="inline-flex items-center space-x-2 bg-[#92C6C4] text-white px-6 py-3 rounded-full font-montserrat font-semibold hover:bg-[#F7C8C8] transition-colors duration-300 self-start"
                >
                  <span>Read More</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-pacifico text-3xl text-[#92C6C4] mb-12 text-center">
            Latest Stories
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#F6E08B] text-[#4C4C4C] px-2 py-1 rounded-full font-montserrat text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-4 text-xs text-[#4C4C4C]/60 mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span className="font-montserrat">{post.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User size={14} />
                      <span className="font-montserrat">{post.author}</span>
                    </div>
                  </div>

                  <h3 className="font-pacifico text-lg text-[#4C4C4C] mb-3 leading-tight">
                    {post.title}
                  </h3>

                  <p className="font-montserrat text-sm text-[#4C4C4C]/80 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <button
                    onClick={() => onOpenPost(post)}
                    className="inline-flex items-center space-x-2 text-[#92C6C4] hover:text-[#F7C8C8] font-montserrat font-semibold text-sm transition-colors"
                  >
                    <span>Read More</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-pacifico text-3xl text-[#92C6C4] mb-4">
            Stay Updated
          </h2>
          <p className="font-montserrat text-[#4C4C4C]/80 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest stories, seasonal
            menu updates, and exclusive dining experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full border border-[#92C6C4]/30 focus:outline-none focus:border-[#92C6C4] font-montserrat"
            />
            <button className="bg-[#92C6C4] text-white px-8 py-3 rounded-full font-montserrat font-semibold hover:bg-[#F7C8C8] transition-colors">
              Subscribe
            </button>
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
            <a
              href="#"
              className="font-montserrat text-white/80 hover:text-[#92C6C4] transition-colors"
            >
              Privacy Policy
            </a>
            <span className="text-white/40">•</span>
            <a
              href="#"
              className="font-montserrat text-white/80 hover:text-[#92C6C4] transition-colors"
            >
              Legal Notice
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
