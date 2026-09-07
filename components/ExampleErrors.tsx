interface ExampleErrorsProps {
  onSelectExample: (error: string) => void;
}

const examples = [
  {
    label: "📦 Dependency Conflict",
    error:
      "npm ERR! code ERESOLVE\nnpm ERR! ERESOLVE unable to resolve dependency tree\nnpm ERR! peer dependency conflict",
  },
  {
    label: "⚠️ Undefined Property",
    error:
      "TypeError: Cannot read properties of undefined (reading 'name')",
  },
  {
    label: "☁️ AWS Deployment",
    error:
      "CloudFormation deployment failed. Stack status: ROLLBACK_COMPLETE",
  },
  {
    label: "🔌 Port Already in Use",
    error:
      "Error: listen EADDRINUSE: address already in use :::3000",
  },
  {
    label: "🔐 Unauthorized",
    error:
      "Error: UnauthorizedException: User is not authorized to perform this action",
  },
  {
    label: "🟦 TypeScript Error",
    error:
      "Type 'string' is not assignable to type 'number'.",
  },
  {
    label: "🐳 Docker Error",
    error:
      "Error response from daemon: port is already allocated",
  },
  {
    label: "🗄️ Database Error",
    error:
      "Error: connect ECONNREFUSED 127.0.0.1:5432",
  },
];

export default function ExampleErrors({
  onSelectExample,
}: ExampleErrorsProps) {
  return (
    <div className="mt-6 w-full">
      <p className="mb-3 text-center text-xs font-medium tracking-[0.2em] text-gray-500">
        TRY AN EXAMPLE
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        {examples.map((example) => (
          <button
            key={example.label}
            type="button"
            onClick={() => onSelectExample(example.error)}
            className="rounded-lg border border-gray-700 bg-[#161B22] px-4 py-2 text-sm text-gray-300 transition hover:border-red-400 hover:bg-[#1C2128] hover:text-white"
          >
            {example.label}
          </button>
        ))}
      </div>
    </div>
  );
}