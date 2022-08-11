import Image from "next/image";

import Sponsor1 from "assets/sponsors/sponsor-1.jpeg";
import Sponsor2 from "assets/sponsors/sponsor-2.jpeg";
import Sponsor3 from "assets/sponsors/sponsor-3.jpeg";
import Sponsor4 from "assets/sponsors/sponsor-4.jpeg";
import Sponsor5 from "assets/sponsors/sponsor-5.jpeg";

export default function Sponsors() {
  const sponsorList = [
    { name: "vg", logo: Sponsor1 },
    { name: "son-sang", logo: Sponsor2 },
    { name: "nst", logo: Sponsor3 },
    { name: "long-mekong", logo: Sponsor4 },
    { name: "ldt", logo: Sponsor5 },
  ];
  return (
    <section className="flex overflow-hidden">
      {sponsorList.map((e) => {
        return (
          <div className="mx-4" key={e.name}>
            <div className="w-48 h-48">
              <Image src={e.logo} alt={e.name} />
            </div>
          </div>
        );
      })}
    </section>
  );
}
