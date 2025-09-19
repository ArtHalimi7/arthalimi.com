import React from 'react';

export default function EmailModal({ open, type = 'info', title, message, onClose }) {
  if (!open) return null;

  const bg = type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-600' : 'bg-zinc-800';

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className={`relative max-w-lg w-full ${bg} text-white rounded-lg p-6 shadow-2xl z-10`} role="dialog" aria-modal="true" aria-labelledby="email-modal-title">
        <h3 id="email-modal-title" className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-sm text-white/90 mb-4">{message}</p>
        <div className="flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md">Close</button>
        </div>
      </div>
    </div>
  );
}
