import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getDashboard } from '../api/auth';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getDashboard();
        setProfile(res.data.user);
      } catch {
        setError('Failed to load profile. Please log in again.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  };

  return (
    <div className="dashboard-page">
      {/* Background blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      {/* Top navbar */}
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <span className="logo-icon-sm">🔐</span>
          <span className="brand-name">Skyflinx JWT</span>
        </div>
        <button id="logout-btn" className="btn-logout" onClick={logout}>
          Sign Out
        </button>
      </nav>

      {/* Main content */}
      <main className="dashboard-main">
        {loading ? (
          <div className="loading-screen">
            <div className="spinner" />
            <p>Loading your profile…</p>
          </div>
        ) : error ? (
          <div className="error-banner">{error}</div>
        ) : (
          <>
            {/* Welcome banner */}
            <div className="welcome-banner">
              <div className="welcome-avatar">
                {profile?.username?.[0]?.toUpperCase() ?? '?'}
              </div>
              <div className="welcome-text">
                <h1>Welcome back, <span className="highlight">{profile?.username}</span>!</h1>
                <p>You're successfully authenticated with JWT.</p>
              </div>
            </div>

            {/* Credential cards */}
            <div className="stats-grid">
              <div className="stat-card" id="card-user-id">
                <div className="stat-icon">🆔</div>
                <div className="stat-info">
                  <span className="stat-label">User ID</span>
                  <span className="stat-value">{profile?.id}</span>
                </div>
              </div>

              <div className="stat-card" id="card-username">
                <div className="stat-icon">👤</div>
                <div className="stat-info">
                  <span className="stat-label">Username</span>
                  <span className="stat-value">{profile?.username}</span>
                </div>
              </div>

              <div className="stat-card" id="card-email">
                <div className="stat-icon">✉️</div>
                <div className="stat-info">
                  <span className="stat-label">Email</span>
                  <span className="stat-value">{profile?.email || 'Not provided'}</span>
                </div>
              </div>

              <div className="stat-card" id="card-joined">
                <div className="stat-icon">📅</div>
                <div className="stat-info">
                  <span className="stat-label">Member Since</span>
                  <span className="stat-value">{formatDate(profile?.date_joined)}</span>
                </div>
              </div>
            </div>

            {/* Token section */}
            <div className="token-section">
              <h2 className="section-title">🔑 Session Info</h2>
              <div className="token-box">
                <div className="token-row">
                  <span className="token-label">Auth Method</span>
                  <span className="token-badge">JWT Bearer Token</span>
                </div>
                <div className="token-row">
                  <span className="token-label">Token Stored In</span>
                  <span className="token-badge">localStorage</span>
                </div>
                <div className="token-row">
                  <span className="token-label">Access Token Expires</span>
                  <span className="token-badge">60 minutes</span>
                </div>
                <div className="token-row">
                  <span className="token-label">Refresh Token Expires</span>
                  <span className="token-badge">7 days</span>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
