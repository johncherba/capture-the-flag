import React, { useState, useEffect } from "react";
import useTypewriter from "../../hooks/useTypewriter";

function CaptureTheFlag() {
  const [htmlContent, setHtmlContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHtml = async () => {
      try {
        const response = await fetch(
          "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/6e6174"
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
  }, [isLoading, error, htmlContent]);

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
// https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/challenge
// const elements = document.getElementsByClassName('ramp ref');
// let url = Array.from(elements)
//   .map(element => element.getAttribute('value'))
//   .join('');
// console.log(url);
// result: https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/6e6174
