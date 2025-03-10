import { useState, useEffect, useMemo } from "react";

const useTypewriter = (text, speed = 0) => {
  const [index, setIndex] = useState(0);
  const displayText = useMemo(() => text.slice(0, index), [index]);

  useEffect(() => {
    if (index >= text.length) return;

    const timeoutId = setTimeout(() => {
      setIndex((i) => i + 1);
    }, speed);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [index, text, speed]);

  return displayText;
};

export default useTypewriter;
