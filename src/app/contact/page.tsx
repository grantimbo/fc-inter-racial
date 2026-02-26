import ContactForm from "../components/contact-form";
import Breadcrumbs from "../components/breadcrumbs";
import Header from "../components/header";
import Footer from "../components/footer";

export default function ContactPage() {
  return (
    <>
      <Header />
      <section className="scroll-mt-36 bg-white px-4 md:py-36 py-20 font-sans md:scroll-mt-20">
        <div className="mx-auto max-w-xl">
          <Breadcrumbs
            currentPage="Contact Us"
          />
          <h2 className="mb-8 text-4xl font-black tracking-tight text-black md:text-6xl text-center">
            Contact Us
          </h2>
          <p className="mb-12 text-center text-lg text-gray-600">
            Have questions or want to join the team? Send us a message!
          </p>
          
          <div className="bg-white p-8 shadow-lg rounded-lg border border-gray-100">
              <ContactForm />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
