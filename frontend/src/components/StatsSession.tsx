interface Stat {
  value: string;
  label: string;
}

interface StatsSessionProps {
  stats: Stat[];
}

const StatsSession: React.FC<StatsSessionProps> = ({ stats }) => {
  return (
    <div className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-3 gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl font-bold">{stat.value}</div>
              <p className="mt-2 text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSession;
