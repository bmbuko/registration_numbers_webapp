create table regitrations(
	id serial not null primary key,
	reg_number text not null,
    town_id int not null,
    foreign key (town_id) references town(id)


);

create table town (
	id serial not null primary key,
    town_name text not null,
	starts_with text not null
);
