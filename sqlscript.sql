create table jobs (
	id INT,
	groupId INT,
	title varchar(255),
	description varchar(2000),
	url varchar(255),
	benefit varchar(2000),
	howToApply varchar(2000),
	imgLink varchar(1000),
	status INT,
	createdAdmin INT,
	createdAt DATETIME()
);