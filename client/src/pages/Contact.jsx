//Users/salehalkarabubi/works/project/AutoMarket25/client/src/pages/Contact.jsx


const Contact = () => {
  return (
    <section className="min-h-screen bg-white text-gray-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
        <p className="text-lg text-center text-gray-600 mb-10">
          We'd love to hear from you. Reach out to us using the details below.
        </p>
        <div className="bg-gray-100 p-6 rounded-xl shadow-md space-y-6">
          <div>
            <h2 className="text-xl font-semibold">📧 Email</h2>
            <p className="text-gray-700">karabubi66@yahoo.com</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">📞 Phone</h2>
            <p className="text-gray-700">+49 176 55105979</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">📍 Address</h2>
            <p className="text-gray-700">
              Honnefer Str. 19,<br />53179 Bonn, Germany
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
