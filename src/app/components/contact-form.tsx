"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitContactForm } from "../contact/actions";
import ReCAPTCHA from "react-google-recaptcha";

const initialState = {
  success: false,
  message: "",
};

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  useEffect(() => {
    if (state.success && formRef.current) {
      formRef.current.reset();
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    }
  }, [state.success]);

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
          />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
          Subject
        </label>
        <input
          type="text"
          name="subject"
          id="subject"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          rows={4}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
        />
      </div>

      <div className="flex justify-center">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "your_site_key"}
          onChange={setCaptchaToken}
        />
      </div>
      <input type="hidden" name="g-recaptcha-response" value={captchaToken || ""} />

      <div>
        <button
          type="submit"
          disabled={isPending || !captchaToken}
          className="flex w-full justify-center rounded-md bg-black px-4 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 transition-colors"
        >
          {isPending ? "Sending..." : "Send Message"}
        </button>
      </div>
      
      {state.message && (
        <div className={`rounded-md p-4 ${state.success ? 'bg-green-50' : 'bg-red-50'}`}>
          <div className="flex">
            <div className="ml-3">
              <h3 className={`text-sm font-medium ${state.success ? 'text-green-800' : 'text-red-800'}`}>
                {state.message}
              </h3>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}

