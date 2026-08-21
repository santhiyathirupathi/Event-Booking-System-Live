import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:8080";

function AdminDashboard({ user, onLogout }) {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    setLoading(true);

    try {
      const usersResponse = await fetch(`${API}/api/admin/users`);

      if (usersResponse.ok) {
        const usersData = await usersResponse.json();
        setUsers(Array.isArray(usersData) ? usersData : []);
      }
    } catch (error) {
      console.log("Users API not available:", error);
    }

    try {
      const bookingsResponse = await fetch(`${API}/api/admin/bookings`);

      if (bookingsResponse.ok) {
        const bookingsData = await bookingsResponse.json();
        setBookings(Array.isArray(bookingsData) ? bookingsData : []);
      }
    } catch (error) {
      console.log("Bookings API not available:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const totalRevenue = bookings.reduce(
    (total, booking) =>
      total + Number(booking.totalAmount || booking.amount || 0),
    0
  );

  return (
    <div className="admin-page">

      {/* TOP BAR */}
      <header className="admin-navbar">
        <div className="admin-brand">
          <span className="brand-icon">E</span>
          <div>
            <h2>EventBook</h2>
            <span>Administration</span>
          </div>
        </div>

        <div className="admin-user">
          <div className="admin-avatar">
            {(user?.name || "A").charAt(0).toUpperCase()}
          </div>

          <div className="admin-user-info">
            <strong>{user?.name || "Admin"}</strong>
            <span>Administrator</span>
          </div>

          <button
            className="admin-logout"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </header>

      {/* CONTENT */}
      <main className="admin-content">

        <div className="admin-heading">
          <div>
            <span className="admin-label">ADMINISTRATION</span>
            <h1>Dashboard</h1>
            <p>
              Welcome back, <strong>{user?.name || "Admin"}</strong>. Here's
              what's happening with EventBook.
            </p>
          </div>

          <div className="admin-actions">
            <button
              className="refresh-btn"
              onClick={loadDashboard}
            >
              ↻ Refresh
            </button>

            <a href="/#home" className="website-btn">
              ← Back to Website
            </a>
          </div>
        </div>

        {/* STAT CARDS */}
        <section className="stats-grid">

          <div className="stat-card users-stat">
            <div className="stat-icon">U</div>
            <div>
              <span>Total Users</span>
              <h2>{users.length}</h2>
              <small>Registered accounts</small>
            </div>
          </div>

          <div className="stat-card booking-stat">
            <div className="stat-icon">B</div>
            <div>
              <span>Total Bookings</span>
              <h2>{bookings.length}</h2>
              <small>All event bookings</small>
            </div>
          </div>

          <div className="stat-card revenue-stat">
            <div className="stat-icon">₹</div>
            <div>
              <span>Total Revenue</span>
              <h2>₹{totalRevenue.toLocaleString("en-IN")}</h2>
              <small>Booking revenue</small>
            </div>
          </div>

          <div className="stat-card event-stat">
            <div className="stat-icon">E</div>
            <div>
              <span>Available Events</span>
              <h2>20</h2>
              <small>Active events</small>
            </div>
          </div>

        </section>

        {/* USERS */}
        <section className="admin-section">

          <div className="section-header">
            <div>
              <span>REGISTERED USERS</span>
              <h2>All Users</h2>
            </div>

            <div className="count-badge">
              {users.length} Users
            </div>
          </div>

          <div className="admin-table-wrapper">

            {loading ? (
              <div className="empty-admin">
                <div className="loading-circle"></div>
                <p>Loading users...</p>
              </div>
            ) : users.length === 0 ? (
              <div className="empty-admin">
                <div className="empty-icon">U</div>
                <h3>No users found</h3>
                <p>Registered users will appear here.</p>
              </div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((item) => (
                    <tr key={item.id}>
                      <td>#{item.id}</td>
                      <td>
                        <div className="table-user">
                          <div className="table-avatar">
                            {(item.name || "U")
                              .charAt(0)
                              .toUpperCase()}
                          </div>
                          <strong>{item.name}</strong>
                        </div>
                      </td>
                      <td>{item.email}</td>
                      <td>
                        <span
                          className={
                            item.role === "ADMIN"
                              ? "role admin-role"
                              : "role user-role"
                          }
                        >
                          {item.role || "USER"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

          </div>
        </section>

        {/* BOOKINGS */}
        <section className="admin-section">

          <div className="section-header">
            <div>
              <span>EVENT ACTIVITY</span>
              <h2>Recent Bookings</h2>
            </div>

            <div className="count-badge">
              {bookings.length} Bookings
            </div>
          </div>

          <div className="admin-table-wrapper">

            {loading ? (
              <div className="empty-admin">
                <div className="loading-circle"></div>
                <p>Loading bookings...</p>
              </div>
            ) : bookings.length === 0 ? (
              <div className="empty-admin">
                <div className="empty-icon">B</div>
                <h3>No bookings yet</h3>
                <p>New event bookings will appear here.</p>
              </div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Customer</th>
                    <th>Email</th>
                    <th>Event</th>
                    <th>Tickets</th>
                    <th>Total</th>
                  </tr>
                </thead>

                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>#{booking.id}</td>

                      <td>
                        {booking.customerName ||
                          booking.userName ||
                          booking.name ||
                          "Customer"}
                      </td>

                      <td>
                        {booking.email ||
                          booking.userEmail ||
                          "-"}
                      </td>

                      <td>
                        {booking.eventName ||
                          booking.event ||
                          "-"}
                      </td>

                      <td>
                        {booking.tickets ||
                          booking.quantity ||
                          1}
                      </td>

                      <td>
                        <strong>
                          ₹
                          {Number(
                            booking.totalAmount ||
                              booking.amount ||
                              0
                          ).toLocaleString("en-IN")}
                        </strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

          </div>
        </section>

      </main>
    </div>
  );
}

export default AdminDashboard;