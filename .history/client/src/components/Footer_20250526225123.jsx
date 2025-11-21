
//Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/Footer.jsx



const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm">&copy; 2025 AutoMarket25. Saleh Alkarabubi .All rights reserved.</p>
        <div className="flex space-x-4 mt-2 sm:mt-0">
          <a href="/privacy" className="hover:text-blue-400 transition">Privacy</a>
          <a href="/terms" className="hover:text-blue-400 transition">Terms</a>
          <a href="/contact" className="hover:text-blue-400 transition">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
