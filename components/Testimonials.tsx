import { createClient } from "@/lib/supabase/server";
import { TestimonialCarousel } from "@/components/ui/TestimonialCarousel";
import { Testimonial } from "@/lib/database.type";

export default async function Testimonials() {
  const supabase = await createClient();

  // Fetch testimonials natively on the server
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_active", true)
    .order("order_index");

  const testimonials = (data || []) as Testimonial[];

  return (
    <section id="testimonials" className="w-full py-20 overflow-hidden">
      {/* ── Heading ── */}
      <div className="text-center mb-14 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-3">
          What My
          <br />
          Clients Say
        </h2>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
          Real feedback from real people
          <br />
          I've had the pleasure to work with.
        </p>
      </div>

      {testimonials.length > 0 ? (
        <TestimonialCarousel testimonials={testimonials} />
      ) : (
        <div className="flex justify-center">
          <p className="text-gray-500">No testimonials available yet.</p>
        </div>
      )}
    </section>
  );
}
