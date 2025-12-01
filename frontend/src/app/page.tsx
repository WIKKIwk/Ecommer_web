import { HeroCarousel } from "@/components/hero-carousel";
import { CategorySections } from "@/components/category-sections";
import { getCategories, getHeroSlides } from "@/lib/api";

export default async function Home() {
  const [slides, categories] = await Promise.all([getHeroSlides(), getCategories()]);

  return (
    <div className="bg-neutral-50 pb-24">
      <HeroCarousel slides={slides} />
      <CategorySections categories={categories} />
      <section
        id="filiallar"
        className="mx-auto mt-16 flex max-w-6xl flex-col gap-6 rounded-[32px] bg-white p-8 shadow-xl shadow-neutral-200/60 lg:flex-row"
      >
        <div className="flex-1">
          <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">Filiallar</p>
          <h3 className="mt-3 text-3xl font-black text-neutral-900">Toshkent bo‘ylab 5 ta filial</h3>
          <p className="mt-3 text-sm text-neutral-500">
            Shayxontohur, Chilonzor, Sergeli, Yunusobod va Mirzo Ulug‘bek tumanlarida joylashgan filiallarimizda taomlarni
            issiq holda olib ketishingiz yoki qur’erga buyurtma berishingiz mumkin.
          </p>
        </div>
        <div className="grid flex-1 gap-4 sm:grid-cols-2">
          {["Shayxontohur", "Chilonzor", "Yunusobod", "Sergeli"].map((branch) => (
            <div key={branch} className="rounded-3xl border border-neutral-100 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">Filial</p>
              <p className="mt-2 text-lg font-semibold text-neutral-900">{branch}</p>
              <p className="text-sm text-neutral-500">10:00 - 22:00 | Qo‘ng‘iroq: +998 55 500 16 61</p>
            </div>
          ))}
        </div>
      </section>
      <section
        id="contact"
        className="mx-auto mt-10 flex max-w-5xl flex-col gap-6 rounded-[32px] bg-white p-10 shadow-xl shadow-neutral-200/60 lg:flex-row"
      >
        <div className="flex-1 space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">Bog‘lanish</p>
          <h3 className="text-2xl font-black text-neutral-900">Savollar uchun yozing yoki qo‘ng‘iroq qiling</h3>
          <p className="text-neutral-500">
            Dispatch markazimiz 10:00–23:00 oralig‘ida ishlaydi. Buyurtmalar, takliflar yoki hamkorlik bo‘yicha murojaat
            qilishingiz mumkin.
          </p>
          <div className="space-y-1 text-sm">
            <p className="font-semibold text-neutral-900">Telefon:</p>
            <p className="text-neutral-600">+998 (55) 500-16-61</p>
          </div>
          <div className="space-y-1 text-sm">
            <p className="font-semibold text-neutral-900">Telegram:</p>
            <p className="text-neutral-600">@custom_ecommer_bot</p>
          </div>
          <div className="space-y-1 text-sm">
            <p className="font-semibold text-neutral-900">Email:</p>
            <p className="text-neutral-600">support@custom-ecommer.uz</p>
          </div>
        </div>
        <div className="flex-1 rounded-[28px] border border-neutral-100 bg-neutral-50 p-6 text-sm text-neutral-600">
          <p className="font-semibold text-neutral-900">Feedback yuborish</p>
          <p className="mt-2 text-neutral-500">
            Platforma haqida taklif yoki shikoyatingiz bo‘lsa, hozircha contact@custom-ecommer.uz manziliga xat yuborishingiz
            mumkin. Tez orada onlayn forma qo‘shamiz.
          </p>
        </div>
      </section>
      <footer className="mt-16 border-t border-neutral-200 bg-white py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-neutral-500 lg:flex-row">
          <div className="flex items-center gap-4">
            <div className="rounded-full border border-neutral-900 px-3 py-1 text-xs font-semibold tracking-[0.2em]">
              CUSTOM ECOMMER
            </div>
            <p>© {new Date().getFullYear()} Custom Ecommer. Barcha huquqlar himoyalangan.</p>
          </div>
          <div className="flex gap-4">
            <a href="#filiallar">Filiallar</a>
            <a href="#contact">Bog‘lanish</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
