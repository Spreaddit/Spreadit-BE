const moderatorSeedData = [
  {
    username: "amiraelgarf",
    communityName: "CodeCrafters",
    isAccepted: true,
  },
  {
    username: "galal12",
    communityName: "SpaceAndAstronomyLovers",
    isAccepted: true,
  },
  {
    username: "galal12",
    communityName: "CodeCrafters",
    isAccepted: false,
  },
  {
    username: "mahmoudabbas",
    communityName: "CodeCrafters",
    isAccepted: false,
  },
  {
    username: "mahmoudabbas",
    communityName: "TechTalks",
    isAccepted: true,
  },
  {
    username: "mahmoudabbas",
    communityName: "CodeGeeks",
    isAccepted: true,
  },
  {
    username: "mahmoud12",
    communityName: "ScienceExplorersClub",
    isAccepted: true,
  },
  {
    username: "mahmoud12",
    communityName: "BiologyBuffsSociety",
    isAccepted: false,
  },
  {
    username: "basma12",
    communityName: "BiologyBuffsSociety",
    isAccepted: true,
  },
  {
    username: "farouq12",
    communityName: "CreativeMindsCollective",
    isAccepted: true,
  },
  {
    username: "basma12",
    communityName: "VisualArtsGallery",
    isAccepted: true,
  },
  {
    username: "amiraelgarf",
    communityName: "Writers'Haven",
    isAccepted: true,
  },
  {
    username: "mimo123",
    communityName: "MindfulnessAndMeditation",
    isAccepted: true,
  },
  {
    username: "amiraelgarf",
    communityName: "MentalHealthSupportGroup",
    isAccepted: true,
  },
  {
    username: "mahmoud12",
    communityName: "PsychologyInsightsCircle",
    isAccepted: true,
  },
  {
    username: "farouq12",
    communityName: "GlobetrottersCommunity",
    isAccepted: true,
  },
  {
    username: "mahmoud12",
    communityName: "GlobetrottersCommunity",
    isAccepted: true,
  },
  {
    username: "abdullah12",
    communityName: "AdventurousSoulsSociety",
    isAccepted: true,
  },
  {
    username: "farouq12",
    communityName: "CulinaryDelights",
    isAccepted: true,
  },
  {
    username: "basemelgalfy",
    communityName: "CulinaryDelights",
    isAccepted: true,
  },
  {
    username: "farouq12",
    communityName: "CodeCrafters",
    isAccepted: true,
  },
  {
    username: "basemelgalfy",
    communityName: "GourmetAdventures",
    isAccepted: true,
  },
  {
    username: "basma12",
    communityName: "TechTalks",
    isAccepted: true,
  },
  {
    username: "basma12",
    communityName: "CreativeMindsCollective",
    isAccepted: true,
  },
  {
    username: "mahmoud12",
    communityName: "PopCultureFanatics",
    isAccepted: true,
  },
  {
    username: "amiraelgarf",
    communityName: "MovieBuffsClub",
    isAccepted: true,
  },
  {
    username: "mimo123",
    communityName: "MusicManiacsLounge",
    isAccepted: true,
  },
];

function addCreatedAtToModerators(moderatorData) {
  const now = Date.now();
  const moderatorObjects = [];

  for (let i = 0; i < moderatorData.length; i++) {
    const timeDifference = Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000);

    const managePostsAndComments = Math.random() < 0.8;
    const manageUsers = Math.random() < 0.8;
    const manageSettings = Math.random() < 0.8;
    const moderator = {
      ...moderatorData[i],
      createdAt: new Date(now - timeDifference),
      managePostsAndComments,
      manageUsers,
      manageSettings,
    };

    moderatorObjects.push(moderator);
  }
  return moderatorObjects;
}

const moderatedWithCreatedAt = addCreatedAtToModerators(moderatorSeedData);

exports.data = moderatedWithCreatedAt;
