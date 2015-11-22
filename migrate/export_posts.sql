SELECT post_date, post_content, post_title, post_name FROM wp_posts 
where post_type='post' 
AND post_status='publish'
AND CHAR_LENGTH(post_content) > 1;