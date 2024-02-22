CREATE DATABASE SocialNetworkDB;
USE SocialNetworkDB;
SELECT * FROM tbl_user WHERE userID = '1d8be6aa-6f0e-43d9-87d1-637a257408e5'

-- Create User Table
-- CREATE TABLE tbl_user (
--     UserID VARCHAR(255) PRIMARY KEY,
--     Username VARCHAR(255) NOT NULL,
--     Email VARCHAR(255) NOT NULL,
--     Password VARCHAR(255) NOT NULL,
--     TagName VARCHAR(50),
--     Location VARCHAR(100)
-- );

-- SELECT * FROM tbl_user

-- DROP TABLE tbl_user

-- Create Post Table
-- CREATE TABLE Post (
--     PostID VARCHAR(255) PRIMARY KEY,
--     UserID VARCHAR(255),
--     Content TEXT,
--     PostDate DATETIME DEFAULT GETDATE(),
--     Likes INT DEFAULT 0,
--     Comments INT DEFAULT 0,
--     FOREIGN KEY (UserID) REFERENCES tbl_user(UserID)
-- );

-- SELECT * FROM Post

-- DROP TABLE Post

-- Create Comment Table
-- CREATE TABLE Comment (
--     CommentID VARCHAR(255) PRIMARY KEY,
--     PostID VARCHAR(255),
--     UserID VARCHAR(255),
--     CommentDate DATETIME,
--     Content TEXT,
--     FOREIGN KEY (PostID) REFERENCES Post(PostID),
--     FOREIGN KEY (UserID) REFERENCES tbl_user(UserID)
-- );

-- SELECT * FROM Comment

-- DROP TABLE Comment

-- Create Friendship Table
-- CREATE TABLE Friendship (
--     FriendshipID VARCHAR(255) PRIMARY KEY,
--     User1ID VARCHAR(255),
--     User2ID VARCHAR(255),
--     FriendshipDate DATETIME,
--     FOREIGN KEY (User1ID) REFERENCES tbl_user(UserID),
--     FOREIGN KEY (User2ID) REFERENCES tbl_user(UserID)
-- );


-- SELECT * FROM Friendship

-- DROP TABLE Friendship

-- Create Photo Table
-- CREATE TABLE Photo (
--     PhotoID VARCHAR(255) PRIMARY KEY,
--     UserID VARCHAR(255),
--     PhotoURL VARCHAR(255),
--     UploadDate DATETIME,
--     FOREIGN KEY (UserID) REFERENCES tbl_user(UserID)
-- );

-- SELECT * FROM Photo

-- DROP TABLE Photo


-- Create Group Table
-- CREATE TABLE tbl_group (
--     GroupID VARCHAR(255) PRIMARY KEY,
--     GroupName VARCHAR(255),
--     Description TEXT,
--     CreatedDate DATETIME
-- );


-- SELECT * FROM tbl_group

-- DROP TABLE tbl_group

-- Create GroupMembers Table
-- CREATE TABLE GroupMembers (
--     GroupID VARCHAR(255),
--     MemberID VARCHAR(255),
--     PRIMARY KEY (GroupID, MemberID),
--     FOREIGN KEY (GroupID) REFERENCES tbl_group(GroupID),
--     FOREIGN KEY (MemberID) REFERENCES tbl_user(UserID)
-- );


-- SELECT * FROM GroupMembers

-- DROP TABLE GroupMembers

-- Create Event Table
-- CREATE TABLE Event (
--     EventID VARCHAR(255) PRIMARY KEY,
--     EventName VARCHAR(255),
--     Description TEXT,
--     EventDate VARCHAR(100),
--     Location VARCHAR(100),
--     EventPosterURL VARCHAR(255)
-- );


-- SELECT * FROM Event

### DROP TABLE Event

### Create EventAttendee Table
CREATE TABLE EventAttendee (
    EventID VARCHAR(255),
    AttendeeID VARCHAR(255),
    PRIMARY KEY (EventID, AttendeeID),
    FOREIGN KEY (EventID) REFERENCES Event(EventID),
    FOREIGN KEY (AttendeeID) REFERENCES tbl_user(UserID)
);

SELECT * FROM EventAttendee

DROP TABLE EventAttendee

## Create Message Table
    CREATE TABLE Message (
    MessageID VARCHAR(255) PRIMARY KEY,
    SenderID VARCHAR(255),
--     ReceiverID VARCHAR(255),
--     MessageDate DATETIME,
--     Content TEXT,
--     FOREIGN KEY (SenderID) REFERENCES tbl_user(UserID),
--     FOREIGN KEY (ReceiverID) REFERENCES tbl_user(UserID)
-- );

## SELECT * FROM Message

DROP TABLE Message