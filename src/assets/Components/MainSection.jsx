import heroBackground from "../Images/hero-background-DGbRnqcL.jpg";
import notesIllustration from "../Images/notes-illustration-CFF8i_TP.jpg";

export default function MainSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />

      {/* Content */}
      <div className="relative container mx-auto px-4 text-center">
        {/* Illustration */}
        <img
          src={notesIllustration}
          alt="Notes illustration"
          className="w-32 h-32 mx-auto mb-6 rounded-full shadow-lg border border-green-200 bg-white"
        />

        {/* Title */}
        <h2 className="text-4xl font-bold text-green-900 mb-4">
          Your Peaceful Note Space
        </h2>

        {/* Subtitle */}
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Create, organize, and reflect in your serene digital sanctuary.
          <br /> Let your thoughts flow like gentle streams.
        </p>
      </div>
    </section>
  );
}
