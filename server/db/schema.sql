create table users (
	id  serial primary key,
	username varchar(20) not null,
  email varchar(100) not null
);

create table chips (
	id serial primary key,
	img_url varchar(256) not null,
	title varchar(100) not null,
	description varchar(500) not null,
	created_by integer references users,
	created_at timestamptz not null default now(),
	updated_by integer references users,
	updated_on timestamptz
);

create table reviews (
	id serial primary key,
	user_id integer references users,
	chip_id integer references chips,
	rating integer not null,
	description varchar(256) not null,
	created_at timestamptz not null default now(),
	updated_on timestamptz
);