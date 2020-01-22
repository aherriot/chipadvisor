-- Date: 2020-01-21

alter table reviews
add unique (user_id, chip_id);