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
 * @api {get} /reset-password/user-info Get User Information to reset password
 * @apiVersion 0.1.0
 * @apiName GetUserInfoToResetPassword
 * @apiGroup User
 * @apiDescription Retrieves basic information about the logged-in user so that he resets his password
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
 * @apiSuccess {Boolean} comment.is_upvoted if the comment is upvoted by the user
 * @apiSuccess {Boolean} comment.is_downvoted if the comment is upvoted by the user
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
 *               { "type": "image", "link": "https://example.com/attachment2.jpg" }
 *           ],
 *           "created_at": "2022-05-14T12:00:00.000Z",
 *           "is_hidden": false,
 *           "is_saved": false,
 *           "post_title": "Sample Post Title",
 *           "community_title": "Sample Community",
 *           "is_upvoted": true,
 *           "is_downvoted": false,
 *           "replies": []
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
 * @apiSuccess {Boolean} comment.is_upvoted if the comment is upvoted by the user
 * @apiSuccess {Boolean} comment.is_downvoted if the comment is upvoted by the user
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
 * @apiSuccess {Boolean} comment.is_upvoted if the comment is upvoted by the user
 * @apiSuccess {Boolean} comment.is_downvoted if the comment is upvoted by the user
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
 *               { "type": "image", "link": "https://example.com/attachment2.jpg" }
 *           ],
 *           "created_at": "2022-05-14T12:00:00.000Z",
 *           "is_hidden": false,
 *           "is_saved": false,
 *           "post_title": "Sample Post Title",
 *           "community_title": "Sample Community",
 *           "is_upvoted": true,
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
 * @apiSuccess {Boolean} comment.is_upvoted if the comment is upvoted by the user
 * @apiSuccess {Boolean} comment.is_downvoted if the comment is upvoted by the user
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
 *               { "type": "image", "link": "https://example.com/attachment2.jpg" }
 *           ],
 *           "created_at": "2022-05-14T12:00:00.000Z",
 *           "is_hidden": false,
 *           "is_saved": false,
 *           "post_title": "Sample Post Title",
 *           "community_title": "Sample Community",
 *           "is_upvoted": true,
 *           "is_downvoted": false,
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
 * @apiSuccess {Boolean} comment.is_upvoted if the comment is upvoted by the user
 * @apiSuccess {Boolean} comment.is_downvoted if the comment is upvoted by the user
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
 *               { "type": "image", "link": "https://example.com/attachment2.jpg" }
 *           ],
 *           "created_at": "2022-05-14T12:00:00.000Z",
 *           "is_hidden": false,
 *           "is_saved": false,
 *           "post_title": "Sample Post Title",
 *           "community_title": "Sample Community",
 *           "is_upvoted": true,
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
 * @apiSuccess {String} reply.user.background_picture_url URL of the user's background picture.
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
 *           "is_downvoted": false,
 *           "replies": []
 *       },
 *       "message": "Reply has been added successfully"
 *     }
 *
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (404) NotFound Parent comment not found.
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
 *               { "type": "image", "link": "https://example.com/attachment2.jpg" }
 *           ],
 *           "created_at": "2022-05-14T12:00:00.000Z",
 *           "is_hidden": false,
 *           "is_saved": false,
 *           "post_title": "Sample Post Title",
 *           "community_title": "Sample Community",
 *           "is_upvoted": true,
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

//#region Rules

/**
 * @api {post} /rule/add Add Rule to Community
 * @apiVersion 0.1.0
 * @apiName AddRuleToCommunity
 * @apiGroup Rules
 * @apiDescription Adds a rule to a community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} title Title of the rule.
 * @apiParam {String} description Description of the rule (optional).
 * @apiParam {String} reportReason Reason for reporting the rule (optional).
 * @apiParam {String} communityName Name of the community to which the rule will be added.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "title": "No hate speech",
 *    "description": "This community does not tolerate hate speech.",
 *    "communityName": "Sample Community"
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
 * @apiError (402) Forbidden User is not a moderator.
 * @apiError (403) UsedTitle Title already used.
 * @apiError (404) NotFound Community not found.
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
 * @api {post} /rule/remove Remove Rule from Community
 * @apiVersion 0.1.0
 * @apiName RemoveRuleFromCommunity
 * @apiGroup Rules
 * @apiDescription Removes a rule from a community.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} communityName Name of the community from which the rule will be removed.
 * @apiParam {String} title Title of the rule to be removed.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "communityName": "Sample Community",
 *    "title": "No hate speech"
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
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (402) Forbidden User is not a moderator of the community.
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
//#endregion Rules

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
 * @api {get} /community/get-info Get Community Information
 * @apiVersion 0.1.0
 * @apiName GetCommunityInformation
 * @apiGroup Community
 * @apiDescription Retrieves information about a specific community.
 * @apiSampleRequest off
 *
 * @apiParam {String} communityName Name of the community to retrieve information.
 *
 * @apiSuccess {Object} community Information about the specified community.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "name": "Sample Community",
 *       "category": "Sample Category",
 *       "communityType": "Public",
 *       "description": "Sample description",
 *       "image": "community_image.jpg",
 *       "membersCount": 1000,
 *       "rules": [
 *         {
 *           "title": "Rule 1",
 *           "description": "Description of rule 1",
 *           "reportReason": "Reason for reporting rule 1"
 *         },
 *         {
 *           "title": "Rule 2",
 *           "description": "Description of rule 2",
 *           "reportReason": "Reason for reporting rule 2"
 *         }
 *       ],
 *       "dateCreated": "2024-01-01T00:00:00.000Z",
 *       "communityBanner": "community_banner.jpg"
 *     }
 *
 * @apiError (400) BadRequest Missing or invalid parameters.
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
 *       "socialLinks": {
 *         "facebook": "https://www.facebook.com/sample_user",
 *         "twitter": "https://www.twitter.com/sample_user"
 *       }
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
 * @apiParam {String} [avatar] URL of the user's avatar.
 * @apiParam {String} [banner] URL of the user's banner image.
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
 *    "socialLinks": {
 *        "facebook": "https://www.facebook.com/updated_user",
 *        "twitter": "https://www.twitter.com/updated_user"
 *    },
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
            "_id": "661b361e41fcced1c04cf20b",
            "userId": "624a52d75ff69df002d25035",
            "username": "mahmoudabbas",
            "userProfilePic": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
            "upVotes": [],
            "downVotes": [],
            "votesUpCount": 0,
            "votesDownCount": 0,
            "sharesCount": 0,
            "commentsCount": 0,
            "numberOfViews": 40,
            "title": "jkjkjkjkjkj",
            "content": [
                ""
            ],
            "community": "Gaming",
            "type": "Link",
            "pollOptions": [],
            "pollExpiration": null,
            "isPollEnabled": false,
            "pollVotingLength": "3 Days",
            "votedUsers": [],
            "link": "https://help.liferay.com/hc/en-us/articles/360018180231-Rendering-Web-Content-in-Your-Android-App",
            "attachments": [],
            "isSpoiler": false,
            "isNsfw": false,
            "sendPostReplyNotification": true,
            "isCommentsLocked": false,
            "isSaved": false,
            "hiddenBy": [],
            "comments": [],
            "date": "2024-04-14T01:49:18.789Z",
            "createdAt": "2024-04-14T01:49:18.789Z",
            "updatedAt": "2024-04-14T19:02:13.078Z",
            "__v": 0
        },
        {
            "_id": "661b361e41fcced1c04cf1f4",
            "userId": "624a52d75ff69df002d25035",
            "username": "mahmoudabbas",
            "userProfilePic": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
            "upVotes": [],
            "downVotes": [],
            "votesUpCount": 0,
            "votesDownCount": 0,
            "sharesCount": 0,
            "commentsCount": 0,
            "numberOfViews": 39,
            "title": "jkjkjkjkjkj",
            "content": [
                ""
            ],
            "community": "Gaming",
            "type": "Link",
            "pollOptions": [],
            "pollExpiration": null,
            "isPollEnabled": false,
            "pollVotingLength": "3 Days",
            "votedUsers": [],
            "link": "https://help.liferay.com/hc/en-us/articles/360018180231-Rendering-Web-Content-in-Your-Android-App",
            "attachments": [],
            "isSpoiler": false,
            "isNsfw": false,
            "sendPostReplyNotification": true,
            "isCommentsLocked": false,
            "isSaved": false,
            "hiddenBy": [],
            "comments": [],
            "date": "2024-04-14T01:49:18.625Z",
            "createdAt": "2024-04-14T01:49:18.625Z",
            "updatedAt": "2024-04-14T04:07:09.555Z",
            "__v": 0
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
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *          {
            "_id": "661b361e41fcced1c04cf20b",
            "userId": "624a52d75ff69df002d25035",
            "username": "mahmoudabbas",
            "userProfilePic": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
            "upVotes": [],
            "downVotes": [],
            "votesUpCount": 0,
            "votesDownCount": 0,
            "sharesCount": 0,
            "commentsCount": 0,
            "numberOfViews": 40,
            "title": "jkjkjkjkjkj",
            "content": [
                ""
            ],
            "community": "Gaming",
            "type": "Link",
            "pollOptions": [],
            "pollExpiration": null,
            "isPollEnabled": false,
            "pollVotingLength": "3 Days",
            "votedUsers": [],
            "link": "https://help.liferay.com/hc/en-us/articles/360018180231-Rendering-Web-Content-in-Your-Android-App",
            "attachments": [],
            "isSpoiler": false,
            "isNsfw": false,
            "sendPostReplyNotification": true,
            "isCommentsLocked": false,
            "isSaved": false,
            "hiddenBy": [],
            "comments": [],
            "date": "2024-04-14T01:49:18.789Z",
            "createdAt": "2024-04-14T01:49:18.789Z",
            "updatedAt": "2024-04-14T19:02:13.078Z",
            "__v": 0
        },
        {
            "_id": "661b361e41fcced1c04cf1f4",
            "userId": "624a52d75ff69df002d25035",
            "username": "mahmoudabbas",
            "userProfilePic": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
            "upVotes": [],
            "downVotes": [],
            "votesUpCount": 0,
            "votesDownCount": 0,
            "sharesCount": 0,
            "commentsCount": 0,
            "numberOfViews": 39,
            "title": "jkjkjkjkjkj",
            "content": [
                ""
            ],
            "community": "Gaming",
            "type": "Link",
            "pollOptions": [],
            "pollExpiration": null,
            "isPollEnabled": false,
            "pollVotingLength": "3 Days",
            "votedUsers": [],
            "link": "https://help.liferay.com/hc/en-us/articles/360018180231-Rendering-Web-Content-in-Your-Android-App",
            "attachments": [],
            "isSpoiler": false,
            "isNsfw": false,
            "sendPostReplyNotification": true,
            "isCommentsLocked": false,
            "isSaved": false,
            "hiddenBy": [],
            "comments": [],
            "date": "2024-04-14T01:49:18.625Z",
            "createdAt": "2024-04-14T01:49:18.625Z",
            "updatedAt": "2024-04-14T04:07:09.555Z",
            "__v": 0
        },
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
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *          {
            "_id": "661b361e41fcced1c04cf20b",
            "userId": "624a52d75ff69df002d25035",
            "username": "mahmoudabbas",
            "userProfilePic": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
            "upVotes": [],
            "downVotes": [],
            "votesUpCount": 0,
            "votesDownCount": 0,
            "sharesCount": 0,
            "commentsCount": 0,
            "numberOfViews": 40,
            "title": "jkjkjkjkjkj",
            "content": [
                ""
            ],
            "community": "Gaming",
            "type": "Link",
            "pollOptions": [],
            "pollExpiration": null,
            "isPollEnabled": false,
            "pollVotingLength": "3 Days",
            "votedUsers": [],
            "link": "https://help.liferay.com/hc/en-us/articles/360018180231-Rendering-Web-Content-in-Your-Android-App",
            "attachments": [],
            "isSpoiler": false,
            "isNsfw": false,
            "sendPostReplyNotification": true,
            "isCommentsLocked": false,
            "isSaved": false,
            "hiddenBy": [],
            "comments": [],
            "date": "2024-04-14T01:49:18.789Z",
            "createdAt": "2024-04-14T01:49:18.789Z",
            "updatedAt": "2024-04-14T19:02:13.078Z",
            "__v": 0
        },
        {
            "_id": "661b361e41fcced1c04cf1f4",
            "userId": "624a52d75ff69df002d25035",
            "username": "mahmoudabbas",
            "userProfilePic": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
            "upVotes": [],
            "downVotes": [],
            "votesUpCount": 0,
            "votesDownCount": 0,
            "sharesCount": 0,
            "commentsCount": 0,
            "numberOfViews": 39,
            "title": "jkjkjkjkjkj",
            "content": [
                ""
            ],
            "community": "Gaming",
            "type": "Link",
            "pollOptions": [],
            "pollExpiration": null,
            "isPollEnabled": false,
            "pollVotingLength": "3 Days",
            "votedUsers": [],
            "link": "https://help.liferay.com/hc/en-us/articles/360018180231-Rendering-Web-Content-in-Your-Android-App",
            "attachments": [],
            "isSpoiler": false,
            "isNsfw": false,
            "sendPostReplyNotification": true,
            "isCommentsLocked": false,
            "isSaved": false,
            "hiddenBy": [],
            "comments": [],
            "date": "2024-04-14T01:49:18.625Z",
            "createdAt": "2024-04-14T01:49:18.625Z",
            "updatedAt": "2024-04-14T04:07:09.555Z",
            "__v": 0
        },
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
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *          {
            "_id": "661b361e41fcced1c04cf20b",
            "userId": "624a52d75ff69df002d25035",
            "username": "mahmoudabbas",
            "userProfilePic": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
            "upVotes": [],
            "downVotes": [],
            "votesUpCount": 0,
            "votesDownCount": 0,
            "sharesCount": 0,
            "commentsCount": 0,
            "numberOfViews": 40,
            "title": "jkjkjkjkjkj",
            "content": [
                ""
            ],
            "community": "Gaming",
            "type": "Link",
            "pollOptions": [],
            "pollExpiration": null,
            "isPollEnabled": false,
            "pollVotingLength": "3 Days",
            "votedUsers": [],
            "link": "https://help.liferay.com/hc/en-us/articles/360018180231-Rendering-Web-Content-in-Your-Android-App",
            "attachments": [],
            "isSpoiler": false,
            "isNsfw": false,
            "sendPostReplyNotification": true,
            "isCommentsLocked": false,
            "isSaved": false,
            "hiddenBy": [],
            "comments": [],
            "date": "2024-04-14T01:49:18.789Z",
            "createdAt": "2024-04-14T01:49:18.789Z",
            "updatedAt": "2024-04-14T19:02:13.078Z",
            "__v": 0
        },
        {
            "_id": "661b361e41fcced1c04cf1f4",
            "userId": "624a52d75ff69df002d25035",
            "username": "mahmoudabbas",
            "userProfilePic": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
            "upVotes": [],
            "downVotes": [],
            "votesUpCount": 0,
            "votesDownCount": 0,
            "sharesCount": 0,
            "commentsCount": 0,
            "numberOfViews": 39,
            "title": "jkjkjkjkjkj",
            "content": [
                ""
            ],
            "community": "Gaming",
            "type": "Link",
            "pollOptions": [],
            "pollExpiration": null,
            "isPollEnabled": false,
            "pollVotingLength": "3 Days",
            "votedUsers": [],
            "link": "https://help.liferay.com/hc/en-us/articles/360018180231-Rendering-Web-Content-in-Your-Android-App",
            "attachments": [],
            "isSpoiler": false,
            "isNsfw": false,
            "sendPostReplyNotification": true,
            "isCommentsLocked": false,
            "isSaved": false,
            "hiddenBy": [],
            "comments": [],
            "date": "2024-04-14T01:49:18.625Z",
            "createdAt": "2024-04-14T01:49:18.625Z",
            "updatedAt": "2024-04-14T04:07:09.555Z",
            "__v": 0
        },
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
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *          {
            "_id": "661b361e41fcced1c04cf20b",
            "userId": "624a52d75ff69df002d25035",
            "username": "mahmoudabbas",
            "userProfilePic": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
            "upVotes": [],
            "downVotes": [],
            "votesUpCount": 0,
            "votesDownCount": 0,
            "sharesCount": 0,
            "commentsCount": 0,
            "numberOfViews": 40,
            "title": "jkjkjkjkjkj",
            "content": [
                ""
            ],
            "community": "Gaming",
            "type": "Link",
            "pollOptions": [],
            "pollExpiration": null,
            "isPollEnabled": false,
            "pollVotingLength": "3 Days",
            "votedUsers": [],
            "link": "https://help.liferay.com/hc/en-us/articles/360018180231-Rendering-Web-Content-in-Your-Android-App",
            "attachments": [],
            "isSpoiler": false,
            "isNsfw": false,
            "sendPostReplyNotification": true,
            "isCommentsLocked": false,
            "isSaved": false,
            "hiddenBy": [],
            "comments": [],
            "date": "2024-04-14T01:49:18.789Z",
            "createdAt": "2024-04-14T01:49:18.789Z",
            "updatedAt": "2024-04-14T19:02:13.078Z",
            "__v": 0
        },
        {
            "_id": "661b361e41fcced1c04cf1f4",
            "userId": "624a52d75ff69df002d25035",
            "username": "mahmoudabbas",
            "userProfilePic": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
            "upVotes": [],
            "downVotes": [],
            "votesUpCount": 0,
            "votesDownCount": 0,
            "sharesCount": 0,
            "commentsCount": 0,
            "numberOfViews": 39,
            "title": "jkjkjkjkjkj",
            "content": [
                ""
            ],
            "community": "Gaming",
            "type": "Link",
            "pollOptions": [],
            "pollExpiration": null,
            "isPollEnabled": false,
            "pollVotingLength": "3 Days",
            "votedUsers": [],
            "link": "https://help.liferay.com/hc/en-us/articles/360018180231-Rendering-Web-Content-in-Your-Android-App",
            "attachments": [],
            "isSpoiler": false,
            "isNsfw": false,
            "sendPostReplyNotification": true,
            "isCommentsLocked": false,
            "isSaved": false,
            "hiddenBy": [],
            "comments": [],
            "date": "2024-04-14T01:49:18.625Z",
            "createdAt": "2024-04-14T01:49:18.625Z",
            "updatedAt": "2024-04-14T04:07:09.555Z",
            "__v": 0
        },
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
 * @api {get} /home/views Sort Posts by Views
 * @apiVersion 0.1.0
 * @apiName SortPostsViews
 * @apiGroup Post
 * @apiDescription Retrieves posts sorted by number of views.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiSuccess {Object[]} posts List of posts sorted by number of views.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *          {
            "_id": "661b361e41fcced1c04cf20b",
            "userId": "624a52d75ff69df002d25035",
            "username": "mahmoudabbas",
            "userProfilePic": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
            "upVotes": [],
            "downVotes": [],
            "votesUpCount": 0,
            "votesDownCount": 0,
            "sharesCount": 0,
            "commentsCount": 0,
            "numberOfViews": 40,
            "title": "jkjkjkjkjkj",
            "content": [
                ""
            ],
            "community": "Gaming",
            "type": "Link",
            "pollOptions": [],
            "pollExpiration": null,
            "isPollEnabled": false,
            "pollVotingLength": "3 Days",
            "votedUsers": [],
            "link": "https://help.liferay.com/hc/en-us/articles/360018180231-Rendering-Web-Content-in-Your-Android-App",
            "attachments": [],
            "isSpoiler": false,
            "isNsfw": false,
            "sendPostReplyNotification": true,
            "isCommentsLocked": false,
            "isSaved": false,
            "hiddenBy": [],
            "comments": [],
            "date": "2024-04-14T01:49:18.789Z",
            "createdAt": "2024-04-14T01:49:18.789Z",
            "updatedAt": "2024-04-14T19:02:13.078Z",
            "__v": 0
        },
        {
            "_id": "661b361e41fcced1c04cf1f4",
            "userId": "624a52d75ff69df002d25035",
            "username": "mahmoudabbas",
            "userProfilePic": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
            "upVotes": [],
            "downVotes": [],
            "votesUpCount": 0,
            "votesDownCount": 0,
            "sharesCount": 0,
            "commentsCount": 0,
            "numberOfViews": 39,
            "title": "jkjkjkjkjkj",
            "content": [
                ""
            ],
            "community": "Gaming",
            "type": "Link",
            "pollOptions": [],
            "pollExpiration": null,
            "isPollEnabled": false,
            "pollVotingLength": "3 Days",
            "votedUsers": [],
            "link": "https://help.liferay.com/hc/en-us/articles/360018180231-Rendering-Web-Content-in-Your-Android-App",
            "attachments": [],
            "isSpoiler": false,
            "isNsfw": false,
            "sendPostReplyNotification": true,
            "isCommentsLocked": false,
            "isSaved": false,
            "hiddenBy": [],
            "comments": [],
            "date": "2024-04-14T01:49:18.625Z",
            "createdAt": "2024-04-14T01:49:18.625Z",
            "updatedAt": "2024-04-14T04:07:09.555Z",
            "__v": 0
        },
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
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *          {
            "_id": "661b361e41fcced1c04cf20b",
            "userId": "624a52d75ff69df002d25035",
            "username": "mahmoudabbas",
            "userProfilePic": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
            "upVotes": [],
            "downVotes": [],
            "votesUpCount": 0,
            "votesDownCount": 0,
            "sharesCount": 0,
            "commentsCount": 0,
            "numberOfViews": 40,
            "title": "jkjkjkjkjkj",
            "content": [
                ""
            ],
            "community": "Gaming",
            "type": "Link",
            "pollOptions": [],
            "pollExpiration": null,
            "isPollEnabled": false,
            "pollVotingLength": "3 Days",
            "votedUsers": [],
            "link": "https://help.liferay.com/hc/en-us/articles/360018180231-Rendering-Web-Content-in-Your-Android-App",
            "attachments": [],
            "isSpoiler": false,
            "isNsfw": false,
            "sendPostReplyNotification": true,
            "isCommentsLocked": false,
            "isSaved": false,
            "hiddenBy": [],
            "comments": [],
            "date": "2024-04-14T01:49:18.789Z",
            "createdAt": "2024-04-14T01:49:18.789Z",
            "updatedAt": "2024-04-14T19:02:13.078Z",
            "__v": 0
        },
        {
            "_id": "661b361e41fcced1c04cf1f4",
            "userId": "624a52d75ff69df002d25035",
            "username": "mahmoudabbas",
            "userProfilePic": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
            "upVotes": [],
            "downVotes": [],
            "votesUpCount": 0,
            "votesDownCount": 0,
            "sharesCount": 0,
            "commentsCount": 0,
            "numberOfViews": 39,
            "title": "jkjkjkjkjkj",
            "content": [
                ""
            ],
            "community": "Gaming",
            "type": "Link",
            "pollOptions": [],
            "pollExpiration": null,
            "isPollEnabled": false,
            "pollVotingLength": "3 Days",
            "votedUsers": [],
            "link": "https://help.liferay.com/hc/en-us/articles/360018180231-Rendering-Web-Content-in-Your-Android-App",
            "attachments": [],
            "isSpoiler": false,
            "isNsfw": false,
            "sendPostReplyNotification": true,
            "isCommentsLocked": false,
            "isSaved": false,
            "hiddenBy": [],
            "comments": [],
            "date": "2024-04-14T01:49:18.625Z",
            "createdAt": "2024-04-14T01:49:18.625Z",
            "updatedAt": "2024-04-14T04:07:09.555Z",
            "__v": 0
        },
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
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *          {
            "_id": "661b361e41fcced1c04cf20b",
            "userId": "624a52d75ff69df002d25035",
            "username": "mahmoudabbas",
            "userProfilePic": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
            "upVotes": [],
            "downVotes": [],
            "votesUpCount": 0,
            "votesDownCount": 0,
            "sharesCount": 0,
            "commentsCount": 0,
            "numberOfViews": 40,
            "title": "jkjkjkjkjkj",
            "content": [
                ""
            ],
            "community": "Gaming",
            "type": "Link",
            "pollOptions": [],
            "pollExpiration": null,
            "isPollEnabled": false,
            "pollVotingLength": "3 Days",
            "votedUsers": [],
            "link": "https://help.liferay.com/hc/en-us/articles/360018180231-Rendering-Web-Content-in-Your-Android-App",
            "attachments": [],
            "isSpoiler": false,
            "isNsfw": false,
            "sendPostReplyNotification": true,
            "isCommentsLocked": false,
            "isSaved": false,
            "hiddenBy": [],
            "comments": [],
            "date": "2024-04-14T01:49:18.789Z",
            "createdAt": "2024-04-14T01:49:18.789Z",
            "updatedAt": "2024-04-14T19:02:13.078Z",
            "__v": 0
        },
        {
            "_id": "661b361e41fcced1c04cf1f4",
            "userId": "624a52d75ff69df002d25035",
            "username": "mahmoudabbas",
            "userProfilePic": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
            "upVotes": [],
            "downVotes": [],
            "votesUpCount": 0,
            "votesDownCount": 0,
            "sharesCount": 0,
            "commentsCount": 0,
            "numberOfViews": 39,
            "title": "jkjkjkjkjkj",
            "content": [
                ""
            ],
            "community": "Gaming",
            "type": "Link",
            "pollOptions": [],
            "pollExpiration": null,
            "isPollEnabled": false,
            "pollVotingLength": "3 Days",
            "votedUsers": [],
            "link": "https://help.liferay.com/hc/en-us/articles/360018180231-Rendering-Web-Content-in-Your-Android-App",
            "attachments": [],
            "isSpoiler": false,
            "isNsfw": false,
            "sendPostReplyNotification": true,
            "isCommentsLocked": false,
            "isSaved": false,
            "hiddenBy": [],
            "comments": [],
            "date": "2024-04-14T01:49:18.625Z",
            "createdAt": "2024-04-14T01:49:18.625Z",
            "updatedAt": "2024-04-14T04:07:09.555Z",
            "__v": 0
        },
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
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *          {
            "_id": "661b361e41fcced1c04cf20b",
            "userId": "624a52d75ff69df002d25035",
            "username": "mahmoudabbas",
            "userProfilePic": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
            "upVotes": [],
            "downVotes": [],
            "votesUpCount": 0,
            "votesDownCount": 0,
            "sharesCount": 0,
            "commentsCount": 0,
            "numberOfViews": 40,
            "title": "jkjkjkjkjkj",
            "content": [
                ""
            ],
            "community": "Gaming",
            "type": "Link",
            "pollOptions": [],
            "pollExpiration": null,
            "isPollEnabled": false,
            "pollVotingLength": "3 Days",
            "votedUsers": [],
            "link": "https://help.liferay.com/hc/en-us/articles/360018180231-Rendering-Web-Content-in-Your-Android-App",
            "attachments": [],
            "isSpoiler": false,
            "isNsfw": false,
            "sendPostReplyNotification": true,
            "isCommentsLocked": false,
            "isSaved": false,
            "hiddenBy": [],
            "comments": [],
            "date": "2024-04-14T01:49:18.789Z",
            "createdAt": "2024-04-14T01:49:18.789Z",
            "updatedAt": "2024-04-14T19:02:13.078Z",
            "__v": 0
        },
        {
            "_id": "661b361e41fcced1c04cf1f4",
            "userId": "624a52d75ff69df002d25035",
            "username": "mahmoudabbas",
            "userProfilePic": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
            "upVotes": [],
            "downVotes": [],
            "votesUpCount": 0,
            "votesDownCount": 0,
            "sharesCount": 0,
            "commentsCount": 0,
            "numberOfViews": 39,
            "title": "jkjkjkjkjkj",
            "content": [
                ""
            ],
            "community": "Gaming",
            "type": "Link",
            "pollOptions": [],
            "pollExpiration": null,
            "isPollEnabled": false,
            "pollVotingLength": "3 Days",
            "votedUsers": [],
            "link": "https://help.liferay.com/hc/en-us/articles/360018180231-Rendering-Web-Content-in-Your-Android-App",
            "attachments": [],
            "isSpoiler": false,
            "isNsfw": false,
            "sendPostReplyNotification": true,
            "isCommentsLocked": false,
            "isSaved": false,
            "hiddenBy": [],
            "comments": [],
            "date": "2024-04-14T01:49:18.625Z",
            "createdAt": "2024-04-14T01:49:18.625Z",
            "updatedAt": "2024-04-14T04:07:09.555Z",
            "__v": 0
        },
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
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *          {
            "_id": "661b361e41fcced1c04cf20b",
            "userId": "624a52d75ff69df002d25035",
            "username": "mahmoudabbas",
            "userProfilePic": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
            "upVotes": [],
            "downVotes": [],
            "votesUpCount": 0,
            "votesDownCount": 0,
            "sharesCount": 0,
            "commentsCount": 0,
            "numberOfViews": 40,
            "title": "jkjkjkjkjkj",
            "content": [
                ""
            ],
            "community": "Gaming",
            "type": "Link",
            "pollOptions": [],
            "pollExpiration": null,
            "isPollEnabled": false,
            "pollVotingLength": "3 Days",
            "votedUsers": [],
            "link": "https://help.liferay.com/hc/en-us/articles/360018180231-Rendering-Web-Content-in-Your-Android-App",
            "attachments": [],
            "isSpoiler": false,
            "isNsfw": false,
            "sendPostReplyNotification": true,
            "isCommentsLocked": false,
            "isSaved": false,
            "hiddenBy": [],
            "comments": [],
            "date": "2024-04-14T01:49:18.789Z",
            "createdAt": "2024-04-14T01:49:18.789Z",
            "updatedAt": "2024-04-14T19:02:13.078Z",
            "__v": 0
        },
        {
            "_id": "661b361e41fcced1c04cf1f4",
            "userId": "624a52d75ff69df002d25035",
            "username": "mahmoudabbas",
            "userProfilePic": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
            "upVotes": [],
            "downVotes": [],
            "votesUpCount": 0,
            "votesDownCount": 0,
            "sharesCount": 0,
            "commentsCount": 0,
            "numberOfViews": 39,
            "title": "jkjkjkjkjkj",
            "content": [
                ""
            ],
            "community": "Gaming",
            "type": "Link",
            "pollOptions": [],
            "pollExpiration": null,
            "isPollEnabled": false,
            "pollVotingLength": "3 Days",
            "votedUsers": [],
            "link": "https://help.liferay.com/hc/en-us/articles/360018180231-Rendering-Web-Content-in-Your-Android-App",
            "attachments": [],
            "isSpoiler": false,
            "isNsfw": false,
            "sendPostReplyNotification": true,
            "isCommentsLocked": false,
            "isSaved": false,
            "hiddenBy": [],
            "comments": [],
            "date": "2024-04-14T01:49:18.625Z",
            "createdAt": "2024-04-14T01:49:18.625Z",
            "updatedAt": "2024-04-14T04:07:09.555Z",
            "__v": 0
        },
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
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *         {
            "_id": "661b361e41fcced1c04cf20b",
            "userId": "624a52d75ff69df002d25035",
            "username": "mahmoudabbas",
            "userProfilePic": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
            "upVotes": [],
            "downVotes": [],
            "votesUpCount": 0,
            "votesDownCount": 0,
            "sharesCount": 0,
            "commentsCount": 0,
            "numberOfViews": 40,
            "title": "jkjkjkjkjkj",
            "content": [
                ""
            ],
            "community": "Gaming",
            "type": "Link",
            "pollOptions": [],
            "pollExpiration": null,
            "isPollEnabled": false,
            "pollVotingLength": "3 Days",
            "votedUsers": [],
            "link": "https://help.liferay.com/hc/en-us/articles/360018180231-Rendering-Web-Content-in-Your-Android-App",
            "attachments": [],
            "isSpoiler": false,
            "isNsfw": false,
            "sendPostReplyNotification": true,
            "isCommentsLocked": false,
            "isSaved": false,
            "hiddenBy": [],
            "comments": [],
            "date": "2024-04-14T01:49:18.789Z",
            "createdAt": "2024-04-14T01:49:18.789Z",
            "updatedAt": "2024-04-14T19:02:13.078Z",
            "__v": 0
        },
        {
            "_id": "661b361e41fcced1c04cf1f4",
            "userId": "624a52d75ff69df002d25035",
            "username": "mahmoudabbas",
            "userProfilePic": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
            "upVotes": [],
            "downVotes": [],
            "votesUpCount": 0,
            "votesDownCount": 0,
            "sharesCount": 0,
            "commentsCount": 0,
            "numberOfViews": 39,
            "title": "jkjkjkjkjkj",
            "content": [
                ""
            ],
            "community": "Gaming",
            "type": "Link",
            "pollOptions": [],
            "pollExpiration": null,
            "isPollEnabled": false,
            "pollVotingLength": "3 Days",
            "votedUsers": [],
            "link": "https://help.liferay.com/hc/en-us/articles/360018180231-Rendering-Web-Content-in-Your-Android-App",
            "attachments": [],
            "isSpoiler": false,
            "isNsfw": false,
            "sendPostReplyNotification": true,
            "isCommentsLocked": false,
            "isSaved": false,
            "hiddenBy": [],
            "comments": [],
            "date": "2024-04-14T01:49:18.625Z",
            "createdAt": "2024-04-14T01:49:18.625Z",
            "updatedAt": "2024-04-14T04:07:09.555Z",
            "__v": 0
        },
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
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *          {
            "_id": "661b361e41fcced1c04cf20b",
            "userId": "624a52d75ff69df002d25035",
            "username": "mahmoudabbas",
            "userProfilePic": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
            "upVotes": [],
            "downVotes": [],
            "votesUpCount": 0,
            "votesDownCount": 0,
            "sharesCount": 0,
            "commentsCount": 0,
            "numberOfViews": 40,
            "title": "jkjkjkjkjkj",
            "content": [
                ""
            ],
            "community": "Gaming",
            "type": "Link",
            "pollOptions": [],
            "pollExpiration": null,
            "isPollEnabled": false,
            "pollVotingLength": "3 Days",
            "votedUsers": [],
            "link": "https://help.liferay.com/hc/en-us/articles/360018180231-Rendering-Web-Content-in-Your-Android-App",
            "attachments": [],
            "isSpoiler": false,
            "isNsfw": false,
            "sendPostReplyNotification": true,
            "isCommentsLocked": false,
            "isSaved": false,
            "hiddenBy": [],
            "comments": [],
            "date": "2024-04-14T01:49:18.789Z",
            "createdAt": "2024-04-14T01:49:18.789Z",
            "updatedAt": "2024-04-14T19:02:13.078Z",
            "__v": 0
        },
        {
            "_id": "661b361e41fcced1c04cf1f4",
            "userId": "624a52d75ff69df002d25035",
            "username": "mahmoudabbas",
            "userProfilePic": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
            "upVotes": [],
            "downVotes": [],
            "votesUpCount": 0,
            "votesDownCount": 0,
            "sharesCount": 0,
            "commentsCount": 0,
            "numberOfViews": 39,
            "title": "jkjkjkjkjkj",
            "content": [
                ""
            ],
            "community": "Gaming",
            "type": "Link",
            "pollOptions": [],
            "pollExpiration": null,
            "isPollEnabled": false,
            "pollVotingLength": "3 Days",
            "votedUsers": [],
            "link": "https://help.liferay.com/hc/en-us/articles/360018180231-Rendering-Web-Content-in-Your-Android-App",
            "attachments": [],
            "isSpoiler": false,
            "isNsfw": false,
            "sendPostReplyNotification": true,
            "isCommentsLocked": false,
            "isSaved": false,
            "hiddenBy": [],
            "comments": [],
            "date": "2024-04-14T01:49:18.625Z",
            "createdAt": "2024-04-14T01:49:18.625Z",
            "updatedAt": "2024-04-14T04:07:09.555Z",
            "__v": 0
        },
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
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *          {
            "_id": "661b361e41fcced1c04cf20b",
            "userId": "624a52d75ff69df002d25035",
            "username": "mahmoudabbas",
            "userProfilePic": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
            "upVotes": [],
            "downVotes": [],
            "votesUpCount": 0,
            "votesDownCount": 0,
            "sharesCount": 0,
            "commentsCount": 0,
            "numberOfViews": 40,
            "title": "jkjkjkjkjkj",
            "content": [
                ""
            ],
            "community": "Gaming",
            "type": "Link",
            "pollOptions": [],
            "pollExpiration": null,
            "isPollEnabled": false,
            "pollVotingLength": "3 Days",
            "votedUsers": [],
            "link": "https://help.liferay.com/hc/en-us/articles/360018180231-Rendering-Web-Content-in-Your-Android-App",
            "attachments": [],
            "isSpoiler": false,
            "isNsfw": false,
            "sendPostReplyNotification": true,
            "isCommentsLocked": false,
            "isSaved": false,
            "hiddenBy": [],
            "comments": [],
            "date": "2024-04-14T01:49:18.789Z",
            "createdAt": "2024-04-14T01:49:18.789Z",
            "updatedAt": "2024-04-14T19:02:13.078Z",
            "__v": 0
        },
        {
            "_id": "661b361e41fcced1c04cf1f4",
            "userId": "624a52d75ff69df002d25035",
            "username": "mahmoudabbas",
            "userProfilePic": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
            "upVotes": [],
            "downVotes": [],
            "votesUpCount": 0,
            "votesDownCount": 0,
            "sharesCount": 0,
            "commentsCount": 0,
            "numberOfViews": 39,
            "title": "jkjkjkjkjkj",
            "content": [
                ""
            ],
            "community": "Gaming",
            "type": "Link",
            "pollOptions": [],
            "pollExpiration": null,
            "isPollEnabled": false,
            "pollVotingLength": "3 Days",
            "votedUsers": [],
            "link": "https://help.liferay.com/hc/en-us/articles/360018180231-Rendering-Web-Content-in-Your-Android-App",
            "attachments": [],
            "isSpoiler": false,
            "isNsfw": false,
            "sendPostReplyNotification": true,
            "isCommentsLocked": false,
            "isSaved": false,
            "hiddenBy": [],
            "comments": [],
            "date": "2024-04-14T01:49:18.625Z",
            "createdAt": "2024-04-14T01:49:18.625Z",
            "updatedAt": "2024-04-14T04:07:09.555Z",
            "__v": 0
        },
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
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *          {
            "_id": "661b361e41fcced1c04cf20b",
            "userId": "624a52d75ff69df002d25035",
            "username": "mahmoudabbas",
            "userProfilePic": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
            "upVotes": [],
            "downVotes": [],
            "votesUpCount": 0,
            "votesDownCount": 0,
            "sharesCount": 0,
            "commentsCount": 0,
            "numberOfViews": 40,
            "title": "jkjkjkjkjkj",
            "content": [
                ""
            ],
            "community": "Gaming",
            "type": "Link",
            "pollOptions": [],
            "pollExpiration": null,
            "isPollEnabled": false,
            "pollVotingLength": "3 Days",
            "votedUsers": [],
            "link": "https://help.liferay.com/hc/en-us/articles/360018180231-Rendering-Web-Content-in-Your-Android-App",
            "attachments": [],
            "isSpoiler": false,
            "isNsfw": false,
            "sendPostReplyNotification": true,
            "isCommentsLocked": false,
            "isSaved": false,
            "hiddenBy": [],
            "comments": [],
            "date": "2024-04-14T01:49:18.789Z",
            "createdAt": "2024-04-14T01:49:18.789Z",
            "updatedAt": "2024-04-14T19:02:13.078Z",
            "__v": 0
        },
        {
            "_id": "661b361e41fcced1c04cf1f4",
            "userId": "624a52d75ff69df002d25035",
            "username": "mahmoudabbas",
            "userProfilePic": "https://res.cloudinary.com/dkkhtb4za/image/upload/v1712956886/uploads/p10qwqcvalf56f0tcr62.png",
            "upVotes": [],
            "downVotes": [],
            "votesUpCount": 0,
            "votesDownCount": 0,
            "sharesCount": 0,
            "commentsCount": 0,
            "numberOfViews": 39,
            "title": "jkjkjkjkjkj",
            "content": [
                ""
            ],
            "community": "Gaming",
            "type": "Link",
            "pollOptions": [],
            "pollExpiration": null,
            "isPollEnabled": false,
            "pollVotingLength": "3 Days",
            "votedUsers": [],
            "link": "https://help.liferay.com/hc/en-us/articles/360018180231-Rendering-Web-Content-in-Your-Android-App",
            "attachments": [],
            "isSpoiler": false,
            "isNsfw": false,
            "sendPostReplyNotification": true,
            "isCommentsLocked": false,
            "isSaved": false,
            "hiddenBy": [],
            "comments": [],
            "date": "2024-04-14T01:49:18.625Z",
            "createdAt": "2024-04-14T01:49:18.625Z",
            "updatedAt": "2024-04-14T04:07:09.555Z",
            "__v": 0
        },
 *     ]
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

//#endregion listing

//#region Post

/**
 * @api {post} /post Create Post
 * @apiVersion 0.1.0
 * @apiName CreatePost
 * @apiGroup Post
 * @apiDescription Creates a new post.
 * @apiSampleRequest off
 *
 * @apiHeader {String} Authorization User's authentication token.
 *
 * @apiParam {String} title Title of the post.
 * @apiParam {String} content Content of the post.
 * @apiParam {String} community Name of the community where the post is created.
 * @apiParam {String} type Type of the post. Possible values are: "Post", "Images & Video", "Link", "Poll".
 * @apiParam {String} [pollOptions] Options for a poll post.
 * @apiParam {String} [pollVotingLength] Length of time for voting on a poll post.
 * @apiParam {String} [link] Link attached to the post (if applicable).
 * @apiParam {Boolean} [isSpoiler] Indicates if the post contains spoilers.
 * @apiParam {Boolean} [isNsfw] Indicates if the post is not safe for work.
 * @apiParam {Boolean} [sendPostReplyNotification] Indicates if notifications should be sent for replies to this post.
 * @apiParam {File[]} [attachments] Array of images attached to the post (if applicable).
 * @apiParam {String} [fileType] (must sent it with attachments)Type of files attached to the post (if you send image in attachment send this fileType=image and if you send video in attachments make fileType=video )(if applicable).
 *
 * @apiParamExample {json} Request-Example:
 * {
 *    "title": "Sample Title",
 *    "content": "Sample Content",
 *    "community": "Sample Community",
 *    "type": "Post"
 * }
 *
 * @apiSuccess {String} message Success message indicating that the post has been created successfully.
 * @apiSuccess {String} postId ID of the created post.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "message": "Post created successfully",
 *       "postId": "1234567890"
 *     }
 *
 * @apiError (400) BadRequest Missing or invalid parameters.
 * @apiError (401) Unauthorized Authorization token is required.
 * @apiError (404) NotFound User or community not found.
 * @apiError (500) InternalServerError An unexpected error occurred on the server.
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Invalid post data. Please provide title and community"
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Internal server error"
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
 *     [
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
 *     [
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
 *     [
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
 *       "socialLinks": {
 *          "twitter": "https://twitter.com/johndoe",
 *          "facebook": "https://facebook.com/johndoe"
 *       },
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
 *    "socialLinks": {
 *        "twitter": "https://twitter.com/johndoe",
 *        "facebook": "https://facebook.com/johndoe"
 *    },
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
 *       "blockedUsers": ["6622dd82f5dae2fd48618252", "6622dd82f5dae2fd48618257"],
 *       "mutedCommunities": ["6622dd82f5dae2fd48618267", "6622dd82f5dae2fd48618272"]
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
 *       "blockedUsers": ["6622dd82f5dae2fd48618252", "6622dd82f5dae2fd48618256"],
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
