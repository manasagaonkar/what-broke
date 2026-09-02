"use client";

import { useEffect, useState } from "react";

const analysisSteps = [
  "Reading error message",
  "Identifying error category",
  "Finding possible causes",
  "Preparing recommended fix",
];

export default function LoadingAnalysis() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((previousStep) => {
        if (previousStep >= analysisSteps.length - 1) {
          clearInterval(interval);
          return previousStep;
        }

        return previousStep + 1;
      });
    }, 350);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-8 w-full rounded-xl border border-gray-700 bg-[#161B22] p-6 text-left">
      <p className="text-xs font-medium tracking-[0.2em] text-gray-500">
        ANALYZING YOUR ERROR
      </p>

      <div className="mt-6 space-y-4">
        {analysisSteps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const isPending = index > currentStep;

          return (
            <div key={step} className="flex items-center gap-3">
              {isCompleted && (
                <span className="text-green-400">✓</span>
              )}

              {isActive && (
                <span className="animate-pulse text-yellow-400">
                  ○
                </span>
              )}

              {isPending && (
                <span className="text-gray-600">○</span>
              )}

              <span
                className={`text-sm ${
                  isPending ? "text-gray-500" : "text-gray-300"
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}