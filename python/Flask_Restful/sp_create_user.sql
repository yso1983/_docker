CREATE PROCEDURE test.sp_create_user(
	IN p_email varchar(80),
	IN p_username varchar(45),
	IN p_password varchar(45)
)
BEGIN
	IF ( select exists (select 1 from user where username = p_username) ) THEN
	    select 'Username Exists !!';
	ELSE
		insert into `user` 
	 	(email, username, password) 
	 	VALUES (
		 p_email,
		    p_username,
		    p_password
		);
	END IF;
END