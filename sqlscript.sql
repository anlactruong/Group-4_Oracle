create table jobs (
	id int NOT NULL,
	groupId INT ,
	title varchar(255),
	url varchar(255),
	description varchar(2000),
	requirement varchar(2000),
	benefit varchar(2000),
	howToApply varchar(2000),
	imgLink varchar(1000),
	status INT,
	createdAdmin INT,
	createdAt varchar(200),
	PRIMARY KEY (id)
);

INSERT INTO jobs (id, groupId, title, url, description, requirement, benefit, howToApply, imgLink, status, createdAdmin, createdAt)
VALUES 
(
	1,
	1,
	'Tester - công ty x',
	'tester-cong-ty-x-1',
	'Test các dự án website, app, phối hợp với các bộ phận khác để đảm bảo chất lượng dự án, trải nghiệm người dùng và hiệu suất và các vấn đề ảnh hưởng đến hiệu quả chức năng của website',
	'Tốt nghiệp đại học các trường về Công nghệ thông tin',
	'Nhiều cơ hội thăng tiến và học hỏi, được đào tạo để nâng cao năng lực chuyên môn. Lương cạnh tranh',
	'Email your cv to: career@xcompany.com',
	'http://bitly.com/hiringImage',
	1,
	1,
	'04-05-2018'
);

INSERT INTO jobs (id, groupId, title, url, description, requirement, benefit, howToApply, imgLink, status, createdAdmin, createdAt)
VALUES 
(
	3,
	2,
	'Nhân Viên Bán Vé Máy Bay (Booker- Ticketing)',
	'nhan-vien-ban-ve-may-bay-3',
	'CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ DU LỊCH BẢO GIA TRẦN
	Đặt và xuất vé máy bay nội địa và quốc tế.
	Hỗ trợ đại lý ,
	Hỗ trợ các phòng ban khác trong công ty trong việc phát triển',
	'Có kinh nghiệm làm việc trong lãnh vực ứng tuyển tối thiểu 1 năm
	Khả năng giao tiếp tốt
	Sử dụng phần mềm abacus, sabre thành thạo .',
	'Lương cơ bản +hoa hồng cao
	Được hưởng các phúc lợi theo quy định của nhà nước.
	Môi trường làm việc chuyên nghiệp',
	'Email your cv to: tuyendung@abcxyz.com or Call: 099xxxyyyy',
	'http://bitly.com/hiringImage',
	1,
	1,
	'04-05-2018'
);

INSERT INTO jobs (id, groupId, title, url, description, requirement, benefit, howToApply, imgLink, status, createdAdmin, createdAt)
VALUES
(
	2,
	1,
	'Backend developer - công ty x',
	'backend-developer-cong-ty-x-2',
	'Xây dựng, triển khai, nâng cấp và bảo trì hệ thống app.',
	'Có kinh nghiệm back end 2 năm trở lên. Tốt nghiệp đại học các trường về Công nghệ thông tin',
	'Nhiều cơ hội thăng tiến và học hỏi, được đào tạo để nâng cao năng lực chuyên môn. Lương cạnh tranh',
	'Email your cv to: career@xcompany.com',
	'http://bitly.com/hiringImage',
	1,
	1,
	'04-05-2018'
);

create table jobGroups (
	id int NOT NULL,
	title varchar(255),
	imgLink varchar(1000),
	status INT,
	createdAdmin INT,
	createdAt varchar(200),
	PRIMARY KEY (id)
);

INSERT INTO jobGroups (id, title, imgLink, status, createdAdmin, createdAt)
VALUES (1, 'Công nghệ thông tin', 'http://bitly.com/hiringImage', 1, 1, '04-05-2018');

INSERT INTO jobGroups (id, title, imgLink, status, createdAdmin, createdAt)
VALUES (2, 'Bán hàng', 'http://bitly.com/hiringImage', 1, 1, '04-05-2018');

CREATE TABLE users
( id int NOT NULL,
  loginName varchar(100) NOT NULL,
  loginPassword varchar(1000) NOT NULL,
  isAdmin int NOT NULL,
  CONSTRAINT users_unique UNIQUE (loginName),
  PRIMARY KEY (id)
);

INSERT INTO users (id, loginName, loginPassword, isAdmin)
VALUES (1, 'admin', 'admin', 1);

ALTER TABLE jobs ADD CONSTRAINT FK_ID FOREIGN KEY(groupId) REFERENCES jobGroups(id);
ALTER TABLE jobGroups ADD CONSTRAINT FK_userID1 FOREIGN KEY(createdAdmin) REFERENCES users(id);
ALTER TABLE jobs ADD CONSTRAINT FK_userID2 FOREIGN KEY(createdAdmin) REFERENCES users(id);