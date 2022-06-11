use petlendar;

select * from Pet;
select * from MedicalData;
select * from User;
select * from CalendarData;

insert into Pet(MasterID, PetName, Sex, PetType) values('abcd', '콩이', 'f', '개');

insert into MedicalData(MedicalDate, Cause, Content, Prescription, Cost, PetName, MasterID) values('2022-06-11', '감기', '기침함!', '약', '5000', '콩이', 'abcd');
insert into CalendarData(Content, WriteDate, MasterID, PetName) values('불러오기 테스트용 데이터', '2022-06-11', 'abcd', '콩이');