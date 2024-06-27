/* This example requires Tailwind CSS v2.0+ */
const people = [
  {
    name: "Michael Foster",
    role: "Co-Founder / CTO",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
  },
  {
    name: "Michael Foster",
    role: "Co-Founder / CTO",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
  },
  {
    name: "Michael Foster",
    role: "Co-Founder / CTO",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
  },
  {
    name: "Michael Foster",
    role: "Co-Founder / CTO",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
  },
  {
    name: "Michael Foster",
    role: "Co-Founder / CTO",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
  },
  {
    name: "Michael Foster",
    role: "Co-Founder / CTO",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
  },
  // More people...
];

export default function AboutUs() {
  return (
    <div className="bg-white" id="tentang-kami-section">
      <div className="w-full mx-auto py-12 text-center lg:py-24">
        <div className="flex-col md:flex-row flex space-y-8 sm:space-y-12">
          <div
            className="flex flex-col w-full md:w-1/2 p-8 space-y-5 sm:space-y-4 text-left justify-center bg-primary"
          >
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
              About Us
            </h2>
            <p className="text-sm text-white">
              Aviatick adalah platform terpercaya untuk memesan tiket pesawat
              dengan berbagai pilihan penerbangan dan harga terbaik. Kami
              menawarkan pengalaman pemesanan yang cepat, aman, dan efisien
              dengan antarmuka ramah pengguna dan dukungan 24/7. Dapatkan
              pilihan penerbangan dari maskapai terkemuka dengan promo dan
              diskon eksklusif hanya di Aviatick.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <img src="/bg/fullteam.png" alt="Aviatick's team" />
          </div>
        </div>
      </div>
    </div>
  );
}
