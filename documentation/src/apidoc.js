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
 * @apiParamExample {json} Request-Example:
 * {
 *      "email": "amiraelgarf99@gmail.com",
 *      "username": "amira123"
 *      "password": "myPassw@ord123",
 * }
 * @apiSuccess {user-object} user user of the sign up operation
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *      "user" : {user-object},
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
 * @apiHeader {String} Authorization Google OAuth token in the format "Bearer <token>"
 * 
 * @apiParam {Boolean} [remember_me=false] Optional. Set to true to remember the logged-in user.
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *    "Authorization": "Bearer <Google_OAuth_Token>",
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
 *           "id": "607f1f77bcf86cd799439011",
 *           "name": "Amira El-Garf",
 *           "username": "amiraelgarf123",
 *           "email": "amiraelgarf99@gmail.com",
 *           "googleId": "google_user_id",
 *           "birth_date": "1990-01-01",
 *           "phone": "123456789",
 *           "avatar_url": "https://example.com/avatar.jpg",
 *           "background_picture_url": "https://example.com/background.jpg",
 *           "location": "City, Country",
 *           "bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
 *           "followers_count": 100,
 *           "following_count": 50,
 *           "created_at": "2024-04-08T12:00:00Z",
 *           "role": "User",
 *           "nsfw": false,
 *           "activeInCommunityVisibility": true,
 *           "isVerified": true,
 *           "displayName": "Amiraelgarf123",
 *           "about": "Some information about the user",
 *           "cakeDay": "2022-04-08T12:00:00Z",
 *           "subscribedCommunities": ["community1", "community2"]
 *       },
 *       "token_expiration_date": "2024-04-08T12:00:00Z",
 *       "message": "User logged in successfully"
 *     }
 * 
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
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
 *    "resetToken": "valid_reset_token",
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
 * @api {get} /user-info Get User Information
 * @apiVersion 0.1.0
 * @apiName GetUserInfo
 * @apiGroup User
 * @apiDescription Retrieves basic information about the logged-in user.
 * @apiSampleRequest off
 * 
 * @apiHeader {String} token User authentication token.
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
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Email verified successfully"
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
 * @apiGroup Post
 * @apiDescription Adds a comment to a post.
 * @apiSampleRequest off
 * 
 * @apiHeader {String} Authorization User's authentication token.
 * 
 * @apiParam {String} postId ID of the post to which the comment will be added.
 * @apiParam {String} content Content of the comment.
 * @apiParam {String} fileType Type of file attached to the comment (optional).
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
 * @apiSuccess {String} comment.user.background_picture_url URL of the user's background picture.
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
 *               "followers_count": 100,
 *               "following_count": 50,
 *               "created_at": "2022-01-01T12:00:00.000Z",
 *               "role": "User",
 *               "nsfw": false,
 *               "isVerified": true,
 *               "displayName": "Amiraelgarf123",
 *               "about": "Lorem ipsum dolor sit amet",
 *               "cakeDay": "2020-01-01",
 *               "subscribedCommunities": ["community1", "community2"]
 *           },
 *           "likes_count": 10,
 *           "replies_count": 5,
 *           "is_reply": false,
 *           "media": [
 *               { "type": "image", "link": "https://example.com/attachment1.jpg" },
 *               { "type": "image", "link": "https://example.com/attachment2.mp4" }
 *           ], 
 *           "created_at": "2022-05-14T12:00:00.000Z",
 *           "is_hidden": false,
 *           "is_saved": false,
 *           "post_title": "Sample Post Title",
 *           "community_title": "Sample Community"
 *       },
 *       "message": "Comment has been added successfully"
 *     }
 * 
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound Post not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Comment content is required"
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
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "comment": {
 *           "_id": "609d0f23c8b58f001d54ee1f",
 *           "content": "This is a comment on the post",
 *           "userId": "609cfff1c8b58f001d54ee1e",
 *           "postId": "609cfeefc8b58f001d54ee1d",
 *           "attachments": ["https://example.com/attachment1.jpg", "https://example.com/attachment2.mp4"],
 *           "createdAt": "2022-05-14T12:00:00.000Z",
 *           "updatedAt": "2022-05-14T12:00:00.000Z"
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
 *               "followers_count": 100,
 *               "following_count": 50,
 *               "created_at": "2022-01-01T12:00:00.000Z",
 *               "role": "User",
 *               "nsfw": false,
 *               "isVerified": true,
 *               "displayName": "Amiraelgarf123",
 *               "about": "Lorem ipsum dolor sit amet",
 *               "cakeDay": "2020-01-01",
 *               "subscribedCommunities": ["community1", "community2"]
 *           },
 *           "likes_count": 10,
 *           "replies_count": 5,
 *           "is_reply": false,
 *           "media": [
 *               { "type": "image", "link": "https://example.com/attachment1.jpg" },
 *               { "type": "image", "link": "https://example.com/attachment2.mp4" }
 *           ], 
 *           "created_at": "2022-05-14T12:00:00.000Z",
 *           "is_hidden": false,
 *           "is_saved": false,
 *           "post_title": "Sample Post Title",
 *           "community_title": "Sample Community"
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
 *               "followers_count": 100,
 *               "following_count": 50,
 *               "created_at": "2022-01-01T12:00:00.000Z",
 *               "role": "User",
 *               "nsfw": false,
 *               "isVerified": true,
 *               "displayName": "Amiraelgarf123",
 *               "about": "Lorem ipsum dolor sit amet",
 *               "cakeDay": "2020-01-01",
 *               "subscribedCommunities": ["community1", "community2"]
 *           },
 *           "likes_count": 10,
 *           "replies_count": 5,
 *           "is_reply": false,
 *           "media": [
 *               { "type": "image", "link": "https://example.com/attachment1.jpg" },
 *               { "type": "image", "link": "https://example.com/attachment2.mp4" }
 *           ], 
 *           "created_at": "2022-05-14T12:00:00.000Z",
 *           "is_hidden": false,
 *           "is_saved": false,
 *           "post_title": "Sample Post Title",
 *           "community_title": "Sample Community"
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
 *               "followers_count": 100,
 *               "following_count": 50,
 *               "created_at": "2022-01-01T12:00:00.000Z",
 *               "role": "User",
 *               "nsfw": false,
 *               "isVerified": true,
 *               "displayName": "Amiraelgarf123",
 *               "about": "Lorem ipsum dolor sit amet",
 *               "cakeDay": "2020-01-01",
 *               "subscribedCommunities": ["community1", "community2"]
 *           },
 *           "likes_count": 10,
 *           "replies_count": 5,
 *           "is_reply": false,
 *           "media": [
 *               { "type": "image", "link": "https://example.com/attachment1.jpg" },
 *               { "type": "image", "link": "https://example.com/attachment2.mp4" }
 *           ], 
 *           "created_at": "2022-05-14T12:00:00.000Z",
 *           "is_hidden": false,
 *           "is_saved": false,
 *           "post_title": "Sample Post Title",
 *           "community_title": "Sample Community"
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
 * @apiDescription Adds a reply to a comment.
 * @apiSampleRequest off
 * 
 * @apiHeader {String} Authorization User's authentication token.
 * 
 * @apiParam {String} parentCommentId ID of the parent comment to which the reply will be added.
 * @apiParam {String} content Content of the reply.
 * @apiParam {String} fileType Type of file attached to the reply (optional).
 * @apiParam {File[]} [attachments] Array of media files attached to the reply (optional).
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *    "content": "This is a reply to the comment",
 *    "fileType": "image",
 *    "attachments": ["attachment1.jpg", "attachment2.mp4"]
 * }
 * 
 * @apiSuccess {String} message Success message indicating that the reply has been added successfully.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "message": "Reply has been added successfully"
 *     }
 * 
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound Comment not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "message": "Reply content is required"
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
 *               "followers_count": 100,
 *               "following_count": 50,
 *               "created_at": "2022-01-01T12:00:00.000Z",
 *               "role": "User",
 *               "nsfw": false,
 *               "isVerified": true,
 *               "displayName": "Amiraelgarf123",
 *               "about": "Lorem ipsum dolor sit amet",
 *               "cakeDay": "2020-01-01",
 *               "subscribedCommunities": ["community1", "community2"]
 *           },
 *           "likes_count": 10,
 *           "replies_count": 5,
 *           "is_reply": false,
 *           "media": [
 *               { "type": "image", "link": "https://example.com/attachment1.jpg" },
 *               { "type": "image", "link": "https://example.com/attachment2.mp4" }
 *           ], 
 *           "created_at": "2022-05-14T12:00:00.000Z",
 *           "is_hidden": false,
 *           "is_saved": false,
 *           "post_title": "Sample Post Title",
 *           "community_title": "Sample Community"
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
 * @apiParam {String} sureason Specific reason for reporting the comment.
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



