import React from 'react';

const Home = () => {
  return (
    <div className="d-flex flex-column align-items-center">
      {/* New Modern Banner */}
      <div 
        className="w-100 text-center py-3" 
        style={{ 
          background: "linear-gradient(90deg, #6a11cb, #2575fc)", 
          color: "white", 
          fontSize: "1.6rem", 
          fontWeight: "bold",
          letterSpacing: "1px",
          borderBottom: "4px solid #1e3c72",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)"
        }}
      >
        🍽️ Explore the Best Cuisines Around the World 🌍
      </div>

      {/* Wider Banner Image */}
      <img 
        src="/ban.jpg" 
        className="img-fluid mx-auto" 
        style={{ width: "95%", height: "auto", borderRadius: "10px", marginTop: "10px" }} 
        alt="Banner" 
      />

      {/* Cards Grid */}
      <div className="row row-cols-1 row-cols-md-2 g-4 m-2 w-75">
        <div className="col">
          <div className="card text-center">
            <img 
              src="/indian.jpg" 
              className="card-img-top mx-auto" 
              style={{ width: "90%", height: "170px", objectFit: "cover", borderRadius: "10px" }} 
              alt="Indian Cuisine" 
            />
            <div className="card-body">
              <h5 className="card-title">Indian Cuisine</h5>
              <p className="card-text">Enjoy delicious Indian flavors with rich spices.</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card text-center">
            <img 
              src="/italian.jpg" 
              className="card-img-top mx-auto" 
              style={{ width: "90%", height: "170px", objectFit: "cover", borderRadius: "10px" }} 
              alt="Italian Cuisine" 
            />
            <div className="card-body">
              <h5 className="card-title">Italian Cuisine</h5>
              <p className="card-text">Savor authentic Italian pasta and pizza.</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card text-center">
            <img 
              src="/chinese.jpg" 
              className="card-img-top mx-auto" 
              style={{ width: "90%", height: "170px", objectFit: "cover", borderRadius: "10px" }} 
              alt="Chinese Cuisine" 
            />
            <div className="card-body">
              <h5 className="card-title">Chinese Cuisine</h5>
              <p className="card-text">Explore the bold flavors of Chinese cooking.</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card text-center">
            <img 
              src="/arabic.jpg" 
              className="card-img-top mx-auto" 
              style={{ width: "90%", height: "170px", objectFit: "cover", borderRadius: "10px" }} 
              alt="Arabic Cuisine" 
            />
            <div className="card-body">
              <h5 className="card-title">Arabic Cuisine</h5>
              <p className="card-text">Taste the richness of Arabic culinary traditions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
