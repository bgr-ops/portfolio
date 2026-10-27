"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition, type FormEvent } from "react";
import { toast } from "sonner";
import type { ActionResult } from "@/lib/validation";

/**
 * Submits a form to a server action without React 19's automatic form reset,
 * so the user never loses input on validation errors.
 */
export function useFormSubmit(
  action: (formData: FormData) => Promise<ActionResult>,
  options: { redirectTo?: string } = {},
) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, string[] | undefined>>({});

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await action(formData);
      if (result.ok) {
        setErrors({});
        toast.success(result.message);
        if (options.redirectTo) router.push(options.redirectTo);
        router.refresh();
      } else {
        setErrors(result.fieldErrors ?? {});
        toast.error(result.message);
      }
    });
  }

  return { onSubmit, pending, errors };
}
