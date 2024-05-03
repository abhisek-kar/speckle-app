import React, { useState } from "react";

const App = () => {
  const [modelId, setModelID] = useState("");
  const [loading, setLoading] = useState(true);
  return (
    <div>
      <div>
        <input
          type="text"
          value={modelId}
          onChange={(e) => {
            setModelID(e.target.value);
            setLoading(true);
          }}
          placeholder="enter Model Id"
          //   width={40}
        />
        <button onClick={() => setLoading(false)}>Get Model</button>
        {/* {loading && <span>loading.......</span>} */}
      </div>
      {!loading && (
        <iframe
          title="Speckle"
          src={`https://app.speckle.systems/projects/24d9a85264/models/${modelId}#embed=%7B%22isEnabled%22%3Atrue%7D`}
          width="1000"
          height="800"
          frameborder="0"
        ></iframe>
      )}
      {/* 69512b7677 */}
    </div>
  );
};

export default App;
