import "./App.css";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All");

  const [selectedItem, setSelectedItem] = useState(null);
  const [requestSent, setRequestSent] = useState(false);
  const [swapRequests, setSwapRequests] = useState([]);

  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [showDashboard, setShowDashboard] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  const [showLogin, setShowLogin] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const [calcCategory, setCalcCategory] = useState("T-Shirt");
  const [calcBrand, setCalcBrand] = useState("H&M");
  const [calcCondition, setCalcCondition] = useState("Good");
  const [swapValue, setSwapValue] = useState(null);

  const [matchResults, setMatchResults] = useState([]);

  const [newName, setNewName] = useState("");
  const [newBrand, setNewBrand] = useState("");
  const [newSize, setNewSize] = useState("");
  const [newCondition, setNewCondition] = useState("Good");
  const [newLocation, setNewLocation] = useState("Kakinada");
  const [newValue, setNewValue] = useState("");
  const [newImage, setNewImage] = useState("");

  const [clothes, setClothes] = useState([
    {
      id: 1,
      name: "Denim Jacket",
      brand: "Levi's",
      size: "M",
      condition: "Excellent",
      location: "Kakinada",
      value: 1200,
      category: "Jackets",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5",
    },
    {
      id: 2,
      name: "Floral Summer Dress",
      brand: "Zara",
      size: "S",
      condition: "Good",
      location: "Rajahmundry",
      value: 900,
      category: "Dresses",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8",
    },
    {
      id: 3,
      name: "Oversized Hoodie",
      brand: "H&M",
      size: "L",
      condition: "Excellent",
      location: "Visakhapatnam",
      value: 1000,
      category: "Others",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
    },
  ]);

  const calculateSwapValue = () => {
    const categoryValues = {
      "T-Shirt": 500,
      Jeans: 900,
      Dress: 1000,
      Jacket: 1200,
      Hoodie: 800,
    };

    const brandMultipliers = {
      "H&M": 1,
      Zara: 1.2,
      "Levi's": 1.3,
      Nike: 1.4,
    };

    const conditionMultipliers = {
      New: 1.5,
      Excellent: 1.3,
      Good: 1,
      Fair: 0.7,
    };

    const calculatedValue = Math.round(
      categoryValues[calcCategory] *
        brandMultipliers[calcBrand] *
        conditionMultipliers[calcCondition]
    );

    setSwapValue(calculatedValue);
  };

  const findFairMatches = (item) => {
    const matches = clothes.filter(
      (clothing) =>
        clothing.id !== item.id &&
        Math.abs(clothing.value - item.value) <= 300
    );

    setMatchResults(matches);
  };

  const addClothing = () => {
    if (
      newName.trim() === "" ||
      newBrand.trim() === "" ||
      newSize.trim() === "" ||
      newValue.trim() === ""
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const newClothing = {
      id: Date.now(),
      name: newName,
      brand: newBrand,
      size: newSize,
      condition: newCondition,
      location: newLocation,
      value: Number(newValue),
      category: "Others",
      image:
        newImage.trim() !== ""
          ? newImage
          : "https://images.unsplash.com/photo-1529139574466-a303027c1d8b",
    };

    setClothes((current) => [...current, newClothing]);

    setNewName("");
    setNewBrand("");
    setNewSize("");
    setNewCondition("Good");
    setNewLocation("Kakinada");
    setNewValue("");
    setNewImage("");

    alert("Clothing listing added successfully! 🎉");
  };

  const filteredClothes = clothes.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || item.category === category;

    const matchesLocation =
      location === "All" || item.location === location;

    return matchesSearch && matchesCategory && matchesLocation;
  });

  const sendSwapRequest = () => {
    if (!selectedItem) return;

    setRequestSent(true);
    setSwapRequests((current) => [...current, selectedItem]);
  };

  const cancelSwap = () => {
    setSelectedItem(null);
    setRequestSent(false);
    setShowChat(false);
    setMessages([]);
    setMessage("");
    setMatchResults([]);
  };

  const sendMessage = () => {
    if (message.trim() === "") return;

    setMessages((current) => [...current, message.trim()]);
    setMessage("");
  };

  return (
    <div className="app">
      <nav className="navbar">
  <h1>SwapStyle</h1>

  <div className="nav-links">
    <button
      className="nav-button"
      onClick={() => {
        setShowDashboard(false);
        setShowAdmin(false);
        setShowLogin(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      Home
    </button>

    <button
      className="nav-button"
      onClick={() => {
        setShowDashboard(false);
        setShowAdmin(false);
        setShowLogin(false);

        setTimeout(() => {
          document.getElementById("listings")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }}
    >
      Listings
    </button>

    <button
      className="nav-button"
      onClick={() => {
        setShowDashboard(true);
        setShowAdmin(false);
        setShowLogin(false);
      }}
    >
      Dashboard
    </button>

    <button
      className="nav-button"
      onClick={() => {
        setShowAdmin(true);
        setShowDashboard(false);
        setShowLogin(false);
      }}
    >
      Admin
    </button>

    <button
      className="nav-button"
      onClick={() => {
        setShowLogin(true);
        setShowDashboard(false);
        setShowAdmin(false);
      }}
    >
      {loggedIn ? "Account" : "Login"}
    </button>
  </div>
</nav>
      <main className="main-content">
        {showLogin && !loggedIn && (
          <section className="auth-section">
            <div className="auth-card">
              <h2>
                {isRegistering ? "Create Account" : "Welcome Back"} 👋
              </h2>

              <p>
                {isRegistering
                  ? "Create your SwapStyle account"
                  : "Login to continue swapping clothes"}
              </p>

              {isRegistering && (
                <>
                  <input
                    type="text"
                    className="auth-input"
                    placeholder="Full Name"
                  />
                  <input
                    type="text"
                    className="auth-input"
                    placeholder="Location"
                  />
                </>
              )}

              <input
                type="email"
                className="auth-input"
                placeholder="Email Address"
              />

              <input
                type="password"
                className="auth-input"
                placeholder="Password"
              />

              <button
                className="auth-button"
                onClick={() => {
                  setLoggedIn(true);
                  setShowLogin(false);
                }}
              >
                {isRegistering ? "Create Account" : "Login"}
              </button>

              <p className="auth-switch">
                {isRegistering
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}
                <button onClick={() => setIsRegistering((value) => !value)}>
                  {isRegistering ? "Login" : "Register"}
                </button>
              </p>

              <button
                className="auth-close"
                onClick={() => setShowLogin(false)}
              >
                Continue as Guest
              </button>
            </div>
          </section>
        )}

        {showAdmin && !showLogin && !showDashboard && (
          <section className="dashboard">
            <h2>🛠️ Admin Panel</h2>

            <div className="dashboard-card">
              <h3>SwapStyle Administration</h3>
              <p>Manage users, clothing listings and swap activities.</p>

              <div className="dashboard-stats">
                <div>
                  <strong>{clothes.length}</strong>
                  <span>Total Listings</span>
                </div>
                <div>
                  <strong>{swapRequests.length}</strong>
                  <span>Swap Requests</span>
                </div>
                <div>
                  <strong>{showChat ? 1 : 0}</strong>
                  <span>Active Chats</span>
                </div>
              </div>

              <div className="dashboard-sections">
                <div className="dashboard-section">
                  <h3>📊 Platform Analytics</h3>
                  <p>
                    👕 Total Clothing Listings:{" "}
                    <strong>{clothes.length}</strong>
                  </p>
                  <p>
                    🔄 Total Swap Requests:{" "}
                    <strong>{swapRequests.length}</strong>
                  </p>
                  <p>
                    💬 Active Conversations:{" "}
                    <strong>{showChat ? 1 : 0}</strong>
                  </p>
                  <p>
                    📍 Locations Covered: <strong>3</strong>
                  </p>
                  <p>
                    🌱 Platform Goal:{" "}
                    <strong>Reduce Textile Waste</strong>
                  </p>
                </div>

                <div className="dashboard-section">
                  <h3>📦 Manage Listings</h3>
                  <p>{clothes.length} clothing listings available.</p>

                  {clothes.map((item) => (
                    <div key={item.id} className="admin-listing">
                      <strong>{item.name}</strong>
                      <p>
                        {item.brand} • {item.size} • ₹{item.value}
                      </p>

                      <button
                        className="remove-button"
                        onClick={() => {
                          if (
                            window.confirm(
                              `Are you sure you want to remove ${item.name}?`
                            )
                          ) {
                            setClothes((current) =>
                              current.filter(
                                (clothing) => clothing.id !== item.id
                              )
                            );
                          }
                        }}
                      >
                        🗑️ Remove Listing
                      </button>
                    </div>
                  ))}
                </div>

                <div className="dashboard-section">
                  <h3>👥 Manage Users</h3>
                  <p>Registered users can be monitored here.</p>
                  <p>Review user activity and accounts.</p>
                </div>

                <div className="dashboard-section">
                  <h3>🔄 Monitor Swaps</h3>
                  <p>
                    {swapRequests.length} swap requests currently recorded.
                  </p>
                  <p>Track swap activity and negotiations.</p>
                </div>
              </div>

              <button
                className="swap-button"
                onClick={() => setShowAdmin(false)}
              >
                Close Admin Panel
              </button>
            </div>
          </section>
        )}

        {showDashboard && !showLogin && !showAdmin && (
          <section className="dashboard">
            <h2>👤 My Dashboard</h2>

            <div className="dashboard-card">
              <h3>Welcome to SwapStyle!</h3>
              <p>Manage your clothing swaps and activity here.</p>

              <div className="dashboard-stats">
                <div>
                  <strong>{clothes.length}</strong>
                  <span>Listings</span>
                </div>
                <div>
                  <strong>{swapRequests.length}</strong>
                  <span>Swap Requests</span>
                </div>
                <div>
                  <strong>{showChat ? 1 : 0}</strong>
                  <span>Active Chats</span>
                </div>
              </div>

              <div className="dashboard-sections">
                <div className="dashboard-section">
                  <h3>📦 My Listings</h3>
                  {clothes.map((item) => (
                    <p key={item.id}>{item.name}</p>
                  ))}
                </div>

                <div className="dashboard-section">
                  <h3>🔄 Swap Requests</h3>
                  <p>
                    {swapRequests.length} request
                    {swapRequests.length === 1 ? "" : "s"} pending
                  </p>
                  <p>
                    Last request:{" "}
                    {swapRequests.length > 0
                      ? swapRequests[swapRequests.length - 1].name
                      : "No requests yet"}
                  </p>
                </div>

                <div className="dashboard-section">
                  <h3>💬 Active Chats</h3>
                  <p>
                    {showChat ? 1 : 0} active conversation
                    {showChat ? "" : "s"}
                  </p>
                  <p>Continue negotiating your swap.</p>
                </div>
              </div>

              <button
                className="swap-button"
                onClick={() => setShowDashboard(false)}
              >
                Close Dashboard
              </button>
            </div>
          </section>
        )}

        {!showLogin && !showDashboard && !showAdmin && (
          <>
            <section className="hero">
              <h2>Clothing Exchange & Swap Marketplace</h2>
              <p>
                Give your clothes a new life by swapping them with others.
              </p>

              <input
                type="text"
                placeholder="Search for clothes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </section>

            <section className="calculator">
              <h2>🧮 Swap Value Calculator</h2>
              <p>Estimate the fair swap value of your clothing item.</p>

              <div className="calculator-form">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={calcCategory}
                    onChange={(e) => setCalcCategory(e.target.value)}
                  >
                    <option value="T-Shirt">T-Shirt</option>
                    <option value="Jeans">Jeans</option>
                    <option value="Dress">Dress</option>
                    <option value="Jacket">Jacket</option>
                    <option value="Hoodie">Hoodie</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Brand</label>
                  <select
                    value={calcBrand}
                    onChange={(e) => setCalcBrand(e.target.value)}
                  >
                    <option value="H&M">H&M</option>
                    <option value="Zara">Zara</option>
                    <option value="Levi's">Levi's</option>
                    <option value="Nike">Nike</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Condition</label>
                  <select
                    value={calcCondition}
                    onChange={(e) => setCalcCondition(e.target.value)}
                  >
                    <option value="New">New</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                  </select>
                </div>
              </div>

              <button
                className="calculate-button"
                onClick={calculateSwapValue}
              >
                Calculate Swap Value
              </button>

              {swapValue !== null && (
                <div className="value-result">
                  <h3>Estimated Swap Value</h3>
                  <p>₹{swapValue}</p>
                </div>
              )}
            </section>

            <section className="calculator">
              <h2>➕ Add Clothing Listing</h2>
              <p>Add your clothing item to the SwapStyle marketplace.</p>

              <div className="calculator-form">
                <div className="form-group">
                  <label>Clothing Name</label>
                  <input
                    type="text"
                    placeholder="Example: Black T-Shirt"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Brand</label>
                  <input
                    type="text"
                    placeholder="Example: Nike"
                    value={newBrand}
                    onChange={(e) => setNewBrand(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Size</label>
                  <input
                    type="text"
                    placeholder="Example: M"
                    value={newSize}
                    onChange={(e) => setNewSize(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Condition</label>
                  <select
                    value={newCondition}
                    onChange={(e) => setNewCondition(e.target.value)}
                  >
                    <option value="New">New</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <select
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                  >
                    <option value="Kakinada">Kakinada</option>
                    <option value="Rajahmundry">Rajahmundry</option>
                    <option value="Visakhapatnam">Visakhapatnam</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Swap Value (₹)</label>
                  <input
                    type="number"
                    placeholder="Example: 800"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Image URL</label>
                  <input
                    type="text"
                    placeholder="Optional image URL"
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                  />
                </div>
              </div>

              <button className="calculate-button" onClick={addClothing}>
                ➕ Add Listing
              </button>
            </section>

            <section className="listings" id="listings">
              <h2>Available Clothing</h2>

              <div className="categories">
                <button onClick={() => setCategory("All")}>All</button>
                <button onClick={() => setCategory("Jackets")}>Jackets</button>
                <button onClick={() => setCategory("Dresses")}>Dresses</button>
                <button onClick={() => setCategory("Others")}>Others</button>
              </div>

              <div className="location-filter">
                <label>📍 Location:</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option value="All">All Locations</option>
                  <option value="Kakinada">Kakinada</option>
                  <option value="Rajahmundry">Rajahmundry</option>
                  <option value="Visakhapatnam">Visakhapatnam</option>
                </select>
              </div>

              <div className="clothing-grid">
                {filteredClothes.length === 0 ? (
                  <p className="no-results">
                    😔 No clothing found for your selected filters.
                  </p>
                ) : (
                  filteredClothes.map((item) => (
                    <div className="clothing-card" key={item.id}>
                      <div className="clothing-image">
                        <img src={item.image} alt={item.name} />
                      </div>

                      <h3>{item.name}</h3>

                      <p>
                        <strong>Brand:</strong> {item.brand}
                      </p>

                      <p>
                        <strong>Size:</strong> {item.size}
                      </p>

                      <p>
                        <strong>Condition:</strong> {item.condition}
                      </p>

                      <p>
                        <strong>Location:</strong> {item.location}
                      </p>

                      <p>
                        <strong>Estimated Swap Value:</strong> ₹{item.value}
                      </p>

                      <button
                        className="swap-button"
                        onClick={() => {
                          setSelectedItem(item);
                          setRequestSent(false);
                          setShowChat(false);
                          setMessages([]);
                          setMessage("");
                          setMatchResults([]);
                        }}
                      >
                        Request Swap
                      </button>

                      <button
                        className="swap-button"
                        onClick={() => findFairMatches(item)}
                      >
                        🔄 Find Fair Matches
                      </button>
                    </div>
                  ))
                )}
              </div>
            </section>

            {matchResults.length > 0 && (
              <section className="swap-request">
                <h2>🔄 Fair Swap Matches</h2>
                <p>
                  We found clothing items with a similar estimated swap value.
                </p>

                <div className="clothing-grid">
                  {matchResults.map((match) => (
                    <div className="clothing-card" key={match.id}>
                      <div className="clothing-image">
                        <img src={match.image} alt={match.name} />
                      </div>

                      <h3>{match.name}</h3>

                      <p>
                        <strong>Brand:</strong> {match.brand}
                      </p>

                      <p>
                        <strong>Condition:</strong> {match.condition}
                      </p>

                      <p>
                        <strong>Location:</strong> {match.location}
                      </p>

                      <p>
                        <strong>Swap Value:</strong> ₹{match.value}
                      </p>

                      <p>💰 Similar-value match</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {selectedItem && (
              <section className="swap-request">
                <h2>🔄 Swap Request</h2>

                <p>
                  You selected: <strong>{selectedItem.name}</strong>
                </p>

                <p>
                  Brand: {selectedItem.brand} | Estimated Value: ₹
                  {selectedItem.value}
                </p>

                <label className="swap-label">
                  What clothing item do you want to offer?
                </label>

                <input
                  type="text"
                  className="swap-input"
                  placeholder="Example: Blue Denim Jacket"
                />

                <button className="swap-button" onClick={sendSwapRequest}>
                  Send Swap Request
                </button>

                <button className="swap-button" onClick={cancelSwap}>
                  Cancel
                </button>

                {requestSent && (
                  <div className="request-success">
                    ✅ Swap request sent successfully!
                    <p>
                      Your request for{" "}
                      <strong>{selectedItem.name}</strong> has been submitted.
                    </p>
                  </div>
                )}

                {requestSent && (
                  <button
                    className="swap-button"
                    onClick={() => setShowChat(true)}
                  >
                    💬 Chat / Negotiate
                  </button>
                )}

                {showChat && (
                  <div className="chat-box">
                    <h2>💬 Swap Negotiation</h2>

                    <div className="chat-messages">
                      <p className="received-message">
                        Hi! I'm interested in this swap. 😊
                      </p>

                      {messages.map((msg, index) => (
                        <p className="sent-message" key={index}>
                          {msg}
                        </p>
                      ))}
                    </div>

                    <div className="chat-input-area">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            sendMessage();
                          }
                        }}
                        placeholder="Type your message..."
                      />

                      <button
                        className="send-message-button"
                        onClick={sendMessage}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                )}
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
