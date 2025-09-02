import React from "react";
import Title from "./Title";

const FAQ = () => {
  return (
    <section className="py-16 px-6 bg-base-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 items-center justify-center">
        {/* FAQ accordion */}
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold primary-color mb-4">
            Frequently Asked Questions
          </h2>
          <p className="mb-6 text-gray-600 text-sm md:text-base">
            Find quick answers to common questions about our car booking
            service.
          </p>

          <div className="join join-vertical w-full bg-base-100 shadow-md rounded-lg">
            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="faq-accordion" defaultChecked />
              <div className="collapse-title font-semibold">
                How do I book a car?
              </div>
              <div className="collapse-content text-sm text-gray-600">
                Choose your preferred car, select your booking date, and
                confirm. Once approved by the admin, you can pay in cash at
                pickup.
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title font-semibold">
                What documents do I need to rent a car?
              </div>
              <div className="collapse-content text-sm text-gray-600">
                You need a valid driving license, a government-issued ID, and in
                some cases, proof of residence for verification.
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title font-semibold">
                How does payment work?
              </div>
              <div className="collapse-content text-sm text-gray-600">
                We keep it simple — once your booking is approved, you can pay
                directly in cash. No online transactions are required.
              </div>
            </div>

            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title font-semibold">
                Can I cancel or reschedule my booking?
              </div>
              <div className="collapse-content text-sm text-gray-600">
                Yes, bookings can be canceled or rescheduled up to 24 hours
                before the pickup time without any extra charge.
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="flex-1 bg-base-100 shadow-md rounded-lg p-6">
          <Title
            title={"Subscribe for Updates"}
            subTitle={
              "Get the latest offers, new arrivals, and updates straight to your inbox."
            }
          />
          <br />

          <div className="join w-full">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="input input-bordered join-item w-full"
            />
            <button className="btn btn-primary join-item">Subscribe</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
