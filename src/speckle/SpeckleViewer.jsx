import React, { useEffect, useState } from "react";
import {
  Viewer,
  DefaultViewerParams,
  SpeckleLoader,
  MeasurementsExtension,
  FilteringExtension,
} from "@speckle/viewer";
import { CameraController } from "@speckle/viewer";

function SpeckleViewer() {
  const [objUrl, setObjUrl] = useState("");
  const [loading, setLoading] = useState("");
  const getModel = async () => {
    setLoading(true);
    /** Get the HTML container */
    const container = document.getElementById("renderer");

    /** Create Viewer instance */
    const viewer = new Viewer(container, DefaultViewerParams);
    /** Initialise the viewer */
    await viewer.init();

    /** Add the stock camera controller extension */
    viewer.createExtension(CameraController);
    /** Add the measurement tool */
    viewer.createExtension(MeasurementsExtension);
    const filteringExtension = viewer.createExtension(FilteringExtension);

    //   https://speckle.xyz/streams/da9e320dad/objects/31d10c0cea569a1e26809658ed27e281;
    //   https://latest.speckle.dev/streams/92b620fb17/objects/801360a35cd00c13ac81522851a13341
    //   https://latest.speckle.dev/streams/c43ac05d04/objects/d807f3888a400dbd814529fafd8ccac0;
    //   https://latest.speckle.dev/streams/c43ac05d04/objects/d807f3888a400dbd814529fafd8ccac0
    //   https://latest.speckle.dev/streams/c43ac05d04/objects/ef425ae2166636e9542e20e5571d5261

    /** Create a loader for the speckle stream */
    const loader = new SpeckleLoader(viewer.getWorldTree(), objUrl);
    /** Load the speckle data */
    await viewer.loadObject(loader, 1, true);
    setObjUrl("");
    setLoading(false);
  };

  return (
    <>
      <div>
        <input
          type="text"
          value={objUrl}
          onChange={(e) => setObjUrl(e.target.value)}
          placeholder="enter object url"
          //   width={40}
        />
        <button onClick={getModel}>Get Model</button>
        {loading && <span>loading.......</span>}
      </div>
      <div
        id="renderer"
        style={{
          width: "100%",
          height: "80%",
          left: 0,
          top: "10%",
          position: "absolute",
        }}
      ></div>
    </>
  );
}

export default SpeckleViewer;
