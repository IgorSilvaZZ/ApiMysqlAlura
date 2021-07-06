create database agenda_petshop;
use agenda_petshop;

alter table agenda_petshop.atendimentos add data datetime not null, add dataCriacao datetime not null;
select * from atendimentos;
