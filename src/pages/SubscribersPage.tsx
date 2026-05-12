import { useEffect, useState } from "react";

// ── Type: Shape of one subscriber object ────────────────────
// Every subscriber from the backend should have these fields
type Subscriber = {
  id: number;
  email: string;
};

// ── Main Page Component ──────────────────────────────────────
export function SubscribersPage() {

  // Stores the list of subscribers fetched from the backend
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  // True while data is being loaded — shows a loading message
  const [loading, setLoading] = useState<boolean>(true);

  // Stores any error message if the API call fails
  const [error, setError] = useState<string>("");

  // Stores the id of the subscriber the admin wants to delete
  // null means no deletion is in progress
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

  // ── Fetch subscribers from the backend on page load ────────
  useEffect(() => {

    const fetchSubscribers = async () => {
      try {

        // 🔁 Replace this URL with your real API endpoint
        const response = await fetch("http://localhost:5000/api/subscribers");

        if (!response.ok) {
          throw new Error("Failed to fetch subscribers");
        }

        const data = await response.json();

        // Save the list into state so React can display it
        setSubscribers(data);

      } catch (err: any) {

        setError(err.message);

      } finally {

        // Stop the loading indicator whether success or failure
        setLoading(false);

      }
    };

    fetchSubscribers();

  }, []); // [] = run only once when the page first loads

  // ── Handle Delete ──────────────────────────────────────────
  // Called when admin clicks "Yes, remove" in the confirmation row
  const handleDelete = (id: number) => {

    // Remove this subscriber by filtering them out of the list
    // .filter() keeps everyone EXCEPT the one with this id
    setSubscribers((prev) => prev.filter((sub) => sub.id !== id));

    // Hide the confirmation row
    setDeleteTargetId(null);

    // 💡 Optional: also send a DELETE request to your backend:
    // fetch(`http://localhost:5000/api/subscribers/${id}`, { method: "DELETE" });

  };

  // ── Loading state ──────────────────────────────────────────
  if (loading) {
    return (
      <div className="text-center py-16 text-slate-400 text-sm">
        Loading subscribers...
      </div>
    );
  }

  // ── Error state ────────────────────────────────────────────
  if (error) {
    return (
      <div className="text-center py-16 text-red-500 text-sm">
        ⚠️ {error}
      </div>
    );
  }

  // ── Main UI ────────────────────────────────────────────────
  return (
    <div>

      {/* ── Page Header ── */}
      <div className="mb-7">
        <h1 className="text-2xl font-extrabold text-slate-900">
          Subscribers
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          {subscribers.length} subscriber{subscribers.length !== 1 ? "s" : ""} in total.
        </p>
      </div>

      {/* ── Empty State ── */}
      {subscribers.length === 0 ? (

        <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
          <p className="text-4xl mb-3">📋</p>
          <p className="font-semibold text-slate-600">No subscribers yet.</p>
          <p className="text-sm text-slate-400 mt-1">
            People who subscribe from your website will appear here.
          </p>
        </div>

      ) : (

        // ── Subscribers Table ──
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              {/* ── Table Header ── */}
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="text-left px-6 py-4 font-semibold text-slate-500 text-xs uppercase tracking-wide">
                    #
                  </th>
                  <th className="text-left px-6 py-4 font-semibold text-slate-500 text-xs uppercase tracking-wide">
                    Email
                  </th>
                  <th className="text-left px-6 py-4 font-semibold text-slate-500 text-xs uppercase tracking-wide">
                    Action
                  </th>
                </tr>
              </thead>

              {/* ── Table Body ── */}
              <tbody>
                {subscribers.map((sub, index) => (

                  // Each subscriber gets two rows:
                  // 1. Normal data row
                  // 2. Confirmation row (only visible when deleting this subscriber)
                  <>
                    {/* ── Data Row ── */}
                    <tr
                      key={sub.id}
                      className={`border-b border-slate-50 hover:bg-slate-50 transition-colors ${
                        deleteTargetId === sub.id ? "bg-red-50" : ""
                      }`}
                    >
                      {/* Row number */}
                      <td className="px-6 py-4 text-slate-400 font-mono text-xs">
                        {index + 1}
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4 text-slate-700">
                        {sub.email}
                      </td>

                      {/* Delete button */}
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setDeleteTargetId(sub.id)}
                          disabled={deleteTargetId === sub.id}
                          className="text-xs font-semibold text-red-400 hover:text-red-600 transition-colors disabled:opacity-40"
                        >
                          🗑 Delete
                        </button>
                      </td>
                    </tr>

                    {/* ── Confirmation Row ── */}
                    {/* Only appears when admin clicks Delete on this row */}
                    {deleteTargetId === sub.id && (
                      <tr className="bg-red-50 border-b border-red-100">
                        {/* Spans all 3 columns */}
                        <td colSpan={3} className="px-6 py-3">
                          <div className="flex items-center gap-4">
                            <p className="text-sm text-red-700 font-medium">
                              Remove <span className="font-bold">{sub.email}</span>?
                            </p>

                            {/* Confirm — actually deletes the row */}
                            <button
                              onClick={() => handleDelete(sub.id)}
                              className="text-xs font-semibold text-white bg-red-500 hover:bg-red-600 px-4 py-1.5 rounded-full transition-colors"
                            >
                              Yes, remove
                            </button>

                            {/* Cancel — closes confirmation without deleting */}
                            <button
                              onClick={() => setDeleteTargetId(null)}
                              className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>

                ))}
              </tbody>

            </table>
          </div>

          {/* ── Footer ── */}
          <div className="px-6 py-3 bg-slate-50 border-t border-slate-100">
            <p className="text-xs text-slate-400">
              Showing {subscribers.length} subscriber{subscribers.length !== 1 ? "s" : ""}
            </p>
          </div>

        </div>

      )}

    </div>
  );
}