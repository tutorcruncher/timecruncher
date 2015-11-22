SELECT post_name, post_title, post_content FROM wp_posts where
post_content LIKE "%Date of Foundation%"
AND post_status='publish';
