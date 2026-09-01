export interface DebugResult {
  category: string;
  severity: "LOW" | "MEDIUM" | "HIGH";
  title: string;
  rootCause: string;
  explanation: string;
  possibleFixes: string[];
  recommendedFix: string;
}