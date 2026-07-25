import React from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Badge from "../components/ui/Badge";

const Contact = () => {
  return (
    <div className="space-y-6 py-8">
      <section className="rounded-4xl bg-white p-4 sm:p-6 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="space-y-4">
            <Badge text="Contact us" />
            <h1 className="text-4xl font-semibold text-(--color-darkgray) sm:text-5xl">
              We are here to help with your packaging needs.
            </h1>
            <p className="text-base leading-7 text-(--color-neutrals-gray-9)">
              Need help choosing the right boxes, labels, or shipping essentials? Send us a message and our team will be in touch shortly.
            </p>

            <div className="space-y-3 rounded-3xl bg-(--color-fawhite) p-5">
              <div>
                <h3 className="text-lg font-semibold text-(--color-darkgray)">Email</h3>
                <p className="text-sm text-(--color-neutrals-gray-9)">hello@kicksstore.com</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-(--color-darkgray)">Phone</h3>
                <p className="text-sm text-(--color-neutrals-gray-9)">+1 (800) 555-0148</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-(--color-darkgray)">Location</h3>
                <p className="text-sm text-(--color-neutrals-gray-9)">120 Packaging Avenue, New York, NY</p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-(--color-gray) bg-(--color-fawhite) p-4 sm:p-6">
            <form className="space-y-4">
              <Input label="Full name" placholder="Your name" className="bg-white" />
              <Input label="Email address" type="email" placholder="you@example.com" className="bg-white" />
              <Input label="Subject" placholder="How can we help?" className="bg-white" />
              <div className="flex flex-col w-full">
                <label className="mb-2 text-(--color-neutrals-gray-10)" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  placeholder="Tell us more about your project..."
                  className="w-full rounded-lg border border-(--color-darkgray) bg-white px-4 py-3 outline-none focus:ring-0"
                />
              </div>
              <Button variant="fill" size="medium" className="w-full justify-center">
                Send message
              </Button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
