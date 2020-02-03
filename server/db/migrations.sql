-- Date: 2020-01-21

alter table reviews
add unique (user_id, chip_id);

-- Date: 2020-01-22
alter table geos_chips
add unique (geo_id, chip_id);

create index reviews_chip_id_idx on reviews(chip_id);

-- Date: 2020-02-02
alter table reviews
alter column description type varchar(1000);