import { Appbar } from "./Appbar";
import { Feature } from "./Feature";
import { Hero } from "./Hero";
import StatsSession  from "./StatsSession";
const statsData = [
  { value: '10M+', label: 'Daily Users' },
  { value: '190+', label: 'Countries' },
  { value: '1B+', label: 'Connections Made' },
];

export const Homepage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Appbar />
      <main>
        <Hero />
        <Feature />
        <StatsSession stats={statsData} />
      </main>
    </div>
  );
};
