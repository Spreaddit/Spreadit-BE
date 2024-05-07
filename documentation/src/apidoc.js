//#region Permissions
/**
 * @apiDefine Default Authentication is required
 **/

//#endregion Permissions

//#region Authentication
/**
 * @api {post} /signup Sign up
 * @apiVersion 0.1.0
 * @apiName SignUp
 * @apiGroup Authentication
 * @apiDescription Creates an account for the user, user can sign-up using his email or creating a username and creating a password.
 * A verification email is sent if the user is successfully created. Returns the user object in case it is created but not verified.
 * @apiSampleRequest off
 * @apiParam {String} email Email of the user
 * @apiParam {String} username Username of the user
 * @apiParam {String} password password of the user
 * @apiParam {Boolean} is_cross Indicates whether the user is from cross platform or not
 * @apiParamExample {json} Request-Example:
 * {
 *      "email": "amiraelgarf99@gmail.com",
 *      "username": "amira123",
 *      "password": "myPassword123",
 *      "isCross": true
 * }
 * @apiSuccess {user-object} user user of the sign up operation
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *       message: "User signed up successfully"
 * }
 * @apiError (400) {String} BadRequest  The server cannot or will not process the request due to something that is perceived to be a client error
 * @apiError (409) {String} Conflict  Indicates that the request could not be processed because of conflict in the current state of the resource
 * @apiError (500) {String} InternalServerError  The server encountered an unexpected condition which prevented it from fulfilling the request
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 409 Conflict
 * {
 *       message: "Email or username already exists"
 * }
 **/

/**
 * @api {post} /login Login
 * @apiVersion 0.1.0
 * @apiName LoginUser
 * @apiGroup Authentication
 * @apiDescription Generates authentication token for the user to login into the website. User can login usiing (email or username) and password
 * @apiSampleRequest off
 * @apiParam {String} email_or_username Email or Username of the user
 * @apiParam {String} password Password of the user
 * @apiParam {Boolean} [remember_me=false] Remember the logged in user
 * @apiParamExample {json} Request-Example:
 * {
 *      "username": "amira123",
 *      "password": "myPassw@ord123"
 * }
 * @apiSuccess {String} access_token JWT generated access token for the user
 * @apiSuccess {user-object} user user of the sign up operation
 * @apiSuccess {DateTime} token_expiration_date The date and time of token expiration
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *      "access_token": "AAAA%2FAAA%3DAAAAAAAAxxxxxx",
 *      "user" : {user-object},
 *      "token_expiration_date": "2020-01-01T00:00:00.000Z",
 *      "message": "User logged in successfully"
 * }
 * @apiError (400) {String} BadRequest  The server cannot or will not process the request due to something that is perceived to be a client error
 * @apiError (500) {String} InternalServerError  The server encountered an unexpected condition which prevented it from fulfilling the request
 * @apiError (401) {String} NotFound  The enetered credentials are invalid
 * @apiError (402) {String} The user is banned
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 401 NotFound
 * {
 *       message: "Invalid user credentials"
 * }
 **/

/**
 * @api {post} /google/oauth Authenticate with Google OAuth
 * @apiVersion 0.1.0
 * @apiName GoogleOAuth
 * @apiGroup Authentication
 * @apiDescription Authenticate with Google OAuth to sign in or sign up a user.
 * This endpoint verifies the Google OAuth token provided in the request and
 * either signs in an existing user or creates a new user if no user with the
 * Google ID exists.
 * @apiSampleRequest off
 *
 * @apiParam {String} googleToken Google OAuth token.
 * @apiParam {Boolean} [remember_me=false] Optional. Set to true to remember the logged-in user.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "googleToken": "<Google_OAuth_Token>",
 *    "remember_me": true
 * }
 *
 * @apiSuccess {String} access_token JWT access token for the user.
 * @apiSuccess {Object} user User object containing user details.
 * @apiSuccess {String} user._id User's unique ID.
 * @apiSuccess {String} user.name User's name.
 * @apiSuccess {String} user.email User's email address.
 * @apiSuccess {String} user.username User's username.
 * @apiSuccess {DateTime} token_expiration_date Date and time when the token expires.
 * @apiSuccess {String} message Success message indicating user signed in or signed up successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
 *       "user": {
 *              "id": "609cfff1c8b58f001d54ee1e",
 *               "name": "Amira El-garf",
 *               "username": "amira123",
 *               "email": "amiraelgarf99@gmail.com",
 *               "avatar_url": "https://example.com/avatar.jpg",
 *               "banner": "https://example.com/avatar.jpg",
 *               "followers_count": 100,
 *               "following_count": 50,
 *               "created_at": "2022-01-01T12:00:00.000Z",
 *               "role": "User",
 *               "nsfw": false,
 *               "activeInCommunityVisibility": true,
 *               "isVerified": true,
 *               "isVisible": false,
 *               "isActive": true,
 *               "isBanned": false,
 *               "displayName": "Amiraelgarf123",
 *               "bio": "active",
 *               "cakeDay": "2020-01-01",
 *               "subscribedCommunities": ["community1", "community2"]
 *               "favouriteCommunities": [],
 *               "socialLinks": [],
 *               "commentsOnYourPost": true,
 *               "commentsYouFollow": true,
 *               "upvotes": true,
 *               "selectedPollOption": "Predator-Prey Coevolution",
 *               "allowFollow": true
 *       },
 *       "token_expiration_date": "2024-04-08T12:00:00Z",
 *       "message": "User logged in successfully"
 *     }
 *
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 * @apiError (402) {String}  The user is banned
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal Server Error"
 *     }
 */

/**
 * @api {post} /forgot-password Forgot Password
 * @apiVersion 0.1.0
 * @apiName ForgotPassword
 * @apiGroup Authentication
 * @apiDescription Sends a password reset link to the user's email address.
 * If the provided username and email match, a password reset token is generated
 * and sent to the user's email.
 * @apiSampleRequest off
 *
 * @apiParam {String} username Username of the user.
 * @apiParam {String} email Email address of the user.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "username": "amira123",
 *    "email": "amiraelgarf99.com"
 * }
 *
 * @apiSuccess {String} message Success message indicating password reset link sent successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Password reset link sent successfully"
 *     }
 *
 * @apiError (404) UserNotFound User with the provided username not found.
 *
 * @apiError (400) InvalidEmail Username and email do not match.
 *
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "User not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Error, wrong email"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {post} /app/forgot-password Forgot Password (App)
 * @apiVersion 0.1.0
 * @apiName ForgotPasswordApp
 * @apiGroup Authentication
 * @apiDescription Sends a password reset link to the user's email address.
 * If the provided username or email matches a user in the system, a password
 * reset token is generated and sent to the user's email.
 * @apiSampleRequest off
 *
 * @apiParam {String} usernameOremail User's email address or username.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "usernameOremail": "amiraelgarf99@gmail.com"
 * }
 *
 * @apiSuccess {String} message Success message indicating password reset link sent successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Password reset link sent successfully"
 *     }
 *
 * @apiError (400) BadRequest Email or username is required.
 *
 * @apiError (404) UserNotFound User with the provided email or username not found.
 *
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Email or username is required"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "User not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {post} /reset-password-by-token Reset Password by Token
 * @apiVersion 0.1.0
 * @apiName ResetPasswordByToken
 * @apiGroup Authentication
 * @apiDescription Resets the user's password using a valid reset token.
 * If the provided reset token is valid and not expired, the user's password
 * is updated with the new password provided in the request body.
 * @apiSampleRequest off
 *
 * @apiParam {String} resetToken Reset token generated for password reset.
 * @apiParam {String} password New password to be set for the user.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "emailToken": "valid_reset_token",
 *    "password": "newPassword123"
 * }
 *
 * @apiSuccess {String} message Success message indicating password reset successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Password reset successfully"
 *     }
 *
 * @apiError (400) InvalidToken Invalid or expired reset token.
 *
 * @apiError (404) UserNotFound User associated with the reset token not found.
 *
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Invalid or expired reset token"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "User not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {get} /reset-password/user-info Get User Information to reset password
 * @apiVersion 0.1.0
 * @apiName GetUserInfoToResetPassword
 * @apiGroup User
 * @apiDescription Retrieves basic information about the logged-in user so that he resets his password
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User Authorization token.
 *
 * @apiSuccess {String} avatar URL of the user's avatar image.
 * @apiSuccess {String} email Email address of the user.
 * @apiSuccess {String} username Username of the user.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "avatar": "https://example.com/avatar.jpg",
 *       "email": "amiraelgarf99@gmail",
 *       "username": "amira123"
 *     }
 *
 * @apiError (401) Unauthorized Token is required.
 *
 * @apiError (404) NotFound User not found.
 *
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "Token is required"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "User not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {post} /reset-password Reset Password
 * @apiVersion 0.1.0
 * @apiName ResetPassword
 * @apiGroup Authentication
 * @apiDescription Resets the user's password using a valid authentication token and current password.
 * If the provided authentication token is valid and matches the current user, and the current password is correct,
 * the user's password is updated with the new password provided in the request body.
 * @apiSampleRequest off
 *
 * @apiParam {String} token User authentication token.
 * @apiParam {String} newPassword New password to be set for the user.
 * @apiParam {String} currentPassword Current password for the user's account.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "token": "valid_authentication_token",
 *    "newPassword": "newPassword123",
 *    "currentPassword": "currentPassword123"
 * }
 *
 * @apiSuccess {String} message Success message indicating password reset successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Password reset successfully"
 *     }
 *
 * @apiError (401) Unauthorized Token is required.
 *
 * @apiError (404) UserNotFound User not found.
 *
 * @apiError (400) InvalidPassword Invalid current password.
 *
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "Token is required"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "User not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Invalid current password"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {post} /verify-email/:emailToken Verify Email
 * @apiVersion 0.1.0
 * @apiName VerifyEmail
 * @apiGroup Authentication
 * @apiDescription Verifies the user's email using the email verification token.
 * If the provided email verification token is valid, the user's email is marked as verified.
 * @apiSampleRequest off
 *
 * @apiParam {String} emailToken Email verification token.
 *
 * @apiSuccess {String} message Success message indicating email verification success.
 * @apiSuccess {String} accessToken Generated user token.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Email verified successfully"
 *       "accessToken": "AAAA%2FAAA%3DAAAAAAAAxxxxxx"
 *     }
 *
 * @apiError (401) Unauthorized Token is required.
 *
 * @apiError (404) UserNotFound User not found.
 *
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "Token is required"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "User not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {post} /check-username Check Username Availability
 * @apiVersion 0.1.0
 * @apiName CheckUsernameAvailability
 * @apiGroup User
 * @apiDescription Checks the availability of a username.
 * @apiSampleRequest off
 *
 * @apiParam {String} username Username to be checked for availability.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "username": "amira123"
 * }
 *
 * @apiSuccess {Boolean} available Indicates whether the username is available (true) or not (false).
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "available": true
 *     }
 *
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */
/**
 * @api {post} /forgot-username Forgot Username
 * @apiVersion 0.1.0
 * @apiName ForgotUsername
 * @apiGroup Authentication
 * @apiDescription Retrieves the username associated with the provided email address and sends it to the user's email.
 * @apiSampleRequest off
 *
 * @apiParam {String} email Email address of the user.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "email": "amiraelgarf99@gmail.com.com"
 * }
 *
 * @apiSuccess {String} message Success message indicating username sent successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Username sent successfully"
 *     }
 *
 * @apiError (404) NotFound User not found.
 *
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "User not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

//#endregion Authentication

//#region Comments

/**
 * @api {post} /post/comment/:postId Add Comment to Post
 * @apiVersion 0.1.0
 * @apiName AddCommentToPost
 * @apiGroup Comments
 * @apiDescription Add a comment to a specific post.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} postId ID of the post to which the comment will be added.
 * @apiParam {String} content Content of the comment.
 * @apiParam {String} [fileType] Type of file being attached (e.g., image, video).
 * @apiParam {File[]} [attachments] Array of media files attached to the comment (optional).
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "content": "This is a comment on the post",
 *    "fileType": "image",
 *    "attachments": ["attachment1.jpg", "attachment2.jpg"]
 * }
 *
 * @apiSuccess {Object} comment Object representing the added comment.
 * @apiSuccess {String} comment._id ID of the comment.
 * @apiSuccess {String} comment.content Content of the comment.
 * @apiSuccess {Object} comment.user User object representing the author of the comment.
 * @apiSuccess {String} comment.user.id ID of the user who posted the comment.
 * @apiSuccess {String} comment.user.name Name of the user who posted the comment.
 * @apiSuccess {String} comment.user.username Username of the user who posted the comment.
 * @apiSuccess {String} comment.user.email Email of the user who posted the comment.
 * @apiSuccess {String} comment.user.googleId Google ID of the user who posted the comment.
 * @apiSuccess {String} comment.user.birth_date Birth date of the user who posted the comment.
 * @apiSuccess {String} comment.user.phone Phone number of the user who posted the comment.
 * @apiSuccess {String} comment.user.avatar_url URL of the user's avatar.
 * @apiSuccess {String} comment.user.banner URL of the user's banner.
 * @apiSuccess {String} comment.user.location Location of the user who posted the comment.
 * @apiSuccess {String} comment.user.bio Bio of the user who posted the comment.
 * @apiSuccess {Number} comment.user.followers_count Number of followers of the user who posted the comment.
 * @apiSuccess {Number} comment.user.following_count Number of users followed by the user who posted the comment.
 * @apiSuccess {Date} comment.user.created_at Date when the user who posted the comment was created.
 * @apiSuccess {String} comment.user.role Role of the user who posted the comment.
 * @apiSuccess {Boolean} comment.user.nsfw Flag indicating if the user who posted the comment has NSFW content.
 * @apiSuccess {Boolean} comment.user.activeInCommunityVisibility Flag indicating if the user who posted the comment is active in community visibility.
 * @apiSuccess {Boolean} comment.user.isVerified Flag indicating if the user who posted the comment is verified.
 * @apiSuccess {String} comment.user.displayName Display name of the user who posted the comment.
 * @apiSuccess {String} comment.user.about About information of the user who posted the comment.
 * @apiSuccess {String} comment.user.cakeDay Cake day of the user who posted the comment.
 * @apiSuccess {String[]} comment.user.subscribedCommunities List of communities subscribed by the user who posted the comment.
 * @apiSuccess {Number} comment.likes_count Number of likes received by the comment.
 * @apiSuccess {Number} comment.replies_count Number of replies to the comment.
 * @apiSuccess {Boolean} comment.is_reply Indicates if the comment is a reply to another comment.
 * @apiSuccess {String[]} comment.media Array of URLs of attached media files.
 * @apiSuccess {Date} comment.created_at Date and time when the comment was created.
 * @apiSuccess {Boolean} comment.is_hidden Indicates if the comment is hidden.
 * @apiSuccess {Boolean} comment.is_saved Indicates if the comment is saved.
 * @apiSuccess {String} comment.post_title Title of the post to which the comment belongs.
 * @apiSuccess {String} comment.community_title Title of the community where the post belongs.
 * @apiSuccess {Boolean} comment.is_upvoted if the comment is upvoted by the user
 * @apiSuccess {Boolean} comment.is_downvoted if the comment is upvoted by the user
 * @apiSuccess {Boolean} comment.is_removed if the comment is removed by the moderator
 * @apiSuccess {Boolean} comment.is_approved if the comment is approved by the moderator
 * @apiSuccess {Boolean} comment.is_locked if the comment is locked by the moderator
 * @apiSuccess {Boolean} comment.is_removal if the comment is a removal reason
 * @apiSuccess {commentObject[]} comment.replies if the comment has a reply by default empty array
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "comment": {
 *           "_id": "609d0f23c8b58f001d54ee1f",
 *           "content": "This is a comment on the post",
 *           "user": {
 *               "id": "609cfff1c8b58f001d54ee1e",
 *               "name": "Amira El-garf",
 *               "username": "amira123",
 *               "email": "amiraelgarf99@gmail.com",
 *               "avatar_url": "https://example.com/avatar.jpg",
 *               "banner": "https://example.com/avatar.jpg",
 *               "followers_count": 100,
 *               "following_count": 50,
 *               "created_at": "2022-01-01T12:00:00.000Z",
 *               "role": "User",
 *               "nsfw": false,
 *               "activeInCommunityVisibility": true,
 *               "isVerified": true,
 *               "isVisible": false,
 *               "isActive": true,
 *               "isBanned": false,
 *               "displayName": "Amiraelgarf123",
 *               "bio": "active",
 *               "cakeDay": "2020-01-01",
 *               "subscribedCommunities": ["community1", "community2"]
 *               "favouriteCommunities": [],
 *               "socialLinks": [],
 *               "commentsOnYourPost": true,
 *               "commentsYouFollow": true,
 *               "upvotes": true,
 *               "selectedPollOption": "Predator-Prey Coevolution",
 *               "allowFollow": true
 *           },
 *           "likes_count": 10,
 *           "replies_count": 5,
 *           "is_reply": false,
 *           "media": [
 *               { "type": "image", "link": "https://example.com/attachment1.jpg" },
 *               { "type": "image", "link": "https://example.com/attachment2.jpg" }
 *           ],
 *           "created_at": "2022-05-14T12:00:00.000Z",
 *           "is_hidden": false,
 *           "is_saved": false,
 *           "post_title": "Sample Post Title",
 *           "community_title": "Sample Community",
 *           "is_upvoted": true,
 *           "is_downvoted": false,
 *           "is_removed": false,
 *           "is_approved": true,
 *           "is_locked": false,
 *           "is_removal": false,
 *           "replies": []
 *       },
 *       "message": "Comment has been added successfully"
 *     }
 *
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound Post not found.
 * @apiError (403) Comments are locked for this post.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Comment content is required"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Bad Request
 *     {
 *       "message": "Comments are locked for this post"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "Unauthorized"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Post not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */
/**
 * @api {delete} /posts/comment/delete/:commentId Delete Comment
 * @apiVersion 0.1.0
 * @apiName DeleteComment
 * @apiGroup Comment
 * @apiDescription Deletes a comment.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} commentId ID of the comment to be deleted.
 *
 * @apiSuccess {Object} comment Object representing the deleted comment.
 * @apiSuccess {String} comment._id ID of the deleted comment.
 * @apiSuccess {String} comment.content Content of the deleted comment.
 * @apiSuccess {String} comment.userId ID of the user who posted the deleted comment.
 * @apiSuccess {String} comment.postId ID of the post to which the deleted comment belongs.
 * @apiSuccess {String[]} comment.attachments Array of URLs of attached media files of the deleted comment.
 * @apiSuccess {Date} comment.createdAt Date and time when the deleted comment was created.
 * @apiSuccess {Date} comment.updatedAt Date and time when the deleted comment was last updated.
 * @apiSuccess {Boolean} comment.is_upvoted if the comment is upvoted by the user
 * @apiSuccess {Boolean} comment.is_downvoted if the comment is upvoted by the user
 * @apiSuccess {Boolean} comment.is_removed if the comment is removed by the moderator
 * @apiSuccess {Boolean} comment.is_approved if the comment is approved by the moderator
 * @apiSuccess {Boolean} comment.is_locked if the comment is locked by the moderator
 * @apiSuccess {Boolean} comment.is_removal if the comment is a removal reason
 * @apiSuccess {commentObject[]} comment.replies if the comment has a reply by default empty array
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "comment": {
 *           "_id": "609d0f23c8b58f001d54ee1f",
 *           "content": "This is a comment on the post",
 *           "userId": "609cfff1c8b58f001d54ee1e",
 *           "postId": "609cfeefc8b58f001d54ee1d",
 *           "attachments": ["https://example.com/attachment1.jpg", "https://example.com/attachment2.jpg"],
 *           "createdAt": "2022-05-14T12:00:00.000Z",
 *           "updatedAt": "2022-05-14T12:00:00.000Z",
 *           "is_upvoted": true,
 *           "is_downvoted": false,
 *           "is_removed": false,
 *           "is_approved": true,
 *           "is_locked": false,
 *           "is_removal": false,
 *           "replies": []
 *       },
 *       "message": "Comment deleted successfully"
 *     }
 *
 * @apiError (403) Forbidden User is not authorized to delete this comment.
 * @apiError (404) NotFound Comment not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "message": "You are not authorized to delete this comment"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Comment not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal Server Error"
 *     }
 */
/**
 * @api {get} /posts/comment/:postId Get Comments for Post
 * @apiVersion 0.1.0
 * @apiName GetCommentsForPost
 * @apiGroup Comment
 * @apiDescription Retrieves comments for a specific post.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} postId ID of the post for which comments will be retrieved.
 * @apiParam {Boolean} [include_replies=false] Flag to include replies for each comment (optional).
 *
 * @apiSuccess {Object[]} comments Array of objects representing comments.
 * @apiSuccess {String} comments._id ID of the comment.
 * @apiSuccess {String} comments.content Content of the comment.
 * @apiSuccess {Object} comments.user Object representing the user who posted the comment.
 * @apiSuccess {String} comments.user._id ID of the user who posted the comment.
 * @apiSuccess {String} comments.user.name Name of the user who posted the comment.
 * @apiSuccess {String} comments.user.username Username of the user who posted the comment.
 * @apiSuccess {Number} comments.likes_count Number of likes for the comment.
 * @apiSuccess {Number} comments.replies_count Number of replies for the comment.
 * @apiSuccess {Boolean} comments.is_reply Indicates if the comment is a reply to another comment.
 * @apiSuccess {String[]} comments.media Array of URLs of attached media files of the comment.
 * @apiSuccess {Date} comments.created_at Date and time when the comment was created.
 * @apiSuccess {Boolean} comments.is_hidden Indicates if the comment is hidden.
 * @apiSuccess {Boolean} comments.is_saved Indicates if the comment is saved.
 * @apiSuccess {String} comments.post_title Title of the post to which the comment belongs.
 * @apiSuccess {String} comments.community_title Title of the community where the post belongs.
 * @apiSuccess {Boolean} comments.is_upvoted if the comment is upvoted by the user
 * @apiSuccess {Boolean} comments.is_downvoted if the comment is upvoted by the user
 * @apiSuccess {Boolean} comments.is_removed if the comment is removed by the moderator
 * @apiSuccess {Boolean} comments.is_approved if the comment is approved by the moderator
 * @apiSuccess {Boolean} comments.is_locked if the comment is locked by the moderator
 * @apiSuccess {Boolean} comments.is_removal if the comment is a removal reason
 * @apiSuccess {commentObject[]} comment.replies if the comment has a reply only if includes_reply=true
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "comments": [
 *            {
 *           "_id": "609d0f23c8b58f001d54ee1f",
 *           "content": "This is a comment on the post",
 *           "user": {
 *               "id": "609cfff1c8b58f001d54ee1e",
 *               "name": "Amira El-garf",
 *               "username": "amira123",
 *               "email": "amiraelgarf99@gmail.com",
 *               "avatar_url": "https://example.com/avatar.jpg",
 *               "banner": "https://example.com/avatar.jpg",
 *               "followers_count": 100,
 *               "following_count": 50,
 *               "created_at": "2022-01-01T12:00:00.000Z",
 *               "role": "User",
 *               "nsfw": false,
 *               "activeInCommunityVisibility": true,
 *               "isVerified": true,
 *               "isVisible": false,
 *               "isActive": true,
 *               "isBanned": false,
 *               "displayName": "Amiraelgarf123",
 *               "bio": "active",
 *               "cakeDay": "2020-01-01",
 *               "subscribedCommunities": ["community1", "community2"]
 *               "favouriteCommunities": [],
 *               "socialLinks": [],
 *               "commentsOnYourPost": true,
 *               "commentsYouFollow": true,
 *               "upvotes": true,
 *               "selectedPollOption": "Predator-Prey Coevolution",
 *               "allowFollow": true
 *           },
 *           "likes_count": 10,
 *           "replies_count": 5,
 *           "is_reply": false,
 *           "media": [
 *               { "type": "image", "link": "https://example.com/attachment1.jpg" },
 *               { "type": "image", "link": "https://example.com/attachment2.jpg" }
 *           ],
 *           "created_at": "2022-05-14T12:00:00.000Z",
 *           "is_hidden": false,
 *           "is_saved": false,
 *           "post_title": "Sample Post Title",
 *           "community_title": "Sample Community",
 *           "is_upvoted": true,
 *           "is_removed": false,
 *           "is_approved": true,
 *           "is_locked": false,
 *           "is_removal": false,
 *           "is_downvoted": false,
 *           "replies": []
 *       }
 *       ],
 *       "message": "Comments have been retrieved successfully"
 *     }
 *
 * @apiError (404) NotFound No comments found for the given post ID.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "No comments found for the given post ID"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {get} /comments/user/:username Get Comments by User
 * @apiVersion 0.1.0
 * @apiName GetCommentsByUser
 * @apiGroup Comment
 * @apiDescription Retrieves comments posted by a specific user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} username Username of the user whose comments will be retrieved.
 * @apiParam {Boolean} [include_replies=false] Flag to include replies for each comment (optional).
 *
 * @apiSuccess {Object[]} comments Array of objects representing comments posted by the user.
 * @apiSuccess {String} comments._id ID of the comment.
 * @apiSuccess {String} comments.content Content of the comment.
 * @apiSuccess {Object} comments.user Object representing the user who posted the comment.
 * @apiSuccess {String} comments.user._id ID of the user who posted the comment.
 * @apiSuccess {String} comments.user.name Name of the user who posted the comment.
 * @apiSuccess {String} comments.user.username Username of the user who posted the comment.
 * @apiSuccess {Number} comments.likes_count Number of likes for the comment.
 * @apiSuccess {Number} comments.replies_count Number of replies for the comment.
 * @apiSuccess {Boolean} comments.is_reply Indicates if the comment is a reply to another comment.
 * @apiSuccess {String[]} comments.media Array of URLs of attached media files of the comment.
 * @apiSuccess {Date} comments.created_at Date and time when the comment was created.
 * @apiSuccess {Boolean} comments.is_hidden Indicates if the comment is hidden.
 * @apiSuccess {Boolean} comments.is_saved Indicates if the comment is saved.
 * @apiSuccess {String} comments.post_title Title of the post to which the comment belongs.
 * @apiSuccess {String} comments.community_title Title of the community where the post belongs.
 * @apiSuccess {Boolean} comments.is_upvoted if the comment is upvoted by the user
 * @apiSuccess {Boolean} comments.is_downvoted if the comment is upvoted by the user
 * @apiSuccess {Boolean} comments.is_removed if the comment is removed by the moderator
 * @apiSuccess {Boolean} comments.is_approved if the comment is approved by the moderator
 * @apiSuccess {Boolean} comments.is_locked if the comment is locked by the moderator
 * @apiSuccess {Boolean} comments.is_removal if the comment is a removal reason
 * @apiSuccess {commentObject[]} comment.replies if the comment has a reply by default empty
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "comments": [
 *           {
 *           "_id": "609d0f23c8b58f001d54ee1f",
 *           "content": "This is a comment on the post",
 *           "user": {
 *               "id": "609cfff1c8b58f001d54ee1e",
 *               "name": "Amira El-garf",
 *               "username": "amira123",
 *               "email": "amiraelgarf99@gmail.com",
 *               "avatar_url": "https://example.com/avatar.jpg",
 *               "banner": "https://example.com/avatar.jpg",
 *               "followers_count": 100,
 *               "following_count": 50,
 *               "created_at": "2022-01-01T12:00:00.000Z",
 *               "role": "User",
 *               "nsfw": false,
 *               "activeInCommunityVisibility": true,
 *               "isVerified": true,
 *               "isVisible": false,
 *               "isActive": true,
 *               "isBanned": false,
 *               "displayName": "Amiraelgarf123",
 *               "bio": "active",
 *               "cakeDay": "2020-01-01",
 *               "subscribedCommunities": ["community1", "community2"]
 *               "favouriteCommunities": [],
 *               "socialLinks": [],
 *               "commentsOnYourPost": true,
 *               "commentsYouFollow": true,
 *               "upvotes": true,
 *               "selectedPollOption": "Predator-Prey Coevolution",
 *               "allowFollow": true
 *           },
 *           "likes_count": 10,
 *           "replies_count": 5,
 *           "is_reply": false,
 *           "media": [
 *               { "type": "image", "link": "https://example.com/attachment1.jpg" },
 *               { "type": "image", "link": "https://example.com/attachment2.jpg" }
 *           ],
 *           "created_at": "2022-05-14T12:00:00.000Z",
 *           "is_hidden": false,
 *           "is_saved": false,
 *           "post_title": "Sample Post Title",
 *           "community_title": "Sample Community",
 *           "is_upvoted": true,
 *           "is_downvoted": false,
 *           "is_removed": false,
 *           "is_approved": true,
 *           "is_locked": false,
 *           "is_removal": false,
 *           "replies": []
 *       },
 *       ],
 *       "message": "Comments for the user have been retrieved successfully"
 *     }
 *
 * @apiError (404) NotFound No comments found for the user.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "No comments found for the user"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {get} /comments/saved/user Get Saved Comments by User
 * @apiVersion 0.1.0
 * @apiName GetSavedCommentsByUser
 * @apiGroup Comment
 * @apiDescription Retrieves saved comments by the authenticated user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {Boolean} [include_replies=false] Flag to include replies for each comment (optional).
 *
 * @apiSuccess {Object[]} comments Array of objects representing saved comments by the user.
 * @apiSuccess {String} comments._id ID of the comment.
 * @apiSuccess {String} comments.content Content of the comment.
 * @apiSuccess {Object} comments.user Object representing the user who posted the comment.
 * @apiSuccess {String} comments.user._id ID of the user who posted the comment.
 * @apiSuccess {String} comments.user.name Name of the user who posted the comment.
 * @apiSuccess {String} comments.user.username Username of the user who posted the comment.
 * @apiSuccess {Number} comments.likes_count Number of likes for the comment.
 * @apiSuccess {Number} comments.replies_count Number of replies for the comment.
 * @apiSuccess {Boolean} comments.is_reply Indicates if the comment is a reply to another comment.
 * @apiSuccess {String[]} comments.media Array of URLs of attached media files of the comment.
 * @apiSuccess {Date} comments.created_at Date and time when the comment was created.
 * @apiSuccess {Boolean} comments.is_hidden Indicates if the comment is hidden.
 * @apiSuccess {Boolean} comments.is_saved Indicates if the comment is saved.
 * @apiSuccess {String} comments.post_title Title of the post to which the comment belongs.
 * @apiSuccess {String} comments.community_title Title of the community where the post belongs.
 * @apiSuccess {Boolean} comments.is_upvoted if the comment is upvoted by the user
 * @apiSuccess {Boolean} comments.is_downvoted if the comment is upvoted by the user
 * @apiSuccess {Boolean} comments.is_removed if the comment is removed by the moderator
 * @apiSuccess {Boolean} comments.is_approved if the comment is approved by the moderator
 * @apiSuccess {Boolean} comments.is_locked if the comment is locked by the moderator
 * @apiSuccess {Boolean} comments.is_removal if the comment is a removal reason
 * @apiSuccess {commentObject[]} comment.replies if the comment has a reply only if includes_reply=true
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "comments": [
 *           "comment": {
 *           "_id": "609d0f23c8b58f001d54ee1f",
 *           "content": "This is a comment on the post",
 *           "user": {
 *               "id": "609cfff1c8b58f001d54ee1e",
 *               "name": "Amira El-garf",
 *               "username": "amira123",
 *               "email": "amiraelgarf99@gmail.com",
 *               "avatar_url": "https://example.com/avatar.jpg",
 *               "banner": "https://example.com/avatar.jpg",
 *               "followers_count": 100,
 *               "following_count": 50,
 *               "created_at": "2022-01-01T12:00:00.000Z",
 *               "role": "User",
 *               "nsfw": false,
 *               "activeInCommunityVisibility": true,
 *               "isVerified": true,
 *               "isVisible": false,
 *               "isActive": true,
 *               "isBanned": false,
 *               "displayName": "Amiraelgarf123",
 *               "bio": "active",
 *               "cakeDay": "2020-01-01",
 *               "subscribedCommunities": ["community1", "community2"]
 *               "favouriteCommunities": [],
 *               "socialLinks": [],
 *               "commentsOnYourPost": true,
 *               "commentsYouFollow": true,
 *               "upvotes": true,
 *               "selectedPollOption": "Predator-Prey Coevolution",
 *               "allowFollow": true
 *           },
 *           "likes_count": 10,
 *           "replies_count": 5,
 *           "is_reply": false,
 *           "media": [
 *               { "type": "image", "link": "https://example.com/attachment1.jpg" },
 *               { "type": "image", "link": "https://example.com/attachment2.jpg" }
 *           ],
 *           "created_at": "2022-05-14T12:00:00.000Z",
 *           "is_hidden": false,
 *           "is_saved": false,
 *           "post_title": "Sample Post Title",
 *           "community_title": "Sample Community",
 *           "is_upvoted": true,
 *           "is_removed": false,
 *           "is_approved": true,
 *           "is_locked": false,
 *           "is_removal": false,
 *           "is_downvoted": false,
 *           "replies": []
 *       },
 *       ],
 *       "message": "Saved Comments for the user have been retrieved successfully"
 *     }
 *
 * @apiError (404) NotFound No saved comments found for the user.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "No saved comments found for the user"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */
/**
 * @api {post} /comments/:commentId/edit Edit Comment
 * @apiVersion 0.1.0
 * @apiName EditComment
 * @apiGroup Comment
 * @apiDescription Edits a comment.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} commentId ID of the comment to be edited.
 * @apiParam {String} content Updated content of the comment.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "content": "Updated content of the comment"
 * }
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Comment has been updated successfully"
 *     }
 *
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (403) Forbidden User is not authorized to edit the comment.
 * @apiError (404) NotFound Comment not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Updated content is required"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "message": "You are not authorized to edit this comment"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Comment not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {post} /comment/:parentCommentId/reply Add Reply to Comment
 * @apiVersion 0.1.0
 * @apiName AddReplyToComment
 * @apiGroup Comment
 * @apiDescription Adds a reply to a parent comment.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} parentCommentId ID of the parent comment to which the reply will be added.
 * @apiParam {String} content Content of the reply.
 * @apiParam {String} [fileType] Type of the attached file (optional).
 * @apiParam {File[]} [attachments] Array of media files attached to the reply (optional).
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "content": "This is a reply to the parent comment",
 *    "fileType": "image",
 *    "attachments": ["attachment1.jpg", "attachment2.jpg"]
 * }
 *
 * @apiSuccess {Object} reply Object representing the added reply.
 * @apiSuccess {String} reply.id ID of the reply.
 * @apiSuccess {String} reply.content Content of the reply.
 * @apiSuccess {String} reply.user.id ID of the user who posted the reply.
 * @apiSuccess {String} reply.user.name Name of the user who posted the reply.
 * @apiSuccess {String} reply.user.username Username of the user who posted the reply.
 * @apiSuccess {String} reply.user.email Email of the user who posted the reply.
 * @apiSuccess {String} reply.user.googleId Google ID of the user who posted the reply.
 * @apiSuccess {String} reply.user.birth_date Birth date of the user who posted the reply.
 * @apiSuccess {String} reply.user.phone Phone number of the user who posted the reply.
 * @apiSuccess {String} reply.user.avatar_url URL of the user's avatar.
 * @apiSuccess {String} reply.user.banner URL of the user's banner.
 * @apiSuccess {String} reply.user.location Location of the user who posted the reply.
 * @apiSuccess {String} reply.user.bio Bio of the user who posted the reply.
 * @apiSuccess {Number} reply.user.followers_count Number of followers of the user who posted the reply.
 * @apiSuccess {Number} reply.user.following_count Number of users followed by the user who posted the reply.
 * @apiSuccess {Date} reply.user.created_at Date when the user who posted the reply was created.
 * @apiSuccess {String} reply.user.role Role of the user who posted the reply.
 * @apiSuccess {Boolean} reply.user.nsfw Flag indicating if the user who posted the reply has NSFW content.
 * @apiSuccess {Boolean} reply.user.activeInCommunityVisibility Flag indicating if the user who posted the reply is active in community visibility.
 * @apiSuccess {Boolean} reply.user.isVerified Flag indicating if the user who posted the reply is verified.
 * @apiSuccess {String} reply.user.displayName Display name of the user who posted the reply.
 * @apiSuccess {String} reply.user.about About information of the user who posted the reply.
 * @apiSuccess {String} reply.user.cakeDay Cake day of the user who posted the reply.
 * @apiSuccess {String[]} reply.user.subscribedCommunities List of communities subscribed by the user who posted the reply.
 * @apiSuccess {Number} reply.likes_count Number of likes received by the reply.
 * @apiSuccess {Number} reply.replies_count Number of replies received by the reply.
 * @apiSuccess {Boolean} reply.is_reply Indicates whether the reply is itself a reply to another comment.
 * @apiSuccess {String[]} reply.media Array of URLs of media files attached to the reply.
 * @apiSuccess {Date} reply.created_at Date and time when the reply was created.
 * @apiSuccess {Boolean} reply.is_hidden Indicates whether the reply is hidden.
 * @apiSuccess {Boolean} reply.is_saved Indicates whether the reply is saved by the authenticated user.
 * @apiSuccess {String} reply.post_title Title of the post to which the comment belongs.
 * @apiSuccess {String} reply.community_title Title of the community to which the comment belongs.
 * @apiSuccess {String} message Success message indicating that the reply has been added successfully.
 * @apiSuccess {Boolean} reply.is_upvoted if the reply is upvoted by the user
 * @apiSuccess {Boolean} reply.is_downvoted if the reply is upvoted by the user
 * @apiSuccess {Boolean} reply.is_removed if the reply is removed by the moderator
 * @apiSuccess {Boolean} reply.is_approved if the reply is approved by the moderator
 * @apiSuccess {Boolean} reply.is_locked if the reply is locked by the moderator
 * @apiSuccess {Boolean} reply.is_removal if the reply is a removal reason
 * @apiSuccess {replyObject[]} reply.replies if the reply has a reply by default empty array
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "reply": {
 *           "id": "609d0f23c8b58f001d54ee1f",
 *           "content": "This is a reply to the parent comment",
 *           "user": {
 *               "id": "609cfff1c8b58f001d54ee1e",
 *               "name": "Amira El-garf",
 *               "username": "amira123",
 *               "email": "amiraelgarf99@gmail.com",
 *               "avatar_url": "https://example.com/avatar.jpg",
 *               "banner": "https://example.com/avatar.jpg",
 *               "followers_count": 100,
 *               "following_count": 50,
 *               "created_at": "2022-01-01T12:00:00.000Z",
 *               "role": "User",
 *               "nsfw": false,
 *               "activeInCommunityVisibility": true,
 *               "isVerified": true,
 *               "isVisible": false,
 *               "isActive": true,
 *               "isBanned": false,
 *               "displayName": "Amiraelgarf123",
 *               "bio": "active",
 *               "cakeDay": "2020-01-01",
 *               "subscribedCommunities": ["community1", "community2"]
 *               "favouriteCommunities": [],
 *               "socialLinks": [],
 *               "commentsOnYourPost": true,
 *               "commentsYouFollow": true,
 *               "upvotes": true,
 *               "selectedPollOption": "Predator-Prey Coevolution",
 *               "allowFollow": true
 *           },
 *           "likes_count": 0,
 *           "replies_count": 0,
 *           "is_reply": true,
 *           "media": ["https://example.com/attachment1.jpg"],
 *           "created_at": "2022-05-14T12:00:00.000Z",
 *           "is_hidden": false,
 *           "is_saved": false,
 *           "post_title": "Example Post",
 *           "community_title": "Example Community",
 *           "is_upvoted": true,
 *           "is_removed": false,
 *           "is_approved": true,
 *           "is_locked": false,
 *           "is_removal": false,
 *           "is_downvoted": false,
 *           "replies": []
 *       },
 *       "message": "Reply has been added successfully"
 *     }
 *
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (404) NotFound Parent comment not found.
 * @apiError (403) Comments are locked for this post.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Reply content is required"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Bad Request
 *     {
 *       "message": "Comments are locked for this post"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Parent comment not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {get} /comments/:commentId/replies Get Replies for Comment
 * @apiVersion 0.1.0
 * @apiName GetRepliesForComment
 * @apiGroup Comment
 * @apiDescription Retrieves all replies for a specific comment.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} commentId ID of the comment for which replies will be retrieved.
 *
 * @apiSuccess {Object[]} replies Array of reply objects for the specified comment.
 * @apiSuccess {String} replies.id ID of the reply.
 * @apiSuccess {String} replies.content Content of the reply.
 * @apiSuccess {Object} replies.user Object representing the user who posted the reply.
 * @apiSuccess {String} replies.user.id ID of the user who posted the reply.
 * @apiSuccess {String} replies.user.username Username of the user who posted the reply.
 * @apiSuccess {Number} replies.likes_count Number of likes received by the reply.
 * @apiSuccess {Number} replies.replies_count Number of replies received by the reply.
 * @apiSuccess {Boolean} replies.is_reply Indicates whether the reply is itself a reply to another comment.
 * @apiSuccess {String[]} replies.media Array of URLs of media files attached to the reply.
 * @apiSuccess {Date} replies.created_at Date and time when the reply was created.
 * @apiSuccess {Boolean} replies.is_hidden Indicates whether the reply is hidden.
 * @apiSuccess {Boolean} replies.is_saved Indicates whether the reply is saved by the authenticated user.
 * @apiSuccess {String} replies.post_title Title of the post to which the comment belongs.
 * @apiSuccess {String} replies.community_title Title of the community to which the comment belongs.
 * @apiSuccess {String} message Success message indicating that replies have been retrieved successfully.
 * @apiSuccess {Boolean} replies.is_upvoted if the reply is upvoted by the user
 * @apiSuccess {Boolean} replies.is_removed if the  reply is removed by the moderator
 * @apiSuccess {Boolean} replies.is_approved if the reply is approved by the moderator
 * @apiSuccess {Boolean} replies.is_locked if the reply is locked by the moderator
 * @apiSuccess {Boolean} replies.is_removal if the reply is a removal reason
 * @apiSuccess {Boolean} replies.is_downvoted if the reply is upvoted by the user
 * @apiSuccess {repliesObject[]} replies.replies if the reply has a reply by default empty array
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "replies": [
 *           {
 *           "_id": "609d0f23c8b58f001d54ee1f",
 *           "content": "This is a comment on the post",
 *           "user": {
 *               "id": "609cfff1c8b58f001d54ee1e",
 *               "name": "Amira El-garf",
 *               "username": "amira123",
 *               "email": "amiraelgarf99@gmail.com",
 *               "avatar_url": "https://example.com/avatar.jpg",
 *               "banner": "https://example.com/avatar.jpg",
 *               "followers_count": 100,
 *               "following_count": 50,
 *               "created_at": "2022-01-01T12:00:00.000Z",
 *               "role": "User",
 *               "nsfw": false,
 *               "activeInCommunityVisibility": true,
 *               "isVerified": true,
 *               "isVisible": false,
 *               "isActive": true,
 *               "isBanned": false,
 *               "displayName": "Amiraelgarf123",
 *               "bio": "active",
 *               "cakeDay": "2020-01-01",
 *               "subscribedCommunities": ["community1", "community2"]
 *               "favouriteCommunities": [],
 *               "socialLinks": [],
 *               "commentsOnYourPost": true,
 *               "commentsYouFollow": true,
 *               "upvotes": true,
 *               "selectedPollOption": "Predator-Prey Coevolution",
 *               "allowFollow": true
 *           },
 *           "likes_count": 10,
 *           "replies_count": 5,
 *           "is_reply": false,
 *           "media": [
 *               { "type": "image", "link": "https://example.com/attachment1.jpg" },
 *               { "type": "image", "link": "https://example.com/attachment2.jpg" }
 *           ],
 *           "created_at": "2022-05-14T12:00:00.000Z",
 *           "is_hidden": false,
 *           "is_saved": false,
 *           "post_title": "Sample Post Title",
 *           "community_title": "Sample Community",
 *           "is_upvoted": true,
 *           "is_removed": false,
 *           "is_approved": true,
 *           "is_locked": false,
 *           "is_removal": false,
 *           "is_downvoted": false,
 *           "replies": []
 *           },
 *           ...
 *       ],
 *       "message": "Replies for the comment have been retrieved successfully"
 *     }
 *
 * @apiError (404) NotFound Comment not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Comment not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {post} /comments/:commentId/hide Hide/Unhide Comment
 * @apiVersion 0.1.0
 * @apiName HideUnhideComment
 * @apiGroup Comment
 * @apiDescription Hides or unhides a comment based on its current state.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} commentId ID of the comment to be hidden or unhidden.
 *
 * @apiSuccess {String} message Confirmation message indicating the action taken (e.g., "Comment has been hidden successfully").
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Comment has been hidden successfully"
 *     }
 *
 * @apiError (404) NotFound Comment not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Comment not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {post} /comments/:commentId/upvote Upvote/Remove Upvote Comment
 * @apiVersion 0.1.0
 * @apiName UpvoteRemoveUpvoteComment
 * @apiGroup Comment
 * @apiDescription Upvotes or removes upvote from a comment based on the user's action.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} commentId ID of the comment to be upvoted or removed upvote.
 *
 * @apiSuccess {Number} votes The updated net votes count of the comment.
 * @apiSuccess {String} message Confirmation message indicating the action taken (e.g., "Comment has been upvoted successfully").
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "votes": 10,
 *       "message": "Comment has been upvoted successfully"
 *     }
 *
 * @apiError (404) NotFound Comment not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Comment not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {post} /comments/:commentId/downvote Downvote/Remove Downvote Comment
 * @apiVersion 0.1.0
 * @apiName DownvoteRemoveDownvoteComment
 * @apiGroup Comment
 * @apiDescription Downvotes or removes downvote from a comment based on the user's action.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} commentId ID of the comment to be downvoted or removed downvote.
 *
 * @apiSuccess {Number} votes The updated net votes count of the comment.
 * @apiSuccess {String} message Confirmation message indicating the action taken (e.g., "Comment has been downvoted successfully").
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "votes": -5,
 *       "message": "Comment has been downvoted successfully"
 *     }
 *
 * @apiError (404) NotFound Comment not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Comment not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {post} /comments/:commentId/save Save/Unsave Comment
 * @apiVersion 0.1.0
 * @apiName SaveUnsaveComment
 * @apiGroup Comment
 * @apiDescription Saves or unsaves a comment for the authenticated user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} commentId ID of the comment to be saved or unsaved.
 *
 * @apiSuccess {String} message Confirmation message indicating the action taken (e.g., "Comment has been saved successfully").
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Comment has been saved successfully"
 *     }
 *
 * @apiError (404) NotFound Comment or user not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Comment not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {post} /comments/:commentId/report Report Comment
 * @apiVersion 0.1.0
 * @apiName ReportComment
 * @apiGroup Comment
 * @apiDescription Reports a comment for inappropriate content or behavior.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} commentId ID of the comment to be reported.
 * @apiParam {String} reason Reason for reporting the comment.
 * @apiParam {String} subreason Specific reason for reporting the comment.
 *
 * @apiSuccess {String} message Confirmation message indicating that the comment has been reported successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "message": "Comment reported successfully"
 *     }
 *
 * @apiError (404) NotFound Comment not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Comment not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "An error occurred while reporting the comment"
 *     }
 */

//#endregion Comments

//#region Community

/**
 * @api {post} /community/add-to-favourites Add Community to Favorites
 * @apiVersion 0.1.0
 * @apiName AddCommunityToFavorites
 * @apiGroup Community
 * @apiDescription Adds a community to user's favorites.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} communityName Name of the community to be added to favorites.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "communityName": "Sample Community"
 * }
 *
 * @apiSuccess {String} message Success message indicating that the community has been added to favorites successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Community added to favorites successfully"
 *     }
 *
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (402) Forbidden Community is already in favorites.
 * @apiError (404) NotFound Community not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Invalid parameters"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 402 Forbidden
 *     {
 *       "message": "Community is already in favorites"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Community not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {post} /community/remove-favourite Remove Community from Favorites
 * @apiVersion 0.1.0
 * @apiName RemoveCommunityFromFavorites
 * @apiGroup Community
 * @apiDescription Removes a community from user's favorites.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} communityName Name of the community to be removed from favorites.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "communityName": "Sample Community"
 * }
 *
 * @apiSuccess {String} message Success message indicating that the community has been removed from favorites successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Community removed from favorites successfully"
 *     }
 *
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound Community not found.
 * @apiError (402) Forbidden Community is not in favorites.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Invalid parameters"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 402 Forbidden
 *     {
 *       "message": "Community is not in favorites"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Community not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {get} /community/is-favourite Check if Community is in Favorites
 * @apiVersion 0.1.0
 * @apiName IsCommunityInFavorites
 * @apiGroup Community
 * @apiDescription Checks if a community is in user's favorites.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} communityName Name of the community to be checked.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "communityName": "Sample Community"
 * }
 *
 * @apiSuccess {Boolean} isFavourite Indicates whether the community is in user's favorites.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "isFavourite": true
 *     }
 *
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound Community not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Invalid parameters"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Community not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {post} /community/mute Mute Community
 * @apiVersion 0.1.0
 * @apiName MuteCommunity
 * @apiGroup Community
 * @apiDescription Mutes notifications from a community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} communityName Name of the community to be muted.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "communityName": "Sample Community"
 * }
 *
 * @apiSuccess {String} message Success message indicating that the community has been muted successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Community muted successfully"
 *     }
 *
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound Community not found.
 * @apiError (402) Forbidden Community is already muted.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Invalid parameters"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 402 Forbidden
 *     {
 *       "message": "Community is already muted"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Community not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {post} /community/unmute Unmute Community
 * @apiVersion 0.1.0
 * @apiName UnmuteCommunity
 * @apiGroup Community
 * @apiDescription Unmutes notifications from a community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} communityName Name of the community to be unmuted.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "communityName": "Sample Community"
 * }
 *
 * @apiSuccess {String} message Success message indicating that the community has been unmuted successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Community unmuted successfully"
 *     }
 *
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound Community not found.
 * @apiError (402) Forbidden Community is not muted.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Invalid parameters"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 402 Forbidden
 *     {
 *       "message": "Community is not muted"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Community not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {get} /community/is-mute Check if Community is Muted
 * @apiVersion 0.1.0
 * @apiName IsCommunityMuted
 * @apiGroup Community
 * @apiDescription Checks if notifications from a community are muted.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} communityName Name of the community to be checked.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "communityName": "Sample Community"
 * }
 *
 * @apiSuccess {Boolean} isMuted Indicates whether notifications from the community are muted.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "isMuted": true
 *     }
 *
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound Community not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Invalid parameters"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Community not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {post} /community/subscribe Subscribe to Community
 * @apiVersion 0.1.0
 * @apiName SubscribeToCommunity
 * @apiGroup Community
 * @apiDescription Subscribes user to a community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} communityName Name of the community to be subscribed to.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "communityName": "Sample Community"
 * }
 *
 * @apiSuccess {String} message Success message indicating that the user has subscribed to the community successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Subscribed to the community successfully"
 *     }
 *
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (403) Forbidden Restricted or Private community.
 * @apiError (404) NotFound Community not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Invalid parameters"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "message": "Restricted or Private community"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Community not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {post} /community/unsubscribe Unsubscribe from Community
 * @apiVersion 0.1.0
 * @apiName UnsubscribeFromCommunity
 * @apiGroup Community
 * @apiDescription Unsubscribes user from a community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} communityName Name of the community to be unsubscribed from.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "communityName": "Sample Community"
 * }
 *
 * @apiSuccess {String} message Success message indicating that the user has unsubscribed from the community successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Unsubscribed from the community successfully"
 *     }
 *
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (403) Forbidden User isn't subscribed to community.
 * @apiError (404) NotFound Community not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Invalid parameters"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "message": "User isn't subscribed to community"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Community not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {get} /community/is-subscribed Check if User is Subscribed to Community
 * @apiVersion 0.1.0
 * @apiName IsUserSubscribedToCommunity
 * @apiGroup Community
 * @apiDescription Checks if a user is subscribed to a community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} communityName Name of the community to be checked.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "communityName": "Sample Community"
 * }
 *
 * @apiSuccess {Boolean} isSubscribed Indicates whether the user is subscribed to the community.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "isSubscribed": true
 *     }
 *
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound Community not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Invalid parameters"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Community not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */
/**
 * @api {get} /community/top-communities Get Top Communities
 * @apiVersion 0.1.0
 * @apiName GetTopCommunities
 * @apiGroup Community
 * @apiDescription Retrieves a list of top public communities based on member count.
 * @apiSampleRequest off
 *
 * @apiParam {Number} [page=1] Page number for pagination.
 *
 * @apiSuccess {Object[]} communities List of top public communities.
 * @apiSuccess {Number} totalPages Total number of pages.
 * @apiSuccess {Number} currentPage Current page number.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "communities": [
 *         {
 *           "name": "Sample Community",
 *           "category": "Sample Category",
 *           "communityType": "Public",
 *           "description": "Sample description",
 *           "image": "community_image.jpg",
 *           "membersCount": 1000,
 *           "rules": [
 *             {
 *               "title": "Rule 1",
 *               "description": "Description of rule 1",
 *               "reportReason": "Reason for reporting rule 1"
 *             },
 *             {
 *               "title": "Rule 2",
 *               "description": "Description of rule 2",
 *               "reportReason": "Reason for reporting rule 2"
 *             }
 *           ],
 *           "dateCreated": "2024-01-01T00:00:00.000Z",
 *           "communityBanner": "community_banner.jpg"
 *         }
 *       ],
 *       "totalPages": 10,
 *       "currentPage": 1
 *     }
 *
 * @apiError (404) NotFound No public communities found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "No Public communities found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {get} /community/random-category Get Random Community by Category
 * @apiName GetRandomCommunityByCategory
 * @apiGroup Community
 *
 * @apiDescription Retrieves a random community based on category.
 *
 * @apiHeader {String} Authorization User's access token.
 *
 * @apiSuccess {Object[]} communities List of communities.
 * @apiSuccess {String} communities._id Community ID.
 * @apiSuccess {String} communities.name Community name.
 * @apiSuccess {String} communities.category Community category.
 * @apiSuccess {String} communities.communityType Community type.
 * @apiSuccess {String} communities.description Community description.
 * @apiSuccess {String} communities.image Community image URL.
 * @apiSuccess {Number} communities.membersCount Number of members in the community.
 * @apiSuccess {Object[]} communities.rules List of rules in the community.
 * @apiSuccess {String} communities.rules._id Rule ID.
 * @apiSuccess {String} communities.rules.name Rule name.
 * @apiSuccess {Date} communities.dateCreated Date when the community was created.
 * @apiSuccess {String} communities.communityBanner Community banner image URL.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "_id": "6098e62f18fde431a421aaff",
 *         "name": "Sample Community",
 *         "category": "Technology",
 *         "communityType": "Public",
 *         "description": "This is a sample community.",
 *         "image": "https://example.com/sample.jpg",
 *         "membersCount": 100,
 *         "rules": [
 *           {
 *             "_id": "6098e62f18fde431a421ab00",
 *             "name": "Be respectful to others"
 *           }
 *         ],
 *         "dateCreated": "2021-05-10T12:00:00.000Z",
 *         "communityBanner": "https://example.com/banner.jpg"
 *       }
 *     ]
 *
 * @apiError Unauthorized The user is not authenticated or the access token is invalid.
 * @apiError NotFound No random communities found.
 * @apiError InternalServerError Internal server error occurred.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "No random communities found"
 *     }
 */
/**
 * @api {get} /community/random-category Get Random Category Communities
 * @apiVersion 0.1.0
 * @apiName GetRandomCategoryCommunities
 * @apiGroup Community
 * @apiDescription Retrieves a list of communities from a random category.
 * @apiSampleRequest off
 *
 * @apiSuccess {Object[]} communities List of communities from the random category.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "name": "Sample Community",
 *         "category": "Sample Category",
 *         "communityType": "Public",
 *         "description": "Sample description",
 *         "image": "community_image.jpg",
 *         "membersCount": 1000,
 *         "rules": [
 *           {
 *             "title": "Rule 1",
 *             "description": "Description of rule 1",
 *             "reportReason": "Reason for reporting rule 1"
 *           },
 *           {
 *             "title": "Rule 2",
 *             "description": "Description of rule 2",
 *             "reportReason": "Reason for reporting rule 2"
 *           }
 *         ],
 *         "dateCreated": "2024-01-01T00:00:00.000Z",
 *         "communityBanner": "community_banner.jpg"
 *       }
 *     ]
 *
 * @apiError (404) NotFound No random communities found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "No random communities found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {get} /community/get-specific-category Get Communities by Specific Category
 * @apiVersion 0.1.0
 * @apiName GetCommunitiesBySpecificCategory
 * @apiGroup Community
 * @apiDescription Retrieves a list of communities by a specific category.
 * @apiSampleRequest off
 *
 * @apiParam {String} category Category name to filter communities.
 *
 * @apiSuccess {Object[]} communities List of communities belonging to the specified category.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "name": "Sample Community",
 *         "category": "Sample Category",
 *         "communityType": "Public",
 *         "description": "Sample description",
 *         "image": "community_image.jpg",
 *         "membersCount": 1000,
 *         "rules": [
 *           {
 *             "title": "Rule 1",
 *             "description": "Description of rule 1",
 *             "reportReason": "Reason for reporting rule 1"
 *           },
 *           {
 *             "title": "Rule 2",
 *             "description": "Description of rule 2",
 *             "reportReason": "Reason for reporting rule 2"
 *           }
 *         ],
 *         "dateCreated": "2024-01-01T00:00:00.000Z",
 *         "communityBanner": "community_banner.jpg"
 *       }
 *     ]
 *
 * @apiError (404) NotFound No communities found for the specified category.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "No communities found for the specified category"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {post} /community/create Create Community
 * @apiVersion 0.1.0
 * @apiName CreateCommunity
 * @apiGroup Community
 * @apiDescription Creates a new community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} name Name of the community.
 * @apiParam {Boolean} is18plus Whether the community is for users 18 years or older.
 * @apiParam {String="Public","Private","Restricted"} communityType Type of the community.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "name": "Sample Community",
 *    "is18plus": true,
 *    "communityType": "Public"
 * }
 *
 * @apiSuccess {String} message Success message indicating that the community has been created successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Community created successfully"
 *     }
 *
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (403) Forbidden Community name is not available.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Invalid request parameters"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "message": "Community name is not available"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

//#endregion Community

//#region User
/**
 * @api {get} /user/profile-info/:username Get User Profile Information
 * @apiVersion 0.1.0
 * @apiName GetUserProfileInformation
 * @apiGroup User
 * @apiDescription Retrieves information about a user's profile.
 * @apiSampleRequest off
 *
 * @apiParam {String} username Username of the user.
 *
 * @apiSuccess {String} username Username of the user.
 * @apiSuccess {String} name Name of the user.
 * @apiSuccess {String} avatar URL of the user's avatar.
 * @apiSuccess {String} banner URL of the user's banner image.
 * @apiSuccess {String} about About section of the user's profile.
 * @apiSuccess {Date} createdAt Date when the user account was created.
 * @apiSuccess {Object[]} subscribedCommunities List of communities the user is subscribed to.
 * @apiSuccess {Boolean} isVisible Indicates if the user's profile is visible to others.
 * @apiSuccess {Boolean} isActive Indicates if the user's account is active.
 * @apiSuccess {Object} socialLinks Links to the user's social media profiles.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "username": "sample_user",
 *       "name": "Sample User",
 *       "avatar": "avatar_image.jpg",
 *       "banner": "banner_image.jpg",
 *       "about": "Sample about section",
 *       "createdAt": "2024-01-01T00:00:00.000Z",
 *       "subscribedCommunities": [
 *         {
 *           "name": "Sample Community",
 *           "image": "community_image.jpg",
 *           "communityBanner": "community_banner.jpg",
 *           "membersCount": 1000
 *         }
 *       ],
 *       "isVisible": true,
 *       "isActive": true,
 *    "socialLinks": [
 *      {
 *          "platform": "facebook",
 *          "url": "https://www.facebook.com/sample_user",
 *          "displayName": "FacebookGroup"
 *      },
 *      {
 *          "platform": "twitter",
 *          "url": "https://twitter.com/sample_user",
 *          "displayName": "TwitterProfile"
 *      }
 *      ],
 *     }
 *
 * @apiError (404) NotFound User not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "User not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {put} /user/profile-info Update User Profile Information
 * @apiVersion 0.1.0
 * @apiName UpdateUserProfileInformation
 * @apiGroup User
 * @apiDescription Updates information about a user's profile.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} [name] Name of the user.
 * @apiParam {File} [banner] user banner (if applicable).
 * @apiParam {File} [avatar] user avatar (if applicable).
 * @apiParam {String} [fileType] Type of images (if applicable).
 * @apiParam {String} [about] About section of the user's profile.
 * @apiParam {Object} [socialLinks] Links to the user's social media profiles.
 * @apiParam {String} [username] Username of the user.
 * @apiParam {Boolean} [isVisible] Indicates if the user's profile is visible to others.
 * @apiParam {Boolean} [isActive] Indicates if the user's account is active.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "name": "Updated Name",
 *    "about": "Updated about section",
 *    "avatar": "avatarfile",
 *    "banner": "bannerfile",
 *    "fileType": "image",
 *    "socialLinks": [
 *      {
 *          "platform": "facebook",
 *          "url": "https://www.facebook.com/sample_user",
 *          "displayName": "FacebookGroup"
 *      },
 *      {
 *          "platform": "twitter",
 *          "url": "https://twitter.com/sample_user",
 *          "displayName": "TwitterProfile"
 *      }
 *      ],
 *    "isVisible": true,
 *    "isActive": true
 * }
 *
 * @apiSuccess {String} username Username of the user.
 * @apiSuccess {String} name Name of the user.
 * @apiSuccess {String} avatar URL of the user's avatar.
 * @apiSuccess {String} banner URL of the user's banner image.
 * @apiSuccess {String} about About section of the user's profile.
 * @apiSuccess {Date} createdAt Date when the user account was created.
 * @apiSuccess {Object[]} subscribedCommunities List of communities the user is subscribed to.
 * @apiSuccess {Boolean} isVisible Indicates if the user's profile is visible to others.
 * @apiSuccess {Boolean} isActive Indicates if the user's account is active.
 * @apiSuccess {Object} socialLinks Links to the user's social media profiles.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "username": "sample_user",
 *       "name": "Updated Name",
 *       "avatar": "updated_avatar_image.jpg",
 *       "banner": "updated_banner_image.jpg",
 *       "about": "Updated about section",
 *       "createdAt": "2024-01-01T00:00:00.000Z",
 *       "subscribedCommunities": [
 *         {
 *           "name": "Sample Community",
 *           "image": "community_image.jpg",
 *           "communityBanner": "community_banner.jpg",
 *           "membersCount": 1000
 *         }
 *       ],
 *       "isVisible": true,
 *       "isActive": true,
 *       "socialLinks": {
 *         "facebook": "https://www.facebook.com/updated_user",
 *         "twitter": "https://www.twitter.com/updated_user"
 *       }
 *     }
 *
 * @apiError (400) Forbidden Username not available or exceeds character limit.
 * @apiError (404) NotFound User not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Username not available"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "User not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

//#endregion User

//#region Useraction

/**
 * @api {post} /users/follow Follow User
 * @apiVersion 0.1.0
 * @apiName FollowUser
 * @apiGroup User
 * @apiDescription Follows a user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} username Username of the user to follow.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "username": "example_user"
 * }
 *
 * @apiSuccess {String} description Success message indicating that the user has been followed successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "description": "User followed successfully"
 *     }
 *
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound User not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Username is required"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "User not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {post} /users/block Block User
 * @apiVersion 0.1.0
 * @apiName BlockUser
 * @apiGroup User
 * @apiDescription Blocks a user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} username Username of the user to block.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "username": "example_user"
 * }
 *
 * @apiSuccess {String} description Success message indicating that the user has been blocked successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "description": "User blocked successfully"
 *     }
 *
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound User not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Username is required"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "User not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {post} /unblock Unblock User
 * @apiVersion 0.1.0
 * @apiName UnblockUser
 * @apiGroup User
 * @apiDescription Unblocks a user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} username Username of the user to unblock.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "username": "example_user"
 * }
 *
 * @apiSuccess {String} description Success message indicating that the user has been unblocked successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "description": "User unblocked successfully"
 *     }
 *
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound User not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Username is required"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "User not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {post} /users/unfollow Unfollow User
 * @apiVersion 0.1.0
 * @apiName UnfollowUser
 * @apiGroup User
 * @apiDescription Unfollows a user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} username Username of the user to unfollow.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "username": "example_user"
 * }
 *
 * @apiSuccess {String} description Success message indicating that the user has been unfollowed successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "description": "User unfollowed successfully"
 *     }
 *
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound User not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Username is required"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Authorization token is required"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "User not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {post} /users/report Report User
 * @apiVersion 0.1.0
 * @apiName ReportUser
 * @apiGroup User
 * @apiDescription Reports a user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} username Username of the user to report.
 * @apiParam {String} reason Reason for reporting the user.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "username": "example_user",
 *    "reason": "This user is posting inappropriate content."
 * }
 *
 * @apiSuccess {String} description Success message indicating that the user has been reported successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "description": "User reported successfully"
 *     }
 *
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound User not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Username is required"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "User not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {get} /users/follow/isfollowed/:username Check if User is Followed
 * @apiVersion 0.1.0
 * @apiName IsUserFollowed
 * @apiGroup User
 * @apiDescription Checks if the user is followed by the authenticated user.
 * @apiSampleRequest off
 *
 * @apiParam {String} username Username of the user to check.
 *
 * @apiSuccess {Boolean} isFollowed Indicates whether the user is followed by the authenticated user.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "isFollowed": true
 *     }
 *
 * @apiError (404) NotFound User not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "User not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */
/**
 * @api {get} users/getfollowers Get Followers
 * @apiVersion 0.1.0
 * @apiName GetFollowers
 * @apiGroup User
 * @apiDescription Retrieves the list of followers for the authenticated user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiSuccess {Object[]} followers List of followers.
 * @apiSuccess {Boolean} isFollowed Indicates whether the authenticated user is followed by the follower.
 * @apiSuccess {String} username Username of the follower.
 * @apiSuccess {String} avatar Avatar URL of the follower.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "followers": [
 *            {
 *            "isFollowed": true,
 *            "username": "follower1",
 *            "avatar": "http://example.com/avatar1.jpg"
 *        },
 *        {
 *            "isFollowed": false,
 *            "username": "follower2",
 *            "avatar": "http://example.com/avatar2.jpg"
 *        }
 *       ]
 *     }
 *
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound User not found or has no followers.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Authorization token is required"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "User not found or has no followers"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

//#endregion Useraction

//#region listing

/**
 * @api {get} /home/new Sort Posts by Newest
 * @apiVersion 0.1.0
 * @apiName SortPostsNewest
 * @apiGroup Post
 * @apiDescription Retrieves posts sorted by newest.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiSuccess {Object[]} posts List of posts sorted by newest.
 * @apiSuccess {Number} totalPages Total number of pages.
 * @apiSuccess {Number} currentPage Current page number.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "posts": [
 *            {
 *            "_id": "1234567890",
 *           "userId": "0987654321",
 *           "username": "example_user",
 *           "userProfilePic": "http://example.com/avatar.jpg",
 *           "hasUpvoted": false,
 *           "hasDownvoted": false,
 *           "hasVotedOnPoll": false,
 *           "selectedPollOption": null,
 *           "numberOfViews": 1080,
 *           "votesUpCount": 10,
 *           "votesDownCount": 2,
 *           "sharesCount": 5,
 *           "commentsCount": 15,
 *           "title": "Sample Title",
 *           "content": "Sample Content",
 *           "community": "Sample Community",
 *           "type": "Post",
 *           "link": "http://example.com",
 *           "pollExpiration": "2024-04-16T12:00:00.000Z",
 *           "isPollEnabled": true,
 *           "pollVotingLength": "7 days",
 *           "isSpoiler": false,
 *           "isNsfw": false,
 *           "sendPostReplyNotification": true,
 *           "isCommentsLocked": false,
 *           "isSaved": true,
 *           "date": "2024-04-16T10:00:00.000Z",
 *           "pollOptions": [],
 *           "attachments": []
 *       }
 *       ],
 *       "totalPages": 5,
 *       "currentPage": 1
 *     }
 *
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound No posts found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Authorization token is required"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No posts found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {get} /home/top Sort Posts by Top today
 * @apiVersion 0.1.0
 * @apiName SortPostsTopTime
 * @apiGroup Post
 * @apiDescription Retrieves posts sorted by top within a specified time period.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String="now","day","week","month","year"} time Time period to sort posts (now, day, week, month, year).
 *
 * @apiSuccess {Object[]} posts List of posts sorted by top within the specified time period.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       // Post objects
 *     ]
 *
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound No posts found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Authorization token is required"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No posts found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {get} /home/top/alltime Sort Posts by Top (All Time)
 * @apiVersion 0.1.0
 * @apiName SortPostsTopAllTime
 * @apiGroup Post
 * @apiDescription Retrieves posts sorted by top of all time.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiSuccess {Object[]} posts List of posts sorted by top of all time.
 * @apiSuccess {Number} totalPages Total number of pages.
 * @apiSuccess {Number} currentPage Current page number.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "posts": [
 *            {
 *            "_id": "624a6a677c8d9c9f5fd5eb5d",
            "userId": "624a4a94c66738f13854b474",
            "username": "farouq12",
            "userProfilePic": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
            "hasUpvoted": false,
            "hasDownvoted": false,
            "hasVotedOnPoll": false,
            "selectedPollOption": null,
            "numberOfViews": 680,
            "votesUpCount": 0,
            "votesDownCount": 0,
            "sharesCount": 0,
            "commentsCount": 4,
            "title": "Expressive Artistry: Painting with Emotions",
            "content": [
                "Discover the power of expressive artistry as artists paint with raw emotions, capturing the essence of human experiences on canvas."
            ],
            "community": "CreativeMindsCollective",
            "communityIcon": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1713044122/uploads/voAwqXNBDO4JwIODmO4HXXkUJbnVo_mL_bENHeagDNo_knalps.png",
            "type": "Post",
            "pollExpiration": null,
            "isPollEnabled": false,
            "pollVotingLength": "3 Days",
            "isSpoiler": false,
            "isNsfw": false,
            "sendPostReplyNotification": true,
            "isCommentsLocked": false,
            "isSaved": false,
            "isRemoved": false,
            "isApproved": true,
            "isScheduled": false,
            "isSpam": false,
            "date": "2024-05-03T23:35:13.756Z",
            "pollOptions": [],
            "attachments": []
        },
 *       }
 *       ],
 *       "totalPages": 5,
 *       "currentPage": 1
 *     }
 *
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound No posts found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Authorization token is required"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No posts found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {get} /subspreadit/:subspreaditname/top Sort Posts by Top within Community today
 * @apiVersion 0.1.0
 * @apiName SortPostsTopCommunity
 * @apiGroup Post
 * @apiDescription Retrieves posts sorted by top within a specified community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} subspreaditname Name of the community (subspreadit).
 *
 * @apiSuccess {Object[]} posts List of posts sorted by top within the specified community.
 *
 * @apiSuccess {Number} totalPages Total number of pages.
 * @apiSuccess {Number} currentPage Current page number.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "posts": [
 *            "_id": "624a6a677c8d9c9f5fd5eb5d",
            "userId": "624a4a94c66738f13854b474",
            "username": "farouq12",
            "userProfilePic": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
            "hasUpvoted": false,
            "hasDownvoted": false,
            "hasVotedOnPoll": false,
            "selectedPollOption": null,
            "numberOfViews": 680,
            "votesUpCount": 0,
            "votesDownCount": 0,
            "sharesCount": 0,
            "commentsCount": 4,
            "title": "Expressive Artistry: Painting with Emotions",
            "content": [
                "Discover the power of expressive artistry as artists paint with raw emotions, capturing the essence of human experiences on canvas."
            ],
            "community": "CreativeMindsCollective",
            "communityIcon": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1713044122/uploads/voAwqXNBDO4JwIODmO4HXXkUJbnVo_mL_bENHeagDNo_knalps.png",
            "type": "Post",
            "pollExpiration": null,
            "isPollEnabled": false,
            "pollVotingLength": "3 Days",
            "isSpoiler": false,
            "isNsfw": false,
            "sendPostReplyNotification": true,
            "isCommentsLocked": false,
            "isSaved": false,
            "isRemoved": false,
            "isApproved": true,
            "isScheduled": false,
            "isSpam": false,
            "date": "2024-05-03T23:35:13.756Z",
            "pollOptions": [],
            "attachments": []
        },
 *       ],
 *       "totalPages": 5,
 *       "currentPage": 1
 *     }
 *
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound No posts found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Authorization token is required"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No posts found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {get} /subspreadit/:subspreaditname/top/alltime Sort Posts by Top (All Time) within Community
 * @apiVersion 0.1.0
 * @apiName SortPostsTopAllTimeCommunity
 * @apiGroup Post
 * @apiDescription Retrieves posts sorted by top of all time within a specified community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} subspreaditname Name of the community (subspreadit).
 *
 * @apiSuccess {Object[]} posts List of posts sorted by top of all time within the specified community.
 *
 *@apiSuccess {Number} totalPages Total number of pages.
 * @apiSuccess {Number} currentPage Current page number.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "posts": [
 *            "_id": "624a6a677c8d9c9f5fd5eb5d",
            "userId": "624a4a94c66738f13854b474",
            "username": "farouq12",
            "userProfilePic": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
            "hasUpvoted": false,
            "hasDownvoted": false,
            "hasVotedOnPoll": false,
            "selectedPollOption": null,
            "numberOfViews": 680,
            "votesUpCount": 0,
            "votesDownCount": 0,
            "sharesCount": 0,
            "commentsCount": 4,
            "title": "Expressive Artistry: Painting with Emotions",
            "content": [
                "Discover the power of expressive artistry as artists paint with raw emotions, capturing the essence of human experiences on canvas."
            ],
            "community": "CreativeMindsCollective",
            "communityIcon": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1713044122/uploads/voAwqXNBDO4JwIODmO4HXXkUJbnVo_mL_bENHeagDNo_knalps.png",
            "type": "Post",
            "pollExpiration": null,
            "isPollEnabled": false,
            "pollVotingLength": "3 Days",
            "isSpoiler": false,
            "isNsfw": false,
            "sendPostReplyNotification": true,
            "isCommentsLocked": false,
            "isSaved": false,
            "isRemoved": false,
            "isApproved": true,
            "isScheduled": false,
            "isSpam": false,
            "date": "2024-05-03T23:35:13.756Z",
            "pollOptions": [],
            "attachments": []
        },
 *       ],
 *       "totalPages": 5,
 *       "currentPage": 1
 *     }
 *
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound No posts found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Authorization token is required"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No posts found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {get} /subspreadit/:subspreaditname/new Sort Posts by Newest within Community
 * @apiVersion 0.1.0
 * @apiName SortPostsNewestCommunity
 * @apiGroup Post
 * @apiDescription Retrieves posts sorted by newest within a specified community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} subspreaditname Name of the community (subspreadit).
 *
 * @apiSuccess {Object[]} posts List of posts sorted by newest within the specified community.
 *
 *@apiSuccess {Number} totalPages Total number of pages.
 * @apiSuccess {Number} currentPage Current page number.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "posts": [
 *            "_id": "624a6a677c8d9c9f5fd5eb5d",
            "userId": "624a4a94c66738f13854b474",
            "username": "farouq12",
            "userProfilePic": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
            "hasUpvoted": false,
            "hasDownvoted": false,
            "hasVotedOnPoll": false,
            "selectedPollOption": null,
            "numberOfViews": 680,
            "votesUpCount": 0,
            "votesDownCount": 0,
            "sharesCount": 0,
            "commentsCount": 4,
            "title": "Expressive Artistry: Painting with Emotions",
            "content": [
                "Discover the power of expressive artistry as artists paint with raw emotions, capturing the essence of human experiences on canvas."
            ],
            "community": "CreativeMindsCollective",
            "communityIcon": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1713044122/uploads/voAwqXNBDO4JwIODmO4HXXkUJbnVo_mL_bENHeagDNo_knalps.png",
            "type": "Post",
            "pollExpiration": null,
            "isPollEnabled": false,
            "pollVotingLength": "3 Days",
            "isSpoiler": false,
            "isNsfw": false,
            "sendPostReplyNotification": true,
            "isCommentsLocked": false,
            "isSaved": false,
            "isRemoved": false,
            "isApproved": true,
            "isScheduled": false,
            "isSpam": false,
            "date": "2024-05-03T23:35:13.756Z",
            "pollOptions": [],
            "attachments": []
        },
 *       ],
 *       "totalPages": 5,
 *       "currentPage": 1
 *     }
 *
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound No posts found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Authorization token is required"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No posts found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {get} /home/comments Sort Posts by Comments
 * @apiVersion 0.1.0
 * @apiName SortPostsComments
 * @apiGroup Post
 * @apiDescription Retrieves posts sorted by number of comments.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiSuccess {Object[]} posts List of posts sorted by number of comments.
 *
 *@apiSuccess {Number} totalPages Total number of pages.
 * @apiSuccess {Number} currentPage Current page number.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "posts": [
 *            "_id": "624a6a677c8d9c9f5fd5eb5d",
            "userId": "624a4a94c66738f13854b474",
            "username": "farouq12",
            "userProfilePic": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
            "hasUpvoted": false,
            "hasDownvoted": false,
            "hasVotedOnPoll": false,
            "selectedPollOption": null,
            "numberOfViews": 680,
            "votesUpCount": 0,
            "votesDownCount": 0,
            "sharesCount": 0,
            "commentsCount": 4,
            "title": "Expressive Artistry: Painting with Emotions",
            "content": [
                "Discover the power of expressive artistry as artists paint with raw emotions, capturing the essence of human experiences on canvas."
            ],
            "community": "CreativeMindsCollective",
            "communityIcon": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1713044122/uploads/voAwqXNBDO4JwIODmO4HXXkUJbnVo_mL_bENHeagDNo_knalps.png",
            "type": "Post",
            "pollExpiration": null,
            "isPollEnabled": false,
            "pollVotingLength": "3 Days",
            "isSpoiler": false,
            "isNsfw": false,
            "sendPostReplyNotification": true,
            "isCommentsLocked": false,
            "isSaved": false,
            "isRemoved": false,
            "isApproved": true,
            "isScheduled": false,
            "isSpam": false,
            "date": "2024-05-03T23:35:13.756Z",
            "pollOptions": [],
            "attachments": []
        },
 *       ],
 *       "totalPages": 5,
 *       "currentPage": 1
 *     }
 *
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound No posts found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Authorization token is required"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No posts found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {get} /home/best Sort Posts by Best
 * @apiVersion 0.1.0
 * @apiName SortPostsBest
 * @apiGroup Post
 * @apiDescription Retrieves posts sorted by best based on votes ratio.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiSuccess {Object[]} posts List of posts sorted by best.
 *
 * @apiSuccess {Number} totalPages Total number of pages.
 * @apiSuccess {Number} currentPage Current page number.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "posts": [
 *            "_id": "624a6a677c8d9c9f5fd5eb5d",
            "userId": "624a4a94c66738f13854b474",
            "username": "farouq12",
            "userProfilePic": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
            "hasUpvoted": false,
            "hasDownvoted": false,
            "hasVotedOnPoll": false,
            "selectedPollOption": null,
            "numberOfViews": 680,
            "votesUpCount": 0,
            "votesDownCount": 0,
            "sharesCount": 0,
            "commentsCount": 4,
            "title": "Expressive Artistry: Painting with Emotions",
            "content": [
                "Discover the power of expressive artistry as artists paint with raw emotions, capturing the essence of human experiences on canvas."
            ],
            "community": "CreativeMindsCollective",
            "communityIcon": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1713044122/uploads/voAwqXNBDO4JwIODmO4HXXkUJbnVo_mL_bENHeagDNo_knalps.png",
            "type": "Post",
            "pollExpiration": null,
            "isPollEnabled": false,
            "pollVotingLength": "3 Days",
            "isSpoiler": false,
            "isNsfw": false,
            "sendPostReplyNotification": true,
            "isCommentsLocked": false,
            "isSaved": false,
            "isRemoved": false,
            "isApproved": true,
            "isScheduled": false,
            "isSpam": false,
            "date": "2024-05-03T23:35:13.756Z",
            "pollOptions": [],
            "attachments": []
        },
 *       ],
 *       "totalPages": 5,
 *       "currentPage": 1
 *     }
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound No posts found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Authorization token is required"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No posts found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {get} /home/hot Sort Posts by Hot
 * @apiVersion 0.1.0
 * @apiName SortPostsHot
 * @apiGroup Post
 * @apiDescription Retrieves posts sorted by hotness score.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiSuccess {Object[]} posts List of posts sorted by hotness score.
 *
 * @apiSuccess {Number} totalPages Total number of pages.
 * @apiSuccess {Number} currentPage Current page number.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "posts": [
 *            "_id": "624a6a677c8d9c9f5fd5eb5d",
            "userId": "624a4a94c66738f13854b474",
            "username": "farouq12",
            "userProfilePic": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
            "hasUpvoted": false,
            "hasDownvoted": false,
            "hasVotedOnPoll": false,
            "selectedPollOption": null,
            "numberOfViews": 680,
            "votesUpCount": 0,
            "votesDownCount": 0,
            "sharesCount": 0,
            "commentsCount": 4,
            "title": "Expressive Artistry: Painting with Emotions",
            "content": [
                "Discover the power of expressive artistry as artists paint with raw emotions, capturing the essence of human experiences on canvas."
            ],
            "community": "CreativeMindsCollective",
            "communityIcon": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1713044122/uploads/voAwqXNBDO4JwIODmO4HXXkUJbnVo_mL_bENHeagDNo_knalps.png",
            "type": "Post",
            "pollExpiration": null,
            "isPollEnabled": false,
            "pollVotingLength": "3 Days",
            "isSpoiler": false,
            "isNsfw": false,
            "sendPostReplyNotification": true,
            "isCommentsLocked": false,
            "isSaved": false,
            "isRemoved": false,
            "isApproved": true,
            "isScheduled": false,
            "isSpam": false,
            "date": "2024-05-03T23:35:13.756Z",
            "pollOptions": [],
            "attachments": []
        },
 *       ],
 *       "totalPages": 5,
 *       "currentPage": 1
 *     }
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound No posts found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Authorization token is required"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No posts found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {get} /subspreadit/:subspreaditname/hot Sort Posts by Hot within Community
 * @apiVersion 0.1.0
 * @apiName SortPostsHotCommunity
 * @apiGroup Post
 * @apiDescription Retrieves posts sorted by hotness score within a specified community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} subspreaditname Name of the community (subspreadit).
 *
 * @apiSuccess {Object[]} posts List of posts sorted by hotness score within the specified community.
 *
 *@apiSuccess {Number} totalPages Total number of pages.
 * @apiSuccess {Number} currentPage Current page number.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "posts": [
 *            "_id": "624a6a677c8d9c9f5fd5eb5d",
            "userId": "624a4a94c66738f13854b474",
            "username": "farouq12",
            "userProfilePic": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
            "hasUpvoted": false,
            "hasDownvoted": false,
            "hasVotedOnPoll": false,
            "selectedPollOption": null,
            "numberOfViews": 680,
            "votesUpCount": 0,
            "votesDownCount": 0,
            "sharesCount": 0,
            "commentsCount": 4,
            "title": "Expressive Artistry: Painting with Emotions",
            "content": [
                "Discover the power of expressive artistry as artists paint with raw emotions, capturing the essence of human experiences on canvas."
            ],
            "community": "CreativeMindsCollective",
            "communityIcon": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1713044122/uploads/voAwqXNBDO4JwIODmO4HXXkUJbnVo_mL_bENHeagDNo_knalps.png",
            "type": "Post",
            "pollExpiration": null,
            "isPollEnabled": false,
            "pollVotingLength": "3 Days",
            "isSpoiler": false,
            "isNsfw": false,
            "sendPostReplyNotification": true,
            "isCommentsLocked": false,
            "isSaved": false,
            "isRemoved": false,
            "isApproved": true,
            "isScheduled": false,
            "isSpam": false,
            "date": "2024-05-03T23:35:13.756Z",
            "pollOptions": [],
            "attachments": []
        },
 *       ],
 *       "totalPages": 5,
 *       "currentPage": 1
 *     }
 *
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound No posts found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Authorization token is required"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No posts found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {get} /subspreadit/:subspreaditname/random Sort Posts Randomly within Community
 * @apiVersion 0.1.0
 * @apiName SortPostsRandomCommunity
 * @apiGroup Post
 * @apiDescription Retrieves random posts within a specified community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} subspreaditname Name of the community (subspreadit).
 *
 * @apiSuccess {Object[]} posts List of randomly sorted posts within the specified community.
 *
 * @apiSuccess {Number} totalPages Total number of pages.
 * @apiSuccess {Number} currentPage Current page number.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "posts": [
 *            "_id": "624a6a677c8d9c9f5fd5eb5d",
            "userId": "624a4a94c66738f13854b474",
            "username": "farouq12",
            "userProfilePic": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
            "hasUpvoted": false,
            "hasDownvoted": false,
            "hasVotedOnPoll": false,
            "selectedPollOption": null,
            "numberOfViews": 680,
            "votesUpCount": 0,
            "votesDownCount": 0,
            "sharesCount": 0,
            "commentsCount": 4,
            "title": "Expressive Artistry: Painting with Emotions",
            "content": [
                "Discover the power of expressive artistry as artists paint with raw emotions, capturing the essence of human experiences on canvas."
            ],
            "community": "CreativeMindsCollective",
            "communityIcon": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1713044122/uploads/voAwqXNBDO4JwIODmO4HXXkUJbnVo_mL_bENHeagDNo_knalps.png",
            "type": "Post",
            "pollExpiration": null,
            "isPollEnabled": false,
            "pollVotingLength": "3 Days",
            "isSpoiler": false,
            "isNsfw": false,
            "sendPostReplyNotification": true,
            "isCommentsLocked": false,
            "isSaved": false,
            "isRemoved": false,
            "isApproved": true,
            "isScheduled": false,
            "isSpam": false,
            "date": "2024-05-03T23:35:13.756Z",
            "pollOptions": [],
            "attachments": []
        },
 *       ],
 *       "totalPages": 5,
 *       "currentPage": 1
 *     }
 *
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound No posts found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Authorization token is required"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No posts found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {get} /subspreadit/:subspreaditname/top/:time Sort Posts by Top within Community and Time Period
 * @apiVersion 0.1.0
 * @apiName SortPostsTopTimeCommunity
 * @apiGroup Post
 * @apiDescription Retrieves posts sorted by top within a specified community and time period.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} subspreaditname Name of the community (subspreadit).
 * @apiParam {String="now","day","week","month","year"} time Time period to sort posts (now, day, week, month, year).
 *
 * @apiSuccess {Object[]} posts List of posts sorted by top within the specified community and time period.
 *
 * @apiSuccess {Number} totalPages Total number of pages.
 * @apiSuccess {Number} currentPage Current page number.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "posts": [
 *            "_id": "624a6a677c8d9c9f5fd5eb5d",
            "userId": "624a4a94c66738f13854b474",
            "username": "farouq12",
            "userProfilePic": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
            "hasUpvoted": false,
            "hasDownvoted": false,
            "hasVotedOnPoll": false,
            "selectedPollOption": null,
            "numberOfViews": 680,
            "votesUpCount": 0,
            "votesDownCount": 0,
            "sharesCount": 0,
            "commentsCount": 4,
            "title": "Expressive Artistry: Painting with Emotions",
            "content": [
                "Discover the power of expressive artistry as artists paint with raw emotions, capturing the essence of human experiences on canvas."
            ],
            "community": "CreativeMindsCollective",
            "communityIcon": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1713044122/uploads/voAwqXNBDO4JwIODmO4HXXkUJbnVo_mL_bENHeagDNo_knalps.png",
            "type": "Post",
            "pollExpiration": null,
            "isPollEnabled": false,
            "pollVotingLength": "3 Days",
            "isSpoiler": false,
            "isNsfw": false,
            "sendPostReplyNotification": true,
            "isCommentsLocked": false,
            "isSaved": false,
            "isRemoved": false,
            "isApproved": true,
            "isScheduled": false,
            "isSpam": false,
            "date": "2024-05-03T23:35:13.756Z",
            "pollOptions": [],
            "attachments": []
        },
 *       ],
 *       "totalPages": 5,
 *       "currentPage": 1
 *     }
 *
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound No posts found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Authorization token is required"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No posts found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {get} /home/top/:time Sort Posts by Top within Time Period
 * @apiVersion 0.1.0
 * @apiName SortPostsTopTime
 * @apiGroup Post
 * @apiDescription Retrieves posts sorted by top within a specified time period.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String="now","day","week","month","year"} time Time period to sort posts (now, day, week, month, year).
 *
 * @apiSuccess {Object[]} posts List of posts sorted by top within the specified time period.
 *
 * @apiSuccess {Number} totalPages Total number of pages.
 * @apiSuccess {Number} currentPage Current page number.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "posts": [
 *            "_id": "624a6a677c8d9c9f5fd5eb5d",
            "userId": "624a4a94c66738f13854b474",
            "username": "farouq12",
            "userProfilePic": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
            "hasUpvoted": false,
            "hasDownvoted": false,
            "hasVotedOnPoll": false,
            "selectedPollOption": null,
            "numberOfViews": 680,
            "votesUpCount": 0,
            "votesDownCount": 0,
            "sharesCount": 0,
            "commentsCount": 4,
            "title": "Expressive Artistry: Painting with Emotions",
            "content": [
                "Discover the power of expressive artistry as artists paint with raw emotions, capturing the essence of human experiences on canvas."
            ],
            "community": "CreativeMindsCollective",
            "communityIcon": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1713044122/uploads/voAwqXNBDO4JwIODmO4HXXkUJbnVo_mL_bENHeagDNo_knalps.png",
            "type": "Post",
            "pollExpiration": null,
            "isPollEnabled": false,
            "pollVotingLength": "3 Days",
            "isSpoiler": false,
            "isNsfw": false,
            "sendPostReplyNotification": true,
            "isCommentsLocked": false,
            "isSaved": false,
            "isRemoved": false,
            "isApproved": true,
            "isScheduled": false,
            "isSpam": false,
            "date": "2024-05-03T23:35:13.756Z",
            "pollOptions": [],
            "attachments": []
        },
 *       ],
 *       "totalPages": 5,
 *       "currentPage": 1
 *     }
 *
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound No posts found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Authorization token is required"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No posts found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {get} /home/recentposts Get Recent Posts of User
 * @apiVersion 0.1.0
 * @apiName GetRecentPosts
 * @apiGroup Post
 * @apiDescription Retrieves the recent posts of the authenticated user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiSuccess {Object[]} recentPosts List of recent posts of the authenticated user.
 *
 * @apiSuccess {Number} totalPages Total number of pages.
 * @apiSuccess {Number} currentPage Current page number.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "posts": [
 *            "_id": "624a6a677c8d9c9f5fd5eb5d",
            "userId": "624a4a94c66738f13854b474",
            "username": "farouq12",
            "userProfilePic": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
            "hasUpvoted": false,
            "hasDownvoted": false,
            "hasVotedOnPoll": false,
            "selectedPollOption": null,
            "numberOfViews": 680,
            "votesUpCount": 0,
            "votesDownCount": 0,
            "sharesCount": 0,
            "commentsCount": 4,
            "title": "Expressive Artistry: Painting with Emotions",
            "content": [
                "Discover the power of expressive artistry as artists paint with raw emotions, capturing the essence of human experiences on canvas."
            ],
            "community": "CreativeMindsCollective",
            "communityIcon": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1713044122/uploads/voAwqXNBDO4JwIODmO4HXXkUJbnVo_mL_bENHeagDNo_knalps.png",
            "type": "Post",
            "pollExpiration": null,
            "isPollEnabled": false,
            "pollVotingLength": "3 Days",
            "isSpoiler": false,
            "isNsfw": false,
            "sendPostReplyNotification": true,
            "isCommentsLocked": false,
            "isSaved": false,
            "isRemoved": false,
            "isApproved": true,
            "isScheduled": false,
            "isSpam": false,
            "date": "2024-05-03T23:35:13.756Z",
            "pollOptions": [],
            "attachments": []
        },
 *       ],
 *       "totalPages": 5,
 *       "currentPage": 1
 *     }
 *
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound User not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Authorization token is required"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "User not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {delete} /post/deleterecent/:postId Delete Recent Post
 * @apiVersion 0.1.0
 * @apiName DeleteRecentPost
 * @apiGroup Post
 * @apiDescription Deletes a post from the recent posts of the authenticated user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} postId ID of the post to be deleted from recent posts.
 *
 * @apiSuccess {String} message Success message indicating that the post was deleted from recent posts successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Post deleted from recent successfully"
 *     }
 *
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound Post not found or user not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Authorization token is required"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Post not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */
//#endregion listing

//#region Post

/**
 * @api {post} /posts Create Post
 * @apiVersion 0.1.0
 * @apiName CreatePost
 * @apiGroup Post
 * @apiDescription Creates a new post.
 * This endpoint allows a user to create a new post with various types such as text, image/video, link, or poll.
 *
 * @apiHeader {String} Authorization User's access token obtained after authentication.
 * @apiHeader {String} Content-Type multipart/form-data
 *
 * @apiParam {String} title Title of the post.
 * @apiParam {String} [content] Content of the post (for text posts).
 * @apiParam {String} community Name of the community where the post is created.
 * @apiParam {String="Post","Images & Video","Link","Poll"} type Type of the post.
 * @apiParam {Object[]} [pollOptions] Array of poll options for poll posts.
 * @apiParam {String} pollOptions.option Option for the poll.
 * @apiParam {Number} [pollOptions.votes] Number of votes for the option (default: 0).
 * @apiParam {String} [pollVotingLength] Duration for voting on the poll (e.g., "7 days").
 * @apiParam {String} [fileType] Type of file for image/video posts.
 * @apiParam {String} [link] URL link for link posts.
 * @apiParam {Boolean} [isSpoiler] Indicates if the post contains spoiler content.
 * @apiParam {Boolean} [isNsfw] Indicates if the post is not safe for work.
 * @apiParam {Boolean} [sendPostReplyNotification] Indicates if the user should receive notifications for post replies.
 * @apiParam {String} [scheduledDate] Date and time to schedule the post (e.g., "2024-05-07 12:00").
 * @apiParam {File[]} [attachments] Array of file attachments (for image/video posts).
 *
 * @apiParamExample {json} Text Post Example:
 * {
 *   "title": "My Text Post",
 *   "content": "This is the content of my text post.",
 *   "community": "community_name",
 *   "type": "Post",
 *   "sendPostReplyNotification": true
 * }
 *
 * @apiParamExample {json} Image/Video Post Example:
 * {
 *   "title": "My Image/Video Post",
 *   "community": "community_name",
 *   "type": "Images & Video",
 *   "fileType": "image",
 *   "attachments": [
 *     {
 *       "type": "image",
 *       "link": "https://example.com/image1.jpg"
 *     },
 *     {
 *       "type": "image",
 *       "link": "https://example.com/image2.jpg"
 *     }
 *   ],
 *   "sendPostReplyNotification": true
 * }
 *
 * @apiParamExample {json} Link Post Example:
 * {
 *   "title": "My Link Post",
 *   "community": "community_name",
 *   "type": "Link",
 *   "link": "https://example.com",
 *   "sendPostReplyNotification": false
 * }
 *
 * @apiParamExample {json} Poll Post Example:
 * {
 *   "title": "My Poll Post",
 *   "community": "community_name",
 *   "type": "Poll",
 *   "pollOptions": [
 *     { "option": "Option 1", "votes": 0 },
 *     { "option": "Option 2", "votes": 0 },
 *     { "option": "Option 3", "votes": 0 }
 *   ],
 *   "pollVotingLength": "3 days",
 *   "sendPostReplyNotification": true
 * }
 *
 * @apiSuccess {String} message Success message indicating post created successfully.
 * @apiSuccess {String} postId ID of the created post.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "message": "Post created successfully",
 *       "postId": "607f1f77bcf86cd799439011"
 *     }
 *
 * @apiError (400) BadRequest Invalid post data.
 * @apiError (403) Forbidden User is banned or not authorized to create posts.
 * @apiError (404) NotFound Community not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal Server Error"
 *     }
 */

/**
 * @api {get} /posts/community/:community Get All Posts in Community
 * @apiVersion 0.1.0
 * @apiName GetAllPostsInCommunity
 * @apiGroup Post
 * @apiDescription Retrieves all posts in a specific community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} community Name of the community.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "community": "Sample Community"
 * }
 *
 * @apiSuccess {Object[]} posts Array of post objects in the specified community.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *           "_id": "1234567890",
 *           "userId": "0987654321",
 *           "username": "example_user",
 *           "userProfilePic": "http://example.com/avatar.jpg",
 *           "hasUpvoted": false,
 *           "hasDownvoted": false,
 *           "hasVotedOnPoll": false,
 *           "selectedPollOption": null,
 *           "numberOfViews": 1080,
 *           "votesUpCount": 10,
 *           "votesDownCount": 2,
 *           "sharesCount": 5,
 *           "commentsCount": 15,
 *           "title": "Sample Title",
 *           "content": "Sample Content",
 *           "community": "Sample Community",
 *           "type": "Post",
 *           "link": "http://example.com",
 *           "pollExpiration": "2024-04-16T12:00:00.000Z",
 *           "isPollEnabled": true,
 *           "pollVotingLength": "7 days",
 *           "isSpoiler": false,
 *           "isNsfw": false,
 *           "sendPostReplyNotification": true,
 *           "isCommentsLocked": false,
 *           "isSaved": false,
 *           "date": "2024-04-16T10:00:00.000Z",
 *           "pollOptions": [],
 *           "attachments": []
 *       }
 *     ]
 *
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound Community not found or no posts in the specified community.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Posts not found in the specified community"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {post} /posts/:postId/save Save Post
 * @apiVersion 0.1.0
 * @apiName SavePost
 * @apiGroup Post
 * @apiDescription Saves a post for the authenticated user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} postId ID of the post to be saved.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "postId": "1234567890"
 * }
 *
 * @apiSuccess {String} message Success message indicating that the post has been saved successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Post saved successfully"
 *     }
 *
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound Post or user not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Post ID is required"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {post} /posts/:postId/unsave Unsave Post
 * @apiVersion 0.1.0
 * @apiName UnsavePost
 * @apiGroup Post
 * @apiDescription Unsave a previously saved post for the authenticated user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} postId ID of the post to be unsaved.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "postId": "1234567890"
 * }
 *
 * @apiSuccess {String} message Success message indicating that the post has been unsaved successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Post unsaved successfully"
 *     }
 *
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound Post or user not found, or post not saved by the user.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Post ID is required"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {get} /posts/save Get Saved Posts
 * @apiVersion 0.1.0
 * @apiName GetSavedPosts
 * @apiGroup Post
 * @apiDescription Retrieves all posts saved by the authenticated user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiSuccess {Object[]} posts Array of post objects saved by the authenticated user.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     posts: [
 *       {
 *           "_id": "1234567890",
 *           "userId": "0987654321",
 *           "username": "example_user",
 *           "userProfilePic": "http://example.com/avatar.jpg",
 *           "hasUpvoted": false,
 *           "hasDownvoted": false,
 *           "hasVotedOnPoll": false,
 *           "selectedPollOption": null,
 *           "numberOfViews": 1080,
 *           "votesUpCount": 10,
 *           "votesDownCount": 2,
 *           "sharesCount": 5,
 *           "commentsCount": 15,
 *           "title": "Sample Title",
 *           "content": "Sample Content",
 *           "community": "Sample Community",
 *           "type": "Post",
 *           "link": "http://example.com",
 *           "pollExpiration": "2024-04-16T12:00:00.000Z",
 *           "isPollEnabled": true,
 *           "pollVotingLength": "7 days",
 *           "isSpoiler": false,
 *           "isNsfw": false,
 *           "sendPostReplyNotification": true,
 *           "isCommentsLocked": false,
 *           "isSaved": true,
 *           "date": "2024-04-16T10:00:00.000Z",
 *           "pollOptions": [],
 *           "attachments": []
 *       }
 *     ]
 *
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound User not found or no saved posts found for the user.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No saved posts found for the user"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {delete} /posts/:postId Delete Post
 * @apiVersion 0.1.0
 * @apiName DeletePost
 * @apiGroup Post
 * @apiDescription Deletes a post with the specified ID.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} postId ID of the post to be deleted.
 *
 * @apiSuccess {String} message Success message indicating that the post has been deleted successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Post deleted successfully"
 *     }
 *
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound Post not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Post not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {put} /posts/:postId/edit Edit Post
 * @apiVersion 0.1.0
 * @apiName EditPost
 * @apiGroup Post
 * @apiDescription Edits a post with the specified ID.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} postId ID of the post to be edited.
 * @apiParam {String} [content] New content of the post.
 *
 * @apiSuccess {String} message Success message indicating that the post has been edited successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Post edited successfully"
 *     }
 *
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (403) Forbidden User is not authorized to edit this post.
 * @apiError (404) NotFound Post not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Post not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {post} /posts/:postId/spoiler Spoiler Post Content
 * @apiVersion 0.1.0
 * @apiName SpoilerPostContent
 * @apiGroup Post
 * @apiDescription Spoilers the content of a post with the specified ID.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} postId ID of the post to be spoilered.
 *
 * @apiSuccess {String} message Success message indicating that the post content has been spoilered successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Post content blurred successfully"
 *     }
 *
 * @apiError (404) NotFound Post not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Post not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {post} /posts/:postId/unspoiler Unspoiler Post Content
 * @apiVersion 0.1.0
 * @apiName UnspoilerPostContent
 * @apiGroup Post
 * @apiDescription Removes the spoiler from the content of a post with the specified ID.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} postId ID of the post to be unspoilered.
 *
 * @apiSuccess {String} message Success message indicating that the post content has been unspoilered successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Post content unblurred successfully"
 *     }
 *
 * @apiError (404) NotFound Post not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Post not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {post} /posts/:postId/lock Lock Post Comments
 * @apiVersion 0.1.0
 * @apiName LockPostComments
 * @apiGroup Post
 * @apiDescription Locks the comments on a post with the specified ID.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} postId ID of the post to lock comments.
 *
 * @apiSuccess {String} message Success message indicating that the comments on the post have been locked successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Post comments locked successfully"
 *     }
 *
 * @apiError (404) NotFound Post not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Post not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {post} /posts/:postId/unlock Unlock Post Comments
 * @apiVersion 0.1.0
 * @apiName UnlockPostComments
 * @apiGroup Post
 * @apiDescription Unlocks the comments on a post with the specified ID.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} postId ID of the post to unlock comments.
 *
 * @apiSuccess {String} message Success message indicating that the comments on the post have been unlocked successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Post comments unlocked successfully"
 *     }
 *
 * @apiError (404) NotFound Post not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Post not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {post} /posts/:postId/upvote Upvote Post
 * @apiVersion 0.1.0
 * @apiName UpvotePost
 * @apiGroup Post
 * @apiDescription Upvotes a post with the specified ID.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} postId ID of the post to upvote.
 *
 * @apiSuccess {Number} votes Net votes of the post after upvoting.
 * @apiSuccess {String} message Success message indicating that the post has been upvoted successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "votes": 5,
 *       "message": "Post has been upvoted successfully"
 *     }
 *
 * @apiError (404) NotFound Post not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Post not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {post} /posts/:postId/downvote Downvote Post
 * @apiVersion 0.1.0
 * @apiName DownvotePost
 * @apiGroup Post
 * @apiDescription Downvotes a post with the specified ID.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} postId ID of the post to downvote.
 *
 * @apiSuccess {Number} votes Net votes of the post after downvoting.
 * @apiSuccess {String} message Success message indicating that the post has been downvoted successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "votes": -3,
 *       "message": "Post has been downvoted successfully"
 *     }
 *
 * @apiError (404) NotFound Post not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Post not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {get} /posts/upvote Get Upvoted Posts
 * @apiVersion 0.1.0
 * @apiName GetUpvotedPosts
 * @apiGroup Post
 * @apiDescription Retrieves all posts upvoted by the authenticated user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiSuccess {Object[]} posts Array of post objects upvoted by the user.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     posts: [
 *       {
 *           "_id": "1234567890",
 *           "userId": "0987654321",
 *           "username": "example_user",
 *           "userProfilePic": "http://example.com/avatar.jpg",
 *           "hasUpvoted": true,
 *           "hasDownvoted": false,
 *           "hasVotedOnPoll": false,
 *           "selectedPollOption": null,
 *           "numberOfViews": 1080,
 *           "votesUpCount": 10,
 *           "votesDownCount": 2,
 *           "sharesCount": 5,
 *           "commentsCount": 15,
 *           "title": "Sample Title",
 *           "content": "Sample Content",
 *           "community": "Sample Community",
 *           "type": "Post",
 *           "link": "http://example.com",
 *           "pollExpiration": "2024-04-16T12:00:00.000Z",
 *           "isPollEnabled": true,
 *           "pollVotingLength": "7 days",
 *           "isSpoiler": false,
 *           "isNsfw": false,
 *           "sendPostReplyNotification": true,
 *           "isCommentsLocked": false,
 *           "isSaved": false,
 *           "date": "2024-04-16T10:00:00.000Z",
 *           "pollOptions": [],
 *           "attachments": []
 *       }
 *     ]
 *
 * @apiError (404) NotFound Posts not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Posts not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {get} /posts/downvote Get Downvoted Posts
 * @apiVersion 0.1.0
 * @apiName GetDownvotedPosts
 * @apiGroup Post
 * @apiDescription Retrieves all posts downvoted by the authenticated user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiSuccess {Object[]} posts Array of post objects downvoted by the user.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     posts: [
 *       {
 *           "_id": "1234567890",
 *           "userId": "0987654321",
 *           "username": "example_user",
 *           "userProfilePic": "http://example.com/avatar.jpg",
 *           "hasUpvoted": false,
 *           "hasDownvoted": true,
 *           "hasVotedOnPoll": false,
 *           "selectedPollOption": null,
 *           "numberOfViews": 1080,
 *           "votesUpCount": 10,
 *           "votesDownCount": 2,
 *           "sharesCount": 5,
 *           "commentsCount": 15,
 *           "title": "Sample Title",
 *           "content": "Sample Content",
 *           "community": "Sample Community",
 *           "type": "Post",
 *           "link": "http://example.com",
 *           "pollExpiration": "2024-04-16T12:00:00.000Z",
 *           "isPollEnabled": true,
 *           "pollVotingLength": "7 days",
 *           "isSpoiler": false,
 *           "isNsfw": false,
 *           "sendPostReplyNotification": true,
 *           "isCommentsLocked": false,
 *           "isSaved": false,
 *           "date": "2024-04-16T10:00:00.000Z",
 *           "pollOptions": [],
 *           "attachments": []
 *       }
 *     ]
 *
 * @apiError (404) NotFound Posts not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Posts not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {post} /posts/:postId/hide Hide Post
 * @apiVersion 0.1.0
 * @apiName HidePost
 * @apiGroup Post
 * @apiDescription Hides a post for the authenticated user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} postId ID of the post to hide.
 *
 * @apiSuccess {String} message Success message indicating that the post has been hidden successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Post hidden successfully"
 *     }
 *
 * @apiError (400) BadRequest Post is already hidden by the user.
 * @apiError (404) NotFound Post not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Post is already hidden by the user"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Post not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {post} /posts/:postId/unhide Unhide Post
 * @apiVersion 0.1.0
 * @apiName UnhidePost
 * @apiGroup Post
 * @apiDescription Unhides a previously hidden post for the authenticated user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} postId ID of the post to unhide.
 *
 * @apiSuccess {String} message Success message indicating that the post has been unhidden successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Post unhidden successfully"
 *     }
 *
 * @apiError (400) BadRequest Post is not hidden by the user.
 * @apiError (404) NotFound Post not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Post is not hidden by the user"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Post not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {get} /posts/hide Get Hidden Posts
 * @apiVersion 0.1.0
 * @apiName GetHiddenPosts
 * @apiGroup Post
 * @apiDescription Retrieves all posts hidden by the authenticated user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiSuccess {Object[]} hiddenPosts Array of post objects hidden by the user.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     posts: [
 *       {
 *           "_id": "1234567890",
 *           "userId": "0987654321",
 *           "username": "example_user",
 *           "userProfilePic": "http://example.com/avatar.jpg",
 *           "hasUpvoted": false,
 *           "hasDownvoted": false,
 *           "hasVotedOnPoll": false,
 *           "selectedPollOption": null,
 *           "numberOfViews": 1080,
 *           "votesUpCount": 10,
 *           "votesDownCount": 2,
 *           "sharesCount": 5,
 *           "commentsCount": 15,
 *           "title": "Sample Title",
 *           "content": "Sample Content",
 *           "community": "Sample Community",
 *           "type": "Post",
 *           "link": "http://example.com",
 *           "pollExpiration": "2024-04-16T12:00:00.000Z",
 *           "isPollEnabled": true,
 *           "pollVotingLength": "7 days",
 *           "isSpoiler": false,
 *           "isNsfw": false,
 *           "sendPostReplyNotification": true,
 *           "isCommentsLocked": false,
 *           "isSaved": false,
 *           "date": "2024-04-16T10:00:00.000Z",
 *           "pollOptions": [],
 *           "attachments": []
 *       }
 *     ]
 *
 * @apiError (404) NotFound No hidden posts found for the user.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "No hidden posts found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {post} /posts/:postId/nsfw Mark Post as NSFW
 * @apiVersion 0.1.0
 * @apiName MarkPostAsNsfw
 * @apiGroup Post
 * @apiDescription Marks a post as Not Safe For Work (NSFW).
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} postId ID of the post to be marked as NSFW.
 *
 * @apiSuccess {String} message Success message indicating that the post has been marked as NSFW.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Post updated successfully"
 *     }
 *
 * @apiError (404) NotFound Post not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Post not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {post} /posts/:postId/unnsfw Mark Post as Not NSFW
 * @apiVersion 0.1.0
 * @apiName MarkPostAsNotNsfw
 * @apiGroup Post
 * @apiDescription Marks a post as Not Not Safe For Work (NSFW).
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} postId ID of the post to be marked as not NSFW.
 *
 * @apiSuccess {String} message Success message indicating that the post has been marked as not NSFW.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Post updated successfully"
 *     }
 *
 * @apiError (404) NotFound Post not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Post not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {post} /posts/:postId/report Report Post
 * @apiVersion 0.1.0
 * @apiName ReportPost
 * @apiGroup Post
 * @apiDescription Reports a post for moderation.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} postId ID of the post to be reported.
 * @apiParam {String} reason Reason for reporting the post.
 * @apiParam {String} [subreason] Supplementary reason for reporting the post.
 *
 * @apiSuccess {String} message Success message indicating that the post has been reported successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "message": "post reported successfully"
 *     }
 *
 * @apiError (400) BadRequest Invalid report data. Must include a reason for reporting the post.
 * @apiError (404) NotFound Post not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "invalid report data must send reason"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Post not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "An error occurred while reporting the post"
 *     }
 */

/**
 * @api {post} /posts/:postId/poll/vote Vote in Poll
 * @apiVersion 0.1.0
 * @apiName VoteInPoll
 * @apiGroup Post
 * @apiDescription Casts a user's vote in a poll associated with a post.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} postId ID of the post containing the poll.
 * @apiParam {String} selectedOption The option selected by the user.
 *
 * @apiSuccess {String} message Success message indicating that the vote has been cast successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Vote cast successfully"
 *     }
 *
 * @apiError (400) BadRequest Post ID and selected option are required.
 * @apiError (404) NotFound Post not found or selected option not found in the poll.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Post ID and selected option are required"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Post not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {get} /posts/:postId Get Post by ID
 * @apiVersion 0.1.0
 * @apiName GetPostById
 * @apiGroup Post
 * @apiDescription Retrieves a post by its ID.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} postId ID of the post to retrieve.
 *
 * @apiSuccess {Object} postInfo Information about the post.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "_id": "postId",
 *       "userId": "userId",
 *       "username": "username",
 *       "userProfilePic": "userAvatar",
 *       "hasUpvoted": true,
 *       "hasDownvoted": false,
 *       "hasVotedOnPoll": true,
 *       "selectedPollOption": "pollOption",
 *       "numberOfViews": 1080,
 *       "isHidden": false,
 *       "votesUpCount": 5,
 *       "votesDownCount": 2,
 *       "sharesCount": 3,
 *       "commentsCount": 10,
 *       "title": "Post Title",
 *       "content": "Post Content",
 *       "community": "Community",
 *       "type": "Post",
 *       "link": "http://example.com",
 *       "pollExpiration": "2024-12-31T00:00:00.000Z",
 *       "isPollEnabled": true,
 *       "pollVotingLength": 7,
 *       "isSpoiler": false,
 *       "isNsfw": false,
 *       "sendPostReplyNotification": true,
 *       "isCommentsLocked": false,
 *       "isSaved": true,
 *       "date": "2024-04-18T12:00:00.000Z",
 *       "pollOptions": ["Option 1", "Option 2"],
 *       "attachments": []
 *     }
 *
 * @apiError (404) NotFound Post not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Post not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {get} /posts/username/:username Get All User Posts
 * @apiVersion 0.1.0
 * @apiName GetAllUserPosts
 * @apiGroup Post
 * @apiDescription Retrieves all posts created by a user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} username Username of the user whose posts are to be retrieved.
 *
 * @apiSuccess {Object[]} postInfoArray Array of post information.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     posts: [
 *       {
 *         "_id": "postId",
 *         "userId": "userId",
 *         "username": "username",
 *         "userProfilePic": "userAvatar",
 *         "hasUpvoted": true,
 *         "hasDownvoted": false,
 *         "hasVotedOnPoll": true,
 *         "selectedPollOption": "pollOption",
 *         "numberOfViews": 1080,
 *         "votesUpCount": 5,
 *         "votesDownCount": 2,
 *         "sharesCount": 3,
 *         "commentsCount": 10,
 *         "title": "Post Title",
 *         "content": "Post Content",
 *         "community": "Community",
 *         "type": "Post",
 *         "link": "http://example.com",
 *         "pollExpiration": "2024-12-31T00:00:00.000Z",
 *         "isPollEnabled": true,
 *         "pollVotingLength": 7,
 *         "isSpoiler": false,
 *         "isNsfw": false,
 *         "sendPostReplyNotification": true,
 *         "isCommentsLocked": false,
 *         "isSaved": true,
 *         "date": "2024-04-18T12:00:00.000Z",
 *         "pollOptions": ["Option 1", "Option 2"],
 *         "attachments": []
 *       },
 *       {
 *         // Next post...
 *       }
 *     ]
 *
 * @apiError (404) NotFound User not found or user has no posts.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "User not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

//#endregion Post

//#region Settings

/**
 * @api {get} /settings/account Get Account Settings
 * @apiVersion 0.1.0
 * @apiName GetAccountSettings
 * @apiGroup Settings
 * @apiDescription Retrieves the account settings of the authenticated user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiSuccess {Object} accountSettings Account settings of the authenticated user.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "email": "user@example.com",
 *       "gender": "male",
 *       "country": "USA",
 *       "connectedAccounts": ["test@gmail.com","test2@gmail.com"]
 *     }
 *
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Unauthorized"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {put} /settings/account Modify Account Settings
 * @apiVersion 0.1.0
 * @apiName ModifyAccountSettings
 * @apiGroup Settings
 * @apiDescription Modifies the account settings of the authenticated user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} [email] User's email address.
 * @apiParam {String} [gender] User's gender.
 * @apiParam {String} [country] User's country.
 * @apiParam {String[]} [connectedAccounts] Array of emails of connected social media accounts.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "email": "newemail@example.com",
 *    "gender": "female",
 *    "country": "Canada",
 *    "connectedAccounts": ["test@gmail.com", "test2@gmail.com"]
 * }
 *
 * @apiSuccess {String} message Success message indicating that the account settings have been modified successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Account settings modified successfully"
 *     }
 *
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (403) Forbidden Invalid email format.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "error": "Invalid email format"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {post} /google/connected-accounts Add Connected Google Accounts
 * @apiName AddConnectedGoogleAccounts
 * @apiGroup settings
 * @apiDescription Adds connected Google accounts to the user profile.
 *
 * @apiHeader {String} Authorization User's access token.
 *
 * @apiSuccess {Object} user User object with updated connected accounts.
 * @apiSuccess {String} message Success message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user": {
 *         // User object
 *       },
 *       "message": "Connected Accounts has been added successfully"
 *     }
 *
 * @apiError InvalidUser Invalid user data.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Invalid User data"
 *     }
 *
 * @apiError InternalServerError Internal server error.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal Server Error"
 *     }
 */

/**
 * @api {post} /settings/add-password/email Request Email for Adding Password
 * @apiName RequestEmailForAddingPassword
 * @apiGroup Settings
 * @apiDescription Requests an email to add a password for the user account.
 *
 * @apiHeader {String} Authorization User's access token.
 *
 * @apiSuccess {String} message Success message.
 * @apiParam {Boolean} is_cross Indicates whether the user is from cross platform or not
 * @apiParamExample {json} Request-Example:
 * {
 *      "is_cross": true
 * }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "email for adding the password is sent successfully"
 *     }
 *
 * @apiError UserNotFound User not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "User not found"
 *     }
 *
 * @apiError InternalServerError Internal server error.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {post} /settings/add-password Add Password via Email Confirmation
 * @apiName AddPasswordViaEmailConfirmation
 * @apiGroup Settings
 * @apiDescription Adds password to the user account via email confirmation.
 *
 * @apiHeader {String} Authorization User's access token.
 *
 * @apiParam {String} password User's new password.
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *      "password": "myPassword123",
 * }
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Password added successfully"
 *     }
 *
 * @apiError UserNotFound User not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "User not found"
 *     }
 *
 * @apiError InternalServerError Internal server error.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {delete} /settings/account Delete Account
 * @apiVersion 0.1.0
 * @apiName DeleteAccount
 * @apiGroup Settings
 * @apiDescription Deletes the account of the authenticated user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiSuccess {String} message Success message indicating that the account has been deleted successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Account deleted successfully"
 *     }
 *
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Unauthorized"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {get} /settings/chat-and-messaging Get Chat and Messaging Settings
 * @apiVersion 0.1.0
 * @apiName GetChatAndMessagingSetting
 * @apiGroup Settings
 * @apiDescription Retrieves the chat and messaging settings of the authenticated user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiSuccess {Object} chatAndMessagingSetting Chat and messaging settings of the authenticated user.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "sendYouFriendRequests": "Everyone",
 *       "sendYouPrivateMessages": "Everyone",
 *       "approvedUsers": ["user1", "user2"]
 *     }
 *
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Unauthorized"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {put} /settings/chat-and-messaging Modify Chat and Messaging Settings
 * @apiVersion 0.1.0
 * @apiName ModifyChatAndMessagingSetting
 * @apiGroup Settings
 * @apiDescription Modifies the chat and messaging settings of the authenticated user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String="Everyone", "Accounts Older Than 30 Days", "Nobody"} [sendYouFriendRequests] Indicates who can send friend requests.
 * @apiParam {String="Everyone", "Nobody"} [sendYouPrivateMessages] Indicates who can send private messages.
 * @apiParam {String[]} [approvedUsers] Array of approved users who can send messages.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "sendYouFriendRequests": "Nobody",
 *    "sendYouPrivateMessages": "Everyone",
 *    "approvedUsers": ["user3", "user4"]
 * }
 *
 * @apiSuccess {String} message Success message indicating that the chat and messaging settings have been modified successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Chat and messaging settings modified successfully"
 *     }
 *
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Invalid request body"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */
/**
 * @api {post} /settings/chat-and-messaging/make-all-as-read Make All Messages as Read
 * @apiVersion 0.1.0
 * @apiName MakeAllMessagesAsRead
 * @apiGroup Settings
 * @apiDescription Marks all unread messages as read for the authenticated user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiSuccess {String} message Success message indicating that all messages have been marked as read successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "All messages marked as read successfully"
 *     }
 *
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Unauthorized"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {get} /settings/email Get Email Settings
 * @apiVersion 0.1.0
 * @apiName GetEmailSetting
 * @apiGroup Settings
 * @apiDescription Retrieves the email notification settings of the authenticated user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiSuccess {Object} emailSetting Email notification settings of the authenticated user.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "newFollowerEmail": true,
 *       "chatRequestEmail": true,
 *       "unsubscribeAllEmails": false
 *     }
 *
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Unauthorized"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {put} /settings/email Modify Email Settings
 * @apiVersion 0.1.0
 * @apiName ModifyEmailSetting
 * @apiGroup Settings
 * @apiDescription Modifies the email notification settings of the authenticated user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {Boolean} [newFollowerEmail] Indicates whether to receive email notifications for new followers.
 * @apiParam {Boolean} [chatRequestEmail] Indicates whether to receive email notifications for chat requests.
 * @apiParam {Boolean} [unsubscribeAllEmails] Indicates whether to unsubscribe from all email notifications.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "newFollowerEmail": false,
 *    "chatRequestEmail": true,
 *    "unsubscribeAllEmails": false
 * }
 *
 * @apiSuccess {String} message Success message indicating that the email settings have been modified successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Email settings modified successfully"
 *     }
 *
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Invalid request body"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {get} /settings/feed Get Feed Settings
 * @apiVersion 0.1.0
 * @apiName GetFeedSetting
 * @apiGroup Settings
 * @apiDescription Retrieves the feed settings of the authenticated user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiSuccess {Object} feedSetting Feed settings of the authenticated user.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "adultContent": false,
 *       "autoplayMedia": true,
 *       "communityThemes": true,
 *       "communityContentSort": "hot",
 *       "globalContentView": true,
 *       "openPostsInNewTab": false
 *     }
 *
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Unauthorized"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {put} /settings/feed Modify Feed Settings
 * @apiVersion 0.1.0
 * @apiName ModifyFeedSetting
 * @apiGroup Settings
 * @apiDescription Modifies the feed settings of the authenticated user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {Boolean} [adultContent] Indicates whether to show adult content in the feed.
 * @apiParam {Boolean} [autoplayMedia] Indicates whether to autoplay media in the feed.
 * @apiParam {Boolean} [communityThemes] Indicates whether to use community themes in the feed.
 * @apiParam {String="hot","new","top"} [communityContentSort] Sort order of community content in the feed.
 * @apiParam {Boolean} [globalContentView] Indicates whether to enable global content view in the feed.
 * @apiParam {Boolean} [openPostsInNewTab] Indicates whether to open posts in a new tab.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "adultContent": false,
 *    "autoplayMedia": true,
 *    "communityThemes": true,
 *    "communityContentSort": "new",
 *    "globalContentView": false,
 *    "openPostsInNewTab": true
 * }
 *
 * @apiSuccess {String} message Success message indicating that the feed settings have been modified successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Feed settings modified successfully"
 *     }
 *
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Invalid request body"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {put} /settings/layout Check Password Match
 * @apiVersion 0.1.0
 * @apiName CheckPasswordMatch
 * @apiGroup Settings
 * @apiDescription Checks if the entered password matches the user's current password.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} enteredPassword Entered password to be checked.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "enteredPassword": "currentPassword123"
 * }
 *
 * @apiSuccess {String} message Success message indicating that the entered password matches.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Password matches"
 *     }
 *
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Unauthorized"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {get} /settings/notifications Get Notification Settings
 * @apiVersion 0.1.0
 * @apiName GetNotificationSettings
 * @apiGroup Settings
 * @apiDescription Retrieves the notification settings of the current user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiSuccess {Object} notificationSetting Object containing the notification settings.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "mentions": true,
 *       "comments": true,
 *       "upvotesComments": true,
 *       "upvotesPosts": true,
 *       "replies": true,
 *       "newFollowers": true,
 *       "invitations": true,
 *       "posts": true
 *     }
 *
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Unauthorized"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {put} /settings/notifications Modify Notification Settings
 * @apiVersion 0.1.0
 * @apiName ModifyNotificationSettings
 * @apiGroup Settings
 * @apiDescription Modifies the notification settings of the current user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {Object} modifyNotificationSetting Object containing the modified notification settings.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "mentions": true,
 *    "comments": true,
 *    "upvotesComments": false,
 *    "upvotesPosts": true,
 *    "replies": false,
 *    "newFollowers": true,
 *    "invitations": true,
 *    "posts": true
 * }
 *
 * @apiSuccess {String} message Success message indicating that the notification settings have been successfully updated.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Successful update"
 *     }
 *
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Unauthorized"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {get} /settings/profile Get Profile Settings
 * @apiVersion 0.1.0
 * @apiName GetProfileSettings
 * @apiGroup Settings
 * @apiDescription Retrieves the profile settings of the current user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiSuccess {Object} profileSettings Object containing the profile settings.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "displayName": "John Doe",
 *       "about": "Lorem ipsum dolor sit amet...",
 *       "socialLinks": [
 *      {
 *          "platform": "facebook",
 *          "url": "https://www.facebook.com/sample_user",
 *          "displayName": "FacebookGroup"
 *      },
 *      {
 *          "platform": "twitter",
 *          "url": "https://twitter.com/sample_user",
 *          "displayName": "TwitterProfile"
 *      }
 *      ],
 *       "avatar": "http://example.com/profile.jpg",
 *       "banner": "http://example.com/banner.jpg",
 *       "nsfw": false,
 *       "allowFollow": true,
 *       "contentVisibility": "Public",
 *       "activeInCommunityVisibility": "Public",
 *       "clearHistory": false
 *     }
 *
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Unauthorized"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {put} /settings/profile Modify Profile Settings
 * @apiVersion 0.1.0
 * @apiName ModifyProfileSettings
 * @apiGroup Settings
 * @apiDescription Modifies the profile settings of the current user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {Object} modifyProfileSettings Object containing the modified profile settings.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "displayName": "John Doe",
 *    "about": "Updated about section...",
 *    "socialLinks": [
 *      {
 *          "platform": "facebook",
 *          "url": "https://www.facebook.com/sample_user",
 *          "displayName": "FacebookGroup"
 *      },
 *      {
 *          "platform": "twitter",
 *          "url": "https://twitter.com/sample_user",
 *          "displayName": "TwitterProfile"
 *      }
 *      ],
 *    "avatar": "http://example.com/profile_updated.jpg",
 *    "banner": "http://example.com/banner_updated.jpg",
 *    "nsfw": true,
 *    "allowFollow": false,
 *    "contentVisibility": "Private",
 *    "activeInCommunityVisibility": "Private",
 *    "clearHistory": true
 * }
 *
 * @apiSuccess {String} message Success message indicating that the profile settings have been successfully updated.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Successful update"
 *     }
 *
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Unauthorized"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {get} /settings/safety-privacy Get Safety and Privacy Settings
 * @apiVersion 0.1.0
 * @apiName GetSafetyAndPrivacySettings
 * @apiGroup Settings
 * @apiDescription Retrieves the safety and privacy settings of the current user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiSuccess {Object} safetyAndPrivacySettings Object containing the safety and privacy settings.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "blockedUsers": [
 *           {
 *               "_id": "606622dd82f5dae2fd4861825",
 *               "username": "farouq12",
 *               "avatar": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1713826823/uploads/avatar-1713826815124.png.png"
 *           }
 *       ],
 *       "mutedCommunities": [
 *           {
 *               "_id": "6622dd82f5dae2fd48618267",
 *               "name": "GourmetAdventures",
 *               "image": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1713044122/uploads/voAwqXNBDO4JwIODmO4HXXkUJbnVo_mL_bENHeagDNo_knalps.png"
 *           },
 *           {
 *               "_id": "6622dd82f5dae2fd48618272",
 *               "name": "TravelEnthusiasts",
 *               "image": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1713044122/uploads/voAwqXNBDO4JwIODmO4HXXkUJbnVo_mL_bENHeagDNo_knalps.png"
 *           }
 *       ]
 *     }
 *
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Unauthorized"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {put} /settings/safety-privacy Modify Safety and Privacy Settings
 * @apiVersion 0.1.0
 * @apiName ModifySafetyAndPrivacySettings
 * @apiGroup Settings
 * @apiDescription Modifies the safety and privacy settings of the current user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {Object} modifySafetyAndPrivacySettings Object containing the modified safety and privacy settings.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "blockedUsername": "farouq12",
 *    "mutedCommunityname ": "Programming"
 * }
 *
 * @apiSuccess {String} message Success message indicating that the safety and privacy settings have been successfully updated.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Successful update"
 *     }
 *
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Unauthorized"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

//#endregion Settings

//#region Mobile Settings

/**
 * @api {get} /mobile/settings/general/account Get Account Settings (Mobile)
 * @apiVersion 0.1.0
 * @apiName GetAccountSettingsMobile
 * @apiGroup Mobile Settings
 * @apiDescription Retrieves the account settings of the current user for mobile devices.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiSuccess {Object} accountSettings Object containing the account settings.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "email": "user@example.com",
 *       "gender": "male",
 *       "country": "US",
 *       "connectedAccounts": ["test@gmail.com", "test2@gmail.com"]
 *     }
 *
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Unauthorized"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {put} /mobile/settings/general/account Modify Account Settings (Mobile)
 * @apiVersion 0.1.0
 * @apiName ModifyAccountSettingsMobile
 * @apiGroup Mobile Settings
 * @apiDescription Modifies the account settings of the current user for mobile devices.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} [email] User's email address.
 * @apiParam {String} [gender] User's gender.
 * @apiParam {String} [country] User's country.
 * @apiParam {String[]} [connectedAccounts] Array of emails of connected accounts.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "email": "newemail@example.com",
 *    "gender": "female",
 *    "country": "UK",
 *    "connectedAccounts": ["test@gmail.com", "test2@gmail.com"]
 * }
 *
 * @apiSuccess {String} message Success message indicating that the account settings have been successfully updated.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Successful update"
 *     }
 *
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Invalid email format"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {delete} /mobile/settings/general/account Delete Account (Mobile)
 * @apiVersion 0.1.0
 * @apiName DeleteAccountMobile
 * @apiGroup Mobile Settings
 * @apiDescription Deletes the account of the current user for mobile devices.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiSuccess {String} message Success message indicating that the account has been deleted successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Account deleted successfully"
 *     }
 *
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Unauthorized"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {get} /mobile/settings/blocking-permissions Get Blocking and Permissions Setting (Mobile)
 * @apiVersion 0.1.0
 * @apiName GetBlockingSettingMobile
 * @apiGroup Mobile Settings
 * @apiDescription Retrieves the blocking and permissions settings of the current user for mobile devices.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiSuccess {Object} blockingSetting Object containing the blocking and permissions settings.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "blockedUsers": [
 *           {
 *               "_id": "606622dd82f5dae2fd4861825",
 *               "username": "farouq12",
 *               "avatar": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1713826823/uploads/avatar-1713826815124.png.png"
 *           }
 *       ],
 *       "allowFollow": true
 *     }
 *
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Unauthorized"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {put} /mobile/settings/blocking-permissions Modify Blocking and Permissions Setting (Mobile)
 * @apiVersion 0.1.0
 * @apiName ModifyBlockingSettingMobile
 * @apiGroup Mobile Settings
 * @apiDescription Modifies the blocking and permissions settings of the current user for mobile devices.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} [blockedUser] username of the user you want to add to blocklist.
 * @apiParam {Boolean} [allowFollow] Indicates whether to allow followers.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "blockedUser": "farouq12",
 *    "allowFollow": false
 * }
 *
 * @apiSuccess {String} message Success message indicating that the blocking and permissions settings have been successfully updated.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Successful update"
 *     }
 *
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Invalid parameters"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {get} /mobile/settings/contact Get Contact Setting (Mobile)
 * @apiVersion 0.1.0
 * @apiName GetContactSettingMobile
 * @apiGroup Mobile Settings
 * @apiDescription Retrieves the contact settings of the current user for mobile devices.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiSuccess {Object} contactSetting Object containing the contact settings.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "inboxMessages": true,
 *       "chatMessages": true,
 *       "chatRequests": true,
 *       "mentions": true,
 *       "commentsOnYourPost": true,
 *       "commentsYouFollow": true,
 *       "upvotes": true,
 *       "repliesToComments": true,
 *       "newFollowers": true,
 *       "cakeDay": true,
 *       "modNotifications": true
 *     }
 *
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Unauthorized"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {put} /mobile/settings/contact Modify Contact Setting (Mobile)
 * @apiVersion 0.1.0
 * @apiName ModifyContactSettingMobile
 * @apiGroup Mobile Settings
 * @apiDescription Modifies the contact settings of the current user for mobile devices.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {Boolean} [inboxMessages] Indicates whether to receive inbox messages.
 * @apiParam {Boolean} [chatMessages] Indicates whether to receive chat messages.
 * @apiParam {Boolean} [chatRequests] Indicates whether to receive chat requests.
 * @apiParam {Boolean} [mentions] Indicates whether to receive mentions.
 * @apiParam {Boolean} [commentsOnYourPost] Indicates whether to receive comments on your posts.
 * @apiParam {Boolean} [commentsYouFollow] Indicates whether to receive comments you follow.
 * @apiParam {Boolean} [upvotes] Indicates whether to receive upvotes.
 * @apiParam {Boolean} [repliesToComments] Indicates whether to receive replies to comments.
 * @apiParam {Boolean} [newFollowers] Indicates whether to receive notifications for new followers.
 * @apiParam {Boolean} [cakeDay] Indicates whether to receive notifications for cake day.
 * @apiParam {Boolean} [modNotifications] Indicates whether to receive mod notifications.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "inboxMessages": false,
 *    "chatMessages": true,
 *    "chatRequests": true
 * }
 *
 * @apiSuccess {String} message Success message indicating that the contact settings have been successfully updated.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Successful update"
 *     }
 *
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Invalid parameters"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

//#endregion Mobile Settings

//#region Moderation
/**
 * @api {post} /community/moderation/:communityName/spam-comment/:commentId Mark Comment as Spam
 * @apiVersion 0.1.0
 * @apiName MarkCommentAsSpam
 * @apiGroup Moderation
 *
 * @apiDescription Marks a comment as spam by its ID.
 *
 * @apiHeader {String} Authorization User's access token.
 *
 * @apiParam {String} communityName Name of the community.
 * @apiParam {String} commentId ID of the comment to mark as spam.
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Comment marked as spam successfully"
 *     }
 *
 * @apiError NotAuthorized The user is not authorized to perform this action.
 * @apiError NotModerator User is not a moderator of the community.
 * @apiError NoPermission Moderator doesn't have permission.
 * @apiError CommentNotFound The specified comment does not exist.
 * @apiError InternalServerError Internal server error occurred.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 402 Not Authorized
 *     {
 *       "message": "Not a moderator"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 406 Not Acceptable
 *     {
 *       "message": "Moderator doesn't have permission"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "comment not found"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {get} /community/moderation/:communityName/get-spam-comments Get Spam Comments
 * @apiVersion 0.1.0
 * @apiName GetSpamComments
 * @apiGroup Moderation
 *
 * @apiDescription Retrieves all spam comments in a specified community.
 *
 * @apiHeader {String} Authorization User's access token.
 *
 * @apiParam {String} communityName Name of the community.
 *
 * @apiSuccess {Object} SpammedComments Object representing the Spammed comment.
 * @apiSuccess {String} SpammedComments._id ID of the comment.
 * @apiSuccess {String} SpammedComments.content Content of the comment.
 * @apiSuccess {Object} SpammedComments.user User object representing the author of the comment.
 * @apiSuccess {String} SpammedComments.user.id ID of the user who posted the comment.
 * @apiSuccess {String} SpammedComments.user.name Name of the user who posted the comment.
 * @apiSuccess {String} SpammedComments.user.username Username of the user who posted the comment.
 * @apiSuccess {String} SpammedComments.user.email Email of the user who posted the comment.
 * @apiSuccess {String} SpammedComments.user.googleId Google ID of the user who posted the comment.
 * @apiSuccess {String} SpammedComments.user.birth_date Birth date of the user who posted the comment.
 * @apiSuccess {String} SpammedComments.user.phone Phone number of the user who posted the comment.
 * @apiSuccess {String} SpammedComments.user.avatar_url URL of the user's avatar.
 * @apiSuccess {String} SpammedComments.user.banner URL of the user's banner.
 * @apiSuccess {String} SpammedComments.user.location Location of the user who posted the comment.
 * @apiSuccess {String} SpammedComments.user.bio Bio of the user who posted the comment.
 * @apiSuccess {Number} SpammedComments.user.followers_count Number of followers of the user who posted the comment.
 * @apiSuccess {Number} SpammedComments.user.following_count Number of users followed by the user who posted the comment.
 * @apiSuccess {Date} SpammedComments.user.created_at Date when the user who posted the comment was created.
 * @apiSuccess {String} SpammedComments.user.role Role of the user who posted the comment.
 * @apiSuccess {Boolean} SpammedComments.user.nsfw Flag indicating if the user who posted the comment has NSFW content.
 * @apiSuccess {Boolean} SpammedComments.user.activeInCommunityVisibility Flag indicating if the user who posted the comment is active in community visibility.
 * @apiSuccess {Boolean} SpammedComments.user.isVerified Flag indicating if the user who posted the comment is verified.
 * @apiSuccess {String} SpammedComments.user.displayName Display name of the user who posted the comment.
 * @apiSuccess {String} SpammedComments.user.about About information of the user who posted the comment.
 * @apiSuccess {String} SpammedComments.user.cakeDay Cake day of the user who posted the comment.
 * @apiSuccess {String[]} SpammedComments.user.subscribedCommunities List of communities subscribed by the user who posted the comment.
 * @apiSuccess {Number} SpammedComments.likes_count Number of likes received by the comment.
 * @apiSuccess {Number} SpammedComments.replies_count Number of replies to the comment.
 * @apiSuccess {Boolean} SpammedComments.is_reply Indicates if the comment is a reply to another comment.
 * @apiSuccess {String[]} SpammedComments.media Array of URLs of attached media files.
 * @apiSuccess {Date} SpammedComments.created_at Date and time when the comment was created.
 * @apiSuccess {Boolean} SpammedComments.is_hidden Indicates if the comment is hidden.
 * @apiSuccess {Boolean} SpammedComments.is_saved Indicates if the comment is saved.
 * @apiSuccess {String} SpammedComments.post_title Title of the post to which the comment belongs.
 * @apiSuccess {String} SpammedComments.community_title Title of the community where the post belongs.
 * @apiSuccess {Boolean} SpammedComments.is_upvoted if the comment is upvoted by the user
 * @apiSuccess {Boolean} SpammedComments.is_downvoted if the comment is upvoted by the user
 * @apiSuccess {Boolean} SpammedComments.is_removed if the comment is removed by the moderator
 * @apiSuccess {Boolean} SpammedComments.is_approved if the comment is approved by the moderator
 * @apiSuccess {Boolean} SpammedComments.is_locked if the comment is locked by the moderator
 * @apiSuccess {Boolean} SpammedComments.is_removal if the comment is a removal reason
 * @apiSuccess {SpammedCommentsObject[]} SpammedComments.replies if the comment has a reply by default empty array
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "SpammedComments": {
 *           "_id": "609d0f23c8b58f001d54ee1f",
 *           "content": "This is a comment on the post",
 *           "user": {
 *               "id": "609cfff1c8b58f001d54ee1e",
 *               "name": "Amira El-garf",
 *               "username": "amira123",
 *               "email": "amiraelgarf99@gmail.com",
 *               "avatar_url": "https://example.com/avatar.jpg",
 *               "banner": "https://example.com/avatar.jpg",
 *               "followers_count": 100,
 *               "following_count": 50,
 *               "created_at": "2022-01-01T12:00:00.000Z",
 *               "role": "User",
 *               "nsfw": false,
 *               "activeInCommunityVisibility": true,
 *               "isVerified": true,
 *               "isVisible": false,
 *               "isActive": true,
 *               "isBanned": false,
 *               "displayName": "Amiraelgarf123",
 *               "bio": "active",
 *               "cakeDay": "2020-01-01",
 *               "subscribedCommunities": ["community1", "community2"]
 *               "favouriteCommunities": [],
 *               "socialLinks": [],
 *               "commentsOnYourPost": true,
 *               "commentsYouFollow": true,
 *               "upvotes": true,
 *               "selectedPollOption": "Predator-Prey Coevolution",
 *               "allowFollow": true
 *           },
 *           "likes_count": 10,
 *           "replies_count": 5,
 *           "is_reply": false,
 *           "media": [
 *               { "type": "image", "link": "https://example.com/attachment1.jpg" },
 *               { "type": "image", "link": "https://example.com/attachment2.jpg" }
 *           ],
 *           "created_at": "2022-05-14T12:00:00.000Z",
 *           "is_hidden": false,
 *           "is_saved": false,
 *           "post_title": "Sample Post Title",
 *           "community_title": "Sample Community",
 *           "is_upvoted": true,
 *           "is_downvoted": false,
 *           "is_removed": false,
 *           "is_approved": true,
 *           "is_locked": false,
 *           "is_removal": false,
 *           "replies": []
 *       },
 *     }
 *
 *
 * @apiError NotAuthorized The user is not authorized to perform this action.
 * @apiError NotModerator User is not a moderator of the community or does not have permission.
 * @apiError InternalServerError Internal server error occurred.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 402 Not Authorized
 *     {
 *       "message": "Not a moderator or does not have permission"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {post} /community/moderation/:communityName/:commentId/lock-comment Lock Comment
 * @apiVersion 0.1.0
 * @apiName LockComment
 * @apiGroup Moderation
 *
 * @apiDescription Locks a comment in a specified community.
 *
 * @apiHeader {String} Authorization User's access token.
 *
 * @apiParam {String} communityName Name of the community.
 * @apiParam {String} commentId ID of the comment to be locked.
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Comment locked successfully"
 *     }
 *
 * @apiError CommentNotFound The specified comment does not exist.
 * @apiError NotAuthorized The user is not authorized to perform this action.
 * @apiError NotModerator User is not a moderator of the community or does not have permission.
 * @apiError CommentAlreadyLocked The comment is already locked.
 * @apiError InternalServerError Internal server error occurred.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Comment not found"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 402 Not Authorized
 *     {
 *       "message": "Not a moderator or does not have permission"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "message": "Comment is already locked"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {post} /community/moderation/:communityName/:commentId/unlock-comment Unlock Comment
 * @apiVersion 0.1.0
 * @apiName UnlockComment
 * @apiGroup Moderation
 *
 * @apiDescription Unlocks a previously locked comment in a specified community.
 *
 * @apiHeader {String} Authorization User's access token.
 *
 * @apiParam {String} communityName Name of the community.
 * @apiParam {String} commentId ID of the comment to be unlocked.
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Comment unlocked successfully"
 *     }
 *
 * @apiError CommentNotFound The specified comment does not exist.
 * @apiError NotAuthorized The user is not authorized to perform this action.
 * @apiError NotModerator User is not a moderator of the community or does not have permission.
 * @apiError CommentNotLocked The comment is not locked.
 * @apiError InternalServerError Internal server error occurred.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Comment not found"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 402 Not Authorized
 *     {
 *       "message": "Not a moderator or does not have permission"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "message": "Post is not locked"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {post} /community/moderation/:communityName/:commentId/remove-comment Remove Comment
 * @apiVersion 0.1.0
 * @apiName RemoveComment
 * @apiGroup Moderation
 *
 * @apiDescription Removes a comment from a specified community.
 *
 * @apiHeader {String} Authorization User's access token.
 *
 * @apiParam {String} communityName Name of the community.
 * @apiParam {String} commentId ID of the comment to be removed.
 * @apiParam {Object} removalReason The reason for removing the comment.
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Comment removed successfully"
 *     }
 *
 * @apiError CommentNotFound The specified comment does not exist.
 * @apiError BadRequest Missing removal reason.
 * @apiError NotAuthorized The user is not authorized to perform this action.
 * @apiError NotModerator User is not a moderator of the community or does not have permission.
 * @apiError InternalServerError Internal server error occurred.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Comment not found"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Must have a removal reason"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 402 Not Authorized
 *     {
 *       "message": "Not a moderator or does not have permission"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {post} /community/moderation/:communityName/:commentId/approve-comment Approve Comment
 * @apiVersion 0.1.0
 * @apiName ApproveComment
 * @apiGroup Moderation
 *
 * @apiDescription Approves a comment in a specified community.
 *
 * @apiHeader {String} Authorization User's access token.
 *
 * @apiParam {String} communityName Name of the community.
 * @apiParam {String} commentId ID of the comment to be approved.
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Comment approved successfully"
 *     }
 *
 * @apiError CommentNotFound The specified comment does not exist.
 * @apiError NotAuthorized The user is not authorized to perform this action.
 * @apiError NotModerator User is not a moderator of the community or does not have permission.
 * @apiError InternalServerError Internal server error occurred.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Comment not found"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 402 Not Authorized
 *     {
 *       "message": "Not a moderator or does not have permission"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {get} /community/moderation/:communityName/get-edited-comments Get Edited Comments History
 * @apiVersion 0.1.0
 * @apiName GetEditedCommentsHistory
 * @apiGroup Moderation
 *
 * @apiDescription Retrieves the history of edited comments in a specified community.
 *
 * @apiHeader {String} Authorization User's access token.
 *
 * @apiParam {String} communityName Name of the community.
 *
 * @apiSuccess {Object} editedComment Object representing the edited comment.
 * @apiSuccess {String} editedComment._id ID of the comment.
 * @apiSuccess {String} editedComment.content Content of the comment.
 * @apiSuccess {Object} editedComment.user User object representing the author of the comment.
 * @apiSuccess {String} editedComment.user.id ID of the user who posted the comment.
 * @apiSuccess {String} editedComment.user.name Name of the user who posted the comment.
 * @apiSuccess {String} editedComment.user.username Username of the user who posted the comment.
 * @apiSuccess {String} editedComment.user.email Email of the user who posted the comment.
 * @apiSuccess {String} editedComment.user.googleId Google ID of the user who posted the comment.
 * @apiSuccess {String} editedComment.user.birth_date Birth date of the user who posted the comment.
 * @apiSuccess {String} editedComment.user.phone Phone number of the user who posted the comment.
 * @apiSuccess {String} editedComment.user.avatar_url URL of the user's avatar.
 * @apiSuccess {String} editedComment.user.banner URL of the user's banner.
 * @apiSuccess {String} editedComment.user.location Location of the user who posted the comment.
 * @apiSuccess {String} editedComment.user.bio Bio of the user who posted the comment.
 * @apiSuccess {Number} editedComment.user.followers_count Number of followers of the user who posted the comment.
 * @apiSuccess {Number} editedComment.user.following_count Number of users followed by the user who posted the comment.
 * @apiSuccess {Date} editedComment.user.created_at Date when the user who posted the comment was created.
 * @apiSuccess {String} editedComment.user.role Role of the user who posted the comment.
 * @apiSuccess {Boolean} editedComment.user.nsfw Flag indicating if the user who posted the comment has NSFW content.
 * @apiSuccess {Boolean} editedComment.user.activeInCommunityVisibility Flag indicating if the user who posted the comment is active in community visibility.
 * @apiSuccess {Boolean} editedComment.user.isVerified Flag indicating if the user who posted the comment is verified.
 * @apiSuccess {String} editedComment.user.displayName Display name of the user who posted the comment.
 * @apiSuccess {String} editedComment.user.about About information of the user who posted the comment.
 * @apiSuccess {String} editedComment.user.cakeDay Cake day of the user who posted the comment.
 * @apiSuccess {String[]} editedComment.user.subscribedCommunities List of communities subscribed by the user who posted the comment.
 * @apiSuccess {Number} editedComment.likes_count Number of likes received by the comment.
 * @apiSuccess {Number} editedComment.replies_count Number of replies to the comment.
 * @apiSuccess {Boolean} editedComment.is_reply Indicates if the comment is a reply to another comment.
 * @apiSuccess {String[]} editedComment.media Array of URLs of attached media files.
 * @apiSuccess {Date} editedComment.created_at Date and time when the comment was created.
 * @apiSuccess {Boolean} editedComment.is_hidden Indicates if the comment is hidden.
 * @apiSuccess {Boolean} editedComment.is_saved Indicates if the comment is saved.
 * @apiSuccess {String} editedComment.post_title Title of the post to which the comment belongs.
 * @apiSuccess {String} editedComment.community_title Title of the community where the post belongs.
 * @apiSuccess {Boolean} editedComment.is_upvoted if the comment is upvoted by the user
 * @apiSuccess {Boolean} editedComment.is_downvoted if the comment is upvoted by the user
 * @apiSuccess {Boolean} editedComment.is_removed if the comment is removed by the moderator
 * @apiSuccess {Boolean} editedComment.is_approved if the comment is approved by the moderator
 * @apiSuccess {Boolean} editedComment.is_locked if the comment is locked by the moderator
 * @apiSuccess {Boolean} editedComment.is_removal if the comment is a removal reason
 * @apiSuccess {editedCommentObject[]} editedComment.replies if the comment has a reply by default empty array
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "editedComment": {
 *           "_id": "609d0f23c8b58f001d54ee1f",
 *           "content": "This is a comment on the post",
 *           "user": {
 *               "id": "609cfff1c8b58f001d54ee1e",
 *               "name": "Amira El-garf",
 *               "username": "amira123",
 *               "email": "amiraelgarf99@gmail.com",
 *               "avatar_url": "https://example.com/avatar.jpg",
 *               "banner": "https://example.com/avatar.jpg",
 *               "followers_count": 100,
 *               "following_count": 50,
 *               "created_at": "2022-01-01T12:00:00.000Z",
 *               "role": "User",
 *               "nsfw": false,
 *               "activeInCommunityVisibility": true,
 *               "isVerified": true,
 *               "isVisible": false,
 *               "isActive": true,
 *               "isBanned": false,
 *               "displayName": "Amiraelgarf123",
 *               "bio": "active",
 *               "cakeDay": "2020-01-01",
 *               "subscribedCommunities": ["community1", "community2"]
 *               "favouriteCommunities": [],
 *               "socialLinks": [],
 *               "commentsOnYourPost": true,
 *               "commentsYouFollow": true,
 *               "upvotes": true,
 *               "selectedPollOption": "Predator-Prey Coevolution",
 *               "allowFollow": true
 *           },
 *           "likes_count": 10,
 *           "replies_count": 5,
 *           "is_reply": false,
 *           "media": [
 *               { "type": "image", "link": "https://example.com/attachment1.jpg" },
 *               { "type": "image", "link": "https://example.com/attachment2.jpg" }
 *           ],
 *           "created_at": "2022-05-14T12:00:00.000Z",
 *           "is_hidden": false,
 *           "is_saved": false,
 *           "post_title": "Sample Post Title",
 *           "community_title": "Sample Community",
 *           "is_upvoted": true,
 *           "is_downvoted": false,
 *           "is_removed": false,
 *           "is_approved": true,
 *           "is_locked": false,
 *           "is_removal": false,
 *           "replies": []
 *       },
 *     }
 * @apiError CommunityNotFound The specified community does not exist.
 * @apiError NotAuthorized The user is not authorized to perform this action.
 * @apiError NotModerator User is not a moderator of the community or does not have permission.
 * @apiError EditedCommentsNotFound No edited comments found in the community.
 * @apiError InternalServerError Internal server error occurred.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Community not found"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 402 Not Authorized
 *     {
 *       "message": "Not a moderator or does not have permission"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Edited comments not found"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {get} /community/moderation/:communityName/get-reported-comments Get Reported Comments
 * @apiVersion 0.1.0
 * @apiName GetReportedComments
 * @apiGroup Moderation
 *
 * @apiDescription Retrieves reported comments in a specified community.
 *
 * @apiHeader {String} Authorization User's access token.
 *
 * @apiParam {String} communityName Name of the community.
 *
 * @apiSuccess {Object} reportedComments Object representing the reported comment.
 * @apiSuccess {String} reportedComments._id ID of the comment.
 * @apiSuccess {String} reportedComments.content Content of the comment.
 * @apiSuccess {Object} reportedComments.user User object representing the author of the comment.
 * @apiSuccess {String} reportedComments.user.id ID of the user who posted the comment.
 * @apiSuccess {String} reportedComments.user.name Name of the user who posted the comment.
 * @apiSuccess {String} reportedComments.user.username Username of the user who posted the comment.
 * @apiSuccess {String} reportedComments.user.email Email of the user who posted the comment.
 * @apiSuccess {String} reportedComments.user.googleId Google ID of the user who posted the comment.
 * @apiSuccess {String} reportedComments.user.birth_date Birth date of the user who posted the comment.
 * @apiSuccess {String} reportedComments.user.phone Phone number of the user who posted the comment.
 * @apiSuccess {String} reportedComments.user.avatar_url URL of the user's avatar.
 * @apiSuccess {String} reportedComments.user.banner URL of the user's banner.
 * @apiSuccess {String} reportedComments.user.location Location of the user who posted the comment.
 * @apiSuccess {String} reportedComments.user.bio Bio of the user who posted the comment.
 * @apiSuccess {Number} reportedComments.user.followers_count Number of followers of the user who posted the comment.
 * @apiSuccess {Number} reportedComments.user.following_count Number of users followed by the user who posted the comment.
 * @apiSuccess {Date} reportedComments.user.created_at Date when the user who posted the comment was created.
 * @apiSuccess {String} reportedComments.user.role Role of the user who posted the comment.
 * @apiSuccess {Boolean} reportedComments.user.nsfw Flag indicating if the user who posted the comment has NSFW content.
 * @apiSuccess {Boolean} reportedComments.user.activeInCommunityVisibility Flag indicating if the user who posted the comment is active in community visibility.
 * @apiSuccess {Boolean} reportedComments.user.isVerified Flag indicating if the user who posted the comment is verified.
 * @apiSuccess {String} reportedComments.user.displayName Display name of the user who posted the comment.
 * @apiSuccess {String} reportedComments.user.about About information of the user who posted the comment.
 * @apiSuccess {String} reportedComments.user.cakeDay Cake day of the user who posted the comment.
 * @apiSuccess {String[]} reportedComments.user.subscribedCommunities List of communities subscribed by the user who posted the comment.
 * @apiSuccess {Number} reportedComments.likes_count Number of likes received by the comment.
 * @apiSuccess {Number} reportedComments.replies_count Number of replies to the comment.
 * @apiSuccess {Boolean} reportedComments.is_reply Indicates if the comment is a reply to another comment.
 * @apiSuccess {String[]} reportedComments.media Array of URLs of attached media files.
 * @apiSuccess {Date} reportedComments.created_at Date and time when the comment was created.
 * @apiSuccess {Boolean} reportedComments.is_hidden Indicates if the comment is hidden.
 * @apiSuccess {Boolean} reportedComments.is_saved Indicates if the comment is saved.
 * @apiSuccess {String} reportedComments.post_title Title of the post to which the comment belongs.
 * @apiSuccess {String} reportedComments.community_title Title of the community where the post belongs.
 * @apiSuccess {Boolean} reportedComments.is_upvoted if the comment is upvoted by the user
 * @apiSuccess {Boolean} reportedComments.is_downvoted if the comment is upvoted by the user
 * @apiSuccess {Boolean} reportedComments.is_removed if the comment is removed by the moderator
 * @apiSuccess {Boolean} reportedComments.is_approved if the comment is approved by the moderator
 * @apiSuccess {Boolean} reportedComments.is_locked if the comment is locked by the moderator
 * @apiSuccess {Boolean} reportedComments.is_removal if the comment is a removal reason
 * @apiSuccess {reportedCommentsObject[]} reportedComments.replies if the comment has a reply by default empty array
 * @apiSuccess {string} reportedComments.reports.username the user who reported the comennt
 * @apiSuccess {string} reportedComments.reports.reason reason why the comment is reported
 * @apiSuccess {string} reportedComments.reports.subreason subreason of why the comment is reported
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "reportedComments": {
 *           "_id": "609d0f23c8b58f001d54ee1f",
 *           "content": "This is a comment on the post",
 *           "user": {
 *               "id": "609cfff1c8b58f001d54ee1e",
 *               "name": "Amira El-garf",
 *               "username": "amira123",
 *               "email": "amiraelgarf99@gmail.com",
 *               "avatar_url": "https://example.com/avatar.jpg",
 *               "banner": "https://example.com/avatar.jpg",
 *               "followers_count": 100,
 *               "following_count": 50,
 *               "created_at": "2022-01-01T12:00:00.000Z",
 *               "role": "User",
 *               "nsfw": false,
 *               "activeInCommunityVisibility": true,
 *               "isVerified": true,
 *               "isVisible": false,
 *               "isActive": true,
 *               "isBanned": false,
 *               "displayName": "Amiraelgarf123",
 *               "bio": "active",
 *               "cakeDay": "2020-01-01",
 *               "subscribedCommunities": ["community1", "community2"]
 *               "favouriteCommunities": [],
 *               "socialLinks": [],
 *               "commentsOnYourPost": true,
 *               "commentsYouFollow": true,
 *               "upvotes": true,
 *               "selectedPollOption": "Predator-Prey Coevolution",
 *               "allowFollow": true
 *           },
 *           "likes_count": 10,
 *           "replies_count": 5,
 *           "is_reply": false,
 *           "media": [
 *               { "type": "image", "link": "https://example.com/attachment1.jpg" },
 *               { "type": "image", "link": "https://example.com/attachment2.jpg" }
 *           ],
 *           "created_at": "2022-05-14T12:00:00.000Z",
 *           "is_hidden": false,
 *           "is_saved": false,
 *           "post_title": "Sample Post Title",
 *           "community_title": "Sample Community",
 *           "is_upvoted": true,
 *           "is_downvoted": false,
 *           "is_removed": false,
 *           "is_approved": true,
 *           "is_locked": false,
 *           "is_removal": false,
 *           "replies": [],
 *           "reports":[
 *               {
 *                 "username": "mimo12"
 *                 "reason": "Spam",
 *                 "subreason": "Irrelevant content"
 *               }
 *            ]
 *       },
 *     }
 *
 * @apiError CommunityNotFound The specified community does not exist.
 * @apiError NotAuthorized The user is not authorized to perform this action.
 * @apiError NotModerator User is not a moderator of the community or does not have permission.
 * @apiError InternalServerError Internal server error occurred.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Community not found"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 402 Not Authorized
 *     {
 *       "message": "Not a moderator or does not have permission"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */
//#endregion Moderation

//#region Admin

/**
 * @api {post} /dashboard/ban Ban User
 * @apiVersion 0.1.0
 * @apiName BanUser
 * @apiGroup Admin Dashboard
 *
 * @apiDescription Bans a user from posting.
 *
 * @apiHeader {String} Authorization User's access token.
 *
 * @apiParam {String} username Username of the user to be banned.
 * @apiParam {String} banDuration Duration of the ban (if temporary).
 * @apiParam {String} reason Reason for the ban.
 * @apiParam {Boolean} isPermanent Indicates whether the ban is permanent.
 *
 * @apiSuccess {Object} user User object containing user details.
 * @apiSuccess {String} user._id User's unique ID.
 * @apiSuccess {String} user.name User's name.
 * @apiSuccess {String} user.email User's email address.
 * @apiSuccess {String} user.username User's username..
 * @apiSuccess {String} message Success message indicating user signed in or signed up successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user": {
 *           "id": "609cfff1c8b58f001d54ee1e",
 *               "name": "Amira El-garf",
 *               "username": "amira123",
 *               "email": "amiraelgarf99@gmail.com",
 *               "avatar_url": "https://example.com/avatar.jpg",
 *               "banner": "https://example.com/avatar.jpg",
 *               "followers_count": 100,
 *               "following_count": 50,
 *               "created_at": "2022-01-01T12:00:00.000Z",
 *               "role": "User",
 *               "nsfw": false,
 *               "activeInCommunityVisibility": true,
 *               "isVerified": true,
 *               "isVisible": false,
 *               "isActive": true,
 *               "isBanned": false,
 *               "displayName": "Amiraelgarf123",
 *               "bio": "active",
 *               "cakeDay": "2020-01-01",
 *               "subscribedCommunities": ["community1", "community2"]
 *               "favouriteCommunities": [],
 *               "socialLinks": [],
 *               "commentsOnYourPost": true,
 *               "commentsYouFollow": true,
 *               "upvotes": true,
 *               "selectedPollOption": "Predator-Prey Coevolution",
 *               "allowFollow": true
 *       },
 *       "message": "User Banned successfully"
 *     }
 * @apiError Unauthorized The user is not authorized to perform this action.
 * @apiError UserNotFound The specified user does not exist.
 * @apiError InternalServerError Internal server error occurred.
 * @apiError The User is already banned
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "You are not authorized"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "User is not found"
 *     }
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 402 Not Found
 *     {
 *       "message": "the user already banned"
 *     }
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {post} /dashboard/unban Unban User
 * @apiVersion 0.1.0
 * @apiName UnbanUser
 * @apiGroup Admin Dashboard
 *
 * @apiDescription Unbans a previously banned user.
 *
 * @apiHeader {String} Authorization User's access token.
 *
 * @apiParam {String} username Username of the user to be unbanned.
 *
 * @apiSuccess {Object} user User object containing user details.
 * @apiSuccess {String} user._id User's unique ID.
 * @apiSuccess {String} user.name User's name.
 * @apiSuccess {String} user.email User's email address.
 * @apiSuccess {String} user.username User's username.
 * @apiSuccess {String} message Success message indicating user signed in or signed up successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user": {
 *           "id": "609cfff1c8b58f001d54ee1e",
 *               "name": "Amira El-garf",
 *               "username": "amira123",
 *               "email": "amiraelgarf99@gmail.com",
 *               "avatar_url": "https://example.com/avatar.jpg",
 *               "banner": "https://example.com/avatar.jpg",
 *               "followers_count": 100,
 *               "following_count": 50,
 *               "created_at": "2022-01-01T12:00:00.000Z",
 *               "role": "User",
 *               "nsfw": false,
 *               "activeInCommunityVisibility": true,
 *               "isVerified": true,
 *               "isVisible": false,
 *               "isActive": true,
 *               "isBanned": false,
 *               "displayName": "Amiraelgarf123",
 *               "bio": "active",
 *               "cakeDay": "2020-01-01",
 *               "subscribedCommunities": ["community1", "community2"]
 *               "favouriteCommunities": [],
 *               "socialLinks": [],
 *               "commentsOnYourPost": true,
 *               "commentsYouFollow": true,
 *               "upvotes": true,
 *               "selectedPollOption": "Predator-Prey Coevolution",
 *               "allowFollow": true
 *       },
 *       "message": "User unbanned successfully"
 *     }
 *
 * @apiError Unauthorized The user is not authorized to perform this action.
 * @apiError UserNotFound The specified user does not exist.
 * @apiError UserNotBanned The specified user is not banned.
 * @apiError InternalServerError Internal server error occurred.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "You are not authorized"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "User is not found"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "User is not banned"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {get} /dashboard/comments Get Reported Comments
 * @apiVersion 0.1.0
 * @apiName GetComments
 * @apiGroup Admin Dashboard
 *
 * @apiDescription Retrieves comments for administrative purposes.
 *
 * @apiHeader {String} Authorization User's access token.
 *
 * @apiSuccess {Object} reportedComments  Object representing the added comment.
 * @apiSuccess {String} reportedComments._id ID of the comment.
 * @apiSuccess {String} reportedComments.content Content of the comment.
 * @apiSuccess {Object} reportedComments.user User object representing the author of the comment.
 * @apiSuccess {String} reportedComments.user.id ID of the user who posted the comment.
 * @apiSuccess {String} reportedComments.user.name Name of the user who posted the comment.
 * @apiSuccess {String} reportedComments.user.username Username of the user who posted the comment.
 * @apiSuccess {String} reportedComments.user.email Email of the user who posted the comment.
 * @apiSuccess {String} reportedComments.user.googleId Google ID of the user who posted the comment.
 * @apiSuccess {String} reportedComments.user.birth_date Birth date of the user who posted the comment.
 * @apiSuccess {String} reportedComments.user.phone Phone number of the user who posted the comment.
 * @apiSuccess {String} reportedComments.user.avatar_url URL of the user's avatar.
 * @apiSuccess {String} reportedComments.user.banner URL of the user's banner.
 * @apiSuccess {String} reportedComments.user.location Location of the user who posted the comment.
 * @apiSuccess {String} reportedComments.user.bio Bio of the user who posted the comment.
 * @apiSuccess {Number} reportedComments.user.followers_count Number of followers of the user who posted the comment.
 * @apiSuccess {Number} reportedComments .user.following_count Number of users followed by the user who posted the comment.
 * @apiSuccess {Date} reportedComments.user.created_at Date when the user who posted the comment was created.
 * @apiSuccess {String} reportedComments.user.role Role of the user who posted the comment.
 * @apiSuccess {Boolean} reportedComments.user.nsfw Flag indicating if the user who posted the comment has NSFW content.
 * @apiSuccess {Boolean} reportedComments.user.activeInCommunityVisibility Flag indicating if the user who posted the comment is active in community visibility.
 * @apiSuccess {Boolean} reportedComments.user.isVerified Flag indicating if the user who posted the comment is verified.
 * @apiSuccess {String} reportedComments.user.displayName Display name of the user who posted the comment.
 * @apiSuccess {String} reportedComments.user.about About information of the user who posted the comment.
 * @apiSuccess {String} reportedComments.user.cakeDay Cake day of the user who posted the comment.
 * @apiSuccess {String[]} reportedComments.user.subscribedCommunities List of communities subscribed by the user who posted the comment.
 * @apiSuccess {Number} reportedComments.likes_count Number of likes received by the comment.
 * @apiSuccess {Number} reportedComments.replies_count Number of replies to the comment.
 * @apiSuccess {Boolean} reportedComments.is_reply Indicates if the comment is a reply to another comment.
 * @apiSuccess {String[]} reportedComments.media Array of URLs of attached media files.
 * @apiSuccess {Date} reportedComments.created_at Date and time when the comment was created.
 * @apiSuccess {Boolean} reportedComments.is_hidden Indicates if the comment is hidden.
 * @apiSuccess {Boolean} reportedComments.is_saved Indicates if the comment is saved.
 * @apiSuccess {String} reportedComments.post_title Title of the post to which the comment belongs.
 * @apiSuccess {String} reportedComments.community_title Title of the community where the post belongs.
 * @apiSuccess {Boolean} reportedComments.is_upvoted if the comment is upvoted by the user
 * @apiSuccess {Boolean} reportedComments.is_downvoted if the comment is upvoted by the user
 * @apiSuccess {Boolean} reportedComments.is_removed if the comment is removed by the moderator
 * @apiSuccess {Boolean} reportedComments.is_approved if the comment is approved by the moderator
 * @apiSuccess {Boolean} reportedComments.is_locked if the comment is locked by the moderator
 * @apiSuccess {Boolean} reportedComments.is_removal if the comment is a removal reason
 * @apiSuccess {commentObject[]} reportedComments.replies if the comment has a reply by default empty array
 * @apiSuccess {string} reportedComments.reports.username the user who reported the comennt
 * @apiSuccess {string} reportedComments.reports.reason reason why the comment is reported
 * @apiSuccess {string} reportedComments.reports.subreason subreason of why the comment is reported
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "reportedComments ": {
 *           "_id": "609d0f23c8b58f001d54ee1f",
 *           "content": "This is a comment on the post",
 *           "user": {
 *               "id": "609cfff1c8b58f001d54ee1e",
 *               "name": "Amira El-garf",
 *               "username": "amira123",
 *               "email": "amiraelgarf99@gmail.com",
 *               "avatar_url": "https://example.com/avatar.jpg",
 *               "banner": "https://example.com/avatar.jpg",
 *               "followers_count": 100,
 *               "following_count": 50,
 *               "created_at": "2022-01-01T12:00:00.000Z",
 *               "role": "User",
 *               "nsfw": false,
 *               "activeInCommunityVisibility": true,
 *               "isVerified": true,
 *               "isVisible": false,
 *               "isActive": true,
 *               "isBanned": false,
 *               "displayName": "Amiraelgarf123",
 *               "bio": "active",
 *               "cakeDay": "2020-01-01",
 *               "subscribedCommunities": ["community1", "community2"]
 *               "favouriteCommunities": [],
 *               "socialLinks": [],
 *               "commentsOnYourPost": true,
 *               "commentsYouFollow": true,
 *               "upvotes": true,
 *               "selectedPollOption": "Predator-Prey Coevolution",
 *               "allowFollow": true
 *           },
 *           "likes_count": 10,
 *           "replies_count": 5,
 *           "is_reply": false,
 *           "media": [
 *               { "type": "image", "link": "https://example.com/attachment1.jpg" },
 *               { "type": "image", "link": "https://example.com/attachment2.jpg" }
 *           ],
 *           "created_at": "2022-05-14T12:00:00.000Z",
 *           "is_hidden": false,
 *           "is_saved": false,
 *           "post_title": "Sample Post Title",
 *           "community_title": "Sample Community",
 *           "is_upvoted": true,
 *           "is_downvoted": false,
 *           "is_removed": false,
 *           "is_approved": true,
 *           "is_locked": false,
 *           "is_removal": false,
 *           "replies": [],
 *           "reports":[
 *                 {
 *                  "username": "mimo12"
 *                  "reason": "Spam",
 *                  "subreason": "Irrelevant content"
 *                 }
 *            ]
 *       },
 *       "message": "Comments have been retrieved successfully"
 *     }
 *
 * @apiError Unauthorized The user is not authorized to perform this action.
 * @apiError InternalServerError Internal server error occurred.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Unauthorized
 *     {
 *       "message": "You are not authorized"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {get} /dashboard/posts Get Reported Posts
 * @apiVersion 0.1.0
 * @apiName GetReportedPosts
 * @apiGroup Admin Dashboard
 *
 * @apiDescription Retrieves reported posts for administrative purposes.
 *
 * @apiHeader {String} Authorization User's access token.
 *
 * @apiSuccess {Object[]} reportedPosts List of reported post objects.
 * @apiSuccess {String} message Success message.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "reportedPosts": [
 *          {
 *               "_id": "1234567890",
 *              "userId": "0987654321",
 *              "username": "example_user",
 *              "userProfilePic": "http://example.com/avatar.jpg",
 *              "hasUpvoted": false,
 *              "hasDownvoted": false,
 *              "hasVotedOnPoll": false,
 *              "selectedPollOption": null,
 *              "numberOfViews": 1080,
 *              "votesUpCount": 10,
 *              "votesDownCount": 2,
 *              "sharesCount": 5,
 *              "commentsCount": 15,
 *              "title": "Sample Title",
 *              "content": "Sample Content",
 *              "community": "Sample Community",
 *              "type": "Post",
 *              "link": "http://example.com",
 *              "pollExpiration": "2024-04-16T12:00:00.000Z",
 *              "isPollEnabled": true,
 *              "pollVotingLength": "7 days",
 *              "isSpoiler": false,
 *              "isNsfw": false,
 *              "sendPostReplyNotification": true,
 *              "isCommentsLocked": false,
 *              "isSaved": false,
 *              "date": "2024-04-16T10:00:00.000Z",
 *              "pollOptions": [],
 *              "attachments": [],
 *              "reports":[
 *                 {
 *                  "username": "mimo12"
 *                  "reason": "Spam",
 *                  "subreason": "Irrelevant content"
 *                 }
 *              ]
 *
 *          }
 *      ],
 *      "message": "Posts have been retrieved successfully"
 *      }
 *
 * @apiError Unauthorized The user is not authorized to perform this action.
 * @apiError InternalServerError Internal server error occurred.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Unauthorized
 *     {
 *       "message": "You are not authorized"
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

//#endregion Admin

//#region message
/**
 * @api {post} /message/compose/ Send a Message
 * @apiVersion 0.1.0
 * @apiName SendMessage
 * @apiGroup Message
 * @apiDescription Send a message to another user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} username Username of the recipient.
 * @apiParam {String} subject Subject of the message.
 * @apiParam {String} content Content of the message.
 *
 * @apiSuccess {Object} messageContent Details of the sent message.
 * @apiSuccess {String} message Message indicating the operation's success.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "messageContent": {
 *           "_id": "1234567890",
 *           "conversationId": "0987654321",
 *           "senderType": "user",
 *           "relatedUserOrCommunity": "recipient_username",
 *           "type": "text",
 *           "content": "Message content",
 *           "time": "2024-05-02T12:00:00.000Z",
 *           "direction": "outgoing",
 *           "isRead": false,
 *           "isDeleted": false,
 *           "subject": "Message subject"
 *       },
 *       "message": "Message sent successfully"
 *     }
 *
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (403) Forbidden User cannot message themselves.
 * @apiError (404) NotFound Recipient user not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Username is required"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "error": "User cannot message themselves"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Recipient user not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {post} /message/reply/:messageId Reply to a Message
 * @apiVersion 0.1.0
 * @apiName ReplyToMessage
 * @apiGroup Message
 * @apiDescription Reply to a message.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} messageId ID of the message to reply to.
 * @apiParam {String} content Content of the reply message.
 *
 * @apiSuccess {Object} messageContent Details of the sent reply message.
 * @apiSuccess {String} message Message indicating the operation's success.
 *
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (403) Forbidden User is not authorized to reply to this message.
 * @apiError (404) NotFound Message not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Message content is required"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "error": "You are not authorized to reply to this message"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Message not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {post} /message/readmsg/:messageId Mark Message as Read
 * @apiVersion 0.1.0
 * @apiName MarkMessageAsRead
 * @apiGroup Message
 * @apiDescription Mark a message as read.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} messageId ID of the message to mark as read.
 *
 * @apiSuccess {Object} messageContent Details of the marked message.
 * @apiSuccess {String} message Message indicating the operation's success.
 *
 * @apiError (400) BadRequest Message already marked as read.
 * @apiError (403) Forbidden User is not authorized to mark message as read.
 * @apiError (404) NotFound Message not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Message already marked as read"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "error": "You are not authorized to mark message as read"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Message not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {post} /message/unreadmsg/:messageId Mark Message as Unread
 * @apiVersion 0.1.0
 * @apiName MarkMessageAsUnread
 * @apiGroup Message
 * @apiDescription Mark a message as unread.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} messageId ID of the message to mark as unread.
 *
 * @apiSuccess {Object} messageContent Details of the marked message.
 * @apiSuccess {String} message Message indicating the operation's success.
 *
 * @apiError (400) BadRequest Message already marked as unread.
 * @apiError (403) Forbidden User is not authorized to mark message as unread.
 * @apiError (404) NotFound Message not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Message already marked as unread"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "error": "You are not authorized to mark message as unread"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Message not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {post} /message/readallmessages/ Mark All Messages as Read
 * @apiVersion 0.1.0
 * @apiName MarkAllMessagesAsRead
 * @apiGroup Message
 * @apiDescription Mark all messages as read.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiSuccess {String} message Message indicating the operation's success.
 *
 * @apiError (404) NotFound No unread messages found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No unread messages found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {get} /message/inbox/ Get Inbox Messages
 * @apiVersion 0.1.0
 * @apiName GetInboxMessages
 * @apiGroup Message
 * @apiDescription Retrieve all inbox messages of the authenticated user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiSuccess {Object[]} messages List of inbox messages.
 *
 * @apiError (404) NotFound No messages found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No messages found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {delete} /message/deletemsg/:messageId Delete a Message
 * @apiVersion 0.1.0
 * @apiName DeleteMessage
 * @apiGroup Message
 * @apiDescription Delete a message with the given message ID.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiSuccess {String} message Message indicating the operation's success.
 *
 * @apiError (403) Forbidden User is not authorized to delete this message.
 * @apiError (404) NotFound Message not found or already deleted.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "error": "You are not authorized to delete this message"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Message not found or already deleted"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {post} /message/readallmessages/ Mark All Messages as Read
 * @apiVersion 0.1.0
 * @apiName MarkAllMessagesAsRead
 * @apiGroup Message
 * @apiDescription Mark all messages as read for the authenticated user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiSuccess {String} message Message indicating the operation's success.
 *
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {get} /message/unread Get Unread Messages
 * @apiVersion 0.1.0
 * @apiName GetUnreadMessages
 * @apiGroup Message
 * @apiDescription Retrieve unread messages for the authenticated user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiSuccess {Object[]} unreadMessages List of unread messages.
 * @apiSuccess {String} unreadMessages._id ID of the message.
 * @apiSuccess {String} unreadMessages.conversationId ID of the conversation.
 * @apiSuccess {String} unreadMessages.senderType Type of sender (user or community).
 * @apiSuccess {String} unreadMessages.relatedUserOrCommunity Username of related user or name of community.
 * @apiSuccess {String} unreadMessages.type Content type of the message.
 * @apiSuccess {String} unreadMessages.content Content of the message.
 * @apiSuccess {Date} unreadMessages.time Timestamp of when the message was sent.
 * @apiSuccess {String} unreadMessages.direction Direction of the message (incoming or outgoing).
 * @apiSuccess {Boolean} unreadMessages.isRead Indicates if the message has been read.
 * @apiSuccess {Boolean} unreadMessages.isDeleted Indicates if the message has been deleted.
 * @apiSuccess {String} unreadMessages.subject Subject of the conversation.
 *
 * @apiError (404) NotFound No unread messages found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No unread messages found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {get} /message/messages Get All Messages
 * @apiVersion 0.1.0
 * @apiName GetAllMessages
 * @apiGroup Message
 * @apiDescription Retrieve all messages for the authenticated user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiSuccess {Object[]} allMessages List of all messages.
 * @apiSuccess {String} allMessages._id ID of the message.
 * @apiSuccess {String} allMessages.conversationId ID of the conversation.
 * @apiSuccess {String} allMessages.senderType Type of sender (user or community).
 * @apiSuccess {String} allMessages.relatedUserOrCommunity Username of related user or name of community.
 * @apiSuccess {String} allMessages.type Content type of the message.
 * @apiSuccess {String} allMessages.content Content of the message.
 * @apiSuccess {Date} allMessages.time Timestamp of when the message was sent.
 * @apiSuccess {String} allMessages.direction Direction of the message (incoming or outgoing).
 * @apiSuccess {Boolean} allMessages.isRead Indicates if the message has been read.
 * @apiSuccess {Boolean} allMessages.isDeleted Indicates if the message has been deleted.
 * @apiSuccess {String} allMessages.subject Subject of the conversation.
 *
 * @apiError (404) NotFound No messages found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No messages found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {get} /message/postreplies Get Post Replies
 * @apiVersion 0.1.0
 * @apiName GetPostReplies
 * @apiGroup Message
 * @apiDescription Retrieve replies to posts for the authenticated user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiSuccess {Object[]} postReplies List of post replies.
 * @apiSuccess {String} postReplies._id ID of the reply.
 * @apiSuccess {String} postReplies.conversationId ID of the conversation.
 * @apiSuccess {String} postReplies.senderType Type of sender (user or community).
 * @apiSuccess {String} postReplies.relatedUserOrCommunity Username of related user or name of community.
 * @apiSuccess {String} postReplies.type Content type of the message.
 * @apiSuccess {String} postReplies.content Content of the message.
 * @apiSuccess {Date} postReplies.time Timestamp of when the message was sent.
 * @apiSuccess {String} postReplies.direction Direction of the message (incoming or outgoing).
 * @apiSuccess {Boolean} postReplies.isRead Indicates if the message has been read.
 * @apiSuccess {Boolean} postReplies.isDeleted Indicates if the message has been deleted.
 * @apiSuccess {String} postReplies.subject Subject of the conversation.
 *
 * @apiError (404) NotFound No post replies found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No post replies found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {get} /message/mentions Get User Mentions
 * @apiVersion 0.1.0
 * @apiName GetUserMentions
 * @apiGroup Message
 * @apiDescription Retrieve mentions for the authenticated user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiSuccess {Object[]} userMentions List of user mentions.
 * @apiSuccess {String} userMentions._id ID of the mention.
 * @apiSuccess {String} userMentions.conversationId ID of the conversation.
 * @apiSuccess {String} userMentions.senderType Type of sender (user or community).
 * @apiSuccess {String} userMentions.relatedUserOrCommunity Username of related user or name of community.
 * @apiSuccess {String} userMentions.type Content type of the message.
 * @apiSuccess {String} userMentions.content Content of the message.
 * @apiSuccess {Date} userMentions.time Timestamp of when the message was sent.
 * @apiSuccess {String} userMentions.direction Direction of the message (incoming or outgoing).
 * @apiSuccess {Boolean} userMentions.isRead Indicates if the message has been read.
 * @apiSuccess {Boolean} userMentions.isDeleted Indicates if the message has been deleted.
 * @apiSuccess {String} userMentions.subject Subject of the conversation.
 *
 * @apiError (404) NotFound No user mentions found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No user mentions found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {get} /message/sent Get Sent Messages
 * @apiVersion 0.1.0
 * @apiName GetSentMessages
 * @apiGroup Message
 * @apiDescription Retrieve sent messages for the authenticated user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiSuccess {Object[]} sentMessages List of sent messages.
 * @apiSuccess {String} sentMessages._id ID of the message.
 * @apiSuccess {String} sentMessages.conversationId ID of the conversation.
 * @apiSuccess {String} sentMessages.senderType Type of sender (user or community).
 * @apiSuccess {String} sentMessages.relatedUserOrCommunity Username of related user or name of community.
 * @apiSuccess {String} sentMessages.type Content type of the message.
 * @apiSuccess {String} sentMessages.content Content of the message.
 * @apiSuccess {Date} sentMessages.time Timestamp of when the message was sent.
 * @apiSuccess {String} sentMessages.direction Direction of the message (incoming or outgoing).
 * @apiSuccess {Boolean} sentMessages.isRead Indicates if the message has been read.
 * @apiSuccess {Boolean} sentMessages.isDeleted Indicates if the message has been deleted.
 * @apiSuccess {String} sentMessages.subject Subject of the conversation.
 *
 * @apiError (404) NotFound No sent messages found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "No sent messages found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {get} /message/unreadcount Get Unread Message Count
 * @apiVersion 0.1.0
 * @apiName GetUnreadMessageCount
 * @apiGroup Message
 * @apiDescription Get the count of unread messages for the authenticated user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiSuccess {Number} unreadCount Count of unread messages.
 *
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {post} /message/reportmsg/:messageId Report Message
 * @apiVersion 0.1.0
 * @apiName ReportMessage
 * @apiGroup Message
 * @apiDescription Report a message by its ID.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} messageId ID of the message to report.
 *
 * @apiSuccess {String} message Success message indicating the report operation's success.
 *
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Invalid message ID"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */

/**
 * @api {get} /message/:messageId Get Message by ID
 * @apiVersion 0.1.0
 * @apiName GetMessageById
 * @apiGroup Message
 * @apiDescription Get a message by its ID.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} messageId ID of the message to retrieve.
 *
 * @apiSuccess {Object} messageDetails Details of the retrieved message.
 * @apiSuccess {String} messageDetails._id ID of the message.
 * @apiSuccess {String} messageDetails.conversationId ID of the conversation.
 * @apiSuccess {String} messageDetails.senderType Type of sender (user or community).
 * @apiSuccess {String} messageDetails.relatedUserOrCommunity Username of related user or name of community.
 * @apiSuccess {String} messageDetails.type Content type of the message.
 * @apiSuccess {String} messageDetails.content Content of the message.
 * @apiSuccess {Date} messageDetails.time Timestamp of when the message was sent.
 * @apiSuccess {String} messageDetails.direction Direction of the message (incoming or outgoing).
 * @apiSuccess {Boolean} messageDetails.isRead Indicates if the message has been read.
 * @apiSuccess {Boolean} messageDetails.isDeleted Indicates if the message has been deleted.
 * @apiSuccess {String} messageDetails.subject Subject of the conversation.
 *
 * @apiError (404) NotFound Message with the specified ID not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Message not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
 *     }
 */
//#end region message

//#region ban-invite
/**
 * @api {post} /community/moderation/:communityName/:username/invite Invite Moderator
 * @apiVersion 0.1.0
 * @apiName InviteModerator
 * @apiGroup Moderator
 * @apiDescription Invite a user to become a moderator of a community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} communityName Name of the community to invite the user as a moderator.
 * @apiParam {String} username Username of the user to be invited as a moderator.
 * @apiParam {Boolean} manageUsers Indicates whether the invited moderator can manage users.
 * @apiParam {Boolean} managePostsAndComments Indicates whether the invited moderator can manage posts and comments.
 * @apiParam {Boolean} manageSettings Indicates whether the invited moderator can manage community settings.
 *
 * @apiSuccess {String} message Success message indicating the moderator invite was sent successfully.
 *
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (403) Forbidden User is not allowed to invite moderators.
 * @apiError (404) NotFound Community or user not found.
 * @apiError (406) NotAcceptable Moderator doesn't have permission to manage users.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Invalid moderator invite data"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "message": "You are not allowed to invite moderators"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Community not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 406 Not Acceptable
 *     {
 *       "message": "Moderator doesn't have permission to manage users"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {post} /community/moderation/:communityName/accept-invite Accept Moderator Invite
 * @apiVersion 0.1.0
 * @apiName AcceptModeratorInvite
 * @apiGroup Moderator
 * @apiDescription Accept a moderator invitation for a community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} communityName Name of the community to accept the moderator invite.
 *
 * @apiSuccess {String} message Success message indicating the moderator invite was accepted successfully.
 *
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (402) Unacceptable Moderator invite not found.
 * @apiError (404) NotFound Community not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Community name is required"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 402 Unacceptable
 *     {
 *       "message": "Moderator invite not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Community not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {post} /community/moderation/:communityName/decline-invite Decline Moderator Invite
 * @apiVersion 0.1.0
 * @apiName DeclineModeratorInvite
 * @apiGroup Moderator
 * @apiDescription Decline a moderator invitation for a community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} communityName Name of the community to decline the moderator invite.
 *
 * @apiSuccess {String} message Success message indicating the moderator invite was declined successfully.
 *
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (402) Unacceptable Moderator invite not found.
 * @apiError (404) NotFound Community not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Community name is required"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 402 Unacceptable
 *     {
 *       "message": "Moderator invite not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Community not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {post} /community/moderation/:communityName/:username/ban Ban User
 * @apiVersion 0.1.0
 * @apiName BanUser
 * @apiGroup Moderator
 * @apiDescription Ban a user from a community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} communityName Name of the community from which to ban the user.
 * @apiParam {String} username Username of the user to ban.
 * @apiParam {Date} banDuration Duration of the ban (optional).
 * @apiParam {String} banMessage Message to be displayed to the banned user.
 * @apiParam {String} reason Reason for the ban.
 * @apiParam {Boolean} isPermanent Indicates whether the ban is permanent.
 * @apiParam {String} [modNote=""] Moderator's note regarding the ban.
 *
 * @apiSuccess {Object} user Object containing details of the banned user.
 * @apiSuccess {String} user.username Username of the banned user.
 * @apiSuccess {String} user.avatar Avatar URL of the banned user.
 * @apiSuccess {String} message Success message indicating the user was banned successfully.
 *
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (403) Forbidden User is not allowed to ban users.
 * @apiError (404) NotFound User, community, or ban record not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Please insert all data"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "message": "You are not allowed to manage users"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "User not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {patch} /community/moderation/:communityName/:username/ban Edit Ban
 * @apiVersion 0.1.0
 * @apiName EditBan
 * @apiGroup Moderator
 * @apiDescription Edit the ban details for a user in a community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} communityName Name of the community in which the user is banned.
 * @apiParam {String} username Username of the banned user.
 * @apiParam {Date} banDuration New duration of the ban (optional).
 * @apiParam {String} banMessage New message to be displayed to the banned user.
 * @apiParam {String} reason New reason for the ban.
 * @apiParam {Boolean} isPermanent Indicates whether the ban is permanent.
 *
 * @apiSuccess {Object} user Object containing details of the banned user.
 * @apiSuccess {String} user.username Username of the banned user.
 * @apiSuccess {String} user.avatar Avatar URL of the banned user.
 * @apiSuccess {String} message Success message indicating the ban was edited successfully.
 *
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (403) Forbidden User is not allowed to manage users.
 * @apiError (404) NotFound User, community, or ban record not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Please insert all data"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "message": "You are not allowed to manage users"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "User not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {post} /community/moderation/:communityName/:username/unban Unban User
 * @apiVersion 0.1.0
 * @apiName UnbanUser
 * @apiGroup Moderator
 * @apiDescription Unban a user from a community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} communityName Name of the community from which to unban the user.
 * @apiParam {String} username Username of the user to unban.
 *
 * @apiSuccess {Object} user Object containing details of the unbanned user.
 * @apiSuccess {String} user.username Username of the unbanned user.
 * @apiSuccess {String} user.avatar Avatar URL of the unbanned user.
 * @apiSuccess {String} message Success message indicating the user was unbanned successfully.
 *
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (403) Forbidden User is not allowed to unban users.
 * @apiError (404) NotFound User, community, or ban record not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Please insert all data"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "message": "You are not allowed to manage users"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "User not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {get} /community/moderation/:communityName/:username/is-banned Check User Ban Status
 * @apiVersion 0.1.0
 * @apiName CheckUserBanStatus
 * @apiGroup Moderator
 * @apiDescription Check whether a user is banned from a community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} communityName Name of the community to check the user's ban status.
 * @apiParam {String} username Username of the user to check.
 *
 * @apiSuccess {Boolean} isBanned Indicates whether the user is banned from the community.
 *
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (404) NotFound Community, user, or ban record not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "username and community name is required"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Community not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "User not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {get} /community/moderation/:communityName/banned-users Get Banned Users in Community
 * @apiVersion 0.1.0
 * @apiName GetBannedUsersInCommunity
 * @apiGroup Moderator
 * @apiDescription Get the list of users banned in a community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} communityName Name of the community to get banned users from.
 *
 * @apiSuccess {Object[]} bannedUsersDetails Array containing details of banned users.
 * @apiSuccess {String} bannedUsersDetails.username Username of the banned user.
 * @apiSuccess {String} bannedUsersDetails.userProfilePic Profile picture URL of the banned user.
 * @apiSuccess {String} bannedUsersDetails.reasonForBan Reason for the ban.
 * @apiSuccess {String} bannedUsersDetails.userWhoBan Username of the moderator who banned the user.
 * @apiSuccess {String} bannedUsersDetails.banPeriod Duration of the ban.
 * @apiSuccess {Boolean} bannedUsersDetails.isPermanent Indicates whether the ban is permanent.
 * @apiSuccess {String} bannedUsersDetails.modNote Moderator's note regarding the ban.
 *
 * @apiError (403) Forbidden User is not a moderator of the community.
 * @apiError (404) NotFound No users are banned in the community.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "message": "You are not a moderator of this community"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "No users are banned in this community"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

//#endregion ban-invite

//#region Notifications

/**
 * @api {put} /notifications/mark-all-as-read Mark All Notifications as Read
 * @apiVersion 0.1.0
 * @apiName MarkAllNotificationsAsRead
 * @apiGroup Notifications
 * @apiDescription Marks all notifications and messages as read for the authenticated user.
 * This endpoint updates the `isRead` field to true for all notifications and messages belonging to the user.
 *
 * @apiHeader {String} Authorization User's access token obtained after authentication.
 *
 * @apiSuccess {String} message Success message indicating notifications marked as read successfully.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Notifications marked as read successfully"
 *     }
 *
 * @apiError (401) Unauthorized User is not authenticated.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal Server Error"
 *     }
 */

/**
 * @api {put} /notifications/read-notification/:notificationId Mark Notification as Read
 * @apiVersion 0.1.0
 * @apiName MarkNotificationAsRead
 * @apiGroup Notifications
 * @apiDescription Marks a specific notification as read for the authenticated user.
 *
 * @apiHeader {String} Authorization User's access token obtained after authentication.
 *
 * @apiParam {String} notificationId ID of the notification to mark as read.
 * @apiParamExample {json} Example:
 *     {
 *       "notificationId": "609cfff1c8b58f001d54ee1e"
 *     }
 *
 * @apiSuccess {String} message Success message indicating notification marked as read successfully.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Notification has been marked as read successfully"
 *     }
 *
 * @apiError (404) NotFound Notification with the provided ID not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal Server Error"
 *     }
 */

/**
 * @api {get} /notifications/unread/count Get Unread Notification Count
 * @apiVersion 0.1.0
 * @apiName GetUnreadNotificationCount
 * @apiGroup Notifications
 * @apiDescription Retrieves the count of unread notifications and messages for the authenticated user.
 *
 * @apiHeader {String} Authorization User's access token obtained after authentication.
 *
 * @apiSuccess {Number} unreadCount Total count of unread notifications and messages.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "unreadCount": 5
 *     }
 *
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal Server Error"
 *     }
 */

/**
 * @api {get} /notifications Get All Notifications
 * @apiVersion 0.1.0
 * @apiName GetAllNotifications
 * @apiGroup Notifications
 * @apiDescription Retrieves all notifications for the authenticated user.
 *
 * @apiHeader {String} Authorization User's access token obtained after authentication.
 *
 * @apiSuccess {Object[]} notifications Array of notification objects.
 * @apiSuccess {String} notifications._id Unique ID of the notification.
 * @apiSuccess {String} notifications.userId ID of the user associated with the notification.
 * @apiSuccess {String} notifications.postId ID of the post associated with the notification.
 * @apiSuccess {String} notifications.commentId ID of the comment associated with the notification.
 * @apiSuccess {String} notifications.content Content of the notification.
 * @apiSuccess {String} notifications.notification_type Type of the notification.
 * @apiSuccess {Object} notifications.related_user Related user details.
 * @apiSuccess {String} notifications.related_user.username Username of the related user.
 * @apiSuccess {String} notifications.related_user.avatar Avatar URL of the related user.
 * @apiSuccess {Object} notifications.post Post details associated with the notification.
 * @apiSuccess {String} notifications.post.title Title of the post.
 * @apiSuccess {String} notifications.post.community Community of the post.
 * @apiSuccess {Object} notifications.comment Comment details associated with the notification.
 * @apiSuccess {String} notifications.comment.content Content of the comment.
 * @apiSuccess {String} notifications.comment.postTitle Title of the post related to the comment.
 * @apiSuccess {String} notifications.comment.communityTitle Community of the post related to the comment.
 * @apiSuccess {Boolean} notifications.is_read Indicates if the notification has been read.
 * @apiSuccess {Boolean} notifications.is_hidden Indicates if the notification is hidden.
 * @apiSuccess {Date} notifications.created_at Date and time when the notification was created.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "_id": "609cfff1c8b58f001d54ee1e",
 *         "userId": "609cfff1c8b58f001d54ee1f",
 *         "postId": "609d0222c8b58f001d54ee20",
 *         "commentId": "609d0222c8b58f001d54ee21",
 *         "content": "Your post has a new comment",
 *         "notification_type": "Comment",
 *         "related_user": {
 *           "username": "example_user",
 *           "avatar": "https://example.com/avatar.jpg"
 *         },
 *         "post": {
 *           "title": "Example Post",
 *           "community": "Example Community"
 *         },
 *         "comment": {
 *           "content": "This is a new comment",
 *           "postTitle": "Example Post",
 *           "communityTitle": "Example Community"
 *         },
 *         "is_read": false,
 *         "is_hidden": false,
 *         "created_at": "2024-05-04T12:00:00.000Z"
 *       }
 *     ]
 *
 * @apiError (404) NotFound No notifications found for the user.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal Server Error"
 *     }
 */

/**
 * @api {post} /notifications/hide/:notificationId Hide Notification
 * @apiVersion 0.1.0
 * @apiName HideNotification
 * @apiGroup Notifications
 * @apiDescription Hides a specific notification for the authenticated user.
 *
 * @apiHeader {String} Authorization User's access token obtained after authentication.
 *
 * @apiParam {String} notificationId ID of the notification to hide.
 * @apiParamExample {json} Example:
 *     {
 *       "notificationId": "609cfff1c8b58f001d54ee1e"
 *     }
 *
 * @apiSuccess {String} message Success message indicating notification hidden successfully.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Notification hidden successfully"
 *     }
 *
 * @apiError (404) NotFound Notification with the provided ID not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal Server Error"
 *     }
 */

/**
 * @api {get} /community/suggest Suggest Community
 * @apiVersion 0.1.0
 * @apiName SuggestCommunity
 * @apiGroup Notifications
 * @apiDescription Suggests a random community.
 *
 * @apiHeader {String} Authorization User's access token obtained after authentication.
 *
 * @apiSuccess {String} communityname Name of the suggested community.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "communityname": "example_community"
 *     }
 *
 * @apiError (404) NotFound No communities found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal Server Error"
 *     }
 */

/**
 * @api {post} /community/update/disable/:communityname Disable Community Updates
 * @apiVersion 0.1.0
 * @apiName DisableCommunityUpdates
 * @apiGroup Notifications
 * @apiDescription Disables updates for a specified community for the authenticated user.
 *
 * @apiHeader {String} Authorization User's access token obtained after authentication.
 *
 * @apiParam {String} communityname Name of the community to disable updates for.
 * @apiParamExample {json} Example:
 *     {
 *       "communityname": "example_community"
 *     }
 *
 * @apiSuccess {String} message Success message indicating updates disabled for the specified community.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Updates disabled for the specified community"
 *     }
 *
 * @apiError (404) NotFound Community with the provided name not found.
 * @apiError (400) BadRequest Community updates are already disabled for the user.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal Server Error"
 *     }
 */

/**
 * @api {post} /notifications/subscribe Subscribe to Notifications
 * @apiVersion 0.1.0
 * @apiName SubscribeToNotifications
 * @apiGroup Notifications
 * @apiDescription Subscribes the authenticated user to receive notifications via Firebase Cloud Messaging (FCM).
 *
 * @apiHeader {String} Authorization User's access token obtained after authentication.
 *
 * @apiParam {String} fcmToken Firebase Cloud Messaging token for subscription.
 * @apiParamExample {json} Example:
 *     {
 *       "fcmToken": "example_fcm_token"
 *     }
 *
 * @apiSuccess {String} message Success message indicating subscription added successfully.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Subscription added successfully"
 *     }
 *
 * @apiError (400) BadRequest Subscription already exists for the provided FCM token.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal Server Error"
 *     }
 */

//#endregion

//#region Search

/**
 * @api {get} /search Perform Search
 * @apiVersion 0.1.0
 * @apiName getSearch
 * @apiGroup Search
 * @apiDescription Performs a search based on the provided query parameters.
 * This endpoint searches for users, posts, comments, communities, and hashtags based on the search query.
 * The response includes search results based on the specified type and sort criteria.
 *
 * @apiHeader {String} Authorization User's access token obtained after authentication.
 *
 * @apiParam {String} q Search query. Example: "John Doe"
 * @apiParam {String} type Type of search (people, posts, comments, communities, hashtags). Example: "people"
 * @apiParam {String} [sort] Sorting criteria for search results (hot, new, top, comment). Example: "hot"
 *
 * @apiSuccess {Object[]} results Array of search results.
 * @apiSuccessExample {json} Success-People-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "results": [
 *         {
 *           "userId": "609cfff1c8b58f001d54ee1f",
 *           "username": "john_doe",
 *           "userProfilePic": "https://example.com/profile_pic.jpg",
 *           "userinfo": "A software engineer",
 *           "followersCount": 1000,
 *           "isFollowing": true
 *         },
 *         {
 *           "userId": "609d033ec8b58f001d54ee22",
 *           "username": "jane_doe",
 *           "userProfilePic": "https://example.com/profile_pic.jpg",
 *           "userinfo": "A web developer",
 *           "followersCount": 500,
 *           "isFollowing": false
 *         }
 *       ]
 *     }
 * @apiSuccessExample {json} Success-Posts-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "results": [
 *         {
 *           "postId": "609d0222c8b58f001d54ee20",
 *           "title": "New Product Launch",
 *           "content":"Test Content",
 *           "isnsfw": false,
 *           "isSpoiler": false,
 *           "votesCount": 50,
 *           "commentsCount": 20,
 *           "date": "2024-05-04T12:00:00.000Z",
 *           "username": "john_doe",
 *           "userProfilePic": "https://example.com/profile_pic.jpg",
 *           "attachments": [],
 *           "communityname": "tech_community",
 *           "communityProfilePic": "https://example.com/community_pic.jpg"
 *         },
 *         {
 *           "postId": "609d033ec8b58f001d54ee23",
 *           "title": "Tech Talk",
 *           "content":"Test Content",
 *           "isnsfw": false,
 *           "isSpoiler": false,
 *           "votesCount": 30,
 *           "commentsCount": 10,
 *           "date": "2024-05-04T12:00:00.000Z",
 *           "username": "jane_doe",
 *           "userProfilePic": "https://example.com/profile_pic.jpg",
 *           "attachments": [],
 *           "communityname": "tech_community",
 *           "communityProfilePic": "https://example.com/community_pic.jpg"
 *         }
 *       ]
 *     }
 * @apiSuccessExample {json} Success-Comments-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "results": [
 *         {
 *           "commentId": "609cfff1c8b58f001d54ee1e",
 *           "commentContent": "Great post!",
 *           "commentVotes": 10,
 *           "commentDate": "2024-05-04T12:00:00.000Z",
 *           "communityName": "programming",
 *           "communityProfilePic": "https://example.com/community_pic.jpg",
 *           "username": "jane_doe",
 *           "userProfilePic": "https://example.com/profile_pic.jpg",
 *           "postId": "609d033ec8b58f001d54ee23",
 *           "postDate": "2024-05-04T12:00:00.000Z",
 *           "postVotes": 30,
 *           "postCommentsCount": 15,
 *           "postTitle": "New Feature Announcement",
 *           "attachments": []
 *         }
 *       ]
 *     }
 * @apiSuccessExample {json} Success-Communities-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "results": [
 *         {
 *           "communityId": "609d033ec8b58f001d54ee24",
 *           "communityName": "programming",
 *           "communityProfilePic": "https://example.com/community_pic.jpg",
 *           "membersCount": 10000,
 *           "communityInfo": "A community for programmers",
 *           "isFollowing": true
 *         }
 *       ]
 *     }
 *
 * @apiError (400) BadRequest Invalid search query or type.
 * @apiError (404) NotFound No search results found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal Server Error"
 *     }
 */
/**
 * @api {get} /search/profile Perform Profile Search
 * @apiVersion 0.1.0
 * @apiName PerformProfileSearch
 * @apiGroup Search
 * @apiDescription Performs a search within user profiles or community posts based on the provided query parameters.
 * This endpoint allows searching for posts or comments within a specific user profile or community.
 * The response includes search results based on the specified type and sort criteria.
 *
 * @apiHeader {String} Authorization User's access token obtained after authentication.
 *
 * @apiParam {String} [username] Username of the user whose profile is being searched. Example: "john_doe"
 * @apiParam {String} [communityname] Name of the community whose posts are being searched. Example: "programming"
 * @apiParam {String} q Search query. Example: "New feature"
 * @apiParam {String} type Type of search (posts, comments). Example: "posts"
 * @apiParam {String} [sort] Sorting criteria for search results (hot, new, top, comment). Example: "new"
 *
 * @apiSuccess {Object[]} results Array of search results.
 * @apiSuccessExample {json} Success-Posts-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "results": [
 *         {
 *           "postId": "609d0222c8b58f001d54ee20",
 *           "title": "New Product Launch",
 *           "content":"Test Content",
 *           "isnsfw": false,
 *           "isSpoiler": false,
 *           "votesCount": 50,
 *           "commentsCount": 20,
 *           "date": "2024-05-04T12:00:00.000Z",
 *           "username": "john_doe",
 *           "userProfilePic": "https://example.com/profile_pic.jpg",
 *           "attachments": [],
 *           "communityname": "tech_community",
 *           "communityProfilePic": "https://example.com/community_pic.jpg"
 *         },
 *         {
 *           "postId": "609d033ec8b58f001d54ee23",
 *           "title": "Tech Talk",
 *           "content":"Test Content",
 *           "isnsfw": false,
 *           "isSpoiler": false,
 *           "votesCount": 30,
 *           "commentsCount": 10,
 *           "date": "2024-05-04T12:00:00.000Z",
 *           "username": "jane_doe",
 *           "userProfilePic": "https://example.com/profile_pic.jpg",
 *           "attachments": [],
 *           "communityname": "tech_community",
 *           "communityProfilePic": "https://example.com/community_pic.jpg"
 *         }
 *       ]
 *     }
 * @apiSuccessExample {json} Success-Comments-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "results": [
 *         {
 *           "commentId": "609cfff1c8b58f001d54ee1e",
 *           "commentContent": "Great post!",
 *           "commentVotes": 10,
 *           "commentDate": "2024-05-04T12:00:00.000Z",
 *           "communityName": "programming",
 *           "communityProfilePic": "https://example.com/community_pic.jpg",
 *           "username": "jane_doe",
 *           "userProfilePic": "https://example.com/profile_pic.jpg",
 *           "postId": "609d033ec8b58f001d54ee23",
 *           "postDate": "2024-05-04T12:00:00.000Z",
 *           "postVotes": 30,
 *           "postCommentsCount": 15,
 *           "postTitle": "New Feature Announcement",
 *           "attachments": []
 *         }
 *       ]
 *     }
 *
 * @apiError (400) BadRequest Invalid search query or type.
 * @apiError (404) NotFound No search results found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal Server Error"
 *     }
 */

/**
 * @api {get} /search/suggestions Get Search Suggestions
 * @apiVersion 0.1.0
 * @apiName GetSearchSuggestions
 * @apiGroup Search
 * @apiDescription Retrieves search suggestions based on the provided query parameter.
 * This endpoint returns suggested users and communities based on exact matches, starts with matches,
 * and contains matches for the search query.
 *
 * @apiHeader {String} Authorization User's access token obtained after authentication.
 *
 * @apiParam {String} q Search query. Example: "programming"
 *
 * @apiSuccess {Object[]} communities Array of suggested community objects.
 * @apiSuccess {Object[]} users Array of suggested user objects.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "communities": [
 *         {
 *           "communityId": "609d0222c8b58f001d54ee20",
 *           "communityName": "programming",
 *           "communityProfilePic": "https://example.com/community_pic.jpg",
 *           "membersCount": 500,
 *           "communityInfo": "A community for programmers",
 *           "isFollowing": false
 *         }
 *       ],
 *       "users": [
 *         {
 *           "userId": "609d033ec8b58f001d54ee23",
 *           "username": "john_doe",
 *           "userProfilePic": "https://example.com/profile_pic.jpg",
 *           "userinfo": "Software Engineer",
 *           "followersCount": 100,
 *           "isFollowing": false
 *         }
 *       ]
 *     }
 *
 * @apiError (400) BadRequest Invalid search query.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal Server Error"
 *     }
 */

//#region Trending Posts

/**
 * @api {get} /search/trending Get Trending Posts
 * @apiVersion 0.1.0
 * @apiName GetTrendingPosts
 * @apiGroup Search
 * @apiDescription Retrieves the top trending posts based on the number of comments.
 * This endpoint returns the top 5 posts with the highest number of comments.
 *
 * @apiHeader {String} Authorization User's access token obtained after authentication.
 *
 * @apiSuccess {Object[]} results Array of top trending post objects.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "results": [
 *         {
 *           "postId": "609d042ac8b58f001d54ee25",
 *           "title": "The Future of Artificial Intelligence",
 *           "content":"Test Content",
 *           "isnsfw": false,
 *           "isSpoiler": false,
 *           "votesCount": 150,
 *           "commentsCount": 200,
 *           "date": "2024-05-01T10:30:00Z",
 *           "username": "john_doe",
 *           "userProfilePic": "https://example.com/profile_pic.jpg",
 *           "attachments": ["https://example.com/post_attachment.jpg"],
 *           "communityname": "technology",
 *           "communityProfilePic": "https://example.com/community_pic.jpg"
 *         }
 *       ]
 *     }
 *
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal Server Error"
 *     }
 */

/**
 * @api {post} /search/log Log Search Activity
 * @apiVersion 0.1.0
 * @apiName LogSearchActivity
 * @apiGroup Search
 * @apiDescription Logs search activity performed by users, including searches for posts, communities, and users.
 * This endpoint records search queries, search type (normal, community, or user), and additional information like community name and username if applicable.
 *
 * @apiHeader {String} Authorization User's access token obtained after authentication.
 *
 * @apiParam {String} query The search query entered by the user.
 * @apiParam {String="normal","community","user"} type The type of search: "normal" for general search, "community" for community search, "user" for user search.
 * @apiParam {String} [communityName] The name of the community if the search type is "community".
 * @apiParam {String} [username] The username if the search type is "user".
 * @apiParam {Boolean} [isInProfile] Indicates whether the search was performed from a user's profile page. Default is false.
 *
 * @apiSuccess {String} message Success message indicating search activity logged successfully.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Search activity logged successfully"
 *     }
 *
 * @apiError (400) BadRequest Invalid request body or missing required fields.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal Server Error"
 *     }
 */

/**
 * @api {get} /search/history Get Search History
 * @apiVersion 0.1.0
 * @apiName GetSearchHistory
 * @apiGroup Search
 * @apiDescription Retrieves the search history of the authenticated user, including the most recent searches.
 * This endpoint returns the search queries along with associated details such as community name, user name, and profile picture.
 *
 * @apiHeader {String} Authorization User's access token obtained after authentication.
 *
 * @apiSuccess {Object[]} history Array containing search history records.
 * @apiSuccess {String} history.query The search query.
 * @apiSuccess {String} history.type The type of search: "normal" for general search, "community" for community search, "user" for user search.
 * @apiSuccess {String} [history.communityId] The ID of the community if the search type is "community".
 * @apiSuccess {String} [history.communityName] The name of the community if the search type is "community".
 * @apiSuccess {String} [history.communityProfilePic] The profile picture of the community if the search type is "community".
 * @apiSuccess {String} [history.userId] The ID of the user if the search type is "user".
 * @apiSuccess {String} [history.userName] The username of the user if the search type is "user".
 * @apiSuccess {String} [history.userProfilePic] The profile picture of the user if the search type is "user".
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "query": "example",
 *         "type": "normal"
 *       },
 *       {
 *         "query": "community",
 *         "type": "community",
 *         "communityId": "609bd4c92b108c0015e3d456",
 *         "communityName": "Example Community",
 *         "communityProfilePic": "community_image_url"
 *       },
 *       {
 *         "query": "user",
 *         "type": "user",
 *         "userId": "609bd4c92b108c0015e3d457",
 *         "userName": "example_user",
 *         "userProfilePic": "user_avatar_url"
 *       }
 *     ]
 *
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal Server Error"
 *     }
 */

/**
 * @api {delete} /search/history Delete Search History
 * @apiVersion 0.1.0
 * @apiName DeleteSearchHistory
 * @apiGroup Search
 * @apiDescription Deletes a specific search history record based on the query provided.
 *
 * @apiHeader {String} Authorization User's access token obtained after authentication.
 *
 * @apiParam {String} query The search query to be deleted from the search history.
 *
 * @apiSuccess {String} message Success message indicating search history record deleted successfully.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Search history record deleted successfully"
 *     }
 *
 * @apiError (400) BadRequest Invalid or missing search query parameter.
 * @apiError (404) NotFound Search history record not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal Server Error"
 *     }
 */

//#endregion
//#region Post Moderation

/**
 * @api {post} /community/moderation/:communityName/spam-post/:postId Mark Post as Spam
 * @apiVersion 0.1.0
 * @apiName MarkPostAsSpam
 * @apiGroup Post
 * @apiDescription Marks a post as spam within a community.
 * This endpoint is used by moderators to mark a specific post as spam within their community.
 *
 * @apiHeader {String} Authorization User's access token obtained after authentication.
 *
 * @apiParam {String} communityName Name of the community where the post belongs.
 * @apiParam {String} postId ID of the post to be marked as spam.
 *
 * @apiSuccess {String} message Success message indicating post marked as spam successfully.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Post marked as spam successfully"
 *     }
 *
 * @apiError (402) Forbidden User is not a moderator.
 * @apiError (406) NotAcceptable Moderator doesn't have permission to mark the post as spam.
 * @apiError (404) NotFound Post not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal Server Error"
 *     }
 */

/**
 * @api {get} /community/moderation/:communityName/get-spam-posts Get Spam Posts
 * @apiVersion 0.1.0
 * @apiName GetSpamPosts
 * @apiGroup Post
 * @apiDescription Retrieves a list of spam posts within a community.
 * This endpoint returns the list of posts marked as spam within a specified community.
 *
 * @apiHeader {String} Authorization User's access token obtained after authentication.
 *
 * @apiParam {String} communityName Name of the community.
 *
 * @apiSuccess {Object[]} posts Array of spam post objects.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "_id": "609d0222c8b58f001d54ee20",
 *         "userId": "609d033ec8b58f001d54ee23",
 *         "username": "john_doe",
 *         "userProfilePic": "https://example.com/profile_pic.jpg",
 *         "hasUpvoted": true,
 *         "hasDownvoted": false,
 *         "hasVotedOnPoll": true,
 *         "selectedPollOption": "Option A",
 *         "numberOfViews": 100,
 *         "votesUpCount": 50,
 *         "votesDownCount": 10,
 *         "sharesCount": 5,
 *         "commentsCount": 20,
 *         "title": "New Product Launch",
 *         "content": "Lorem ipsum dolor sit amet...",
 *         "community": "tech_community",
 *         "communityIcon": "https://example.com/community_pic.jpg",
 *         "type": "text",
 *         "link": null,
 *         "pollExpiration": "2024-05-05T12:00:00Z",
 *         "isPollEnabled": true,
 *         "pollVotingLength": 24,
 *         "isSpoiler": false,
 *         "isNsfw": false,
 *         "sendPostReplyNotification": true,
 *         "isCommentsLocked": false,
 *         "isSaved": true,
 *         "isRemoved": false,
 *         "removalReason": null,
 *         "isApproved": true,
 *         "isScheduled": false,
 *         "isSpam": true,
 *         "date": "2024-05-04T12:00:00Z",
 *         "pollOptions": ["Option A", "Option B"],
 *         "attachments": []
 *       }
 *     ]
 *
 * @apiError (402) Forbidden User is not a moderator or does not have permission.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal Server Error"
 *     }
 */

/**
 * @api {get} /community/moderation/:communityName/get-edited-posts Get Edited Posts History
 * @apiVersion 0.1.0
 * @apiName GetEditedPostsHistory
 * @apiGroup Post
 * @apiDescription Retrieves the history of edited posts within a community.
 * This endpoint returns a list of edited posts within a specified community.
 *
 * @apiHeader {String} Authorization User's access token obtained after authentication.
 *
 * @apiParam {String} communityName Name of the community.
 *
 * @apiSuccess {Object[]} posts Array of edited post objects.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "_id": "609d0222c8b58f001d54ee20",
 *         "userId": "609d033ec8b58f001d54ee23",
 *         "username": "john_doe",
 *         "userProfilePic": "https://example.com/profile_pic.jpg",
 *         "hasUpvoted": true,
 *         "hasDownvoted": false,
 *         "hasVotedOnPoll": true,
 *         "selectedPollOption": "Option A",
 *         "numberOfViews": 100,
 *         "votesUpCount": 50,
 *         "votesDownCount": 10,
 *         "sharesCount": 5,
 *         "commentsCount": 20,
 *         "title": "New Product Launch",
 *         "content": "Lorem ipsum dolor sit amet...",
 *         "community": "tech_community",
 *         "communityIcon": "https://example.com/community_pic.jpg",
 *         "type": "text",
 *         "link": null,
 *         "pollExpiration": "2024-05-05T12:00:00Z",
 *         "isPollEnabled": true,
 *         "pollVotingLength": 24,
 *         "isSpoiler": false,
 *         "isNsfw": false,
 *         "sendPostReplyNotification": true,
 *         "isCommentsLocked": false,
 *         "isSaved": true,
 *         "isRemoved": false,
 *         "removalReason": null,
 *         "isApproved": true,
 *         "isScheduled": false,
 *         "isSpam": false,
 *         "date": "2024-05-04T12:00:00Z",
 *         "pollOptions": ["Option A", "Option B"],
 *         "attachments": []
 *       }
 *     ]
 *
 * @apiError (402) Forbidden User is not a moderator or does not have permission.
 * @apiError (404) NotFound Edited posts not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal Server Error"
 *     }
 */

/**
 * @api {post} /community/moderation/:communityName/:postId/remove-post Remove Post
 * @apiVersion 0.1.0
 * @apiName RemovePost
 * @apiGroup Post
 * @apiDescription Removes a post from a community.
 * This endpoint is used by moderators to remove a specific post from their community.
 *
 * @apiHeader {String} Authorization User's access token obtained after authentication.
 *
 * @apiParam {String} communityName Name of the community where the post belongs.
 * @apiParam {String} postId ID of the post to be removed.
 *
 * @apiParam {String} removalReason Reason for removing the post.
 *
 * @apiSuccess {String} message Success message indicating post removed successfully.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Post removed successfully"
 *     }
 *
 * @apiError (400) BadRequest Must has a removal reason.
 * @apiError (402) Forbidden User is not a moderator or does not have permission.
 * @apiError (403) Forbidden Post has already been removed before.
 * @apiError (404) NotFound Post not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal Server Error"
 *     }
 */

/**
 * @api {get} /community/moderation/:communityName/unmoderated-posts Get Unmoderated Posts
 * @apiVersion 0.1.0
 * @apiName GetUnmoderatedPosts
 * @apiGroup Post
 * @apiDescription Retrieves a list of unmoderated posts within a community.
 * This endpoint returns a list of posts that are not yet moderated within a specified community.
 *
 * @apiHeader {String} Authorization User's access token obtained after authentication.
 *
 * @apiParam {String} communityName Name of the community.
 *
 * @apiSuccess {Object[]} posts Array of unmoderated post objects.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "_id": "609d0222c8b58f001d54ee20",
 *         "userId": "609d033ec8b58f001d54ee23",
 *         "username": "john_doe",
 *         "userProfilePic": "https://example.com/profile_pic.jpg",
 *         "hasUpvoted": true,
 *         "hasDownvoted": false,
 *         "hasVotedOnPoll": true,
 *         "selectedPollOption": "Option A",
 *         "numberOfViews": 100,
 *         "votesUpCount": 50,
 *         "votesDownCount": 10,
 *         "sharesCount": 5,
 *         "commentsCount": 20,
 *         "title": "New Product Launch",
 *         "content": "Lorem ipsum dolor sit amet...",
 *         "community": "tech_community",
 *         "communityIcon": "https://example.com/community_pic.jpg",
 *         "type": "text",
 *         "link": null,
 *         "pollExpiration": "2024-05-05T12:00:00Z",
 *         "isPollEnabled": true,
 *         "pollVotingLength": 24,
 *         "isSpoiler": false,
 *         "isNsfw": false,
 *         "sendPostReplyNotification": true,
 *         "isCommentsLocked": false,
 *         "isSaved": true,
 *         "isRemoved": false,
 *         "removalReason": null,
 *         "isApproved": false,
 *         "isScheduled": false,
 *         "isSpam": false,
 *         "date": "2024-05-04T12:00:00Z",
 *         "pollOptions": ["Option A", "Option B"],
 *         "attachments": []
 *       }
 *     ]
 *
 * @apiError (402) Forbidden User is not a moderator or does not have permission.
 * @apiError (404) NotFound No unmoderated posts found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal Server Error"
 *     }
 */

/**
 * @api {get} /community/moderation/:communityName/schedule-posts Get Scheduled Posts
 * @apiVersion 0.1.0
 * @apiName GetScheduledPosts
 * @apiGroup Post
 * @apiDescription Retrieves a list of scheduled posts within a community.
 * This endpoint returns a list of posts that are scheduled for publishing within a specified community.
 *
 * @apiHeader {String} Authorization User's access token obtained after authentication.
 *
 * @apiParam {String} communityName Name of the community.
 *
 * @apiSuccess {Object[]} posts Array of scheduled post objects.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "_id": "609d0222c8b58f001d54ee20",
 *         "userId": "609d033ec8b58f001d54ee23",
 *         "username": "john_doe",
 *         "userProfilePic": "https://example.com/profile_pic.jpg",
 *         "hasUpvoted": true,
 *         "hasDownvoted": false,
 *         "hasVotedOnPoll": true,
 *         "selectedPollOption": "Option A",
 *         "numberOfViews": 100,
 *         "votesUpCount": 50,
 *         "votesDownCount": 10,
 *         "sharesCount": 5,
 *         "commentsCount": 20,
 *         "title": "New Product Launch",
 *         "content": "Lorem ipsum dolor sit amet...",
 *         "community": "tech_community",
 *         "communityIcon": "https://example.com/community_pic.jpg",
 *         "type": "text",
 *         "link": null,
 *         "pollExpiration": "2024-05-05T12:00:00Z",
 *         "isPollEnabled": true,
 *         "pollVotingLength": 24,
 *         "isSpoiler": false,
 *         "isNsfw": false,
 *         "sendPostReplyNotification": true,
 *         "isCommentsLocked": false,
 *         "isSaved": true,
 *         "isRemoved": false,
 *         "removalReason": null,
 *         "isApproved": false,
 *         "isScheduled": true,
 *         "isSpam": false,
 *         "date": "2024-05-04T12:00:00Z",
 *         "pollOptions": ["Option A", "Option B"],
 *         "attachments": []
 *       }
 *     ]
 *
 * @apiError (402) Forbidden User is not a moderator or does not have permission.
 * @apiError (404) NotFound No scheduled posts found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal Server Error"
 *     }
 */

/**
 * @api {post} /community/moderation/:communityName/:postId/approve-post Approve Post
 * @apiVersion 0.1.0
 * @apiName ApprovePost
 * @apiGroup Post
 * @apiDescription Approves a post within a community.
 * This endpoint is used by moderators to approve a specific post within their community.
 *
 * @apiHeader {String} Authorization User's access token obtained after authentication.
 *
 * @apiParam {String} communityName Name of the community where the post belongs.
 * @apiParam {String} postId ID of the post to be approved.
 *
 * @apiSuccess {String} message Success message indicating post approved successfully.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Post approved successfully"
 *     }
 *
 * @apiError (402) Forbidden User is not a moderator or does not have permission.
 * @apiError (404) NotFound Post or community not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal Server Error"
 *     }
 */

//#endregion

//#region Moderation

/**
 * @api {post} /rule/add Add Rule to Community
 * @apiVersion 0.1.0
 * @apiName AddRuleToCommunity
 * @apiGroup Moderation
 * @apiDescription Adds a rule to a community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} title Title of the rule.
 * @apiParam {String} [description] Description of the rule.
 * @apiParam {String} [reportReason] Reason for reporting.
 * @apiParam {String} communityName Name of the community to add the rule to.
 * @apiParam {String="posts","comments","both"} [appliesTo="both"] Specifies whether the rule applies to posts, comments, or both.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "title": "Sample Rule",
 *    "description": "Sample description for the rule",
 *    "communityName": "Sample Community",
 *    "appliesTo": "posts",
 *    "reportReason": "example reason"
 * }
 *
 * @apiSuccess {String} message Success message indicating that the rule has been added successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Rule added successfully"
 *     }
 *
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (402) Forbidden User is not a moderator of the community.
 * @apiError (403) Forbidden Title already used.
 * @apiError (404) NotFound Community not found.
 * @apiError (405) MethodNotAllowed Max number of rules reached.
 * @apiError (406) NotAcceptable Moderator doesn't have permission to manage settings.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Invalid rule data"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 402 Forbidden
 *     {
 *       "message": "You are not a moderator of this community"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "message": "Title already used"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Community not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 405 Method Not Allowed
 *     {
 *       "message": "Max number of rules reached"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 406 Not Acceptable
 *     {
 *       "message": "Moderator doesn't have permission to manage settings"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {post} /rule/remove Remove Rule from Community
 * @apiVersion 0.1.0
 * @apiName RemoveRuleFromCommunity
 * @apiGroup Moderation
 * @apiDescription Removes a rule from a community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} communityName Name of the community to remove the rule from.
 * @apiParam {String} title Title of the rule to remove.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "communityName": "Sample Community",
 *    "title": "Sample Rule"
 * }
 *
 * @apiSuccess {String} message Success message indicating that the rule has been removed successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Rule removed successfully"
 *     }
 *
 * @apiError (400) BadRequest Missing or invalid request parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (402) Forbidden Not a moderator.
 * @apiError (404) NotFound Community or rule not found.
 * @apiError (406) NotAcceptable Moderator doesn't have permission to manage settings.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Invalid request parameters"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 402 Forbidden
 *     {
 *       "message": "Not a moderator"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Community not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Rule not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 406 Not Acceptable
 *     {
 *       "message": "Moderator doesn't have permission"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {put} /rule/edit Edit Rule in Community
 * @apiVersion 0.1.0
 * @apiName EditRuleInCommunity
 * @apiGroup Moderation
 * @apiDescription Edits a rule in a community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} communityName Name of the community to edit the rule in.
 * @apiParam {String} oldTitle Title of the rule to be edited.
 * @apiParam {Object} newRule New details of the rule.
 * @apiParam {String} newRule.title New title of the rule.
 * @apiParam {String} [newRule.description] New description of the rule.
 * @apiParam {String} [newRule.reportReason] New reason for reporting.
 * @apiParam {String="posts","comments","both"} [newRule.appliesTo="both"] New value specifying whether the rule applies to posts, comments, or both.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *      "communityName": "Sample Community",
 *      "oldTitle": "Sample Rule",
 *      "newRule": {
 *      "title": "Updated Rule",
 *      "description": "Updated description for the rule"
 * }
 *
 * @apiSuccess {String} message Success message indicating that the rule has been edited successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Rule edited successfully"
 *     }
 *
 * @apiError (400) BadRequest Missing or invalid rule data.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (402) Forbidden Not a moderator.
 * @apiError (404) NotFound Community or rule not found.
 * @apiError (406) NotAcceptable Moderator doesn't have permission to manage settings.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Invalid rule data"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 402 Forbidden
 *     {
 *       "message": "Not a moderator"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Community not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Rule not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 406 Not Acceptable
 *     {
 *       "message": "Moderator doesn't have permission"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {get} /community/:communityName/rules Get Community Rules
 * @apiVersion 0.1.0
 * @apiName GetCommunityRules
 * @apiGroup Moderation
 * @apiDescription Retrieves a list of rules for a specific community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} communityName Name of the community to retrieve rules from.
 *
 * @apiSuccess {Object[]} rules List of rules for the specified community.
 * @apiSuccess {String} rules.title Title of the rule.
 * @apiSuccess {String} rules.description Description of the rule.
 * @apiSuccess {String} rules.reportReason Reason for reporting.
 * @apiSuccess {String} rules.appliesTo Specifies whether the rule applies to posts, comments, or both.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *             "title": "Sample Rule",
 *             "description": "Description of the sample rule",
 *             "reportReason": "Reason for reporting",
 *             "appliesTo": "posts"
 *         }
 *     ]
 *
 * @apiError (400) BadRequest Missing or invalid request parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound Community not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Invalid request parameters"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Community not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {post} /removal-reason/add Add Removal Reason to Community
 * @apiVersion 0.1.0
 * @apiName AddRemovalReasonToCommunity
 * @apiGroup Moderation
 * @apiDescription Adds a removal reason to a community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} title Title of the removal reason.
 * @apiParam {String} reasonMessage Message explaining the reason for removal.
 * @apiParam {String} communityName Name of the community to add the removal reason to.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "title": "Sample Reason",
 *    "reasonMessage": "Sample message for the removal reason",
 *    "communityName": "Sample Community"
 * }
 *
 * @apiSuccess {String} message Success message indicating that the removal reason has been added successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Removal reason added successfully"
 *     }
 *
 * @apiError (400) BadRequest Missing or invalid removal reason data.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (402) Forbidden You are not a moderator of this community.
 * @apiError (404) NotFound Community not found.
 * @apiError (405) MethodNotAllowed Max number of removal reasons reached.
 * @apiError (406) NotAcceptable Moderator doesn't have permission.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Invalid removal reason data"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 402 Forbidden
 *     {
 *       "message": "You are not a moderator of this community"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Community not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 405 Method Not Allowed
 *     {
 *       "message": "Max number of removal reasons reached"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 406 Not Acceptable
 *     {
 *       "message": "Moderator doesn't have permission"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {post} /removal-reason/remove Remove Removal Reason from Community
 * @apiVersion 0.1.0
 * @apiName RemoveRemovalReasonFromCommunity
 * @apiGroup Moderation
 * @apiDescription Removes a removal reason from a community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} communityName Name of the community to remove the removal reason from.
 * @apiParam {String} rId ID of the removal reason to be removed.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "communityName": "Sample Community",
 *    "rId": "609be36ec33f5f00154298b1"
 * }
 *
 * @apiSuccess {String} message Success message indicating that the removal reason has been removed successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Removal reason removed successfully"
 *     }
 *
 * @apiError (400) BadRequest Missing or invalid request parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (402) Forbidden Not a moderator.
 * @apiError (404) NotFound Community or removal reason not found.
 * @apiError (406) NotAcceptable Moderator doesn't have permission.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Invalid request parameters"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Community not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Removal reason not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 406 Not Acceptable
 *     {
 *       "message": "Moderator doesn't have permission"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {put} /removal-reason/edit Edit Removal Reason from Community
 * @apiVersion 0.1.0
 * @apiName EditRemovalReasonFromCommunity
 * @apiGroup Moderation
 * @apiDescription Edits a removal reason in a community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} communityName Name of the community containing the removal reason.
 * @apiParam {String} rId ID of the removal reason to be edited.
 * @apiParam {Object} newRemovalReason New data for the removal reason.
 * @apiParam {String} newRemovalReason.title New title for the removal reason.
 * @apiParam {String} newRemovalReason.reasonMessage New message explaining the reason for removal.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "communityName": "Sample Community",
 *    "rId": "609be36ec33f5f00154298b1",
 *    "newRemovalReason": {
 *        "title": "Updated Reason",
 *        "reasonMessage": "Updated message for the removal reason"
 *    }
 * }
 *
 * @apiSuccess {String} message Success message indicating that the removal reason has been edited successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Removal reason edited successfully"
 *     }
 *
 * @apiError (400) BadRequest Missing or invalid removal reason data.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (402) Forbidden You are not a moderator of this community.
 * @apiError (404) NotFound Community or removal reason not found.
 * @apiError (406) NotAcceptable Moderator doesn't have permission.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Invalid removal reason data"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 402 Forbidden
 *     {
 *       "message": "You are not a moderator of this community"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Community not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Removal Reason not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 406 Not Acceptable
 *     {
 *       "message": "Moderator doesn't have permission"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {get} /community/:communityName/removal-reasons Get Community Removal Reasons
 * @apiVersion 0.1.0
 * @apiName GetCommunityRemovalReasons
 * @apiGroup Moderation
 * @apiDescription Retrieves a list of removal reasons for a specific community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} communityName Name of the community to retrieve removal reasons from.
 *
 * @apiSuccess {Object[]} removalReasons List of removal reasons for the specified community.
 * @apiSuccess {String} removalReasons.title Title of the removal reason.
 * @apiSuccess {String} removalReasons.reasonMessage Message explaining the reason for removal.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *             "title": "Sample Reason",
 *             "reasonMessage": "Sample message for the removal reason"
 *         }
 *     ]
 *
 * @apiError (400) BadRequest Missing or invalid request parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound Community not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Invalid request parameters"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Community not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {get} /community/:communityName/get-info Get Community Info
 * @apiVersion 0.1.0
 * @apiName GetCommunityInfo
 * @apiGroup Moderation
 * @apiDescription Retrieves information about a specific community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} communityName Name of the community to retrieve information from.
 *
 * @apiSuccess {Object} communityObject Object containing community information.
 * @apiSuccess {Boolean} communityObject.is18plus Indicates if the community is for users above 18 years old.
 * @apiSuccess {String} communityObject.name Name of the community.
 * @apiSuccess {String} [communityObject.category] Category of the community.
 * @apiSuccess {String} communityObject.communityType Type of the community (Public, Restricted, Private).
 * @apiSuccess {String} [communityObject.description] Description of the community.
 * @apiSuccess {String} [communityObject.image] Link to the image of the community.
 * @apiSuccess {Array} [communityObject.members] Array of members in the community.
 * @apiSuccess {Number} communityObject.membersCount Total number of community members.
 * @apiSuccess {Array} [communityObject.rules] Array of rules in the community.
 * @apiSuccess {String} communityObject.rules.title Title of the rule.
 * @apiSuccess {String} [communityObject.rules.description] Description of the rule.
 * @apiSuccess {String} [communityObject.rules.reportReason] Reason for reporting the rule.
 * @apiSuccess {String} communityObject.rules.appliesTo Type to which the rule applies (e.g., posts).
 * @apiSuccess {Array} [communityObject.removalReasons] Array of removal reasons in the community.
 * @apiSuccess {String} communityObject.removalReasons.title Title of the removal reason.
 * @apiSuccess {String} [communityObject.removalReasons.reasonMessage] Message describing the reason for removal.
 * @apiSuccess {Date} communityObject.dateCreated Date when the community was created.
 * @apiSuccess {String} [communityObject.communityBanner] Link to the banner of the community.
 * @apiSuccess {String} [communityObject.membersNickname] Nickname for the community members.
 * @apiSuccess {Boolean} communityObject.isModerator Indicates if the user is a moderator in the community.
 * @apiSuccess {Boolean} communityObject.isCreator Indicates if the user is the creator of the community.
 * @apiSuccess {Boolean} communityObject.isMember Indicates if the user is a member of the community.
 * @apiSuccess {Boolean} communityObject.isContributor Indicates if the user is a contributor to the community.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "is18plus": true,
 *       "name": "string",
 *       "category": "string",
 *       "communityType": "Public",
 *       "description": "string",
 *       "image": "string",
 *       "members": [
 *         {}
 *       ],
 *       "membersCount": 0,
 *       "rules": [
 *         {
 *           "title": "string",
 *           "description": "string",
 *           "reportReason": "string",
 *           "appliesTo": "posts"
 *         }
 *       ],
 *       "removalReasons": [
 *         {
 *           "title": "string",
 *           "reasonMessage": "string"
 *         }
 *       ],
 *       "dateCreated": "2024-05-05T20:00:26.288Z",
 *       "communityBanner": "string",
 *       "membersNickname": "string",
 *       "isModerator": true,
 *       "isCreator": true,
 *       "isMember": true,
 *       "isContributor": true
 *     }
 *
 * @apiError (400) BadRequest Invalid request parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound Community not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Invalid request parameters"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Community not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */
/**
 * @api {post} /community/moderation/:communityName/:username/leave Leave Community Moderation
 * @apiVersion 0.1.0
 * @apiName LeaveCommunityModeration
 * @apiGroup Moderation
 * @apiDescription Allows a moderator to leave a community's moderation team.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} communityName Name of the community.
 * @apiParam {String} username Username of the moderator leaving the community.
 *
 * @apiSuccess {String} message Success message indicating that the moderator has left the community moderation successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Left moderator role successfully"
 *     }
 *
 * @apiError (400) BadRequest Invalid leave request.
 * @apiError (404) NotFound User or community not found.
 * @apiError (402) Forbidden User is not a moderator of the community.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Invalid leave request"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "User or community not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 402 Forbidden
 *     {
 *       "message": "User is not a moderator"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {get} /community/moderation/:communityName/contributors Get Community Contributors
 * @apiVersion 0.1.0
 * @apiName GetCommunityContributors
 * @apiGroup Moderation
 * @apiDescription Retrieves a list of contributors for a specific community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} communityName Name of the community to retrieve contributors from.
 *
 * @apiSuccess {Object[]} contributors List of contributors for the specified community.
 * @apiSuccess {String} contributors.username Username of the contributor.
 * @apiSuccess {String} contributors.banner Banner image URL of the contributor.
 * @apiSuccess {String} contributors.avatar Avatar image URL of the contributor.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *             "username": "user1",
 *             "banner": "https://example.com/banner1.jpg",
 *             "avatar": "https://example.com/avatar1.jpg"
 *         },
 *         {
 *             "username": "user2",
 *             "banner": "https://example.com/banner2.jpg",
 *             "avatar": "https://example.com/avatar2.jpg"
 *         }
 *     ]
 *
 * @apiError (400) BadRequest Invalid request parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (402) Forbidden Not a moderator of the community.
 * @apiError (404) NotFound Community not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Invalid request parameters"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 402 Forbidden
 *     {
 *       "message": "Not a moderator"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Community not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {post} /community/moderation/:communityName/:username/add-contributor Add Contributor to Community
 * @apiVersion 0.1.0
 * @apiName AddContributorToCommunity
 * @apiGroup Moderation
 * @apiDescription Adds a contributor to a community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} communityName Name of the community to add the contributor to.
 * @apiParam {String} username Username of the user to be added as a contributor.
 *
 * @apiSuccess {String} message Success message indicating that the user has been added as a contributor successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "User added as contributor successfully"
 *     }
 *
 * @apiError (400) BadRequest Invalid request parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (402) Forbidden Not a moderator of the community.
 * @apiError (404) NotFound Community or user not found.
 * @apiError (405) MethodNotAllowed User is already a contributor.
 * @apiError (406) NotAcceptable Moderator doesn't have permission.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Invalid request parameters"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 402 Forbidden
 *     {
 *       "message": "Not a moderator"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Community not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 405 Method Not Allowed
 *     {
 *       "message": "User is already a contributor"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 406 Not Acceptable
 *     {
 *       "message": "Moderator doesn't have permission"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

/**
 * @api {post} /community/moderation/:communityName/:username/remove-contributor Remove Contributor from Community
 * @apiVersion 0.1.0
 * @apiName RemoveContributorFromCommunity
 * @apiGroup Moderation
 * @apiDescription Removes a contributor from a community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} communityName Name of the community to remove the contributor from.
 * @apiParam {String} username Username of the user to be removed as a contributor.
 *
 * @apiSuccess {String} message Success message indicating that the user has been removed as a contributor successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "User removed as contributor successfully"
 *     }
 *
 * @apiError (400) BadRequest Invalid request parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (402) Forbidden Not a moderator of the community.
 * @apiError (404) NotFound Community or user not found.
 * @apiError (406) NotAcceptable Moderator doesn't have permission.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Invalid request parameters"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 402 Forbidden
 *     {
 *       "message": "Not a moderator"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Community not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 406 Not Acceptable
 *     {
 *       "message": "Moderator doesn't have permission"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */
/**
 * @api {post} /community/:communityName/edit-info Edit Community Info
 * @apiVersion 0.1.0
 * @apiName EditCommunityInfo
 * @apiGroup Moderation
 * @apiDescription Edits information about a specific community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} communityName Name of the community to edit information for.
 * @apiParam {String} name New name for the community.
 * @apiParam {Boolean} [is18plus] Indicates if the community is for users aged 18 and above.
 * @apiParam {String} [communityType] Type of the community (e.g., public, private).
 * @apiParam {String} [description] New description for the community.
 * @apiParam {String} [fileType] Type of file being uploaded (e.g., image).
 * @apiParam {String} [membersNickname] New nickname for community members.
 * @apiParam {File} [image] New image for the community.
 * @apiParam {File} [communityBanner] New banner image for the community.
 *
 * @apiSuccess {String} message Success message indicating that the community information has been updated successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Community information updated successfully"
 *     }
 *
 * @apiError (400) BadRequest Invalid request parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound Community not found.
 * @apiError (402) DuplicateName Community name is already used.
 * @apiError (406) NotAcceptable Moderator doesn't have permission.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 */

/**
 * @api {get} /community/:communityName/settings Get Community Settings
 * @apiVersion 0.1.0
 * @apiName GetCommunitySettings
 * @apiGroup Moderation
 * @apiDescription Retrieves settings for a specific community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} communityName Name of the community to retrieve settings for.
 *
 * @apiSuccess {Object} settings Settings for the specified community.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "postTypeOptions": "any",
 *         "spoilerEnabled": true,
 *         "multipleImagesPerPostAllowed": true,
 *         "pollsAllowed": true,
 *         "commentSettings": {
 *             "mediaInCommentsAllowed": true
 *         }
 *     }
 *
 * @apiError (400) BadRequest Invalid request parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound Community not found.
 * @apiError (406) NotAcceptable Moderator doesn't have permission.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 */

/**
 * @api {put} /community/:communityName/settings Update Community Settings
 * @apiVersion 0.1.0
 * @apiName UpdateCommunitySettings
 * @apiGroup Moderation
 * @apiDescription Updates settings for a specific community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} communityName Name of the community to update settings for.
 * @apiParam {String} postTypeOptions Options for post types (e.g., any, links only, text posts only).
 * @apiParam {Boolean} spoilerEnabled Indicates if spoilers are enabled.
 * @apiParam {Boolean} multipleImagesPerPostAllowed Indicates if multiple images per post are allowed.
 * @apiParam {Boolean} pollsAllowed Indicates if polls are allowed.
 * @apiParam {Boolean} commentSettings.mediaInCommentsAllowed Indicates if media is allowed in comments.
 *
 * @apiSuccess {String} message Success message indicating that the community settings have been updated successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Community settings updated successfully"
 *     }
 *
 * @apiError (400) BadRequest Invalid request parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound Community not found.
 * @apiError (402) Forbidden Not a moderator.
 * @apiError (406) NotAcceptable Moderator doesn't have permission.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 */

/**
 * @api {get} /community/muted Get Muted Communities
 * @apiVersion 0.1.0
 * @apiName GetMutedCommunities
 * @apiGroup Moderation
 * @apiDescription Retrieves a list of muted communities for the current user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiSuccess {Object[]} mutedCommunities List of muted communities.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *             "name": "Community Name",
 *             "description": "Community Description",
 *             "image": "Community Image URL",
 *             "membersCount": 100,
 *             "communityBanner": "Community Banner URL"
 *         }
 *     ]
 *
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 */
/**
 * @api {get} /community/moderation/:communityName/moderators Get Community Moderators
 * @apiVersion 0.1.0
 * @apiName GetCommunityModerators
 * @apiGroup Moderation
 * @apiDescription Retrieves a list of moderators for a specific community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} communityName Name of the community to retrieve moderators for.
 *
 * @apiSuccess {Object[]} moderators List of moderators for the specified community.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *             "username": "moderator1",
 *             "communityName": "community1"
 *             "manageSettings": true,
 *             "managePostsAndComments": true,
 *             "manageUsers": true,
 *             "isAccepted": true
 *             "moderationDate": "date",
 *             "avatar": "Avatar URL",
 *             "banner": "Banner URL",
 *         },
 *     ]
 *
 * @apiError (400) BadRequest Invalid request parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound Community not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 */

/**
 * @api {get} /community/moderation/:communityName/moderators/editable Get Editable Community Moderators
 * @apiVersion 0.1.0
 * @apiName GetEditableCommunityModerators
 * @apiGroup Moderation
 * @apiDescription Retrieves a list of editable moderators for a specific community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} communityName Name of the community to retrieve editable moderators for.
 *
 * @apiSuccess {Object[]} editableModerators List of editable moderators for the specified community.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *             "username": "moderator1",
 *             "communityName": "community1"
 *             "manageSettings": true,
 *             "managePostsAndComments": true,
 *             "manageUsers": true,
 *             "isAccepted": true
 *             "moderationDate": "date",
 *             "avatar": "Avatar URL",
 *             "banner": "Banner URL",
 *         },
 *     ]
 *
 * @apiError (400) BadRequest Invalid request parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound Community not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 */

/**
 * @api {get} /community/moderation/:communityName/invited-moderators Get Invited Community Moderators
 * @apiVersion 0.1.0
 * @apiName GetInvitedCommunityModerators
 * @apiGroup Moderation
 * @apiDescription Retrieves a list of invited moderators for a specific community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} communityName Name of the community to retrieve invited moderators for.
 *
 * @apiSuccess {Object[]} invitedModerators List of invited moderators for the specified community.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *             "username": "moderator1",
 *             "communityName": "community1"
 *             "manageSettings": true,
 *             "managePostsAndComments": true,
 *             "manageUsers": true,
 *             "isAccepted": true
 *             "moderationDate": "date",
 *             "avatar": "Avatar URL",
 *             "banner": "Banner URL",
 *         },
 *     ]
 *
 * @apiError (400) BadRequest Invalid request parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound Community not found.
 * @apiError (406) NotAcceptable Moderator doesn't have permission.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 */

/**
 * @api {delete} /community/moderation/:communityName/:username/remove-invite Remove Moderator Invite
 * @apiVersion 0.1.0
 * @apiName RemoveModeratorInvite
 * @apiGroup Moderation
 * @apiDescription Removes an invitation for a moderator from a specific community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} communityName Name of the community to remove the moderator invite from.
 * @apiParam {String} username Username of the moderator to remove the invite for.
 *
 * @apiSuccess {String} message Success message indicating that the moderator invite has been removed successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Moderator invite removed successfully"
 *     }
 *
 * @apiError (400) BadRequest Invalid request parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (402) BadRequest No invitation sent for this user
 * @apiError (404) NotFound Community not found.
 * @apiError (406) NotAcceptable Moderator doesn't have permission.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 */
/**
 * @api {get} /community/moderation/:communityName/:username/is-moderator Check if User is Moderator
 * @apiVersion 0.1.0
 * @apiName CheckIfUserIsModerator
 * @apiGroup Moderation
 * @apiDescription Checks if a user is a moderator of a specific community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} communityName Name of the community to check moderator status for.
 * @apiParam {String} username Username of the user to check moderator status for.
 *
 * @apiSuccess {Boolean} isModerator Indicates whether the user is a moderator of the community.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "isModerator": true
 *     }
 *
 * @apiError (400) BadRequest Invalid request parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound Community not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 */

/**
 * @api {get} /community/moderation/:communityName/:username/is-contributor Check if User is Contributor
 * @apiVersion 0.1.0
 * @apiName CheckIfUserIsContributor
 * @apiGroup Moderation
 * @apiDescription Checks if a user is a contributor of a specific community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} communityName Name of the community to check moderator status for.
 * @apiParam {String} username Username of the user to check moderator status for.
 *
 * @apiSuccess {Boolean} isContributor Indicates whether the user is a moderator of the community.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "isContributor": true
 *     }
 *
 * @apiError (400) BadRequest Invalid request parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound Community not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 */
/**
 * @api {get} /community/moderation/:communityName/:username/is-invited Check if User is Invited as Moderator
 * @apiVersion 0.1.0
 * @apiName CheckIfUserIsInvited
 * @apiGroup Moderation
 * @apiDescription Checks if a user is invited as a moderator of a specific community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} communityName Name of the community to check moderator invitation for.
 * @apiParam {String} username Username of the user to check moderator invitation for.
 *
 * @apiSuccess {Boolean} isInvited Indicates whether the user is invited as a moderator of the community.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "isInvited": true
 *     }
 *
 * @apiError (400) BadRequest Invalid request parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound Community not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 */

/**
 * @api {get} /community/moderation/user/:username Get Moderated Communities of User
 * @apiVersion 0.1.0
 * @apiName GetModeratedCommunitiesOfUser
 * @apiGroup Moderation
 * @apiDescription Retrieves a list of communities moderated by a specific user.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} username Username of the user to retrieve moderated communities for.
 *
 * @apiSuccess {Object[]} moderatedCommunities List of moderated communities by the user.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
 *             "is18plus": true,
 *             "name": "community1",
 *             "category": "General",
 *             "communityType": "Public",
 *             "description": "This is community 1",
 *             "image": "https://example.com/community1.jpg",
 *             "membersCount": 100,
 *             "communityBanner": "https://example.com/community1/banner.jpg",
 *             "membersNickname": "Community Members",
 *             "dateCreated": "2024-05-05T00:00:00.000Z"
 *         }
 *     ]
 *
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound User not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 */

/**
 * @api {put} /community/moderation/:communityName/:username/permissions Update Moderator Permissions
 * @apiVersion 0.1.0
 * @apiName UpdateModeratorPermissions
 * @apiGroup Moderation
 * @apiDescription Updates the permissions of a moderator in a specific community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} communityName Name of the community to update moderator permissions for.
 * @apiParam {String} username Username of the moderator to update permissions for.
 * @apiParam {Boolean} managePostsAndComments Indicates whether the moderator can manage posts and comments.
 * @apiParam {Boolean} manageUsers Indicates whether the moderator can manage users.
 * @apiParam {Boolean} manageSettings Indicates whether the moderator can manage community settings.
 * @apiParamExample {json} Request-Body-Example:
 * {
 *   "managePostsAndComments": true,
 *   "manageUsers": false,
 *   "manageSettings": true
 * }
 *
 * @apiSuccess {String} message Success message indicating that the moderator permissions have been updated successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Moderator permissions changed successfully"
 *     }
 *
 * @apiError (400) BadRequest Invalid parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound Community or moderator not found.
 * @apiError (406) NotAcceptable Not authorized to modify permissions.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 */

/**
 * @api {delete} /community/moderation/:communityName/moderators/:username Remove Moderator from Community
 * @apiVersion 0.1.0
 * @apiName RemoveModeratorFromCommunity
 * @apiGroup Moderation
 * @apiDescription Removes a moderator from a specific community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} communityName Name of the community to remove the moderator from.
 * @apiParam {String} username Username of the moderator to remove from the community.
 *
 * @apiSuccess {String} message Success message indicating that the moderator has been removed successfully.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Moderator removed successfully"
 *     }
 *
 * @apiError (400) BadRequest Invalid request parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound Community or moderator not found.
 * @apiError (402) Unacceptable User is not a moderator.
 * @apiError (403) Unacceptable Moderator doesn't have permission.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 */

/**
 * @api {get} /community/:communityName/insights Get Community Insights
 * @apiVersion 0.1.0
 * @apiName GetCommunityInsights
 * @apiGroup Moderation
 * @apiDescription Retrieves insights data for a specific community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} communityName Name of the community to retrieve insights for.
 *
 * @apiSuccess {Object} insights Object containing insights data for the community.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "monthlyInsights": {
 *           "month": date,
 *           "newMembers": 10,
 *           "leavingMembers": 50,
 *           "views": 100
 *       },
 *       "last7DaysInsights": {
 *           "month": date,
 *           "newMembers": 2,
 *           "leavingMembers": 10,
 *           "views": 20
 *       }
 *     }
 *
 * @apiError (400) BadRequest Invalid request parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound Community not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 */
/**
 * @api {get} /community/moderation/:communityName/permissions/:username Get Moderator Permissions
 * @apiVersion 0.1.0
 * @apiName GetModeratorPermissions
 * @apiGroup Moderation
 * @apiDescription Retrieves the permissions of a moderator in a community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} communityName Name of the community.
 * @apiParam {String} username Username of the moderator.
 *
 * @apiSuccess {Boolean} managePostsAndComments Ability to manage posts and comments.
 * @apiSuccess {Boolean} manageUsers Ability to manage users.
 * @apiSuccess {Boolean} manageSettings Ability to manage community settings.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "managePostsAndComments": true,
 *       "manageUsers": false,
 *       "manageSettings": true
 *     }
 *
 * @apiError (404) NotFound Community or user not found.
 * @apiError (403) Forbidden This user is not a moderator.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Community not found"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "message": "This user is not a moderator"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "Internal server error"
 *     }
 */

//#endregion
