import Image from "next/image";

export default function Gallery() {
  const images = ["/1.webp", "/2.webp", "/3.webp", "/4.webp"];

  return (
    <div className="grid grid-cols-2 gap-2 mt-4">
      {images.map((img, i) => (
        <Image
          key={i}
          src={img}
          alt="مظلات وسواتر الرياض"
          width={500}
          height={500}
          className="rounded"
        />
      ))}
    </div>
  );
}