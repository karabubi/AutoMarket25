//Users/salehalkarabubi/works/project/AutoMarket25/client/src/components/AuthForm.jsx

const AuthForm = ({ onSubmit, buttonText }) => (
  <form onSubmit={onSubmit} className="max-w-sm mx-auto">
    <input name="email" type="email" placeholder="Email" className="border p-2 w-full mb-2" required />
    <input name="password" type="password" placeholder="Password" className="border p-2 w-full mb-2" required />
    <button type="submit" className="bg-blue-500 text-white p-2 w-full">{buttonText}</button>
  </form>
);

export default AuthForm;
