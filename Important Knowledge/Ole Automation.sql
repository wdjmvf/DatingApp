
--https://docs.microsoft.com/en-us/sql/database-engine/configure-windows/ole-automation-procedures-server-configuration-option?view=sql-server-2017


EXEC sp_configure 'Ole Automation Procedures';  
GO  

/*sp_configure 'show advanced options', 1;  
GO  
RECONFIGURE;  
GO  

sp_configure 'Ole Automation Procedures', 1;  
GO  
RECONFIGURE;  
GO 
 */
-------------------------------------------

Declare @Object as Int;
Declare @ResponseText as Varchar(8000);
 

Exec sp_OACreate 'MSXML2.XMLHTTP', @Object OUT;
Exec sp_OAMethod @Object, 'open', NULL, 'get',
                                                              'https://www.mocky.io/v2/5185415ba171ea3a00704eed', --Your Web Service Url (invoked)
                                                              'false'
Exec sp_OAMethod @Object, 'send'
Exec sp_OAMethod @Object, 'responseText', @ResponseText OUTPUT
 
Select @ResponseText
 
Exec sp_OADestroy @Object


--�ŧ json text �� row ��� column ��ҹ ��駡���ҧ
--https://technologyinsightscoffee.wordpress.com/2018/03/10/how-to-fix-invalid-object-name-openjson-in-sql-server-2016/

-- ------------------- example code
--DECLARE @json NVARCHAR(MAX)

--SET @json='{"name":"John","surname":"Doe","age":45,"skills":["SQL","C#","MVC"]}';

--SELECT *
--FROM OPENJSON(@json);
