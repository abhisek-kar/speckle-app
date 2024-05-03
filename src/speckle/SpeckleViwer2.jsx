import React, { useEffect } from "react";
import {
  Viewer,
  DefaultViewerParams,
  SpeckleLoader,
  TreeNode,
  FilteringExtension,
  PropertyInfo,
} from "@speckle/viewer";
import { CameraController, SelectionExtension } from "@speckle/viewer";
import { Pane } from "tweakpane";

function SpeckleViwer2() {
  useEffect(() => {
    async function main() {
      /** Get the HTML container */
      const container = document.getElementById("renderer");
      if (!container) return; // Check if container exists

      /** Configure the viewer params */
      const params = DefaultViewerParams;
      params.verbose = true;

      /** Create Viewer instance */
      const viewer = new Viewer(container, params);
      /** Initialise the viewer */
      await viewer.init();

      /** Add the stock camera controller extension */
      viewer.createExtension(CameraController);
      /** Add the selection extension for extra interactivity */
      viewer.createExtension(SelectionExtension);
      const filtering = viewer.createExtension(FilteringExtension);
      /** Create a loader for the speckle stream */
      const loader = new SpeckleLoader(
        viewer.getWorldTree(),
        "https://speckle.xyz/streams/da9e320dad/objects/31d10c0cea569a1e26809658ed27e281",
        ""
      );
      /** Load the speckle data */
      await viewer.loadObject(loader, true);
      /** Get all the properties in the scene. We'll be doing some filtering based on them */
      const properties = await viewer.getObjectProperties();

      const wallNodes = viewer.getWorldTree().findAll((node: TreeNode) => {
        if (!node.model.raw.speckle_type) return;
        return node.model.raw.speckle_type.includes("RevitWall");
      });
      const floorNodes = viewer.getWorldTree().findAll((node: TreeNode) => {
        if (!node.model.raw.speckle_type) return;
        return node.model.raw.speckle_type.includes("RevitFloor");
      });

      const pane = new Pane({ title: "Filtering", expanded: true });
      pane
        .addButton({
          title: "Hide Walls",
        })
        .on("click", () => {
          const filteringState = filtering.hideObjects(
            wallNodes.map((node: TreeNode) => node.model.id)
          );
          console.log(`Hidden objects: ${filteringState.hiddenObjects}`);
        });
      pane
        .addButton({
          title: "Isolate Floors",
        })
        .on("click", () => {
          const filteringState = filtering.isolateObjects(
            floorNodes.map((node: TreeNode) => node.model.id)
          );
          console.log(`Isolated objects: ${filteringState.isolatedObjects}`);
        });
      pane
        .addButton({
          title: "Color By Floor",
        })
        .on("click", () => {
          filtering.resetFilters();
          const data = properties.find((value) => value.key === "level.name"); // Removed unnecessary "as PropertyInfo"
          if (data) {
            // Check if data exists before using it
            const filteringState = filtering.setColorFilter(data);
            console.log("Color groups: ", filteringState.colorGroups);
          }
        });
      pane
        .addButton({
          title: "Reset",
        })
        .on("click", () => {
          filtering.resetFilters();
        });
    }

    /** Call our function, which we named 'main' */
    main();

    // Clean up function to unload viewer when component unmounts
    return () => {
      const container = document.getElementById("renderer");
      if (container) container.innerHTML = ""; // Clear the container to unload the viewer
    };
  }, []); // Empty dependency array to run the effect only once on component mount

  return (
    <div
      id="renderer"
      style={{
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        position: "absolute",
      }}
    />
  );
}

export default SpeckleViwer2;
