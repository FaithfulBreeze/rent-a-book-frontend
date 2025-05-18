import RenderBook from "@/components/ui/renderBook";

export default async function Book({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <RenderBook id={id} />;
}
