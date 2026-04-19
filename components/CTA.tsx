export default function CTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-3 bg-white border-t border-coffee-medium/20 shadow-lg">
      <div className="flex gap-2">
        <a
          href="tel:0535214820"
          className="flex-1 bg-gradient-primary text-white text-center p-3 rounded-lg font-semibold"
        >
          اتصال
        </a>

        <a
          href="https://wa.me/966535214820"
          className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white text-center p-3 rounded-lg font-semibold"
        >
          واتساب
        </a>
      </div>
    </div>
  );
}