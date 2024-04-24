//follow
//upvote comment/post
//post a comment or reply on one
//message
//post a post on a community
//invitation (revise with the other two teams)
//"comments": true,
//"upvotesComments": true,
//"upvotesPosts": true,
//"replies": true,
//"newFollowers": true,
//"invitations": true,
//"posts": true

const upvoteComments = {
    _id: "6240cd218b70b6ccc7a22cdf",
    name: "Upvote Comments",
};
  
  const commentReply = {
    _id: "6240cd3dde42068d353a2bdf",
    name: "Comment Reply",
  };
  
  const follow = {
    _id: "6240cd6b3516844208b542d4",
    name: "Follow",
  };
  
  const comment = {
    _id: "6240cd8b8b70b6ccc7a22ce0",
    name: "Comment",
  };
  
  const upvotePsts = {
    _id: "6240cddde4571e2cf49463f4",
    name: "Upvote Posts",
  };
  
  const moderatorInvitation = {
    _id: "6240cf6f53dab85c8756307f",
    name: "Moderator Invitation",
  };
  
  const notificationTypes = [
    upvoteComments,
    commentReply,
    follow,
    comment,
    upvotePsts,
    moderatorInvitation,
  ];
  
  exports.data = notificationTypes;
  exports.upvoteComments = upvoteComments;
  exports.follow = follow;
  exports.commentReply = commentReply;
  exports.comment = comment;
  exports.upvotePsts = upvotePsts;
  exports.moderatorInvitation = moderatorInvitation;
