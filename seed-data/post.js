const postSeedData = [
  {
    _id: "624a6a677c8d9c9f5fd5eb3e",
    title: "Introduction to Python Programming",
    content: ["Learn the basics of Python programming with this introductory tutorial!"],
    userId: "624a4a94c66738f13854b474", // Amira
    community: "624a6a677c8d9c9f5fd5eb1a", // CodeCrafters
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb3f",
    title: "Advanced Data Structures in Java",
    content: ["Explore advanced data structures such as trees, graphs, and heaps in Java programming."],
    userId: "624a4a94c66738f13854b474", // Amira
    community: "624a6a677c8d9c9f5fd5eb1a", // CodeCrafters
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb41",
    title: "Web Development Crash Course",
    content: ["Join us for a crash course on modern web development technologies like HTML, CSS, and JavaScript."],
    userId: "624a52d75ff69df002d25035", // Mahmoud
    community: "624a6a677c8d9c9f5fd5eb1a", // CodeCrafters
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb42",
    title: "Machine Learning Fundamentals",
    content: ["Learn the fundamentals of machine learning, including algorithms, models, and applications."],
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    community: "624a6a677c8d9c9f5fd5eb1a", // CodeCrafters
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb43",
    title: "Debugging Tips and Tricks",
    content: ["Discover useful debugging techniques and strategies to troubleshoot and fix programming errors."],
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    community: "624a6a677c8d9c9f5fd5eb1a", // CodeCrafters
    type: "Post",
    isNsfw: false,
    comments: [],   
  },


  {
    _id: "624a6a677c8d9c9f5fd5eb44",
    title: "The Future of Artificial Intelligence",
    content: ["Discuss the latest advancements and future prospects of artificial intelligence in our TechTalks community!"],
    userId: "624a52d75ff69df002d25035", // Mahmoud
    community: "624a6a677c8d9c9f5fd5eb1b", // TechTalks
    comments: [],   
    type: "Post",
    isNsfw: false, 
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb45",
    title: "Blockchain Technology Explained",
    content: ["Learn about the fundamentals of blockchain technology and its potential applications."],
    userId: "624a4fbf3f392aefdb4dd1c8", // Farouq
    community: "624a6a677c8d9c9f5fd5eb1b", // TechTalks
    comments: [],   
    type: "Post",
    isNsfw: false, 
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb46",
    title: "Cybersecurity Best Practices",
    content: ["Discover essential cybersecurity best practices to protect your online identity and data."],
    userId: "624a4a94c66738f13854b474", // Amira
    community: "624a6a677c8d9c9f5fd5eb1b", // TechTalks
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb47",
    title: "Cloud Computing Trends",
    content: ["Explore the latest trends and innovations in cloud computing technologies."],
    userId: "624a4a94c66738f13854b474", // Amira
    community: "624a6a677c8d9c9f5fd5eb1b", // TechTalks
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb48",
    title: "Tech Gadgets Showcase",
    content: ["Share your favorite tech gadgets and accessories and discuss the latest innovations in consumer electronics."],
    userId: "624a52d75ff69df002d25035", // Mahmoud
    community: "624a6a677c8d9c9f5fd5eb1b", // TechTalks
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  
  
  {
    _id: "624a6a677c8d9c9f5fd5eb49",
    title: "JavaScript Frameworks Comparison",
    content: ["Discuss the pros and cons of popular JavaScript frameworks like React, Angular, and Vue.js."],
    userId: "624a52d75ff69df002d25035", // Mahmoud
    community: "624a6a677c8d9c9f5fd5eb1c", // CodeGeeks
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb4a",
    title: "Python vs. Java: Which is Better?",
    content: ["Engage in a debate about the advantages and disadvantages of Python and Java programming languages."],
    userId: "624a4a94c66738f13854b474", // Amira
    community: "624a6a677c8d9c9f5fd5eb1c", // CodeGeeks
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb4b",
    title: "GitHub Collaboration Tips",
    content: ["Learn effective strategies for collaborating on projects using GitHub and maximizing team productivity."],
    userId: "624a4fbf3f392aefdb4dd1c8", // Farouq
    community: "624a6a677c8d9c9f5fd5eb1c", // CodeGeeks
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb4c",
    title: "Data Structures and Algorithms Masterclass",
    content: ["Join our masterclass series to learn advanced data structures and algorithms techniques from industry experts."],
    userId: "624a52d75ff69df002d25035", // Mahmoud
    community: "624a6a677c8d9c9f5fd5eb1c", // CodeGeeks
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb4d",
    title: "Web Development Bootcamp Recommendations",
    content: ["Share your favorite web development bootcamps and resources for aspiring developers."],
    userId: "624a4fbf3f392aefdb4dd1c8", // Farouq
    community: "624a6a677c8d9c9f5fd5eb1c", // CodeGeeks
    comments: [],   
    type: "Post",
    isNsfw: false, 
  },
  
  
  {
    _id: "624a6a677c8d9c9f5fd5eb4e",
    title: "Black Holes: The Enigma of the Cosmos",
    content: ["Delve into the mysteries of black holes, their formation, properties, and role in shaping the universe."],
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    community: "624a6a677c8d9c9f5fd5eb1d", // Science Explorers Club
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb4f",
    title: "DNA Sequencing Breakthroughs",
    content: ["Explore recent advancements in DNA sequencing technologies and their implications for genetic research and medicine."],
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    community: "624a6a677c8d9c9f5fd5eb1d", // Science Explorers Club
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb50",
    title: "The Quantum World: Weirdness and Wonders",
    content: ["Dive into the bizarre and fascinating realm of quantum mechanics, from superposition and entanglement to quantum computing."],
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    community: "624a6a677c8d9c9f5fd5eb1d", // Science Explorers Club
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb51",
    title: "Climate Change: Challenges and Solutions",
    content: ["Discuss the latest research on climate change, its impacts on ecosystems and societies, and strategies for mitigation and adaptation."],
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    community: "624a6a677c8d9c9f5fd5eb1d", // Science Explorers Club
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb52",
    title: "The Evolutionary Arms Race",
    content: ["Explore the co-evolutionary dynamics between species and their predators, from mimicry and camouflage to predator-prey relationships."],
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    community: "624a6a677c8d9c9f5fd5eb1d", // Science Explorers Club
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  

  {
    _id: "624a6a677c8d9c9f5fd5eb53",
    title: "Journey to the Edge of the Universe",
    content: ["Embark on a cosmic voyage to the farthest reaches of the observable universe, exploring galaxies, nebulae, and the cosmic web."],
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    community: "624a4052e28fb9d9c024671a", // Space & Astronomy Lovers
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb54",
    title: "The Search for Extraterrestrial Life",
    content: ["Join the quest for life beyond Earth, from the exploration of Mars and Europa to the study of exoplanets and SETI initiatives."],
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    community: "624a4052e28fb9d9c024671a", // Space & Astronomy Lovers
    comments: [],   
    type: "Post",
    isNsfw: false, 
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb55",
    title: "The Beauty of Celestial Phenomena",
    content: ["Marvel at the splendor of cosmic events like supernovae, eclipses, meteor showers, and auroras, captured by astronomers and astrophotographers."],
    userId: "624a6a677c8d9c9f5fd5eb0c", // Mimo
    community: "624a4052e28fb9d9c024671a", // Space & Astronomy Lovers
    comments: [],   
    type: "Post",
    isNsfw: false, 
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb56",
    title: "Exploring the Moons of Jupiter",
    content: ["Discover the diverse moons of Jupiter, including Ganymede, Europa, and Io, and their potential for habitability and scientific exploration."],
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    community: "624a4052e28fb9d9c024671a", // Space & Astronomy Lovers
    comments: [],   
    type: "Post",
    isNsfw: false, 
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb57",
    title: "Stargazing Tips and Tricks",
    content: ["Learn essential tips for stargazing, including choosing the right telescope, identifying constellations, and observing celestial events."],
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    community: "624a4052e28fb9d9c024671a", // Space & Astronomy Lovers
    comments: [],   
    type: "Post",
    isNsfw: false, 
  },
  

  {
    _id: "624a6a677c8d9c9f5fd5eb58",
    title: "The Wonders of Genetic Diversity",
    content: ["Explore the fascinating world of genetic diversity and its implications for evolution, adaptation, and conservation."],
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    community: "624a6a677c8d9c9f5fd5eb1d", // Biology Buffs Society
    comments: [],   
    type: "Post",
    isNsfw: false, 
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb59",
    title: "Ecology and Biodiversity Conservation",
    content: ["Discuss the principles of ecology, ecosystem dynamics, and strategies for biodiversity conservation in the face of environmental challenges."],
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    community: "624a6a677c8d9c9f5fd5eb1d", // Biology Buffs Society
    comments: [],   
    type: "Post",
    isNsfw: false, 
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb5a",
    title: "Adaptations in the Animal Kingdom",
    content: ["Explore remarkable adaptations in the animal kingdom, from camouflage and mimicry to specialized anatomical features for survival."],
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    community: "624a6a677c8d9c9f5fd5eb1d", // Biology Buffs Society
    comments: [],   
    type: "Post",
    isNsfw: false, 
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb5b",
    title: "The Marvels of Marine Biology",
    content: ["Dive into the wonders of marine biology, exploring diverse ecosystems, marine organisms, and the importance of ocean conservation."],
    userId: "624a6a677c8d9c9f5fd5eb0d", // Basem
    community: "624a6a677c8d9c9f5fd5eb1d", // Biology Buffs Society
    comments: [],   
    type: "Post",
    isNsfw: false, 
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb5c",
    title: "Genomics Revolution: Unraveling the Genetic Code",
    content: ["Delve into the field of genomics, examining breakthroughs in DNA sequencing, genetic engineering, and personalized medicine."],
    userId: "624a6a677c8d9c9f5fd5eb0c", // Mimo
    community: "624a6a677c8d9c9f5fd5eb1d", // Biology Buffs Society
    comments: [],   
    type: "Post",
    isNsfw: false, 
  },
  
  
  {
    _id: "624a6a677c8d9c9f5fd5eb5d",
    title: "Expressive Artistry: Painting with Emotions",
    content: ["Discover the power of expressive artistry as artists paint with raw emotions, capturing the essence of human experiences on canvas."],
    userId: "624a4fbf3f392aefdb4dd1c8", // Farouq
    community: "624a6a677c8d9c9f5fd5eb1e", // Creative Minds Collective
    comments: [],   
    type: "Post",
    isNsfw: false, 
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb5e",
    title: "Exploring the Intersection of Music and Visual Arts",
    content: ["Embark on a creative journey to explore the intersection of music and visual arts, where sound inspires vivid imagery and vice versa."],
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    community: "624a6a677c8d9c9f5fd5eb1e", // Creative Minds Collective
    comments: [],   
    type: "Post",
    isNsfw: false, 
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb5f",
    title: "Poetic Reflections: A Journey Through Words",
    content: ["Indulge in poetic reflections as writers pen verses that transport readers on a journey through emotions, memories, and dreams."],
    userId: "624a4a94c66738f13854b474", // Amira
    community: "624a6a677c8d9c9f5fd5eb1e", // Creative Minds Collective
    comments: [],   
    type: "Post",
    isNsfw: false, 
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb60",
    title: "Photography Showcase: Capturing Life's Essence",
    content: ["Immerse yourself in a photography showcase, where each image captures life's essence, frozen in time to evoke emotions and memories."],
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    community: "624a6a677c8d9c9f5fd5eb1e", // Creative Minds Collective
    comments: [],   
    type: "Post",
    isNsfw: false, 
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb61",
    title: "Musical Masterpieces: Harmonizing Creativity",
    content: ["Embark on a journey through musical masterpieces, where artists harmonize creativity to compose melodies that resonate with the soul."],
    userId: "624a6a677c8d9c9f5fd5eb0c", // Mimo
    community: "624a6a677c8d9c9f5fd5eb1e", // Creative Minds Collective
    comments: [],   
    type: "Post",
    isNsfw: false, 
  },
  
  
  {
    _id: "624a6a677c8d9c9f5fd5eb62",
    title: "Sculpture Spotlight: Embodying Creativity in Form",
    content: ["Explore the world of sculpture as artists breathe life into clay, stone, and metal, embodying creativity in tangible forms that captivate the imagination."],
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    community: "624a6a677c8d9c9f5fd5eb1f", // Visual Arts Gallery
    comments: [],   
    type: "Post",
    isNsfw: false, 
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb63",
    title: "Digital Art Showcase: Exploring Virtual Realms",
    content: ["Immerse yourself in a digital art showcase, where artists explore virtual realms, blending imagination and technology to create captivating digital masterpieces."],
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    community: "624a6a677c8d9c9f5fd5eb1f", // Visual Arts Gallery
    comments: [],   
    type: "Post",
    isNsfw: false, 
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb64",
    title: "Abstract Expressions: An Exploration of Color and Form",
    content: ["Dive into abstract expressions as artists experiment with color and form, transcending traditional boundaries to evoke emotions and spark imagination."],
    userId: "624a6a677c8d9c9f5fd5eb0c", // Mimo
    community: "624a6a677c8d9c9f5fd5eb1f", // Visual Arts Gallery
    comments: [],   
    type: "Post",
    isNsfw: false, 
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb65",
    title: "Impressionist Inspirations: Capturing Moments in Time",
    content: ["Experience impressionist inspirations as artists capture moments in time, using vibrant brushstrokes and light to convey fleeting emotions and scenes."],
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    community: "624a6a677c8d9c9f5fd5eb1f", // Visual Arts Gallery
    comments: [],   
    type: "Post",
    isNsfw: false, 
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb66",
    title: "Realism Rediscovered: Portraying Life's Authenticity",
    content: ["Rediscover realism as artists portray life's authenticity, capturing intricate details and subtle nuances that mirror the beauty and complexity of existence."],
    userId: "624a4a94c66738f13854b474", // Amira
    community: "624a6a677c8d9c9f5fd5eb1f", // Visual Arts Gallery
    comments: [],   
    type: "Post",
    isNsfw: false, 
  },

  {
    _id: "624a6a677c8d9c9f5fd5eb67",
    title: "Poetry Corner: Embracing the Beauty of Words",
    content: ["Step into the poetry corner and immerse yourself in the beauty of words, where emotions flow freely and thoughts take flight on the wings of imagination."],
    userId: "624a4a94c66738f13854b474", // Amira
    community: "624a6a677c8d9c9f5fd5eb20", // Writers' Haven
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb68",
    title: "Short Story Showcase: Unveiling Worlds in Few Words",
    content: ["Embark on a journey through the short story showcase, where authors unveil worlds in few words, weaving tales that linger in the mind long after they're read."],
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    community: "624a6a677c8d9c9f5fd5eb20", // Writers' Haven
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb69",
    title: "Writing Prompts Galore: Igniting Creative Sparks",
    content: ["Ignite your creative sparks with a plethora of writing prompts, designed to inspire, challenge, and fuel your imagination on the writer's journey."],
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    community: "624a6a677c8d9c9f5fd5eb20", // Writers' Haven
    comments: [],   
    type: "Post",
    isNsfw: false, 
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb6a",
    title: "Novel Discussions: Exploring Literary Worlds",
    content: ["Embark on discussions about novels, exploring literary worlds, characters, themes, and narratives that leave an indelible mark on readers' hearts and minds."],
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    community: "624a6a677c8d9c9f5fd5eb20", // Writers' Haven
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb6b",
    title: "Author Spotlight: Celebrating Creative Voices",
    content: ["Celebrate creative voices in the author spotlight, where writers share insights, experiences, and reflections on their writing journeys and literary inspirations."],
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    community: "624a6a677c8d9c9f5fd5eb20", // Writers' Haven
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  

  {
    _id: "624a6a677c8d9c9f5fd5eb6c",
    title: "Guided Meditation Session: Cultivating Inner Peace",
    content: ["Join us for a guided meditation session focused on cultivating inner peace, mindfulness, and serenity amidst the hustle and bustle of daily life."],
    userId: "624a6a677c8d9c9f5fd5eb0c", // Mimo
    community: "624a6a677c8d9c9f5fd5eb21", // Mindfulness & Meditation Community
    comments: [],   
    type: "Post",
    isNsfw: false, 
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb6d",
    title: "Mindfulness in Motion: Embracing the Present Moment",
    content: ["Explore the practice of mindfulness in motion, embracing the present moment with awareness and intention in every step, breath, and movement."],
    userId: "624a6a677c8d9c9f5fd5eb0d", // Basem
    community: "624a6a677c8d9c9f5fd5eb21", // Mindfulness & Meditation Community
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb6e",
    title: "Mindful Living: Nurturing the Mind, Body & Spirit",
    content: ["Embark on the journey of mindful living, nurturing the mind, body, and spirit through practices that promote self-awareness, compassion, and well-being."],
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    community: "624a6a677c8d9c9f5fd5eb21", // Mindfulness & Meditation Community
    comments: [],   
    type: "Post",
    isNsfw: false, 
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb6f",
    title: "Stress Management Techniques: Finding Calm in Chaos",
    content: ["Discover stress management techniques to find calm in chaos, empowering yourself to navigate life's challenges with resilience, balance, and inner strength."],
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    community: "624a6a677c8d9c9f5fd5eb21", // Mindfulness & Meditation Community
    comments: [],   
    type: "Post",
    isNsfw: false, 
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb70",
    title: "Mindful Breathing Exercises: Anchoring in the Present",
    content: ["Practice mindful breathing exercises to anchor yourself in the present moment, cultivating a sense of calm, clarity, and presence in your daily life."],
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    community: "624a6a677c8d9c9f5fd5eb21", // Mindfulness & Meditation Community
    comments: [],   
    type: "Post",
    isNsfw: false, 
  },
  

  {
    _id: "624a6a677c8d9c9f5fd5eb71",
    title: "Understanding Human Behavior: Insights from Psychology",
    content: ["Explore the fascinating realm of human behavior through insights from psychology, discussing theories, research findings, and practical applications."],
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    community: "624a6a677c8d9c9f5fd5eb23", // Psychology Insights Circle
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb72",
    title: "The Power of Emotional Intelligence: Navigating Relationships",
    content: ["Delve into the power of emotional intelligence and its role in navigating relationships, enhancing communication, and fostering empathy and understanding."],
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    community: "624a6a677c8d9c9f5fd5eb23", // Psychology Insights Circle
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb73",
    title: "Cognitive Biases: Exploring the Quirks of the Human Mind",
    content: ["Examine cognitive biases and their impact on decision-making, perception, and behavior, unraveling the quirks of the human mind and how we perceive reality."],
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    community: "624a6a677c8d9c9f5fd5eb23", // Psychology Insights Circle
    comments: [],   
    type: "Post",
    isNsfw: false, 
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb74",
    title: "Positive Psychology: Cultivating Happiness and Well-Being",
    content: ["Explore the principles of positive psychology and learn strategies for cultivating happiness, resilience, and well-being in everyday life."],
    userId: "624a6a677c8d9c9f5fd5eb0d", // Basem
    community: "624a6a677c8d9c9f5fd5eb23", // Psychology Insights Circle
    comments: [],   
    type: "Post",
    isNsfw: false, 
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb75",
    title: "Psychological Resilience: Thriving in the Face of Adversity",
    content: ["Discover the concept of psychological resilience and explore strategies for thriving in the face of adversity, setbacks, and life's challenges."],
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    community: "624a6a677c8d9c9f5fd5eb23", // Psychology Insights Circle
    comments: [],   
    type: "Post",
    isNsfw: false, 
  },

  
  {
    _id: "624a6a677c8d9c9f5fd5eb76",
    title: "Bucket List Destinations: Must-Visit Places Around the World",
    content: ["Share your bucket list destinations and dream travel experiences, and inspire fellow globetrotters with your adventurous spirit!"],
    userId: "624a4fbf3f392aefdb4dd1c8", // Farouq
    community: "624a6a677c8d9c9f5fd5eb24", // Globetrotters Community
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb77",
    title: "Solo Travel Adventures: Embracing Independence and Discovery",
    content: ["Embark on a journey of self-discovery and adventure with solo travel experiences, sharing tips, stories, and insights for fellow solo travelers."],
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    community: "624a6a677c8d9c9f5fd5eb24", // Globetrotters Community
    comments: [],   
    type: "Post",
    isNsfw: false, 
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb78",
    title: "Off-the-Beaten-Path Adventures: Hidden Gems and Local Experiences",
    content: ["Discover hidden gems and off-the-beaten-path destinations around the world, sharing local experiences, cultural insights, and travel recommendations."],
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    community: "624a6a677c8d9c9f5fd5eb24", // Globetrotters Community
    comments: [],   
    type: "Post",
    isNsfw: false, 
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb79",
    title: "Adventure Travel Stories: Tales of Thrills and Exploration",
    content: "Share your most memorable adventure travel stories, from adrenaline-pumping activities to awe-inspiring natural landscapes, and inspire fellow adventurers!",
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    community: "624a6a677c8d9c9f5fd5eb24", // Globetrotters Community
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb7a",
    title: "Cultural Immersion Experiences: Connecting with Local Communities",
    content: ["Immerse yourself in different cultures, traditions, and lifestyles through cultural immersion experiences, fostering meaningful connections and understanding."],
    userId: "624a6a677c8d9c9f5fd5eb0d", // Basem
    community: "624a6a677c8d9c9f5fd5eb24", // Globetrotters Community
    comments: [],   
    type: "Post",
    isNsfw: false, 
  },
  
  {
    _id: "624a6a677c8d9c9f5fd5eb7b",
    title: "Hiking Trails: Exploring Nature's Wonders on Foot",
    content: ["Share your favorite hiking trails, breathtaking landscapes, and tips for fellow outdoor enthusiasts to embark on memorable hiking adventures!"],
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    community: "624a6a677c8d9c9f5fd5eb25", // Adventurous Souls Society
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb7c",
    title: "Extreme Sports Escapades: Pushing Limits and Seeking Thrills",
    content: ["Discuss extreme sports experiences, adrenaline-pumping activities, and tips for daredevils seeking the ultimate thrill!"],
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    community: "624a6a677c8d9c9f5fd5eb25", // Adventurous Souls Society
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb7d",
    title: "Backpacking Adventures: Wanderlust Tales from Around the Globe",
    content: ["Share your backpacking adventures, travel tales, budget travel tips, and inspiring stories for fellow backpackers!"],
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    community: "624a6a677c8d9c9f5fd5eb25", // Adventurous Souls Society
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb7e",
    title: "Water Sports Wonderland: Dive into Aquatic Adventures",
    content: ["Discuss water sports activities, from surfing and scuba diving to kayaking and sailing, and share tips for ocean-loving adventurers!"],
    userId: "624a6a677c8d9c9f5fd5eb0c", // Mimo
    community: "624a6a677c8d9c9f5fd5eb25", // Adventurous Souls Society
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb7f",
    title: "Road Trip Chronicles: Tales of Freedom on the Open Road",
    content: ["Share your most memorable road trip experiences, scenic routes, and travel tips for fellow road warriors!"],
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    community: "624a6a677c8d9c9f5fd5eb25", // Adventurous Souls Society
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  

  {
    _id: "624a6a677c8d9c9f5fd5eb80",
    title: "Global Gastronomy: Exploring Culinary Delights Around the World",
    content: ["Share your favorite international cuisines, traditional dishes, and recipes from different cultures, and embark on a virtual culinary journey!"],
    userId: "624a4fbf3f392aefdb4dd1c8", // Farouq
    community: "624a6a677c8d9c9f5fd5eb26", // Culinary Delights
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb81",
    title: "Foodie Adventures: Experiencing Exotic Flavors and Local Delicacies",
    content: ["Share your foodie adventures, hidden gems, and culinary discoveries from around the globe, and inspire fellow gastronomes!"],
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    community: "624a6a677c8d9c9f5fd5eb26", // Culinary Delights
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb82",
    title: "Cooking Masterclass: Tips and Tricks for Perfecting Your Culinary Skills",
    content: ["Discuss cooking techniques, kitchen hacks, and share your favorite recipes to help aspiring chefs elevate their culinary creations!"],
    userId: "624a6a677c8d9c9f5fd5eb0c", // Mimo
    community: "624a6a677c8d9c9f5fd5eb26", // Culinary Delights
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb83",
    title: "Sweet Treats Galore: Indulging in Dessert Delights",
    content: ["Share your love for desserts, pastry recipes, and sweet indulgences from all corners of the world, and satisfy your sweet tooth!"],
    userId: "624a6a677c8d9c9f5fd5eb0d", // Basem
    community: "624a6a677c8d9c9f5fd5eb26", // Culinary Delights
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb84",
    title: "Farm-to-Table Chronicles: Embracing Sustainable Food Practices",
    content: ["Discuss sustainable farming practices, organic food movements, and tips for adopting eco-friendly eating habits to support the planet!"],
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    community: "624a6a677c8d9c9f5fd5eb26", // Culinary Delights
    comments: [],   
    type: "Post",
    isNsfw: false,
  },

  
  {
    _id: "624a6a677c8d9c9f5fd5eb85",
    title: "Exploring Exotic Flavors: A Journey Through Gourmet Cuisine",
    content: ["Embark on a culinary adventure and share your experiences tasting exotic dishes, gourmet delicacies, and unique flavors from around the world!"],
    userId: "624a4fbf3f392aefdb4dd1c8", // Farouq
    community: "624a6a677c8d9c9f5fd5eb27", // Gourmet Adventures
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb86",
    title: "Gourmet Travel Diary: Discovering Michelin-Starred Restaurants",
    content: ["Share your gourmet travel experiences, culinary discoveries, and memorable dining experiences at Michelin-starred restaurants around the globe!"],
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    community: "624a6a677c8d9c9f5fd5eb27", // Gourmet Adventures
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb87",
    title: "Epicurean Escapes: Unforgettable Gourmet Adventures",
    content: ["Share your epicurean escapes, culinary tours, and memorable foodie experiences that tantalized your taste buds and ignited your senses!"],
    userId: "624a6a677c8d9c9f5fd5eb0d", // Basem
    community: "624a6a677c8d9c9f5fd5eb27", // Gourmet Adventures
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb88",
    title: "Gastronomic Delights: Exploring Local Cuisine and Food Traditions",
    content: ["Dive into the world of gastronomy and explore local cuisine, food traditions, and authentic flavors from different regions and cultures!"],
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    community: "624a6a677c8d9c9f5fd5eb27", // Gourmet Adventures
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb89",
    title: "Culinary Experiments: Unleashing Creativity in the Kitchen",
    content: ["Experiment with new ingredients, innovative cooking techniques, and share your culinary creations that push the boundaries of traditional cuisine!"],
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    community: "624a6a677c8d9c9f5fd5eb27", // Gourmet Adventures
    comments: [],   
    type: "Post",
    isNsfw: false,
  },

  
  {
    _id: "624a6a677c8d9c9f5fd5eb8a",
    title: "Unraveling Pop Culture Mysteries: The Significance of Internet Memes",
    content: ["Join the discussion on internet memes, their cultural significance, and how they reflect the collective consciousness of today's society!"],
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    community: "624a6a677c8d9c9f5fd5eb28", // Pop Culture Fanatics
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb8b",
    title: "The Evolution of Pop Music: From Classics to Modern Hits",
    content: ["Explore the evolution of pop music, from the classic hits that shaped generations to the modern chart-toppers that dominate the airwaves!"],
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    community: "624a6a677c8d9c9f5fd5eb28", // Pop Culture Fanatics
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb8c",
    title: "Iconic Movie Quotes: Memorable Lines That Define Pop Culture",
    content: "Share your favorite movie quotes, iconic lines, and memorable moments that have become ingrained in pop culture history!",
    userId: "624a4a94c66738f13854b474", // Amira
    community: "624a6a677c8d9c9f5fd5eb28", // Pop Culture Fanatics
    comments: [],   
    type: "Post",
    isNsfw: false, 
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb8d",
    title: "Nostalgic TV Shows: Rediscovering Childhood Favorites",
    content: ["Take a trip down memory lane and reminisce about your favorite childhood TV shows, cartoons, and animated series that shaped your upbringing!"],
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    community: "624a6a677c8d9c9f5fd5eb28", // Pop Culture Fanatics
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb8e",
    title: "The Influence of Pop Culture: Trends, Fads, and Cultural Phenomena",
    content: ["Discuss the pervasive influence of pop culture on society, including trends, fads, and cultural phenomena that shape our lives and perceptions!"],
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    community: "624a6a677c8d9c9f5fd5eb28", // Pop Culture Fanatics
    comments: [],   
    type: "Post",
    isNsfw: false,
  },

  
  {
    _id: "624a6a677c8d9c9f5fd5eb8f",
    title: "Classic Hollywood Gems: Must-Watch Films from the Golden Age",
    content: ["Discover timeless classics from the golden age of Hollywood, featuring iconic performances, gripping plots, and unforgettable cinematic moments!"],
    userId: "624a4a94c66738f13854b474", // Amira
    community: "624a6a677c8d9c9f5fd5eb29", // Movie Buffs Club
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb90",
    title: "Hidden Movie Gems: Underrated Films That Deserve More Recognition",
    content: ["Share your favorite underrated films that have flown under the radar but deserve more recognition for their exceptional storytelling and performances!"],
    userId: "624a6a677c8d9c9f5fd5eb0d", // Basem
    community: "624a6a677c8d9c9f5fd5eb29", // Movie Buffs Club
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb91",
    title: "Modern Masterpieces: Recent Films That Redefined Cinema",
    content: ["Discuss recent films that have pushed the boundaries of storytelling, cinematography, and visual effects, leaving a lasting impact on the world of cinema!"],
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    community: "624a6a677c8d9c9f5fd5eb29", // Movie Buffs Club
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb92",
    title: "Cinematic Legends: Celebrating the Greatest Filmmakers of All Time",
    content: ["Pay tribute to the visionary directors, actors, and behind-the-scenes talents who have shaped the landscape of cinema and left an indelible mark on movie history!"],
    userId: "624a6a677c8d9c9f5fd5eb0c", // Mimo
    community: "624a6a677c8d9c9f5fd5eb29", // Movie Buffs Club
    comments: [],   
    type: "Post",
    isNsfw: false, 
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb93",
    title: "Movie Marathon Madness: Planning the Ultimate Film Fest",
    content: ["Share tips, recommendations, and themed movie marathon ideas for hosting the ultimate film fest with friends and family, complete with popcorn and cozy blankets!"],
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    community: "624a6a677c8d9c9f5fd5eb29", // Movie Buffs Club
    comments: [],   
    type: "Post",
    isNsfw: false, 
  },
  

  {
    _id: "624a6a677c8d9c9f5fd5eb94",
    title: "Soundtrack of Life: Songs That Define Your Journey",
    content: ["Share the songs that hold a special place in your heart and have accompanied you through life's ups and downs, shaping your personal soundtrack!"],
    userId: "624a6a677c8d9c9f5fd5eb0c", // Mimo
    community: "624a6a677c8d9c9f5fd5eb2a", // Music Maniacs Lounge
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb95",
    title: "Genre Exploration: Diving Deep into Musical Diversity",
    content: ["Embark on a musical journey across different genres and discover hidden gems, underrated artists, and diverse cultural influences that enrich the world of music!"],
    userId: "624a6a677c8d9c9f5fd5eb16", // Mahmoud
    community: "624a6a677c8d9c9f5fd5eb2a", // Music Maniacs Lounge
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb96",
    title: "Concert Chronicles: Memorable Moments from Live Shows",
    content: "Share your most unforgettable experiences from live concerts and music festivals, from electrifying performances to heartwarming interactions with fellow fans!",
    userId: "624a6a677c8d9c9f5fd5eb0b", // Abdullah
    community: "624a6a677c8d9c9f5fd5eb2a", // Music Maniacs Lounge
    comments: [],   
    type: "Post",
    isNsfw: false, 
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb97",
    title: "Musical Masterpieces: Iconic Albums That Stand the Test of Time",
    content: ["Discuss legendary albums that have left an enduring legacy, influencing generations of music lovers and shaping the evolution of musical genres!"],
    userId: "624a6a677c8d9c9f5fd5eb13", // Galal
    community: "624a6a677c8d9c9f5fd5eb2a", // Music Maniacs Lounge
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
  {
    _id: "624a6a677c8d9c9f5fd5eb98",
    title: "Musical Encounters: Stories of Serendipitous Discoveries",
    content: ["Share serendipitous encounters with music, from chance discoveries of new artists to unexpected connections with songs that resonate deeply with your soul!"],
    userId: "624a6a677c8d9c9f5fd5eb0e", // Basma
    community: "624a6a677c8d9c9f5fd5eb2a", // Music Maniacs Lounge
    comments: [],   
    type: "Post",
    isNsfw: false,
  },
];
  
exports.data = postSeedData;
  