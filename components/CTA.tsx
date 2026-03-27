export default function CTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-3 bg-white border-t">
      <div className="flex gap-2">
        <a
          href="tel:0500000000"
          className="flex-1 bg-black text-white text-center p-3 rounded"
        >
          اتصال
        </a>

        <a
          href="https://wa.me/966500000000"
          className="flex-1 bg-green-500 text-white text-center p-3 rounded"
        >
          واتساب
        </a>
      </div>
    </div>
  );
}