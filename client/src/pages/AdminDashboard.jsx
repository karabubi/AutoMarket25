// /client/src/pages/AdminDashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import API from "../utils/api"; // ✅ IMPORTANT: use API instance (works on localhost + Vercel)

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const { user } = useAuth();

  // ✅ token can come from context or localStorage
  const token = user?.token || localStorage.getItem("token");

  const [cars, setCars] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [savedId, setSavedId] = useState(null);

  // ✅ safer currency formatting
  const formatCurrency = (num) =>
    new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(Number(num || 0));

  // Helper: normalize comma decimals
  const normalize = (str = "") => String(str).replace(",", ".");

  const showSuccess = () => {
    toast.success("Saved successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  // ✅ reuse auth headers everywhere (clean + avoids mistakes)
  const authHeaders = useMemo(() => {
    if (!token) return {};
    return { headers: { Authorization: `Bearer ${token}` } };
  }, [token]);

  const isRowValid = (car) => {
    const paid = parseFloat(normalize(car.paid_amount));
    const unpaid = parseFloat(normalize(car.not_paid_amount));
    const price = parseFloat(car.price);

    // ✅ must be valid numbers and paid+unpaid == price
    return (
      !Number.isNaN(paid) &&
      !Number.isNaN(unpaid) &&
      !Number.isNaN(price) &&
      paid >= 0 &&
      unpaid >= 0 &&
      (paid + unpaid).toFixed(2) === price.toFixed(2)
    );
  };

  const handleInput = (id, field, value) => {
    setCars((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      setError("");

      if (!token) {
        setError("Not logged in. Please login again.");
        setLoading(false);
        return;
      }

      try {
        // ✅ IMPORTANT FIX:
        // API already has baseURL ".../api" in prod,
        // so use "/admin/..." NOT "/api/admin/..."
        const res = await API.get("/admin/cars", authHeaders);

        // ✅ safer: ensure list is array
        const list = Array.isArray(res.data) ? res.data : [];

        // Enrich each car with payment info
        const enriched = await Promise.all(
          list.map(async (car) => {
            try {
              const p = await API.get(
                `/admin/cars/${car.id}/payments`,
                authHeaders
              );

              const payment = Array.isArray(p.data) ? p.data[0] : p.data;

              return {
                ...car,
                paid_amount: payment?.paid_amount?.toString() || "0",
                not_paid_amount:
                  payment?.not_paid_amount?.toString() ||
                  car.price?.toString() ||
                  "0",
                payment_id: payment?.id || null,
              };
            } catch {
              // If payment doesn't exist, default values
              return {
                ...car,
                paid_amount: "0",
                not_paid_amount: car.price?.toString() || "0",
                payment_id: null,
              };
            }
          })
        );

        setCars(enriched);
      } catch (err) {
        console.error(
          "❌ AdminDashboard fetchCars error:",
          err?.response?.data || err
        );

        // ✅ show real backend error message (best for debugging)
        const msg =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          "Error loading cars. Check backend or authentication.";

        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [token, authHeaders]);

  const handleSave = async (car) => {
    setError("");

    if (!token) {
      setError("Not logged in. Please login again.");
      return;
    }

    if (!isRowValid(car)) {
      setError("Invalid values: Paid + Unpaid must equal Price.");
      return;
    }

    const payload = {
      paid_amount: parseFloat(normalize(car.paid_amount)),
      not_paid_amount: parseFloat(normalize(car.not_paid_amount)),
    };

    setSavingId(car.id);

    try {
      const resp = car.payment_id
        ? await API.put(`/admin/payments/${car.payment_id}`, payload, authHeaders)
        : await API.post(
            `/admin/cars/${car.id}/payments`,
            payload,
            authHeaders
          );

      showSuccess();
      setSavedId(car.id);
      setTimeout(() => setSavedId(null), 2000);

      // If it was created, store payment_id
      if (!car.payment_id && resp.data?.id) {
        setCars((prev) =>
          prev.map((c) =>
            c.id === car.id ? { ...c, payment_id: resp.data.id } : c
          )
        );
      }
    } catch (err) {
      console.error(
        "❌ AdminDashboard handleSave error:",
        err?.response?.data || err
      );

      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Error saving payment data.";

      setError(msg);
    } finally {
      setSavingId(null);
    }
  };

  // ✅ memoized totals (better performance)
  const totals = useMemo(() => {
    return cars.reduce(
      (acc, c) => {
        acc.price += parseFloat(c.price) || 0;
        acc.paid += parseFloat(normalize(c.paid_amount)) || 0;
        acc.unpaid += parseFloat(normalize(c.not_paid_amount)) || 0;
        return acc;
      },
      { price: 0, paid: 0, unpaid: 0 }
    );
  }, [cars]);

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Car Payment Report", 14, 15);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 22);

    const headers = [["Make", "Model", "Price", "Paid", "Not Paid"]];
    const rows = cars.map((c) => [
      c.make || "",
      c.model || "",
      normalize(c.price),
      normalize(c.paid_amount),
      normalize(c.not_paid_amount),
    ]);

    rows.push([
      "Total",
      "",
      totals.price.toFixed(2),
      totals.paid.toFixed(2),
      totals.unpaid.toFixed(2),
    ]);

    autoTable(doc, { head: headers, body: rows, startY: 30 });
    doc.save("car_report.pdf");
  };

  // ✅ memoized chart data (better performance + avoids re-render issues)
  const barData = useMemo(() => {
    return {
      labels: cars.map((c) => `${c.make} ${c.model}`),
      datasets: [
        {
          label: "Paid",
          data: cars.map((c) => parseFloat(normalize(c.paid_amount)) || 0),
          backgroundColor: "rgba(34,197,94,0.6)",
        },
        {
          label: "Unpaid",
          data: cars.map((c) => parseFloat(normalize(c.not_paid_amount)) || 0),
          backgroundColor: "rgba(239,68,68,0.6)",
        },
      ],
    };
  }, [cars]);

  const barOpts = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Paid vs Unpaid Overview" },
    },
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <>
      <ToastContainer />

      <div className="p-6 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>

          <div className="flex gap-3">
            <button
              onClick={exportPDF}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Export PDF
            </button>

            <Link
              to="/PaymentReport"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              View Payment Report
            </Link>
          </div>
        </div>

        {error && <div className="text-red-600 mb-4">{error}</div>}

        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Make</th>
                <th className="px-4 py-2 text-left">Model</th>
                <th className="px-4 py-2 text-right">Price</th>
                <th className="px-4 py-2 text-right">Paid</th>
                <th className="px-4 py-2 text-right">Unpaid</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {cars.map((car) => {
                const valid = isRowValid(car);

                return (
                  <tr key={car.id} className={!valid ? "bg-red-50" : ""}>
                    <td className="px-4 py-2">{car.make}</td>
                    <td className="px-4 py-2">{car.model}</td>

                    <td className="px-4 py-2 text-right">
                      {formatCurrency(parseFloat(car.price))}
                    </td>

                    <td className="px-4 py-2 text-right">
                      <input
                        className={`border p-1 w-24 text-right ${
                          !valid ? "border-red-500" : ""
                        }`}
                        value={car.paid_amount}
                        onChange={(e) =>
                          handleInput(car.id, "paid_amount", e.target.value)
                        }
                      />
                    </td>

                    <td className="px-4 py-2 text-right">
                      <input
                        className={`border p-1 w-24 text-right ${
                          !valid ? "border-red-500" : ""
                        }`}
                        value={car.not_paid_amount}
                        onChange={(e) =>
                          handleInput(car.id, "not_paid_amount", e.target.value)
                        }
                      />
                    </td>

                    <td className="px-4 py-2 text-center">
                      <button
                        className={`px-3 py-1 rounded text-white ${
                          savingId === car.id
                            ? "bg-gray-400"
                            : "bg-blue-600 hover:bg-blue-700"
                        }`}
                        onClick={() => handleSave(car)}
                        disabled={savingId === car.id || !valid}
                      >
                        {savingId === car.id ? "Saving..." : "Save"}
                      </button>

                      {savedId === car.id && (
                        <span className="ml-2 text-green-600">✅</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>

            <tfoot className="bg-gray-50 font-semibold">
              <tr>
                <td className="px-4 py-2">Totals</td>
                <td></td>
                <td className="px-4 py-2 text-right">
                  {formatCurrency(totals.price)}
                </td>
                <td className="px-4 py-2 text-right">
                  {formatCurrency(totals.paid)}
                </td>
                <td className="px-4 py-2 text-right">
                  {formatCurrency(totals.unpaid)}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="mt-6 bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Payment Overview</h2>
          <Bar data={barData} options={barOpts} />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
