create table users (
	id serial not null primary key,
    greeted_name text not null,
	count int not null
)