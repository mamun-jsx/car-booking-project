import Title from "./Title";

import { motion } from "motion/react";

export default function BookingProcess() {
  return (
    <section className="py-16 px-6 bg-base-100">
      <Title
        title={"Booking Process"}
        subTitle={
          "Simple, hassle-free booking in just a few steps. Pay cash after approval—no worries about online transactions."
        }
      />
      <br /> <br />
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.9 }}
        className="grid max-w-7xl  mx-auto gap-8 md:grid-cols-4"
      >
        {/* Step 1 */}
        <div className="card bg-base-200 shadow-md hover:shadow-lg transition p-6">
          <div className="text-primary text-4xl mb-4">1️⃣</div>
          <h3 className="text-xl font-semibold mb-2">Create an Account</h3>
          <p className="text-sm text-gray-600">
            Sign up quickly and get ready to book your ride.
          </p>
        </div>

        {/* Step 2 */}
        <div className="card bg-base-200 shadow-md hover:shadow-lg transition p-6">
          <div className="text-primary text-4xl mb-4">2️⃣</div>
          <h3 className="text-xl font-semibold mb-2">Choose Your Car</h3>
          <p className="text-sm text-gray-600">
            Browse our collection and pick your favorite car.
          </p>
        </div>

        {/* Step 3 */}
        <div className="card bg-base-200 shadow-md hover:shadow-lg transition p-6">
          <div className="text-primary text-4xl mb-4">3️⃣</div>
          <h3 className="text-xl font-semibold mb-2">Select Date</h3>
          <p className="text-sm text-gray-600">
            Pick your desired booking date and submit your request.
          </p>
        </div>

        {/* Step 4 */}
        <div className="card bg-base-200 shadow-md hover:shadow-lg transition p-6">
          <div className="text-primary text-4xl mb-4">4️⃣</div>
          <h3 className="text-xl font-semibold mb-2">Approval & Payment</h3>
          <p className="text-sm text-gray-600">
            Wait for admin approval and pay in cash—safe and easy.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
