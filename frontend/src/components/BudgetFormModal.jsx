// src/components/BudgetFormModal.jsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion, AnimatePresence } from "framer-motion";

const schema = yup.object({
  title: yup.string().trim().required("Title is required"),
  category: yup.string().trim().required("Category is required"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .positive("Amount must be > 0")
    .required("Amount is required"),
  date: yup.date().required("Date is required"),
  description: yup.string().nullable(),
});

export default function BudgetFormModal({ open, onClose, onSave, initialData }) {
  const isEdit = Boolean(initialData);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData || {
      title: "",
      category: "",
      amount: "",
      date: "",
      description: "",
    },
  });

  // Reset form values when initialData changes
  useEffect(() => {
    reset(initialData || {
      title: "",
      category: "",
      amount: "",
      date: "",
      description: "",
    });
  }, [initialData, reset]);

  const submit = async (values) => {
    const stored = JSON.parse(localStorage.getItem("budgets")) || [];
    let updatedBudgets;

    if (isEdit) {
      // Edit existing item
      updatedBudgets = stored.map((item) =>
        item.id === initialData.id ? { ...item, ...values } : item
      );
    } else {
      // Add new item
      updatedBudgets = [
        ...stored,
        { id: Date.now(), ...values }
      ];
    }

    // Save to localStorage
    localStorage.setItem("budgets", JSON.stringify(updatedBudgets));

    // Update parent component state
    onSave(updatedBudgets);

    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.form
            onSubmit={handleSubmit(submit)}
            className="relative bg-white dark:bg-gray-900 rounded-2xl z-10 p-6 sm:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col gap-5"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 250, damping: 25 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {isEdit ? "Edit Budget Item" : "Create Budget Item"}
            </h3>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                {...register("title")}
                className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100 ${
                  errors.title ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                }`}
                placeholder="Enter budget title"
              />
              {errors.title && <p className="text-xs text-red-600">{errors.title.message}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <input
                {...register("category")}
                className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100 ${
                  errors.category ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                }`}
                placeholder="E.g. Marketing, Travel"
              />
              {errors.category && <p className="text-xs text-red-600">{errors.category.message}</p>}
            </div>

            {/* Amount & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Amount</label>
                <input
                  type="number"
                  step="0.01"
                  {...register("amount")}
                  className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100 ${
                    errors.amount ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter amount"
                />
                {errors.amount && <p className="text-xs text-red-600">{errors.amount.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  {...register("date")}
                  className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100 ${
                    errors.date ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                  }`}
                />
                {errors.date && <p className="text-xs text-red-600">{errors.date.message}</p>}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                {...register("description")}
                className="w-full rounded-lg border px-3 py-2 resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100 border-gray-300"
                rows={3}
                placeholder="Optional notes..."
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border border-gray-300 px-5 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-md bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
              >
                {isEdit ? "Save Changes" : "Create"}
              </button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
