const postSeedData = [
    {
        _id: "624a6962a85ed5a6d6ca9373",
      userId: "624a4fbf3f392aefdb4dd1c8",
      username: "farouq12",
      title: "Sample Post 1",
      content: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."],
      community: "programming",
      type: "Post",
      isNsfw: false,
      comments: ["624a4052e28fb9d9c024671a", "624a49117e14fbfa14e5b5b7", "624a4914062642bd2fa6e586", "624a49097e14fbfa14e5b5b5", "624a4906062642bd2fa6e585" ],
    },
    {
        _id: "624a696f57adc725989d2de5",
      userId: "624a4fbf3f392aefdb4dd1c8",
      username: "farouq12",
      title: "Sample Post 2",
      content: ["Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.", "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."],
      community: "Gaming",
      type: "Link",
      link: "https://drive.google.com/drive/folders/1lrLdGmXxTiG7W-ov8C3w7N7ODs1_uS…",
      isNsfw: false,
      sendPostReplyNotification: true,
      comments: ["624a48f143bd949036986953", "624a48f7244f88876b5bed2b", "624a49017e14fbfa14e5b5b4", "624a48fc091dc5e9ef70605e", "624a490d7e14fbfa14e5b5b6",], 
    },
];
  
exports.data = postSeedData;
  