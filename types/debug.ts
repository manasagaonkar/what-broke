export interface DebugResult {
  category: string;
  severity: "LOW" | "MEDIUM" | "HIGH";
  title: string;
  rootCause: string;
  explanation: string;
  possibleFixes: string[];
  recommendedFix: string;
}
export interface DebugHistoryItem {
  id: string;
  error: string;
  result: DebugResult;
  createdAt: Date;
}