insert into users (username, email) values ('aherriot', 'aherriot@tripadvisor.com');
insert into users (username, email) values ('other', 'other@tripadvisor.com');

insert into geos (title, description, img_url, created_by) values ('Ottawa', 'Canada''s Capital', '/data/geos/ottawa.jpg', 1);
insert into geos (title, description, img_url, created_by) values ('Boston', 'The Olde Towne', 'data/geos/boston.jpg', 1);

insert into chips (title, description, img_url, created_by) values ('All Dressed', 'Canada’s very own. You’ll enjoy this bag of All Dressed chips if… 1. You enjoy unique Canadian food (it was invented here after all). 2. You’re seeking something sweet AND salty AND savoury…all in one bag. 3. You love eating chips that will make your taste buds feel like they are going to explode..', '/data/chips/all-dressed.jpg', 1);
insert into chips (title, description, img_url) values ('Ketchup', 'Hostess is the name of a brand for a number of potato chip varieties that was formerly the leading brand in Canada for many years since its creation in 1935.', '');
insert into chips (title, description, img_url, created_by) values ('Doritos', 'Bite into the cheesy goodness of Doritos Nacho Cheese flavoured tortilla chips for a tastebud-shattering crunch. With Doritos Nacho Cheese chips every crunchy bite is packed with a burst of bold, cheesy flavour. Turn any event into a bold snacking experience!', '/data/chips/doritos.jpg', 1);
-- insert into chips (title, description, img_url) values ('', '', '');
-- insert into chips (title, description, img_url) values ('', '', '');

insert into geos_chips (geo_id, chip_id, created_by) values (3, 1, 1);
insert into geos_chips (geo_id, chip_id, created_by) values (3, 2, 1);
insert into geos_chips (geo_id, chip_id, created_by) values (4, 2, 1);

insert into reviews (user_id, chip_id, rating, description) values (1, 1, 2, '');