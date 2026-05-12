import { useState } from "react";

type FormFields = {
  title: string;
  type: string;
  description: string;
  location: string;
};

type FormErrors = {
  title?: string;
  description?: string;
  location?: string;
};

export default function ManagePositions() {

  const [form, setForm] = useState<FormFields>({
    title: "",
    type: "Full Time",
    description: "",
    location: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const [successMessage, setSuccessMessage] = useState<string>("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: "" });
    }
  }

  function validate(): FormErrors {
    const newErrors: FormErrors = {};
    if (!form.title.trim())       newErrors.title = "Position title is required.";
    if (!form.description.trim()) newErrors.description = "Description is required.";
    if (!form.location.trim())    newErrors.location = "Location is required.";
    return newErrors;
  }

  function handleSubmit() {
    const foundErrors = validate();

    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
      return;
    }

    console.log("Submitting position:", form);

    setSuccessMessage("Position added successfully!");
    setForm({ title: "", type: "Full Time", description: "", location: "" });
    setErrors({});

    setTimeout(() => setSuccessMessage(""), 3000);
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-start justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm overflow-hidden">

        {/* Header */}
        <div className="bg-slate-900 px-6 py-4">
          <h1 className="text-white font-bold text-lg">Add New Position</h1>
          <p className="text-slate-400 text-sm mt-0.5">Fill in the details for the job listing.</p>
        </div>

        {/* Form body */}
        <div className="p-6 flex flex-col gap-5">

          {/* Success message */}
          {successMessage && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium px-4 py-3 rounded-xl">
              ✓ {successMessage}
            </div>
          )}

          {/* Position Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">
              Position Title <span className="text-red-500">*</span>
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. GIS Engineer"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-all
                focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500
                ${errors.title ? "border-red-300 bg-red-50" : "border-slate-200"}`}
            />
            {errors.title && (
              <p className="text-xs text-red-500">{errors.title}</p>
            )}
          </div>

          {/* Employment Type */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">
              Employment Type
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none
                focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 bg-white"
            >
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Contract</option>
              <option>Internship</option>
              <option>Freelance</option>
            </select>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the role responsibilities..."
              rows={4}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none resize-y transition-all
                focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500
                ${errors.description ? "border-red-300 bg-red-50" : "border-slate-200"}`}
            />
            {errors.description && (
              <p className="text-xs text-red-500">{errors.description}</p>
            )}
          </div>

          {/* Location */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. Bengaluru, India / Hybrid"
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none transition-all
                focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500
                ${errors.location ? "border-red-300 bg-red-50" : "border-slate-200"}`}
            />
            {errors.location && (
              <p className="text-xs text-red-500">{errors.location}</p>
            )}
          </div>

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl py-3 transition-colors mt-1"
          >
            Add Position
          </button>

        </div>
      </div>
    </div>
  );
}