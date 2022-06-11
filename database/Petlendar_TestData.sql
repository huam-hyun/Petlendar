use petlendar;

select * from Pet;
select * from MedicalData;
select * from User;
select * from CalendarData;

insert into Pet(MasterID, PetName, Sex, PetType) values('abcd', '콩이', 'f', '개');

delete from CalendarData;