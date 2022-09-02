create table users (
	id serial not null primary key,
    greeted_names text not null,
	count int not null
)