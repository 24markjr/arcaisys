"use client";

import { startTransition, useActionState, useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, ChevronDown, LoaderCircle } from "lucide-react";
import { submitContact } from "@/app/contact/actions";
import {
  HONEYPOT_FIELD,
  STARTED_FIELD,
  fieldNames,
  interestOptions,
  readValues,
  validateContact,
  type ContactField,
  type ContactState,
} from "@/lib/contact";
import { cn } from "@/lib/cn";

const initialState: ContactState = { status: "idle" };

const labels: Record<ContactField, string> = {
  name: "Name",
  email: "Business email",
  company: "Company",
  interest: "What would you like to discuss?",
  message: "Message",
};

type ContactFormProps = {
  /** Pre-selected interest, e.g. from /contact?interest=hospio. */
  defaultInterest?: string;
};

export function ContactForm(props: ContactFormProps) {
  // Remounting with a new key is the clean way to reset the action state for "Send another".
  const [instance, setInstance] = useState(0);
  return <ContactFormInner key={instance} {...props} onReset={() => setInstance((n) => n + 1)} />;
}

function ContactFormInner({ defaultInterest, onReset }: ContactFormProps & { onReset: () => void }) {
  const [state, formAction, pending] = useActionState(submitContact, initialState);
  const [clientErrors, setClientErrors] = useState<Partial<Record<ContactField, string>>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const startedRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  // Record when the visitor started; written straight to the DOM, so no re-render.
  useEffect(() => {
    if (startedRef.current) startedRef.current.value = String(Date.now());
  }, []);

  const serverErrors = state.status === "invalid" ? state.errors : {};
  const errors = { ...serverErrors, ...clientErrors };
  const values = state.status === "invalid" || state.status === "error" ? state.values : undefined;

  // Move focus to the outcome so keyboard and screen-reader users hear it.
  useEffect(() => {
    if (state.status === "sent") successRef.current?.focus();
    if (state.status === "invalid") focusFirstInvalid(formRef.current, state.errors);
  }, [state]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const result = validateContact(readValues(new FormData(event.currentTarget)));
    if (!result.ok) {
      event.preventDefault();
      setClientErrors(result.errors);
      focusFirstInvalid(event.currentTarget, result.errors);
      return;
    }
    setClientErrors({});
    // Submit through a transition instead of letting the browser post the form: React
    // would otherwise reset every field after the action, losing the visitor's text if
    // sending fails. The form's `action` remains as the no-JavaScript fallback.
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => formAction(formData));
  }

  function revalidateField(name: ContactField, form: HTMLFormElement | null) {
    if (!form || !errors[name]) return;
    const result = validateContact(readValues(new FormData(form)));
    setClientErrors((current) => {
      const next = { ...current };
      if (result.ok || !result.errors[name]) delete next[name];
      else next[name] = result.errors[name];
      return next;
    });
  }

  if (state.status === "sent") {
    return (
      <div
        role="status"
        data-contact-success
        className="rounded-[3px] border border-line bg-surface-alt p-8 md:p-12"
      >
        <span className="inline-flex size-10 items-center justify-center rounded-full bg-action text-on-action">
          <Check aria-hidden className="size-5" strokeWidth={2} />
        </span>
        <h2 ref={successRef} tabIndex={-1} className="mt-8 text-h3 font-semibold outline-none">
          Thank you — your message has been sent.
        </h2>
        <p className="mt-4 max-w-[44ch] text-ink-soft">
          It has been delivered to the Arcaisys team, and the reply will come to the email address you gave.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="link-underline mt-8 pb-0.5 text-small font-semibold"
        >
          Send another message
        </button>
      </div>
    );
  }

  const field = (name: ContactField) => ({
    id: `contact-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
    // Re-check a field that has an error as the visitor types, so the error clears the
    // moment it is fixed — not on blur, which would shift the layout under a pending click.
    onChange: (event: { currentTarget: { form: HTMLFormElement | null } }) =>
      revalidateField(name, event.currentTarget.form),
    className: cn(
      "mt-3 block w-full rounded-[3px] border bg-surface px-4 py-3.5 text-body text-ink transition-colors duration-(--dur-fast)",
      "placeholder:text-ink-muted hover:border-ink-muted focus:border-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2",
      errors[name] ? "border-accent" : "border-field",
    ),
  });

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={handleSubmit}
      noValidate
      className="grid gap-7 sm:grid-cols-2"
    >
      {state.status === "error" ? (
        <div
          role="alert"
          data-contact-alert
          className="border-l-2 border-accent bg-surface-alt px-5 py-4 text-small sm:col-span-2"
        >
          {state.message}
        </div>
      ) : null}

      <Field label={labels.name} name="name" error={errors.name}>
        <input {...field("name")} type="text" autoComplete="name" required defaultValue={values?.name} />
      </Field>

      <Field label={labels.email} name="email" error={errors.email}>
        <input {...field("email")} type="email" autoComplete="email" required defaultValue={values?.email} />
      </Field>

      <Field label={labels.company} name="company" error={errors.company} optional>
        <input {...field("company")} type="text" autoComplete="organization" defaultValue={values?.company} />
      </Field>

      <Field label={labels.interest} name="interest" error={errors.interest}>
        <div className="relative">
          <select
            {...field("interest")}
            required
            defaultValue={values?.interest ?? defaultInterest ?? ""}
            className={cn(field("interest").className, "appearance-none pr-12")}
          >
            <option value="" disabled>
              Choose one
            </option>
            {interestOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden
            strokeWidth={1.75}
            className="pointer-events-none absolute top-1/2 right-4 mt-1.5 size-4 -translate-y-1/2 text-ink-muted"
          />
        </div>
      </Field>

      <Field label={labels.message} name="message" error={errors.message} className="sm:col-span-2">
        <textarea
          {...field("message")}
          rows={6}
          required
          defaultValue={values?.message}
          className={cn(field("message").className, "resize-y")}
        />
      </Field>

      {/* Spam traps: invisible to people and assistive technology. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={HONEYPOT_FIELD}>Leave this field empty</label>
        <input
          id={HONEYPOT_FIELD}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>
      <input ref={startedRef} type="hidden" name={STARTED_FIELD} defaultValue="" />

      <div className="flex flex-col gap-5 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[46ch] text-small text-ink-muted">
          We use these details only to reply to you, and never add you to a mailing list. How we handle them:{" "}
          <a href="/privacy" className="link-underline text-ink">
            privacy policy
          </a>
          .
        </p>
        <button
          type="submit"
          disabled={pending}
          aria-disabled={pending}
          className="group inline-flex h-12 shrink-0 items-center justify-center gap-3 rounded-[3px] bg-action px-7 text-small font-semibold text-on-action transition-colors duration-(--dur-fast) hover:bg-action-hover disabled:cursor-progress disabled:opacity-70"
        >
          {pending ? "Sending…" : "Send message"}
          {pending ? (
            <LoaderCircle aria-hidden className="size-4 animate-spin" strokeWidth={1.75} />
          ) : (
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform duration-(--dur-base) ease-out-expo group-hover:translate-x-1"
              strokeWidth={1.75}
            />
          )}
        </button>
      </div>
      <p aria-live="polite" className="sr-only">
        {pending ? "Sending your message" : ""}
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  optional,
  className,
  children,
}: {
  label: string;
  name: ContactField;
  error?: string;
  optional?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={`contact-${name}`}
        className="flex items-baseline justify-between text-small font-semibold"
      >
        {label}
        {optional ? <span className="font-mono text-label text-ink-muted uppercase">Optional</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`contact-${name}-error`} className="mt-2 text-small text-accent">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function focusFirstInvalid(form: HTMLFormElement | null, errors: Partial<Record<ContactField, string>>) {
  const first = fieldNames.find((name) => errors[name]);
  if (first) form?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
}
