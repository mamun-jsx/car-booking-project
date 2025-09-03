import { CheckCircle, Clock, DollarSign, ThumbsUp } from "lucide-react";
import Title from "./Title";

export default function WhyChooseUs() {
  const reasons = [
    {
      id: 1,
      icon: <DollarSign className="w-10 h-10 text-indigo-600" />,
      title: "Affordable Pricing",
      desc: "Get the best deals with transparent and competitive pricing.",
    },
    {
      id: 2,
      icon: <Clock className="w-10 h-10 text-indigo-600" />,
      title: "Quick Booking",
      desc: "Book your car in just a few clicks without any hassle.",
    },
    {
      id: 3,
      icon: <ThumbsUp className="w-10 h-10 text-indigo-600" />,
      title: "Trusted Service",
      desc: "Thousands of happy customers trust us for their rides.",
    },
    {
      id: 4,
      icon: <CheckCircle className="w-10 h-10 text-indigo-600" />,
      title: "Reliable Cars",
      desc: "Well-maintained vehicles to ensure safety and comfort.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <Title
          title={"Why Choose Us"}
          subTitle={
            "We provide a smooth and reliable car rental experience tailored for you."
          }
        />

        <div className="grid gap-8 sm:grid-cols-2 mt-10 lg:grid-cols-4">
          {reasons.map((item) => (
            <div
              key={item.id}
              className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
