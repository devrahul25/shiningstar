import React, { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react";
import { STATEMENTS, HOW_FOUND, CONTACT } from "@/lib/ssfaData";

const inputCls =
  "w-full px-4 py-3 rounded-xl border-2 border-border bg-white text-charcoal focus:border-blue outline-none transition-colors";
const labelCls = "block text-sm font-bold text-charcoal mb-1.5";
const reqMark = <span className="text-orange">*</span>;

export default function EnquirySection() {
  const [form, setForm] = useState({
    statement: "",
    first_name: "",
    last_name: "",
    age: "",
    phone: "",
    email: "",
    message: "",
    how_found_us: "",
    other_how: "",
    consent: false,
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState("");

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.statement) e.statement = "Please choose a statement.";
    if (!form.first_name.trim()) e.first_name = "First name is required.";
    if (!form.last_name.trim()) e.last_name = "Last name is required.";
    if (!form.phone.trim()) e.phone = "Contact phone is required.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email address.";
    if (!form.how_found_us) e.how_found_us = "Please tell us how you found us.";
    if (form.how_found_us === "Other" && !form.other_how.trim())
      e.other_how = "Please tell us how you found us.";
    if (!form.consent) e.consent = "Please provide consent to proceed.";
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setSubmitting(true);
    setServerError("");
    try {
      // If a custom webhook/API endpoint is configured via env, post to it
      const webhookUrl = import.meta.env.VITE_ENQUIRY_WEBHOOK_URL;
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            submitted_at: new Date().toISOString(),
          }),
        });
      } else {
        // Standard smooth asynchronous submission
        await new Promise((resolve) => setTimeout(resolve, 600));
        console.log("[Enquiry Submitted Successfully]:", form);
      }
      setDone(true);
    } catch {
      setServerError("We couldn't submit your enquiry just now. Please try again, or call us on " + CONTACT.phone + ".");
    } finally {
      setSubmitting(false);
    }
  };

  const RadioRow = ({ name, value, checked, onChange, children }) => (
    <label
      className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-colors ${
        checked ? "border-blue bg-blue/5" : "border-border hover:border-blue/40"
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="mt-0.5 w-5 h-5 accent-blue shrink-0"
      />
      <span className="text-sm text-charcoal/80">{children}</span>
    </label>
  );

  return (
    <section id="enquire" className="bg-white py-20 md:py-28">
      <div className="container-ss">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-14 items-start">
          {/* Intro */}
          <div className="lg:sticky lg:top-28">
            <p className="text-orange font-bold text-sm uppercase tracking-[0.2em] mb-3">
              Register Your Interest
            </p>
            <h2 className="display-section text-charcoal text-balance">
              Start your fostering journey today.
            </h2>
            <p className="mt-5 text-lg text-charcoal/70 leading-relaxed">
              Whether you're simply thinking about fostering or ready to begin
              your application, our experienced team will listen and support you
              at every step. There's no obligation — just a warm, confidential
              conversation.
            </p>
            <div className="mt-6 space-y-3">
              <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 text-charcoal font-semibold hover:text-blue">
                <span className="w-10 h-10 rounded-full bg-blue/10 flex items-center justify-center text-blue">📞</span>
                {CONTACT.phone}
              </a>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 text-charcoal font-semibold hover:text-blue break-all">
                <span className="w-10 h-10 rounded-full bg-green/10 flex items-center justify-center text-green">✉️</span>
                {CONTACT.email}
              </a>
            </div>
            <div className="mt-6 flex items-start gap-2.5 text-sm text-charcoal/60 bg-sky/60 p-4 rounded-xl">
              <ShieldCheck size={18} className="text-blue shrink-0 mt-0.5" />
              <span>Your details are collected only so we can get in touch. Read our <a href="https://www.shiningstarsfostering.com/privacy-policy-shining-stars-fostering/" className="text-blue font-semibold underline">Privacy Policy</a>.</span>
            </div>
          </div>

          {/* Form / success */}
          <div className="bg-mint/40 rounded-[2rem] p-6 md:p-9 soft-shadow">
            {done ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-green/15 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 size={32} className="text-green" />
                </div>
                <h3 className="text-2xl text-charcoal">Thank you, {form.first_name}!</h3>
                <p className="mt-3 text-charcoal/70 max-w-sm mx-auto">
                  Prototype only: your details were saved in this prototype and
                  have <strong>not</strong> been sent to Shining Stars. To speak to
                  the team, please call {CONTACT.phone} or {CONTACT.mobile}.
                </p>
                <button
                  onClick={() => {
                    setDone(false);
                    setForm({ statement: "", first_name: "", last_name: "", age: "", phone: "", email: "", message: "", how_found_us: "", other_how: "", consent: false });
                  }}
                  className="mt-7 bg-blue text-white font-bold px-6 py-3 rounded-full hover:bg-blue/90 transition-colors"
                >
                  Submit another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <p className="text-sm font-semibold text-charcoal bg-yellow/40 border border-dashed border-orange/60 rounded-xl px-4 py-3">
                  Prototype form: submissions are not sent to Shining Stars. Please call us to make a real enquiry.
                </p>
                <div>
                  <label className={labelCls}>Please choose from the following statements: {reqMark}</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {STATEMENTS.map((s) => (
                      <RadioRow key={s} name="statement" value={s} checked={form.statement === s} onChange={() => set("statement", s)}>
                        {s}
                      </RadioRow>
                    ))}
                  </div>
                  {errors.statement && <FieldError msg={errors.statement} />}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="first_name" className={labelCls}>First Name {reqMark}</label>
                    <input id="first_name" className={inputCls} value={form.first_name} onChange={(e) => set("first_name", e.target.value)} />
                    {errors.first_name && <FieldError msg={errors.first_name} />}
                  </div>
                  <div>
                    <label htmlFor="last_name" className={labelCls}>Last Name {reqMark}</label>
                    <input id="last_name" className={inputCls} value={form.last_name} onChange={(e) => set("last_name", e.target.value)} />
                    {errors.last_name && <FieldError msg={errors.last_name} />}
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Age</label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {["under 21", "22-39", "40+"].map((a) => (
                      <RadioRow key={a} name="age" value={a} checked={form.age === a} onChange={() => set("age", a)}>
                        {a}
                      </RadioRow>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className={labelCls}>Contact Phone / Mobile {reqMark}</label>
                    <input id="phone" type="tel" className={inputCls} value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                    {errors.phone && <FieldError msg={errors.phone} />}
                  </div>
                  <div>
                    <label htmlFor="email" className={labelCls}>Email Address</label>
                    <input id="email" type="email" className={inputCls} value={form.email} onChange={(e) => set("email", e.target.value)} />
                    {errors.email && <FieldError msg={errors.email} />}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className={labelCls}>Anything else you would like to tell us about you?</label>
                  <textarea id="message" rows={3} className={`${inputCls} resize-none`} value={form.message} onChange={(e) => set("message", e.target.value)} />
                </div>

                <div>
                  <label className={labelCls}>How did you find out about us? {reqMark}</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {HOW_FOUND.map((h) => (
                      <RadioRow key={h} name="how_found_us" value={h} checked={form.how_found_us === h} onChange={() => set("how_found_us", h)}>
                        {h}
                      </RadioRow>
                    ))}
                  </div>
                  {errors.how_found_us && <FieldError msg={errors.how_found_us} />}
                  {form.how_found_us === "Other" && (
                    <div className="mt-2.5">
                      <label htmlFor="other_how" className={labelCls}>Please tell us how you found us {reqMark}</label>
                      <input id="other_how" className={inputCls} value={form.other_how} onChange={(e) => set("other_how", e.target.value)} />
                      {errors.other_how && <FieldError msg={errors.other_how} />}
                    </div>
                  )}
                </div>

                <div>
                  <label className={`flex items-start gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-colors ${form.consent ? "border-green bg-green/5" : "border-border hover:border-green/40"}`}>
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => set("consent", e.target.checked)}
                      className="mt-0.5 w-5 h-5 accent-green shrink-0"
                    />
                    <span className="text-sm text-charcoal/80">
                      I consent to Shining Stars Fostering Agency collecting my details provided via this form.
                    </span>
                  </label>
                  {errors.consent && <FieldError msg={errors.consent} />}
                </div>

                {serverError && (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border-2 border-destructive/30">
                    <AlertCircle size={18} className="text-destructive shrink-0 mt-0.5" />
                    <p className="text-sm text-destructive">{serverError}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-orange text-white font-bold text-lg px-7 py-4 rounded-full hover:bg-orange/90 transition-colors disabled:opacity-60 inline-flex items-center justify-center gap-2"
                >
                  {submitting ? (<><Loader2 size={18} className="animate-spin" /> Sending…</>) : "Submit Enquiry"}
                </button>
                <p className="text-xs text-charcoal/50 text-center">
                  Fields marked with <span className="text-orange">*</span> are required.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function FieldError({ msg }) {
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-sm text-destructive font-semibold">
      <AlertCircle size={14} />
      {msg}
    </p>
  );
}