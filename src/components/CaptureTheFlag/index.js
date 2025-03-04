import React, { useState, useEffect, useMemo } from "react";

function CaptureTheFlag() {
  const [htmlContent, setHtmlContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHtml = async () => {
      try {
        const response = await fetch(
          "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/75706c"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        setIsLoading(false);
        setHtmlContent(text);
      } catch (error) {
        setError(error);
        setIsLoading(false);
        console.error("Could not fetch HTML", error);
      }
    };

    fetchHtml();
    console.log(htmlContent);
  }, [isLoading, error]);

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

  const flag = useTypewriter(htmlContent, 500);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoading) {
    return (
      <>
        <p>{flag}</p>
        <ul>
          {Array.from(htmlContent).map((char, index) => (
            <li key={index}>{char}</li>
          ))}
        </ul>
      </>
    );
  }
}

export default CaptureTheFlag;

// BONUS Code for step 2
// const elements = document.getElementsByClassName('ramp ref');
// let url = Array.from(elements)
//   .map(element => element.getAttribute('value'))
//   .join('');
// console.log(url);
