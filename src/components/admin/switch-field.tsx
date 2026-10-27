"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";

/**
 * Switch that submits "true"/"false" through a hidden input so it works with
 * plain FormData (and with React's controlled state when `onChange` is passed).
 */
export function SwitchField({
  id,
  name,
  label,
  description,
  defaultChecked = false,
  onChange,
}: {
  id: string;
  name: string;
  label: string;
  description?: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="flex items-start justify-between gap-4">
      <label htmlFor={id} className="cursor-pointer">
        <span className="block text-sm font-medium">{label}</span>
        {description && <span className="mt-0.5 block text-xs text-muted-foreground">{description}</span>}
      </label>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={(v) => {
          setChecked(v);
          onChange?.(v);
        }}
      />
      <input type="hidden" name={name} value={checked ? "true" : "false"} />
    </div>
  );
}
