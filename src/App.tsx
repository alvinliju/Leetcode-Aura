import React, { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { AuraCard } from './components/AuraCard';

interface Stats {
  difficulty: string;
  count: number;
}

interface UserStats {
  totalSubmissions: Stats[];
  status: string;
}

function App() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [aura, setAura] = useState<number | null>(null);
  const [stats, setStats] = useState<{easy: number, medium: number, hard: number} | null>(null);

  const calculateAura = (stats: Stats[]) => {
    const easyStats = stats.find((item) => item.difficulty === "Easy");
    const mediumStats = stats.find((item) => item.difficulty === "Medium");
    const hardStats = stats.find((item) => item.difficulty === "Hard");

    if (!easyStats || !mediumStats || !hardStats) return 0;

    const easyCount = easyStats.count * 1;
    const mediumCount = mediumStats.count * 3;
    const hardCount = hardStats.count * 8;

    return (easyCount + mediumCount + hardCount) * 1000;
  };

  const fetchUserStats = async (username: string) => {
    if (!username.trim()) {
      setError('Please enter a username');
      return;
    }

    setLoading(true);
    setError('');
    setAura(null);
    setStats(null);

    try {
      const response = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${username}`);
      const data: UserStats = await response.json();

      if (data.status === "error") {
        throw new Error("User not found");
      }

      const calculatedAura = calculateAura(data.totalSubmissions);
      const easyStats = data.totalSubmissions.find((item) => item.difficulty === "Easy");
      const mediumStats = data.totalSubmissions.find((item) => item.difficulty === "Medium");
      const hardStats = data.totalSubmissions.find((item) => item.difficulty === "Hard");

      setStats({
        easy: easyStats?.count || 0,
        medium: mediumStats?.count || 0,
        hard: hardStats?.count || 0
      });
      setAura(calculatedAura);
    } catch (err) {
      setError('Failed to fetch user data. Please check the username and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUserStats(username);
  };

  // Check for username in URL params on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userParam = params.get('u');
    if (userParam) {
      setUsername(userParam);
      fetchUserStats(userParam);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">LeetCode Aura</h1>
          <p className="text-white/40">Discover your mystical coding prowess</p>
        </div>

        {/* Search */}
        <SearchBar
          username={username}
          loading={loading}
          onSubmit={handleSubmit}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Error Message */}
        {error && (
          <div className="text-red-400 text-center p-4 bg-red-500/10 rounded-lg max-w-md mx-auto">
            {error}
          </div>
        )}

        {/* Results */}
        {aura !== null && stats && (
          <div className="animate-fade-in">
            <AuraCard aura={aura} username={username} stats={stats} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;