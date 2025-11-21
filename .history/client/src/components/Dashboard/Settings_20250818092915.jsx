//Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/client/src/components/Dashboard/Settings.jsx
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
// Import API utilities for admin operations
import { 
  fetchAllCarsAdmin, 
  fetchAllPaymentsAdmin, 
  deleteCar, 
  deleteAllCars, 
  deletePayment, 
  deleteAllPayments 
} from '../../utils/api';

const Settings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  // Retrieve token either from context or local storage
  const token = user?.token || localStorage.getItem('token');

  const [cars, setCars] = useState([]);
  const [payments, setPayments] = useState([]);       // NEW: state for payment records
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [paymentIdInput, setPaymentIdInput] = useState('');

  useEffect(() => {
    // Check permissions and fetch data on component mount
    if (user && !user.is_admin) {
      // Logged in but not an admin
      setError('You do not have permission to view this page');
      setLoading(false);
      return;
    }
    if (!token) {
      // Not logged in (no token)
      setError('Please log in to view this page');
      setLoading(false);
      return;
    }
    // If we have a token and either user is admin or user context is not yet loaded, attempt to fetch admin data
    const loadAdminData = async () => {
      try {
        // Fetch all cars (admin endpoint)
        const carRes = await fetchAllCarsAdmin(token);
        setCars(carRes.data || []);
        // Fetch all payments (admin endpoint)
        const payRes = await fetchAllPaymentsAdmin(token);
        setPayments(payRes.data || []);
      } catch (err) {
        console.error('Error loading admin data:', err);
        if (err.response?.status === 403) {
          setError('You do not have permission to view this page');
        } else if (err.response?.status === 401) {
          setError('Session expired. Please log in again');
          // If session expired or invalid, clear token and redirect to login
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          setError('Failed to load admin data. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };
    loadAdminData();
  }, [token, user, navigate]);

  // Trigger the confirmation modal for a given delete action
  const confirmDelete = (target) => {
    setDeleteTarget(target);
    setShowConfirmModal(true);
  };

  // Handle deletion after confirmation modal is approved
  const handleDeleteConfirmed = async () => {
    setShowConfirmModal(false);
    // Double-check that the user is admin before proceeding (safety check)
    if (!token || !user?.is_admin) {
      setInfoMessage('❌ You do not have permission to delete records');
      return;
    }
    try {
      if (deleteTarget === 'all') {
        // Admin: Delete all cars
        await deleteAllCars(token);
        setCars([]);  // Clear all car listings from state
        setInfoMessage('✅ All cars have been deleted');
      } else if (deleteTarget === 'all-payments') {
        // Admin: Delete all payments
        await deleteAllPayments(token);
        setPayments([]);  // Clear all payments from state
        setInfoMessage('✅ All payment records have been deleted');
      } else if (typeof deleteTarget === 'string' && deleteTarget.startsWith('payment:')) {
        // Admin: Delete a single payment by ID
        const paymentId = deleteTarget.split(':')[1];
        await deletePayment(paymentId, token);
        setPayments(prev => prev.filter(p => p.id !== Number(paymentId)));  // remove the deleted payment from state
        setInfoMessage('✅ Payment record deleted successfully');
        setPaymentIdInput('');  // Clear the input field
      } else {
        // Admin: Delete a single car by ID
        await deleteCar(deleteTarget, token);
        setCars(prev => prev.filter(car => car.id !== deleteTarget));
        setInfoMessage('✅ Car listing deleted successfully');
      }
    } catch (err) {
      console.error('Delete error:', err);
      if (err.response) {
        if (err.response.status === 403) {
          setInfoMessage('❌ You do not have permission to delete this item');
        } else if (err.response.status === 401) {
          setInfoMessage('❌ Session expired. Please log in again');
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          // If the server provided an error message, use it; otherwise generic message
          const serverMsg = err.response.data?.message;
          setInfoMessage(`❌ ${serverMsg || 'Server error. Please try again later'}`);
        }
      } else {
        setInfoMessage('❌ Failed to delete. Please check your network and try again');
      }
    } finally {
      // Hide the info message after 3 seconds for better UX
      setTimeout(() => setInfoMessage(''), 3000);
      setDeleteTarget(null);
    }
  };

  // Cancel and close the confirmation modal
  const handleCancel = () => {
    setShowConfirmModal(false);
    setDeleteTarget(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Cars Section Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">All Cars</h1>
          <p className="text-gray-600 mt-1">Manage all vehicle listings in the system</p>
        </div>
        {/* Delete All Cars button (visible to admin only) */}
        {user?.is_admin && (
          <button
            onClick={() => confirmDelete('all')}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            {/* Trash icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Delete All Cars
          </button>
        )}
      </div>

      {/* Status Message Banner (success or error notifications) */}
      {infoMessage && (
        <div className={`mb-6 px-4 py-3 rounded-lg ${
            infoMessage.startsWith('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
          {infoMessage}
        </div>
      )}

      {/* Main Content: Loading, Error, or Lists */}
      {loading ? (
        // Loading state: spinner
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        // Error state: show error message
        <div className="bg-red-50 text-red-800 p-4 rounded-lg text-center">
          {error}
        </div>
      ) : (
        <>
          {/* Car Listings (if any) */}
          {cars.length === 0 ? (
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No car listings found</h3>
              <p className="mt-1 text-gray-500">There are no vehicles currently listed in the system.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {cars.map(car => (
                <div 
                  key={car.id} 
                  className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-all flex justify-between"
                >
                  {/* Car Details */}
                  <div className="p-5 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-xl text-gray-900">
                          {car.make} {car.model}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-lg font-bold text-blue-600">
                            €{Number(car.price).toLocaleString('de-DE', { minimumFractionDigits: 2 })}
                          </span>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-600">{car.year}</span>
                        </div>
                        <p className="text-gray-500 mt-2">
                          {car.mileage ? `${car.mileage} km` : 'New'} • {car.fuel_type || 'N/A'}
                        </p>
                      </div>
                    </div>
                    {/* Show owner name if available (for admin overview) */}
                    {car.user_name && (
                      <p className="mt-3 text-sm text-gray-500 italic">Owner: {car.user_name}</p>
                    )}
                    <div className="flex justify-end gap-4 mt-4 pt-4 border-t border-gray-100">
                      {/* Edit link (admin can edit any listing, or this could be reused for owners via a different UI) */}
                      <Link 
                        to={`/edit/${car.id}`} 
                        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                        Edit
                      </Link>
                      {/* Delete single car (admin only button) */}
                      {user?.is_admin && (
                        <button 
                          onClick={() => confirmDelete(car.id)} 
                          className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                  {/* Car Image Thumbnail */}
                  <div className="p-4 flex items-center">
                    <img 
                      src={car.image_url || (car.images?.[0]?.image_url ?? '/default-car.jpg')} 
                      alt={`${car.make} ${car.model}`} 
                      className="w-24 h-24 object-cover rounded-lg" 
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Payments Section Header */}
          <div className="flex justify-between items-start mt-12 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
              <p className="text-gray-600 mt-1">Manage all payment records in the system</p>
            </div>
            {/* Delete All Payments button (admin only) */}
            {user?.is_admin && (
              <button
                onClick={() => confirmDelete('all-payments')}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Delete All Payments
              </button>
            )}
          </div>

          {/* Optional: Delete single payment by ID via input (admin only). 
                This input allows admin to quickly delete a known payment ID. */}
          {user?.is_admin && (
            <div className="max-w-sm mb-8">
              <label htmlFor="paymentId" className="block text-sm font-medium text-gray-700">
                Delete Payment by ID:
              </label>
              <div className="flex mt-1">
                <input
                  type="number"
                  id="paymentId"
                  value={paymentIdInput}
                  onChange={(e) => setPaymentIdInput(e.target.value)}
                  className="flex-1 rounded-l-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter payment ID"
                />
                <button
                  type="button"
                  onClick={() => paymentIdInput && confirmDelete('payment:' + paymentIdInput)}
                  className="rounded-r-lg bg-red-600 text-white px-4 py-2 font-medium hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={!paymentIdInput}
                >
                  Delete Payment
                </button>
              </div>
            </div>
          )}

          {/* Payment Records List (if any payments exist) */}
          {payments.length === 0 ? (
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No payment records found</h3>
              <p className="mt-1 text-gray-500">There are no payments in the system.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {payments.map(payment => (
                <div 
                  key={payment.id} 
                  className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 px-5 py-4 flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Payment #{payment.id}
                    </h3>
                    {/* If payment has additional info like amount or buyer, display them */}
                    {payment.amount !== undefined && (
                      <p className="text-gray-600">Amount: <span className="font-medium">€{Number(payment.amount).toLocaleString('de-DE', { minimumFractionDigits: 2 })}</span></p>
                    )}
                    {payment.user_name && (
                      <p className="text-gray-600">Buyer: <span className="font-medium">{payment.user_name}</span></p>
                    )}
                    {payment.car_title && (
                      <p className="text-gray-600">Car: <span className="font-medium">{payment.car_title}</span></p>
                    )}
                  </div>
                  {/* Delete single payment (admin only button) */}
                  {user?.is_admin && (
                    <button 
                      onClick={() => confirmDelete('payment:' + payment.id)} 
                      className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Delete
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Confirmation Modal for deletions */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
            <div className="p-6">
              <div className="flex justify-center text-red-500 mb-4">
                {/* Warning icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M5.062 19h13.876c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-center text-gray-900 mb-2">Confirm Deletion</h2>
              <p className="text-gray-600 text-center mb-6">
                {deleteTarget === 'all'
                  ? 'Are you sure you want to delete ALL cars? This action cannot be undone.'
                  : deleteTarget === 'all-payments'
                  ? 'Are you sure you want to delete ALL payment records? This action cannot be undone.'
                  : (typeof deleteTarget === 'string' && deleteTarget.startsWith('payment:'))
                  ? 'Are you sure you want to delete this payment record?'
                  : 'Are you sure you want to delete this car listing?'}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="flex-1 py-3 px-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirmed}
                  className="flex-1 py-3 px-4 rounded-lg bg-red-600 text-white hover:bg-red-700 font-medium transition-colors"
                >
                  {deleteTarget === 'all' 
                    ? 'Delete All Cars' 
                    : deleteTarget === 'all-payments' 
                    ? 'Delete All Payments' 
                    : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
