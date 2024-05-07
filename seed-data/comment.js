const commentSeedData = [
  {
    _id: "624a6a677c8d9c9f5fd5efcc",
    content: "Great tutorial! Python is such a versatile language.",
    userId: "624a4fbf3f392aefdb4dd1c8", // Farouq
    postId: "624a6a677c8d9c9f5fd5eb3e",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ecff",
    content: "I'm excited to dive into Python! Thanks for sharing.",
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    postId: "624a6a677c8d9c9f5fd5eb3e",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5e003",
    content:
      "Absolutely! Python's readability and simplicity make it a fantastic choice for beginners.",
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5efcc",
  },
  {
    _id: "624a6a677c8d9c9f5fd5e000",
    content:
      "Java's data structures are so powerful! Looking forward to learning more.",
    userId: "624a6a677c8d9c9f5fd5eb11", // Rehab
    postId: "624a6a677c8d9c9f5fd5eb3f",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5e001",
    content:
      "Data structures are fundamental to mastering algorithms. Excited to dive into this!",
    userId: "624a6a677c8d9c9f5fd5eb14", // Karim
    postId: "624a6a677c8d9c9f5fd5eb3f",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5e005",
    content:
      "Definitely! Understanding data structures opens up a whole new world in programming.",
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5e000",
  },
  {
    _id: "624a6a677c8d9c9f5fd5e002",
    content:
      "This sounds like a fantastic opportunity to brush up on web dev skills!",
    userId: "624a6a677c8d9c9f5fd5eb0f", // Farida
    postId: "624a6a677c8d9c9f5fd5eb41",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb40",
    content: "Count me in! Always eager to learn more about web development.",
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    postId: "624a6a677c8d9c9f5fd5eb41",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5efb1",
    content:
      "Absolutely! Web development is constantly evolving, so it's great to stay updated.",
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5e002",
  },
  {
    _id: "624a6a677c8d9c9f5fd5efe8",
    content:
      "Machine learning is such an exciting field! Can't wait to dive into this post.",
    userId: "624a4fbf3f392aefdb4dd1c8", // Farouq
    postId: "624a6a677c8d9c9f5fd5eb42",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5efe1",
    content:
      "Machine learning algorithms have endless applications! Looking forward to learning more.",
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    postId: "624a6a677c8d9c9f5fd5eb42",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5efe2",
    content:
      "Absolutely! The potential of machine learning to revolutionize industries is truly remarkable.",
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5efe8",
  },
  {
    _id: "624a6a677c8d9c9f5fd5efe4",
    content:
      "Debugging is an essential skill for any programmer. Excited to pick up some new tricks!",
    userId: "624a6a677c8d9c9f5fd5eb0f", // Farida
    postId: "624a6a677c8d9c9f5fd5eb43",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5efe5",
    content:
      "Debugging can be challenging but also rewarding once you solve the problem. Looking forward to this post!",
    userId: "624a6a677c8d9c9f5fd5eb14", // Karim
    postId: "624a6a677c8d9c9f5fd5eb43",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5efe6",
    content:
      "Absolutely! Debugging teaches us patience and problem-solving skills.",
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5efe4",
  },

  {
    _id: "624a6a677c8d9c9f5fd5efe7",
    content:
      "Blockchain has the potential to revolutionize many industries. Excited to learn more about it!",
    userId: "624a6a677c8d9c9f5fd5eb0c", // Mimo
    postId: "624a6a677c8d9c9f5fd5eb45",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5e007",
    content:
      "The decentralized nature of blockchain technology is fascinating! Looking forward to this post.",
    userId: "624a6a677c8d9c9f5fd5eb0d", // Basem
    postId: "624a6a677c8d9c9f5fd5eb45",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5efe9",
    content:
      "Absolutely! Blockchain's ability to provide transparency and security is truly remarkable.",
    userId: "624a4fbf3f392aefdb4dd1c8", // Farouq
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5efe7",
  },
  {
    _id: "624a6a677c8d9c9f5fd5eff0",
    content:
      "Cybersecurity is crucial in today's digital world. Looking forward to learning some effective practices!",
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    postId: "624a6a677c8d9c9f5fd5eb46",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eff1",
    content:
      "As cyber threats evolve, it's important to stay updated on the best practices for online security.",
    userId: "624a6a677c8d9c9f5fd5eb11", // Rehab
    postId: "624a6a677c8d9c9f5fd5eb46",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5e004",
    content:
      "Absolutely! Implementing strong cybersecurity measures is essential to protect sensitive information.",
    userId: "624a4a94c66738f13854b474", // Amira
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5eff0",
  },
  {
    _id: "624a6a677c8d9c9f5fd5eff2",
    content:
      "Cloud computing is transforming the IT landscape. Can't wait to explore the latest trends!",
    userId: "624a6a677c8d9c9f5fd5eb14", // Karim
    postId: "624a6a677c8d9c9f5fd5eb47",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eff3",
    content:
      "The scalability and flexibility of cloud services are truly impressive. Excited for this post!",
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    postId: "624a6a677c8d9c9f5fd5eb47",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eff4",
    content:
      "Absolutely! Cloud computing offers unparalleled opportunities for businesses to scale and innovate.",
    userId: "624a4a94c66738f13854b474", // Amira
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5eff2",
  },
  {
    _id: "624a6a677c8d9c9f5fd5eff5",
    content:
      "Excited to see the latest tech gadgets! Always looking for recommendations.",
    userId: "624a4a94c66738f13854b474", // Amira
    postId: "624a6a677c8d9c9f5fd5eb48",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eff6",
    content:
      "I'm a tech enthusiast and can't wait to share my favorite gadgets with the community!",
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    postId: "624a6a677c8d9c9f5fd5eb48",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eff7",
    content:
      "That's great! It's always fun to discover new gadgets and innovations in consumer electronics.",
    userId: "624a52d75ff69df002d25035", // Mahmoud
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5eff5",
  },
  {
    _id: "624a6a677c8d9c9f5fd5eff8",
    content:
      "Excited to learn more about the differences between these frameworks! It'll help me make better decisions for my projects.",
    userId: "624a4fbf3f392aefdb4dd1c8", // Farouq
    postId: "624a6a677c8d9c9f5fd5eb49",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eff9",
    content:
      "I've worked with React and Angular, but I'm curious to see how Vue.js stacks up against them.",
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    postId: "624a6a677c8d9c9f5fd5eb49",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5efa0",
    content:
      "Definitely! Understanding the strengths and weaknesses of each framework is essential for efficient development.",
    userId: "624a52d75ff69df002d25035", // Mahmoud
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5eff8",
  },
  {
    _id: "624a6a677c8d9c9f5fd5efa1",
    content:
      "Both languages have their merits, but I'm leaning towards Python for its simplicity and versatility.",
    userId: "624a6a677c8d9c9f5fd5eb0c", // Mimo
    postId: "624a6a677c8d9c9f5fd5eb4a",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5efa2",
    content:
      "Java might be more verbose, but its performance and strong typing make it a solid choice for many projects.",
    userId: "624a6a677c8d9c9f5fd5eb0d", // Basem
    postId: "624a6a677c8d9c9f5fd5eb4a",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5efa3",
    content:
      "Indeed, Python's readability and extensive libraries are hard to beat. It's a favorite among many developers.",
    userId: "624a4a94c66738f13854b474", // Amira
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5efa1",
  },
  {
    _id: "624a6a677c8d9c9f5fd5efa4",
    content:
      "GitHub is such a powerful tool for collaboration! Looking forward to learning some new tips and tricks.",
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    postId: "624a6a677c8d9c9f5fd5eb4b",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5efa5",
    content:
      "As a beginner, navigating GitHub can be overwhelming. Any advice for someone just starting out?",
    userId: "624a4a94c66738f13854b474", // Amira
    postId: "624a6a677c8d9c9f5fd5eb4b",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5efa6",
    content:
      "Absolutely! GitHub's collaboration features make it a staple in the developer community. I'm eager to learn more too!",
    userId: "624a52d75ff69df002d25035", // Mahmoud
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5efa4",
  },
  {
    _id: "624a6a677c8d9c9f5fd5efa7",
    content:
      "Excited to level up my skills with this masterclass! Data structures and algorithms are so crucial for software development.",
    userId: "624a6a677c8d9c9f5fd5eb0c", // Mimo
    postId: "624a6a677c8d9c9f5fd5eb4c",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5efa8",
    content:
      "I've been looking for a comprehensive course on this topic. Can't wait to get started!",
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    postId: "624a6a677c8d9c9f5fd5eb4c",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5efa9",
    content:
      "Absolutely! Mastering data structures and algorithms can significantly enhance your problem-solving skills.",
    userId: "624a4fbf3f392aefdb4dd1c8", // Farouq
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5efa7",
  },
  {
    _id: "624a6a677c8d9c9f5fd5efc0",
    content:
      "I've heard great things about various web development bootcamps. Excited to see what others recommend!",
    userId: "624a4a94c66738f13854b474", // Amira
    postId: "624a6a677c8d9c9f5fd5eb4d",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5efc1",
    content:
      "As someone considering a career change into web development, I'm eager to explore bootcamp options. Any suggestions?",
    userId: "624a6a677c8d9c9f5fd5eb0c", // Mimo
    postId: "624a6a677c8d9c9f5fd5eb4d",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ebe5",
    content:
      "There are indeed many excellent bootcamps out there catering to different learning styles and career goals. I'll be sure to share my recommendations!",
    userId: "624a4fbf3f392aefdb4dd1c8", // Farouq
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5efc0",
  },
  {
    _id: "624a6a677c8d9c9f5fd5ebf2",
    content:
      "Black holes have always fascinated me! Can't wait to learn more about their mysteries.",
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    postId: "624a6a677c8d9c9f5fd5eb4e",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ebd2",
    content:
      "The concept of black holes is mind-boggling. Excited to unravel some of the secrets behind these cosmic phenomena!",
    userId: "624a52d75ff69df002d25035", // Mahmoud
    postId: "624a6a677c8d9c9f5fd5eb4e",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ebf5",
    content:
      "Indeed, black holes are one of the most intriguing topics in astrophysics. Looking forward to exploring their enigmatic nature together!",
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5ebf2",
  },
  {
    _id: "624a6a677c8d9c9f5fd5efc3",
    content:
      "DNA sequencing technology has advanced so rapidly in recent years. Excited to explore the latest breakthroughs!",
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    postId: "624a6a677c8d9c9f5fd5eb4f",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5efc4",
    content:
      "As someone interested in genetics, I'm eager to delve deeper into the advancements in DNA sequencing and their potential impact.",
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    postId: "624a6a677c8d9c9f5fd5eb4f",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ebf9",
    content:
      "Absolutely! The ability to sequence DNA with such precision has revolutionized many fields, from medicine to anthropology.",
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5eb71",
  },
  {
    _id: "624a6a677c8d9c9f5fd5ec74",
    content:
      "Quantum mechanics never fails to amaze me! Looking forward to exploring its mysteries.",
    userId: "624a6a677c8d9c9f5fd5eb0c", // Mimo
    postId: "624a6a677c8d9c9f5fd5eb50",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ebf0",
    content:
      "The quantum world is truly bizarre yet fascinating. Can't wait to learn more about it!",
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    postId: "624a6a677c8d9c9f5fd5eb50",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ec76",
    content:
      "Absolutely! Quantum mechanics challenges our understanding of reality in profound ways. It's going to be an exciting journey!",
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5ec74",
  },
  {
    _id: "624a6a677c8d9c9f5fd5efc5",
    content:
      "Climate change is one of the most pressing issues of our time. Excited to learn more about potential solutions!",
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    postId: "624a6a677c8d9c9f5fd5eb51",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ecc0",
    content:
      "As someone passionate about environmental conservation, I'm eager to engage in discussions about climate change and sustainability.",
    userId: "624a4fbf3f392aefdb4dd1c8", // Farouq
    postId: "624a6a677c8d9c9f5fd5eb51",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ecc3",
    content:
      "Absolutely, Mahmoud! It's crucial to explore both the challenges posed by climate change and the potential pathways to a more sustainable future.",
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5efc5",
  },
  {
    _id: "624a6a677c8d9c9f5fd5ecc2",
    content:
      "The evolutionary arms race is a fascinating aspect of natural history. Looking forward to exploring the intricate strategies of adaptation!",
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    postId: "624a6a677c8d9c9f5fd5eb52",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ecc5",
    content:
      "It's incredible how species continually evolve to outwit their predators. Can't wait to learn more about these evolutionary dynamics!",
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    postId: "624a6a677c8d9c9f5fd5eb52",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ecc8",
    content:
      "Absolutely, Galal! Nature's strategies for survival are endlessly fascinating and often surprisingly complex.",
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5ecc2",
  },
  {
    _id: "624a6a677c8d9c9f5fd5efb0",
    content:
      "Embarking on a journey to the edge of the universe sounds like a dream come true! Can't wait to delve into the mysteries of deep space.",
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    postId: "624a6a677c8d9c9f5fd5eb53",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eca1",
    content:
      "The vastness of the universe never ceases to amaze me. Excited to learn more about the wonders of the cosmos!",
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    postId: "624a6a677c8d9c9f5fd5eb53",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eca2",
    content:
      "Indeed, Basma! Exploring the mysteries of deep space opens up a world of possibilities and challenges our understanding of the cosmos.",
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5efb0",
  },
  {
    _id: "624a6a677c8d9c9f5fd5ecb0",
    content:
      "The search for extraterrestrial life is one of humanity's most profound quests. Excited to explore the mysteries of the cosmos!",
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    postId: "624a6a677c8d9c9f5fd5eb54",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eca5",
    content:
      "I've always been fascinated by the possibility of life beyond Earth. Can't wait to learn more about the latest discoveries in astrobiology!",
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    postId: "624a6a677c8d9c9f5fd5eb54",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5efb2",
    content:
      "Absolutely, Galal! The search for extraterrestrial life inspires us to contemplate our place in the universe and the possibility of other civilizations.",
    userId: "624a6a677c8d9c9f5fd5eb0c", // Mimo
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5ecb0",
  },
  {
    _id: "624a6a677c8d9c9f5fd5efb3",
    content:
      "The beauty of celestial phenomena never fails to awe and inspire. Looking forward to admiring the wonders of the universe!",
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    postId: "624a6a677c8d9c9f5fd5eb55",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5efb4",
    content:
      "Astrophotography allows us to capture the breathtaking beauty of cosmic events. Can't wait to see the stunning images!",
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    postId: "624a6a677c8d9c9f5fd5eb55",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ecf0",
    content:
      "Indeed, Mahmoud! The universe presents us with an endless array of captivating phenomena, each more awe-inspiring than the last.",
    userId: "624a6a677c8d9c9f5fd5eb0c", // Mimo
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5efb3",
  },
  {
    _id: "624a6a677c8d9c9f5fd5ece0",
    content:
      "Jupiter's moons offer a fascinating glimpse into the diversity of celestial bodies in our solar system. Excited to learn more about their unique characteristics!",
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    postId: "624a6a677c8d9c9f5fd5eb56",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5efb5",
    content:
      "The moons of Jupiter are like worlds unto themselves, each with its own mysteries waiting to be uncovered. Can't wait to embark on this celestial journey!",
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    postId: "624a6a677c8d9c9f5fd5eb56",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ecd9",
    content:
      "Absolutely, Galal! Jupiter's moons provide valuable insights into the formation and evolution of planetary satellites across the solar system.",
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5ece0",
  },
  {
    _id: "624a6a677c8d9c9f5fd5ece5",
    content:
      "Stargazing has always been a passion of mine. Looking forward to honing my skills with these tips and tricks!",
    userId: "624a6a677c8d9c9f5fd5eb0c", // Mimo
    postId: "624a6a677c8d9c9f5fd5eb57",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ece7",
    content:
      "Stargazing is such a peaceful and awe-inspiring activity. Can't wait to venture out into the night sky armed with these tips!",
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    postId: "624a6a677c8d9c9f5fd5eb57",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ece8",
    content:
      "Absolutely, Mimo! Stargazing is not just a hobby but a profound experience connecting us to the vastness of the cosmos.",
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5ece5",
  },
  {
    _id: "624a6a677c8d9c9f5fd5efb7",
    content:
      "Genetic diversity is the backbone of life on Earth, driving evolution and ensuring resilience in the face of environmental changes.",
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    postId: "624a6a677c8d9c9f5fd5eb58",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eda6",
    content:
      "The study of genetic diversity offers profound insights into the interconnectedness of all life forms. Excited to delve deeper into this fascinating subject!",
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    postId: "624a6a677c8d9c9f5fd5eb58",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eda7",
    content:
      "Well said, Galal! Genetic diversity is not only essential for the survival of species but also for the health and resilience of ecosystems.",
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5efb7",
  },
  {
    _id: "624a6a677c8d9c9f5fd5edc0",
    content:
      "Ecology is the study of interconnectedness, and biodiversity conservation is crucial for maintaining the delicate balance of our planet's ecosystems.",
    userId: "624a6a677c8d9c9f5fd5eb0c", // Mimo
    postId: "624a6a677c8d9c9f5fd5eb59",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5edb0",
    content:
      "Biodiversity is not just a source of wonder but also a source of resilience in the face of environmental challenges. Let's work together to protect it!",
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    postId: "624a6a677c8d9c9f5fd5eb59",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5edc2",
    content:
      "Absolutely, Mimo! Biodiversity conservation is a shared responsibility that requires collective action to safeguard the web of life.",
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5edc0",
  },
  {
    _id: "624a6a677c8d9c9f5fd5edc5",
    content:
      "The adaptability of animals never fails to fascinate me. Looking forward to learning more about these incredible evolutionary strategies!",
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    postId: "624a6a677c8d9c9f5fd5eb5a",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5edc3",
    content:
      "Nature's ingenuity truly knows no bounds. Can't wait to delve into the diverse world of animal adaptations!",
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    postId: "624a6a677c8d9c9f5fd5eb5a",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5edc7",
    content:
      "Absolutely, Galal! The evolutionary arms race has led to some astonishing adaptations that showcase the power of natural selection.",
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5edc5",
  },
  {
    _id: "624a6a677c8d9c9f5fd5edd0",
    content:
      "Marine biology offers a glimpse into a world of wonders beneath the waves. Excited to explore the mysteries of the ocean!",
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    postId: "624a6a677c8d9c9f5fd5eb5b",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5edf0",
    content:
      "The ocean is teeming with life, and studying marine biology allows us to appreciate the beauty and complexity of these underwater ecosystems.",
    userId: "624a6a677c8d9c9f5fd5eb0c", // Mimo
    postId: "624a6a677c8d9c9f5fd5eb5b",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5edd7",
    content:
      "Indeed, Galal! The ocean holds endless discoveries, and marine biology allows us to uncover the secrets of this vast and diverse ecosystem.",
    userId: "624a6a677c8d9c9f5fd5eb0d", // Basem
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5edd0",
  },
  {
    _id: "624a6a677c8d9c9f5fd5edd3",
    content:
      "Genomics is at the forefront of scientific breakthroughs, offering insights into our genetic makeup and paving the way for personalized medicine.",
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    postId: "624a6a677c8d9c9f5fd5eb5c",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5edf5",
    content:
      "The field of genomics holds immense promise for revolutionizing healthcare and understanding the intricacies of life itself. Exciting times ahead!",
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    postId: "624a6a677c8d9c9f5fd5eb5c",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5edf4",
    content:
      "Absolutely, Mahmoud! The genomic revolution has the potential to transform medicine and biology, offering new avenues for research and treatment.",
    userId: "624a6a677c8d9c9f5fd5eb0c", // Mimo
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5edd3",
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb9b",
    content:
      "Art has the incredible ability to convey emotions beyond words. Looking forward to experiencing the raw emotion captured in these paintings!",
    userId: "624a4a94c66738f13854b474", // Amira
    postId: "624a6a677c8d9c9f5fd5eb5d",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb9c",
    content:
      "Painting with emotions adds depth and authenticity to artistic expression. Can't wait to immerse myself in this unique form of creativity!",
    userId: "624a6a677c8d9c9f5fd5eb0c", // Mimo
    postId: "624a6a677c8d9c9f5fd5eb5d",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb9d",
    content:
      "Absolutely, Amira! Expressive art has the power to evoke profound emotions and create a profound connection between the artist and the viewer.",
    userId: "624a4fbf3f392aefdb4dd1c8", // Farouq
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5eb9b",
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb9e",
    content:
      "The fusion of music and visual arts offers a multisensory experience that stimulates both the auditory and visual senses. Excited to explore this fascinating intersection!",
    userId: "624a4a94c66738f13854b474", // Amira
    postId: "624a6a677c8d9c9f5fd5eb5e",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb9f",
    content:
      "Music has the power to inspire imagery and evoke emotions, creating a symbiotic relationship between sound and sight. Can't wait to explore this dynamic connection!",
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    postId: "624a6a677c8d9c9f5fd5eb5e",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eba0",
    content:
      "Well said, Amira! The collaboration between music and visual arts opens up endless possibilities for creative expression and sensory exploration.",
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5eb9e",
  },
  {
    _id: "624a6a677c8d9c9f5fd5eba1",
    content:
      "Poetry has a unique ability to capture the essence of human experiences and emotions, inviting readers on a profound journey through the beauty of language.",
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    postId: "624a6a677c8d9c9f5fd5eb5f",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eba2",
    content:
      "Poetry serves as a vessel for introspection and reflection, allowing us to explore the depths of our thoughts and emotions through the power of words.",
    userId: "624a4fbf3f392aefdb4dd1c8", // Farouq
    postId: "624a6a677c8d9c9f5fd5eb5f",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eba3",
    content:
      "Absolutely, Abdullah! Poetry has a timeless allure that resonates with people across cultures and generations, offering solace and inspiration in equal measure.",
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5eba1",
  },
  {
    _id: "624a4914062642bd2fa6e586",
    content:
      "Photography has a unique way of freezing moments in time, allowing us to revisit memories and emotions with each captured image. Looking forward to this showcase!",
    userId: "624a4a94c66738f13854b474", // Amira
    postId: "624a6a677c8d9c9f5fd5eb60",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a49097e14fbfa14e5b5b5",
    content:
      "Each photograph has its own story to tell, encapsulating a moment, an emotion, or a perspective that resonates with the viewer. Can't wait to be inspired by these snapshots of life!",
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    postId: "624a6a677c8d9c9f5fd5eb60",
    parentCommentId: null,
  },
  {
    _id: "624a6962a85ed5a6d6ca9374",
    content:
      "Absolutely, Amira! Photography has the power to preserve fleeting moments and evoke a wide range of emotions through visual storytelling.",
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    postId: null,
    parentCommentId: "624a4914062642bd2fa6e586",
  },
  {
    _id: "624a6962a85ed5a6d6ca9373",
    content:
      "Music has the power to transport us to different realms, stirring emotions and igniting our imagination. Excited to experience these harmonious masterpieces!",
    userId: "624a4fbf3f392aefdb4dd1c8", // Farouq
    postId: "624a6a677c8d9c9f5fd5eb61",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a48fc091dc5e9ef70605e",
    content:
      "Musical compositions have a magical quality that transcends language and culture, speaking directly to the soul. Looking forward to this enchanting journey through musical creativity!",
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    postId: "624a6a677c8d9c9f5fd5eb61",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ebba",
    content:
      "Well said, Farouq! Music has a universal language that speaks to the depths of our being, evoking emotions and memories in ways words cannot express.",
    userId: "624a6a677c8d9c9f5fd5eb0c", // Mimo
    postId: null,
    parentCommentId: "624a6962a85ed5a6d6ca9373",
  },
  {
    _id: "624a6a677c8d9c9f5fd5ebb4",
    content:
      "Sculpture has a unique ability to transform raw materials into captivating works of art, each piece embodying the artist's vision and creativity. Can't wait to explore this showcase!",
    userId: "624a4a94c66738f13854b474", // Amira
    postId: "624a6a677c8d9c9f5fd5eb62",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ebc1",
    content:
      "Sculpture is a testament to human creativity and ingenuity, transforming ordinary materials into extraordinary works of art that inspire and captivate. Excited to witness these creations!",
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    postId: "624a6a677c8d9c9f5fd5eb62",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ebe1",
    content:
      "Indeed, Amira! Sculpture allows artists to give form to their imagination, creating tangible expressions of beauty and meaning that resonate with viewers.",
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5ebb4",
  },
  {
    _id: "624a6962a85ed5a6d6ca9375",
    content:
      "Digital art opens up endless possibilities for creativity, merging imagination with technology to create stunning visual experiences. Looking forward to this showcase!",
    userId: "624a4a94c66738f13854b474", // Amira
    postId: "624a6a677c8d9c9f5fd5eb63",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a696f57adc725989d2de5",
    content:
      "The fusion of art and technology in digital art is truly mesmerizing. Can't wait to see how artists push the boundaries of creativity in this virtual realm!",
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    postId: "624a6a677c8d9c9f5fd5eb63",
    parentCommentId: null,
  },
  {
    _id: "624a48f7244f88876b5bed2b",
    content:
      "Absolutely, Amira! Digital art offers artists a canvas without limits, where imagination can soar and boundaries are only defined by creativity.",
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    postId: null,
    parentCommentId: "624a6962a85ed5a6d6ca9375",
  },
  {
    _id: "624a697cfa996c1c12f79541",
    content:
      "Abstract art has a way of evoking emotions and sparking imagination by playing with color, form, and texture. Can't wait to be inspired by this exploration!",
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    postId: "624a6a677c8d9c9f5fd5eb64",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a48f143bd949036986953",
    content:
      "Abstract art challenges us to see beyond the tangible, inviting interpretation and introspection. Looking forward to this journey through color and form!",
    userId: "624a4fbf3f392aefdb4dd1c8", // Farouq
    postId: "624a6a677c8d9c9f5fd5eb64",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ebb0",
    content:
      "Well said, Abdullah! Abstract art encourages viewers to explore their own perceptions and feelings, creating a deeply personal connection with each piece.",
    userId: "624a6a677c8d9c9f5fd5eb0c", // Mimo
    postId: null,
    parentCommentId: "624a697cfa996c1c12f79541",
  },
  {
    _id: "624a4052e28fb9d9c024671a",
    content:
      "Impressionist art has a unique way of capturing the essence of a moment, using light and color to evoke emotions and memories. Excited to experience these captivating scenes!",
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    postId: "624a6a677c8d9c9f5fd5eb65",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ebb1",
    content:
      "Impressionist paintings have a dreamlike quality that transports viewers to another time and place, inviting them to immerse themselves in the beauty of fleeting moments. Can't wait to be enchanted by these artworks!",
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    postId: "624a6a677c8d9c9f5fd5eb65",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ebb5",
    content:
      "Absolutely, Galal! Impressionist painters have a remarkable ability to capture the fleeting beauty of everyday life, infusing their scenes with a sense of timelessness and nostalgia.",
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    postId: null,
    parentCommentId: "624a4052e28fb9d9c024671a",
  },
  {
    _id: "624a6a677c8d9c9f5fd5ebe4",
    content:
      "Expressive artistry truly captures the essence of human emotions. Each stroke on the canvas feels like a window into the artist's soul, inviting us to connect on a deeply emotional level.",
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    postId: "624a6a677c8d9c9f5fd5eb5d",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ebf1",
    content:
      "I couldn't agree more! There's something incredibly powerful about art that evokes raw emotions. It's like experiencing a piece of the artist's heart and mind.",
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    postId: "624a6a677c8d9c9f5fd5eb5d",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ebd1",
    content:
      "Absolutely! It's amazing how art has the ability to transcend language and communicate emotions universally. That's the beauty of expressive artistry.",
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5ebe4",
  },
  {
    _id: "624a6a677c8d9c9f5fd5efc2",
    content:
      "Mindfulness in motion is such a beautiful concept. It's about being fully present in every moment, allowing ourselves to experience life with a heightened sense of awareness and gratitude.",
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    postId: "624a6a677c8d9c9f5fd5eb6d",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ebf7",
    content:
      "Absolutely! When we embrace the present moment, we open ourselves up to a deeper connection with ourselves and the world around us. Mindfulness in motion is a powerful practice.",
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    postId: "624a6a677c8d9c9f5fd5eb6d",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ebf6",
    content:
      "It's amazing how simple movements, like walking or breathing, can become profound sources of peace and serenity when done mindfully. Mindfulness in motion truly transforms the ordinary into the extraordinary.",
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5efc2",
  },
  {
    _id: "624a6a677c8d9c9f5fd5ebf8",
    content:
      "Mindful living is all about cultivating a deep sense of awareness and compassion in everything we do. It's about nurturing our inner selves while also fostering connection and empathy with others.",
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    postId: "624a6a677c8d9c9f5fd5eb6e",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ec73",
    content:
      "Absolutely! When we prioritize self-awareness and well-being, we not only enrich our own lives but also create ripple effects of positivity and kindness in the world around us. Mindful living is a gift we give to ourselves and others.",
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    postId: "624a6a677c8d9c9f5fd5eb6e",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ebf3",
    content:
      "Mindful living is about finding harmony within ourselves and with the world. It's a journey of self-discovery and growth, where every moment becomes an opportunity for deeper connection and understanding.",
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5ebf8",
  },
  {
    _id: "624a6a677c8d9c9f5fd5ec77",
    content:
      "Stress management techniques are invaluable tools for navigating the complexities of modern life. By cultivating resilience and inner strength, we empower ourselves to face challenges with grace and composure.",
    userId: "624a6a677c8d9c9f5fd5eb0d", // Basem
    postId: "624a6a677c8d9c9f5fd5eb6f",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ecc7",
    content:
      "Absolutely! In a world filled with constant stressors, it's essential to have effective strategies for maintaining our well-being and mental health. Stress management techniques provide us with the tools to thrive, even in the face of adversity.",
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    postId: "624a6a677c8d9c9f5fd5eb6f",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5efc7",
    content:
      "Indeed! Stress management is not just about coping with stress; it's also about building resilience and fostering a sense of balance and well-being in our lives. These techniques empower us to live more fully and authentically.",
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5ec77",
  },
  {
    _id: "624a6a677c8d9c9f5fd5ecc4",
    content:
      "Cognitive biases are fascinating yet often overlooked aspects of human psychology. They shape our perceptions and decisions in subtle ways, influencing how we interpret information and interact with the world.",
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    postId: "624a6a677c8d9c9f5fd5eb73",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ecc1",
    content:
      "Absolutely! Understanding cognitive biases is crucial for improving critical thinking skills and decision-making abilities. By becoming aware of these biases, we can mitigate their effects and make more informed choices.",
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    postId: "624a6a677c8d9c9f5fd5eb73",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ecc6",
    content:
      "Cognitive biases are like optical illusions of the mind, distorting our perception of reality without us even realizing it. Exploring these biases can lead to greater self-awareness and insight into our thought processes.",
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5ecc4",
  },
  {
    _id: "624a6a677c8d9c9f5fd5efc9",
    content:
      "Positive psychology offers a refreshing perspective on mental health and well-being, focusing on strengths and virtues rather than weaknesses and pathology. It's a paradigm shift that empowers individuals to lead happier and more fulfilling lives.",
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    postId: "624a6a677c8d9c9f5fd5eb74",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eca0",
    content:
      "Absolutely! Positive psychology teaches us that happiness and well-being are not mere byproducts of success or external circumstances but are skills that can be cultivated and nurtured through intentional practices and habits.",
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    postId: "624a6a677c8d9c9f5fd5eb74",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5e008",
    content:
      "Positive psychology reminds us that our mindset and attitude play a significant role in shaping our experiences and overall well-being. By adopting a positive outlook and focusing on our strengths, we can transform our lives in profound ways.",
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5efc9",
  },
  {
    _id: "624a6a677c8d9c9f5fd5eca3",
    content:
      "Psychological resilience is like a muscle that grows stronger with each challenge we overcome. It's about bouncing back from adversity with newfound strength and wisdom, ready to face whatever life throws our way.",
    userId: "624a6a677c8d9c9f5fd5eb0d", // Basem
    postId: "624a6a677c8d9c9f5fd5eb75",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ecb1",
    content:
      "Indeed! Psychological resilience is not just about surviving tough times; it's also about thriving in spite of them. It's a testament to the human spirit's capacity for growth, adaptation, and renewal.",
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    postId: "624a6a677c8d9c9f5fd5eb75",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eca6",
    content:
      "Psychological resilience is the foundation upon which we build our capacity to navigate life's challenges and emerge stronger on the other side. It's a testament to the human spirit's resilience and ability to find meaning and purpose in adversity.",
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5eca3",
  },
  {
    _id: "624a6a677c8d9c9f5fd5eca7",
    content:
      "Adventure travel stories are like windows into the soul of a destination, offering glimpses of its beauty, challenges, and the indelible memories forged along the way. Can't wait to embark on a journey through these tales!",
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    postId: "624a6a677c8d9c9f5fd5eb79",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ecd0",
    content:
      "Absolutely! Adventure travel stories remind us of the boundless wonders waiting to be discovered beyond our comfort zones. Each story is a testament to the human spirit's thirst for exploration and discovery.",
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    postId: "624a6a677c8d9c9f5fd5eb79",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ecb9",
    content:
      "Adventure travel stories ignite the imagination and inspire wanderlust, reminding us that the world is full of extraordinary experiences waiting to be had. Can't wait to dive into these tales of thrills and exploration!",
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5eca7",
  },
  {
    _id: "624a6a677c8d9c9f5fd5ecf1",
    content:
      "Cultural immersion experiences offer a profound opportunity to connect with people, places, and traditions in meaningful ways, fostering empathy, understanding, and appreciation for diversity.",
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    postId: "624a6a677c8d9c9f5fd5eb7a",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ece1",
    content:
      "Absolutely! Cultural immersion experiences enrich our lives by exposing us to new perspectives, traditions, and ways of life. They remind us of the beauty of diversity and the universal values that connect us as human beings.",
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    postId: "624a6a677c8d9c9f5fd5eb7a",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ece3",
    content:
      "Cultural immersion experiences are transformative journeys that open our hearts and minds to the richness and complexity of the world. Each encounter leaves an indelible mark, fostering empathy, curiosity, and respect for cultural diversity.",
    userId: "624a6a677c8d9c9f5fd5eb0d", // Basem
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5ecf1",
  },
  {
    _id: "624a6a677c8d9c9f5fd5efb6",
    content:
      "Hiking trails are nature's playgrounds, offering endless opportunities for exploration, adventure, and discovery. Each trail is a journey waiting to unfold, with breathtaking views and hidden wonders along the way.",
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    postId: "624a6a677c8d9c9f5fd5eb7b",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ece6",
    content:
      "Absolutely! Hiking trails are pathways to serenity and inspiration, offering solace in nature's embrace and opportunities for introspection and renewal. Can't wait to discover new trails and immerse myself in the beauty of the great outdoors!",
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    postId: "624a6a677c8d9c9f5fd5eb7b",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eda2",
    content:
      "Hiking trails are like portals to another world, where every step brings us closer to the heart of nature and the essence of our being. They remind us of our connection to the Earth and the importance of preserving its beauty for future generations.",
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5efb6",
  },
  {
    _id: "624a6a677c8d9c9f5fd5eda1",
    content:
      "Road trip chronicles are like pages torn from the diary of adventure, each journey a chapter filled with freedom, discovery, and the open road stretching out before us. Can't wait to share in the thrill of these tales!",
    userId: "624a6a677c8d9c9f5fd5eb0d", // Basem
    postId: "624a6a677c8d9c9f5fd5eb7f",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eda5",
    content:
      "Absolutely! Road trips are the ultimate expression of freedom, offering endless possibilities for adventure and exploration. Each journey is a chance to discover new horizons and create lasting memories with friends and loved ones.",
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    postId: "624a6a677c8d9c9f5fd5eb7f",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5efb8",
    content:
      "Road trip chronicles capture the essence of wanderlust, inviting us to hit the open road and chase the horizon in search of adventure, freedom, and the thrill of the unknown. Can't wait to be inspired by these tales of epic journeys!",
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5eda1",
  },
  {
    _id: "624a6a677c8d9c9f5fd5eda8",
    content:
      "Global gastronomy is a feast for the senses, offering a tantalizing array of flavors, aromas, and textures from every corner of the globe. Can't wait to embark on a culinary journey around the world!",
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    postId: "624a6a677c8d9c9f5fd5eb80",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5edc1",
    content:
      "Absolutely! Global gastronomy celebrates the diversity of cultures through the language of food, inviting us to savor the world's culinary treasures and explore new tastes and traditions. Each dish is a journey in itself, a delicious adventure waiting to be savored.",
    userId: "624a6a677c8d9c9f5fd5eb0d", // Basem
    postId: "624a6a677c8d9c9f5fd5eb80",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5edb1",
    content:
      "Global gastronomy is a testament to the richness and diversity of our world, with each dish telling a story of tradition, culture, and culinary craftsmanship. Can't wait to explore the flavors of different cultures and indulge in gastronomic delights!",
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5eda8",
  },
  {
    _id: "624a6a677c8d9c9f5fd5efbb",
    content:
      "Foodie adventures are like treasure hunts for the palate, each bite a discovery of exotic flavors, local delicacies, and culinary secrets waiting to be uncovered. Can't wait to embark on a gastronomic journey around the globe!",
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    postId: "624a6a677c8d9c9f5fd5eb81",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5edc6",
    content:
      "Absolutely! Foodie adventures offer a passport to the world's culinary wonders, inviting us to explore different cultures through their cuisine and savor the unique flavors that make each region special. Can't wait to share in the culinary discoveries of fellow food enthusiasts!",
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    postId: "624a6a677c8d9c9f5fd5eb81",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5edc4",
    content:
      "Foodie adventures are a journey of the senses, a celebration of flavor, aroma, and texture that transcends borders and cultures. Each culinary discovery is an opportunity to connect with people and traditions through the universal language of food.",
    userId: "624a6a677c8d9c9f5fd5eb0d", // Basem
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5efbb",
  },
  {
    _id: "624a6a677c8d9c9f5fd5edc8",
    content:
      "Farm-to-table chronicles are a celebration of sustainability and conscious eating, highlighting the importance of supporting local farmers, reducing food waste, and embracing eco-friendly food practices. Can't wait to dive into discussions about how we can all contribute to a healthier planet!",
    userId: "624a6a677c8d9c9f5fd5eb0d", // Basem
    postId: "624a6a677c8d9c9f5fd5eb84",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5edd1",
    content:
      "Absolutely! Farm-to-table movements empower us to make informed choices about what we eat, connecting us with the origins of our food and the farmers who work tirelessly to nourish our communities. Can't wait to learn more about sustainable food practices and how we can make a positive impact!",
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    postId: "624a6a677c8d9c9f5fd5eb84",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5edf1",
    content:
      "Farm-to-table chronicles offer a glimpse into a world where every meal is a testament to sustainability, ethical farming practices, and the beauty of locally sourced ingredients. Can't wait to explore ways to incorporate eco-friendly eating habits into my culinary journey!",
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5edc8",
  },
  {
    _id: "624a6a677c8d9c9f5fd5edd8",
    content:
      "Exploring exotic flavors is like embarking on a culinary odyssey, each dish a passport to distant lands and cultural treasures waiting to be discovered. Can't wait to share in the excitement of tasting unique and gourmet cuisines!",
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    postId: "624a6a677c8d9c9f5fd5eb85",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5edd4",
    content:
      "Absolutely! Exploring exotic flavors allows us to expand our culinary horizons, challenging our palates and opening our minds to new tastes and sensations. Can't wait to hear about the gourmet adventures of fellow food enthusiasts!",
    userId: "624a6a677c8d9c9f5fd5eb0d", // Basem
    postId: "624a6a677c8d9c9f5fd5eb85",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5edf6",
    content:
      "Embarking on a culinary journey through gourmet cuisine is like embarking on a treasure hunt for the palate, each dish a discovery of new and exciting flavors waiting to be savored. Can't wait to share in the gastronomic delights of fellow food adventurers!",
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5edd8",
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb9a",
    content:
      "Gourmet travel diaries are like love letters to the culinary world, each page filled with tantalizing tales of Michelin-starred restaurants, exotic flavors, and unforgettable dining experiences. Can't wait to be inspired by the gourmet adventures of fellow travelers!",
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    postId: "624a6a677c8d9c9f5fd5eb86",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a49117e14fbfa14e5b5b7",
    content:
      "Absolutely! Gourmet travel diaries offer a window into the world of fine dining and culinary excellence, allowing us to savor the flavors of different cultures and indulge in unforgettable gastronomic experiences. Can't wait to hear about the culinary discoveries of fellow food enthusiasts!",
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    postId: "624a6a677c8d9c9f5fd5eb86",
    parentCommentId: null,
  },
  {
    _id: "624a4906062642bd2fa6e585",
    content:
      "Gourmet travel diaries are a testament to the joys of culinary exploration, offering a tantalizing glimpse into the world of Michelin-starred restaurants and epicurean adventures. Can't wait to embark on a journey through the finest dining experiences!",
    userId: "624a6a677c8d9c9f5fd5eb0d", // Basem
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5eb9a",
  },
  {
    _id: "624a6962a85ed5a6d6ca9376",
    content:
      "Culinary experiments are like adventures in the kitchen, each dish a canvas for creativity and innovation, waiting to be explored and savored. Can't wait to see the culinary creations that fellow food enthusiasts unleash!",
    userId: "624a6a677c8d9c9f5fd5eb0d", // Basem
    postId: "624a6a677c8d9c9f5fd5eb89",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624b88a4b51501b30d71386e",
    content:
      "Absolutely! Culinary experiments allow us to break free from culinary conventions, encouraging us to think outside the box and push the boundaries of traditional cuisine. Can't wait to share in the excitement of culinary creativity!",
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    postId: "624a6a677c8d9c9f5fd5eb89",
    parentCommentId: null,
  },
  {
    _id: "624a6598ce588b8cd1e84f6f",
    content:
      "Culinary experiments are a celebration of creativity and innovation in the kitchen, offering endless possibilities for culinary exploration and discovery. Can't wait to be inspired by the culinary creations of fellow food enthusiasts!",
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    postId: null,
    parentCommentId: "624a6962a85ed5a6d6ca9376",
  },
  {
    _id: "624a6a677c8d9c9f5fd5ebb2",
    content:
      "Unraveling pop culture mysteries is like diving into a treasure trove of internet phenomena, each meme a clue to understanding the zeitgeist of today's digital age. Can't wait to explore the significance of internet memes with fellow pop culture enthusiasts!",
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    postId: "624a6a677c8d9c9f5fd5eb8a",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ebb6",
    content:
      "Absolutely! Internet memes have become a cultural phenomenon, shaping our online interactions and reflecting the humor, trends, and social commentary of contemporary society. Can't wait to delve into discussions about the evolution and impact of internet memes!",
    userId: "624a6a677c8d9c9f5fd5eb0d", // Basem
    postId: "624a6a677c8d9c9f5fd5eb8a",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ebc2",
    content:
      "The significance of internet memes is a fascinating topic that offers insights into the collective consciousness and cultural trends of our digital era. Can't wait to unravel the mysteries of internet memes with fellow pop culture enthusiasts!",
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5ebb2",
  },
  {
    _id: "624a6a677c8d9c9f5fd5ebe2",
    content:
      "Exploring the evolution of pop music is like taking a journey through time, each song a snapshot of a different era in musical history. Can't wait to dive into discussions about the classics and modern hits that define pop music!",
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    postId: "624a6a677c8d9c9f5fd5eb8b",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5edf7",
    content:
      "Absolutely! The evolution of pop music reflects the cultural shifts and musical innovations of each era, from the timeless classics that shaped generations to the contemporary hits that dominate the charts. Can't wait to explore the diverse and dynamic world of pop music!",
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    postId: "624a6a677c8d9c9f5fd5eb8b",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5edf8",
    content:
      "The evolution of pop music is a testament to the ever-changing landscape of popular culture, reflecting the tastes, trends, and influences of each generation. Can't wait to discuss the musical journey from classics to modern hits with fellow pop culture enthusiasts!",
    userId: "624a6a677c8d9c9f5fd5eb0d", // Basem
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5ebe2",
  },
  {
    _id: "624a6a677c8d9c9f5fd5eba6",
    content:
      "The influence of pop culture is profound, shaping our perceptions, preferences, and even our identities in subtle yet significant ways. Can't wait to explore the diverse and dynamic landscape of pop culture with fellow enthusiasts!",
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    postId: "624a6a677c8d9c9f5fd5eb8e",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eba7",
    content:
      "Absolutely! Pop culture is a reflection of our collective consciousness, influencing everything from fashion and entertainment to social norms and values. Can't wait to delve into discussions about the ever-evolving world of pop culture!",
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    postId: "624a6a677c8d9c9f5fd5eb8e",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eba8",
    content:
      "The influence of pop culture extends far beyond entertainment, shaping our language, beliefs, and societal trends. Can't wait to explore the multifaceted impact of pop culture with fellow enthusiasts!",
    userId: "624a6a677c8d9c9f5fd5eb0d", // Basem
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5eba6",
  },
  {
    _id: "624a6a677c8d9c9f5fd5eba9",
    content:
      "Classic Hollywood gems are timeless treasures that continue to captivate audiences with their iconic performances, captivating stories, and cinematic brilliance. Can't wait to discover new favorites and revisit beloved classics with fellow movie buffs!",
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    postId: "624a6a677c8d9c9f5fd5eb8f",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ebaa",
    content:
      "Absolutely! Classic Hollywood films represent a golden era of cinema, featuring timeless stories and unforgettable performances that continue to resonate with audiences today. Can't wait to share the magic of classic Hollywood gems with fellow movie enthusiasts!",
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    postId: "624a6a677c8d9c9f5fd5eb8f",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ebab",
    content:
      "Classic Hollywood gems are like windows into the past, offering a glimpse into the glamour, romance, and intrigue of a bygone era. Can't wait to embark on a cinematic journey through the golden age of Hollywood with fellow movie buffs!",
    userId: "624a6a677c8d9c9f5fd5eb0d", // Basem
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5eba9",
  },
  {
    _id: "624a6a677c8d9c9f5fd5ebac",
    content:
      "Hidden movie gems are like buried treasures waiting to be discovered, each film a hidden gem of storytelling and craftsmanship. Can't wait to uncover cinematic treasures and share underrated gems with fellow movie enthusiasts!",
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    postId: "624a6a677c8d9c9f5fd5eb90",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ebad",
    content:
      "Absolutely! Hidden movie gems often provide unique and refreshing storytelling experiences, offering a glimpse into lesser-known films that deserve more recognition. Can't wait to explore underrated cinematic treasures with fellow movie buffs!",
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    postId: "624a6a677c8d9c9f5fd5eb90",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ebae",
    content:
      "Hidden movie gems are like hidden treasures waiting to be unearthed, each film offering a unique and unforgettable cinematic experience. Can't wait to share underrated favorites and discover hidden gems with fellow movie enthusiasts!",
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5ebac",
  },
  {
    _id: "624a6a677c8d9c9f5fd5efaa",
    content:
      "Cinematic legends have left an indelible mark on the world of film, their visionary works inspiring generations of movie lovers and shaping the very fabric of cinema. Can't wait to celebrate the greatest filmmakers of all time with fellow movie buffs!",
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    postId: "624a6a677c8d9c9f5fd5eb92",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5edf2",
    content:
      "Absolutely! Cinematic legends have left an indelible legacy, their groundbreaking films continuing to inspire and influence filmmakers and audiences alike. Can't wait to pay tribute to these visionary talents with fellow movie enthusiasts!",
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    postId: "624a6a677c8d9c9f5fd5eb92",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5edd9",
    content:
      "Cinematic legends have shaped the very essence of storytelling on the silver screen, their visionary works serving as a testament to the power of imagination and creativity. Can't wait to celebrate their contributions with fellow movie buffs!",
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5efaa",
  },
  {
    _id: "624a6a677c8d9c9f5fd5edd5",
    content:
      "Planning the ultimate film fest is a movie lover's dream come true! From classic marathons to themed events, there's something magical about sharing unforgettable cinematic experiences with friends and family. Can't wait to swap movie marathon tips and ideas with fellow movie buffs!",
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    postId: "624a6a677c8d9c9f5fd5eb93",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb99",
    content:
      "Absolutely! Movie marathons are the perfect way to bond with friends and family over shared cinematic experiences, creating memories that last a lifetime. Can't wait to exchange movie marathon ideas and recommendations with fellow movie enthusiasts!",
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    postId: "624a6a677c8d9c9f5fd5eb93",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5edf3",
    content:
      "Movie marathon madness is all about creating unforgettable memories with loved ones, immersing ourselves in the magic of cinema, one film at a time. Can't wait to plan the ultimate film fest with fellow movie buffs!",
    userId: "624a6a677c8d9c9f5fd5eb0d", // Basem
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5edd5",
  },
  {
    _id: "624a490d7e14fbfa14e5b5b6",
    content:
      "Music has a unique ability to capture the essence of our experiences, with certain songs becoming the soundtrack of our lives, accompanying us through every moment and memory. Can't wait to share my musical journey and discover new favorites with fellow music enthusiasts!",
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    postId: "624a6a677c8d9c9f5fd5eb94",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a49017e14fbfa14e5b5b4",
    content:
      "Absolutely! Music has a way of touching our hearts and souls, with certain songs serving as the soundtrack to our most cherished memories. Can't wait to share my musical journey and explore the diverse world of music with fellow enthusiasts!",
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    postId: "624a6a677c8d9c9f5fd5eb94",
    parentCommentId: null,
  },
  {
    _id: "624a6962a85ed5a6d6ca937a",
    content:
      "Music has the power to evoke emotions, stir memories, and create connections across time and space. Can't wait to share my favorite songs and discover new musical treasures with fellow music lovers!",
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    postId: null,
    parentCommentId: "624a490d7e14fbfa14e5b5b6",
  },
  {
    _id: "624b88a4b51501b30d71386f",
    content:
      "Live concerts and music festivals are where unforgettable memories are made, from the electrifying energy of the crowd to the soul-stirring performances on stage. Can't wait to share my concert chronicles and relive those magical moments with fellow music enthusiasts!",
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    postId: "624a6a677c8d9c9f5fd5eb96",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6956a807a4016790d545",
    content:
      "Absolutely! Concerts and music festivals create unforgettable memories and foster connections with fellow music lovers. Can't wait to share my concert chronicles and relive those epic moments with the community!",
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    postId: "624a6a677c8d9c9f5fd5eb96",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ebb3",
    content:
      "Live concerts and music festivals are where the magic of music truly comes alive, with each moment creating cherished memories that last a lifetime. Can't wait to share my concert chronicles and relive those special experiences with fellow music enthusiasts!",
    userId: "624a6a677c8d9c9f5fd5eb0d", // Basem
    postId: null,
    parentCommentId: "624b88a4b51501b30d71386f",
  },
  {
    _id: "624a6a677c8d9c9f5fd5ebb7",
    content:
      "Iconic albums have the power to transcend time and resonate with listeners across generations, shaping the landscape of music and leaving an indelible mark on musical history. Can't wait to discuss legendary albums and their enduring influence with fellow music enthusiasts!",
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    postId: "624a6a677c8d9c9f5fd5eb97",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ebc3",
    content:
      "Absolutely! Iconic albums have stood the test of time, their influence shaping the very fabric of music culture and inspiring countless artists and listeners. Can't wait to delve into discussions about legendary albums with fellow music enthusiasts!",
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    postId: "624a6a677c8d9c9f5fd5eb97",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5ebe3",
    content:
      "Legendary albums are timeless treasures that continue to captivate audiences and influence the music industry, their impact transcending generations. Can't wait to share my favorite musical masterpieces and discover new classics with fellow music lovers!",
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5ebb8",
  },
  {
    _id: "624a6a677c8d9c9f5fd5eba4",
    content:
      "Serendipitous encounters with music often lead to profound connections and discoveries, reminding us of the universal language that music speaks. Can't wait to share my musical encounters and hear the stories of fellow music enthusiasts!",
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    postId: "624a6a677c8d9c9f5fd5eb98",
    parentCommentId: null,
    repliesCount: 1,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eba5",
    content:
      "Absolutely! Serendipitous encounters with music have a way of enriching our lives and broadening our musical horizons, often leading to unexpected discoveries and cherished favorites. Can't wait to share my musical journey and hear about others' serendipitous encounters!",
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    postId: "624a6a677c8d9c9f5fd5eb98",
    parentCommentId: null,
  },
  {
    _id: "624a6a677c8d9c9f5fd5edf9",
    content:
      "Serendipitous encounters with music are like finding hidden treasures that enrich our lives and ignite our passion for music. Can't wait to share my musical discoveries and exchange stories with fellow music enthusiasts!",
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    postId: null,
    parentCommentId: "624a6a677c8d9c9f5fd5eba4",
  },
];

exports.data = commentSeedData;
