import TestimonialTile from "../TestimonialTile";

export default function Testimonial({ testimonials }) {
  return(
    <section className="py-12 px-4 lg:px-20 xl:px-40 bg-white">
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