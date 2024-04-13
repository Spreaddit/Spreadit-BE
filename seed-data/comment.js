const commentSeedData = [
    {
        _id: "624a4052e28fb9d9c024671a",
      content: "Great post!",
      userId: "624a4a94c66738f13854b474", // amira
      postId: "624a6962a85ed5a6d6ca9373", // post1 programming
      parentCommentId: null,
    },
    {
        _id: "624a48f143bd949036986953",
      content: "The best way to predict the future is to create it.",
      userId: "624a4fbf3f392aefdb4dd1c8", // farouq
      postId: "624a696f57adc725989d2de5", // post2 gaming
      parentCommentId: null,
    },
    {
        _id: "624a48f7244f88876b5bed2b",
      content: "The only way to do great work is to love what you do.",
      userId: "624a4fbf3f392aefdb4dd1c8", // farouq
      postId: "624a696f57adc725989d2de5", // post2 gaming
      parentCommentId: null,
    },
    {
        _id: "624a49017e14fbfa14e5b5b4",
      content: " Good work!",
      userId: "624a52d75ff69df002d25035", // mahmoud
      postId: "624a696f57adc725989d2de5", // post2 gaming
      parentCommentId: null,
    },
    {
        _id: "624a48fc091dc5e9ef70605e",
      content: "Nice job!",
      userId: "624a4fbf3f392aefdb4dd1c8", // farouq
      postId: "624a696f57adc725989d2de5", // post2 gaming
      parentCommentId: null,
    },
    {
        _id: "624a490d7e14fbfa14e5b5b6",
      content: "this reply 1",
      userId: "624a52d75ff69df002d25035", // mahmoud
      postId: "624a696f57adc725989d2de5", // post2 gaming
      parentCommentId: "624a48f143bd949036986953",
    },
    {
        _id: "624a49117e14fbfa14e5b5b7",
      content: "this reply 2",
      userId: "624a4fbf3f392aefdb4dd1c8", // farouq
      postId: "624a6962a85ed5a6d6ca9373", // post1 programming
      parentCommentId: "624a49017e14fbfa14e5b5b4",
    },
    {
        _id: "624a4914062642bd2fa6e586",
      content: "this reply 3",
      userId: "624a4a94c66738f13854b474", // amira
      postId: "624a6962a85ed5a6d6ca9373", // post1 programming
      parentCommentId: "624a49097e14fbfa14e5b5b5",
    },
    {
        _id: "624a49097e14fbfa14e5b5b5",
      content: "Practice makes perfect.",
      userId: "624a4fbf3f392aefdb4dd1c8", // farouq
      postId: "624a6962a85ed5a6d6ca9373", // post1 programming
      parentCommentId: null,
    },
    {
        _id: "624a4906062642bd2fa6e585",
      content: "If you can dream it, you can do it.",
      userId: "624a4a94c66738f13854b474", //amira
      postId: "624a6962a85ed5a6d6ca9373", // post1 programming
      parentCommentId: null,
    },
];
  
exports.data = commentSeedData;
  