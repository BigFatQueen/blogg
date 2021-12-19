/** @format */

import React, { useRef, useState, useMemo } from "react";
import JoditEditor from "jodit-react";

const Editor = ({ oldvalue = "", ...props }) => {
  const { contents, getValue } = props;
  const editor = useRef(null);
  const config = {
    buttons: [
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "|",
      "ul",
      "ol",
      "|",
      "center",
      "left",
      "right",
      "justify",
      "|",
      "link",
      // 'image',
    ],
    uploader: { insertImageAsBase64URI: true },
    removeButtons: ["brush", "file", "image"],
  };

  //contents is the dynamic value from parent

  return useMemo(
    () => (
      <JoditEditor
        ref={editor}
        value={contents}
        config={config}
        onChange={(content) => getValue(content)}
      />
    ),
    []
  );
};

export default Editor;
