import TestimonialTile from "../ui/TestimonialTile";

export default function Testimonial({ testimonials }) {
  return(
    <section className="py-12 section bg-white">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
        <div className="flex flex-wrap gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialTile
              key={testimonial.id}
              image={testimonial.image}
              name={testimonial.name}
              position={testimonial.position}
              text={testimonial.text}
            />
          ))}
        </div>
      </div>
    </section>
  );
}