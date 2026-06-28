// import { useState } from "react";
// import JourneyListView from "./views/JourneyListView";
// import JourneyDetailView from "./views/JourneyDetailView";

// export default function JourneyLog() {
//   const [selectedWeek, setSelectedWeek] = useState(null);

//   if (selectedWeek) {
//     return <JourneyDetailView weekId={selectedWeek.id} weekName={selectedWeek.cycle} onBack={() => setSelectedWeek(null)} />;
//   }

//   return <JourneyListView onWeekSelect={(week) => setSelectedWeek(week)} />;
// }

import { useState } from "react";
import JourneyListView from "./views/JourneyListView";
import JourneyDetailView from "./views/JourneyDetailView";

export default function JourneyLog() {
  const [selectedWeek, setSelectedWeek] = useState(null);

  if (selectedWeek) {
    return <JourneyDetailView weekId={selectedWeek.id} weekName={selectedWeek.cycle} weekRisk={selectedWeek.risk} onBack={() => setSelectedWeek(null)} />;
  }

  return <JourneyListView onWeekSelect={(week) => setSelectedWeek(week)} />;
}
