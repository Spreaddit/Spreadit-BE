const postSeedData = [
  {
    _id: "624a6a677c8d9c9f5fd5eb3e",
    title: "Introduction to Python Programming",
    content: [
      "Learn the basics of Python programming with this introductory tutorial!",
    ],
    userId: "624a4a94c66738f13854b474", // Amira
    community: "CodeCrafters", // CodeCrafters
    type: "Post",
    isNsfw: false,
    commentsCount: 2,
    comments: ["624a6a677c8d9c9f5fd5efcc", "624a6a677c8d9c9f5fd5ecff"],
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb3f",
    title: "Data Structures in C++",
    content: [
      "In your opinion, what is the most challenging topic in data structures?",
    ],
    userId: "624a4a94c66738f13854b474", // Amira
    community: "CodeCrafters", // CodeCrafters
    type: "Poll",
    isNsfw: false,
    pollOptions: [
      { option: "Linked List", votes: 0 },
      { option: "Stack", votes: 0 },
      { option: "Trees", votes: 0 },
    ],
    pollVotingLength: "7 Days",
    commentsCount: 2,
    comments: ["624a6a677c8d9c9f5fd5e000", "624a6a677c8d9c9f5fd5e001"],
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb41",
    title: "Web Development Crash Course",
    userId: "624a52d75ff69df002d25035", // Mahmoud
    community: "CodeCrafters", // CodeCrafters
    type: "Link",
    isNsfw: false,
    link: "https://bootcamp.uxdesign.cc/web-development-crash-course-a-step-by-step-guide-to-the-basics-with-free-learning-resources-3d0f93b1b02d",
    commentsCount: 2,
    comments: ["624a6a677c8d9c9f5fd5e002", "624a6a677c8d9c9f5fd5eb40"],
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb42",
    title: "Machine Learning Fundamentals",
    content: [
      "Learn the fundamentals of machine learning, including algorithms, models, and applications.",
    ],
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    community: "CodeCrafters", // CodeCrafters
    commentsCount: 2,
    comments: ["624a6a677c8d9c9f5fd5efe8", "624a6a677c8d9c9f5fd5efe1"],
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb43",
    title: "Debugging Tips and Tricks",
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    community: "CodeCrafters", // CodeCrafters
    type: "Images & Video",
    isNsfw: false,
    comments: ["624a6a677c8d9c9f5fd5efe4", "624a6a677c8d9c9f5fd5efe5"],
    commentsCount: 2,
    fileType: "image",
    attachments: [
      {
        type: "image",
        link: "https://res.cloudinary.com/dkkhtb4za/image/upload/v1713805076/uploads/attachments-1713805073879.jpg.jpg",
      },
      {
        type: "image",
        link: "https://res.cloudinary.com/dkkhtb4za/image/upload/v1713805078/uploads/attachments-1713805073880.png.png",
      },
    ],
  },

  {
    _id: "624a6a677c8d9c9f5fd5eb44",
    title: "The Future of Artificial Intelligence",
    userId: "624a52d75ff69df002d25035", // Mahmoud
    community: "TechTalks", // TechTalks
    comments: [],
    type: "Images & Video",
    isNsfw: false,
    fileType: "video",
    attachments: [
      {
        type: "video",
        link: "https://res.cloudinary.com/dkkhtb4za/video/upload/v1713805715/uploads/attachments-1713805592367.mp4.mp4",
      },
    ],
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb45",
    title: "Blockchain Technology Explained",
    content: [
      "Learn about the fundamentals of blockchain technology and its potential applications.",
    ],
    userId: "624a4fbf3f392aefdb4dd1c8", // Farouq
    community: "TechTalks", // TechTalks
    comments: ["624a6a677c8d9c9f5fd5efe7", "624a6a677c8d9c9f5fd5e007"],
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb46",
    title: "Cybersecurity Best Practices",
    content: [
      "Discover essential cybersecurity best practices to protect your online identity and data.",
    ],
    userId: "624a4a94c66738f13854b474", // Amira
    community: "TechTalks", // TechTalks
    comments: ["624a6a677c8d9c9f5fd5eff0", "624a6a677c8d9c9f5fd5eff1"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb47",
    title: "Cloud Computing Trends",
    content: [
      "Explore the latest trends and innovations in cloud computing technologies.",
    ],
    userId: "624a4a94c66738f13854b474", // Amira
    community: "TechTalks", // TechTalks
    comments: ["624a6a677c8d9c9f5fd5eff2", "624a6a677c8d9c9f5fd5eff3"],
    commentsCount: 2,
    type: "Poll",
    isNsfw: false,
    pollOptions: [
      { option: "Hybrid Cloud", votes: 0 },
      { option: "Multi-cloud", votes: 0 },
      { option: "Serverless Computing", votes: 0 },
      { option: "Edge Computing", votes: 0 },
    ],
    pollVotingLength: "2 Days",
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb48",
    title: "Tech Gadgets Showcase",
    content: [
      "Share your favorite tech gadgets and accessories and discuss the latest innovations in consumer electronics.",
    ],
    userId: "624a52d75ff69df002d25035", // Mahmoud
    community: "TechTalks", // TechTalks
    comments: ["624a6a677c8d9c9f5fd5eff5", "624a6a677c8d9c9f5fd5eff6"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },

  {
    _id: "624a6a677c8d9c9f5fd5eb49",
    title: "JavaScript Frameworks Comparison",
    content: [
      "Discuss the pros and cons of popular JavaScript frameworks like React, Angular, and Vue.js.",
    ],
    userId: "624a52d75ff69df002d25035", // Mahmoud
    community: "CodeGeeks", // CodeGeeks
    comments: ["624a6a677c8d9c9f5fd5eff8", "624a6a677c8d9c9f5fd5eff9"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb4a",
    title: "Python vs. Java: Which is Better?",
    userId: "624a4a94c66738f13854b474", // Amira
    community: "CodeGeeks", // CodeGeeks
    comments: ["624a6a677c8d9c9f5fd5efa1", "624a6a677c8d9c9f5fd5efa2"],
    commentsCount: 2,
    type: "Link",
    isNsfw: false,
    link: "https://www.linkedin.com/pulse/java-vs-python-which-best-programming-language/",
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb4b",
    title: "GitHub Collaboration Tips",
    content: [
      "Learn effective strategies for collaborating on projects using GitHub and maximizing team productivity.",
    ],
    userId: "624a4fbf3f392aefdb4dd1c8", // Farouq
    community: "CodeGeeks", // CodeGeeks
    comments: ["624a6a677c8d9c9f5fd5efa4", "624a6a677c8d9c9f5fd5efa5"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb4c",
    title: "Data Structures and Algorithms Masterclass",
    content: [
      "Join our masterclass series to learn advanced data structures and algorithms techniques from industry experts.",
    ],
    userId: "624a52d75ff69df002d25035", // Mahmoud
    community: "CodeGeeks", // CodeGeeks
    comments: ["624a6a677c8d9c9f5fd5efa7", "624a6a677c8d9c9f5fd5efa8"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb4d",
    title: "Web Development Bootcamp Recommendations",
    content: [
      "Share your favorite web development bootcamps and resources for aspiring developers.",
    ],
    userId: "624a4fbf3f392aefdb4dd1c8", // Farouq
    community: "CodeGeeks", // CodeGeeks
    comments: ["624a6a677c8d9c9f5fd5efc0", "624a6a677c8d9c9f5fd5efc1"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },

  {
    _id: "624a6a677c8d9c9f5fd5eb4e",
    title: "Black Holes: The Enigma of the Cosmos",
    content: [
      "Delve into the mysteries of black holes, their formation, properties, and role in shaping the universe.",
    ],
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    community: "ScienceExplorersClub", // ScienceExplorersClub
    comments: ["624a6a677c8d9c9f5fd5ebf2", "624a6a677c8d9c9f5fd5ebd2"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb4f",
    title: "DNA Sequencing Breakthroughs",
    content: [
      "Explore recent advancements in DNA sequencing technologies and their implications for genetic research and medicine.",
    ],
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    community: "ScienceExplorersClub", // ScienceExplorersClub
    comments: ["624a6a677c8d9c9f5fd5efc3", "624a6a677c8d9c9f5fd5efc4"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb50",
    title: "The Quantum World: Weirdness and Wonders",
    content: [
      "Dive into the bizarre and fascinating realm of quantum mechanics, from superposition and entanglement to quantum computing.",
    ],
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    community: "ScienceExplorersClub", // ScienceExplorersClub
    comments: ["624a6a677c8d9c9f5fd5ec74", "624a6a677c8d9c9f5fd5ebf0"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb51",
    title: "Climate Change: Challenges and Solutions",
    content: [
      "Discuss the latest research on climate change, its impacts on ecosystems and societies, and strategies for mitigation and adaptation.",
    ],
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    community: "ScienceExplorersClub", // ScienceExplorersClub
    comments: ["624a6a677c8d9c9f5fd5efc5", "624a6a677c8d9c9f5fd5ecc0"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb52",
    title: "The Evolutionary Arms Race",
    content: [
      "What is the most significant factor driving the co-evolutionary dynamics between species and their predators?",
    ],
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    community: "ScienceExplorersClub", // ScienceExplorersClub
    comments: ["624a6a677c8d9c9f5fd5ecc2", "624a6a677c8d9c9f5fd5ecc5"],
    commentsCount: 2,
    type: "Poll",
    isNsfw: false,
    pollOptions: [
      { option: "Predator-Prey Coevolution", votes: 0 },
      { option: "Mimicry and Camouflage", votes: 0 },
      { option: "Resource Competition", votes: 0 },
      { option: "Mutualistic Interactions", votes: 0 },
    ],
    pollVotingLength: "5 Days",
  },

  {
    _id: "624a6a677c8d9c9f5fd5eb53",
    title: "Journey to the Edge of the Universe",
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    community: "SpaceAndAstronomyLovers", // Space&AstronomyLovers
    comments: ["624a6a677c8d9c9f5fd5efb0", "624a6a677c8d9c9f5fd5eca1"],
    commentsCount: 2,
    type: "Images & Video",
    isNsfw: false,
    fileType: "image",
    attachments: [
      {
        type: "image",
        link: "https://res.cloudinary.com/dkkhtb4za/image/upload/v1713806755/uploads/attachments-1713806752820.jpg.jpg",
      },
    ],
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb54",
    title: "The Search for Extraterrestrial Life",
    content: [
      "Join the quest for life beyond Earth, from the exploration of Mars and Europa to the study of exoplanets and SETI initiatives.",
    ],
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    community: "SpaceAndAstronomyLovers", // Space&AstronomyLovers
    comments: ["624a6a677c8d9c9f5fd5ecb0", "624a6a677c8d9c9f5fd5eca5"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb55",
    title: "The Beauty of Celestial Phenomena",
    userId: "624a6a677c8d9c9f5fd5eb0c", // Mimo
    community: "SpaceAndAstronomyLovers", // Space&AstronomyLovers
    comments: ["624a6a677c8d9c9f5fd5efb3", "624a6a677c8d9c9f5fd5efb4"],
    commentsCount: 2,
    type: "Images & Video",
    isNsfw: false,
    fileType: "image",
    attachments: [
      {
        type: "image",
        link: "https://res.cloudinary.com/dkkhtb4za/image/upload/v1713807138/uploads/attachments-1713807131548.jpg.jpg",
      },
    ],
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb56",
    title: "Most Interesting Moon of Jupiter",
    content: ["Which moon of Jupiter do you find the most fascinating?"],
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    community: "SpaceAndAstronomyLovers", // Space&AstronomyLovers
    comments: ["624a6a677c8d9c9f5fd5ece0", "624a6a677c8d9c9f5fd5efb5"],
    commentsCount: 2,
    type: "Poll",
    isNsfw: false,
    pollOptions: [
      { option: "Ganymede", votes: 0 },
      { option: "Europa", votes: 0 },
      { option: "Io", votes: 0 },
      { option: "Callisto", votes: 0 },
    ],
    pollVotingLength: "4 Days",
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb57",
    title: "Stargazing Tips and Tricks",
    content: [
      "Learn essential tips for stargazing, including choosing the right telescope, identifying constellations, and observing celestial events.",
    ],
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    community: "SpaceAndAstronomyLovers", // Space&AstronomyLovers
    comments: ["624a6a677c8d9c9f5fd5ece5", "624a6a677c8d9c9f5fd5ece7"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },

  {
    _id: "624a6a677c8d9c9f5fd5eb58",
    title: "The Wonders of Genetic Diversity",
    content: [
      "Explore the fascinating world of genetic diversity and its implications for evolution, adaptation, and conservation.",
    ],
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    community: "BiologyBuffsSociety", // BiologyBuffsSociety
    comments: ["624a6a677c8d9c9f5fd5efb7", "624a6a677c8d9c9f5fd5eda6"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb59",
    title: "Ecology and Biodiversity Conservation",
    content: [
      "Discuss the principles of ecology, ecosystem dynamics, and strategies for biodiversity conservation in the face of environmental challenges.",
    ],
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    community: "BiologyBuffsSociety", // BiologyBuffsSociety
    comments: ["624a6a677c8d9c9f5fd5edc0", "624a6a677c8d9c9f5fd5edc0"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb5a",
    title: "Adaptations in the Animal Kingdom",
    content: [
      "Explore remarkable adaptations in the animal kingdom, from camouflage and mimicry to specialized anatomical features for survival.",
    ],
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    community: "BiologyBuffsSociety", // BiologyBuffsSociety
    comments: ["624a6a677c8d9c9f5fd5edc5", "624a6a677c8d9c9f5fd5edc3"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb5b",
    title: "The Marvels of Marine Biology",
    content: [
      "Dive into the wonders of marine biology, exploring diverse ecosystems, marine organisms, and the importance of ocean conservation.",
    ],
    userId: "624a6a677c8d9c9f5fd5eb0d", // Basem
    community: "BiologyBuffsSociety", // BiologyBuffsSociety
    comments: ["624a6a677c8d9c9f5fd5edd0", "624a6a677c8d9c9f5fd5edd0"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb5c",
    title: "Genomics Revolution: Unraveling the Genetic Code",
    userId: "624a6a677c8d9c9f5fd5eb0c", // Mimo
    community: "BiologyBuffsSociety", // BiologyBuffsSociety
    comments: ["624a6a677c8d9c9f5fd5edd3", "624a6a677c8d9c9f5fd5edf5"],
    commentsCount: 2,
    type: "Link",
    isNsfw: false,
    link: "https://asharibali.medium.com/unraveling-the-genetic-code-genomics-and-bioinformatics-revolutionizing-healthcare-and-beyond-14131b196eb5#:~:text=Genomics%20and%20bioinformatics%20have%20unlocked,susceptibility%2C%20and%20personalized%20treatment%20options.",
  },

  {
    _id: "624a6a677c8d9c9f5fd5eb5d",
    title: "Expressive Artistry: Painting with Emotions",
    content: [
      "Discover the power of expressive artistry as artists paint with raw emotions, capturing the essence of human experiences on canvas.",
    ],
    userId: "624a4fbf3f392aefdb4dd1c8", // Farouq
    community: "CreativeMindsCollective", // CreativeMindsCollective
    comments: [
      "624a6a677c8d9c9f5fd5eb9b",
      "624a6a677c8d9c9f5fd5eb9c",
      "624a6a677c8d9c9f5fd5ebe4",
      "624a6a677c8d9c9f5fd5ebf1",
    ],
    commentsCount: 4,
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb5e",
    title: "Exploring the Intersection of Music and Visual Arts",
    content: [
      "Embark on a creative journey to explore the intersection of music and visual arts, where sound inspires vivid imagery and vice versa.",
    ],
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    community: "CreativeMindsCollective", // CreativeMindsCollective
    comments: ["624a6a677c8d9c9f5fd5eb9e", "624a6a677c8d9c9f5fd5eb9f"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb5f",
    title: "Poetic Reflections: A Journey Through Words",
    content: [
      "Indulge in poetic reflections as writers pen verses that transport readers on a journey through emotions, memories, and dreams.",
    ],
    userId: "624a4a94c66738f13854b474", // Amira
    community: "CreativeMindsCollective", // CreativeMindsCollective
    comments: ["624a6a677c8d9c9f5fd5eba1", "624a6a677c8d9c9f5fd5eba2"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb60",
    title: "Photography Showcase: Capturing Life's Essence",
    content: [
      "Immerse yourself in a photography showcase, where each image captures life's essence, frozen in time to evoke emotions and memories.",
    ],
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    community: "CreativeMindsCollective", // CreativeMindsCollective
    comments: ["624a4914062642bd2fa6e586", "624a49097e14fbfa14e5b5b5"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb61",
    title: "Musical Masterpieces: Harmonizing Creativity",
    content: [
      "Embark on a journey through musical masterpieces, where artists harmonize creativity to compose melodies that resonate with the soul.",
    ],
    userId: "624a6a677c8d9c9f5fd5eb0c", // Mimo
    community: "CreativeMindsCollective", // CreativeMindsCollective
    comments: ["624a6962a85ed5a6d6ca9373", "624a48fc091dc5e9ef70605e"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },

  {
    _id: "624a6a677c8d9c9f5fd5eb62",
    title: "Sculpture Spotlight: Embodying Creativity in Form",
    content: [
      "Explore the world of sculpture as artists breathe life into clay, stone, and metal, embodying creativity in tangible forms that captivate the imagination.",
    ],
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    community: "VisualArtsGallery", // VisualArtsGallery
    comments: ["624a6a677c8d9c9f5fd5ebb4", "624a6a677c8d9c9f5fd5ebc1"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb63",
    title: "Digital Art Showcase: Exploring Virtual Realms",
    content: [
      "Immerse yourself in a digital art showcase, where artists explore virtual realms, blending imagination and technology to create captivating digital masterpieces.",
    ],
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    community: "VisualArtsGallery", // VisualArtsGallery
    comments: ["624a6962a85ed5a6d6ca9375", "624a696f57adc725989d2de5"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb64",
    title: "Abstract Expressions: An Exploration of Color and Form",
    content: [
      "Dive into abstract expressions as artists experiment with color and form, transcending traditional boundaries to evoke emotions and spark imagination.",
    ],
    userId: "624a6a677c8d9c9f5fd5eb0c", // Mimo
    community: "VisualArtsGallery", // VisualArtsGallery
    comments: ["624a697cfa996c1c12f79541", "624a48f143bd949036986953"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb65",
    title: "Impressionist Inspirations: Capturing Moments in Time",
    content: [
      "Experience impressionist inspirations as artists capture moments in time, using vibrant brushstrokes and light to convey fleeting emotions and scenes.",
    ],
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    community: "VisualArtsGallery", // VisualArtsGallery
    comments: ["624a4052e28fb9d9c024671a", "624a6a677c8d9c9f5fd5ebb1"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb66",
    title: "Realism Rediscovered: Portraying Life's Authenticity",
    content: [
      "Rediscover realism as artists portray life's authenticity, capturing intricate details and subtle nuances that mirror the beauty and complexity of existence.",
    ],
    userId: "624a4a94c66738f13854b474", // Amira
    community: "VisualArtsGallery", // VisualArtsGallery
    comments: [],
    type: "Post",
    isNsfw: false,
  },

  {
    _id: "624a6a677c8d9c9f5fd5eb67",
    title: "Poetry Corner: Embracing the Beauty of Words",
    content: [
      "Step into the poetry corner and immerse yourself in the beauty of words, where emotions flow freely and thoughts take flight on the wings of imagination.",
    ],
    userId: "624a4a94c66738f13854b474", // Amira
    community: "Writers'Haven", // Writers'Haven
    comments: [],
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb68",
    title: "Short Story Showcase: Unveiling Worlds in Few Words",
    content: [
      "Embark on a journey through the short story showcase, where authors unveil worlds in few words, weaving tales that linger in the mind long after they're read.",
    ],
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    community: "Writers'Haven", // Writers'Haven
    comments: [],
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb69",
    title: "Writing Prompts Galore: Igniting Creative Sparks",
    content: [
      "Ignite your creative sparks with a plethora of writing prompts, designed to inspire, challenge, and fuel your imagination on the writer's journey.",
    ],
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    community: "Writers'Haven", // Writers'Haven
    comments: [],
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb6a",
    title: "Novel Discussions: Exploring Literary Worlds",
    content: [
      "Embark on discussions about novels, exploring literary worlds, characters, themes, and narratives that leave an indelible mark on readers' hearts and minds.",
    ],
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    community: "Writers'Haven", // Writers'Haven
    comments: [],
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb6b",
    title: "Author Spotlight: Celebrating Creative Voices",
    content: [
      "Celebrate creative voices in the author spotlight, where writers share insights, experiences, and reflections on their writing journeys and literary inspirations.",
    ],
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    community: "Writers'Haven", // Writers'Haven
    comments: [],
    type: "Post",
    isNsfw: false,
  },

  {
    _id: "624a6a677c8d9c9f5fd5eb6c",
    title: "Guided Meditation Session: Cultivating Inner Peace",
    content: [
      "Join us for a guided meditation session focused on cultivating inner peace, mindfulness, and serenity amidst the hustle and bustle of daily life.",
    ],
    userId: "624a6a677c8d9c9f5fd5eb0c", // Mimo
    community: "MindfulnessAndMeditation", // Mindfulness&Meditation Community
    comments: [],
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb6d",
    title: "Mindfulness in Motion: Embracing the Present Moment",
    content: [
      "Explore the practice of mindfulness in motion, embracing the present moment with awareness and intention in every step, breath, and movement.",
    ],
    userId: "624a6a677c8d9c9f5fd5eb0d", // Basem
    community: "MindfulnessAndMeditation", // Mindfulness&Meditation Community
    comments: ["624a6a677c8d9c9f5fd5eb70", "624a6a677c8d9c9f5fd5ebf7"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb6e",
    title: "Mindful Living: Nurturing the Mind, Body & Spirit",
    content: [
      "Embark on the journey of mindful living, nurturing the mind, body, and spirit through practices that promote self-awareness, compassion, and well-being.",
    ],
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    community: "MindfulnessAndMeditation", // Mindfulness&Meditation Community
    comments: ["624a6a677c8d9c9f5fd5ebf8", "624a6a677c8d9c9f5fd5ec73"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb6f",
    title: "Stress Management Techniques: Finding Calm in Chaos",
    content: [
      "Discover stress management techniques to find calm in chaos, empowering yourself to navigate life's challenges with resilience, balance, and inner strength.",
    ],
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    community: "MindfulnessAndMeditation", // Mindfulness&Meditation Community
    comments: ["624a6a677c8d9c9f5fd5ec77", "624a6a677c8d9c9f5fd5ecc7"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb70",
    title: "Mindful Breathing Exercises: Anchoring in the Present",
    content: [
      "Practice mindful breathing exercises to anchor yourself in the present moment, cultivating a sense of calm, clarity, and presence in your daily life.",
    ],
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    community: "MindfulnessAndMeditation", // Mindfulness&Meditation Community
    comments: [],
    type: "Post",
    isNsfw: false,
  },

  {
    _id: "624a6a677c8d9c9f5fd5eb71",
    title: "Understanding Human Behavior: Insights from Psychology",
    content: [
      "Explore the fascinating realm of human behavior through insights from psychology, discussing theories, research findings, and practical applications.",
    ],
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    community: "PsychologyInsightsCircle", // PsychologyInsightsCircle
    comments: [],
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb72",
    title: "The Power of Emotional Intelligence: Navigating Relationships",
    content: [
      "Delve into the power of emotional intelligence and its role in navigating relationships, enhancing communication, and fostering empathy and understanding.",
    ],
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    community: "PsychologyInsightsCircle", // PsychologyInsightsCircle
    comments: [],
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb73",
    title: "Cognitive Biases: Exploring the Quirks of the Human Mind",
    content: [
      "Examine cognitive biases and their impact on decision-making, perception, and behavior, unraveling the quirks of the human mind and how we perceive reality.",
    ],
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    community: "PsychologyInsightsCircle", // PsychologyInsightsCircle
    comments: ["624a6a677c8d9c9f5fd5ecc4", "624a6a677c8d9c9f5fd5ecc1"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb74",
    title: "Positive Psychology: Cultivating Happiness and Well-Being",
    content: [
      "Explore the principles of positive psychology and learn strategies for cultivating happiness, resilience, and well-being in everyday life.",
    ],
    userId: "624a6a677c8d9c9f5fd5eb0d", // Basem
    community: "PsychologyInsightsCircle", // PsychologyInsightsCircle
    comments: ["624a6a677c8d9c9f5fd5efc9", "624a6a677c8d9c9f5fd5eca0"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb75",
    title: "Psychological Resilience: Thriving in the Face of Adversity",
    content: [
      "Discover the concept of psychological resilience and explore strategies for thriving in the face of adversity, setbacks, and life's challenges.",
    ],
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    community: "PsychologyInsightsCircle", // PsychologyInsightsCircle
    comments: ["624a6a677c8d9c9f5fd5eca3", "624a6a677c8d9c9f5fd5ecb1"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },

  {
    _id: "624a6a677c8d9c9f5fd5eb76",
    title: "Bucket List Destinations: Must-Visit Places Around the World",
    content: [
      "Share your bucket list destinations and dream travel experiences, and inspire fellow globetrotters with your adventurous spirit!",
    ],
    userId: "624a4fbf3f392aefdb4dd1c8", // Farouq
    community: "GlobetrottersCommunity", // GlobetrottersCommunity
    comments: [],
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb77",
    title: "Solo Travel Adventures: Embracing Independence and Discovery",
    content: [
      "Embark on a journey of self-discovery and adventure with solo travel experiences, sharing tips, stories, and insights for fellow solo travelers.",
    ],
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    community: "GlobetrottersCommunity", // GlobetrottersCommunity
    comments: [],
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb78",
    title: "Off-the-Beaten-Path Adventures: Hidden Gems and Local Experiences",
    content: [
      "Discover hidden gems and off-the-beaten-path destinations around the world, sharing local experiences, cultural insights, and travel recommendations.",
    ],
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    community: "GlobetrottersCommunity", // GlobetrottersCommunity
    comments: [],
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb79",
    title: "Adventure Travel Stories: Tales of Thrills and Exploration",
    content:
      "Share your most memorable adventure travel stories, from adrenaline-pumping activities to awe-inspiring natural landscapes, and inspire fellow adventurers!",
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    community: "GlobetrottersCommunity", // GlobetrottersCommunity
    comments: ["624a6a677c8d9c9f5fd5eca7", "624a6a677c8d9c9f5fd5ecd0"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb7a",
    title: "Cultural Immersion Experiences: Connecting with Local Communities",
    content: [
      "Immerse yourself in different cultures, traditions, and lifestyles through cultural immersion experiences, fostering meaningful connections and understanding.",
    ],
    userId: "624a6a677c8d9c9f5fd5eb0d", // Basem
    community: "GlobetrottersCommunity", // GlobetrottersCommunity
    comments: ["624a6a677c8d9c9f5fd5ecf1", "624a6a677c8d9c9f5fd5ece1"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },

  {
    _id: "624a6a677c8d9c9f5fd5eb7b",
    title: "Favorite Hiking Trail",
    content: [
      "What is your favorite hiking trail for exploring nature's wonders on foot?",
    ],
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    community: "AdventurousSoulsSociety", // AdventurousSoulsSociety
    comments: ["624a6a677c8d9c9f5fd5efb6", "624a6a677c8d9c9f5fd5ece6"],
    commentsCount: 2,
    type: "Poll",
    isNsfw: false,
    pollOptions: [
      { option: "Appalachian Trail", votes: 0 },
      { option: "Pacific Crest Trail", votes: 0 },
      { option: "Camino de Santiago", votes: 0 },
      { option: "Mount Kilimanjaro", votes: 0 },
      { option: "Inca Trail to Machu Picchu", votes: 0 },
    ],
    pollVotingLength: "7 Days",
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb7c",
    title: "Extreme Sports Escapades: Pushing Limits and Seeking Thrills",
    content: [
      "Share your wildest extreme sports experiences, heart-racing activities, and tips for thrill-seekers venturing into the realm of extreme adventure! Warning: Content may contain graphic descriptions and intense scenarios. Viewer discretion is advised.",
    ],
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    community: "AdventurousSoulsSociety", // AdventurousSoulsSociety
    comments: [],
    type: "Post",
    isNsfw: true,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb7d",
    title: "Backpacking Adventures: Wanderlust Tales from Around the Globe",
    content: [
      "Share your backpacking adventures, travel tales, budget travel tips, and inspiring stories for fellow backpackers!",
    ],
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    community: "AdventurousSoulsSociety", // AdventurousSoulsSociety
    comments: [],
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb7e",
    title: "Water Sports Wonderland: Dive into Aquatic Adventures",
    userId: "624a6a677c8d9c9f5fd5eb0c", // Mimo
    community: "AdventurousSoulsSociety", // AdventurousSoulsSociety
    comments: [],
    type: "Images & Video",
    isNsfw: false,
    fileType: "image",
    attachments: [
      {
        type: "image",
        link: "https://res.cloudinary.com/dkkhtb4za/image/upload/v1713808819/uploads/attachments-1713808813301.jpg.jpg",
      },
    ],
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb7f",
    title: "Road Trip Chronicles: Tales of Freedom on the Open Road",
    content: [
      "Share your most memorable road trip experiences, scenic routes, and travel tips for fellow road warriors!",
    ],
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    community: "AdventurousSoulsSociety", // AdventurousSoulsSociety
    comments: ["624a6a677c8d9c9f5fd5eda1", "624a6a677c8d9c9f5fd5eda5"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },

  {
    _id: "624a6a677c8d9c9f5fd5eb80",
    title: "Global Gastronomy: Exploring Culinary Delights Around the World",
    content: [
      "Share your favorite international cuisines, traditional dishes, and recipes from different cultures, and embark on a virtual culinary journey!",
    ],
    userId: "624a4fbf3f392aefdb4dd1c8", // Farouq
    community: "CulinaryDelights", // CulinaryDelights
    comments: ["624a6a677c8d9c9f5fd5eda8", "624a6a677c8d9c9f5fd5edc1"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb81",
    title:
      "Foodie Adventures: Experiencing Exotic Flavors and Local Delicacies",
    content: [
      "Share your foodie adventures, hidden gems, and culinary discoveries from around the globe, and inspire fellow gastronomes!",
    ],
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    community: "CulinaryDelights", // CulinaryDelights
    comments: ["624a6a677c8d9c9f5fd5efbb", "624a6a677c8d9c9f5fd5edc6"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb82",
    title:
      "Cooking Masterclass: Tips and Tricks for Perfecting Your Culinary Skills",
    content: [
      "Discuss cooking techniques, kitchen hacks, and share your favorite recipes to help aspiring chefs elevate their culinary creations!",
    ],
    userId: "624a6a677c8d9c9f5fd5eb0c", // Mimo
    community: "CulinaryDelights", // CulinaryDelights
    comments: [],
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb83",
    title: "Sweet Treats Galore: Indulging in Dessert Delights",
    content: [
      "Share your love for desserts, pastry recipes, and sweet indulgences from all corners of the world, and satisfy your sweet tooth!",
    ],
    userId: "624a6a677c8d9c9f5fd5eb0d", // Basem
    community: "CulinaryDelights", // CulinaryDelights
    comments: [],
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb84",
    title: "Farm-to-Table Chronicles: Embracing Sustainable Food Practices",
    content: [
      "Discuss sustainable farming practices, organic food movements, and tips for adopting eco-friendly eating habits to support the planet!",
    ],
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    community: "CulinaryDelights", // CulinaryDelights
    comments: ["624a6a677c8d9c9f5fd5edc8", "624a6a677c8d9c9f5fd5edd1"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },

  {
    _id: "624a6a677c8d9c9f5fd5eb85",
    title: "Exploring Exotic Flavors: A Journey Through Gourmet Cuisine",
    content: [
      "Embark on a culinary adventure and share your experiences tasting exotic dishes, gourmet delicacies, and unique flavors from around the world!",
    ],
    userId: "624a4fbf3f392aefdb4dd1c8", // Farouq
    community: "GourmetAdventures", // GourmetAdventures
    comments: ["624a6a677c8d9c9f5fd5edd8", "624a6a677c8d9c9f5fd5edd4"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb86",
    title: "Gourmet Travel Diary: Discovering Michelin-Starred Restaurants",
    content: [
      "Share your gourmet travel experiences, culinary discoveries, and memorable dining experiences at Michelin-starred restaurants around the globe!",
    ],
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    community: "GourmetAdventures", // GourmetAdventures
    comments: ["624a6a677c8d9c9f5fd5eb9a", "624a49117e14fbfa14e5b5b7"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb87",
    title: "Epicurean Escapes: Unforgettable Gourmet Adventures",
    content: [
      "Share your epicurean escapes, culinary tours, and memorable foodie experiences that tantalized your taste buds and ignited your senses!",
    ],
    userId: "624a6a677c8d9c9f5fd5eb0d", // Basem
    community: "GourmetAdventures", // GourmetAdventures
    comments: [],
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb88",
    title: "Gastronomic Delights: Exploring Local Cuisine and Food Traditions",
    content: [
      "Dive into the world of gastronomy and explore local cuisine, food traditions, and authentic flavors from different regions and cultures!",
    ],
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    community: "GourmetAdventures", // GourmetAdventures
    comments: [],
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb89",
    title: "Culinary Experiments: Unleashing Creativity in the Kitchen",
    content: [
      "Experiment with new ingredients, innovative cooking techniques, and share your culinary creations that push the boundaries of traditional cuisine!",
    ],
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    community: "GourmetAdventures", // GourmetAdventures
    comments: ["624a6962a85ed5a6d6ca9376", "624b88a4b51501b30d71386e"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },

  {
    _id: "624a6a677c8d9c9f5fd5eb8a",
    title:
      "Unraveling Pop Culture Mysteries: The Significance of Internet Memes",
    content: [
      "Join the discussion on internet memes, their cultural significance, and how they reflect the collective consciousness of today's society!",
    ],
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    community: "PopCultureFanatics", // PopCultureFanatics
    comments: ["624a6a677c8d9c9f5fd5ebb2", "624a6a677c8d9c9f5fd5ebb6"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb8b",
    title: "The Evolution of Pop Music: From Classics to Modern Hits",
    content: [
      "Explore the evolution of pop music, from the classic hits that shaped generations to the modern chart-toppers that dominate the airwaves!",
    ],
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    community: "PopCultureFanatics", // PopCultureFanatics
    comments: ["624a6a677c8d9c9f5fd5ebe2", "624a6a677c8d9c9f5fd5edf7"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb8c",
    title: "Iconic Movie Quotes: Memorable Lines That Define Pop Culture",
    content:
      "Share your favorite movie quotes, iconic lines, and memorable moments that have become ingrained in pop culture history!",
    userId: "624a4a94c66738f13854b474", // Amira
    community: "PopCultureFanatics", // PopCultureFanatics
    comments: [],
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb8d",
    title: "Nostalgic TV Shows: Rediscovering Childhood Favorites",
    content: [
      "Take a trip down memory lane and reminisce about your favorite childhood TV shows, cartoons, and animated series that shaped your upbringing!",
    ],
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    community: "PopCultureFanatics", // PopCultureFanatics
    comments: [],
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb8e",
    title: "The Influence of Pop Culture: Trends, Fads, and Cultural Phenomena",
    content: [
      "Discuss the pervasive influence of pop culture on society, including trends, fads, and cultural phenomena that shape our lives and perceptions!",
    ],
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    community: "PopCultureFanatics", // PopCultureFanatics
    comments: ["624a6a677c8d9c9f5fd5eba6", "624a6a677c8d9c9f5fd5eba7"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },

  {
    _id: "624a6a677c8d9c9f5fd5eb8f",
    title: "Classic Hollywood Gems: Must-Watch Films from the Golden Age",
    content: [
      "Discover timeless classics from the golden age of Hollywood, featuring iconic performances, gripping plots, and unforgettable cinematic moments!",
    ],
    userId: "624a4a94c66738f13854b474", // Amira
    community: "MovieBuffsClub", // MovieBuffsClub
    comments: ["624a6a677c8d9c9f5fd5eba9", "624a6a677c8d9c9f5fd5ebaa"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb90",
    title: "Hidden Movie Gems: Underrated Films That Deserve More Recognition",
    content: [
      "Share your favorite underrated films that have flown under the radar but deserve more recognition for their exceptional storytelling and performances!",
    ],
    userId: "624a6a677c8d9c9f5fd5eb0d", // Basem
    community: "MovieBuffsClub", // MovieBuffsClub
    comments: ["624a6a677c8d9c9f5fd5ebac", "624a6a677c8d9c9f5fd5ebad"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb91",
    title: "Modern Masterpieces: Recent Films That Redefined Cinema",
    content: [
      "Discuss recent films that have pushed the boundaries of storytelling, cinematography, and visual effects, leaving a lasting impact on the world of cinema!",
    ],
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    community: "MovieBuffsClub", // MovieBuffsClub
    comments: [],
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb92",
    title: "Cinematic Legends: Celebrating the Greatest Filmmakers of All Time",
    content: [
      "Pay tribute to the visionary directors, actors, and behind-the-scenes talents who have shaped the landscape of cinema and left an indelible mark on movie history!",
    ],
    userId: "624a6a677c8d9c9f5fd5eb0c", // Mimo
    community: "MovieBuffsClub", // MovieBuffsClub
    comments: ["624a6a677c8d9c9f5fd5efaa", "624a6a677c8d9c9f5fd5edf2"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb93",
    title: "Movie Marathon Madness: Planning the Ultimate Film Fest",
    content: [
      "Share tips, recommendations, and themed movie marathon ideas for hosting the ultimate film fest with friends and family, complete with popcorn and cozy blankets!",
    ],
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    community: "MovieBuffsClub", // MovieBuffsClub
    comments: ["624a6a677c8d9c9f5fd5edd5", "624a6a677c8d9c9f5fd5eb99"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },

  {
    _id: "624a6a677c8d9c9f5fd5eb94",
    title: "Favorite Life Soundtrack Song",
    content: [
      "Which song holds a special place in your heart and defines your life's journey?",
    ],
    userId: "624a6a677c8d9c9f5fd5eb0c", // Mimo
    community: "MusicManiacsLounge", // MusicManiacsLounge
    comments: ["624a490d7e14fbfa14e5b5b6", "624a49017e14fbfa14e5b5b4"],
    commentsCount: 2,
    type: "Poll",
    isNsfw: false,
    pollOptions: [
      { option: "Bohemian Rhapsody - Queen", votes: 0 },
      { option: "Imagine - John Lennon", votes: 0 },
      { option: "Hey Jude - The Beatles", votes: 0 },
      { option: "Stairway to Heaven - Led Zeppelin", votes: 0 },
      { option: "Hotel California - Eagles", votes: 0 },
    ],
    pollVotingLength: "7 Days",
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb95",
    title: "Genre Exploration: Diving Deep into Musical Diversity",
    content: [
      "Embark on a musical journey across different genres and discover hidden gems, underrated artists, and diverse cultural influences that enrich the world of music!",
    ],
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    community: "MusicManiacsLounge", // MusicManiacsLounge
    comments: [],
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb96",
    title: "Concert Chronicles: Memorable Moments from Live Shows",
    content:
      "Share your most unforgettable experiences from live concerts and music festivals, from electrifying performances to heartwarming interactions with fellow fans!",
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    community: "MusicManiacsLounge", // MusicManiacsLounge
    comments: ["624b88a4b51501b30d71386f", "624a6956a807a4016790d545"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb97",
    title: "Musical Masterpieces: Iconic Albums That Stand the Test of Time",
    content: [
      "Discuss legendary albums that have left an enduring legacy, influencing generations of music lovers and shaping the evolution of musical genres!",
    ],
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    community: "MusicManiacsLounge", // MusicManiacsLounge
    comments: ["624a6a677c8d9c9f5fd5ebb7", "624a6a677c8d9c9f5fd5ebc3"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb98",
    title: "Musical Encounters: Stories of Serendipitous Discoveries",
    content: [
      "Share serendipitous encounters with music, from chance discoveries of new artists to unexpected connections with songs that resonate deeply with your soul!",
    ],
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    community: "MusicManiacsLounge", // MusicManiacsLounge
    comments: ["624a6a677c8d9c9f5fd5eba4", "624a6a677c8d9c9f5fd5eba5"],
    commentsCount: 2,
    type: "Post",
    isNsfw: false,
  },
];

exports.data = postSeedData;
