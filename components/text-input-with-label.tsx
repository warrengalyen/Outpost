import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export const TextInputWithLabel = ({
  label,
  id,
  type,
  inputType,
  state,
  setState,
  ...delegated
}: {
  label: string;
  id: string;
  type: string;
  inputType?: "input" | "textarea";
  state: Record<string, string>;
  setState: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  [x: string]: unknown;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      {inputType === "textarea" ? (
        <Textarea
          name={id}
          id={id}
          value={state[id] ? String(state[id]) : ""}
          onChange={(e) =>
            setState((prev) => ({ ...prev, [id]: e.target.value }))
          }
          {...delegated}
        />
      ) : (
        <Input
          type={type}
          name={id}
          id={id}
          value={state[id] ? String(state[id]) : ""}
          onChange={(e) =>
            setState((prev) => ({ ...prev, [id]: e.target.value }))
          }
          {...delegated}
        />
      )}
    </div>
  );
};
