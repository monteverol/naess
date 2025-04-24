import { useRouter } from "next/navigation";

export default function CTASection() {
  const router = useRouter();

  return (
    <div className="bg-[#264D6C] section grid items-center justify-center">
      <section className="section-inner-width flex flex-col md:flex-row justify-between items-center gap-12 transition-all duration-300">
        {/* Text Content */}
        <article className="flex flex-col gap-8 max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
            Get in Touch with Us
          </h1>
          <p className="text-lg md:text-xl text-white leading-relaxed">
            Reach out today to learn more about our services and how we can assist you.
          </p>
          
          {/* Buttons */}
          <div className="flex gap-6">
            <button
              type="button"
              role="button"
              aria-label="Contact us"
              onClick={() => router.push('/contact-us/inquire')}
              className="bg-transparent border-2 border-blue-50 text-blue-50 text-lg font-medium py-3 px-8 rounded shadow-md transition-transform transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        </article>

        {/* Image or Placeholder */}
        {/* <figure className="w-full max-w-xs h-[280px] bg-blue-50 rounded-lg shadow-lg hidden md:block transition-transform transform hover:scale-105"> */}
          {/* Replace this block with an image tag if needed */}
        {/* </figure> */}
      </section>
    </div>
  );
}