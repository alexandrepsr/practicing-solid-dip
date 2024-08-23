
drop table event;
drop table ticket;

create table event (
    event_id uuid primary key,
    description text,
    price numeric
);

create table ticket (
    ticket_id uuid primary key,
    event_id uuid,
    email text,
    price numeric
);

insert into event (event_id, description, price) values ('8c0a59f4-64cb-436e-81c1-ae92f3c7be20', 'Evento A',  100);
insert into event (event_id, description, price) values ('19af4f7a-f254-4e54-9365-f58a016e682a', 'Evento B', 50);
