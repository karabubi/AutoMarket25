
// /Users/salehalkarabubi/works/27-05-2025 AutoMarket25/AutoMarket25/client/src/pages/AdminReport.jsx
import { useCallback, useEffect, useMemo, useState } from "react";
import API from "../utils/api";

/* -------------------------
   ✅ Stable helper functions (outside component)
   -> fixes exhaustive-deps warnings automatically
-------------------------- */
const roundToTwo = (num) => Math.round((num + Number.EPSILON) * 100) / 100;

const parseNumber = (value) => {
  if (typeof value === "number") return value;
  if (typeof value !== "string") return 0;

  const cleanValue = value.replace(/[^\d.-]/g, "").replace(/,/g, "");
  const number = parseFloat(cleanValue);
  return Number.isNaN(number) ? 0 : roundToTwo(number);
};

const formatCurrency = (value) => {
  if (value === null || value === undefined) return "—";
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const downloadBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

const escapeCsv = (v) => {
  if (v === null || v === undefined) return "";
  const s = String(v);
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
};

const AdminReport = () => {
  const [report, setReport] = useState([]);
  const [totals, setTotals] = useState({
    totalPrice: 0,
    totalPaid: 0,
    totalNotPaid: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* -------------------------
     ✅ Processing (stable)
  -------------------------- */
  const processReportData = useCallback((rawData) => {
    if (!rawData?.length) {
      setReport([]);
      setTotals({ totalPrice: 0, totalPaid: 0, totalNotPaid: 0 });
      setLoading(false);
      return;
    }

    let totalPrice = 0;
    let totalPaid = 0;
    let totalNotPaid = 0;

    const processed = rawData.map((item) => {
      const price = parseNumber(item.price);
      const paid = parseNumber(item.paid_amount);
      const notPaid = paid < price ? roundToTwo(price - paid) : 0;

      totalPrice = roundToTwo(totalPrice + price);
      totalPaid = roundToTwo(totalPaid + paid);
      totalNotPaid = roundToTwo(totalNotPaid + notPaid);

      return {
        ...item,
        price,
        paid_amount: paid,
        not_paid_amount: notPaid,
      };
    });

    setReport(processed);
    setTotals({ totalPrice, totalPaid, totalNotPaid });
    setLoading(false);
  }, []);

  /* -------------------------
     ✅ Fetch report
  -------------------------- */
  const fetchReport = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      if (!token) {
        setError("Not logged in.");
        setLoading(false);
        return;
      }

      // ✅ Uses API instance (works on localhost + Vercel)
      const res = await API.get("/admin/report", {
        headers: { Authorization: `Bearer ${token}` },
      });

      processReportData(res.data?.report || []);
    } catch (err) {
      console.error("Error fetching report:", err?.response?.data || err);
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to load report. Please try again later.";
      setError(msg);
      setLoading(false);
    }
  }, [processReportData]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  /* -------------------------
     ✅ Export CSV (real download)
  -------------------------- */
  const exportCSV = useCallback(() => {
    const headers = ["Make", "Model", "Price", "Paid", "Not Paid"];

    const rows = report.map((item) => [
      item.make || "",
      item.model || "",
      item.price ?? 0,
      item.paid_amount ?? 0,
      item.not_paid_amount ?? 0,
    ]);

    rows.push([
      "TOTAL",
      "",
      totals.totalPrice ?? 0,
      totals.totalPaid ?? 0,
      totals.totalNotPaid ?? 0,
    ]);

    const csv =
      [headers, ...rows]
        .map((r) => r.map(escapeCsv).join(","))
        .join("\n") + "\n";

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const date = new Date().toISOString().slice(0, 10);
    downloadBlob(blob, `admin_report_${date}.csv`);
  }, [report, totals]);

  /* -------------------------
     ✅ Export PDF (BEST: backend -> fallback jsPDF -> fallback print)
  -------------------------- */
  const exportPDF = useCallback(async () => {
    const date = new Date().toISOString().slice(0, 10);
    const filename = `admin_report_${date}.pdf`;

    const token = localStorage.getItem("token");

    // 1) ✅ BEST: ask backend for a real PDF (works perfectly on localhost + Vercel)
    // Backend should return: application/pdf
    try {
      if (token) {
        const res = await API.get("/admin/report/pdf", {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        });

        const contentType = res.headers?.["content-type"] || "";
        if (contentType.includes("application/pdf")) {
          downloadBlob(new Blob([res.data], { type: "application/pdf" }), filename);
          return;
        }
      }
    } catch (e) {
      // not available -> continue fallback
      console.warn("PDF endpoint not available, using client fallback.", e?.response?.data || e);
    }

    // 2) Try jsPDF if installed
    try {
      const [{ jsPDF }, autoTableModule] = await Promise.all([
        import("jspdf"),
        import("jspdf-autotable"),
      ]);
      void autoTableModule;

      const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });

      doc.setFontSize(14);
      doc.text("AutoMarket25 - Admin Report", 40, 40);
      doc.setFontSize(10);
      doc.text(`Date: ${date}`, 40, 58);

      const head = [["Make", "Model", "Price", "Paid", "Not Paid"]];
      const body = report.map((item) => [
        item.make || "—",
        item.model || "—",
        formatCurrency(item.price),
        formatCurrency(item.paid_amount),
        formatCurrency(item.not_paid_amount),
      ]);

      body.push([
        "TOTAL",
        "",
        formatCurrency(totals.totalPrice),
        formatCurrency(totals.totalPaid),
        formatCurrency(totals.totalNotPaid),
      ]);

      // autoTable is added by jspdf-autotable
      doc.autoTable({
        head,
        body,
        startY: 80,
        styles: { fontSize: 9, cellPadding: 6 },
      });

      doc.save(filename);
      return;
    } catch (e) {
      console.warn("jsPDF not installed, using print fallback.", e);
    }

    // 3) Fallback: print window (user can Save as PDF)
    const win = window.open("", "_blank", "width=1200,height=800");
    if (!win) {
      alert("Popup blocked. Please allow popups to export PDF.");
      return;
    }

    const rowsHtml = report
      .map(
        (item) => `
        <tr>
          <td>${item.make || "—"}</td>
          <td>${item.model || "—"}</td>
          <td style="text-align:right">${formatCurrency(item.price)}</td>
          <td style="text-align:right">${formatCurrency(item.paid_amount)}</td>
          <td style="text-align:right">${formatCurrency(item.not_paid_amount)}</td>
        </tr>
      `
      )
      .join("");

    win.document.open();
    win.document.write(`
      <html>
        <head>
          <title>${filename}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 24px; }
            h1 { margin: 0 0 6px 0; font-size: 20px; }
            .meta { margin: 0 0 16px 0; color: #444; font-size: 12px; }
            table { width: 100%; border-collapse: collapse; font-size: 12px; }
            th, td { border: 1px solid #ddd; padding: 10px; }
            th { background: #f3f3f3; text-align: left; }
            tfoot td { font-weight: bold; background: #fafafa; }
          </style>
        </head>
        <body>
          <h1>AutoMarket25 - Admin Report</h1>
          <p class="meta">Date: ${date}</p>

          <table>
            <thead>
              <tr>
                <th>Make</th>
                <th>Model</th>
                <th style="text-align:right">Price</th>
                <th style="text-align:right">Paid</th>
                <th style="text-align:right">Not Paid</th>
              </tr>
            </thead>
            <tbody>
              ${
                rowsHtml ||
                `<tr><td colspan="5" style="text-align:center;color:#666">No report data available.</td></tr>`
              }
            </tbody>
            <tfoot>
              <tr>
                <td>TOTAL</td>
                <td></td>
                <td style="text-align:right">${formatCurrency(totals.totalPrice)}</td>
                <td style="text-align:right">${formatCurrency(totals.totalPaid)}</td>
                <td style="text-align:right">${formatCurrency(totals.totalNotPaid)}</td>
              </tr>
            </tfoot>
          </table>

          <script>
            window.onload = () => window.print();
          </script>
        </body>
      </html>
    `);
    win.document.close();
  }, [report, totals]);

  /* -------------------------
     ✅ Derived UI values
  -------------------------- */
  const hasData = useMemo(() => report.length > 0, [report]);

  if (loading) return <div className="text-center py-10">Loading report...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-end gap-4 mb-4">
        <button
          onClick={exportCSV}
          disabled={!hasData}
          className="bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
          title={!hasData ? "No data to export" : "Download CSV"}
        >
          Export CSV
        </button>

        <button
          onClick={exportPDF}
          disabled={!hasData}
          className="bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          title={!hasData ? "No data to export" : "Download PDF"}
        >
          Export PDF
        </button>
      </div>

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left font-medium text-gray-600">Make</th>
              <th className="px-6 py-3 text-left font-medium text-gray-600">Model</th>
              <th className="px-6 py-3 text-left font-medium text-gray-600">Price</th>
              <th className="px-6 py-3 text-left font-medium text-gray-600">Paid</th>
              <th className="px-6 py-3 text-left font-medium text-gray-600">Not Paid</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {report.length > 0 ? (
              report.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{item.make || "—"}</td>
                  <td className="px-6 py-4">{item.model || "—"}</td>
                  <td className="px-6 py-4">{formatCurrency(item.price)}</td>
                  <td className="px-6 py-4">{formatCurrency(item.paid_amount)}</td>
                  <td className="px-6 py-4">{formatCurrency(item.not_paid_amount)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No report data available.
                </td>
              </tr>
            )}

            <tr className="font-bold bg-gray-50">
              <td className="px-6 py-4">TOTAL</td>
              <td></td>
              <td className="px-6 py-4">{formatCurrency(totals.totalPrice)}</td>
              <td className="px-6 py-4">{formatCurrency(totals.totalPaid)}</td>
              <td className="px-6 py-4">{formatCurrency(totals.totalNotPaid)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        PDF Export: First tries backend <code>/admin/report/pdf</code>. If not available, falls back to jsPDF or browser print.
      </p>
    </div>
  );
};

export default AdminReport;

