import { useEffect, useRef, useState } from "react";

export default function useClickOutSide(dom = "button") {
  const [show, setShow] = useState(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    // function handleClickOutDropDown(e) {
    const handleClickOutSide = (e) => {
      if (
        nodeRef.current &&
        !nodeRef.current.contains(e.target) &&
        !e.target.matches(dom)
      ) {
        setShow(false);
      }
      //   else {
      //     console.log("click in dropdown");
      //   }
    };
    document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, []);

  const handleSelected = () => {
    setShow((showDropdown) => !showDropdown);
  };

  return {
    show,
    setShow,
    handleSelected,
    nodeRef,
  };
}
