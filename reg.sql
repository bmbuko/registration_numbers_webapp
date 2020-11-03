create table town(
	id serial not null primary key,
    town_name text not null,
	starts_with text not null
);
create table registrations(
	reg_number text not null,
    town_id int,
    foreign key (town_id) references town(id)
);

insert into town (town_name, starts_with)values ('Paarl', 'CJ');
insert into town (town_name, starts_with)values ('Cape town', 'CA');
insert into town (town_name,starts_with)values ('Stellenbosch', 'CL');

-- insert into registrations(reg_number ,town_id)values ('CL 12376','3');
-- insert into registrations(reg_number ,town_id)values ('CA 12376','2');
--  insert into registrations(reg_number ,town_id)values ('CJ 12376','1');
    