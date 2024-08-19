"use client";

import { User2 } from "lucide-react";
import { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";

// 🦁 Crée un contexte `DialogContext` avec une valeur par défaut `null`

const DialogContext = createContext(null);

// 🦁 Crée une fonction `useDialogContext` qui va retourner le contexte `DialogContext`
// 💡 Utilise `useContext` pour récupérer le contexte `DialogContext`
// ❌ Si le contexte renvoie null, on va renvoyer une erreur
// ✅ Sinon on va renvoyer le contexte

const useDialogContext = ()=> {
  const context = useContext(DialogContext);
  if(!context) {
    throw new Error("useDialogContext must be used within a dialog provider");
  }
  return context;
}

// Modifie Dialog pour qu'il injecte le `open, setOpen` dans notre `DialogContext.Provider`
// https://react.dev/reference/react/createContext#provider
const Dialog = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <DialogContext.Provider value={{open, setOpen}}>
        {children}
    </DialogContext.Provider>
  );
};

// 🦁 Enlève les props et utilise `useDialogContext` pour récupérer le contexte
const DialogContent = ({ children }) => {
  
  const {open} = useDialogContext()
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in-50">
      <div className="card w-96 bg-base-200 shadow-xl animate-in fade-in-50 slide-in-from-bottom-3">
        <div className="card-body">
          {children}
        </div>
      </div>
    </div>
  );
};

// 🦁 Crée un component DialogTrigger qui prend comme props children
// Celui-ci va contenir le bouton avec un onClick qui va mettre à jour le state `open`
// Utilise `useDialogContext` pour récupérer le contexte `DialogContext`

const DialogTrigger = ({ children }) => {
  const { setOpen } = useDialogContext();
  return <button className="btn" onClick={() => setOpen(true)}>{children}</button>;
}

// 🦁 Crée un component DialogClose qui prend comme props children
// Celui-ci va contenir le bouton avec un onClick qui va mettre à jour le state `open`
// Utilise `useDialogContext` pour récupérer le contexte `DialogContext`

const DialogClose = ({children }) => {
  const { setOpen } = useDialogContext();
  return <button className="btn" onClick={() => setOpen(false)}>{children}</button>;
}

export default function App() {
  return (
    <div>
      {/* 🦁 Mets ensemble nos components pour avoir un Dialog fonctionnel */}
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
        <p>What is your name ?</p>
        <label className="input input-bordered flex items-center gap-2">
          <
// @ts-ignore
          User2 scale={16} />
          <input type="text" className="grow" placeholder="Username" />
        </label>
        <div className="flex gap-2">
          {/* 🦁 Ajoute le bouton "Cancel" */}
          <DialogClose>Cancel</DialogClose>
          <button className="btn btn-primary">Submit</button>
        </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
