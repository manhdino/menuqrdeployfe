import Menu from "./menu";


export default async function MenuPage() {
  return (
    <div className="flex flex-col sm:ml-[120px] md:ml-[250px] sm:border-r sm:border-zinc-700 pb-20 min-h-screen">
      <Menu />
    </div>
  )
}
