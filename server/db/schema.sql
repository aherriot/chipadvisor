create table users (
	id  serial primary key,
	username varchar(20) not null unique,
  email varchar(128) not null unique,
	password varchar(128),
	last_login_at timestamptz not null default now()
	created_at timestamptz not null default now(),
	updated_at timestamptz,
);

create table geos (
	id serial primary key,
	title varchar(256) not null unique,
	description varchar(500),
	img_url varchar(256) not null,
	created_by integer references users not null,
	created_at timestamptz not null default now(),
	updated_by integer references users,
	updated_at timestamptz
);

create table chips (
	id serial primary key,
	title varchar(100) not null,
	description varchar(500) not null,
	img_url varchar(256) not null,
	created_by integer references users not null,
	created_at timestamptz not null default now(),
	updated_by integer references users,
	updated_at timestamptz
);

create table geos_chips (
	geo_id integer references geos not null,
	chip_id integer references chips not null,
	created_by integer references users,
	created_at timestamptz not null default now()
);

create table reviews (
	id serial primary key,
	user_id integer references users not null,
	chip_id integer references chips not null,
	rating integer not null,
	description varchar(500) not null,
	created_at timestamptz not null default now(),
	updated_at timestamptz
);