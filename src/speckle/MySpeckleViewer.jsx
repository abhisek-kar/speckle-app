// Install the necessary dependencies first:
// npm install @speckle/viewer @speckle/objects

import React, { useEffect, useRef } from "react";
import { Viewer } from "@speckle/viewer";

function MySpeckleViewer() {
  const viewerRef = useRef(null);

  useEffect(() => {
    // Initialize the viewer
    const viewer = new Viewer(viewerRef.current, {
      serverUrl: "https://your-speckle-server.com",
      token: "your-access-token",
      streamId: "your-stream-id",
      commitId: "your-commit-id",
    });

    // Load the model
    viewer.load();

    // Optional: Set viewer options (e.g., background color, camera position)
    viewer.setOptions({
      backgroundColor: "#f0f0f0",
      cameraPosition: { x: 10, y: 10, z: 10 },
    });

    // Optional: Handle viewer events (e.g., selection, camera changes)
    viewer.on("selection", (selectedObjects) => {
      console.log("Selected objects:", selectedObjects);
    });

    // Clean up when component unmounts
    return () => {
      viewer.dispose();
    };
  }, []);

  return (
    <div ref={viewerRef} style={{ width: "100%", height: "500px" }}>
      {/* The viewer will be rendered here */}
    </div>
  );
}

export default MySpeckleViewer;
