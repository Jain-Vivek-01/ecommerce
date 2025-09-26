"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function AlertDelete({ handleClickDelete, id }) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger className="bg-red-300 p-2 rounded-lg transition hover:bg-red-600">
        <TrashIcon className="h-4 w-4" />
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

        <AlertDialog.Content className="fixed left-1/2 top-1/2 max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
          <AlertDialog.Title className="text-lg font-semibold text-gray-900">
            <TrashIcon className="h-4 w-4" />
          </AlertDialog.Title>
          <AlertDialog.Description className="mt-2 text-sm text-gray-600">
            Are you sure? This product will be removed from your cart.
          </AlertDialog.Description>

          <div className="mt-4 flex justify-end gap-3">
            <AlertDialog.Cancel asChild>
              <button className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">
                Cancel
              </button>
            </AlertDialog.Cancel>

            <AlertDialog.Action asChild>
              <button
                onClick={() => handleClickDelete(id)}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-700"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
