import Image from "next/image";

const aboutImages = [
  "https://images.unsplash.com/photo-1455849318743-b2233052fcff?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1200&q=80",
];

export default function AboutPage() {
  return (
    <div className="bg-neutral-50 pb-16">
      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="glass-panel rounded-[32px] p-10 transition-all duration-500 ease-out">
          <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">Biz haqimizda</p>
          <h1 className="mt-3 text-4xl font-black text-neutral-900">Custom Ecommer haqida</h1>
          <p className="mt-4 text-neutral-600">
            Custom Ecommer — moslashuvchan e-commerce va yetkazib berish platformasi. Maqsadimiz mahsulotlar katalogi,
            savatcha va to‘lov jarayonlarini yagona, intuitiv interfeysda boshqarish imkonini berishdir.
          </p>
          <p className="mt-3 text-neutral-600">
            Platforma buyurtma jarayonini tez va shaffof qilishga qaratilgan: real vaqt yangilanishlari, qulay yetkazib berish
            sozlamalari va mobil qurilmalar uchun optimallashtirilgan tajriba.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {aboutImages.map((src) => (
              <div key={src} className="relative h-64 w-full overflow-hidden rounded-[28px]">
                <Image src={src} alt="Custom Ecommer" fill className="object-cover" />
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-2 text-neutral-600">
            <p className="font-semibold text-neutral-900">Xizmatlar:</p>
            <ul className="list-disc pl-6 text-sm">
              <li>Tezkor yetkazib berish va pick-up rejimlari</li>
              <li>Mobil va veb uchun yagona foydalanuvchi tajribasi</li>
              <li>Chegirmalar, promo va dinamik menyu boshqaruvi</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
