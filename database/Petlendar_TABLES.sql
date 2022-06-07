CREATE TABLE User(
	ID varchar(15) primary key,
    PW varchar(45),
    UserName varchar(20)
);

CREATE TABLE Pet(
	PetID int primary key auto_increment,
    MasterID varchar(15),
    PetName varchar(20),
    Sex char(1),
    PetType varchar(10),
    CONSTRAINT sex_check CHECK (Sex='f' or Sex='m'),
    FOREIGN KEY(MasterID) REFERENCES User(ID) ON DELETE CASCADE
);

CREATE TABLE CalendarData(
	CalendarNo int primary key auto_increment,
    Content varchar(100),
    WriteDate varchar(10),
    MasterID varchar(15),
    PetName varchar(20),
    foreign key(MasterID) references User(ID) on delete cascade
);

CREATE TABLE MedicalData(
	MedicalNo int primary key auto_increment,
    MedicalDate varchar(10),
    Cause varchar(20),
    Content varchar(50),
    Prescription varchar(50),
    Cost int,
    PetName varchar(20),
    MasterID varchar(15),
    foreign key(MasterID) references User(ID) on delete cascade
);

drop table CalendarData;
drop table MedicalData;
drop table Pet;
drop table User;

select * from User;
select * from Pet;
select * from MedicalData;
select * from CalendarData;