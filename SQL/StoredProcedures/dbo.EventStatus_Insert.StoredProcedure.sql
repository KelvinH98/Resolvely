USE [Resolvely]
GO
/****** Object:  StoredProcedure [dbo].[EventStatus_Insert]    Script Date: 11/28/2023 11:54:42 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Kelvin Hannah
-- Create date: 11/19/2023
-- Description: Insert an Event Status for dbo.EventStatus, Outputs Id.
-- Code Reviewer: Luca Chitayat

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[EventStatus_Insert]
			@Name nvarchar(100)
			,@Id int OUTPUT



as
/* --TEST CODE--
Declare @Name nvarchar(100) ='Cancelled'
,@Id int

Execute dbo.EventStatus_Insert
@Name
,@Id OUTPUT


Select*
from dbo.EventStatus

*/

BEGIN

INSERT INTO [dbo].[EventStatus]
           ([Name])
     VALUES
           (@Name)

		   SET @Id = SCOPE_IDENTITY()
END


GO
