"use client"

import { X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ActionModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
}

export function ActionModal({ isOpen, onClose, onConfirm, title, description }: ActionModalProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <p className="mb-6 text-sm text-gray-600">{description}</p>

        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          <p>This will:</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Create a draft message or task</li>
            <li>Add to your action queue</li>
            <li>Track completion status</li>
          </ul>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} className="bg-white">
            Cancel
          </Button>
          <Button onClick={onConfirm} className="bg-[#2563eb] text-white hover:bg-blue-700">
            <Check className="mr-2 h-4 w-4" />
            Confirm
          </Button>
        </div>
      </div>
    </>
  )
}
