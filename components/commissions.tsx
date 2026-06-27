"use client";

import { useState } from "react";
import { Check, X, Sparkles, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CommissionTier,
  commissionCategories,
  faqItems,
} from "@/types/comission";

export function Commissions() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currency, setCurrency] = useState<"usd" | "idr">("usd");
  const commissionsOpen = true;

  return (
    <section
      id="commissions"
      className="relative graph-paper py-24 overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-border" />
      <div className="absolute bottom-20 right-0 w-96 h-96 rounded-full bg-primary/8 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">
              Video Commissions
            </span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground">
            Commission a Video
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Custom animated videos for your VTuber, brand, or personal project.
            Each commission is made with love and lots of caffeine.
          </p>
        </div>

        {/* Availability badge */}
        <div className="flex justify-center mb-12">
          <span
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold",
              commissionsOpen
                ? "bg-green-500/10 text-green-400 border-green-500/30"
                : "bg-red-500/10 text-red-400 border-red-500/30",
            )}
          >
            <span
              className={cn(
                "w-2 h-2 rounded-full",
                commissionsOpen ? "bg-green-400 animate-pulse" : "bg-red-400",
              )}
            />
            {commissionsOpen
              ? "Commissions Open — 3 slots available"
              : "Commissions Closed"}
          </span>
        </div>

        {/* Currency toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center rounded-full border border-border p-1 bg-card">
            <button
              onClick={() => setCurrency("usd")}
              className={cn(
                "px-3 py-1.5 text-sm rounded-full transition-colors",
                currency === "usd"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground",
              )}
            >
              USD
            </button>

            <button
              onClick={() => setCurrency("idr")}
              className={cn(
                "px-3 py-1.5 text-sm rounded-full transition-colors",
                currency === "idr"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground",
              )}
            >
              IDR
            </button>
          </div>
        </div>

        {/* Pricing tiers */}
        <div className="grid md:grid-row-3 gap-6 mb-16">
          {commissionCategories.map((category) => (
            <div key={category.id} className="mb-16">
              <div className="mb-6">
                <h3 className="font-display text-2xl font-bold">
                  {category.title}
                </h3>

                <p className="text-muted-foreground">{category.description}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 ">
                {category.tiers.map((tier) => {
                  const Icon = tier.icon;
                  return (
                    <div
                      key={tier.id}
                      className={cn(
                        "relative flex flex-col rounded-2xl border p-6 transition-all duration-300",
                        tier.popular
                          ? "border-primary/50 bg-card shadow-[0_0_40px_rgba(217,70,239,0.15)] scale-[1.02]"
                          : "border-border bg-card hover:border-primary/30",
                      )}
                    >
                      {/* Popular badge */}
                      {tier.popular && (
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                          <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold glow-purple">
                            Most Popular
                          </span>
                        </div>
                      )}

                      {/* Icon & name */}
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-xl border flex items-center justify-center",
                            tier.accentBg,
                          )}
                        >
                          <Icon className={cn("w-5 h-5", tier.accent)} />
                        </div>
                        <div>
                          <h3 className="font-display font-bold text-foreground">
                            {tier.name}
                          </h3>
                          <p className="text-muted-foreground text-xs">
                            {tier.description.slice(0, 40)}…
                          </p>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="mb-5">
                        <span className="font-display font-bold text-4xl text-foreground">
                          {currency === "usd"
                            ? tier.price
                            : tier.priceIndo || tier.price}
                        </span>
                        {tier.priceNote && (
                          <span className="text-muted-foreground text-sm ml-1">
                            {tier.priceNote}
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                        {tier.description}
                      </p>

                      {/* Features */}
                      <ul className="space-y-2.5 mb-6 flex-1">
                        {tier.features.map((f) => (
                          <li
                            key={f}
                            className="flex items-start gap-2 text-sm text-foreground"
                          >
                            <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                        {tier.notIncluded?.map((f) => (
                          <li
                            key={f}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <X className="w-4 h-4 text-muted-foreground/50 flex-shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <a
                        href="mailto:sorrow.akoji@example.com?subject=Commission%20Inquiry"
                        className={cn(
                          "block text-center py-3 rounded-full font-semibold text-sm transition-all duration-200",
                          tier.popular
                            ? "bg-primary text-primary-foreground glow-purple hover:opacity-90"
                            : "border border-border text-foreground hover:border-primary/50 hover:bg-primary/5",
                        )}
                      >
                        Submit Inquiry
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Terms notice */}
        <div className="flex items-start gap-3 p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 mb-14 max-w-2xl mx-auto">
          <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-amber-200/80 text-sm leading-relaxed">
            By commissioning me, you agree to my{" "}
            <a href="#" className="underline hover:text-amber-300">
              Terms of Service
            </a>
            . I reserve the right to decline requests that conflict with my
            values. All commissions are for personal use only unless a
            commercial license is negotiated.
          </p>
        </div>

        {/* FAQ */}
        {/* <div className="max-w-2xl mx-auto">
          <h3 className="font-display font-bold text-xl text-foreground mb-6 text-center">
            Frequently Asked Questions
          </h3>
          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-card overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
                  aria-expanded={openFaq === i}
                >
                  {item.q}
                  <span
                    className={cn(
                      'flex-shrink-0 w-5 h-5 rounded-full border border-border flex items-center justify-center text-muted-foreground transition-transform duration-200',
                      openFaq === i && 'rotate-180',
                    )}
                  >
                    <svg
                      viewBox="0 0 12 12"
                      fill="none"
                      className="w-3 h-3"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 4l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
}
