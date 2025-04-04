import { Node } from "@tiptap/core";

const VideoExtension = Node.create({
  name: "video",

  group: "block",
  selectable: true,
  draggable: true,

  addAttributes() {
    return {
      src: { default: null },
      controls: { default: true },
      width: { default: "100%" },
    };
  },

  parseHTML() {
    return [{ tag: "video" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "video",
      { ...HTMLAttributes, controls: true },
      ["source", { src: HTMLAttributes.src, type: "video/webm" }],
    ];
  },

  addNodeView() {
    return ({ node }) => {
      const container = document.createElement("div");
      const video = document.createElement("video");
      video.src = node.attrs.src;
      video.controls = true;
      video.style.width = "100%";
      container.appendChild(video);
      return {
        dom: container,
      };
    };
  },

  addCommands() {
    return {
      setVideo:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },
});

export default VideoExtension;
