"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

export const UserDialog = () => {
  const [userIdPass, setUserIdPass] = useState({ id: "", password: "" });

  function handleUserIdPass(e) {
    e.preventDefault();
    setUserIdPass(e.target.value);
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="px-4 py-2 text-lg  text-gray-700 font-semibold rounded transition hover:text-blue-600">
          {"Login"}
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 backdrop-blur bg-white/30" />

        <Dialog.Content className="fixed left-1/2 top-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 rounded bg-whitw p-6 shadow-lg">
          <Dialog.Close asChild>
            <button
              className="p-1 rounded-full hover:bg-gray-200 fixed right-1 mr-3 "
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>

          <Dialog.Title className="text-lg font-medium">{"Login"}</Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-gray-600">
            {"login for saving your information"}
          </Dialog.Description>

          <fieldset className="mt-4 flex flex-col gap-2">
            <label>Username:</label>
            <input
              type="text"
              placeholder="username"
              className="border px-2 py-1 rounded"
            />
          </fieldset>

          <fieldset className="mt-2 flex flex-col gap-2">
            <label>Password:</label>
            <input
              type="password"
              placeholder="••••"
              className="border px-2 py-1 rounded"
            />
          </fieldset>

          <div className="mt-4 flex justify-between">
            <Dialog.Close asChild>
              <button
                onClick={() => handleUserIdPass(e)}
                className="px-4 py-2 bg-yellow-500 text-white rounded transition hover:bg-yellow-700"
              >
                Login
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default function LoginPage() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    try {
      async function fetchData() {
        const res = await fetch("http://localhost:5000/users");
        const data = await res.json();
        setUserData(data);
      }

      fetchData();
    } catch (err) {
      console.log("error while fetching the data", err);
    }
  }, []);

  console.log(userData);

  return <div>login</div>;
}
