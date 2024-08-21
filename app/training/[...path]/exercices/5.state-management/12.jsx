"use client";

import { X } from "lucide-react";
import { User2 } from "lucide-react";
import { useEffect } from "react";
import { act } from "react";
import { useRef } from "react";
import { cloneElement } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useState } from "react";


// 🦁 Crée un contexte `DialogContext` avec une valeur par défaut `null`

const DialogContext = createContext(null);

// 🦁 Crée une fonction `useDialogContext` qui va retourner le contexte `DialogContext`
// 💡 Utilise `useContext` pour récupérer le contexte `DialogContext`
// ❌ Si le contexte renvoie null, on va renvoyer une erreur
// ✅ Sinon on va renvoyer le contexte

const useDialogContext = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialogContext must be used within a dialog provider");
  }
  return context;
}

const useEventListener = ({
  eventName,
  handler,
  element = window,
  enabled = true }) => {

  // 🦁 Créer un `useRef` qui stocke la référence de `handler` = ref stable
  const handlerRef = useRef(handler);
  //créer un useEffect qui met à jour la ref avec le handler => ce met à jour à chaque fois que le handler change
  //mais cout tres faible car on ne fait que mettre à jour la ref
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);


  useEffect(() => {
    if (!enabled) return;

    const onEvent = (e) => {
      handlerRef.current(e);
    }
    console.log("add event listener");
    element.addEventListener(eventName, onEvent);
    return () => {
      console.log("remove event listener");
      element.removeEventListener(eventName, onEvent);
    }
  }, [element, eventName, enabled]);
};

const useClickOutside = (ref, handler) => {

  const handleEvent = (e) => {
    if (ref.current?.contains(e.target)) return
    handler();
  }

  useEventListener({
    eventName: "pointerdown",
    handler: (e) => {
      handleEvent(e)
    },
    enabled: true
  })
};

//partie 3 créer un focus trap

// 🦁 Crée une fonction `getFocusableElements` qui prend comme argument une référence 
// et qui va retourner un tableau de tous les éléments focusables à l'intérieur de la référence
const getFocusableElements = (ref) => Array.from(
  ref.current.querySelectorAll(
    'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
  )
);


const useFocusTrap = (ref, isEnabled) => {

  useEventListener({
    eventName: "keydown",
    handler: (e) => {

if (e.key !== "Tab") return
//tableau des éléments focusables
const focusableElements = getFocusableElements(ref);
//récupération de l'élément focus
const actualFocus = document.activeElement;
//récupération de l'index de l'élément focus 
const actualFocusIndex = focusableElements.indexOf(actualFocus);
// en fonction de la touche shift on va determiner l'index de l'élément suivant
// +1 si on va vers l'avant et -1 si on va vers l'arrière
let nextActiveElementIndex = e.shiftKey ? actualFocusIndex - 1 : actualFocusIndex + 1;
//on cherche l'élément suivant dans le tableau
const elementToFocus = focusableElements[nextActiveElementIndex];
//si on trouve l'élément comportement normal du va qui va focus sur l'élément
if (elementToFocus) return
//sinon on va focus sur le premier élément du tableau si index négatif et sur le dernier si index positif
 nextActiveElementIndex = nextActiveElementIndex < 0 ? focusableElements.length - 1 : 0;
focusableElements[nextActiveElementIndex]?.focus();
//on empêche le comportement par défaut
e.preventDefault();
    },
    enabled: isEnabled
  });

}


// Modifie Dialog pour qu'il injecte le `open, setOpen` dans notre `DialogContext.Provider`
// https://react.dev/reference/react/createContext#provider
const Dialog = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <DialogContext.Provider value={{ open, setOpen }} >
      {children}
    </DialogContext.Provider>
  );
};

// 🦁 Enlève les props et utilise `useDialogContext` pour récupérer le contexte
const DialogContent = ({ children }) => {
  const { open, setOpen } = useDialogContext()

  const ref = useRef(null);
  useClickOutside(ref, () => setOpen(false));
  useFocusTrap(ref, open);

  useEventListener({
    eventName: "keydown",
    handler: (e) => {
      if (e.key !== "Escape") return
      setOpen(false)
    },
    enabled: open
  })
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal={open}
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in-50">
      <div ref={ref} className="card w-96 bg-base-200 shadow-xl animate-in fade-in-50 slide-in-from-bottom-3" >
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
  if (typeof children !== "string") {
    return cloneElement(children, {
      onClick: (e) => {
        setOpen(true)
        children.props.onClick?.(e)
      }
    });
  }
  return <button className="btn" onClick={() => setOpen(true)}>{children}</button>;
}

// 🦁 Crée un component DialogClose qui prend comme props children
// Celui-ci va contenir le bouton avec un onClick qui va mettre à jour le state `open`
// Utilise `useDialogContext` pour récupérer le contexte `DialogContext`

const DialogClose = ({ children }) => {
  const { setOpen } = useDialogContext();
  if (typeof children !== "string") {
    return cloneElement(children, {
      onClick: (e) => {
        setOpen(false)
        children.props.onClick?.(e)
      }
    });
  }
  return <button className="btn" onClick={() => setOpen(false)}>{children}</button>;
}


export default function App() {

  return (
    <div>
      {/* 🦁 Mets ensemble nos components pour avoir un Dialog fonctionnel */}
      <Dialog>
        <DialogTrigger>
          <button className="btn btn-primary btn-lg" onClick={() => console.log('click')}>Open Dialog Now!</button>
        </DialogTrigger>
        <DialogContent>
          <p>What is your name ?</p>
          <label className="input input-bordered flex items-center gap-2">
            <
              // @ts-ignore
              User2 scale={16} />
            <input type="text" className="grow" placeholder="Username" />
          </label>
          <div className="card-actions">
            {/* 🦁 Ajoute le bouton "Cancel" */}
            <button className="btn btn-primary">Submit</button>
            <DialogClose>
              <button className="absolute right-4 top-4 flex size-6 items-center justify-center rounded-lg bg-base-100">
                <
                  // @ts-ignore
                  X size={12} />
              </button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
