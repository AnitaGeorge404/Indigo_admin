import { useEffect, useState } from "react";

// ── This describes the shape of one message object ──────────
// Every message from the backend will have these fields
type Message = {
  _id: string;
  name: string;
  email: string;
  position: string;
  description: string;
  createdAt: string;
};

// ── Message Card Component ──────────────────────────────────
// This component shows ONE message card.
// It receives:
//   - message: the data to display
//   - onDelete: a function to call when the delete button is clicked
function MessageCard({
  message,
  onDelete,
}: {
  message: Message;
  onDelete: (id: string) => void; // onDelete takes the message id and returns nothing
}) {
  // Controls whether the full message is shown or just a preview
  const [expanded, setExpanded] = useState<boolean>(false);

  // Controls whether the delete confirmation popup is visible
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  // If message is longer than 120 characters, we'll show a "Read more" button
  const isLong = message.description.length > 120;

  // Show full message if expanded, otherwise show first 120 chars + "..."
  const displayedMessage =
    expanded || !isLong
      ? message.description
      : message.description.slice(0, 120) + "...";

  // Get the first letter of the name for the avatar circle
  const initial = message.name.charAt(0).toUpperCase();

  // ── Called when admin clicks "Delete" ──────────────────────
  const handleDeleteClick = () => {
    // Show the confirmation prompt instead of deleting immediately
    setShowConfirm(true);
  };

  // ── Called when admin confirms the deletion ─────────────────
  const handleConfirmDelete = () => {
    // Call the onDelete function passed down from the parent (MessagesPage)
    // This will remove the card from the list
    onDelete(message._id);
  };

  // ── Called when admin cancels the deletion ──────────────────
  const handleCancelDelete = () => {
    // Hide the confirmation prompt without deleting
    setShowConfirm(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4 hover:shadow-md transition-shadow relative">

      {/* ── Top Row: Avatar + Name + Date ── */}
      <div className="flex items-start justify-between gap-3">

        <div className="flex items-center gap-3">
          {/* Avatar circle showing the first letter of the name */}
          <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center">
            <span className="text-white font-bold text-sm">{initial}</span>
          </div>

          {/* Name and email */}
          <div>
            <p className="font-bold text-slate-900 text-sm">
              {message.name}
            </p>
            <p className="text-slate-400 text-xs">
              {message.email}
            </p>
          </div>
        </div>

        {/* Date shown on the right */}
        <p className="text-xs text-slate-400">
          {message.createdAt}
        </p>

      </div>

      {/* ── Position Badge ── */}
      <div>
        <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
          {message.position}
        </span>
      </div>

      {/* ── Message Text ── */}
      <div>
        <p className="text-slate-600 text-sm leading-relaxed">
          {displayedMessage}
        </p>

        {/* Show "Read more" / "Show less" only if message is long */}
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-blue-600 text-xs font-semibold mt-1.5 hover:underline"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>

      {/* ── Bottom Row: Delete Button ── */}
      <div className="pt-2 border-t border-slate-100">

        {/* Show confirmation prompt if admin clicked Delete */}
        {showConfirm ? (

          // Confirmation UI — asks admin to confirm before deleting
          <div className="flex items-center gap-3">
            <p className="text-xs text-slate-600 font-medium">
              Delete this message?
            </p>

            {/* Confirm button — actually deletes the card */}
            <button
              onClick={handleConfirmDelete}
              className="text-xs font-semibold text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-full transition-colors"
            >
              Yes, delete
            </button>

            {/* Cancel button — goes back without deleting */}
            <button
              onClick={handleCancelDelete}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              Cancel
            </button>
          </div>

        ) : (

          // Normal state — show the Delete button
          <button
            onClick={handleDeleteClick}
            className="text-xs font-semibold text-red-400 hover:text-red-600 transition-colors"
          >
            🗑 Delete message
          </button>

        )}
      </div>

    </div>
  );
}

// ── Main Page ───────────────────────────────────────────────
// This is the main component that fetches all messages
// and displays them in a grid.
export function MessagesPage() {

  // Stores the list of messages fetched from the backend
  const [messages, setMessages] = useState<Message[]>([]);

  // True while data is being fetched; shows a loading indicator
  const [loading, setLoading] = useState<boolean>(true);

  // Stores any error message if the fetch fails
  const [error, setError] = useState<string>("");

  // ── Fetch messages from backend on first load ─────────────
  useEffect(() => {

    const fetchMessages = async () => {
      try {
        // Replace this URL with your real API endpoint
        const response = await fetch("http://localhost:3001/api/application");

        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }

        const data = await response.json();

        // Save the fetched messages into state
        setMessages(data.data);

      } catch (err: any) {
        // If something goes wrong, save the error message
        setError(err.message);

      } finally {
        // Always stop loading, whether success or failure
        setLoading(false);
      }
    };

    fetchMessages();

  }, []); // The empty [] means this runs only once when the page loads

  // ── Handle Delete ─────────────────────────────────────────
  // This function is called when a card's delete is confirmed.
  // It filters out the card with the matching id from the list.
  const handleDelete = async (id: string) => {
    // Keep all messages EXCEPT the one with this id
    // setMessages((prev) => prev.filter((msg) => msg._id !== id));

     try {
    const response = await fetch(`http://localhost:3001/api/application/delete/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete");

    // Only remove from UI after successful backend delete
    setMessages((prev) => prev.filter((msg) => msg._id !== id));

  } catch (err) {
    console.error("Delete failed:", err);
  }

    // Optional: If you have a backend, you can also send a DELETE request:
    // fetch(`http://localhost:5000/api/messages/${id}`, { method: "DELETE" });
  };

  // ── Show loading spinner while fetching ───────────────────
  if (loading) {
    return (
      <div className="text-center py-10 text-slate-500">
        Loading messages...
      </div>
    );
  }

  // ── Show error message if fetch failed ────────────────────
  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        {error}
      </div>
    );
  }

  // ── Main UI ───────────────────────────────────────────────
  return (
    <div>

      {/* Page heading */}
      <div className="mb-7">
        <h1 className="text-2xl font-extrabold text-slate-900">
          Messages
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          {messages.length} message
          {messages.length !== 1 ? "s" : ""} received from applicants.
        </p>
      </div>

      {/* Show empty state if no messages */}
      {messages.length === 0 ? (

        <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
          <p className="text-4xl mb-3">📭</p>
          <p className="font-semibold text-slate-600">No messages yet.</p>
          <p className="text-sm text-slate-400 mt-1">
            Messages submitted from the careers page will appear here.
          </p>
        </div>

      ) : (

        // Render all message cards in a 2-column grid
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {messages.map((msg) => (
            <MessageCard
              key={msg._id}       // React needs a unique key for each card
              message={msg}      // Pass the message data
              onDelete={handleDelete} // Pass the delete handler
            />
          ))}

        </div>

      )}

    </div>
  );
}