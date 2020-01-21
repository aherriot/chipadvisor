insert into users (username, email) values ('test', 'test@tripadvisor.com');
insert into users (username, email) values ('other', 'other@tripadvisor.com');

insert into geos (title, description, img_url) values ('Ottawa', 'Canada''s Capital', '');
insert into geos (title, description, img_url) values ('Boston', 'The Olde Towne', '');

insert into chips (title, description, img_url) values ('All Dressed', 'All-dressed is a potato chip flavour popular in Canada. The flavour combines the potato chip flavours of barbecue, ketchup, sour cream and onion, and salt and vinegar.', '');
insert into chips (title, description, img_url) values ('Ketchup', 'Hostess is the name of a brand for a number of potato chip varieties that was formerly the leading brand in Canada for many years since its creation in 1935.', '');
insert into chips (title, description, img_url) values ('Doritos', 'Bite into the cheesy goodness of Doritos Nacho Cheese flavoured tortilla chips for a tastebud-shattering crunch. With Doritos Nacho Cheese chips every crunchy bite is packed with a burst of bold, cheesy flavour. Turn any event into a bold snacking experience!', '');
-- insert into chips (title, description, img_url) values ('', '', '');
-- insert into chips (title, description, img_url) values ('', '', '');

insert into geos_chips (geo_id, chip_id, created_by) values (1, 1, 3);
insert into geos_chips (geo_id, chip_id, created_by) values (1, 2, 3);
insert into geos_chips (geo_id, chip_id, created_by) values (1, 3, 3);
insert into geos_chips (geo_id, chip_id, created_by) values (3, 3, 3);

insert into reviews (user_id, chip_id, rating, description) values (1, 1, 2, '');