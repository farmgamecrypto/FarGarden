"use client";

import { useState } from "react";

type PlantStage = "empty" | "seed" | "grown" | "tree";

export default function GamePage() {
  const initialPlots: PlantStage[] = Array(9).fill("empty");
  const [plots, setPlots] = useState(initialPlots);
  const [score, setScore] = useState(0);
  const [snapshot, setSnapshot] = useState<string>("");

  const plantCrop = (index: number) => {
    if (plots[index] !== "empty") return;

    const newPlots = [...plots];
    newPlots[index] = "seed";
    setPlots(newPlots);

    // Tumbuh ke "grown" setelah 3 detik
    setTimeout(() => {
      const updated = [...newPlots];
      updated[index] = "grown";
      setPlots(updated);
    }, 3000);

    // Tumbuh ke "tree" setelah 6 detik
    setTimeout(() => {
      const updated = [...newPlots];
      updated[index] = "tree";
      setPlots(updated);
    }, 6000);
  };

  const harvestCrop = (index: number) => {
    if (plots[index] !== "tree") return;

    const newPlots = [...plots];
    newPlots[index] = "empty";
    setPlots(newPlots);

    setScore((prev) => prev + 1);
  };

  const getEmoji = (stage: PlantStage) => {
    switch (stage) {
      case "seed": return "🌱";
      case "grown": return "🌿";
      case "tree": return "🌳";
      default: return "🟫";
    }
  };

  // Generate snapshot untuk Farcaster
  const generateFarcasterSnapshot = () => {
    let result = "";
    for (let r = 0; r < 3; r++) {
      const row = plots.slice(r * 3, r * 3 + 3).map(getEmoji).join(" ");
      result += row + "\n";
    }
    result += `Score: ${score}`;
    setSnapshot(result);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-emerald-50 p-8">
      <h1 className="text-3xl font-bold text-emerald-700 mb-6">
        🌾 FarGarden (Farcaster-ready)
      </h1>
      <p className="text-gray-700 mb-6">
        Klik lahan untuk menanam 🌱, klik 🌳 untuk panen!
      </p>

      {/* Grid interaktif */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {plots.map((stage, idx) => (
          <div
            key={idx}
            onClick={() =>
              stage === "tree" ? harvestCrop(idx) : plantCrop(idx)
            }
            className={`w-24 h-24 border-4 rounded-lg flex items-center justify-center text-4xl cursor-pointer
              ${stage === "empty" ? "bg-yellow-200" : "bg-green-400"}`}
          >
            {getEmoji(stage)}
          </div>
        ))}
      </div>

      {/* Tombol generate snapshot */}
      <button
        onClick={generateFarcasterSnapshot}
        className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 mb-4"
      >
        Generate Snapshot untuk Farcaster
      </button>

      {/* Snapshot + score */}
      {snapshot && (
        <pre className="text-xl p-4 bg-white border rounded-lg whitespace-pre-wrap">
          {snapshot}
        </pre>
      )}
    </div>
  );
}
