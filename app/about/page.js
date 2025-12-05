import Image from "next/image";
// import profilePic from "../../public/profile.jpg"; // Replace with your image!

export default function About() {
  return (
    <div>
      <h1 className="text-5xl font-bold mb-6">About Me</h1>

      <div className="flex flex-col md:flex-row items-center gap-8">
        <Image
          src="https://placehold.co/200x200/F0F0F0/000000?text=Profile"
          width={200}
          height={200}
          alt="Photo of Aaron Fields (Placeholder)"
          className="rounded-xl shadow-lg object-cover"
        />

        <p className="text-lg leading-relaxed">
          Hey! I&apos;m <strong>Aaron Fields</strong>, a passionate developer focused on
          web technologies such as JavaScript, React, and Next.js. I enjoy solving
          problems and creating projects that help people and look great.
        </p>
      </div>
    </div>
  );
}
