import type { DebugResult } from "@/types/debug";

export function analyzeError(error: string): DebugResult {
  const normalizedError = error.toLowerCase();

  // 1. NPM dependency conflict
  if (
    normalizedError.includes("eresolve") ||
    normalizedError.includes("unable to resolve dependency tree") ||
    normalizedError.includes("peer dependency")
  ) {
    return {
      category: "DEPENDENCY CONFLICT",
      severity: "HIGH",
      title: "Your dependencies cannot be resolved.",
      rootCause:
        "Your installed packages have incompatible version requirements.",
      explanation:
        "One or more packages require versions that cannot exist together in the same dependency tree.",
      possibleFixes: [
        "Check the peer dependency requirements of the conflicting packages.",
        "Upgrade or downgrade packages so their versions are compatible.",
        "Remove node_modules and reinstall dependencies after updating versions.",
      ],
      recommendedFix: "npm install",
    };
  }

  // 2. Undefined value / property error
  if (
    normalizedError.includes("cannot read properties of undefined") ||
    normalizedError.includes("cannot read property")
  ) {
    return {
      category: "UNDEFINED VALUE ERROR",
      severity: "MEDIUM",
      title: "Your code is trying to access a value that does not exist.",
      rootCause:
        "A variable or object is undefined when your code tries to access one of its properties.",
      explanation:
        "This usually happens when data has not loaded yet, an API returned an unexpected response, or an object was not initialized.",
      possibleFixes: [
        "Check whether the value exists before accessing its properties.",
        "Use optional chaining where appropriate, for example object?.property.",
        "Verify that API or asynchronous data has finished loading.",
      ],
      recommendedFix: "Use optional chaining: object?.property",
    };
  }

  // 3. TypeScript type error
  if (
    normalizedError.includes("is not assignable to type") ||
    normalizedError.includes("typescript")
  ) {
    return {
      category: "TYPESCRIPT TYPE ERROR",
      severity: "MEDIUM",
      title: "The value does not match the expected TypeScript type.",
      rootCause:
        "A value with one type is being assigned or passed where a different type is expected.",
      explanation:
        "TypeScript is preventing a possible runtime bug by detecting that your data does not match the type definition.",
      possibleFixes: [
        "Check the expected type and the actual value being passed.",
        "Update the type definition if the data shape is correct.",
        "Convert the value explicitly if conversion is appropriate.",
      ],
      recommendedFix: "Review the expected type and match the value to it.",
    };
  }

  // 4. Authorization error
  if (
    normalizedError.includes("unauthorized") ||
    normalizedError.includes("unauthorizedexception") ||
    normalizedError.includes("access denied")
  ) {
    return {
      category: "AUTHORIZATION ERROR",
      severity: "HIGH",
      title: "Your application does not have permission to perform this action.",
      rootCause:
        "The current user, role, token, or service credentials do not have the required permissions.",
      explanation:
        "The request reached the protected resource, but access was rejected because the authorization rules did not allow it.",
      possibleFixes: [
        "Verify the authenticated user's role and permissions.",
        "Check whether the authentication token is valid and not expired.",
        "Review backend authorization rules and IAM permissions.",
      ],
      recommendedFix: "Verify the user role and required permissions.",
    };
  }

  // 5. AWS / CloudFormation deployment error
  if (
    normalizedError.includes("rollback_complete") ||
    normalizedError.includes("cloudformation") ||
    normalizedError.includes("stack failed")
  ) {
    return {
      category: "AWS DEPLOYMENT ERROR",
      severity: "HIGH",
      title: "Your AWS deployment failed.",
      rootCause:
        "One or more AWS resources failed during deployment, causing the stack operation to roll back.",
      explanation:
        "CloudFormation deployments are transactional. When a required resource fails to create or update, dependent resources may also fail and the stack can roll back.",
      possibleFixes: [
        "Check the CloudFormation stack events for the first resource that failed.",
        "Inspect nested stacks if your deployment uses them.",
        "Fix the underlying resource configuration and deploy again.",
      ],
      recommendedFix:
        "Check the first failed CloudFormation resource event and fix that root cause.",
    };
  }

  // Default / unknown error
  return {
    category: "UNKNOWN ERROR",
    severity: "MEDIUM",
    title: "We could not confidently classify this error.",
    rootCause:
      "The error did not match one of the currently supported patterns.",
    explanation:
      "The rule-based analyzer is intentionally limited. This error will later be handled by AI analysis.",
    possibleFixes: [
      "Read the complete error message and identify the first meaningful failure.",
      "Check the stack trace for the application file where the error originated.",
      "Review recent changes that happened before the error appeared.",
    ],
    recommendedFix: "Provide the complete error message and stack trace for deeper analysis.",
  };
}