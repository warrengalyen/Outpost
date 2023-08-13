import { Input } from "./ui/input";
import { Label } from "./ui/label";

export const TextInputWithLabel = ({
  label,
  id,
  type,
  state,
  setState,
  ...delegated
}: {
  label: string;
  id: string;
  type: string;
  state: Record<string, string>;
  setState: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  delegated?: Record<string, unknown>;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
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
    </div>
  );
};
