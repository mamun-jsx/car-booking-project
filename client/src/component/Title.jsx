import { motion } from "motion/react";

const Title = ({ title, subTitle, align }) => {
  return (
    <section
      className={`flex flex-col justify-center items-center text-center ${
        align === "left" && "md:items-start md:text-left"
      }`}
    >
      <motion.h1
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 1 }}
        className="font-semibold text-4xl md:text-[40px]"
      >
        {title}
      </motion.h1>
      <motion.p
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: 100 }}
        transition={{ duration: 1 }}
        className="text-sm md:text-base text-gray-500/90 mt-2 max-w-156"
      >
        {subTitle}
      </motion.p>
    </section>
  );
};

export default Title;
