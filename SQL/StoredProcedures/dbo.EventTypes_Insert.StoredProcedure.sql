USE [Resolvely]
GO
/****** Object:  StoredProcedure [dbo].[EventTypes_Insert]    Script Date: 11/28/2023 11:54:42 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Kelvin Hannah
-- Create date: 11/19/2023
-- Description: Insert EventType data for dbo.EventTypes, Outputs Id.
-- Code Reviewer: Luca Chitayat

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[EventTypes_Insert]
			@Name nvarchar(100)
			,@Id int OUTPUT

as
/*
Declare @Name nvarchar(100) = 'Charity Event'
,@Id int

Execute dbo.EventTypes_Insert
@Name
,@Id OUTPUT

Select *
from dbo.EventTypes
*/

BEGIN
INSERT INTO [dbo].[EventTypes]
           ([Name])
     VALUES
           (@Name)


		   SET @Id = SCOPE_IDENTITY()

END


GO
