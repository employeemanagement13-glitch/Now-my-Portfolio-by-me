import { createClient } from "@/lib/supabase/server";
import { WorkGrid } from "@/components/ui/WorkGrid";
import { Work } from "@/lib/database.type";

export default async function WorkSection() {
  const supabase = await createClient();

  // Fetch works natively on the server
  const { data, error } = await supabase
    .from("works")
    .select("*")
    .eq("is_active", true)
    .order("order_index");

  const works = (data || []) as Work[];

  return (
    <section id="work" className="relative py-20 px-4">
      {/* Section header */}
      <div className="max-w-xl mx-auto text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
          My Work
        </h2>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
          A quick peek at some of the
          <br />
          projects we've loved working on.
        </p>
      </div>

      <WorkGrid works={works} />
    </section>
  );
}
