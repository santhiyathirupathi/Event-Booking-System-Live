const API_URL = "http://localhost:8080/api";

/* =========================
   REGISTER USER
========================= */
export async function registerUser(userData) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      typeof data === "string"
        ? data
        : data?.message || "Registration failed"
    );
  }

  return data;
}

/* =========================
   LOGIN USER
========================= */
export async function loginUser(userData) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      typeof data === "string"
        ? data
        : data?.message || "Invalid email or password"
    );
  }

  return data;
}

/* =========================
   SAVE USER
========================= */
export function saveUser(user) {
  localStorage.setItem("eventbook_user", JSON.stringify(user));
}

/* =========================
   GET SAVED USER
========================= */
export function getUser() {
  const user = localStorage.getItem("eventbook_user");

  if (!user) {
    return null;
  }

  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
}

/* =========================
   LOGOUT
========================= */
export function logoutUser() {
  localStorage.removeItem("eventbook_user");
}

/* =========================
   CREATE BOOKING
========================= */
export async function createBooking(bookingData) {
  const response = await fetch(`${API_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      typeof data === "string"
        ? data
        : data?.message || "Booking failed"
    );
  }

  return data;
}

/* =========================
   GET ALL BOOKINGS
========================= */
export async function getBookings() {
  const response = await fetch(`${API_URL}/bookings`);

  if (!response.ok) {
    throw new Error("Failed to load bookings");
  }

  return response.json();
}

/* =========================
   ADMIN DASHBOARD
========================= */
export async function getAdminDashboard() {
  const response = await fetch(`${API_URL}/admin/dashboard`);

  if (!response.ok) {
    throw new Error("Failed to load admin dashboard");
  }

  return response.json();
}

/* =========================
   ADMIN USERS
========================= */
export async function getAdminUsers() {
  const response = await fetch(`${API_URL}/admin/users`);

  if (!response.ok) {
    throw new Error("Failed to load users");
  }

  return response.json();
}

/* =========================
   ADMIN BOOKINGS
========================= */
export async function getAdminBookings() {
  const response = await fetch(`${API_URL}/admin/bookings`);

  if (!response.ok) {
    throw new Error("Failed to load bookings");
  }

  return response.json();
}